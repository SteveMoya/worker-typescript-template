import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: '🚀 E2E Test - Node.js + Dokploy',
    version: '1.0.0',
    deployed: 'Dokploy',
    endpoints: {
      health: '/health',
      api: '/api/status',
    },
  });
});

// API status endpoint
app.get('/api/status', (_req, res) => {
  res.json({
    api: 'operational',
    timestamp: new Date().toISOString(),
    node: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 API: http://localhost:${PORT}/api/status`);
});

export default app;
