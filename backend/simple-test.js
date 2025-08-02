const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    message: '🚀 Simple test server is running!',
    timestamp: new Date().toISOString()
  }));
});

const PORT = 3003;

server.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Simple test server running on http://127.0.0.1:${PORT}`);
  console.log('Press Ctrl+C to stop');
});

server.on('error', (err) => {
  console.error('Server error:', err);
}); 