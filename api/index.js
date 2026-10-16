import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
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

// HTTP Response Compression (reduces Base64 payload transfer size by up to 80%)
app.use(compression());

// Security & Body Parser Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// Allowed Origins for secure CORS
const allowedOrigins = [
  'https://mpsa-home-page.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(',').forEach((url) => {
    const trimmed = url.trim().replace(/\/+$/, '');
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/+$/, '');
    if (
      allowedOrigins.includes(cleanOrigin) ||
      /^https:\/\/mpsa-home-page.*\.vercel\.app$/.test(cleanOrigin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for uploads with fallback 404 for missing image files
app.use('/uploads', (req, res, next) => {
  express.static(path.join(process.cwd(), 'uploads'))(req, res, () => {
    res.status(404).send('Upload image not found');
  });
});

// Optimized Cache Control middleware for public endpoints with stale-while-revalidate
app.use('/api/public', (req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120, stale-while-revalidate=300');
  } else {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'mpsa-home-page-api',
    school: 'MAHARANA PRATAP SCIENCE ACADEMY',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.message && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: CORS policy restriction'
    });
  }

  console.error('Express Error:', err.message || err);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    message: isProd ? 'Internal Server Error' : (err.message || 'Internal Server Error'),
    success: false
  });
});

export default app;
