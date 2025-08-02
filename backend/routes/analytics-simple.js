const express = require('express');
const router = express.Router();

// Mock analytics endpoints
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      totalRoutes: 1247,
      activeRoutes: 89,
      completedToday: 156,
      fuelSavings: {
        liters: 2847.5,
        percentage: 23.7,
        costSaved: 4271.25
      },
      co2Reduction: {
        kg: 847.2,
        percentage: 18.3
      },
      efficiency: {
        current: 94.2,
        target: 96.0,
        improvement: 12.5
      },
      monthlyStats: [
        { month: 'Jan', savings: 15230, co2: 1245 },
        { month: 'Feb', savings: 18450, co2: 1456 },
        { month: 'Mar', savings: 22340, co2: 1789 },
        { month: 'Apr', savings: 19876, co2: 1654 },
        { month: 'May', savings: 21234, co2: 1823 },
        { month: 'Jun', savings: 24567, co2: 1987 }
      ],
      recentAlerts: [
        {
          id: 'alert-1',
          type: 'MAINTENANCE',
          message: 'Vehicle VAN-001 requires maintenance',
          severity: 'MEDIUM',
          timestamp: new Date().toISOString()
        },
        {
          id: 'alert-2',
          type: 'FUEL_EFFICIENCY',
          message: 'Route R-456 shows 15% fuel efficiency drop',
          severity: 'HIGH',
          timestamp: new Date().toISOString()
        }
      ]
    }
  });
});

router.get('/savings', (req, res) => {
  res.json({
    success: true,
    data: {
      totalSavings: 125460.75,
      fuelSavings: 3247.5,
      co2Reduction: 2847.3,
      costSavings: 18750.25,
      period: 'current_month',
      breakdown: {
        routeOptimization: 65,
        fuelEfficiency: 25,
        maintenancePrevention: 10
      }
    }
  });
});

router.get('/co2', (req, res) => {
  res.json({
    success: true,
    data: {
      totalReduction: 2847.3,
      monthlyReduction: 456.7,
      yearlyProjection: 5478.9,
      comparisonToLastYear: 23.7,
      carbonCredits: 127.4,
      equivalentTrees: 31
    }
  });
});

module.exports = router;
