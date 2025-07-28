import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GreenRouteLanding from "./components/GreenRouteLanding";
import Contact from "./components/contact";

import EficienciaVerdePage from "./pages/EficienciaVerdePage";
import RutasPage from "./pages/RutasPage";
import EscalabilidadPage from "./pages/EscalabilidadPage";
import TechnologiesPage from "./pages/TechnologiesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<GreenRouteLanding />}
        />
        <Route path="/eficiencia-verde" element={<EficienciaVerdePage />} />
        <Route path="/rutas" element={<RutasPage />} />
        <Route path="/escalabilidad" element={<EscalabilidadPage />} />
        <Route path="/technologies" element={<TechnologiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
