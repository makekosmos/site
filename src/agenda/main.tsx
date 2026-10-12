import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/onest";
import "./agenda.css";
import { AgendaPage } from "./AgendaPage";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <AgendaPage />
  </StrictMode>,
);
