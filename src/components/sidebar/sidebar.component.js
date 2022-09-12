import React from "react";
import Accounts from "./accounts/accounts.component";
import { useDispatch, useSelector } from "react-redux";
import { SidebarContainer, Dividr, OptionItem } from "./sidebar.styles";
import liaraLogo from "../../assets/images/logo.svg";
import { ipcRenderer } from "electron";
import { user } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);
  const { currentAccount } = useSelector((state) => state.auth.user);

  const logInWithBrowser = () => {
    ipcRenderer.on("open-console", (_, arg) => {
      dispatch(user(arg));
    });
    ipcRenderer.send("open-console", { page: "login" });
  };

  const openTicketingInBrowser = () => {
    ipcRenderer.send("console", {
      support: true
    });
  };

  const handleLogout = () => {
    const { email, region } = currentAccount;
    ipcRenderer.on("remove-account", (_, arg) => {
      dispatch(user(arg));
      if (!arg.length) navigate("/auth");
    });
    ipcRenderer.send("remove-account", { email, region });
  };

  return (
    <SidebarContainer
      style={{ transform: `translateX(${isOpen ? 0 : `70vw`})` }}
    >
      <img src={liaraLogo} width="70" />
      <Accounts />
      <Dividr />
      <OptionItem onClick={logInWithBrowser}>افزودن حساب کاربری</OptionItem>
      <OptionItem onClick={openTicketingInBrowser}>
        ارتباط با پشتیبانی
      </OptionItem>
      <OptionItem onClick={handleLogout}>خروج</OptionItem>
    </SidebarContainer>
  );
};

export default Sidebar;
