import { ipcRenderer } from "electron";
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Context } from "./contaxtApi/Contaxt";
function Splash(props) {
  const context = useContext(Context);
  const { cliLoginUser, accounts, account } = context;
  useEffect(() => {
    cliLoginUser();
    if (accounts.length === 0 && account === null) {
        props.history.push("/login");
    }
    if (accounts !== [] && account !== {}) {
        props.history.push("/Draggable");
    }
  }, []);

  return <div style={{ textAlign: "center", marginTop: "50%" }}>splash</div>;
}
export default withRouter(Splash);
