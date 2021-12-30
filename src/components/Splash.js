import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Context } from "./contaxtApi/Contaxt";
function Splash(props) {
  const context = useContext(Context);
  const { cliLoginUser, cliUSer } = context;
  useEffect(() => {
    cliLoginUser();
    if (
      cliUSer.accounts.length == 0 ||
      Object.entries(cliUSer.account).length == 0
    ) {
      props.history.push("/Draggable");
    } else if (
      cliUSer.accounts.length != 0 ||
      Object.entries(cliUSer.account).length != 0
    ) {
    }
  }, []);

  return <div style={{ textAlign: "center", marginTop: "50%" }}>splash</div>;
}
export default withRouter(Splash);
