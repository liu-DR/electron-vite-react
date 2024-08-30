import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';


/** 暴露主进程api给到渲染进程使用 */
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    async invoke(channel: string, args?: any) {
      const result = await ipcRenderer.invoke(channel, args);
      return result;
    },
    sendMessage(channel: string, args?: any) {
      ipcRenderer.send(channel, args);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subScription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      ipcRenderer.on(channel, subScription);

      return ipcRenderer.removeListener(channel, subScription);
    }
  },
  shell,
  electronAPI
});