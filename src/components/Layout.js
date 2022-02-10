import React, { useContext, useEffect, useRef, useState } from "react";
import { LiaraLight, Minimize, Time, Warning } from "./icon";
import "../assets/css/navbar.css";
import { withRouter } from "react-router";
import { ipcRenderer } from "electron";
import { Context } from "./contextApi/Context";

function Layout(props) {
  const [version, setVersion] = useState("");

  const context = useContext(Context);
  const { online, loading, openSupport } = context;
  useEffect(() => {
    if (minimize.current && close.current) {
      minimize.current.addEventListener("click", function (e) {
        ipcRenderer.invoke("frame", "minimize");
      });
      close.current.addEventListener("click", function (e) {
        ipcRenderer.invoke("frame", "close");
      });
    }
    //
    ipcRenderer.on("app_version", (event, arg) => {
      setVersion(arg.version);
    });
    ipcRenderer.send("app_version", "liara-cloud");
  }, []);
  const minimize = useRef();
  const close = useRef();
  const isMac = window.navigator.platform === "MacIntel";
  return (
    <>
      {!online && !loading && (
        <>
          <div className="offline">
            <div className="warning-text">
              <Warning />
              <p> لطفا دسترسی به اینترنت خود را بررسی کنید </p>
            </div>
          </div>
        </>
      )}
      <div id="menu-bar" className={isMac && `mac_menu-bar`}>
        {isMac ? (
          <div className="center" role="menu">
            <p className="nav-text">liara</p>
          </div>
        ) : (
          <div className="left" role="menu">
            <span className="nav-logo">
              <LiaraLight />
            </span>
            <p className="nav-text">liara</p>
          </div>
        )}
        <div className="right">
          <button
            ref={minimize}
            className="menubar-btn navitem"
            id="minimize-btn"
          >
            <Minimize />
          </button>
          <button ref={close} className="menubar-btn navitem" id="close-btn">
            <Time />
          </button>
        </div>
      </div>

      <div>
        {props.children}
        <p className="version">نسخه {version}</p>
        {props.location.pathname !== "/" && (
          <a className="support" onClick={() => openSupport()}>
            ارتباط با پشتیبانی
          </a>
        )}
      </div>
    </>
  );
}
export default withRouter(Layout);
