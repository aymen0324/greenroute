const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5174",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5174",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 GreenRoute Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      routes: '/api/routes',
      vehicles: '/api/vehicles',
      analytics: '/api/analytics',
      deliveries: '/api/deliveries'
    },
    documentation: 'Check README.md for API documentation',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Handle favicon requests to prevent 404 logs
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Simple mock API routes
app.use('/api/auth', require('./routes/auth-simple'));
app.use('/api/vehicles', require('./routes/vehicles-simple'));
app.use('/api/analytics', require('./routes/analytics-simple'));

// WebSocket handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('track-route', (routeId) => {
    socket.join(`route-${routeId}`);
    console.log(`Socket ${socket.id} tracking route ${routeId}`);
  });

  socket.on('vehicle-location-update', (data) => {
    socket.broadcast.emit('vehicle-location-updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Store io instance for use in other modules
app.set('io', io);

// 404 handler
app.use((req, res) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).end();
    return;
  }
  
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.originalUrl}`,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /health',
      auth: 'POST /api/auth/login',
      vehicles: 'GET /api/vehicles',
      analytics: 'GET /api/analytics/dashboard'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3001;

// Start server
async function startServer() {
  try {
    console.log('🚀 Starting GreenRoute Backend Server...');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API documentation available at http://localhost:${PORT}/`);
      console.log(`🔍 Health check available at http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Start the server
startServer();

module.exports = app;
