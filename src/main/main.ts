/* eslint-disable import/no-duplicates */
import log from 'electron-log';
import { app as electronApp, ipcMain } from 'electron';
import { startElectron, checkForUpdates } from './main.window';
import { machineId } from 'node-machine-id';
import { hostname, userInfo, arch, platform, release } from 'os';
import { IDevice } from '../types/device';
export interface IConfig {
  supabaseAnnonKey: string;
  supabaseUrl: string;
}

log.info('[main] Environment:', process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export async function bootstrap() {
  log.info('[main] Starting application');
  try {
    await electronApp.whenReady();
    await startElectron();
    ipcMain.handle('get-config', (): IConfig => {
      return {
        supabaseAnnonKey: process.env.SUPABASE_ANON_KEY || '',
        supabaseUrl: process.env.SUPABASE_URL || '',
      };
    });
    ipcMain.handle('check-for-updates', checkForUpdates);
    ipcMain.handle('get-machine-info', async () => {
      const id = await machineId();
      return {
        id,
        hostname: hostname(),
        username: userInfo().username,
        arch: arch(),
        platform: platform(),
        release: release(),
      } as IDevice;
    });
  } catch (error) {
    log.error('[main] error', error);
    throw error;
  }
}
bootstrap();
