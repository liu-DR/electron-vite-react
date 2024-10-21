/** 创建系统托盘 new Tray(icon) */
import { Tray, Menu } from 'electron';
import type { Tray as TrayType, Menu as TrayMenu } from 'electron';
import { resolve } from 'path';
import { globalContentType } from '../utils/interface';

let tray: TrayType | null = null;

/** 托盘图标 */
const trayIcon = resolve(__dirname, '../../public/trayIcon.jpg');

function initTray(global: globalContentType) {
  tray = new Tray(trayIcon);

  /**
   * 创建托盘右键菜单trayMenu -- Menu.buildFromTemplate(menus)
   * @param {menus} 菜单项({ label: 菜单描述, type: 菜单类型 })
   * @type {radio} 单选项
   * @type {normal} 无状态
   * @type {separator} 分割线
   * @type {checkbox} 勾选项
   */
  const trayMenu: TrayMenu = Menu.buildFromTemplate([
    {
      label: '关闭应用',
      type: 'normal',
      role: 'close',
    },
  ]);

  /** 设置鼠标悬浮在托盘图标上的提示文案 */
  tray.setToolTip('This is my application');
  tray.setTitle('This is my title');

  tray.setContextMenu(trayMenu);

  global.systemTray = tray;

  tray.on('click', () => {
    global.mainWindow?.show();
  });
}

export { initTray };
