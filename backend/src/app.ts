import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

// Import configurations
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { logger } from './config/logger';

// Import routes
import authRoutes from './routes/auth.routes';
import routeRoutes from './routes/routes.routes';
import vehicleRoutes from './routes/vehicles.routes';
import analyticsRoutes from './routes/analytics.routes';
import deliveryRoutes from './routes/deliveries.routes';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
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
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
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

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/deliveries', deliveryRoutes);

// WebSocket handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  // Join user room for personalized updates
  socket.on('join-user-room', (userId: string) => {
    socket.join(`user-${userId}`);
    logger.info(`User ${userId} joined their room`);
  });

  // Real-time route tracking
  socket.on('track-route', (routeId: string) => {
    socket.join(`route-${routeId}`);
    logger.info(`Socket ${socket.id} tracking route ${routeId}`);
  });

  // Vehicle location updates
  socket.on('vehicle-location-update', (data: { vehicleId: string; location: any }) => {
    socket.broadcast.emit('vehicle-location-updated', data);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Store io instance for use in other modules
app.set('io', io);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Connect to Redis (optional)
    if (process.env.REDIS_ENABLED === 'true') {
      try {
        await connectRedis();
        logger.info('Redis connected successfully');
      } catch (error) {
        logger.warn('Redis connection failed, continuing without cache:', error);
      }
    } else {
      logger.info('Redis disabled via environment variable');
    }

    // Start HTTP server
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📚 API documentation available at http://localhost:${PORT}/api/docs`);
      logger.info(`🔍 Health check available at http://localhost:${PORT}/health`);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Start the server
startServer();

export default app;
