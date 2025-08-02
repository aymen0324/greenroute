const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Mock data
const mockRoutes = [
  {
    id: 1,
    name: "Ruta Madrid-Barcelona",
    origin: "Madrid",
    destination: "Barcelona",
    distance: 625,
    duration: "6h 30m",
    co2Saved: 45.2,
    efficiency: 92,
    status: "active",
    vehicleId: "TRK-001",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Ruta Valencia-Sevilla",
    origin: "Valencia",
    destination: "Sevilla",
    distance: 480,
    duration: "5h 15m",
    co2Saved: 38.7,
    efficiency: 89,
    status: "active",
    vehicleId: "TRK-002",
    createdAt: "2024-01-15T11:45:00Z"
  },
  {
    id: 3,
    name: "Ruta Bilbao-Zaragoza",
    origin: "Bilbao",
    destination: "Zaragoza",
    distance: 320,
    duration: "3h 45m",
    co2Saved: 28.3,
    efficiency: 94,
    status: "completed",
    vehicleId: "TRK-003",
    createdAt: "2024-01-15T09:15:00Z"
  }
];

const mockVehicles = [
  {
    id: "TRK-001",
    name: "Camión Verde 1",
    type: "electric",
    capacity: "5 ton",
    status: "active",
    location: "Madrid",
    battery: 85,
    efficiency: 92,
    co2Saved: 45.2,
    lastUpdate: "2024-01-15T12:30:00Z"
  },
  {
    id: "TRK-002",
    name: "Camión Verde 2",
    type: "hybrid",
    capacity: "3 ton",
    status: "active",
    location: "Valencia",
    battery: 78,
    efficiency: 89,
    co2Saved: 38.7,
    lastUpdate: "2024-01-15T12:25:00Z"
  },
  {
    id: "TRK-003",
    name: "Camión Verde 3",
    type: "electric",
    capacity: "4 ton",
    status: "charging",
    location: "Bilbao",
    battery: 15,
    efficiency: 94,
    co2Saved: 28.3,
    lastUpdate: "2024-01-15T12:20:00Z"
  },
  {
    id: "TRK-004",
    name: "Camión Verde 4",
    type: "hybrid",
    capacity: "6 ton",
    status: "maintenance",
    location: "Barcelona",
    battery: 65,
    efficiency: 87,
    co2Saved: 52.1,
    lastUpdate: "2024-01-15T12:15:00Z"
  }
];

const mockAnalytics = {
  dashboard: {
    totalCO2Saved: 164.3,
    activeVehicles: 4,
    totalRoutes: 12,
    efficiency: 91.5,
    monthlySavings: 2847.50,
    weeklyGrowth: 12.3
  },
  savings: {
    fuel: 2847.50,
    maintenance: 1250.30,
    time: 1890.75,
    total: 5988.55
  },
  co2: {
    saved: 164.3,
    target: 200.0,
    percentage: 82.15,
    monthly: 45.2
  }
};

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 GreenRoute Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      auth: {
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      routes: {
        list: 'GET /api/routes',
        create: 'POST /api/routes',
        update: 'PUT /api/routes/:id',
        delete: 'DELETE /api/routes/:id'
      },
      vehicles: {
        list: 'GET /api/vehicles',
        create: 'POST /api/vehicles',
        update: 'PUT /api/vehicles/:id'
      },
      analytics: {
        dashboard: 'GET /api/analytics/dashboard',
        savings: 'GET /api/analytics/savings',
        co2: 'GET /api/analytics/co2'
      },
      deliveries: {
        list: 'GET /api/deliveries',
        create: 'POST /api/deliveries'
      }
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GreenRoute Backend is healthy',
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: 1,
          email: email,
          name: 'Admin User',
          role: 'admin'
        },
        token: 'mock-jwt-token-' + Date.now()
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
});

app.get('/api/auth/profile', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: 1,
        email: 'admin@greenroute.com',
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://via.placeholder.com/150'
      }
    }
  });
});

// Routes endpoints
app.get('/api/routes', (req, res) => {
  res.status(200).json({
    success: true,
    data: mockRoutes,
    total: mockRoutes.length
  });
});

app.post('/api/routes', (req, res) => {
  const newRoute = {
    id: mockRoutes.length + 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  mockRoutes.push(newRoute);
  
  res.status(201).json({
    success: true,
    message: 'Route created successfully',
    data: newRoute
  });
});

app.put('/api/routes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const routeIndex = mockRoutes.findIndex(route => route.id === id);
  
  if (routeIndex !== -1) {
    mockRoutes[routeIndex] = { ...mockRoutes[routeIndex], ...req.body };
    res.status(200).json({
      success: true,
      message: 'Route updated successfully',
      data: mockRoutes[routeIndex]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  }
});

app.delete('/api/routes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const routeIndex = mockRoutes.findIndex(route => route.id === id);
  
  if (routeIndex !== -1) {
    const deletedRoute = mockRoutes.splice(routeIndex, 1)[0];
    res.status(200).json({
      success: true,
      message: 'Route deleted successfully',
      data: deletedRoute
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  }
});

// Vehicles endpoints
app.get('/api/vehicles', (req, res) => {
  res.status(200).json({
    success: true,
    data: mockVehicles,
    total: mockVehicles.length
  });
});

app.post('/api/vehicles', (req, res) => {
  const newVehicle = {
    id: `TRK-${String(mockVehicles.length + 1).padStart(3, '0')}`,
    ...req.body,
    lastUpdate: new Date().toISOString()
  };
  
  mockVehicles.push(newVehicle);
  
  res.status(201).json({
    success: true,
    message: 'Vehicle created successfully',
    data: newVehicle
  });
});

app.put('/api/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const vehicleIndex = mockVehicles.findIndex(vehicle => vehicle.id === id);
  
  if (vehicleIndex !== -1) {
    mockVehicles[vehicleIndex] = { ...mockVehicles[vehicleIndex], ...req.body };
    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully',
      data: mockVehicles[vehicleIndex]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Vehicle not found'
    });
  }
});

// Analytics endpoints
app.get('/api/analytics/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    data: mockAnalytics.dashboard
  });
});

app.get('/api/analytics/savings', (req, res) => {
  res.status(200).json({
    success: true,
    data: mockAnalytics.savings
  });
});

app.get('/api/analytics/co2', (req, res) => {
  res.status(200).json({
    success: true,
    data: mockAnalytics.co2
  });
});

// Deliveries endpoints
app.get('/api/deliveries', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 1,
        routeId: 1,
        status: 'in_progress',
        estimatedDelivery: '2024-01-15T18:00:00Z',
        actualDelivery: null
      },
      {
        id: 2,
        routeId: 2,
        status: 'completed',
        estimatedDelivery: '2024-01-15T17:00:00Z',
        actualDelivery: '2024-01-15T16:45:00Z'
      }
    ]
  });
});

app.post('/api/deliveries', (req, res) => {
  const newDelivery = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: 'Delivery created successfully',
    data: newDelivery
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
        create: 'POST /api/routes',
        update: 'PUT /api/routes/:id',
        delete: 'DELETE /api/routes/:id'
      },
      vehicles: {
        list: 'GET /api/vehicles',
        create: 'POST /api/vehicles',
        update: 'PUT /api/vehicles/:id'
      },
      analytics: {
        dashboard: 'GET /api/analytics/dashboard',
        savings: 'GET /api/analytics/savings',
        co2: 'GET /api/analytics/co2'
      },
      deliveries: {
        list: 'GET /api/deliveries',
        create: 'POST /api/deliveries'
      }
    },
    tip: 'Make sure to include the /api prefix for API endpoints'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 GreenRoute Backend running on http://127.0.0.1:${PORT}`);
  console.log(`📚 API documentation: http://127.0.0.1:${PORT}/`);
  console.log(`🔍 Health check: http://127.0.0.1:${PORT}/health`);
  console.log('Press Ctrl+C to stop');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
}); 