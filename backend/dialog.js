const os = require('os');
const path = require('path');

const { dialog } = require('electron');
const { writeFile } = require('fs-extra');
const { logs } = require('./deploy/deploy');
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
