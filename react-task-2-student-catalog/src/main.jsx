import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

// React відображає компонент App всередині елемента #root з index.html.
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
