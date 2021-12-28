import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import "../assets/css/App.css";
import "../assets/css/style.css";
import "../assets/css/splash.css";
import Draggable from "./Draggable";
import SelectApps from "./SelectApps";
import Deploy from "./Deploy";
import Splash from "./Splash";
import Login from "./login";

const App = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/Draggable" component={Draggable} />
      <Route exact path="/" component={Splash} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/Deploy" component={Deploy} />
      <Route path="/SelectApps" component={SelectApps} />
    </Switch>
  </MemoryRouter>
);

export default App;
