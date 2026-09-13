import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// HTTP Response Compression
app.use(compression());

// Security & Body Parser Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: '*', // Allow requests from React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Static directory for image uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Public API Cache Control Headers
app.use('/api/public', (req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120, stale-while-revalidate=300');
  }
  next();
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', school: 'MAHARANA PRATAP SCIENCE ACADEMY', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Express Error Stack:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    success: false
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` MPSA School Backend Server running on port ${PORT}`);
  console.log(` Public APIs:  http://localhost:${PORT}/api/public/*`);
  console.log(` Admin APIs:   http://localhost:${PORT}/api/admin/*`);
  console.log(` Auth APIs:    http://localhost:${PORT}/api/auth/*`);
  console.log(` Uploads Dir:  http://localhost:${PORT}/uploads/`);
  console.log(`====================================================`);
});
