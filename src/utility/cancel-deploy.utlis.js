import { ipcRenderer } from "electron";

const handleCancel = (projectConfig, user) => {
  const { region, api_token } = user.currentAccount;
  const {
    path,
    config: { app, port }
  } = projectConfig;

  return ipcRenderer.send("deploy", {
    region,
    api_token,
    app,
    port,
    path,
    cancel: true,
  });
};

export default handleCancel;
