import type { BrowserWindow } from 'electron';
import type { Tray } from 'electron';

export interface globalContentType {
  /** 主窗口进程 */
  mainWindow?: BrowserWindow;
  /** 渲染进程地址 */
  hostUrl?: string;
  /** 系统托盘 */
  systemTray?: Tray | null;
  /** 子窗口进程 */
  childWindows?: {
    [key: string]: BrowserWindow | null;
  };
}
