/* eslint-disable import/no-duplicates */
import log from 'electron-log';
import { app as electronApp, ipcMain } from 'electron';
import { startElectron } from './main.window';

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
  } catch (error) {
    log.error('[main] error', error);
    throw error;
  }
}
bootstrap();
