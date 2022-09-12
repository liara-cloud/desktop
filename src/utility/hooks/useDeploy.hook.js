import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deployState } from "../../store/deploySlice";

const PAGES = {
  state: {
    init: "/init",
    "upload-progress": "/upload",
    build: "/build",
    publish: "/publish"
  },
  status: {
    cancel: "/cancel",
    error: "/error"
  }
};

const useDeploy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("object");
    ipcRenderer.on("deploy", (_, arg) => {
      const { log, state, status, percent, total, transferred } = arg;

      console.log({ state, status });

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
};

export default useDeploy;
