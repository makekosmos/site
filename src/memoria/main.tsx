import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LANG } from "../i18n";
import "../ui/fonts";
import "../ui/ui.css";
import "../agenda/agenda.css";
import { MemoriaPage } from "./MemoriaPage";

document.documentElement.lang = LANG;

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <MemoriaPage />
  </StrictMode>,
);
