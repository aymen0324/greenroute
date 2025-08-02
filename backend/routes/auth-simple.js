const express = require('express');
const router = express.Router();

// Mock auth endpoints
router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: 'user-123',
      email: req.body.email,
      name: req.body.name,
      token: 'mock-jwt-token-123'
    }
  });
});

router.post('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      id: 'user-123',
      email: req.body.email,
      name: 'Demo User',
      token: 'mock-jwt-token-123'
    }
  });
});

router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 'user-123',
      email: 'demo@greenroute.com',
      name: 'Demo User',
      role: 'MANAGER',
      subscriptionTier: 'PRO'
    }
  });
});

module.exports = router;
