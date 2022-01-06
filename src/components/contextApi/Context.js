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
  const [disabled, setDisabled] = useState(false);
  const [current, setCurrent] = useState("");

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

  const openConsoleLogin = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      setAccounts(arg.accounts);
      setCurrent(
        Object.values(arg.accounts).filter((item) => item.current)["0"]
      );
    });
    ipcRenderer.send("open-console", { page: "login" });
  };

  const openConsoleRegister = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("open-console", { page: "register" });
  };

  const handleChangeCurrent = (email, region) => {
    ipcRenderer.on("change-current", (event, arg) => {
      setAccounts(arg.accounts);
      setCurrent(
        Object.values(arg.accounts).filter((item) => item.current)["0"]
      );
    });
    ipcRenderer.send("change-current", {
      email,
      region,
    });
  };

  const handleExit = (email, region) => {
    ipcRenderer.on("remove-account", (event, arg) => {
      console.log(arg);
      setCurrent(
        Object.values(arg.accounts).filter((item) => item.current)["0"]
      );
      setAccounts(arg.accounts);
    });
    ipcRenderer.send("remove-account", { email, region });
  };

  let data = [];

  const deploy = () => {
    ipcRenderer.on("deploy", (event, arg) => {
      data += arg.log;
      setLog({ text: data, status: arg.status });
    });

    ipcRenderer.send("deploy", {
      app: selected.project_id,
      port,
      path: file,
    });
  };
  const cancel = () => {
    ipcRenderer.on("deploy", (event, arg) => {
      data += arg.log;
      setLog({ text: data, status: arg.status });
    });
    console.log(file, port);
    ipcRenderer.send("deploy", {
      app: selected.project_id,
      port,
      path: file,
      cancel: true,
    });
  };

  const clearInfo = () => {
    setFile("");

    setPort("");

    setSelected("");
  };

  // check default port
  const port_type = [
    { name: "static", port: 80 },
    { name: "react", port: 80 },
    { name: "vue", port: 80 },
    { name: "angular", port: 80 },
    { name: "laravel", port: 80 },
    { name: "wordpress", port: 80 },
    { name: "django", port: 80 },
    { name: "flask", port: 8000 },
    { name: "php", port: 80 },
    { name: "netcore", port: 80 },
  ];
  const defaultPort = port_type.filter((item) => item.name === selected.type);
  useEffect(() => {
    if (defaultPort.length != 0) {
      setDisabled(true);
      setPort(defaultPort["0"].port);
    } else {
      setDisabled(false);
      setPort("");
    }
  }, [selected]);

  return (
    <Context.Provider
      value={{
        // State
        accounts,
        file,
        port,
        selected,
        log,
        disabled,
        current,
        defaultPort,

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
        clearInfo,
        cancel,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
