const { Notification, shell, BrowserWindow } = require("electron");

exports.showNotification = (status, app, region) => {
  const body =
    status === "done"
      ? "عملیات استقرار با موفقیت انجام شد"
      : "عملیات استقرار با خطا مواجه شد";

  const url =
    region === "iran"
      ? `https://${app}.iran.liara.run`
      : `https://${app}.liara.run`;
  if (!Notification.isSupported()) {
    return "";
  }
  const notify = new Notification({
    title: "لیارا",
    body,
  });

  notify.show();

  if (status === "done") {
    notify.on("click", async (event, args) => {
      console.log(args);
      await shell.openExternal(url);
    });
  }
  if (status !== "done") {
    console.log("hi");
    console.log(BrowserWindow.getAllWindows()[0].focus());
    console.log(BrowserWindow.getAllWindows()[0].show());
  }
};
