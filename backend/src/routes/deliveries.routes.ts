import { Router } from 'express';

const router = Router();

// Mock deliveries endpoints
router.get('/', (req: any, res: any) => {
  res.json({
    success: true,
    data: {
      deliveries: [
        {
          id: 'delivery-1',
          routeId: 'route-1',
          vehicleId: 'vehicle-1',
          status: 'IN_TRANSIT',
          pickupLocation: {
            lat: 40.4168,
            lng: -3.7038,
            address: 'Centro Logístico Madrid'
          },
          deliveryLocation: {
            lat: 41.3851,
            lng: 2.1734,
            address: 'Puerto de Barcelona'
          },
          scheduledDelivery: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          trackingCode: 'GR-2024-001',
          priority: 'HIGH'
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        pages: 1
      }
    }
  });
});

router.post('/', (req: any, res: any) => {
  res.json({
    success: true,
    message: 'Delivery created successfully',
    data: {
      id: 'delivery-new',
      ...req.body,
      status: 'PENDING',
      trackingCode: `GR-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
  });
});

export default router;
