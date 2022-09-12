import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deployState } from "../../store/deploySlice";
import { LayoutDeployContainer } from "./layout-deploy.styles";

const PAGES = {
  state: {
    init: "/init",
    "upload-progress": "/upload",
    // build: "/build",
    // publish: "/publish"
  },
  status: {
    // cancel: "/cancel",
    // error: "/error"
  }
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

      if (status === "start") return navigate(PAGES.state[state]);
      if (status === "cancel" || status === "error")
        return navigate(PAGES.status[status]);
    });
  }, []);

  return <LayoutDeployContainer>{children}</LayoutDeployContainer>;
};

export default LayoutDeploy;
