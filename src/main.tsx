import { detectAndSetCurrency } from './utils/currencyUtils';

// Initialize regional detection
detectAndSetCurrency();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
