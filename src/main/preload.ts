import { contextBridge, ipcRenderer } from 'electron';
import { IConfig } from './main';
import { IDevice } from '../types/device';

const electronHandler = {
  app: {
    getConfig: (): Promise<IConfig> => ipcRenderer.invoke(`get-config`),
    checkForUpdates: (): Promise<void> => ipcRenderer.invoke('check-for-updates'),
    getDeviceInfo: (): Promise<IDevice> => ipcRenderer.invoke('get-machine-info'),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
