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

  /** 最小化窗口 */
  ipcMain.on('setMinWindow', () => {
    mainWindow.minimize();
  });

  /** 关闭窗口 */
  ipcMain.on('destoryWindow', () => {
    destoryApp(globalContent);
  });
}

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 700,
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

  mainWindow.loadURL(url);

  // F12 打开控制台
  globalShortcut.register('F12', () => {
    /** 生产环境不允许打开控制台 */
    if (app.isPackaged) return;
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      currentWindow.webContents.toggleDevTools();
    }
  });

  /** 窗口准备好后执行 */
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    globalContent.mainWindow = mainWindow;

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      // 最大化打开窗口
      // mainWindow.maximize();	// 暂时无需最大化打开窗口
      mainWindow.show();
    }

    /** 开发环境启动时默认打开控制台 */
    if (!app.isPackaged) {
      mainWindow.webContents.toggleDevTools();
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

export { mainWindow };
