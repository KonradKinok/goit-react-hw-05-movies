import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./components/App";
import { DataConfigurationTmdbProvider } from "./components/TmdbConfigurationContext/TmdbConfigurationContext";
import "./globalStyles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <DataConfigurationTmdbProvider>
        <App />
      </DataConfigurationTmdbProvider>
    </HashRouter>
  </React.StrictMode>,
);
