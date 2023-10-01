import { contextBridge, ipcRenderer } from 'electron';

const electronHandler = {
  app: {
    getData: (): Promise<any> => ipcRenderer.invoke('App.getData'),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
