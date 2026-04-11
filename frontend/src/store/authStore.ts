import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  role: 'BUYER' | 'VENDOR' | 'ADMIN';
}

interface VendorProfile {
  id: string;
  brandName: string;
  storeSlug: string;
  verificationStatus: string;
}

interface AuthState {
  user: User | null;
  vendorProfile: VendorProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setAuth: (user: User, vendorProfile?: VendorProfile | null) => void;
  logout: () => void;
  setLoading: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  vendorProfile: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user, vendorProfile = null) => set({ 
    user, 
    vendorProfile, 
    isAuthenticated: true, 
    isLoading: false 
  }),

  logout: () => set({ 
    user: null, 
    vendorProfile: null, 
    isAuthenticated: false, 
    isLoading: false 
  }),

  setLoading: (status) => set({ isLoading: status }),
}));
