import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import "./index.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Ensure AuthProvider wraps the app */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
