import { Notification } from 'electron';
import type { NotificationConstructorOptions } from 'electron';
import { globalContentType } from './interface';

export const isDev = process.env.NODE_ENV === 'development';

export enum NetWork {
  DEV = 'http://localhost:9000/',
  PRODUCTION = 'http://localhost:9000/',
}

export const loadUrl = async () => {
  if (isDev) {
    return NetWork.DEV;
  }

  return NetWork.PRODUCTION;
};

/** 销毁应用程序 */
export const destoryApp = (global: globalContentType) => {
  /** 先销毁创建的各个子窗口 */
  for (let key in global.childWindows) {
    if (global?.childWindows[key]) {
      global.childWindows[key].destroy();
      global.childWindows[key] = null;
    }
  }

  global.systemTray?.destroy();
  global.mainWindow?.destroy();
  global.hostUrl = '';
};

/** 创建系统通知 */
export const createNotifica = (options: NotificationConstructorOptions) => {
  if (!options) {
    return;
  }
  const notifica = new Notification(options);
  notifica.show();
};
