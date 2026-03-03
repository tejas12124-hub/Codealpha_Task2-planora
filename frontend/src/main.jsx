import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "./styles/theme.css";
import "./styles/dashboard.css";
import "./styles/common.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Toaster position="top-right" />
      <App />
    </>
  </React.StrictMode>
);
