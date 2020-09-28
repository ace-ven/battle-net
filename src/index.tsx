import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AppLayout from "./components/Layout/AppLayout";
import { Provider } from "react-redux";
import storeConfig from "./store/store.config";
import "./App.scss";
import Worker from "./workers";

export const store = storeConfig();
export const appWorker = new Worker();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
