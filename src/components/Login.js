import { ipcRenderer } from "electron";
import React from "react";
import { Liara } from "./icon";
import Layout from "./Layout";

const Login = () => {
  const openConsole = () => {
    ipcRenderer.on("open-console", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("open-console", "liara-cloud");
  };

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

export default Login;
