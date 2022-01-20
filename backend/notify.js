const { Notification, shell, BrowserWindow } = require('electron');
const { envConfig } = require('./configs/envConfig');
const appRootDir = require('app-root-dir').get();

exports.showNotification = (status, app, region) => {
  const body =
    status === 'done'
      ? 'عملیات استقرار با موفقیت انجام شد'
      : 'عملیات استقرار با خطا مواجه شد';

  const url =
    region === 'iran'
      ? `https://${app}.iran.liara.run`
      : `https://${app}.liara.run`;
  if (!Notification.isSupported()) {
    return '';
  }
  const notify = new Notification({
    title: 'لیارا',
    body,
    icon:
      envConfig.PLATFORM === 'win32'
        ? `${appRootDir}/assets/icon3.png`
        : undefined,
  });

  notify.show();

  if (status === 'done') {
    notify.on('click', async (event, args) => {
      console.log(args);
      await shell.openExternal(url);
    });
  }
  if (status !== 'done') {
    console.log(BrowserWindow.getAllWindows()[0].focus());
    console.log(BrowserWindow.getAllWindows()[0].show());
  }
};
