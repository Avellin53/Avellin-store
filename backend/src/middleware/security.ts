import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// 1. Helmet for Secure HTTP Headers (Top 3 Measures Included)
export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Allow Stripe/Paystack scripts for checkout logic
      scriptSrc: ["'self'", "https://js.stripe.com", "https://inline.paystack.co", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://*"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://api.paystack.co", "http://localhost:*"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  // HSTS (HTTP Strict Transport Security) - Ensures encrypted connections only
  hsts: {
    maxAge: 31536000, 
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true
});

// 2. Strict CORS Policy
export const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
});

// 3. Rate Limiting to prevent brute force and DoS
export const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_MS || '900000'), // 15 mins
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
