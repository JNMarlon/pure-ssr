import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

loadableReady(() => {
  const rootElement = document.getElementById("root");
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
});
