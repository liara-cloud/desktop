const url = require("url");
const path = require("path");

const { sentry } = require("./configs/sentry");
const appRootDir = require("app-root-dir").get();
const { app, BrowserWindow, ipcMain, shell, dialog , globalShortcut} = require("electron");
const { autoUpdater } = require("electron-updater");

const logger = require("./configs/logger");
const { deploy } = require("./deploy/deploy");
const { envConfig } = require("./configs/envConfig");
const { removeAccount } = require("./utils/remove-account");
const { startServer } = require("./server/startServer.js");
const cancelDeploy = require("./deploy/cancel-deployment");
const { createEncodedUrl } = require("./utils/url-encoder.js");
const { readLiaraJson } = require("./utils/account-management");
const { sendLogToUser, showUpdateAvailable } = require("./dialog");
const { chanegCurrentAccount } = require("./utils/change-current");
const { checkDirectory } = require("./utils/check-upload-directory");

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
      envConfig.PLATFORM === "darwin"
        ? `${appRootDir}/assets/liara.icns`
        : `${appRootDir}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    fullscreenable: false,
  });
  const urlFormatOptions = {
    protocol: "file:",
    pathname: path.join(__dirname, "..", "dist", "index.html"),
    slashes: false,
  };
  if (envConfig.IS_DEV && process.argv.indexOf("--noDevServer") === -1) {
    urlFormatOptions.protocol = "http:";
    urlFormatOptions.host = "localhost:8080";
    urlFormatOptions.pathname = "index.html";
    urlFormatOptions.slashes = true;
  }
  if (envConfig.PLATFORM === "win32") app.setAppUserModelId("liara");
  mainWindow.loadURL(url.format(urlFormatOptions));

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    // autoUpdater.checkForUpdatesAndNotify();
    mainWindow.show();

    // Open devtools if dev
    if (envConfig.IS_DEV) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });
  mainWindow.on("close", (e) => {
    mainWindow = null;
  });
}

app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {
      console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
});

app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
});

app.whenReady().then(() => {
  envConfig.APP_VERSION = app.getVersion();
  if (envConfig.PLATFORM === "win32") {
    logger.info(envConfig.APP_VERSION);
    autoUpdater.checkForUpdatesAndNotify();
  }
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    mainWindow.show();
  });
});

ipcMain.on("asynchronous-login", async (event) => {
  logger.info("Request from IPCRenderer recieved. channle=asynchronous-login");
  event.sender.send("asynchronous-login", await readLiaraJson());
  envConfig.CHECK_API_TOKEN = true;
  logger.info("Response from IPCMain sent. channle=asynchronous-login");
});

ipcMain.on("open-console", async (event, args) => {
  logger.info("Request from IPCRenderer recieved. channle=open-console");
  if (!envConfig.OPEN_PORT) {
    const httpServer = await startServer(event);
    const encodedUrl = createEncodedUrl(httpServer.address().port, args.page);
    logger.info("Response from IPCMain sent. channle=open-console");
    return await shell.openExternal(encodedUrl);
  }
  const encodedUrl = createEncodedUrl(envConfig.OPEN_PORT, args.page);
  await shell.openExternal(encodedUrl);
  logger.info("Response from IPCMain sent. channle=open-console");
});

ipcMain.on("deploy", async (event, args) => {
  if (args.cancel) {
    return await cancelDeploy(event, args);
  }
  logger.info("Request from IPCRenderer recieved. channle=deploy deploy=true");
  await deploy(event, args);
  logger.info("Response from IPCMain sent. channle=deploy deploy=true");
});

ipcMain.on("change-current", async (event, args) => {
  const { email, region } = args;
  event.sender.send(
    "change-current",
    await chanegCurrentAccount(email, region)
  );
});

ipcMain.on("remove-account", async (event, args) => {
  const { email, region } = args;
  event.sender.send("remove-account", await removeAccount(email, region));
});

ipcMain.on("show-dialog", () => {
  sendLogToUser();
});

ipcMain.on("console", async (event, args) => {
  if (args.url) {
    return await shell.openExternal(args.url);
  }
  if (args.support) {
    return await shell.openExternal(envConfig.LIARA_TICKET_PAGE);
  }
});

ipcMain.on("is-directory", async (event, args) => {
  event.sender.send("is-directory", await checkDirectory(args.path));
});

ipcMain.on("errorInWindow", async (event, data) => {
  logger.error(data);
  throw data;
});
// Frame
ipcMain.handle("frame", (event, args) => {
  if (args === "minimize") mainWindow.minimize();
  if (args === "close") mainWindow.close();
});

// version
ipcMain.on("app_version", (event) => {
  event.sender.send("app_version", { version: app.getVersion() });
});

//update
autoUpdater.on("update-available", () => {
  logger.error("Update Available");
});
autoUpdater.on("download-progress", async (progressObj) => {
  logger.error(progressObj);
});
autoUpdater.on("update-downloaded", async (info) => {
  logger.error(info);
  logger.error("update-downloaded");
  const response = await showUpdateAvailable();
  if (response) {
    autoUpdater.quitAndInstall();
  }
});
autoUpdater.on("error", (e) => {
  // dialog.showMessageBox({message: e.message})
  logger.error(e);
});

// Stop error
app.allowRendererProcessReuse = true;

process.on("unhandledRejection", async (error) => {
  logger.error(error);
  await dialog.showMessageBox({
    message:
      envConfig.PLATFORM !== "win32"
        ? "متاسفانه مشکلی در عملکرد برنامه رخ داده است."
        : ".متاسفانه مشکلی در عملکرد برنامه رخ داده است",
    detail:
      envConfig.PLATFORM !== "win32"
        ? "خطا به تیم فنی گزارش داده شد. در حال حاضر، شما می‌توانید برنامه را ببندید و دوباره آن را اجرا کنید."
        : ".خطا به تیم فنی گزارش داده شد. در حال حاضر، شما می‌توانید برنامه را ببندید و دوباره آن را اجرا کنید",
    type: "error",
    title: "لیارا",
  });
  if (!envConfig.IS_DEV) {
    sentry.captureException(error, () => {
      app.exit();
    });
  }
});
process.on("uncaughtException", async (error) => {
  logger.error(error);
  await dialog.showMessageBox({
    message:
      envConfig.PLATFORM !== "win32"
        ? "متاسفانه مشکلی در عملکرد برنامه رخ داده است."
        : ".متاسفانه مشکلی در عملکرد برنامه رخ داده است",
    detail:
      envConfig.PLATFORM !== "win32"
        ? "خطا به تیم فنی گزارش داده شد. در حال حاضر، شما می‌توانید برنامه را ببندید و دوباره آن را اجرا کنید."
        : ".خطا به تیم فنی گزارش داده شد. در حال حاضر، شما می‌توانید برنامه را ببندید و دوباره آن را اجرا کنید",
    type: "error",
    title: "لیارا",
  });
  if (!envConfig.IS_DEV) {
    sentry.captureException(error, () => {
      app.exit();
    });
  }
});
