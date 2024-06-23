import log from 'electron-log';
import { Module, DynamicModule } from '@nestjs/common';
import { app as electronApp } from 'electron';
import { startElectron } from '../main.window';
import { InjectionTokens } from '../decorators';
import { AppController } from './app.controller';
import { DataService } from './data.service';

@Module({})
export class AppModule {
  static async register(): Promise<DynamicModule> {
    log.info('[AppModule.register] Registering app module');
    try {
      await electronApp.whenReady();
      const { app, mainWindow } = await startElectron();
      return {
        module: AppModule,
        providers: [
          DataService,
          { provide: InjectionTokens.ElectronApp, useValue: app },
          {
            provide: InjectionTokens.ElectronMainWindow,
            useValue: mainWindow,
          },
        ],
        controllers: [AppController],
      };
    } catch (error) {
      log.error('[AppModule.register] error', error);
      throw error;
    }
  }
}
