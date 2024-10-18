/** 创建系统托盘 new Tray(icon) */
import { Tray, Menu } from 'electron';
import type { Tray as TrayType } from 'electron';
import { resolve } from 'path';

let tray: TrayType | null = null;
/** 托盘图标 */
const trayIcon = resolve(__dirname, '../../public/trayIcon.jpg');

function initTray() {
  tray = new Tray(trayIcon);

  /**
   * 创建托盘右键菜单trayMenu -- Menu.buildFromTemplate(menus)
   * @param {menus} 菜单项({ label: 菜单描述, type: 菜单类型 })
   * @param {radio} 单选项
   * @param {normal} 无状态
   * @param {separator} 分割线
   * @param {checkbox} 勾选项
   */
  const trayMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'normal' },
    { label: 'Item3', type: 'separator' },
    { label: 'Item5', type: 'checkbox' },
  ]);

  /** 设置鼠标悬浮在托盘图标上的提示文案 */
  tray.setToolTip('This is my application');
  tray.setTitle('This is my title');

  tray.setContextMenu(trayMenu);
}

export { initTray };
