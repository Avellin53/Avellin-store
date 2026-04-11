import { doubleCsrf } from 'csrf-csrf';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const {
  doubleCsrfProtection,
  generateCsrfToken,
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'super_secret_fallback',
  getSessionIdentifier: (req: Request) => req.ip || 'anonymous', // In modern apps, this would be a session ID
  cookieName: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getCsrfTokenFromRequest: (req: Request) => req.headers['x-csrf-token'] as string,
});

export { doubleCsrfProtection, generateCsrfToken as generateToken };
