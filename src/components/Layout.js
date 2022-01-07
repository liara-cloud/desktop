import React, { memo, useContext, useEffect, useRef } from "react";
import { ArrowBottom, LiaraLight, Minimize, Time } from "./icon";
import "../assets/css/navbar.css";
import { withRouter } from "react-router";
import { ipcRenderer } from "electron";

function Layout(props) {
  useEffect(() => {
    if (minimize.current && close.current) {
      minimize.current.addEventListener("click", function (e) {
        ipcRenderer.invoke("frame", "minimize");
      });
      close.current.addEventListener("click", function (e) {
        ipcRenderer.invoke("frame", "close");
      });
    }
  }, []);
  const minimize = useRef();
  const close = useRef();
  return (
    <>
      {window.navigator.platform != "MacIntel" && (
        <div id="menu-bar">
          <div className="left" role="menu">
            <span className="nav-logo">
              <LiaraLight />
            </span>

            <p className="nav-text">liara</p>
          </div>
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
      )}
      <div>
        {props.children}
        <p className="version">نسخه 1.0.0</p>
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
