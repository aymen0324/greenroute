const express = require('express');
const app = express();
const PORT = 3002;

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Test server is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📍 Available at: http://localhost:${PORT}`);
}); 