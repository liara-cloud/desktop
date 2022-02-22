const os = require('os');
const path = require('path');
const { dialog } = require('electron');
const { writeFile } = require('fs-extra');
const { logs } = require('./deploy/deploy');
const appRootDir = require('app-root-dir').get()
const {autoUpdater} =require('electron-updater')
const { envConfig } = require('./configs/envConfig');

exports.sendLogToUser = async () => {
  const file = await dialog.showSaveDialog({
    title: 'Select the File Path to save',
    defaultPath: path.join(
      os.homedir(),
      envConfig.PLATFORM === 'win32'
        ? '\\Desktop\\liara-logs.txt'
        : '/Desktop/liara-logs.txt'
    ),
    buttonLabel: 'Save',
    filters: [
      {
        extensions: ['txt'],
      },
    ],
  });

  if (!file.canceled) {
    await writeFile(file.filePath.toString(), logs.join('\n'));
  }
};


exports.showUpdateAvailable = async() => {
  const {response} = await dialog.showMessageBox({
    buttons: ['Install on next launch', 'Install now'],
    title: 'liara',
    message: "Update Available",
    detail: "A new version of liara is ready to be installed.",
    icon: `${appRootDir}/assets/icon3.png`
  })
  return response
}