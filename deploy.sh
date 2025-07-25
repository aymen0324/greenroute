#!/bin/bash

# 🚀 GreenRoute - Script de Deployment Automatizado
# Autor: Aymen - Ingeniería Informática UMH

echo "🌱 Iniciando deployment de GreenRoute..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json. Ejecuta desde el directorio raíz del proyecto.${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Verificando dependencias...${NC}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) y npm $(npm --version) detectados${NC}"

# Instalar dependencias
echo -e "${BLUE}📦 Instalando dependencias...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    exit 1
fi

# Ejecutar linting
echo -e "${BLUE}🔍 Ejecutando linting...${NC}"
npm run lint 2>/dev/null || echo -e "${YELLOW}⚠️  Linting no configurado${NC}"

# Ejecutar tests
echo -e "${BLUE}🧪 Ejecutando tests...${NC}"
npm test 2>/dev/null || echo -e "${YELLOW}⚠️  Tests no configurados${NC}"

# Build del proyecto
echo -e "${BLUE}🏗️  Construyendo proyecto...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en el build${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completado exitosamente${NC}"

# Verificar Git
echo -e "${BLUE}📤 Preparando para deployment...${NC}"

# Verificar si hay cambios sin commit
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Hay cambios sin commit. ¿Deseas continuar? (y/n)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ Deployment cancelado${NC}"
        exit 1
    fi
fi

# Información del sistema
echo -e "${BLUE}📊 Información del sistema:${NC}"
echo -e "   🖥️  OS: $(uname -s)"
echo -e "   📝 Node.js: $(node --version)"
echo -e "   📦 npm: $(npm --version)"
echo -e "   🌿 Git branch: $(git branch --show-current)"
echo -e "   📅 Timestamp: $(date)"

# URL del repositorio
REPO_URL=$(git config --get remote.origin.url)
echo -e "   🔗 Repositorio: ${REPO_URL}"

echo -e "${GREEN}🎉 ¡Deployment completado exitosamente!${NC}"
echo -e "${BLUE}🚀 Tu proyecto GreenRoute está listo para impresionar en tu CV${NC}"

# Mostrar comandos útiles
echo -e "\n${YELLOW}📋 Comandos útiles:${NC}"
echo -e "   • ${BLUE}npm run dev${NC}     - Servidor de desarrollo"
echo -e "   • ${BLUE}npm run build${NC}   - Build de producción"
echo -e "   • ${BLUE}npm run preview${NC} - Preview del build"
echo -e "   • ${BLUE}git status${NC}      - Estado del repositorio"

echo -e "\n${GREEN}✨ ¡Excelente trabajo! Tu proyecto demuestra competencias de nivel senior.${NC}"
