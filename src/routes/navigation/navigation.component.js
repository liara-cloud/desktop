import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { isOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const isAuthPage = location.pathname === "/auth";

  const handleToggleSidebar = () => {
    dispatch(toggle());
  };

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
        <p>نسخه 1.0.7</p>
        <a>ارتباط با پشتیبانی</a>
      </NavFooter>
    </NavContainer>
  );
};

export default Navigation;
