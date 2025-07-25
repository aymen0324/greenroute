#!/bin/bash

# 🚀 Script de Despliegue Rápido para GreenRoute
# Deploy automático a múltiples plataformas

echo "🚀 Iniciando despliegue de GreenRoute..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Selecciona la plataforma de despliegue:${NC}"
echo "1) 🌐 Vercel (Frontend) - Gratuito, URL instantánea"
echo "2) 📱 Netlify (Frontend) - Gratuito, dominio personalizado"
echo "3) ☁️ GitHub Pages - Gratuito, integrado con GitHub"
echo "4) 🐳 Railway (Full Stack) - Incluye backend y base de datos"
echo "5) 🚀 Render (Full Stack) - Alternativa gratuita a Heroku"

read -p "Elige una opción (1-5): " choice

case $choice in
  1)
    echo -e "${GREEN}📦 Desplegando en Vercel...${NC}"
    
    # Instalar Vercel CLI si no existe
    if ! command -v vercel &> /dev/null; then
        echo "Instalando Vercel CLI..."
        npm install -g vercel
    fi
    
    # Build del proyecto
    npm run build
    
    # Deploy a Vercel
    vercel --prod
    
    echo -e "${GREEN}✅ Proyecto desplegado en Vercel!${NC}"
    echo -e "${YELLOW}Tu link estará disponible en unos segundos.${NC}"
    ;;
    
  2)
    echo -e "${GREEN}📦 Desplegando en Netlify...${NC}"
    
    # Instalar Netlify CLI si no existe
    if ! command -v netlify &> /dev/null; then
        echo "Instalando Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # Build del proyecto
    npm run build
    
    # Deploy a Netlify
    netlify deploy --prod --dir=dist
    
    echo -e "${GREEN}✅ Proyecto desplegado en Netlify!${NC}"
    ;;
    
  3)
    echo -e "${GREEN}📦 Configurando GitHub Pages...${NC}"
    
    # Build del proyecto
    npm run build
    
    # Deploy a GitHub Pages
    npm run deploy:gh-pages
    
    echo -e "${GREEN}✅ Proyecto desplegado en GitHub Pages!${NC}"
    echo -e "${YELLOW}URL: https://aymen0324.github.io/greenroute${NC}"
    ;;
    
  4)
    echo -e "${GREEN}📦 Desplegando en Railway...${NC}"
    
    # Instalar Railway CLI si no existe
    if ! command -v railway &> /dev/null; then
        echo "Instalando Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Login y deploy
    railway login
    railway deploy
    
    echo -e "${GREEN}✅ Proyecto desplegado en Railway!${NC}"
    ;;
    
  5)
    echo -e "${GREEN}📦 Desplegando en Render...${NC}"
    echo -e "${YELLOW}Para Render, conecta tu repositorio GitHub en:${NC}"
    echo "https://render.com"
    echo -e "${YELLOW}Configuración automática incluida en render.yaml${NC}"
    ;;
    
  *)
    echo "Opción no válida"
    exit 1
    ;;
esac

echo -e "${GREEN}🎉 ¡Despliegue completado!${NC}"
echo -e "${BLUE}📋 Próximos pasos:${NC}"
echo "1. Comparte tu link con reclutadores"
echo "2. Añade el link a tu CV y LinkedIn"
echo "3. Monitorea las métricas de visitas"
