import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  seller: string;
  description?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  material?: string;
  stockCount: number;
  visualizations?: { url: string; bodyType: string }[];
};

export type CartItem = Product & { quantity: number; selectedSize?: string; selectedColor?: string };

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
  
  addToCart: (product: Product, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  togglePayment: () => void;
}

const mockInitialProducts: Product[] = [
  { 
    id: '1', 
    name: 'Silk Evening Gown', 
    category: 'Clothing', 
    price: 450, 
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600', 
    seller: 'Maison D\'Or', 
    description: 'A masterpiece of elegance, this gown is crafted from 100% heavy-weight mulberry silk. Featuring a fluid silhouette and a subtle sheen, it is perfect for high-society gala events.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Midnight', hex: '#191970' }],
    material: '100% Mulberry Silk',
    stockCount: 12,
    visualizations: [
      { url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600', bodyType: 'Default' },
      { url: '/gown_slim_fit_1775864302744.png', bodyType: 'Slim/Petite' },
      { url: '/gown_curvy_fit_1775864317205.png', bodyType: 'Curvy/Plus-size' },
      { url: '/gown_athletic_fit_1775864330238.png', bodyType: 'Athletic/Toned' }
    ]
  },
  { 
    id: '2', 
    name: 'Organic Facial Serum', 
    category: 'Skincare', 
    price: 85, 
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600', 
    seller: 'Alara Skincare',
    description: 'Bespoke hydration for the modern face. This serum combines botanical extracts and hyaluronic acid to provide a radiant, youthful glow.',
    sizes: ['30ml', '50ml'],
    colors: [{ name: 'Clear', hex: '#FFFFFF' }],
    material: 'Organic Botanical Extracts',
    stockCount: 3
  },
  { 
    id: '3', 
    name: 'Leather Tote Bag', 
    category: 'Bags', 
    price: 290, 
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600', 
    seller: 'Onyx Leather',
    description: 'A minimalist staple. Hand-stitched full-grain leather that ages beautifully with a patina unique to your journey.',
    sizes: ['Standard'],
    colors: [{ name: 'Cognac', hex: '#9A463D' }, { name: 'Black', hex: '#000000' }],
    material: 'Full-Grain Calf Leather',
    stockCount: 15
  },
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

  addToCart: (product, selectedSize, selectedColor) => set((state) => {
    const existing = state.cart.find(item => 
      item.id === product.id && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );
    if (existing) {
      return { cart: state.cart.map(item => 
        (item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ) };
    }
    return { cart: [...state.cart, { ...product, quantity: 1, selectedSize, selectedColor }], isCartOpen: true };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id),
  })),

  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  togglePayment: () => set((state) => ({ isPaymentOpen: !state.isPaymentOpen, isCartOpen: false })),
}));
