import React from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import store from "./store/store";

let root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

render(
  <Provider store={store}>
    <Helmet>
      <script
        async
        defer
        data-website-id="5ab09345-58d0-44c3-8262-80671f21840b"
        src="https://meta.liara.ir/umami.js"
      ></script>
    </Helmet>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </Provider>,
  document.getElementById("root")
);
