/** 创建系统托盘 new Tray(icon) */
import { Tray, Menu, nativeImage, app, ipcMain } from 'electron';
import type { Tray as TrayType, Menu as TrayMenu } from 'electron';
import { globalContentType } from '../../utils/interface';
import { mainWindow } from '..';

import { getIconPath } from '../utils';

let tray: TrayType | null = null;

const trayIco = nativeImage.createFromPath(getIconPath());

// 设置系统托盘（window系统）
const initTray = (global: globalContentType) => {
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
      label: '测试菜单',
      click: () => mainWindow.show()
    },
  ]);

  tray = new Tray(trayIco);

  tray.setContextMenu(trayMenu);

  global.systemTray = tray;

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
};

// 设置 Dock 图标（macOS 系统）
const setupDockIcon = (global: globalContentType) => {
  // 4. 创建 Dock 菜单
  const dockMenu = Menu.buildFromTemplate([
    {
      label: '新建文档',
      click: () => mainWindow.webContents.send('new-document')
    },
    { type: 'separator' },
    {
      label: '偏好设置',
      click: () => mainWindow.webContents.send('open-settings')
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => app.quit()
    }
  ]);
  const dockIcon = trayIco;

  app.dock.setIcon(dockIcon);
  app.dock.setMenu(dockMenu);


  // 5. 添加跳动效果
  // 点击按钮触发跳动效果
  ipcMain.on('bounce-dock', (_, critical) => {
    app.dock.bounce(critical ? 'critical' : 'informational')
  })

  // 6. 显示/隐藏 Dock
  ipcMain.on('toggle-dock', () => {
    if (app.dock.isVisible()) {
      app.dock.hide()
    } else {
      app.dock.show()
    }
  })
}

export { initTray, setupDockIcon};
