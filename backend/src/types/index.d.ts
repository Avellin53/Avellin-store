import { User, VendorProfile } from '@prisma/client';

export type UserWithProfile = User & {
  vendorProfile?: VendorProfile | null;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserWithProfile;
    }
  }
}
