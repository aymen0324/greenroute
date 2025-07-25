import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Features from "./components/Features";
import Contact from "./components/contact";

import EficienciaVerdePage from "./pages/EficienciaVerdePage";
import RutasPage from "./pages/RutasPage";
import EscalabilidadPage from "./pages/EscalabilidadPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Features />
              <Contact />
            </main>
          }
        />
        <Route path="/eficiencia-verde" element={<EficienciaVerdePage />} />
        <Route path="/rutas-optimizadas" element={<RutasPage />} />
        <Route path="/escalabilidad" element={<EscalabilidadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
