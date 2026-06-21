import { Menu, shell, BrowserWindow, app, MenuItemConstructorOptions } from 'electron';

/**
 * 创建自定义菜单，仅包含：关闭、设置、刷新
 */

export function setCustomMenu(mainWindow: BrowserWindow) {
  const appName = app.getName();
  const template: MenuItemConstructorOptions[] = [
    {
      label: `${appName}`,
      submenu: [
        { role: 'about', label: '关于' },
        { type: 'separator' as const },
        { role: 'reload', label: '刷新' },
        { role: 'quit', label: '退出' },
      ],
    },
    {
      label: `操作`,
      submenu: [
        {
          label: '关闭',
          click: () => {
            mainWindow.close();
          },
        },
        {
          label: '设置',
          click: () => {
            shell.openExternal('https://www.electronjs.org');
          },
        },
        {
          label: '刷新',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload();
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

