import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  // Ignore favicon requests to reduce noise in logs
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).end();
    return;
  }
  
  // Return a more helpful error response
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.originalUrl}`,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      routes: {
        list: 'GET /api/routes',
        create: 'POST /api/routes',
        get: 'GET /api/routes/:id',
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
};
