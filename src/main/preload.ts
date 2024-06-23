import { contextBridge, ipcRenderer } from 'electron';
import { IConfig } from './modules/app.controller';

const electronHandler = {
  app: {
    getConfig: (): Promise<IConfig> => ipcRenderer.invoke(`App.getConfig`),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
