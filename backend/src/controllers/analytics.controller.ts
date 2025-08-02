import { Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { logger } from '../config/logger';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export class AnalyticsController {
  static async getDashboardAnalytics(req: AuthRequest, res: Response) {
    try {
      const prisma = getDatabase();
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Get user's routes
      const userRoutes = await prisma.route.findMany({
        where: { createdBy: userId },
        select: { id: true }
      });

      const routeIds = userRoutes.map(route => route.id);

      // Get analytics for user's routes
      const routeAnalytics = await prisma.analytics.findMany({
        where: {
          routeId: { in: routeIds }
        }
      });

      // Get user's vehicles
      const userVehicles = await prisma.vehicle.findMany({
        where: { ownerId: userId },
        select: { id: true }
      });

      const vehicleIds = userVehicles.map(vehicle => vehicle.id);

      // Get analytics for user's vehicles
      const vehicleAnalytics = await prisma.analytics.findMany({
        where: {
          vehicleId: { in: vehicleIds }
        }
      });

      // Calculate metrics
      const fuelMetrics = await prisma.analytics.aggregate({
        where: {
          routeId: { in: routeIds },
          metricType: 'fuel_savings'
        },
        _sum: { value: true }
      });

      const co2Metrics = await prisma.analytics.aggregate({
        where: {
          routeId: { in: routeIds },
          metricType: 'co2_reduction'
        },
        _sum: { value: true }
      });

      const timeMetrics = await prisma.analytics.aggregate({
        where: {
          routeId: { in: routeIds },
          metricType: 'time_saved'
        },
        _sum: { value: true }
      });

      const costMetrics = await prisma.analytics.aggregate({
        where: {
          routeId: { in: routeIds },
          metricType: 'cost_savings'
        },
        _sum: { value: true }
      });

      const response = {
        totalRoutes: routeIds.length,
        activeRoutes: await prisma.route.count({
          where: {
            id: { in: routeIds },
            status: 'ACTIVE'
          }
        }),
        totalVehicles: vehicleIds.length,
        availableVehicles: await prisma.vehicle.count({
          where: {
            id: { in: vehicleIds },
            status: 'AVAILABLE'
          }
        }),
        pendingDeliveries: await prisma.delivery.count({
          where: {
            routeId: { in: routeIds },
            status: 'PENDING'
          }
        }),
        fuelSaved: fuelMetrics._sum.value || 0,
        co2Reduced: co2Metrics._sum.value || 0,
        timeSaved: timeMetrics._sum.value || 0,
        costSaved: costMetrics._sum.value || 0,
        recentActivity: {
          routes: await prisma.route.findMany({
            where: { id: { in: routeIds } },
            orderBy: { updatedAt: 'desc' },
            take: 5,
            select: {
              id: true,
              name: true,
              status: true,
              updatedAt: true
            }
          }),
          deliveries: await prisma.delivery.findMany({
            where: { routeId: { in: routeIds } },
            orderBy: { updatedAt: 'desc' },
            take: 5,
            select: {
              id: true,
              trackingNumber: true,
              status: true,
              updatedAt: true
            }
          })
        }
      };

      return res.json(response);
    } catch (error) {
      logger.error('Error getting dashboard analytics:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getRouteAnalytics(req: AuthRequest, res: Response) {
    try {
      const prisma = getDatabase();
      const userId = req.user?.id;
      const { routeId } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Verify route belongs to user
      const route = await prisma.route.findFirst({
        where: {
          id: routeId,
          createdBy: userId
        }
      });

      if (!route) {
        return res.status(404).json({ error: 'Route not found' });
      }

      // Get analytics for this route
      const analytics = await prisma.analytics.findMany({
        where: { routeId }
      });

      // Calculate metrics
      const fuelAnalytics = analytics.filter(a => a.metricType === 'fuel_savings');
      const co2Analytics = analytics.filter(a => a.metricType === 'co2_reduction');
      const timeAnalytics = analytics.filter(a => a.metricType === 'time_saved');
      const costAnalytics = analytics.filter(a => a.metricType === 'cost_savings');

      const response = {
        routeId,
        routeName: route.name,
        fuelSavings: fuelAnalytics.reduce((sum, a) => sum + a.value, 0),
        co2Reduction: co2Analytics.reduce((sum, a) => sum + a.value, 0),
        timeSaved: timeAnalytics.reduce((sum, a) => sum + a.value, 0),
        costSaved: costAnalytics.reduce((sum, a) => sum + a.value, 0),
        analytics: analytics.map(a => ({
          id: a.id,
          metricType: a.metricType,
          value: a.value,
          unit: a.unit,
          date: a.date,
          metadata: a.metadata
        }))
      };

      return res.json(response);
    } catch (error) {
      logger.error('Error getting route analytics:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getVehicleAnalytics(req: AuthRequest, res: Response) {
    try {
      const prisma = getDatabase();
      const userId = req.user?.id;
      const { vehicleId } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Verify vehicle belongs to user
      const vehicle = await prisma.vehicle.findFirst({
        where: {
          id: vehicleId,
          ownerId: userId
        }
      });

      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      // Get analytics for this vehicle
      const analytics = await prisma.analytics.findMany({
        where: { vehicleId }
      });

      // Calculate metrics
      const fuelAnalytics = analytics.filter(a => a.metricType === 'fuel_consumption');
      const distanceAnalytics = analytics.filter(a => a.metricType === 'distance_traveled');
      const efficiencyAnalytics = analytics.filter(a => a.metricType === 'efficiency');

      const totalFuelConsumption = fuelAnalytics.reduce((sum, a) => sum + a.value, 0);
      const totalDistance = distanceAnalytics.reduce((sum, a) => sum + a.value, 0);

      const response = {
        vehicleId,
        licensePlate: vehicle.licensePlate,
        model: vehicle.model,
        manufacturer: vehicle.manufacturer,
        totalFuelConsumption,
        totalDistance,
        averageEfficiency: totalFuelConsumption > 0 ? 
          totalDistance / totalFuelConsumption : 0,
        analytics: analytics.map(a => ({
          id: a.id,
          metricType: a.metricType,
          value: a.value,
          unit: a.unit,
          date: a.date,
          metadata: a.metadata
        }))
      };

      return res.json(response);
    } catch (error) {
      logger.error('Error getting vehicle analytics:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getCarbonFootprint(req: AuthRequest, res: Response) {
    try {
      const prisma = getDatabase();
      const userId = req.user?.id;
      const { period = '30' } = req.query; // days

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Get user's routes
      const userRoutes = await prisma.route.findMany({
        where: { createdBy: userId },
        select: { id: true }
      });

      const routeIds = userRoutes.map(route => route.id);

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(period as string));

      // Get CO2 analytics for the period
      const co2Analytics = await prisma.analytics.findMany({
        where: {
          routeId: { in: routeIds },
          metricType: 'co2_reduction',
          date: {
            gte: startDate.toISOString().split('T')[0],
            lte: endDate.toISOString().split('T')[0]
          }
        },
        orderBy: { date: 'asc' }
      });

      // Group by date
      const dailyData = co2Analytics.reduce((acc, analytics) => {
        const date = analytics.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += analytics.value;
        return acc;
      }, {} as Record<string, number>);

      const response = {
        period: parseInt(period as string),
        totalCO2Reduced: co2Analytics.reduce((sum, a) => sum + a.value, 0),
        dailyData: Object.entries(dailyData).map(([date, value]) => ({
          date,
          value
        }))
      };

      return res.json(response);
    } catch (error) {
      logger.error('Error getting carbon footprint:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getEfficiencyMetrics(req: AuthRequest, res: Response) {
    try {
      const prisma = getDatabase();
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Get user's routes
      const userRoutes = await prisma.route.findMany({
        where: { createdBy: userId },
        select: { id: true }
      });

      const routeIds = userRoutes.map(route => route.id);

      // Get efficiency analytics
      const efficiencyAnalytics = await prisma.analytics.findMany({
        where: {
          routeId: { in: routeIds },
          metricType: 'efficiency'
        }
      });

      const fuelAnalytics = await prisma.analytics.findMany({
        where: {
          routeId: { in: routeIds },
          metricType: 'fuel_savings'
        }
      });

      const timeAnalytics = await prisma.analytics.findMany({
        where: {
          routeId: { in: routeIds },
          metricType: 'time_saved'
        }
      });

      const response = {
        averageEfficiency: efficiencyAnalytics.length > 0 ? 
          efficiencyAnalytics.reduce((sum, a) => sum + a.value, 0) / efficiencyAnalytics.length : 0,
        totalFuelSaved: fuelAnalytics.reduce((sum, a) => sum + a.value, 0),
        totalTimeSaved: timeAnalytics.reduce((sum, a) => sum + a.value, 0),
        routeCount: routeIds.length,
        optimizedRoutes: await prisma.route.count({
          where: {
            id: { in: routeIds },
            optimizationLevel: { gte: 80 }
          }
        })
      };

      return res.json(response);
    } catch (error) {
      logger.error('Error getting efficiency metrics:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createAnalytics(req: AuthRequest, res: Response) {
    try {
      const prisma = getDatabase();
      const userId = req.user?.id;
      const { routeId, vehicleId, metricType, value, unit, date, metadata } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Validate required fields
      if (!metricType || value === undefined || !unit) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create analytics record
      const analytics = await prisma.analytics.create({
        data: {
          routeId,
          vehicleId,
          metricType,
          value: parseFloat(value),
          unit,
          date: date || new Date().toISOString().split('T')[0],
          metadata: metadata ? JSON.stringify(metadata) : null
        }
      });

      return res.status(201).json(analytics);
    } catch (error) {
      logger.error('Error creating analytics:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
} 