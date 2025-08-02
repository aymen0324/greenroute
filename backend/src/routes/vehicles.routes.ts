import { Router } from 'express';
import { VehicleController } from '../controllers/vehicles.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

// All vehicle routes require authentication
router.use(authenticateToken);

// Get all vehicles
router.get('/', VehicleController.getAllVehicles);

// Get vehicle by ID
router.get('/:id', VehicleController.getVehicleById);

// Create new vehicle (admin/manager only)
router.post('/', requireRole(['admin', 'manager']), VehicleController.createVehicle);

// Update vehicle (admin/manager only)
router.put('/:id', requireRole(['admin', 'manager']), VehicleController.updateVehicle);

// Delete vehicle (admin only)
router.delete('/:id', requireRole(['admin']), VehicleController.deleteVehicle);

// Update vehicle location
router.patch('/:id/location', VehicleController.updateVehicleLocation);

// Get vehicle metrics
router.get('/:id/metrics', VehicleController.getVehicleMetrics);

export default router;
