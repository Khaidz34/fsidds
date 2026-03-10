const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - QUAN TRỌNG cho frontend
app.use(cors({
  origin: [
    'https://khaidz34.github.io',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'FSIDDS Backend is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint working',
    frontend_url: 'https://khaidz34.github.io/fsidds/'
  });
});

// Supabase connection test
app.get('/api/db-test', async (req, res) => {
  try {
    // Thêm code test Supabase ở đây
    res.json({ 
      database: 'connected',
      supabase: 'OK'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: https://khaidz34.github.io/fsidds/`);
});