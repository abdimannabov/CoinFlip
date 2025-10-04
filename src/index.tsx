import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js"; // Default import
import "./index.css"; // Import global styles including Tailwind

const rootHtmlElem = document.getElementById("root");

if (rootHtmlElem) {
  const reactAppRoot = createRoot(rootHtmlElem);
  reactAppRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found in the DOM. Cannot mount React application.");
}