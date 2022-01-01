import { ipcRenderer } from "electron";
import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Context } from "./contextApi/Context";
import { Liara } from "./icon";
import Layout from "./Layout";

const Login = (props) => {
  const context = useContext(Context);
  const { cliUser, openConsole } = context;

  useEffect(() => {
    if (
      Object.values(cliUser.accounts).length != 0 ||
      Object.entries(cliUser.account).length != 0
    ) {
      props.history.push("/Draggable");
    }
  }, [cliUser]);

  return (
    <Layout>
      <div dir="rtl">
        <div className="logo">
          <Liara />
          <span>سرویس ابری لیارا</span>
        </div>
        <div>
          <button onClick={openConsole} className="btn">
            ورود با مرورگر
          </button>
        </div>
        <span className="register">
          حساب ندارید؟
          <a href="#">وارد شوید</a>
        </span>
      </div>
    </Layout>
  );
};

export default withRouter(Login);
