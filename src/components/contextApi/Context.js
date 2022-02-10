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
  const [status, setStatus] = useState("preparation-build");
  const [isDeploy, setIsDeploy] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [check, setCheck] = useState(true);
  const [online, setOnline] = useState(true);
  const [checkDirectory, setCheckDirectory] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  window.addEventListener("online", () => {
    setOnline(true);
  });

  useEffect(() => {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      setLoading(false);
      console.log(arg, "arg");
      const user = arg.map((item) => Object.values(item)[0]);
      console.log(user, "user");

      console.log(user.filter((item) => item.current)[0]);
      setAccounts(user);
      setCurrent(user.filter((item) => item.current)[0]);
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, []);

  const openConsoleLogin = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      const user = arg.map((item) => Object.values(item)[0]);

      setAccounts(user);
      setCurrent(user.filter((item) => item.current)[0]);
    });
    ipcRenderer.send("open-console", { page: "login" });
  };

  const openConsoleRegister = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("open-console", { page: "register" });
  };

  const checkIsDirectory = (path) => {
    ipcRenderer.on("is-directory", (event, arg) => {
      setCheckDirectory(arg);
    });
    ipcRenderer.send("is-directory", {
      path,
    });
  };

  const handleChangeCurrent = (email, region) => {
    ipcRenderer.on("change-current", (event, arg) => {
      if (arg !== {}) {
        const user = arg.map((item) => Object.values(item)[0]);
        setAccounts(user);
        setCurrent(user.filter((item) => item.current)[0]);
      }
    });
    ipcRenderer.send("change-current", {
      email,
      region,
    });
  };

  const handleExit = (email, region) => {
    ipcRenderer.on("remove-account", (event, arg) => {
      // clearInfo();
      let user = arg.map((item) => Object.values(item)[0]);
      console.log(user.filter((item) => item.current));

      setCurrent(user.filter((item) => item.current)[0]);
      setAccounts(user);
    });
    ipcRenderer.send("remove-account", { email, region });
  };

  let data = [];
  const deploy = () => {
    ipcRenderer.on("deploy", (event, arg) => {
      data += arg.log;
      console.log(arg);

      // Check state
      arg.state == "upload-progress" && setProgressValue(arg.percent);
      arg.state == "publish" && setPosition(arg.status);
      // Check status
      arg.status === "error" && setError(true);
      arg.status == "cancel" && setIsCancel(true);

      setLog({ text: data, state: arg.state, status: arg.status });
    });
    if (
      checkDirectory.config !== undefined &&
      checkDirectory.config !== false
    ) {
      return ipcRenderer.send("deploy", {
        path: file,
        region: current.region,
        api_token: current.api_token,
        config: checkDirectory.config,
      });
    }
    if (checkDirectory.isDirectory) {
      return ipcRenderer.send("deploy", {
        path: file,
        region: current.region,
        api_token: current.api_token,
        config: { app: selected.project_id, port },
      });
    }
  };

  const openSupport = () => {
    ipcRenderer.on("console", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("console", {
      support: true,
    });
  };

  // `https://${selected.project_id}.iran.liara.run`              -- iran
  // `https://${selected.project_id}.liara.run`                   -- german

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

    setStatus("preparation-build");

    setLog("");
    setCheckDirectory("");
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
        online,
        checkDirectory,
        progressValue,
        position,
        error,
        isCancel,
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
        checkIsDirectory,
        setCheckDirectory,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
