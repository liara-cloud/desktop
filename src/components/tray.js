const { app, Tray, Menu, nativeImage } = require("electron");

class TrayMenu {
  iconPath = "/src/assets/images/liara-t.png";
  tray;

  constructor() {
    this.tray = new Tray(this.createNativeImage());
    this.tray.setContextMenu(this.createMenu());
  }
  createNativeImage() {
    const path = `${app.getAppPath()}${this.iconPath}`;
    console.log(path);
    const image = nativeImage.createFromPath(path);
    image.setTemplateImage(true);
    return image;
  }
  createMenu() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "test",
        type: "normal",
        click: () => {
          // TODO
        },
      },
      {
        label: "Quit",
        type: "normal",
        click: () => app.quit(),
      },
    ]);
    return contextMenu;
  }
}
module.exports = TrayMenu;
