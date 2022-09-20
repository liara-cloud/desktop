import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { ipcRenderer } from "electron";
import Sidebar from "../../components/sidebar/sidebar.component";
import { toggle } from "../../store/sidebarSlice";
import {
  ActionMenu,
  NavContainer,
  NavFooter,
  NavHeader,
  OfflineAlert,
  OfflineContainer
} from "./navigation.styles";

import openMenuIcon from "../../assets/images/menu-open.svg";
import liaraLogo from "../../assets/images/logo.svg";
import OfflineIcon from "./offline-icon.component";
import { BlurContainer } from "../../components/blur-container/blur-container.styles";

const Navigation = () => {
  const [version, setVersion] = useState(null);
  const [online, setOnline] = useState(true);
  const location = useLocation();

  const dispatch = useDispatch();

  const isAuthPage = location?.pathname === "/auth";
 

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
  }, []);

  return (
    <NavContainer>
      {!online &&
        <BlurContainer>
          <OfflineAlert>
            <OfflineIcon />
            <p>لطفا دسترسی به اینترنت خود را بررسی کنید.</p>
          </OfflineAlert>
        </BlurContainer>}
      {!isAuthPage &&
        <Fragment>
          <NavHeader>
            <ActionMenu onClick={handleToggleSidebar}>
              <img src={openMenuIcon} />
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
  );
};

export default Navigation;
