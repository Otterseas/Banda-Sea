// Pure function tests for useStock - no React dependencies
import { describe, test, expect, beforeEach } from 'vitest';
import {
  getStockStatus,
  isInStock,
  clearStockCache,
} from '@/hooks/useStock';

// ===========================================
// STOCK STATUS HELPER TESTS
// ===========================================
describe('getStockStatus', () => {
  test('returns "loading" when stock is loading', () => {
    const stock = { loading: true, available: true, quantity: null, outOfStock: false };
    expect(getStockStatus(stock)).toBe('loading');
  });

  test('returns "loading" when stock is null', () => {
    expect(getStockStatus(null)).toBe('loading');
  });

  test('returns "loading" when stock is undefined', () => {
    expect(getStockStatus(undefined)).toBe('loading');
  });

  test('returns "out-of-stock" when outOfStock is true', () => {
    const stock = { loading: false, available: false, quantity: 0, outOfStock: true };
    expect(getStockStatus(stock)).toBe('out-of-stock');
  });

  test('returns "out-of-stock" when not available', () => {
    const stock = { loading: false, available: false, quantity: 5, outOfStock: false };
    expect(getStockStatus(stock)).toBe('out-of-stock');
  });

  test('returns "low-stock" when quantity is at threshold', () => {
    const stock = { loading: false, available: true, quantity: 5, outOfStock: false };
    expect(getStockStatus(stock)).toBe('low-stock');
  });

  test('returns "low-stock" when quantity is below threshold', () => {
    const stock = { loading: false, available: true, quantity: 3, outOfStock: false };
    expect(getStockStatus(stock)).toBe('low-stock');
  });

  test('returns "in-stock" when quantity is above threshold', () => {
    const stock = { loading: false, available: true, quantity: 10, outOfStock: false };
    expect(getStockStatus(stock)).toBe('in-stock');
  });

  test('returns "in-stock" when quantity is null but available', () => {
    const stock = { loading: false, available: true, quantity: null, outOfStock: false };
    expect(getStockStatus(stock)).toBe('in-stock');
  });

  test('respects custom lowStockThreshold', () => {
    const stock = { loading: false, available: true, quantity: 8, outOfStock: false };
    expect(getStockStatus(stock, 10)).toBe('low-stock');
    expect(getStockStatus(stock, 5)).toBe('in-stock');
  });

  test('returns "low-stock" for quantity of 1', () => {
    const stock = { loading: false, available: true, quantity: 1, outOfStock: false };
    expect(getStockStatus(stock)).toBe('low-stock');
  });

  test('returns "low-stock" for quantity of 0 when available is true', () => {
    // Edge case: quantity 0 but available flag might still be true
    const stock = { loading: false, available: true, quantity: 0, outOfStock: false };
    expect(getStockStatus(stock)).toBe('low-stock');
  });

  test('prioritizes outOfStock over low quantity', () => {
    const stock = { loading: false, available: true, quantity: 3, outOfStock: true };
    expect(getStockStatus(stock)).toBe('out-of-stock');
  });

  test('prioritizes not available over low quantity', () => {
    const stock = { loading: false, available: false, quantity: 3, outOfStock: false };
    expect(getStockStatus(stock)).toBe('out-of-stock');
  });

  test('prioritizes loading over everything else', () => {
    const stock = { loading: true, available: false, quantity: 0, outOfStock: true };
    expect(getStockStatus(stock)).toBe('loading');
  });
});

// ===========================================
// IS IN STOCK HELPER TESTS
// ===========================================
describe('isInStock', () => {
  test('returns true when stock is loading (assume in stock)', () => {
    const stock = { loading: true, available: true, quantity: null, outOfStock: false };
    expect(isInStock(stock)).toBe(true);
  });

  test('returns true when stock is null (assume in stock)', () => {
    expect(isInStock(null)).toBe(true);
  });

  test('returns true when stock is undefined (assume in stock)', () => {
    expect(isInStock(undefined)).toBe(true);
  });

  test('returns true when available and not out of stock', () => {
    const stock = { loading: false, available: true, quantity: 10, outOfStock: false };
    expect(isInStock(stock)).toBe(true);
  });

  test('returns false when not available', () => {
    const stock = { loading: false, available: false, quantity: 0, outOfStock: false };
    expect(isInStock(stock)).toBe(false);
  });

  test('returns false when out of stock', () => {
    const stock = { loading: false, available: true, quantity: 0, outOfStock: true };
    expect(isInStock(stock)).toBe(false);
  });

  test('returns false when both not available and out of stock', () => {
    const stock = { loading: false, available: false, quantity: 0, outOfStock: true };
    expect(isInStock(stock)).toBe(false);
  });

  test('returns true for low stock (still in stock)', () => {
    const stock = { loading: false, available: true, quantity: 2, outOfStock: false };
    expect(isInStock(stock)).toBe(true);
  });

  test('returns true when quantity is null but available', () => {
    const stock = { loading: false, available: true, quantity: null, outOfStock: false };
    expect(isInStock(stock)).toBe(true);
  });
});

// ===========================================
// CLEAR STOCK CACHE TESTS
// ===========================================
describe('clearStockCache', () => {
  test('clears the stock cache without errors', () => {
    // Just ensure it doesn't throw
    expect(() => clearStockCache()).not.toThrow();
  });

  test('can be called multiple times without errors', () => {
    expect(() => {
      clearStockCache();
      clearStockCache();
      clearStockCache();
    }).not.toThrow();
  });
});

// ===========================================
// EDGE CASES
// ===========================================
describe('Edge cases', () => {
  test('getStockStatus handles empty object', () => {
    const stock = {};
    // Empty object: available is undefined (falsy), so returns 'out-of-stock'
    expect(getStockStatus(stock)).toBe('out-of-stock');
  });

  test('getStockStatus handles partial stock object', () => {
    const stock = { loading: false };
    // available is undefined (falsy), so returns 'out-of-stock'
    expect(getStockStatus(stock)).toBe('out-of-stock');
  });

  test('isInStock handles empty object', () => {
    const stock = {};
    // available is undefined, so stock.available && !stock.outOfStock returns undefined
    expect(isInStock(stock)).toBe(undefined);
  });

  test('getStockStatus with very high quantity', () => {
    const stock = { loading: false, available: true, quantity: 10000, outOfStock: false };
    expect(getStockStatus(stock)).toBe('in-stock');
  });

  test('getStockStatus with negative quantity (edge case)', () => {
    const stock = { loading: false, available: true, quantity: -5, outOfStock: false };
    // Negative quantity should be treated as low stock
    expect(getStockStatus(stock)).toBe('low-stock');
  });

  test('getStockStatus with threshold of 0', () => {
    const stock = { loading: false, available: true, quantity: 1, outOfStock: false };
    expect(getStockStatus(stock, 0)).toBe('in-stock');
  });
});
