import type { BrowserView, MenuItemConstructorOptions } from 'electron';
import { app, Menu, IpcMain, ipcMain } from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserView;
  destroyWindows: () => void;
  subMenuHelp: MenuItemConstructorOptions;

  constructor(mainWindow: BrowserView, destroyWindows: () => void) {
    this.mainWindow = mainWindow;
    this.destroyWindows = destroyWindows;

    this.subMenuHelp = {
      label: '帮助',
      submenu: [
        {
          label: '检查更新',
          click() {
            ipcMain.emit('checkUpdate');
          },
        },
        {
          label: '历史版本',
          click: () => {
            this.mainWindow.webContents.send('lookHistoryVersion');
          },
        },
      ],
    };
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '测试1',
        submenu: [
          {
            label: '退出',
            click: () => {
              if (typeof this.destroyWindows === 'function') {
                this.destroyWindows();
              }
            },
          },
        ],
      },
      {
        label: '视图',
        submenu: [
          {
            label: '重新加载',
            accelerator: 'Ctrl+R',
            click: () => {
              this.mainWindow.webContents.reload();
            },
          },
          {
            label: '切换全屏',
            click: () => {
              this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
            },
          },
        ],
      },
      this.subMenuHelp,
    ];

    return templateDefault;
  }
}
