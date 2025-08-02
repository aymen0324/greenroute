import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger-simple';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token required'
      });
      return;
    }

    // Verify JWT token
    const secret = process.env.JWT_SECRET || 'fallback-secret-key';
    
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        logger.warn(`Token verification failed: ${err.message}`);
        
        if (err.name === 'TokenExpiredError') {
          res.status(401).json({
            success: false,
            message: 'Token has expired'
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Invalid token'
          });
        }
        return;
      }

      (req as AuthenticatedRequest).user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };

      next();
    });

  } catch (error) {
    logger.error('Authentication middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;
    
    if (!authReq.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(authReq.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

// Optional authentication - doesn't fail if no token provided
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallback-secret-key';
    
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (!err && decoded) {
        (req as AuthenticatedRequest).user = {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role
        };
      }
      next();
    });

  } catch (error) {
    logger.error('Optional auth middleware error:', error);
    next();
  }
};
