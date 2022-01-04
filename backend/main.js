const path = require("path");
const url = require("url");

const { sentry } = require("./configs/sentry");

const { app, BrowserWindow, ipcMain, shell } = require("electron");

const { envConfig } = require("./configs/envConfig");
const { readLiaraJson } = require("./utils/account.management");
const { startServer } = require("./server/startServer.js");
const { createEncodedUrl } = require("./utils/urlEncoder.js");
const { deploy } = require("./utils/deploy");
const TrayMenu = require("./tray");
const logger = require("./configs/logger");
const { chanegCurrentAccount } = require("./utils/changeCurrent");
const { removeAccount } = require("./utils/removeAccount");

let mainWindow;

const appElements = {
  tray: null,
  windows: [],
};
async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: envConfig.PLATFORM === "darwin" ? 350 : 366,
    minWidth: 366,
    autoHideMenuBar: true,
    maximizable: false,
    maxWidth: 366,
    height: 550,
    minHeight: 550,
    maxHeight: 550,
    show: false,
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const urlFormatOptions = {
    protocol: "file:",
    pathname: path.join(__dirname, "dist", "index.html"),
    slashes: true,
  };

  if (envConfig.IS_DEV && process.argv.indexOf("--noDevServer") === -1) {
    urlFormatOptions.protocol = "http:";
    urlFormatOptions.host = "localhost:8080";
    urlFormatOptions.pathname = "index.html";
    urlFormatOptions.slashes = true;
  }

  mainWindow.loadURL(url.format(urlFormatOptions));

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
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
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  appElements.tray = new TrayMenu();
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    mainWindow.show();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("asynchronous-login", async (event, arg) => {
  logger.info("Request from IPCRenderer recieved. channle=asynchronous-login");
  event.sender.send("asynchronous-login", await readLiaraJson());
  logger.info("Response from IPCMain sent. channle=asynchronous-login");
});
ipcMain.on("open-console", async (event, arg) => {
  logger.info("Request from IPCRenderer recieved. channle=open-console");
  if (!envConfig.OPEN_PORT) {
    const httpServer = await startServer(event);
    const encodedUrl = createEncodedUrl(httpServer.address().port, arg.page);
    logger.info("Response from IPCMain sent. channle=open-console");
    return await shell.openExternal(encodedUrl);
  }
  const encodedUrl = createEncodedUrl(envConfig.OPEN_PORT, arg.page);
  await shell.openExternal(encodedUrl);
  logger.info("Response from IPCMain sent. channle=open-console");
});
ipcMain.on("deploy", async (event, arg) => {
  logger.info("Request from IPCRenderer recieved. channle=deploy");
  deploy(event, arg);
  logger.info("Response from IPCMain sent. channle=deploy");
});
ipcMain.on("change-current", async (event, arg) => {
  const { email, region } = arg;
  event.sender.send(
    "change-current",
    await chanegCurrentAccount(email, region)
  );
});
ipcMain.on("remove-account", async (event, arg) => {
  const { email, region } = arg;
  event.sender.send("remove-account", await removeAccount(email, region));
});
// Stop error
app.allowRendererProcessReuse = true;
