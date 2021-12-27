const { sentry } = require("./configs/sentry");
const path = require("path");
const url = require("url");

const { app, BrowserWindow, ipcMain, crashReporter } = require("electron");

const { readLiaraJson } = require("./utils/account.management");
const { envConfig } = require("./configs/envConfig");

let mainWindow;

let isDev = process.env.NODE_ENV === "development" ? "development" : undefined;

function createMainWindow() {
  crashReporter.start({ submitURL: envConfig.DSN });
  console.log(path.join(__dirname, "configs", "sentry.js"));
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
      preload: path.join(__dirname, "configs", "sentry.js"),
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
  console.log(arg);
  event.sender.send = await readLiaraJson();
});
ipcMain.on("open-console", async (event, arg) => {
  //1) find open port
  //2) open console
});
// Stop error
app.allowRendererProcessReuse = true;
