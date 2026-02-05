// ===========================================
// FALLBACK RATES (used if API fails)
// ===========================================
export const FALLBACK_RATES = {
  GBP: 1,
  EUR: 1.17,
  USD: 1.26,
};

// ===========================================
// CURRENCY DISPLAY SETTINGS
// ===========================================
export const CURRENCY_CONFIG = {
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
