import { ipcRenderer } from "electron";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextAPI = (props) => {
  const [cliUser, setcliUser] = useState({
    accounts: [],
    account: {},
  });
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

  return (
    <Context.Provider value={{ cliUser, openConsole }}>
      {props.children}
    </Context.Provider>
  );
};
