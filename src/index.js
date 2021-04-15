import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import Navbar from "./Navbar";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
