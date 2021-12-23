import React from "react";
import Home from "./Home";
import { MemoryRouter, Switch, Route } from "react-router";
import "../assets/css/App.css";
import "../assets/css/style.css";
import Draggable from "./Draggable";
import SelectApps from "./SelectApps";
import Deploy from "./Deploy";

const App = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/Draggable" component={Draggable} />
      <Route exact path="/" component={Home} />
      <Route exact path="/Deploy" component={Deploy} />
      <Route path="/SelectApps" component={SelectApps} />
    </Switch>
  </MemoryRouter>
);

export default App;
