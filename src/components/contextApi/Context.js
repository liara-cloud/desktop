import { ipcRenderer } from "electron";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextAPI = (props) => {
  const [cliUser, setcliUser] = useState({
    accounts: [],
    account: {},
  });
  const [file, setFile] = useState("");
  const [port, setPort] = useState("");
  const [selected, setSelected] = useState("");
  const [log, setLog] = useState("");
  useEffect(() => {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      if (arg.accounts !== undefined) {
        setcliUser({
          ...cliUser,
          accounts: arg.accounts,
        });
      } else {
        setcliUser({
          ...cliUser,
          account: arg,
        });
      }
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, []);
  // TODO:
  const openConsole = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("open-console", "liara-cloud");
  };
  let data = [];
  const deploy = () => {
    ipcRenderer.on("send-logs", (event, arg) => {
      data += arg;
      setLog(data.toString());
    });
    ipcRenderer.send("send-logs", {
      app: selected.project_id,
      port,
      path: file,
    });
  };


  return (
    <Context.Provider
      value={{
        cliUser,
        openConsole,
        file,
        setFile,
        port,
        setPort,
        selected,
        setSelected,
        log,
        deploy,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
