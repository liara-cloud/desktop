import React from "react";
import Accounts from "./accounts/accounts.component";
import { useSelector } from "react-redux";
import { SidebarContainer } from "./sidebar.styles";
import liaraLogo from "../../assets/images/logo.svg";

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.sidebar);
  return (
    <SidebarContainer isOpen={isOpen}>
      <img src={liaraLogo} width="70" />
      <Accounts />
    </SidebarContainer>
  );
};

export default Sidebar;
