import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import "../assets/css/App.css";
import "../assets/css/style.css";
import Draggable from "./Draggable";
import SelectApps from "./SelectApps";
import Deploy from "./Deploy";
import Login from "./login";
import { ContextAPI } from "./contextApi/Context";

const App = () => (
  <ContextAPI>
    <MemoryRouter>
      <Switch>
        <Route path="/Draggable" component={Draggable} />
        <Route exact path="/" component={Login} />
        <Route exact path="/Deploy" component={Deploy} />
        <Route path="/SelectApps" component={SelectApps} />
      </Switch>
    </MemoryRouter>
  </ContextAPI>
);

export default App;
