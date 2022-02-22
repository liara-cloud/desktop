// const { app, Tray, Menu } = require('electron');
// const appRootDir = require('app-root-dir').get();

// const { envConfig } = require('./configs/envConfig');

// class TrayMenu {
//   background = true;
//   iconPath = `${appRootDir}/assets/icon33.png`;
//   tray;

//   constructor() {
//     this.tray = new Tray(this.iconPath);
//     this.tray.setContextMenu(this.createMenu());

//     if (envConfig.PLATFORM === 'win32') {
//       this.tray.on('click', () => {
//         this.tray.popUpContextMenu();
//       });
//     }
//   }
//   // createNativeImage() {
//   //   const path = `${app.getAppPath()}${this.iconPath}`;
//   //   const image = nativeImage.createFromPath(path);
//   //   return image;
//   // }
//   createMenu() {
//     const contextMenu = Menu.buildFromTemplate([
//       {
//         label: 'Open on background',
//         type: 'checkbox',
//         checked: true,
//         click: () => (this.background = !this.background),
//       },
//       {
//         type: 'separator',
//       },
//       {
//         label: 'Open Liara Desktop',
//         type: 'normal',
//         click: async () => app.emit('activate'),
//       },
//       {
//         label: 'Quit',
//         type: 'normal',
//         click: () => app.quit(),
//       },
//     ]);
//     return contextMenu;
//   }

//   get runInBackground() {
//     return this.background;
//   }
// }
// module.exports = TrayMenu;
