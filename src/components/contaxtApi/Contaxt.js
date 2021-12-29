import { ipcRenderer } from "electron";
import React, { Component, createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContaxtAPI = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});
  const [current, setCurrent] = useState("");

  const cliLoginUser = () => {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      if (arg.accounts !== undefined) {
        setAccounts(Object.values(arg.accounts));
        setCurrent(arg.current);
      } else {
        setAccount(arg);
      }
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  
  };

  return (
    <Context.Provider value={{ cliLoginUser , accounts , account , current }}>
      {props.children}
    </Context.Provider>
  );
};
