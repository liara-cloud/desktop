import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Context } from "./contextApi/Context";
import { Liara } from "./icon";
import Layout from "./Layout";

const Login = (props) => {
  const context = useContext(Context);
  const { cliUser, openConsoleLogin, openConsoleRegister } = context;

  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (
      Object.values(cliUser.accounts).length != 0 ||
      Object.entries(cliUser.account).length != 0
    ) {
      // setCheck(true);
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
          <button
            className={`btn`}
            onClick={openConsoleLogin}
            // disabled={check}
          >
            ورود با مرورگر
          </button>
        </div>
        <span onClick={openConsoleRegister} className="register">
          حساب ندارید؟
          <a href="#">عضو شوید</a>
        </span>
      </div>
    </Layout>
  );
};

export default withRouter(Login);
