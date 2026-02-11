// Pure function tests for CurrencyContext - no React dependencies
import { describe, test, expect } from 'vitest';
import { FALLBACK_RATES, CURRENCY_CONFIG } from '@/utils/currencyConfig';

// ===========================================
// CURRENCY CONFIG TESTS
// ===========================================
describe('CURRENCY_CONFIG', () => {
  test('contains GBP configuration', () => {
    expect(CURRENCY_CONFIG.GBP).toBeDefined();
    expect(CURRENCY_CONFIG.GBP.symbol).toBe('£');
    expect(CURRENCY_CONFIG.GBP.code).toBe('GBP');
    expect(CURRENCY_CONFIG.GBP.name).toBe('British Pound');
    expect(CURRENCY_CONFIG.GBP.flag).toBe('🇬🇧');
    expect(CURRENCY_CONFIG.GBP.locale).toBe('en-GB');
  });

  test('contains EUR configuration', () => {
    expect(CURRENCY_CONFIG.EUR).toBeDefined();
    expect(CURRENCY_CONFIG.EUR.symbol).toBe('€');
    expect(CURRENCY_CONFIG.EUR.code).toBe('EUR');
    expect(CURRENCY_CONFIG.EUR.name).toBe('Euro');
    expect(CURRENCY_CONFIG.EUR.flag).toBe('🇪🇺');
    expect(CURRENCY_CONFIG.EUR.locale).toBe('de-DE');
  });

  test('contains USD configuration', () => {
    expect(CURRENCY_CONFIG.USD).toBeDefined();
    expect(CURRENCY_CONFIG.USD.symbol).toBe('$');
    expect(CURRENCY_CONFIG.USD.code).toBe('USD');
    expect(CURRENCY_CONFIG.USD.name).toBe('US Dollar');
    expect(CURRENCY_CONFIG.USD.flag).toBe('🇺🇸');
    expect(CURRENCY_CONFIG.USD.locale).toBe('en-US');
  });

  test('contains exactly 3 currencies', () => {
    const currencies = Object.keys(CURRENCY_CONFIG);
    expect(currencies).toHaveLength(3);
    expect(currencies).toContain('GBP');
    expect(currencies).toContain('EUR');
    expect(currencies).toContain('USD');
  });
});

// ===========================================
// FALLBACK RATES TESTS
// ===========================================
describe('FALLBACK_RATES', () => {
  test('GBP is base currency (rate 1)', () => {
    expect(FALLBACK_RATES.GBP).toBe(1);
  });

  test('EUR fallback rate is defined and reasonable', () => {
    expect(FALLBACK_RATES.EUR).toBe(1.17);
    expect(FALLBACK_RATES.EUR).toBeGreaterThan(1); // EUR should be worth more than GBP
  });

  test('USD fallback rate is defined and reasonable', () => {
    expect(FALLBACK_RATES.USD).toBe(1.26);
    expect(FALLBACK_RATES.USD).toBeGreaterThan(1); // USD should be worth more than GBP
  });

  test('all rates are positive numbers', () => {
    Object.values(FALLBACK_RATES).forEach((rate) => {
      expect(typeof rate).toBe('number');
      expect(rate).toBeGreaterThan(0);
    });
  });

  test('fallback rates exist for all configured currencies', () => {
    Object.keys(CURRENCY_CONFIG).forEach((code) => {
      expect(FALLBACK_RATES[code]).toBeDefined();
    });
  });
});

// ===========================================
// CURRENCY CONVERSION LOGIC TESTS (Pure Math)
// ===========================================
describe('Currency conversion math', () => {
  // These tests verify the mathematical logic that would be used in convertPrice

  test('converting 10 GBP to EUR using fallback rate', () => {
    const gbpAmount = 10;
    const eurRate = FALLBACK_RATES.EUR;
    const eurAmount = gbpAmount * eurRate;
    expect(eurAmount).toBeCloseTo(11.7, 1);
  });

  test('converting 10 GBP to USD using fallback rate', () => {
    const gbpAmount = 10;
    const usdRate = FALLBACK_RATES.USD;
    const usdAmount = gbpAmount * usdRate;
    expect(usdAmount).toBeCloseTo(12.6, 1);
  });

  test('converting 0 GBP returns 0 in any currency', () => {
    Object.values(FALLBACK_RATES).forEach((rate) => {
      expect(0 * rate).toBe(0);
    });
  });

  test('converting negative amounts works correctly', () => {
    const gbpAmount = -10;
    const eurRate = FALLBACK_RATES.EUR;
    const eurAmount = gbpAmount * eurRate;
    expect(eurAmount).toBeCloseTo(-11.7, 1);
  });
});

// ===========================================
// PRICE FORMATTING LOGIC TESTS (Pure String)
// ===========================================
describe('Price formatting math', () => {
  // These tests verify the mathematical logic that would be used in formatPrice

  test('formatting with 2 decimal places', () => {
    const price = 10.999;
    const formatted = price.toFixed(2);
    expect(formatted).toBe('11.00');
  });

  test('formatting with 1 decimal place', () => {
    const price = 10.999;
    const formatted = price.toFixed(1);
    expect(formatted).toBe('11.0');
  });

  test('formatting preserves precision for exact values', () => {
    const price = 10.0;
    const formatted = price.toFixed(2);
    expect(formatted).toBe('10.00');
  });

  test('currency symbol can be prepended', () => {
    const price = 10.0;
    const symbol = CURRENCY_CONFIG.GBP.symbol;
    const formatted = `${symbol}${price.toFixed(2)}`;
    expect(formatted).toBe('£10.00');
  });

  test('currency code can be appended', () => {
    const price = 10.0;
    const symbol = CURRENCY_CONFIG.GBP.symbol;
    const code = CURRENCY_CONFIG.GBP.code;
    const formatted = `${symbol}${price.toFixed(2)} ${code}`;
    expect(formatted).toBe('£10.00 GBP');
  });
});
