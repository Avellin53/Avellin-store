import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  seller: string;
};

export type CartItem = Product & { quantity: number };

interface StoreState {
  products: Product[];
  totalSales: number;
  activeBuyers: number;
  approvedSellers: number;
  cart: CartItem[];
  isCartOpen: boolean;
  isPaymentOpen: boolean;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  togglePayment: () => void;
}

const mockInitialProducts: Product[] = [
  { id: '1', name: 'Silk Evening Gown', category: 'Clothing', price: 450, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600', seller: 'Maison D\'Or' },
  { id: '2', name: 'Organic Facial Serum', category: 'Skincare', price: 85, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600', seller: 'Alara Skincare' },
  { id: '3', name: 'Leather Tote Bag', category: 'Bags', price: 290, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600', seller: 'Onyx Leather' },
  { id: '4', name: 'Sartorial Wool Suit', category: 'Clothing', price: 890, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600', seller: 'Milan Tailors' },
  { id: '5', name: 'Matte Liquid Lipstick', category: 'Makeup', price: 35, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600', seller: 'Aura Beauty' },
  { id: '6', name: 'Handcrafted Chelsea Boots', category: 'Shoes', price: 320, image: 'https://images.unsplash.com/photo-1608256246200-53e535b5b60f?q=80&w=600', seller: 'Onyx Leather' },
  { id: '7', name: 'Gold Link Bracelet', category: 'Accessories', price: 150, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600', seller: 'Maison D\'Or' },
  { id: '8', name: 'Hydrating Night Cream', category: 'Skincare', price: 110, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600', seller: 'Alara Skincare' },
];

export const useStore = create<StoreState>((set) => ({
  products: mockInitialProducts,
  totalSales: 124500,
  activeBuyers: 1200,
  approvedSellers: 45,
  cart: [],
  isCartOpen: false,
  isPaymentOpen: false,

  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Date.now().toString() }],
  })),

  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p),
  })),

  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id),
  })),

  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }], isCartOpen: true };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id),
  })),

  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  togglePayment: () => set((state) => ({ isPaymentOpen: !state.isPaymentOpen, isCartOpen: false })),
}));
