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
    message: '🚀 E2E Test - Node.js + Vercel',
    version: '1.0.0',
    deployed: 'Vercel',
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

// Export for Vercel serverless
export default app;

// Start server (only when not in Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}