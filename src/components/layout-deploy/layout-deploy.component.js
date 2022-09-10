import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deployState } from "../../store/deploySlice";
import { LayoutDeployContainer } from "./layout-deploy.styles";

const statePages = {
  init: "/init",
  "upload-progress": "/upload",
  build: "/build",
  publish: "/publish",
  error: "/error",
  cancel: "/cancel"
};

const LayoutDeploy = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      if (status === "start") return navigate(statePages[state]);
    });
  }, []);

  return <LayoutDeployContainer>{children}</LayoutDeployContainer>;
};

export default LayoutDeploy;
