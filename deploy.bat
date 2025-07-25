@echo off
REM 🚀 GreenRoute - Script de Deployment para Windows
REM Autor: Aymen - Ingeniería Informática UMH

echo 🌱 Iniciando deployment de GreenRoute...

REM Verificar si estamos en el directorio correcto
if not exist "package.json" (
    echo ❌ Error: No se encontró package.json. Ejecuta desde el directorio raíz del proyecto.
    pause
    exit /b 1
)

echo 📋 Verificando dependencias...

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    pause
    exit /b 1
)

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no está instalado
    pause
    exit /b 1
)

echo ✅ Node.js y npm detectados

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ❌ Error instalando dependencias
    pause
    exit /b 1
)

REM Build del proyecto
echo 🏗️ Construyendo proyecto...
call npm run build

if errorlevel 1 (
    echo ❌ Error en el build
    pause
    exit /b 1
)

echo ✅ Build completado exitosamente

REM Información del sistema
echo 📊 Información del sistema:
echo    🖥️ OS: Windows
for /f "tokens=*" %%i in ('node --version') do echo    📝 Node.js: %%i
for /f "tokens=*" %%i in ('npm --version') do echo    📦 npm: %%i
for /f "tokens=*" %%i in ('git branch --show-current') do echo    🌿 Git branch: %%i
echo    📅 Timestamp: %date% %time%

echo.
echo 🎉 ¡Deployment completado exitosamente!
echo 🚀 Tu proyecto GreenRoute está listo para impresionar en tu CV
echo.
echo 📋 Comandos útiles:
echo    • npm run dev     - Servidor de desarrollo
echo    • npm run build   - Build de producción
echo    • npm run preview - Preview del build
echo    • git status      - Estado del repositorio
echo.
echo ✨ ¡Excelente trabajo! Tu proyecto demuestra competencias de nivel senior.

pause
