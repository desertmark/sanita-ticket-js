import { Inject, INestApplicationContext } from '@nestjs/common';
import { ipcMain } from 'electron';
import { IpcHandlerOptions, handlerName } from './util';

export enum InjectionTokens {
  ElectronApp = 'ELECTRON_APP',
  ElectronMainWindow = 'ELECTRON_MAIN_WINDOW',
}

export const InjectElectronApp = () => Inject(InjectionTokens.ElectronApp);
export const InjectMainWindow = () =>
  Inject(InjectionTokens.ElectronMainWindow);

export const CONTROLLER_WATERMARK = Symbol('CONTROLLER_WATERMARK');

export interface IpcHandler {
  propertyKey: string | symbol;
  descriptor: PropertyDescriptor;
  target: Object;
  options?: IpcHandlerOptions;
}
export class Controllers {
  private static ipcHandlers: IpcHandler[] = [];

  static register(ipcHandler: IpcHandler) {
    Controllers.ipcHandlers.push(ipcHandler);
  }

  static init(app: INestApplicationContext) {
    Controllers.ipcHandlers.forEach(({ propertyKey, target }) => {
      const name = handlerName(target, propertyKey);
      ipcMain.handle(name, async (event, ...args) => {
        const controller = await app.resolve(target.constructor, undefined, {
          strict: false,
        });
        return await controller[propertyKey](...args, event);
      });
    });
  }
}

export function IpcHandle(options?: IpcHandlerOptions): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Controllers.register({ propertyKey, descriptor, target, options });
  };
}
