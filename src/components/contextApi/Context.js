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
  const [current, setCurrent] = useState("");

  // const checkAccounts = () => {
  //   const checkValue = Object.values(cliUser.accounts).length == 0;
  //   setInterval(() => {
  //     checkValue && ipcRenderer.send("asynchronous-login", "liara-cloud");
  //   }, 5000);
  // };

  useEffect(() => {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      // console.log(arg);
      if (arg.accounts !== undefined) {
        setcliUser({
          ...cliUser,
          accounts: arg.accounts,
        });
        setCurrent(
          Object.values(arg.accounts).filter((item) => item.current)["0"]
        );
      } else {
        setcliUser({
          ...cliUser,
          account: arg,
        });
      }
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, [handleChangeCurrent]);

  // TODO:
  const openConsoleLogin = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      console.log(arg);
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
      setcliUser({
        ...cliUser,
        accounts: arg.accounts,
      });
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
        openConsoleLogin,
        openConsoleRegister,
        file,
        setFile,
        port,
        setPort,
        selected,
        setSelected,
        log,
        deploy,
        handleChangeCurrent,
        current,
        setCurrent,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
