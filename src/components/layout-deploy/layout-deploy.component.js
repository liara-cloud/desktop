import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deployState } from "../../store/deploySlice";
import { LayoutDeployContainer } from "./layout-deploy.styles";

const LayoutDeploy = ({ children }) => {
  const { projectConfig, auth, deploy } = useSelector((state) => state);
  const dispatch = useDispatch();

  const startDeploy = () => {
    const { path, config } = projectConfig;
    const { currentAccount } = auth.user;
    return ipcRenderer.send("deploy", {
      account_name: currentAccount.account_name,
      region: currentAccount.region,
      api_token: currentAccount.api_token,
      path,
      config: {
        ...config.config,
        app: config.project_id,
        platform: config.type,
        port: config.port
      }
    });
  };

  useEffect(() => {
    startDeploy(); // Handle Deploy
  }, []);

  useEffect(() => {
    ipcRenderer.on("deploy", (_, arg) => {
      const { log, state, status, percent, total, transferred } = arg;
      dispatch(
        deployState({
          log,
          state,
          status,
          percent,
          total,
          transferred
        })
      );
    });
  }, []);

  return <LayoutDeployContainer>{children}</LayoutDeployContainer>;
};

export default LayoutDeploy;
