import { Request, Response, NextFunction } from 'express';
import { getDatabase } from '../config/database';
import { logger } from '../config/logger';
import { setCache, getCache, deleteCachePattern } from '../config/redis';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface RouteData {
  name: string;
  startLocationLat: number;
  startLocationLng: number;
  startLocationAddress: string;
  endLocationLat: number;
  endLocationLng: number;
  endLocationAddress: string;
  waypointsData?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export const getAllRoutes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    
    const cacheKey = `routes:${userId}:page:${page}:limit:${limit}:status:${status || 'all'}`;
    
    // Try to get from cache first
    const cachedRoutes = await getCache(cacheKey);
    if (cachedRoutes) {
      return res.status(200).json({
        success: true,
        data: cachedRoutes,
        cached: true
      });
    }

    const prisma = getDatabase();
    const skip = (page - 1) * limit;

    const whereClause: any = { createdBy: userId };
    if (status) {
      whereClause.status = status.toUpperCase();
    }

    const [routes, total] = await Promise.all([
      prisma.route.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          deliveries: {
            select: {
              id: true,
              status: true,
              scheduledDelivery: true
            }
          },
          _count: {
            select: {
              deliveries: true
            }
          }
        }
      }),
      prisma.route.count({ where: whereClause })
    ]);

    const result = {
      routes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };

    // Cache the result for 5 minutes
    await setCache(cacheKey, result, 300);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    logger.error('Error fetching routes:', error);
    return next(error);
  }
};

export const createRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const routeData: RouteData = req.body;

    // Validate required fields
    if (!routeData.name || !routeData.startLocationAddress || !routeData.endLocationAddress) {
      return res.status(400).json({
        success: false,
        message: 'Name, start location, and end location are required'
      });
    }

    const prisma = getDatabase();

    const newRoute = await prisma.route.create({
      data: {
        createdBy: userId,
        name: routeData.name,
        startLocationLat: routeData.startLocationLat,
        startLocationLng: routeData.startLocationLng,
        startLocationAddress: routeData.startLocationAddress,
        endLocationLat: routeData.endLocationLat,
        endLocationLng: routeData.endLocationLng,
        endLocationAddress: routeData.endLocationAddress,
        waypointsData: routeData.waypointsData || null,
        status: 'PLANNED'
      },
      include: {
        deliveries: true,
        _count: {
          select: {
            deliveries: true
          }
        }
      }
    });

    // Clear related caches
    await deleteCachePattern(`routes:${userId}:*`);

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`user-${userId}`).emit('route-created', newRoute);
    }

    logger.info(`Route created: ${newRoute.id} by user: ${userId}`);

    return res.status(201).json({
      success: true,
      data: newRoute,
      message: 'Route created successfully'
    });

  } catch (error) {
    logger.error('Error creating route:', error);
    return next(error);
  }
};

export const getRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const routeId = req.params.id;

    const cacheKey = `route:${routeId}:${userId}`;
    
    // Try cache first
    const cachedRoute = await getCache(cacheKey);
    if (cachedRoute) {
      return res.status(200).json({
        success: true,
        data: cachedRoute,
        cached: true
      });
    }

    const prisma = getDatabase();

    const route = await prisma.route.findFirst({
      where: {
        id: routeId,
        createdBy: userId
      },
      include: {
        deliveries: {
          include: {
            vehicle: {
              select: {
                id: true,
                licensePlate: true,
                model: true,
                manufacturer: true
              }
            },
            driver: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Cache for 10 minutes
    await setCache(cacheKey, route, 600);

    return res.status(200).json({
      success: true,
      data: route
    });

  } catch (error) {
    logger.error('Error fetching route:', error);
    return next(error);
  }
};

export const updateRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const routeId = req.params.id;
    const updateData = req.body;

    const prisma = getDatabase();

    // Check if route exists and belongs to user
    const existingRoute = await prisma.route.findFirst({
      where: {
        id: routeId,
        createdBy: userId
      }
    });

    if (!existingRoute) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    const updatedRoute = await prisma.route.update({
      where: { id: routeId },
      data: updateData,
      include: {
        deliveries: true,
        _count: {
          select: {
            deliveries: true
          }
        }
      }
    });

    // Clear related caches
    await deleteCachePattern(`route:${routeId}:*`);
    await deleteCachePattern(`routes:${userId}:*`);

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`user-${userId}`).emit('route-updated', updatedRoute);
    }

    logger.info(`Route updated: ${routeId} by user: ${userId}`);

    return res.status(200).json({
      success: true,
      data: updatedRoute,
      message: 'Route updated successfully'
    });

  } catch (error) {
    logger.error('Error updating route:', error);
    return next(error);
  }
};

export const deleteRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const routeId = req.params.id;

    const prisma = getDatabase();

    // Check if route exists and belongs to user
    const existingRoute = await prisma.route.findFirst({
      where: {
        id: routeId,
        createdBy: userId
      }
    });

    if (!existingRoute) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    await prisma.route.delete({
      where: { id: routeId }
    });

    // Clear related caches
    await deleteCachePattern(`route:${routeId}:*`);
    await deleteCachePattern(`routes:${userId}:*`);

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`user-${userId}`).emit('route-deleted', { id: routeId });
    }

    logger.info(`Route deleted: ${routeId} by user: ${userId}`);

    return res.status(200).json({
      success: true,
      message: 'Route deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting route:', error);
    return next(error);
  }
};
