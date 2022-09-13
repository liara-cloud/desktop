import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { ipcRenderer } from "electron";
import Sidebar from "../../components/sidebar/sidebar.component";
import { toggle } from "../../store/sidebarSlice";
import {
  ActionMenu,
  NavContainer,
  NavFooter,
  NavHeader
} from "./navigation.styles";

import openMenuIcon from "../../assets/images/menu-open.svg";
import closeMenuIcon from "../../assets/images/menu-close.svg";
import liaraLogo from "../../assets/images/logo.svg";

const Navigation = () => {
  const [version, setVersion] = useState(null);
  const location = useLocation();
  const { isOpen } = useSelector((state) => state.sidebar);
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
  }, []);

  return (
    <NavContainer>
      {!isAuthPage && (
        <Fragment>
          <NavHeader>
            <ActionMenu onClick={handleToggleSidebar}>
              {isOpen ? (
                <img src={closeMenuIcon} />
              ) : (
                <img src={openMenuIcon} />
              )}
            </ActionMenu>
            <img src={liaraLogo} width="70" />
          </NavHeader>
          <Sidebar />
        </Fragment>
      )}
      <Outlet />
      <NavFooter>
        <p>نسخه {version}</p>
        <a onClick={openTicketingInBrowser}>ارتباط با پشتیبانی</a>
      </NavFooter>
    </NavContainer>
  );
};

export default Navigation;
