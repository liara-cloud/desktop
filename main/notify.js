const { Notification, shell, BrowserWindow } = require('electron');
const { envConfig } = require('./configs/envConfig');
const appRootDir = require('app-root-dir').get();

exports.showNotification = (status, url = '') => {
  const body = {
    success: 'عملیات استقرار با موفقیت انجام شد',
    error: 'عملیات استقرار با خطا مواجه شد',
    cancel: 'عملیات استقرار متوقف شد',
  };

  if (!Notification.isSupported()) {
    return '';
  }
  const notify = new Notification({
    title: 'لیارا',
    body: body[status],
    icon:
      envConfig.PLATFORM === 'win32'
        ? `${appRootDir}/assets/liara.png`
        : undefined,
  });

  notify.show();

  if (status === 'success') {
    notify.on('click', async () => {
      await shell.openExternal(url);
    });
  }
  if (status !== 'success') {
    BrowserWindow.getAllWindows()[0].focus();
    BrowserWindow.getAllWindows()[0].show();
  }
};
