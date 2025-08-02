import { Request, Response } from 'express';
import { logger } from '../config/logger-simple';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

// Mock vehicle database
let vehicles: any[] = [
  {
    id: 'vehicle-1',
    name: 'Ford Transit 2020',
    type: 'VAN',
    fuelType: 'GASOLINE',
    capacity: 2000,
    autonomy: 450,
    currentLoad: 1250,
    status: 'ACTIVE',
    location: {
      lat: 40.4168,
      lng: -3.7038,
      address: 'Madrid, Spain'
    },
    driver: {
      id: 'driver-1',
      name: 'Carlos González',
      phone: '+34 600 123 456'
    },
    fuelEfficiency: 12.5,
    co2Emissions: 180,
    maintenanceStatus: 'OK',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-07-15',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'vehicle-2',
    name: 'Mercedes Sprinter 2021',
    type: 'VAN',
    fuelType: 'DIESEL',
    capacity: 3500,
    autonomy: 600,
    currentLoad: 2100,
    status: 'ACTIVE',
    location: {
      lat: 41.3851,
      lng: 2.1734,
      address: 'Barcelona, Spain'
    },
    driver: {
      id: 'driver-2',
      name: 'María López',
      phone: '+34 600 789 012'
    },
    fuelEfficiency: 10.8,
    co2Emissions: 165,
    maintenanceStatus: 'OK',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-08-01',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  }
];

interface CreateVehicleRequest {
  name: string;
  type: 'VAN' | 'TRUCK' | 'MOTORCYCLE' | 'CAR';
  fuelType: 'GASOLINE' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
  capacity: number;
  autonomy: number;
  fuelEfficiency: number;
  co2Emissions: number;
  driverId?: string;
}

interface UpdateVehicleRequest {
  name?: string;
  status?: 'ACTIVE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';
  currentLoad?: number;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  driverId?: string;
  maintenanceStatus?: 'OK' | 'WARNING' | 'CRITICAL';
}

export class VehicleController {
  // Get all vehicles
  static async getAllVehicles(req: Request, res: Response) {
    try {
      const { status, type, driverId, search } = req.query;
      
      let filteredVehicles = vehicles;

      // Apply filters
      if (status) {
        filteredVehicles = filteredVehicles.filter(v => v.status === status);
      }

      if (type) {
        filteredVehicles = filteredVehicles.filter(v => v.type === type);
      }

      if (driverId) {
        filteredVehicles = filteredVehicles.filter(v => v.driver?.id === driverId);
      }

      if (search) {
        const searchTerm = (search as string).toLowerCase();
        filteredVehicles = filteredVehicles.filter(v => 
          v.name.toLowerCase().includes(searchTerm) ||
          v.driver?.name.toLowerCase().includes(searchTerm)
        );
      }

      // Calculate summary statistics
      const summary = {
        total: vehicles.length,
        active: vehicles.filter(v => v.status === 'ACTIVE').length,
        maintenance: vehicles.filter(v => v.status === 'MAINTENANCE').length,
        outOfService: vehicles.filter(v => v.status === 'OUT_OF_SERVICE').length,
        totalCapacity: vehicles.reduce((sum, v) => sum + v.capacity, 0),
        totalCurrentLoad: vehicles.reduce((sum, v) => sum + v.currentLoad, 0),
        averageFuelEfficiency: vehicles.reduce((sum, v) => sum + v.fuelEfficiency, 0) / vehicles.length,
        totalCo2Emissions: vehicles.reduce((sum, v) => sum + v.co2Emissions, 0)
      };

      return res.status(200).json({
        success: true,
        data: {
          vehicles: filteredVehicles,
          summary,
          pagination: {
            total: filteredVehicles.length,
            page: 1,
            limit: filteredVehicles.length
          }
        }
      });

    } catch (error) {
      logger.error('Get vehicles error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get vehicle by ID
  static async getVehicleById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const vehicle = vehicles.find(v => v.id === id);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'Vehicle not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: vehicle
      });

    } catch (error) {
      logger.error('Get vehicle by ID error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Create new vehicle
  static async createVehicle(req: Request<{}, {}, CreateVehicleRequest>, res: Response) {
    try {
      const {
        name,
        type,
        fuelType,
        capacity,
        autonomy,
        fuelEfficiency,
        co2Emissions,
        driverId
      } = req.body;

      // Validate required fields
      if (!name || !type || !fuelType || !capacity || !autonomy || !fuelEfficiency) {
        return res.status(400).json({
          success: false,
          message: 'Name, type, fuel type, capacity, autonomy, and fuel efficiency are required'
        });
      }

      // Check if vehicle name already exists
      const existingVehicle = vehicles.find(v => v.name.toLowerCase() === name.toLowerCase());
      if (existingVehicle) {
        return res.status(409).json({
          success: false,
          message: 'Vehicle with this name already exists'
        });
      }

      // Create new vehicle
      const vehicleId = `vehicle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newVehicle = {
        id: vehicleId,
        name,
        type,
        fuelType,
        capacity,
        autonomy,
        currentLoad: 0,
        status: 'ACTIVE',
        location: {
          lat: 40.4168,
          lng: -3.7038,
          address: 'Madrid, Spain' // Default location
        },
        fuelEfficiency,
        co2Emissions: co2Emissions || 0,
        maintenanceStatus: 'OK',
        lastMaintenance: null,
        nextMaintenance: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add driver if provided
      if (driverId) {
        // Note: Driver assignment would be handled separately in a real application
        // as the vehicle schema doesn't include a direct driver field
        logger.info(`Driver ID ${driverId} assigned to vehicle ${vehicleId}`);
      }

      vehicles.push(newVehicle);

      logger.info(`New vehicle created: ${name}`);

      return res.status(201).json({
        success: true,
        message: 'Vehicle created successfully',
        data: newVehicle
      });

    } catch (error) {
      logger.error('Create vehicle error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update vehicle
  static async updateVehicle(req: Request<{ id: string }, {}, UpdateVehicleRequest>, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const vehicleIndex = vehicles.findIndex(v => v.id === id);
      if (vehicleIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Vehicle not found'
        });
      }

      // Update vehicle data
      const vehicle = vehicles[vehicleIndex];
      
      if (updates.name) vehicle.name = updates.name;
      if (updates.status) vehicle.status = updates.status;
      if (updates.currentLoad !== undefined) vehicle.currentLoad = updates.currentLoad;
      if (updates.location) vehicle.location = { ...vehicle.location, ...updates.location };
      if (updates.maintenanceStatus) vehicle.maintenanceStatus = updates.maintenanceStatus;
      
      if (updates.driverId) {
        vehicle.driver = {
          id: updates.driverId,
          name: 'Driver Name', // In real app, fetch from drivers database
          phone: '+34 600 000 000'
        };
      }

      vehicle.updatedAt = new Date().toISOString();

      vehicles[vehicleIndex] = vehicle;

      logger.info(`Vehicle updated: ${id}`);

      return res.status(200).json({
        success: true,
        message: 'Vehicle updated successfully',
        data: vehicle
      });

    } catch (error) {
      logger.error('Update vehicle error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete vehicle
  static async deleteVehicle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const vehicleIndex = vehicles.findIndex(v => v.id === id);
      if (vehicleIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Vehicle not found'
        });
      }

      const vehicle = vehicles[vehicleIndex];
      vehicles.splice(vehicleIndex, 1);

      logger.info(`Vehicle deleted: ${id}`);

      return res.status(200).json({
        success: true,
        message: 'Vehicle deleted successfully',
        data: { id: vehicle.id, name: vehicle.name }
      });

    } catch (error) {
      logger.error('Delete vehicle error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update vehicle location
  static async updateVehicleLocation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { lat, lng, address } = req.body;

      if (!lat || !lng) {
        return res.status(400).json({
          success: false,
          message: 'Latitude and longitude are required'
        });
      }

      const vehicleIndex = vehicles.findIndex(v => v.id === id);
      if (vehicleIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Vehicle not found'
        });
      }

      vehicles[vehicleIndex].location = { lat, lng, address };
      vehicles[vehicleIndex].updatedAt = new Date().toISOString();

      // Emit real-time update via WebSocket
      const io = req.app.get('io');
      if (io) {
        io.emit('vehicle-location-updated', {
          vehicleId: id,
          location: vehicles[vehicleIndex].location
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Vehicle location updated successfully',
        data: vehicles[vehicleIndex]
      });

    } catch (error) {
      logger.error('Update vehicle location error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get vehicle performance metrics
  static async getVehicleMetrics(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const vehicle = vehicles.find(v => v.id === id);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'Vehicle not found'
        });
      }

      // Calculate performance metrics
      const metrics = {
        efficiency: {
          fuelEfficiency: vehicle.fuelEfficiency,
          loadUtilization: (vehicle.currentLoad / vehicle.capacity) * 100,
          co2EmissionsPerKm: vehicle.co2Emissions,
          autonomy: vehicle.autonomy
        },
        utilization: {
          currentLoad: vehicle.currentLoad,
          capacity: vehicle.capacity,
          percentage: (vehicle.currentLoad / vehicle.capacity) * 100
        },
        maintenance: {
          status: vehicle.maintenanceStatus,
          lastMaintenance: vehicle.lastMaintenance,
          nextMaintenance: vehicle.nextMaintenance,
          daysUntilMaintenance: vehicle.nextMaintenance ? 
            Math.ceil((new Date(vehicle.nextMaintenance).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null
        },
        environmental: {
          co2EmissionsPerKm: vehicle.co2Emissions,
          fuelType: vehicle.fuelType,
          estimatedDailyCo2: vehicle.co2Emissions * 100 // Assuming 100km daily average
        }
      };

      return res.status(200).json({
        success: true,
        data: {
          vehicle: {
            id: vehicle.id,
            name: vehicle.name,
            type: vehicle.type
          },
          metrics
        }
      });

    } catch (error) {
      logger.error('Get vehicle metrics error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}
