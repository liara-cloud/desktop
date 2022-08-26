import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import liaraLogo from "../../assets/images/logo.svg";
import Button from "../../components/button/button.component";
import { user } from "../../store/authSlice";
import { AuthContainer, LinkContainer } from "./auth.styles";

const Auth = () => {
  const logInWithBrowser = () => {
    ipcRenderer.on("open-console", (_, arg) => {
      dispatch(user(arg));
    });
    ipcRenderer.send("open-console", { page: "login" });
  };

  const singUpWithBrowser = () => {
    ipcRenderer.on("open-console", (_, arg) => {
      dispatch(user(arg));
    });
    ipcRenderer.send("open-console", { page: "register" });
  };

  return (
    <AuthContainer>
      <img src={liaraLogo} />
      <Button onClick={logInWithBrowser}>ورود با مرورگر</Button>
      <LinkContainer onClick={singUpWithBrowser}>
        .حساب ندارید؟ عضو شوید
      </LinkContainer>
    </AuthContainer>
  );
};

export default Auth;
