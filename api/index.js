import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';

import { connectDB } from '../server/config/db.js';
import authRoutes from '../server/routes/authRoutes.js';
import publicRoutes from '../server/routes/publicRoutes.js';
import adminRoutes from '../server/routes/adminRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB Atlas (mpsa_home_page)
connectDB();

// Security & Body Parser Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Cache Control middleware for public endpoints to prevent browser/CDN stale data
app.use('/api/public', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Health check
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

export default app;
