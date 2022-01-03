const { app, Tray, Menu, nativeImage, BrowserWindow } = require("electron");

class TrayMenu {
  iconPath = "/src/assets/images/liara-t.png";
  tray;

  constructor() {
    this.tray = new Tray(this.createNativeImage());
    this.tray.setContextMenu(this.createMenu());
  }
  createNativeImage() {
    const path = `${app.getAppPath()}${this.iconPath}`;
    const image = nativeImage.createFromPath(path);
    image.setTemplateImage(true);
    return image;
  }
  createMenu() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open Liara Desktop",
        type: "normal",
        click: async () => app.emit("activate"),
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
