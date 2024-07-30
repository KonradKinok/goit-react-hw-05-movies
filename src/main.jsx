import "./globalStyles/index.css"
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { DataConfigurationTmdbProvider } from "./components/TmdbConfigurationContext/TmdbConfigurationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataConfigurationTmdbProvider>
        <App />
      </DataConfigurationTmdbProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
