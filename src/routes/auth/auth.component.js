import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import liaraLogo from "../../assets/images/logo.svg";
import Button from "../../components/button/button.component";
import { user } from "../../store/authSlice";
import { AuthContainer, LinkContainer } from "./auth.styles";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((state) => state.auth.user);

  const logInWithBrowser = () => {
    ipcRenderer.send("open-console", { page: "login" });
  };

  const singUpWithBrowser = () => {
    ipcRenderer.send("open-console", { page: "register" });
  };

  useEffect(() => {
    ipcRenderer.on("open-console", (_, arg) => {
      dispatch(user(arg));
    });
  }, []);

  useEffect(() => {
    if (currentAccount?.email) navigate("/");
  }, [currentAccount]);

  return (
    <AuthContainer>
      <img src={liaraLogo} />
      <Button
        style={{ padding: "10px 40px", fontSize: 16 }}
        onClick={logInWithBrowser}
      >
        ورود با مرورگر
      </Button>
      <LinkContainer onClick={singUpWithBrowser}>
        .حساب ندارید؟ عضو شوید
      </LinkContainer>
    </AuthContainer>
  );
};

export default Auth;
