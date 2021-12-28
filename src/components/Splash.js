import { ipcRenderer } from "electron";
import React, { Component } from "react";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: "",
      current: "",
      account: "",
    };
  }

  componentDidMount() {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      if (arg.accounts !== undefined) {
        this.setState({
          accounts: Object.values(arg.accounts),
          current: arg.current,
        });
      } else {
        console.log(arg);
        this.setState({ ...this.state, account: arg });
      }
    });

    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }

  render() {
    console.log(this.state.account, this.state.accounts);
    return <div style={{ textAlign: "center", marginTop: "50%" }}>splash</div>;
  }
}

export default Splash;
