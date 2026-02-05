import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { LMSProvider } from "./context/LMSContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LMSProvider>
        <App />
      </LMSProvider>
    </AuthProvider>
  </React.StrictMode>
);
