import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { ipcRenderer } from "electron";
import Sidebar from "../../components/sidebar/sidebar.component";
import { toggle } from "../../store/sidebarSlice";
import {
  ActionContainer,
  ActionMenu,
  ActionNav,
  NavContainer,
  NavFooter,
  NavHeader,
  OfflineAlert,
  OfflineContainer,
  WindowsContainer
} from "./navigation.styles";

import openMenuIcon from "../../assets/images/menu-open.svg";
import closeMenuIcon from "../../assets/images/menu-close.svg";
import liaraLogo from "../../assets/images/logo.svg";
import closeIcon from "../../assets/images/close.svg";
import minimizeIcon from "../../assets/images/minimize.svg";
import OfflineIcon from "./offline-icon.component";
import { BlurContainer } from "../../components/blur-container/blur-container.styles";

const Navigation = () => {
  const [version, setVersion] = useState(null);
  const [online, setOnline] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const { isOpen } = useSelector(state => state.sidebar);

  const isAuthPage = location?.pathname === "/auth";

  const minimize = useRef();
  const close = useRef();

  const handleToggleSidebar = () => {
    dispatch(toggle());
  };

  const openTicketingInBrowser = () => {
    ipcRenderer.send("console", {
      support: true
    });
  };

  useEffect(() => {
    ipcRenderer.on("app_version", (_, arg) => {
      setVersion(arg.version);
    });
    ipcRenderer.send("app_version", "liara-cloud");

    window.addEventListener("offline", () => {
      setOnline(false);
    });
    window.addEventListener("online", () => {
      setOnline(true);
    });
    if (minimize.current && close.current) {
      minimize.current.addEventListener("click", function(e) {
        ipcRenderer.invoke("frame", "minimize");
      });
      close.current.addEventListener("click", function(e) {
        ipcRenderer.invoke("frame", "close");
      });
    }
  }, []);

  const platformOS = window.navigator.platform;
  const isWin = platformOS === "Win32" || platformOS === "Win64";

  return (
    <WindowsContainer>
      {isWin &&
        <ActionContainer>
          {/* <img src={logo} width={"20"} /> */}
          <p>Liara Desktop</p>

          <ActionNav>
            <div ref={minimize}>
              <img src={minimizeIcon} width={"19"} />
            </div>
            <div ref={close}>
              <img src={closeIcon} width={"19"} />
            </div>
          </ActionNav>
        </ActionContainer>}
      <NavContainer>
        {!online &&
          <BlurContainer height={!isWin ? "100vh" : "94vh"}>
            <OfflineAlert>
              <OfflineIcon />
              <p>لطفا دسترسی به اینترنت خود را بررسی کنید.</p>
            </OfflineAlert>
          </BlurContainer>}

        {!isAuthPage &&
          <Fragment>
            <NavHeader>
              <ActionMenu onClick={handleToggleSidebar}>
                <img src={isOpen ? closeMenuIcon : openMenuIcon} />
              </ActionMenu>
              <img src={liaraLogo} width="70" />
            </NavHeader>
            <Sidebar />
          </Fragment>}
        <Outlet />
        <NavFooter>
          <p>
            نسخه {version}
          </p>
          <a onClick={openTicketingInBrowser}>ارتباط با پشتیبانی</a>
        </NavFooter>
      </NavContainer>
    </WindowsContainer>
  );
};

export default Navigation;
