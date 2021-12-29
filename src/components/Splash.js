import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { withRouter } from "react-router";
import Redirect from "react-router/Redirect";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      current: "",
      account: null,
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
        this.setState({ ...this.state, account: arg });
      }
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
    if (this.state.accounts.length === 0 && this.state.account === null) {
      console.log("liara");
      this.props.history.push("/login");
    }
    // if (this.state.accounts !== [] && this.state.account !== {}) {
    //   console.log("hello");
    //   // this.props.history.push("/Draggable");
    //   console.log(this.state.accounts , this.state.account);
    // }
  }
  // componentWillUnmount() {}
  render() {
    return <div style={{ textAlign: "center", marginTop: "50%" }}>splash</div>;
  }
}

export default withRouter(Splash);
