import {
  app,
  BrowserWindow,
  shell,
  Menu,
  globalShortcut,
  ipcMain,
} from 'electron';
import type { BrowserWindow as BrowserWindowType } from 'electron';
import { join, resolve } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import MenuItem from './menu';
import { initTray } from '../preload/systemTray';
import { loadUrl, destoryApp } from '../utils';

import { globalContentType } from '../utils/interface';

let mainWindow: BrowserWindowType;
let globalContent: globalContentType & typeof globalThis = global;

function ipcMainEvent() {
  /** 监听渲染进程通信 */
  ipcMain.on('toMain', (event, arg) => {
    mainWindow.webContents.send('toRender', arg);
  });

  /** 切换窗口大小窗口 */
  ipcMain.on('switchWindowSize', (event, arg: string) => {
    const isMaximized = globalContent.mainWindow?.isMaximized();

    if (arg === 'min') {
      mainWindow.minimize();
      return;
    }

    if (arg === 'switch' && isMaximized) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  /** 关闭窗口 */
  ipcMain.on('destoryWindow', () => {
    destoryApp(globalContent);
  });

  ipcMain.on('getMainWindow', (event, arg) => {
    const isMaximized = globalContent.mainWindow?.isMaximized();
    mainWindow.webContents.send('mainWindow', isMaximized);
  });
}

function monitorEvent() {
  /** 窗口准备好后执行 */
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    globalContent.mainWindow = mainWindow;

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    /** 开发环境启动时默认打开控制台 */
    if (!app.isPackaged) {
      mainWindow.webContents.openDevTools({ mode: 'right' });
    }

    ipcMainEvent();

    if (!globalContent.systemTray) {
      /** 创建系统托盘需要再应用记载之后 */
      initTray(globalContent);
    }
  });

  mainWindow.on('close', (event) => {
    destoryApp(globalContent);
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximized', true);
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('maximized', false);
  });
}

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    center: true,
    icon: resolve(__dirname, '../../public/trayIcon.jpg'),
    // titleBarStyle: 'hidden',
    webPreferences: {
      // 开启node支持
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  });

  const url = await loadUrl();

  globalContent.hostUrl = url;

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // F12 打开控制台
  globalShortcut.register('F12', () => {
    const isDevToolOpen = mainWindow.webContents.isDevToolsOpened();
    if (isDevToolOpen) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  monitorEvent();
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  /** 单击应用图标时，如果没有创建窗口时，重新创建一个窗口 */
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/** 所有窗口被关闭时 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

export { mainWindow, globalContent };
