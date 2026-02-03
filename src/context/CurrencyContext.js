'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// ===========================================
// FALLBACK RATES (used if API fails)
// ===========================================
const FALLBACK_RATES = {
  GBP: 1,
  EUR: 1.17,
  USD: 1.26,
};

// Currency display settings
const CURRENCY_CONFIG = {
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    locale: 'en-GB',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    locale: 'de-DE',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    locale: 'en-US',
  },
};

// ===========================================
// CURRENCY CONTEXT
// ===========================================
const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('GBP');
  const [exchangeRates, setExchangeRates] = useState(FALLBACK_RATES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ratesLastUpdated, setRatesLastUpdated] = useState(null);

  // Fetch live exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Using exchangerate-api.com (free tier: 1,500 requests/month)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
        
        if (response.ok) {
          const data = await response.json();
          setExchangeRates({
            GBP: 1,
            EUR: data.rates.EUR,
            USD: data.rates.USD,
          });
          setRatesLastUpdated(new Date().toISOString());
          
          // Cache rates in localStorage for 1 hour
          localStorage.setItem('otterseas-exchange-rates', JSON.stringify({
            rates: {
              GBP: 1,
              EUR: data.rates.EUR,
              USD: data.rates.USD,
            },
            timestamp: Date.now(),
          }));
        }
      } catch (error) {
        console.warn('Failed to fetch exchange rates, using fallback:', error);
        // Try to use cached rates
        const cached = localStorage.getItem('otterseas-exchange-rates');
        if (cached) {
          const { rates, timestamp } = JSON.parse(cached);
          // Use cached rates if less than 24 hours old
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setExchangeRates(rates);
          }
        }
      }
    };

    // Check for cached rates first
    const cached = localStorage.getItem('otterseas-exchange-rates');
    if (cached) {
      const { rates, timestamp } = JSON.parse(cached);
      // Use cached rates if less than 1 hour old
      if (Date.now() - timestamp < 60 * 60 * 1000) {
        setExchangeRates(rates);
        setRatesLastUpdated(new Date(timestamp).toISOString());
      } else {
        // Cached rates are stale, fetch new ones
        fetchRates();
      }
    } else {
      // No cached rates, fetch new ones
      fetchRates();
    }
  }, []);

  // Load saved currency preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('otterseas-currency');
    if (saved && CURRENCY_CONFIG[saved]) {
      setCurrency(saved);
    } else {
      // Auto-detect based on timezone/locale
      const userLocale = navigator.language || 'en-GB';
      if (userLocale.includes('en-US')) {
        setCurrency('USD');
      } else if (
        userLocale.includes('de') || 
        userLocale.includes('fr') || 
        userLocale.includes('es') || 
        userLocale.includes('it') ||
        userLocale.includes('nl') ||
        userLocale.includes('pt')
      ) {
        setCurrency('EUR');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save preference when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('otterseas-currency', currency);
    }
  }, [currency, isLoaded]);

  // Get current currency config
  const currentCurrency = CURRENCY_CONFIG[currency];
  const exchangeRate = exchangeRates[currency];

  // Convert price from GBP to selected currency
  const convertPrice = (priceInGBP) => {
    if (typeof priceInGBP !== 'number') return 0;
    return priceInGBP * exchangeRate;
  };

  // Format price with currency symbol
  const formatPrice = (priceInGBP, options = {}) => {
    const { showCode = false, decimals = 2 } = options;
    const converted = convertPrice(priceInGBP);
    const formatted = converted.toFixed(decimals);
    
    if (showCode) {
      return `${currentCurrency.symbol}${formatted} ${currency}`;
    }
    return `${currentCurrency.symbol}${formatted}`;
  };

  // Get all available currencies
  const availableCurrencies = Object.values(CURRENCY_CONFIG);

  // Get Shopify checkout currency parameter
  const getCheckoutCurrencyParam = () => {
    return currency !== 'GBP' ? `&currency=${currency}` : '';
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currentCurrency,
        exchangeRate,
        exchangeRates,
        convertPrice,
        formatPrice,
        availableCurrencies,
        getCheckoutCurrencyParam,
        isLoaded,
        ratesLastUpdated,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

// Hook to use currency context
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Export for direct access if needed
export { FALLBACK_RATES, CURRENCY_CONFIG };
