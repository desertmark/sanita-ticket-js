import log from 'electron-log';
import {
  Inject,
  INestApplicationContext,
  Controller as NestController,
  applyDecorators,
  SetMetadata,
  ControllerOptions,
} from '@nestjs/common';
import { ipcMain } from 'electron';
import { Reflector } from '@nestjs/core';
import { IpcHandlerOptions } from './util';

export enum InjectionTokens {
  ElectronApp = 'ELECTRON_APP',
  ElectronMainWindow = 'ELECTRON_MAIN_WINDOW',
}

export const InjectElectronApp = () => Inject(InjectionTokens.ElectronApp);
export const InjectMainWindow = () =>
  Inject(InjectionTokens.ElectronMainWindow);

export const CONTROLLER_WATERMARK = '__sanita_controller__';

export interface IIpcHandler {
  propertyKey: string | symbol;
  descriptor: PropertyDescriptor;
  target: Object;
  options?: IpcHandlerOptions;
}
export class Controllers {
  private static ipcHandlers: IIpcHandler[] = [];

  static register(ipcHandler: IIpcHandler) {
    Controllers.ipcHandlers.push(ipcHandler);
  }

  private static async handlerName(
    app: INestApplicationContext,
    propertyKey: string | symbol,
    target: Object,
  ) {
    // Build handler name
    const reflector = await app.resolve(Reflector, undefined, {
      strict: false,
    });
    const controllerName = reflector.get(
      CONTROLLER_WATERMARK,
      target.constructor,
    );
    return `${controllerName}.${propertyKey.toString()}`;
  }

  static async init(app: INestApplicationContext) {
    log.info(
      '[Controllers.init] Registering controllers',
      Controllers.ipcHandlers,
    );
    const promises = Controllers.ipcHandlers.map(
      async ({ propertyKey, target }) => {
        const name = await Controllers.handlerName(app, propertyKey, target);
        log.info('[Controllers.init] Registering handler', name);
        // Register handler
        ipcMain.handle(name, async (event, ...args) => {
          const controller = await app.resolve(target.constructor, undefined, {
            strict: false,
          });
          return await controller[propertyKey](...args, event);
        });
      },
    );
    return await Promise.all(promises);
  }
}

export function IpcHandler(options?: IpcHandlerOptions): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    log.info('[IpcHandler] Registering controller', options);
    Controllers.register({ propertyKey, descriptor, target, options });
  };
}

export function Controller(
  name: string,
  options?: ControllerOptions,
): ClassDecorator {
  return applyDecorators(
    NestController(options!),
    SetMetadata(CONTROLLER_WATERMARK, name),
  );
}
