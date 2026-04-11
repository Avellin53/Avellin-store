import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { 
  helmetMiddleware, 
  corsMiddleware, 
  generalLimiter 
} from './middleware/security';
import { doubleCsrfProtection } from './middleware/csrf';
import routes from './routes';

dotenv.config();

const app: Application = express();

// --- 1. Top-level Security Middlewares ---
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(generalLimiter);

// --- 2. Parsers ---
app.use(express.json({ limit: '10kb' })); // Body limit to prevent DoS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// --- 3. CSRF Protection (applied to all routes except excluded ones) ---
// Note: csrf-csrf automatically ignores GET/HEAD/OPTIONS based on config
app.use(doubleCsrfProtection);

// --- 4. Routes ---
app.use('/api/v1', routes);

// --- 5. 404 Handler ---
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// --- 6. Global Error Handler ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err);
  
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF Token. Possible CSRF attack detected.' });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

export default app;
