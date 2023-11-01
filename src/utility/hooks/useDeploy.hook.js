import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnsiUp } from "ansi-up";
import { deployState } from "../../store/deploySlice";

let ansi_up = new AnsiUp();

const PAGES = {
  state: {
    "preparation-build": "/upload",
    "upload-progress": "/upload",
    build: "/build",
    publish: "/publish"
  },
  status: {
    cancel: "/cancel",
    error: "/error",
    success: "/success"
  }
};

const useDeploy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ipcRenderer.on("deploy", (_, arg) => {
      const { log, state, status, percent, total, transferred } = arg;

      dispatch(
        deployState({
          log: ansi_up.ansi_to_html(log),
          state,
          status,
          percent,
          total,
          transferred
        })
      );

      if (status === "start") return navigate(PAGES.state[state]);
      if (state === "upload-progress" && status === "error")
        return navigate(`${PAGES.status[status]}#timeout`);
      if (status === "cancel" || status === "error")
        return navigate(PAGES.status[status]);
      if (state === "publish" && status === "finish")
        return navigate(PAGES.status["success"]);
    });
  }, []);
};

export default useDeploy;
