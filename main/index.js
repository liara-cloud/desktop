// Native
const { format } = require('url');

// Packages
const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')

app.disableHardwareAcceleration();

var mainWindow;

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    backgroundColor: '#1b2129'
  })

  const devPath = 'http://localhost:8000/start'

  const prodPath = format({
    pathname: resolve('renderer/out/start/index.html'),
    protocol: 'file:',
    slashes: true
  })

  const url = isDev ? devPath : prodPath
  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

module.exports = {
  getMainWindow() {
    return mainWindow;
  }
};