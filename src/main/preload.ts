import { contextBridge, ipcRenderer } from 'electron';
import { IConfig } from './main';

const electronHandler = {
  app: {
    getConfig: (): Promise<IConfig> => ipcRenderer.invoke(`get-config`),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
