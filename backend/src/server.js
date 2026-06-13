import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for frontend dev and production origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      return callback(null, true);
    } else {
      console.warn(`[CORS Warning] Blocked request from unauthorized origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// API Routes
app.use('/api', enquiryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.'
  });
});

// Connect to database and start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Server] Kidrove backend is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
