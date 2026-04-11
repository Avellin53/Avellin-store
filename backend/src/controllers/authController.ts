import { Request, Response } from 'express';
import prisma from '../config/database';
import { hashPassword, comparePasswords } from '../utils/password';
import { signToken } from '../utils/jwt';
import { UserRole, VerificationStatus } from '@prisma/client';

const cookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

export const registerBuyer = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role: UserRole.BUYER,
      },
    });

    const token = signToken(user.id, user.role);
    res.cookie('jwt', token, cookieOptions);

    res.status(201).json({
      status: 'success',
      data: { user: { id: user.id, email: user.email, role: user.role } },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const registerVendor = async (req: Request, res: Response) => {
  try {
    const { email, password, brandName, storeSlug } = req.body;

    if (!email || !password || !brandName || !storeSlug) {
      return res.status(400).json({ error: 'Missing required vendor fields' });
    }

    const hashedPassword = await hashPassword(password);

    // Atomic transaction to create User and VendorProfile
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          role: UserRole.VENDOR,
        },
      });

      const vendorProfile = await tx.vendorProfile.create({
        data: {
          userId: user.id,
          brandName,
          storeSlug,
          verificationStatus: VerificationStatus.PENDING,
        },
      });

      return { user, vendorProfile };
    });

    const token = signToken(result.user.id, result.user.role);
    res.cookie('jwt', token, cookieOptions);

    res.status(201).json({
      status: 'success',
      data: {
        user: { id: result.user.id, email: result.user.email, role: result.user.role },
        vendorProfile: result.vendorProfile,
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email or Store Slug already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePasswords(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const token = signToken(user.id, user.role);
    res.cookie('jwt', token, cookieOptions);

    res.status(200).json({
      status: 'success',
      data: { user: { id: user.id, email: user.email, role: user.role } },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
