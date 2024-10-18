/** 创建系统托盘 */
import { Tray, Menu } from 'electron';
import { join, resolve } from 'path';
import { mainWindow } from '../main';

let tray = null;
/** 托盘图标 */
const trayIcon = resolve(__dirname, '../../public/trayIcon.jpg');

function initTray() {
  tray = new Tray(trayIcon);

  /** 创建托盘右键菜单trayMenu */
  const trayMenu = Menu.buildFromTemplate([{ label: 'Item1', type: 'radio' }]);

  tray.setToolTip('系统托盘');

  tray.setContextMenu(trayMenu);
}

export { initTray };
