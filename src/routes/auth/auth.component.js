import React from "react";
import liaraLogo from "../../assets/images/logo.svg";
import Button from "../../components/button/button.component";
import { AuthContainer, LinkContainer } from "./auth.styles";

const Auth = () => {
  const logInWithBrowser = () => {};
  const singUpWithBrowser = () => {};

  return (
    <AuthContainer>
      <img src={liaraLogo} />
      <Button>ورود با مرورگر</Button>
      <LinkContainer to="/">.حساب ندارید؟ عضو شوید</LinkContainer>
    </AuthContainer>
  );
};

export default Auth;
