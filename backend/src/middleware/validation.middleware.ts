import { Request, Response, NextFunction } from 'express';

interface ValidationRequest extends Request {
  body: any;
}

export const validateRoute = (req: ValidationRequest, res: Response, next: NextFunction) => {
  const { name, startLocationLat, startLocationLng, startLocationAddress, endLocationLat, endLocationLng, endLocationAddress } = req.body;

  // Basic validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Route name is required and must be a non-empty string'
    });
  }

  if (!startLocationLat || !startLocationLng || !startLocationAddress) {
    return res.status(400).json({
      success: false,
      message: 'Start location with valid latitude, longitude and address is required'
    });
  }

  if (!endLocationLat || !endLocationLng || !endLocationAddress) {
    return res.status(400).json({
      success: false,
      message: 'End location with valid latitude, longitude and address is required'
    });
  }

  // Validate coordinates
  if (typeof startLocationLat !== 'number' || 
      typeof startLocationLng !== 'number' ||
      Math.abs(startLocationLat) > 90 || 
      Math.abs(startLocationLng) > 180) {
    return res.status(400).json({
      success: false,
      message: 'Invalid start location coordinates'
    });
  }

  if (typeof endLocationLat !== 'number' || 
      typeof endLocationLng !== 'number' ||
      Math.abs(endLocationLat) > 90 || 
      Math.abs(endLocationLng) > 180) {
    return res.status(400).json({
      success: false,
      message: 'Invalid end location coordinates'
    });
  }

  return next();
};

export const validateVehicle = (req: ValidationRequest, res: Response, next: NextFunction) => {
  const { licensePlate, model, manufacturer, fuelType } = req.body;

  if (!licensePlate || typeof licensePlate !== 'string' || licensePlate.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'License plate is required'
    });
  }

  if (fuelType && !['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID'].includes(fuelType)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid fuel type'
    });
  }

  return next();
};
