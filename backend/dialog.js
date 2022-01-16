const os = require('os');
const { writeFile } = require('fs/promises');
const path = require('path');
const { dialog } = require('electron');

const { envConfig } = require('./configs/envConfig');
const { logs } = require('./utils/deploy');

exports.sendLogToUser = async () => {
  console.log(path.join(os.homedir(), '/Desktop'));
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
    await writeFile(file.filePath.toString(), JSON.stringify(logs));
  }
};
