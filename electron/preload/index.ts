import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from 'electron';

/** 暴露主进程api给到渲染进程，用于渲染进程与主进程之间通信 */
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
      const subScription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subScription);

      return ipcRenderer.removeListener(channel, subScription);
    },
  },
  shell: shell,
});

/**
 * 如果需要从主进程发送消息给到渲染进程，需要使用下述方法
 * 并在主进程代码中执行：mainWindow.webContents.send(channel, args)
 * 渲染进程中接受时，使用window.electronApi.onUpdateValue(callback)
 * */
contextBridge.exposeInMainWorld('electronReturnVal', {
  onUpdateValue: (callback: any) =>
    ipcRenderer.on('toRender', (event, args) => callback(event, args)),
});

contextBridge.exposeInMainWorld('exampleApi', {
  /** 窗口最大化状态 */
  isMaximized: (callback: any) => {
    ipcRenderer.on('maximized', (event, args) => callback(event, args));
  },
});
