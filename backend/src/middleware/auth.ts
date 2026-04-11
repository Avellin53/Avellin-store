import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../config/database';
import { UserRole } from '@prisma/client';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    // 1. Get token from cookies or Authorization header
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'You are not logged in. Please log in to get access.' });
    }

    // 2. Verify token
    const decoded = verifyToken(token);

    // 3. Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { vendorProfile: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'The user belonging to this token no longer exists.' });
    }

    // 4. Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token. Please log in again.' });
  }
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};
