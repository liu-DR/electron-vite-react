import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
} from 'electron';
import type { BrowserWindow as BrowserWindowType } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { initTray, setupDockIcon } from './Common/systemTray';
import { loadUrl, destoryApp } from '../utils';
import { globalContentType } from '../utils/interface';

import { getIconPath } from './utils';

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
    if (process.platform !== 'darwin') {
      destoryApp(globalContent);
    } else {
      mainWindow.hide();
    }
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
    };

    mainWindow.setTitle('知识库');

    ipcMainEvent();
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
    width: 1200,
    height: 760,
    show: false,
    autoHideMenuBar: true,
    center: true,
    icon: getIconPath(),
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
    // 窗口是否聚焦
    const isFocused = mainWindow.isFocused();

    if (!isFocused) {
      return;
    }
    if (isDevToolOpen) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools({ mode: 'right' });
    }
  });

  monitorEvent();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  if (process.platform === 'darwin') {
    setupDockIcon(globalContent);
  } else {
    initTray(globalContent);
  }

  app.setName('MyApp_Electron_Vite_React');

  createWindow();
});

/** 单击应用图标时，如果没有创建窗口时，重新创建一个窗口 */
app.on('activate', function () {
  const isDestory = mainWindow.isDestroyed();
  if (!isDestory) {
    mainWindow.show();
    return;
  }
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

/** 所有窗口被关闭时 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

export { mainWindow, globalContent };
