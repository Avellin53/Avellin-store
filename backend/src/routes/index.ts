import { Router, Request, Response } from 'express';
import { generateToken } from '../middleware/csrf';
import authRoutes from './authRoutes';
import { protect, restrictTo } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// --- Public Routes ---
// Health Check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'AVELLIN Backend is operational' });
});

// CSRF Token Generation
router.get('/csrf-token', (req: Request, res: Response) => {
  const token = generateToken(req, res);
  res.json({ csrfToken: token });
});

// Auth Routes (Login, Register)
router.use('/auth', authRoutes);

// --- Protected Sample Routes ---

// Protected: Any logged in user
router.get('/profile', protect, (req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: { user: req.user },
  });
});

// Restricted: Vendor Dashboard access
router.get(
  '/vendor/dashboard', 
  protect, 
  restrictTo(UserRole.VENDOR), 
  (req: Request, res: Response) => {
    res.json({
      status: 'success',
      message: 'Welcome to the Vendor Dashboard',
      vendor: req.user?.vendorProfile,
    });
});

export default router;
