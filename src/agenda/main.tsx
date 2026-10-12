import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LANG } from "../i18n";
import "../ui/fonts";
import "../ui/ui.css";
import "./agenda.css";
import { AgendaPage } from "./AgendaPage";

document.documentElement.lang = LANG;

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <AgendaPage />
  </StrictMode>,
);
