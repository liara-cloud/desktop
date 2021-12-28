import { ipcRenderer } from "electron";
import React, { Component } from "react";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liaraData: "",
    };
  }

  componentDidMount() {
    ipcRenderer.on("asynchronous-login", (event, arg) => {
      this.setState({ liaraData: arg });
    });

    ipcRenderer.send("asynchronous-login", "hello :)");
    // ipcRenderer.send("open-console", "bye :)");
  }

  render() {
    console.log(this.state.liaraData);
    return <div style={{ textAlign: "center", marginTop: "50%" }}>splash</div>;
  }
}

export default Splash;
