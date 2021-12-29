const Sentry = require("@sentry/electron");

Sentry.init({
  dsn: "https://741a1b1949d749558159bfc1b7e95878@sentry.liara.ir/15",
});

const path = require("path");
const url = require("url");

const {
  app,
  BrowserWindow,
  ipcMain,
  crashReporter,
  shell,
} = require("electron");

const { envConfig } = require("./configs/envConfig");
const { readLiaraJson } = require("./utils/account.management");
const { startServer } = require("./server/startServer.js");
const { createEncodedUrl } = require("./utils/urlEncoder.js");
const { deploy } = require("./utils/deploy");

let mainWindow;

let isDev = process.env.NODE_ENV === "development" ? "development" : undefined;

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
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, "configs", "sentry.js"),
    },
  });

  const urlFormatOptions = {
    protocol: "file:",
    pathname: path.join(__dirname, "dist", "index.html"),
    slashes: true,
  };

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
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
    if (isDev) {
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

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

ipcMain.on("asynchronous-login", async (event, arg) => {
  event.sender.send("asynchronous-login", await readLiaraJson());
});
ipcMain.on("open-console", async (event, arg) => {
  let httpServer;
  if (!envConfig.OPEN_PORT) {
    httpServer = await startServer(event);
    const encodedUrl = createEncodedUrl(httpServer.address().port);
    await shell.openExternal(encodedUrl);
  }
  const encodedUrl = createEncodedUrl(httpServer.address().port);
  await shell.openExternal(encodedUrl);
});
ipcMain.on("send-logs", async (event, arg) => {
  deploy(event, arg);
});
// Stop error
app.allowRendererProcessReuse = true;
