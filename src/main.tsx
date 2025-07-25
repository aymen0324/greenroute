import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Features from "./components/FeaturesSimple";
import EficienciaVerdePage from "./pages/EficienciaVerdePage";
import RutasPage from "./pages/RutasPage";
import EscalabilidadPage from "./pages/EscalabilidadPage";
import TechnologiesPage from "./pages/TechnologiesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Features />} />
        <Route path="/eficiencia-verde" element={<EficienciaVerdePage />} />
        <Route path="/rutas-optimizadas" element={<RutasPage />} />
        <Route path="/escalabilidad" element={<EscalabilidadPage />} />
        <Route path="/tecnologias-avanzadas" element={<TechnologiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);