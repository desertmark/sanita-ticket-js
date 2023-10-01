import { Module, DynamicModule, Logger } from '@nestjs/common';
import { app as electronApp } from 'electron';
import { startElectron } from '../main.window';
import { InjectionTokens } from '../decorators';
import { AppController } from './app.controller';
import { DataService } from './data.service';
@Module({})
export class AppModule {
  static async register(): Promise<DynamicModule> {
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
      Logger.error(error);
      throw error;
    }
  }
}
