import {
  app,
  BrowserWindow,
  shell,
  Menu,
  globalShortcut,
  ipcMain,
} from 'electron';
import type { BrowserWindow as BrowserWindowType } from 'electron'
import { join, resolve } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import MenuItem from './menu';

let mainWindow: BrowserWindowType;
let globalContent: any = global;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    center: true,
    icon: resolve(__dirname, '../../src/assets/3.jpg'),
    webPreferences: {
      // 开启node支持
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  });

  globalContent.mainWindow = mainWindow;

  // ctrl + F12 打开控制台
  globalShortcut.register('CommandOrControl+F12', () => {
    /** 生产环境不允许打开控制台 */
    if (app.isPackaged) return;
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      currentWindow.webContents.toggleDevTools();
    }
  });

  // 最大化打开窗口
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      // mainWindow.maximize();	// 暂时无需最大化打开窗口
      mainWindow.show();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details: { url: string }) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  const openModel = (args: any) => { 
    console.log(args, 'args');
    mainWindow.webContents.send('toRender', args);
  }

  /** 注册 */
  ipcMain.on('toMain', (event, args) => {
    console.log(event, args, 'toMain');
    openModel(args);
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../../index.html'));
  }
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
