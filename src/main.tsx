import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShoppingCartProvider>
        <Navbar />
        <App />
      </ShoppingCartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
