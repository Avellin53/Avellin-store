import React from 'react';
import { useCurrencyStore, CurrencyCode } from '../store/currencyStore';
import './CurrencySwitcher.css';

const CurrencySwitcher: React.FC = () => {
  const { currentCurrency, currencies, setCurrency } = useCurrencyStore();

  return (
    <div className="currency-switcher">
      <select 
        value={currentCurrency.code} 
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="currency-select"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySwitcher;
