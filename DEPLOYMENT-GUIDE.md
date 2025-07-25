# 🚀 Guía de Deployment - Un Solo Link

## **Opción 1: Vercel (Más Rápido) ⚡**

### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Paso 2: Deploy con un comando
```bash
npm run build
vercel --prod
```

**Resultado**: Link instantáneo como `https://greenroute-xyz.vercel.app`

---

## **Opción 2: Netlify (Recomendado) 🌐**

### Método A: Desde la web
1. Ve a [netlify.com](https://netlify.com)
2. "Sites" → "Add new site" → "Deploy with Git"
3. Conecta tu GitHub y selecciona `greenroute`
4. Build command: `npm run build`
5. Publish directory: `dist`

### Método B: CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Resultado**: Link como `https://greenroute-amazing.netlify.app`

---

## **Opción 3: GitHub Pages (Gratis) 📱**

### Configuración automática:
```bash
npm run deploy:gh-pages
```

**Resultado**: `https://aymen0324.github.io/greenroute`

---

## **Opción 4: Railway (Full Stack) 🚂**

Para proyectos con backend:
1. Ve a [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repositorio
4. Railway detecta automáticamente la configuración

---

## **Scripts Automatizados Incluidos:**

### Linux/Mac:
```bash
chmod +x deploy-quick.sh
./deploy-quick.sh
```

### Windows:
```bash
deploy-quick.bat
```

---

## **🎯 Para tu CV - Links Recomendados:**

1. **Demo Principal**: Netlify o Vercel
2. **Código Fuente**: GitHub repository
3. **Documentación**: GitHub Pages

### Ejemplo perfecto para CV:
```
🌐 Demo: https://greenroute-portfolio.netlify.app
📱 Código: https://github.com/aymen0324/greenroute
📊 Docs: https://aymen0324.github.io/greenroute
```

---

## **⚡ Deploy en 30 segundos:**

1. `git push` (asegúrate que todo esté en GitHub)
2. Ve a [netlify.com](https://netlify.com) 
3. "New site from Git" → Selecciona tu repo
4. ¡Listo! Tendrás tu link en segundos

**Pro tip**: Netlify te da un dominio personalizable gratis como `greenroute-aymen.netlify.app`
