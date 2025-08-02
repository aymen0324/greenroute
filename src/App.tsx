import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { Layout } from './components/layout/Layout'
import { PortfolioLayout } from './components/layout/PortfolioLayout'
import { Home } from './pages/Home'
import Dashboard from './pages/Dashboard'
import AnalyticsPage from './pages/AnalyticsPage'
import ContactPage from './pages/ContactPage'
import ROICalculatorPage from './pages/ROICalculatorPage'
import FleetManagementPage from './pages/FleetManagementPage'
import AIOptimizerPage from './pages/AIOptimizerPage'
import LiveOperationsPage from './pages/LiveOperationsPage'
import GamificationPage from './pages/GamificationPage'
import BackendPage from './pages/BackendPage'
import MobilePWAPage from './pages/MobilePWAPage'
import TechnologiesPage from './pages/TechnologiesPage'
import CreativeRutasPage from './pages/CreativeRutasPage'
import EficienciaVerdePage from './pages/EficienciaVerdePage'
import EscalabilidadPage from './pages/EscalabilidadPage'
import IAAssistantPage from './pages/IAAssistantPage'
import PortfolioPage from './pages/PortfolioPage'
import PortfolioHome from './pages/PortfolioHome'
import SkillsPage from './pages/SkillsPage'
import ExperiencePage from './pages/ExperiencePage'

export function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          {/* Portfolio Routes with PortfolioLayout */}
          <Route path="/" element={
            <PortfolioLayout>
              <PortfolioHome />
            </PortfolioLayout>
          } />
          <Route path="/portfolio" element={
            <PortfolioLayout>
              <PortfolioPage />
            </PortfolioLayout>
          } />
          <Route path="/skills" element={
            <PortfolioLayout>
              <SkillsPage />
            </PortfolioLayout>
          } />
          <Route path="/experience" element={
            <PortfolioLayout>
              <ExperiencePage />
            </PortfolioLayout>
          } />
          <Route path="/contact" element={
            <PortfolioLayout>
              <ContactPage />
            </PortfolioLayout>
          } />
          
          {/* GreenRoute Routes with Layout */}
          <Route path="/greenroute" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout>
              <AnalyticsPage />
            </Layout>
          } />
          <Route path="/roi-calculator" element={
            <Layout>
              <ROICalculatorPage />
            </Layout>
          } />
          <Route path="/fleet-management" element={
            <Layout>
              <FleetManagementPage />
            </Layout>
          } />
          <Route path="/ai-optimizer" element={
            <Layout>
              <AIOptimizerPage />
            </Layout>
          } />
          <Route path="/live-operations" element={
            <Layout>
              <LiveOperationsPage />
            </Layout>
          } />
          <Route path="/gamification" element={
            <Layout>
              <GamificationPage />
            </Layout>
          } />
          <Route path="/backend" element={
            <Layout>
              <BackendPage />
            </Layout>
          } />
          <Route path="/mobile-pwa" element={
            <Layout>
              <MobilePWAPage />
            </Layout>
          } />
          <Route path="/technologies" element={
            <Layout>
              <TechnologiesPage />
            </Layout>
          } />
          <Route path="/creative-rutas" element={
            <Layout>
              <CreativeRutasPage />
            </Layout>
          } />
          <Route path="/eficiencia-verde" element={
            <Layout>
              <EficienciaVerdePage />
            </Layout>
          } />
          <Route path="/escalabilidad" element={
            <Layout>
              <EscalabilidadPage />
            </Layout>
          } />
          <Route path="/ia-assistant" element={
            <Layout>
              <IAAssistantPage />
            </Layout>
          } />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}
