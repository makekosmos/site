import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LANG } from "./i18n";
import "./ui/fonts";
import "./ui/ui.css";
import "./ui/mocks/mocks.css";
import "./ui/figures/figures.css";
import App from "./App";

document.documentElement.lang = LANG;

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
