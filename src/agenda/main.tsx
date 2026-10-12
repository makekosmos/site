import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../ui/fonts";
import "../ui/ui.css";
import "../ui/mocks/mocks.css";
import "./agenda.css";
import { AgendaPage } from "./AgendaPage";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <AgendaPage />
  </StrictMode>,
);
