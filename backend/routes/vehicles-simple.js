const express = require('express');
const router = express.Router();

// Mock vehicles endpoints
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      vehicles: [
        {
          id: 'vehicle-1',
          name: 'Ford Transit 2020',
          type: 'VAN',
          fuelType: 'GASOLINE',
          capacity: 2000,
          currentLoad: 1250,
          status: 'ACTIVE',
          location: {
            lat: 40.4168,
            lng: -3.7038,
            address: 'Madrid, Spain'
          },
          driver: {
            id: 'driver-1',
            name: 'Carlos González'
          },
          fuelEfficiency: 12.5,
          co2Emissions: 180
        },
        {
          id: 'vehicle-2',
          name: 'Mercedes Sprinter 2021',
          type: 'VAN',
          fuelType: 'DIESEL',
          capacity: 3500,
          currentLoad: 2100,
          status: 'ACTIVE',
          location: {
            lat: 41.3851,
            lng: 2.1734,
            address: 'Barcelona, Spain'
          },
          driver: {
            id: 'driver-2',
            name: 'María López'
          },
          fuelEfficiency: 10.8,
          co2Emissions: 165
        }
      ],
      summary: {
        total: 2,
        active: 2,
        maintenance: 0,
        outOfService: 0,
        totalCapacity: 5500,
        totalCurrentLoad: 3350,
        averageFuelEfficiency: 11.65,
        totalCo2Emissions: 345
      }
    }
  });
});

router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Vehicle created successfully',
    data: {
      id: 'vehicle-new',
      ...req.body,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    }
  });
});

router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Vehicle updated successfully',
    data: {
      id: req.params.id,
      ...req.body,
      updatedAt: new Date().toISOString()
    }
  });
});

module.exports = router;
