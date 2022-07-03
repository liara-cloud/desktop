import axios from "axios";
import { ipcRenderer } from "electron";
import React, { createContext, useEffect, useState } from "react";
import { Iran } from "../icon";

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
  const [status, setStatus] = useState("preparation-build");
  const [isDeploy, setIsDeploy] = useState(false);
  const [progressValue, setProgressValue] = useState({});
  const [check, setCheck] = useState(true);
  const [online, setOnline] = useState(true);
  const [checkDirectory, setCheckDirectory] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const [next, setNext] = useState(false);
  const [fetchApp, setFetchApp] = useState(false);

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.onerror = (err) => {
    ipcRenderer.send("errorInWindow", err);
  };

  useEffect(() => {
    setLoading(true);
    if (!navigator.onLine) {
      setLoading(false);
      return setOnline(false);
    }

    ipcRenderer.on("asynchronous-login", (event, arg) => {
      setLoading(false);
      const user = arg.map((item) => {
        return {
          account_name: Object.keys(item)[0],
          ...Object.values(item)[0],
        };
      });
      setAccounts(user);
      setCurrent(user.filter((item) => item.current)[0]);
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, [online]);

  const openConsoleLogin = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      const user = arg.map((item) => {
        return {
          account_name: Object.keys(item)[0],
          ...Object.values(item)[0],
        };
      });

      setAccounts(user);
      setCurrent(user.filter((item) => item.current)[0]);
    });
    ipcRenderer.send("open-console", { page: "login" });
  };

  const openConsoleRegister = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      // console.log(arg);
    });
    ipcRenderer.send("open-console", { page: "register" });
  };

  const checkIsDirectory = (path) => {
    ipcRenderer.on("is-directory", (event, arg) => {
      if (arg.config?.app && arg.config?.platform) {
        setSelected({
          project_id: arg.config.app,
          type: arg.config.platform,
        });
        setPort(arg.config.platform);
      }
      setCheckDirectory(arg);
    });
    ipcRenderer.send("is-directory", {
      path,
    });
  };
  const handleChangeCurrent = (email, region) => {
    ipcRenderer.on("change-current", (event, arg) => {
      if (arg !== {}) {
        const user = arg.map((item) => {
          return {
            account_name: Object.keys(item)[0],
            ...Object.values(item)[0],
          };
        });
        setAccounts(user);
        setCurrent(user.filter((item) => item.current)[0]);
      }
    });
    ipcRenderer.send("change-current", {
      email,
      region,
    });
  };

  const handleLogout = (email, region) => {
    ipcRenderer.on("remove-account", (event, arg) => {
      const user = arg.map((item) => {
        return {
          account_name: Object.keys(item)[0],
          ...Object.values(item)[0],
        };
      });

      user.length === 0 && clearInfo();

      setAccounts(user);
      setCurrent(user.filter((item) => item.current)[0]);
    });
    ipcRenderer.send("remove-account", { email, region });
  };

  let data = [];
  const deploy = () => {
    ipcRenderer.on("deploy", (event, arg) => {
      data += arg.log;
      // Check state
      arg.state == "upload-progress" &&
        setProgressValue({
          percent: arg.percent,
          total: arg.total,
          upload: arg.transferred,
        });
      arg.state == "publish" && setPosition(arg.status);
      // Check status
      arg.status === "error" && setError(true);
      arg.status == "cancel" && setIsCancel(true);

      setLog({ text: data, state: arg.state, status: arg.status });
    });

    return ipcRenderer.send("deploy", {
      account_name: current.account_name,
      path: file,
      region: current.region,
      api_token: current.api_token,
      config: {
        ...checkDirectory.config,
        app: selected.project_id,
        platform: selected.type,
        port,
      },
    });
  };

  const openSupport = () => {
    ipcRenderer.on("console", (event, arg) => {
      // console.log(arg);
    });
    ipcRenderer.send("console", {
      support: true,
    });
  };
  const openCreateApp = () => {
    ipcRenderer.on("console", (event, arg) => {
      // console.log(arg);
    });
    ipcRenderer.send("console", {
      url: `https://console.liara.ir/apps/create`,
    });
  };

  // `https://${selected.project_id}.iran.liara.run`              -- iran
  // `https://${selected.project_id}.liara.run`                   -- german

  const openInBrowser = () => {
    ipcRenderer.on("console", (event, arg) => {
      // console.log(arg);
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
    ipcRenderer.on("deploy", (event, arg) => {});
    ipcRenderer.send("deploy", {
      region: current.region,
      api_token: current.api_token,
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
    setLog("");
    setCheckDirectory("");

    setStatus("preparation-build");

    setIsCancel(false);
    setError(false);
    setIsDeploy(false);
    setNext(false);
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
    { name: "flask", port: 80 },
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
      setPort(port);
    }
  }, [checkDirectory, selected]);

  const getProject = () => {
    const [{ api_token }] = Object.values(accounts).filter(
      (item) => item.current
    );

    const isIran = current && current.region === "iran";

    const API = isIran
      ? `https://api.iran.liara.ir/v1/projects`
      : `https://api.liara.ir/v1/projects`;

    return axios.get(API, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    });
  };

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
        online,
        checkDirectory,
        progressValue,
        position,
        error,
        isCancel,
        next,
        fetchApp,
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
        handleLogout,
        clearInfo,
        cancel,
        serveLog,
        setStatus,
        openSupport,
        openInBrowser,
        checkIsDirectory,
        setCheckDirectory,
        setNext,
        openCreateApp,
        setFetchApp,
        getProject,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
