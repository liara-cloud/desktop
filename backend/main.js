const url = require('url');
const path = require('path');

const {sentry} = require('./configs/sentry');
const appRootDir = require('app-root-dir').get();
const {autoUpdater} = require('electron-updater');
const {app, BrowserWindow, ipcMain, shell} = require('electron');

const logger = require('./configs/logger');
const {sendLogToUser} = require('./dialog');
const {deploy} = require('./deploy/deploy')
const {envConfig} = require('./configs/envConfig');
const {removeAccount} = require('./utils/removeAccount');
const {startServer} = require('./server/startServer.js');
const cancelDeploy = require('./deploy/cancel-deployment');
const {createEncodedUrl} = require('./utils/urlEncoder.js');
const {readLiaraJson} = require('./utils/account.management');
const {isDirecoty} = require('./utils/check-upload-directory');
const {chanegCurrentAccount} = require('./utils/changeCurrent');

let mainWindow;
async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    minWidth: 350,
    autoHideMenuBar: true,
    maximizable: false,
    maxWidth: 350,
    height: 550,
    minHeight: 550,
    maxHeight: 550,
    show: false,
    frame: false,
    icon:
      envConfig.PLATFORM === 'darwin'
        ? `${appRootDir}/assets/888.icns`
        : `${appRootDir}/assets/icon2.ico`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  const urlFormatOptions = {
    protocol: 'file:',
    pathname: path.join(__dirname, '..', 'dist', 'index.html'),
    slashes: true,
  };

  if (envConfig.IS_DEV && process.argv.indexOf('--noDevServer') === -1) {
    urlFormatOptions.protocol = 'http:';
    urlFormatOptions.host = 'localhost:8080';
    urlFormatOptions.pathname = 'index.html';
    urlFormatOptions.slashes = true;
  }
  if (envConfig.PLATFORM === 'win32') app.setAppUserModelId('liara');
  mainWindow.loadURL(url.format(urlFormatOptions));
  autoUpdater.checkForUpdatesAndNotify();

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    // autoUpdater.checkForUpdatesAndNotify();
    mainWindow.show();

    // Open devtools if dev
    if (envConfig.IS_DEV) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require('electron-devtools-installer');

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log('Error loading React DevTools: ', err)
      );
      mainWindow.webContents.openDevTools();
    }
  });
  mainWindow.on('close', (e) => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    mainWindow.show();
  });
});

ipcMain.on('asynchronous-login', async (event) => {
  logger.info('Request from IPCRenderer recieved. channle=asynchronous-login');
  event.sender.send('asynchronous-login', await readLiaraJson());
  logger.info('Response from IPCMain sent. channle=asynchronous-login');
});

ipcMain.on('open-console', async (event, args) => {
  logger.info('Request from IPCRenderer recieved. channle=open-console');
  if (!envConfig.OPEN_PORT) {
    const httpServer = await startServer(event);
    const encodedUrl = createEncodedUrl(httpServer.address().port, args.page);
    logger.info('Response from IPCMain sent. channle=open-console');
    return await shell.openExternal(encodedUrl);
  }
  const encodedUrl = createEncodedUrl(envConfig.OPEN_PORT, args.page);
  await shell.openExternal(encodedUrl);
  logger.info('Response from IPCMain sent. channle=open-console');
});

ipcMain.on('deploy', async (event, args) => {
  // const test = {
  //   config: {
  //     app: 'abc',
  //     port: 3000,
  //     platform: 'node',
  //     message: 'hi',
  //     node: { "version": "14" },
  //     disks: [
  //       {
  //         name: "data",
  //         mountTo: "uploads"
  //       }
  //       ],
  //     healthCheck: {
  //       timeout: 15,
  //       command: "curl --fail http://localhost:3000 || exit 1"
  //     }
  //   },
  //   path: 'C:\\Users\\devops\\Desktop\\nodejs-getting-started-master',
  //   region: 'iran',
  //   api_token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWM4MTYyYzNkZTI0ZTdiNzAwODIyYmQiLCJpYXQiOjE2NDM3ODQ2MjZ9.ZielTXpN3SqUlTG_Y1hUkwFA5sBTxvDxUPABuVCJy0k',
  // }
  if (args.cancel) {
    return await cancelDeploy(event, args)
  }
  logger.info('Request from IPCRenderer recieved. channle=deploy deploy=true');

  await deploy(event, args);
  logger.info('Response from IPCMain sent. channle=deploy deploy=true');
});

ipcMain.on('change-current', async (event, args) => {
  const { email, region } = args;
  event.sender.send(
    'change-current',
    await chanegCurrentAccount(email, region)
  );
});

ipcMain.on('remove-account', async (event, args) => {
  const { email, region } = args;
  event.sender.send('remove-account', await removeAccount(email, region));
});

ipcMain.on('show-dialog', () => {
  sendLogToUser();
});

ipcMain.on('console', async (event, args) => {
  if (args.url) {
    return await shell.openExternal(args.url);
  }
  if (args.support) {
    return await shell.openExternal(envConfig.LIARA_TICKET_PAGE);
  }
});

ipcMain.on('is-directory', async (event, args) => {
  event.sender.send('is-directory', await isDirecoty(args.path));
});

// Frame
ipcMain.handle('frame', (event, args) => {
  if (args === 'minimize') mainWindow.minimize();
  if (args === 'close') mainWindow.close();
});

// version
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

//update
autoUpdater.on('update-available', () => {
  console.log('update-available');
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('download-progress', (progressObj) => {
  console.log(progressObj);
});
autoUpdater.on('update-downloaded', () => {
  console.log('update-downloaded');
  mainWindow.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

// Stop error
app.allowRendererProcessReuse = true;
