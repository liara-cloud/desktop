import React, { memo, useEffect, useRef } from "react";
import { ArrowBottom, LiaraLight, Minimize, Time } from "./icon";
import "../assets/css/navbar.css";
import { withRouter } from "react-router";
const remote = require("electron").remote;
function Layout(props) {
  // useEffect(() => {
  //   minimize.current.addEventListener("click", function (e) {
  //     var window = remote.getCurrentWindow();
  //     window.minimize();
  //   });

  //   close.current.addEventListener("click", function (e) {
  //     var window = remote.getCurrentWindow();
  //     window.close();
  //   });
  // }, []);
  // const minimize = useRef();
  // const close = useRef();
  return (
    <>
      {/* <div id="menu-bar">
        <div className="left" role="menu">
          <span className="nav-logo">
            <LiaraLight />
          </span>

          <p className="nav-text">laira</p>
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
      </div> */}
      <div>
        {props.children}
        <p className="version">نسخه 1.0.0</p>
        {props.location.pathname !== "/" && (
          <a className="support" href="#">
            ارتباط با پشتیبانی
          </a>
        )}
      </div>
    </>
  );
}
export default withRouter(Layout);
