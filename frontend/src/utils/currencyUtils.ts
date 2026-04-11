import { useCurrencyStore, CurrencyCode } from '../store/currencyStore';

/**
 * Automatically detects the user's location based on IP 
 * and sets the matching currency.
 */
export const detectAndSetCurrency = async () => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const countryCode = data.country_code; // e.g., 'NG', 'US', 'GB'
        
        let detectedCurrency: CurrencyCode = 'USD'; // Default fallback
        
        if (countryCode === 'NG') detectedCurrency = 'NGN';
        else if (['DE', 'FR', 'IT', 'ES', 'NL'].includes(countryCode)) detectedCurrency = 'EUR';
        else if (countryCode === 'GB') detectedCurrency = 'GBP';
        else if (countryCode === 'US') detectedCurrency = 'USD';

        // Update the store
        useCurrencyStore.getState().setCurrency(detectedCurrency);
        console.log(`🌍 Detected region: ${data.city}, ${data.country_name}. Setting currency to ${detectedCurrency}.`);
    } catch (error) {
        console.warn('Geolocation detection failed. Falling back to default currency.', error);
    }
};

/**
 * Simple formatter for currency display
 */
export const formatPrice = (usdAmount: number, currency = useCurrencyStore.getState().currentCurrency) => {
    const convertedAmount = usdAmount * currency.rate;
    
    // Custom formatting for Naira to follow NXXXX.XX format or ₦ symbol
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(convertedAmount);
};
