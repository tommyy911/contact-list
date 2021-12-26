import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {ToastrContainer} from "./components/ToastrContainer";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
      <App />
      <ToastrContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
