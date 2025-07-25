@echo off
REM 🚀 Script de Despliegue Rápido para Windows

echo 🚀 Iniciando despliegue de GreenRoute...
echo.
echo Selecciona la plataforma de despliegue:
echo 1^) 🌐 Vercel ^(Frontend^) - Gratuito, URL instantánea
echo 2^) 📱 Netlify ^(Frontend^) - Gratuito, dominio personalizado  
echo 3^) ☁️ GitHub Pages - Gratuito, integrado con GitHub
echo 4^) 🐳 Railway ^(Full Stack^) - Incluye backend y base de datos
echo 5^) 🚀 Render ^(Full Stack^) - Alternativa gratuita a Heroku
echo.

set /p choice="Elige una opción (1-5): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto github
if "%choice%"=="4" goto railway
if "%choice%"=="5" goto render
goto invalid

:vercel
echo [INFO] 📦 Desplegando en Vercel...

REM Verificar si Vercel CLI está instalado
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo Instalando Vercel CLI...
    npm install -g vercel
)

REM Build del proyecto
call npm run build

REM Deploy a Vercel
call vercel --prod

echo [SUCCESS] ✅ Proyecto desplegado en Vercel!
echo [INFO] Tu link estará disponible en unos segundos.
goto end

:netlify
echo [INFO] 📦 Desplegando en Netlify...

REM Verificar si Netlify CLI está instalado
where netlify >nul 2>nul
if %errorlevel% neq 0 (
    echo Instalando Netlify CLI...
    npm install -g netlify-cli
)

REM Build del proyecto
call npm run build

REM Deploy a Netlify
call netlify deploy --prod --dir=dist

echo [SUCCESS] ✅ Proyecto desplegado en Netlify!
goto end

:github
echo [INFO] 📦 Configurando GitHub Pages...

REM Build del proyecto
call npm run build

REM Deploy a GitHub Pages
call npm run deploy:gh-pages

echo [SUCCESS] ✅ Proyecto desplegado en GitHub Pages!
echo [INFO] URL: https://aymen0324.github.io/greenroute
goto end

:railway
echo [INFO] 📦 Desplegando en Railway...

REM Verificar si Railway CLI está instalado
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo Instalando Railway CLI...
    npm install -g @railway/cli
)

REM Login y deploy
call railway login
call railway deploy

echo [SUCCESS] ✅ Proyecto desplegado en Railway!
goto end

:render
echo [INFO] 📦 Desplegando en Render...
echo [INFO] Para Render, conecta tu repositorio GitHub en:
echo https://render.com
echo [INFO] Configuración automática incluida en render.yaml
goto end

:invalid
echo Opción no válida
exit /b 1

:end
echo.
echo [SUCCESS] 🎉 ¡Despliegue completado!
echo [INFO] 📋 Próximos pasos:
echo 1. Comparte tu link con reclutadores
echo 2. Añade el link a tu CV y LinkedIn  
echo 3. Monitorea las métricas de visitas
pause
