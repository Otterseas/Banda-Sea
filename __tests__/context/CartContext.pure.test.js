// Pure function tests for CartContext - no React dependencies
import { describe, test, expect } from 'vitest';
import {
  STICKER_PRICING,
  getPricingTier,
  calculateStickerTotal,
  getDiscountCode,
} from '@/utils/stickerPricing';

// ===========================================
// PRICING TIER TESTS
// ===========================================
describe('getPricingTier', () => {
  test('returns correct tier for single sticker (quantity 1)', () => {
    const tier = getPricingTier(1);
    expect(tier.price).toBe(2.5);
    expect(tier.tier).toBe('Single');
    expect(tier.discount).toBe(0);
  });

  test('returns correct tier for 2 stickers', () => {
    const tier = getPricingTier(2);
    expect(tier.price).toBe(2.25);
    expect(tier.tier).toBe('2 Pack');
    expect(tier.discount).toBe(10);
  });

  test('returns correct tier for 3 stickers', () => {
    const tier = getPricingTier(3);
    expect(tier.price).toBe(2.15);
    expect(tier.tier).toBe('3 Pack');
    expect(tier.discount).toBe(14);
  });

  test('returns correct tier for 4 stickers', () => {
    const tier = getPricingTier(4);
    expect(tier.price).toBe(2.0);
    expect(tier.tier).toBe('4 Pack');
    expect(tier.discount).toBe(20);
  });

  test('returns correct tier for 5-9 stickers', () => {
    [5, 6, 7, 8, 9].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(2.0);
      expect(tier.tier).toBe('5-9 Pack');
      expect(tier.discount).toBe(20);
    });
  });

  test('returns correct tier for 10-14 stickers', () => {
    [10, 11, 12, 13, 14].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(1.75);
      expect(tier.tier).toBe('10-14 Pack');
      expect(tier.discount).toBe(30);
    });
  });

  test('returns correct tier for 15+ stickers', () => {
    [15, 20, 50, 100].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(1.5);
      expect(tier.tier).toBe('15+ Pack');
      expect(tier.discount).toBe(40);
    });
  });

  test('returns first tier for zero quantity', () => {
    const tier = getPricingTier(0);
    expect(tier.price).toBe(2.5);
  });

  test('returns first tier for negative quantity', () => {
    const tier = getPricingTier(-1);
    expect(tier.price).toBe(2.5);
  });
});

// ===========================================
// CALCULATE STICKER TOTAL TESTS
// ===========================================
describe('calculateStickerTotal', () => {
  test('calculates total for single sticker correctly', () => {
    const result = calculateStickerTotal(1);
    expect(result.quantity).toBe(1);
    expect(result.pricePerItem).toBe(2.5);
    expect(result.total).toBe(2.5);
    expect(result.fullPrice).toBe(2.5);
    expect(result.savings).toBe(0);
    expect(result.tier).toBe('Single');
    expect(result.discount).toBe(0);
  });

  test('calculates total for 5 stickers with discount', () => {
    const result = calculateStickerTotal(5);
    expect(result.quantity).toBe(5);
    expect(result.pricePerItem).toBe(2.0);
    expect(result.total).toBe(10.0); // 5 * 2.00
    expect(result.fullPrice).toBe(12.5); // 5 * 2.50
    expect(result.savings).toBe(2.5);
    expect(result.tier).toBe('5-9 Pack');
    expect(result.discount).toBe(20);
  });

  test('calculates total for 10 stickers with 30% discount', () => {
    const result = calculateStickerTotal(10);
    expect(result.quantity).toBe(10);
    expect(result.pricePerItem).toBe(1.75);
    expect(result.total).toBe(17.5); // 10 * 1.75
    expect(result.fullPrice).toBe(25.0); // 10 * 2.50
    expect(result.savings).toBe(7.5);
    expect(result.tier).toBe('10-14 Pack');
    expect(result.discount).toBe(30);
  });

  test('calculates total for 15 stickers with 40% discount', () => {
    const result = calculateStickerTotal(15);
    expect(result.quantity).toBe(15);
    expect(result.pricePerItem).toBe(1.5);
    expect(result.total).toBe(22.5); // 15 * 1.50
    expect(result.fullPrice).toBe(37.5); // 15 * 2.50
    expect(result.savings).toBe(15.0);
    expect(result.tier).toBe('15+ Pack');
    expect(result.discount).toBe(40);
  });

  test('calculates total for large quantity (100 stickers)', () => {
    const result = calculateStickerTotal(100);
    expect(result.quantity).toBe(100);
    expect(result.pricePerItem).toBe(1.5);
    expect(result.total).toBe(150.0); // 100 * 1.50
    expect(result.fullPrice).toBe(250.0); // 100 * 2.50
    expect(result.savings).toBe(100.0);
  });

  test('handles zero quantity', () => {
    const result = calculateStickerTotal(0);
    expect(result.total).toBe(0);
    expect(result.fullPrice).toBe(0);
    expect(result.savings).toBe(0);
  });
});

// ===========================================
// DISCOUNT CODE TESTS
// ===========================================
describe('getDiscountCode', () => {
  test('returns null for single sticker', () => {
    expect(getDiscountCode(1)).toBeNull();
  });

  test('returns STICKER2 for 2 stickers', () => {
    expect(getDiscountCode(2)).toBe('STICKER2');
  });

  test('returns STICKER3 for 3 stickers', () => {
    expect(getDiscountCode(3)).toBe('STICKER3');
  });

  test('returns STICKER4 for 4 stickers', () => {
    expect(getDiscountCode(4)).toBe('STICKER4');
  });

  test('returns STICKER5 for 5-9 stickers', () => {
    [5, 6, 7, 8, 9].forEach((qty) => {
      expect(getDiscountCode(qty)).toBe('STICKER5');
    });
  });

  test('returns STICKER10 for 10-14 stickers', () => {
    [10, 11, 12, 13, 14].forEach((qty) => {
      expect(getDiscountCode(qty)).toBe('STICKER10');
    });
  });

  test('returns STICKER15PLUS for 15+ stickers', () => {
    [15, 20, 50, 100].forEach((qty) => {
      expect(getDiscountCode(qty)).toBe('STICKER15PLUS');
    });
  });

  test('returns null for zero stickers', () => {
    expect(getDiscountCode(0)).toBeNull();
  });
});

// ===========================================
// STICKER PRICING CONFIGURATION TESTS
// ===========================================
describe('STICKER_PRICING configuration', () => {
  test('has correct base price', () => {
    expect(STICKER_PRICING.BASE_PRICE).toBe(2.5);
  });

  test('has correct minimum order', () => {
    expect(STICKER_PRICING.MIN_ORDER).toBe(5);
  });

  test('has 7 pricing tiers', () => {
    expect(STICKER_PRICING.TIERS).toHaveLength(7);
  });

  test('tiers are ordered correctly by quantity', () => {
    const mins = STICKER_PRICING.TIERS.map((t) => t.min);
    expect(mins).toEqual([1, 2, 3, 4, 5, 10, 15]);
  });

  test('discounts increase with quantity', () => {
    const discounts = STICKER_PRICING.TIERS.map((t) => t.discount);
    for (let i = 1; i < discounts.length; i++) {
      expect(discounts[i]).toBeGreaterThanOrEqual(discounts[i - 1]);
    }
  });

  test('prices decrease with quantity', () => {
    const prices = STICKER_PRICING.TIERS.map((t) => t.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });

  test('exposes a BUNDLE_FREE_COUNT of 8', () => {
    expect(STICKER_PRICING.BUNDLE_FREE_COUNT).toBe(8);
  });

  test('bundle tiers cover the four expected ranges', () => {
    const ranges = STICKER_PRICING.BUNDLE_TIERS.map((t) => [t.min, t.max]);
    expect(ranges).toEqual([
      [1, 8],
      [9, 13],
      [14, 20],
      [21, Infinity],
    ]);
  });
});

// ===========================================
// BUNDLE (SURFACE TANK + STICKERS) TESTS
// ===========================================
describe('calculateStickerTotal with Surface Tank bundle', () => {
  test('first 8 stickers are free when a bottle is in cart', () => {
    [1, 4, 8].forEach((qty) => {
      const result = calculateStickerTotal(qty, true);
      expect(result.total).toBe(0);
      expect(result.freeCount).toBe(qty);
      expect(result.paidCount).toBe(0);
      expect(result.savings).toBe(qty * 2.5);
    });
  });

  test('9-13 stickers price the extras at £2.00 each', () => {
    const r9 = calculateStickerTotal(9, true);
    expect(r9.paidCount).toBe(1);
    expect(r9.total).toBe(2.0);

    const r13 = calculateStickerTotal(13, true);
    expect(r13.paidCount).toBe(5);
    expect(r13.total).toBe(10.0);
  });

  test('14-20 stickers price the extras at £1.75 each', () => {
    const r14 = calculateStickerTotal(14, true);
    expect(r14.paidCount).toBe(6);
    expect(r14.total).toBeCloseTo(10.5, 5);

    const r20 = calculateStickerTotal(20, true);
    expect(r20.paidCount).toBe(12);
    expect(r20.total).toBeCloseTo(21.0, 5);
  });

  test('21+ stickers price the extras at £1.50 each', () => {
    const r21 = calculateStickerTotal(21, true);
    expect(r21.paidCount).toBe(13);
    expect(r21.total).toBeCloseTo(19.5, 5);
  });

  test('without a bottle behaves like the legacy tier table', () => {
    const r10 = calculateStickerTotal(10, false);
    expect(r10.total).toBe(17.5);
    expect(r10.freeCount).toBe(0);
  });
});

describe('getDiscountCode with Surface Tank bundle', () => {
  test('returns null when 1-8 stickers + bottle (BXGY automatic covers it)', () => {
    [1, 4, 8].forEach((qty) => {
      expect(getDiscountCode(qty, true)).toBeNull();
    });
  });

  test('returns STICKER5 (20%) for 9-13 stickers + bottle', () => {
    [9, 11, 13].forEach((qty) => {
      expect(getDiscountCode(qty, true)).toBe('STICKER5');
    });
  });

  test('returns STICKER10 (30%) for 14-20 stickers + bottle', () => {
    [14, 17, 20].forEach((qty) => {
      expect(getDiscountCode(qty, true)).toBe('STICKER10');
    });
  });

  test('returns STICKER15PLUS (40%) for 21+ stickers + bottle', () => {
    [21, 25, 100].forEach((qty) => {
      expect(getDiscountCode(qty, true)).toBe('STICKER15PLUS');
    });
  });
});
