import { Router, Request, Response } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { logger } from '../config/logger';
import { getDatabase } from '../config/database';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get dashboard analytics
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    return await AnalyticsController.getDashboardAnalytics(req as unknown as AuthRequest, res);
  } catch (error) {
    logger.error('Error in dashboard analytics route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get route-specific analytics
router.get('/routes/:routeId', async (req: Request, res: Response) => {
  try {
    return await AnalyticsController.getRouteAnalytics(req as unknown as AuthRequest, res);
  } catch (error) {
    logger.error('Error in route analytics route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get vehicle analytics
router.get('/vehicles/:vehicleId', async (req: Request, res: Response) => {
  try {
    return await AnalyticsController.getVehicleAnalytics(req as unknown as AuthRequest, res);
  } catch (error) {
    logger.error('Error in vehicle analytics route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get carbon footprint analysis
router.get('/carbon-footprint', async (req: Request, res: Response) => {
  try {
    return await AnalyticsController.getCarbonFootprint(req as unknown as AuthRequest, res);
  } catch (error) {
    logger.error('Error in carbon footprint route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get efficiency metrics
router.get('/efficiency', async (req: Request, res: Response) => {
  try {
    return await AnalyticsController.getEfficiencyMetrics(req as unknown as AuthRequest, res);
  } catch (error) {
    logger.error('Error in efficiency metrics route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create analytics record
router.post('/', async (req: Request, res: Response) => {
  try {
    return await AnalyticsController.createAnalytics(req as unknown as AuthRequest, res);
  } catch (error) {
    logger.error('Error in create analytics route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get analytics with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { routeId, vehicleId, metricType, startDate, endDate } = req.query;
    const userId = (req as unknown as AuthRequest).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const prisma = getDatabase();

    // Build filter object
    const filters: any = {};
    
    if (routeId) {
      // Verify route ownership
      const route = await prisma.route.findFirst({
        where: { id: routeId as string, createdBy: userId }
      });
      if (route) {
        filters.routeId = routeId;
      }
    }
    
    if (vehicleId) {
      // Verify vehicle ownership
      const vehicle = await prisma.vehicle.findFirst({
        where: { id: vehicleId as string, ownerId: userId }
      });
      if (vehicle) {
        filters.vehicleId = vehicleId;
      }
    }
    
    if (metricType) {
      filters.metricType = metricType;
    }
    
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.gte = startDate;
      if (endDate) filters.date.lte = endDate;
    }

    const analytics = await prisma.analytics.findMany({
      where: filters,
      orderBy: { date: 'desc' }
    });

    return res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    logger.error('Error in get analytics route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get analytics summary
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const userId = (req as unknown as AuthRequest).user?.id;
    const { period = 'month' } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const prisma = getDatabase();

    const startDate = new Date();
    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    // Get user's routes
    const userRoutes = await prisma.route.findMany({
      where: { createdBy: userId },
      select: { id: true }
    });

    const routeIds = userRoutes.map((route: any) => route.id);

    // Get analytics summary
    const summary = await prisma.analytics.groupBy({
      by: ['metricType'],
      where: {
        routeId: { in: routeIds },
        date: { gte: startDate.toISOString().split('T')[0] }
      },
      _sum: { value: true },
      _count: { id: true }
    });

    return res.json({
      success: true,
      data: {
        period,
        summary: summary.map((item: any) => ({
          metricType: item.metricType,
          totalValue: item._sum.value || 0,
          recordCount: item._count.id
        }))
      }
    });
  } catch (error) {
    logger.error('Error in analytics summary route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
