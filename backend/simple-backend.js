const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Mock data
const mockRoutes = [
  {
    id: 'route-1',
    name: 'Madrid - Barcelona',
    startLocation: { lat: 40.4168, lng: -3.7038, address: 'Madrid, Spain' },
    endLocation: { lat: 41.3851, lng: 2.1734, address: 'Barcelona, Spain' },
    distance: 625,
    duration: 360,
    cost: 45.50,
    carbonFootprint: 12.5,
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'route-2',
    name: 'Valencia - Sevilla',
    startLocation: { lat: 39.4699, lng: -0.3763, address: 'Valencia, Spain' },
    endLocation: { lat: 37.3891, lng: -5.9845, address: 'Sevilla, Spain' },
    distance: 520,
    duration: 300,
    cost: 38.75,
    carbonFootprint: 10.2,
    status: 'planned',
    createdAt: new Date().toISOString()
  }
];

const mockVehicles = [
  {
    id: 'vehicle-1',
    name: 'Tesla Model 3',
    type: 'electric',
    capacity: 500,
    fuelType: 'electric',
    status: 'available',
    location: { lat: 40.4168, lng: -3.7038 }
  },
  {
    id: 'vehicle-2',
    name: 'Toyota Prius',
    type: 'hybrid',
    capacity: 300,
    fuelType: 'hybrid',
    status: 'in_use',
    location: { lat: 41.3851, lng: 2.1734 }
  }
];

const mockAnalytics = {
  totalRoutes: 156,
  totalDistance: 12450,
  totalCost: 2340.50,
  carbonSaved: 89.3,
  efficiency: 94.2,
  period: 'last_30_days'
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 GreenRoute Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      routes: '/api/routes',
      vehicles: '/api/vehicles',
      analytics: '/api/analytics'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: 'development'
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      id: 'user-123',
      email: req.body.email || 'demo@greenroute.com',
      name: 'Demo User',
      token: 'mock-jwt-token-123'
    }
  });
});

app.get('/api/auth/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 'user-123',
      email: 'demo@greenroute.com',
      name: 'Demo User',
      role: 'MANAGER',
      subscriptionTier: 'PRO'
    }
  });
});

// Routes endpoints
app.get('/api/routes', (req, res) => {
  res.json({
    success: true,
    data: {
      routes: mockRoutes,
      pagination: {
        page: 1,
        limit: 10,
        total: mockRoutes.length,
        pages: 1,
        hasNext: false,
        hasPrev: false
      }
    }
  });
});

app.post('/api/routes', (req, res) => {
  const newRoute = {
    id: `route-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  mockRoutes.push(newRoute);
  
  res.status(201).json({
    success: true,
    data: newRoute,
    message: 'Route created successfully'
  });
});

// Vehicles endpoints
app.get('/api/vehicles', (req, res) => {
  res.json({
    success: true,
    data: mockVehicles
  });
});

// Analytics endpoints
app.get('/api/analytics/dashboard', (req, res) => {
  res.json({
    success: true,
    data: mockAnalytics
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.originalUrl}`,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /health',
      auth: {
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      routes: {
        list: 'GET /api/routes',
        create: 'POST /api/routes'
      },
      vehicles: {
        list: 'GET /api/vehicles'
      },
      analytics: {
        dashboard: 'GET /api/analytics/dashboard'
      }
    }
  });
});

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 GreenRoute Backend running on http://127.0.0.1:${PORT}`);
  console.log(`📚 API documentation: http://127.0.0.1:${PORT}/`);
  console.log(`🔍 Health check: http://127.0.0.1:${PORT}/health`);
  console.log('Press Ctrl+C to stop');
});

// Error handling
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
}); 