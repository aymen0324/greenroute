# �� GreenRoute Backend API

Backend API para la plataforma de logística sostenible GreenRoute, desarrollado con Node.js, Express, TypeScript y Prisma.

## 📋 Características

- **API RESTful** con Express.js
- **Base de datos** con Prisma ORM y SQLite
- **Autenticación JWT** con Passport.js
- **Validación** con Joi
- **Logging** con Winston
- **Rate limiting** y seguridad con Helmet
- **WebSocket** para actualizaciones en tiempo real
- **Analytics avanzados** con métricas de eficiencia
- **Documentación automática** de endpoints

## 🛠️ Stack Tecnológico

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **Prisma** - ORM moderno
- **SQLite** - Base de datos ligera
- **JWT** - Autenticación stateless
- **Socket.io** - Comunicación en tiempo real
- **Winston** - Logging avanzado
- **Joi** - Validación de datos
- **bcryptjs** - Encriptación de contraseñas

## 🚀 Instalación Rápida

### 1. Clonar y navegar al directorio
```bash
cd backend
```

### 2. Inicialización automática
```bash
npm run init
```

Este comando automáticamente:
- Instala dependencias
- Configura la base de datos
- Ejecuta migraciones
- Crea datos de ejemplo
- Construye el proyecto

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

## 📦 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo con hot reload
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
```

### Base de Datos
```bash
npm run db:migrate   # Ejecutar migraciones
npm run db:generate  # Generar cliente Prisma
npm run db:seed      # Poblar con datos de ejemplo
npm run db:reset     # Resetear base de datos
npm run db:studio    # Abrir Prisma Studio
```

### Testing y Quality
```bash
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura
npm run lint         # Linting de código
npm run lint:fix     # Linting con auto-fix
npm run format       # Formateo de código
npm run type-check   # Verificación de tipos
```

### Utilidades
```bash
npm run clean        # Limpiar archivos generados
npm run reinstall    # Reinstalar dependencias
npm run init         # Inicialización completa
```

## 🗄️ Estructura de la Base de Datos

### Modelos Principales

#### User
- Gestión de usuarios y autenticación
- Roles: ADMIN, MANAGER, DRIVER, VIEWER
- Tiers de suscripción: FREE, PRO, ENTERPRISE

#### Route
- Optimización de rutas
- Cálculo de distancias y tiempos
- Métricas de eficiencia y emisiones

#### Vehicle
- Gestión de flota
- Tracking en tiempo real
- Mantenimiento y estado

#### Delivery
- Gestión de entregas
- Tracking de paquetes
- Estados de entrega

#### Analytics
- Métricas de rendimiento
- Ahorros de combustible
- Reducción de CO₂

## 🔌 Endpoints de la API

### Autenticación
```
POST   /api/auth/register     # Registro de usuario
POST   /api/auth/login        # Login
GET    /api/auth/me           # Obtener usuario actual
POST   /api/auth/logout       # Logout
```

### Rutas
```
GET    /api/routes            # Listar rutas
POST   /api/routes            # Crear ruta
GET    /api/routes/:id        # Obtener ruta
PUT    /api/routes/:id        # Actualizar ruta
DELETE /api/routes/:id        # Eliminar ruta
```

### Vehículos
```
GET    /api/vehicles          # Listar vehículos
POST   /api/vehicles          # Crear vehículo
GET    /api/vehicles/:id      # Obtener vehículo
PUT    /api/vehicles/:id      # Actualizar vehículo
DELETE /api/vehicles/:id      # Eliminar vehículo
PATCH  /api/vehicles/:id/location # Actualizar ubicación
```

### Entregas
```
GET    /api/deliveries        # Listar entregas
POST   /api/deliveries        # Crear entrega
GET    /api/deliveries/:id    # Obtener entrega
PUT    /api/deliveries/:id    # Actualizar entrega
DELETE /api/deliveries/:id    # Eliminar entrega
PATCH  /api/deliveries/:id/status # Actualizar estado
```

### Analytics
```
GET    /api/analytics/dashboard    # Dashboard analytics
GET    /api/analytics/routes/:id   # Analytics de ruta
GET    /api/analytics/vehicles/:id # Analytics de vehículo
GET    /api/analytics/carbon-footprint # Huella de carbono
GET    /api/analytics/efficiency   # Métricas de eficiencia
POST   /api/analytics             # Crear registro analytics
```

### Utilidades
```
GET    /health                 # Health check
GET    /                       # Información de la API
```

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación.

### Headers requeridos
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Ejemplo de login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@greenroute.com",
    "password": "password123"
  }'
```

## 📊 WebSocket Events

### Conectar
```javascript
const socket = io('http://localhost:3001');
```

### Eventos disponibles
```javascript
// Unirse a sala de usuario
socket.emit('join-user-room', userId);

// Tracking de ruta
socket.emit('track-route', routeId);

// Actualización de ubicación de vehículo
socket.emit('vehicle-location-update', {
  vehicleId: 'vehicle-id',
  location: { lat: 40.4168, lng: -3.7038 }
});

// Escuchar actualizaciones
socket.on('vehicle-location-updated', (data) => {
  console.log('Vehicle location updated:', data);
});
```

## 🔧 Variables de Entorno

Crear archivo `.env` basado en `env.example`:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5174

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Redis (opcional)
REDIS_ENABLED=false
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
```

## 🧪 Testing

### Ejecutar tests
```bash
npm run test
```

### Tests con cobertura
```bash
npm run test:coverage
```

### Tests en modo watch
```bash
npm run test:watch
```

## 📈 Monitoreo y Logging

### Logs
Los logs se guardan en:
- `logs/error.log` - Errores
- `logs/combined.log` - Todos los logs

### Métricas
- Health check: `GET /health`
- Métricas de rendimiento incluidas en analytics

## 🚀 Deploy

### Producción
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t greenroute-backend .
docker run -p 3001:3001 greenroute-backend
```

### Variables de entorno para producción
```env
NODE_ENV=production
DATABASE_URL="file:./prod.db"
JWT_SECRET=your-production-secret
CORS_ORIGIN=https://yourdomain.com
```

## 🔍 Debugging

### Logs detallados
```bash
LOG_LEVEL=debug npm run dev
```

### Prisma Studio
```bash
npm run db:studio
```

### Verificar tipos
```bash
npm run type-check
```

## 📚 Documentación Adicional

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Socket.io Documentation](https://socket.io/docs/)
- [JWT.io](https://jwt.io/)

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📞 Soporte

Para soporte técnico:
- 📧 Email: support@greenroute.tech
- 🐛 Issues: [GitHub Issues](https://github.com/aymen0324/greenroute/issues)
- 📖 Docs: [Documentación](https://docs.greenroute.tech)

---

**Desarrollado con ❤️ por el equipo de GreenRoute**
