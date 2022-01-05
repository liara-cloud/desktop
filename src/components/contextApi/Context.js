import { ipcRenderer } from "electron";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextAPI = (props) => {
  // State
  const [accounts, setAccounts] = useState([]);
  const [file, setFile] = useState("");
  const [port, setPort] = useState("");
  const [selected, setSelected] = useState("");
  const [log, setLog] = useState("");
  const [current, setCurrent] = useState("");

  // TODO : GET user from .liara.json
  useEffect(() => {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      if (arg.accounts !== undefined) {
        setAccounts(arg.accounts);

        setCurrent(
          Object.values(arg.accounts).filter((item) => item.current)["0"]
        );
      }
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, []);

  // TODO : this func for open Login page in CONSOLE.LIARA.IR
  const openConsoleLogin = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      setAccounts(arg.accounts);
    });
    ipcRenderer.send("open-console", { page: "login" });
  };

  // TODO : this func for open Register page in CONSOLE.LIARA.IR
  const openConsoleRegister = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("open-console", { page: "register" });
  };

  // TODO : this func for Change current user
  const handleChangeCurrent = (email, region) => {
    ipcRenderer.on("change-current", (event, arg) => {
      setAccounts(arg.accounts);
      setCurrent(
        Object.values(arg.accounts).filter((item) => item.current)["0"]
      );
      console.log(
        Object.values(arg.accounts).filter((item) => item.current)["0"]
      );
    });
    ipcRenderer.send("change-current", {
      email,
      region,
    });
  };

  // TODO : this func for remove current account  from .liara.json
  const handleExit = (email, region) => {
    ipcRenderer.on("remove-account", (event, arg) => {
      console.log(arg);
      setAccounts(arg.accounts);
    });
    ipcRenderer.send("remove-account", { email, region });
  };

  // TODO : this func for deploy app & get logs
  let data = [];
  const deploy = () => {
    ipcRenderer.on("deploy", (event, arg) => {
      data += arg.log;
      setLog({ text: data.toString(), status: arg.status });
      console.log(arg);
    });
    ipcRenderer.send("deploy", {
      app: selected.project_id,
      port,
      path: file,
    });
  };

  return (
    <Context.Provider
      value={{
        // State
        accounts,
        file,
        port,
        selected,
        log,
        current,

        // setState & functions
        openConsoleLogin,
        openConsoleRegister,
        setFile,
        setPort,
        setSelected,
        deploy,
        handleChangeCurrent,
        setCurrent,
        handleExit,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
