/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
  
 This is the entry point for the React app. It finds the <div id="root">
  in index.html, wraps our App in BrowserRouter (so we can use pages/URLs), and renders it.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Find the HTML element with id="root" and inject our React app into it.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter allows us to use React Router for multiple pages */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);