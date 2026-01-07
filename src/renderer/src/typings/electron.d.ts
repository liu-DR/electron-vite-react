declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, args?: any) => Promise<any>;
        sendMessage: (channel: string, args?: any) => void;
        on: (channel: string, func: (...args: unknown[]) => void) => (() => void);
      };
      shell: {
        openPath: (path: string) => void;
      }
    },
    electronReturnVal: {
      onUpdateValue: (func: (event, args) => void) => void
    },
    exampleApi: {
      isMaximized: (func: (event, args) => void) => void,
    }
  }
};

export { };
