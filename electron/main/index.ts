import {
	app,
	BrowserWindow,
	shell,
	Menu,
	globalShortcut,
	ipcMain
} from 'electron'
import { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import MenuItem from './menu'

let mainWindow: any

function createWindow(): void {
	mainWindow = new BrowserWindow({
		width: 1400,
		height: 800,
		show: false,
		autoHideMenuBar: true,
		// titleBarStyle: 'hidden',  // 控制标题栏显示隐藏
		icon: resolve(__dirname, '../../src/assets/3.jpg'),
		webPreferences: {
			// 开启node支持
			nodeIntegration: true,
			allowRunningInsecureContent: true,
			preload: join(__dirname, '../preload/index.js'),
			// sandbox: false,
		}
	})

	global.mainWindow = mainWindow

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
  });

  /** 监听渲染进程通信 */
  ipcMain.on('toMain', (event, args) => {
    mainWindow.webContents.send('toRender', '2222222');
  });

  /** 最小化窗口 */
  ipcMain.on('setMinWindow', () => {
    mainWindow.minimize();
  });

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../../index.html'))
	}

}

	app.whenReady().then(() => {
		electronApp.setAppUserModelId('com.electron')
		app.on('browser-window-created', (_, window) => {
			optimizer.watchWindowShortcuts(window)
		})

		createWindow()

		app.on('activate', function () {
			if (BrowserWindow.getAllWindows().length === 0) createWindow()
		})
	})

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

