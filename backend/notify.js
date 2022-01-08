const path = require("path");
const { Notification } = require("electron");

exports.showNotification = (status) => {
  const body =
    status === "done"
      ? "عملیات استقرار با موفقیت انجام شد"
      : "عملیات استقرار با خطا مواجه شد";

  if (Notification.isSupported()) {
    new Notification({
      title: "لیارا",
      body,
    }).show();
  }
};
