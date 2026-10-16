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
const HOST = process.env.HOST || '0.0.0.0';

// Connect to MongoDB
connectDB();

// HTTP Response Compression
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
    const trimmed = url.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, server-to-server, health monitors)
    if (!origin) return callback(null, true);

    // Allow explicit origins or any Vercel deployment preview for this app
    if (
      allowedOrigins.includes(origin) ||
      /^https:\/\/mpsa-home-page.*\.vercel\.app$/.test(origin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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
  res.json({
    status: 'OK',
    service: 'mpsa-home-page-backend',
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

app.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(` MPSA School Backend Server running on http://${HOST}:${PORT}`);
  console.log(` Public APIs:  /api/public/*`);
  console.log(` Admin APIs:   /api/admin/*`);
  console.log(` Auth APIs:    /api/auth/*`);
  console.log(` Health Check: /api/health`);
  console.log(` Uploads Dir:  /uploads/`);
  console.log(`====================================================`);
});
