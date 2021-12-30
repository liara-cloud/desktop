import { ipcRenderer } from "electron";
import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContaxtAPI = (props) => {
  const [cliUSer, setCliUser] = useState({
    accounts: [],
    account: {},
    current: "",
  });

  const cliLoginUser = () => {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      if (arg.accounts !== undefined) {
        setCliUser({
          ...cliUSer,
          accounts: Object.values(arg.accounts),
          current: arg.current,
        });
      } else {
        setCliUser({
          ...cliUSer,
          account: arg,
        });
      }
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  };

  return (
    <Context.Provider value={{ cliLoginUser, cliUSer }}>
      {props.children}
    </Context.Provider>
  );
};
