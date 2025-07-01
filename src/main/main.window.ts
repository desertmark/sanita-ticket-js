/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater, UpdateCheckResult } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  private updateResult: Promise<UpdateCheckResult | null>;

  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    // autoUpdater.forceDevUpdateConfig = true;
    this.updateResult = autoUpdater.checkForUpdatesAndNotify();
  }

  async waitForUpdate(): Promise<UpdateCheckResult | null> {
    try {
      return await this.updateResult;
    } catch (error) {
      log.error('Error checking for updates:', error);
      return null;
    }
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  const updater = new AppUpdater();
  updater
    .waitForUpdate()
    .then((updateCheckResult) => {
      // Use main window to open a alert native window to close the app if an update is available
      if (updateCheckResult && updateCheckResult.isUpdateAvailable) {
        dialog
          .showMessageBox(mainWindow!, {
            type: 'info',
            title: 'Actualización disponible',
            message: 'Hay una nueva actualización disponible. ¿Deseas instalarla ahora?',
            detail: `La aplicación se reiniciará para aplicar la actualización ${updateCheckResult.updateInfo.version}.`,
            buttons: ['Instalar ahora', 'Más tarde'],
            defaultId: 0,
            cancelId: 1,
          })
          .then((result) => {
            if (result.response === 0) {
              // Usuario eligió "Instalar ahora"
              autoUpdater.quitAndInstall();
            }
            // Si eligió "Más tarde", no hacer nada
          })
          .catch((error) => {
            log.error('Error showing update dialog:', error);
          });
      }
    })
    .catch((error) => {
      log.error('Error checking for updates:', error);
    });
  return mainWindow;
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
export async function startElectron() {
  const window = await createWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) createWindow();
  });
  return {
    app,
    mainWindow: window,
  };
}
