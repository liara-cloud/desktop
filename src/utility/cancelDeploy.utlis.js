import { ipcRenderer } from "electron";

const handleCancel = (projectConfig, auth) => {
  const { region, api_token } = auth;
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
    cancel: true
  });
};

export default handleCancel;
