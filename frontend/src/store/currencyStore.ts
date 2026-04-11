import { create } from 'zustand';

export type CurrencyCode = "USD" | "EUR" | "GBP" | "NGN";

interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Rate relative to USD (base in data)
  label: string;
}

const CURRENCIES: Record<CurrencyCode, Currency> = {
  NGN: { code: 'NGN', symbol: '₦', rate: 1515, label: 'Naira' },
  USD: { code: 'USD', symbol: '$', rate: 1, label: 'Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'Pound' },
};

interface CurrencyState {
  currentCurrency: Currency;
  currencies: Currency[];
  setCurrency: (code: CurrencyCode) => void;
  getConvertedAmount: (usdAmount: number) => number;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  // Set Naria (NGN) as primary/default as requested
  currentCurrency: CURRENCIES.NGN,
  currencies: Object.values(CURRENCIES),

  setCurrency: (code: CurrencyCode) => set({ currentCurrency: CURRENCIES[code] }),

  getConvertedAmount: (usdAmount: number) => {
    const { currentCurrency } = get();
    return usdAmount * currentCurrency.rate;
  },
}));
