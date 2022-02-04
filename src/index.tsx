import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import BlockchainProvider from "./contexts/blockchainProvider";

ReactDOM.render(
  <BlockchainProvider>
    <App />
  </BlockchainProvider>,
  document.getElementById("root")
);

reportWebVitals();
