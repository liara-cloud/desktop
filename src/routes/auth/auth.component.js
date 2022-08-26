import { ipcRenderer } from "electron";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import liaraLogo from "../../assets/images/logo.svg";
import Button from "../../components/button/button.component";
import { add, current } from "../../store/authSlice";
import { AuthContainer, LinkContainer } from "./auth.styles";

const Auth = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state);

  const logInWithBrowser = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      dispatch(add(arg));
      dispatch(current(arg));
    });
    ipcRenderer.send("open-console", { page: "login" });
  };
  const singUpWithBrowser = () => {};

  console.log(accounts);
  return (
    <AuthContainer>
      <img src={liaraLogo} />
      <Button onClick={logInWithBrowser}>ورود با مرورگر</Button>
      <LinkContainer to="/">.حساب ندارید؟ عضو شوید</LinkContainer>
    </AuthContainer>
  );
};

export default Auth;
