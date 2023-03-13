import React from "react";
import App from "./App";
import store from "./store/store";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from "react-router-dom";

const container = document.createElement("div");
container.id = "root";
document.body.appendChild(container);
const root = createRoot(container);

root.render(
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
  </Provider>
);
