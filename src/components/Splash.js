import { ipcRenderer } from "electron";
import React from "react";
import Redirect from "react-router/Redirect";

export default function Splash() {
  const liaraData = [];
  ipcRenderer.on("asynchronous-login", (event, arg) => {
    liaraData.push(arg);
  });

  ipcRenderer.send("asynchronous-login", "hello :)");
  // ipcRenderer.send("open-console", "bye :)");

  if (1 === 1) {
    console.log(liaraData);
  }
  return (
    <div className="splash">
      <div id="spinner"></div>
    </div>
  );
}
