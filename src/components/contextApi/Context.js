import { ipcRenderer } from "electron";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export const ContextAPI = (props) => {
  // State
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [file, setFile] = useState("");
  const [port, setPort] = useState("");
  const [selected, setSelected] = useState("");
  const [log, setLog] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [current, setCurrent] = useState("");
  const [showApps, setShowApps] = useState(false);
  const [status, setStatus] = useState("deploy");
  const [isDeploy, setIsDeploy] = useState(false);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      delay(3).then(() => {
        setLoading(false);
        if (arg.accounts !== undefined) {
          setAccounts(arg.accounts);
          setCurrent(
            Object.values(arg.accounts).filter((item) => item.current)["0"]
          );
        }
      });
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, []);

  // useEffect(() => {
  //   return async () => {
  //     ipcRenderer.on("asynchronous-login", (event, arg) => {
  //       setLoading(false);
  //       if (arg.accounts !== undefined) {
  //         setAccounts(arg.accounts);
  //         setCurrent(
  //           Object.values(arg.accounts).filter((item) => item.current)["0"]
  //         );
  //       }
  //     });
  //     ipcRenderer.send("asynchronous-login", "liara-cloud");
  //   };
  // }, []);

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
      if (Object.values(arg.accounts).length === 0) {
        clearInfo();
      }
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
      if (arg.log.includes("http") && arg.log.includes("liara.run")) {
      }
      setLog({ text: data, status: arg.status });
    });
    ipcRenderer.send("deploy", {
      app: selected.project_id,
      port,
      path: file,
      region: current.region,
    });
  };

  const openSupport = () => {
    ipcRenderer.on("console", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("console", {
      support: true,
    });
  };

  // `https://${selected.project_id}.iran.liara.run`
  // `https://${selected.project_id}.liara.run`

  const openInBrowser = () => {
    ipcRenderer.on("console", (event, arg) => {
      console.log(arg);
    });
    const url =
      current.region === "iran"
        ? `https://${selected.project_id}.iran.liara.run`
        : `https://${selected.project_id}.liara.run`;

    ipcRenderer.send("console", {
      url,
    });
  };
  const cancel = () => {
    ipcRenderer.on("deploy", (event, arg) => {
    });
    ipcRenderer.send("deploy", {
      app: selected.project_id,
      port,
      path: file,
      cancel: true,
    });
  };

  const serveLog = () => {
    ipcRenderer.send("show-dialog", "liara-cloud");
  };

  const clearInfo = () => {
    setFile("");

    setPort("");

    setSelected("");

    setStatus("deploy");

    setLog("");
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
        loading,
        accounts,
        file,
        port,
        selected,
        log,
        disabled,
        current,
        showApps,
        defaultPort,
        status,
        isDeploy,
        check,

        // setState & functions
        setCheck,
        setIsDeploy,
        setShowApps,
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
        serveLog,
        setStatus,
        openSupport,
        openInBrowser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
