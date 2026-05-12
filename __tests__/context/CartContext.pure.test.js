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
  test('returns 1-8 Pack at £2.00 for quantities 1 through 8', () => {
    [1, 2, 3, 5, 8].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(2.0);
      expect(tier.tier).toBe('1-8 Pack');
      expect(tier.discount).toBe(20);
    });
  });

  test('returns 9-13 Pack at £1.75 for quantities 9 through 13', () => {
    [9, 10, 13].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(1.75);
      expect(tier.tier).toBe('9-13 Pack');
      expect(tier.discount).toBe(30);
    });
  });

  test('returns 14-20 Pack at £1.50 for quantities 14 through 20', () => {
    [14, 17, 20].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(1.5);
      expect(tier.tier).toBe('14-20 Pack');
      expect(tier.discount).toBe(40);
    });
  });

  test('returns 21+ Pack at £1.00 for quantities 21+', () => {
    [21, 50, 100].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(1.0);
      expect(tier.tier).toBe('21+ Pack');
      expect(tier.discount).toBe(60);
    });
  });

  test('falls back to the first tier for zero / negative quantity', () => {
    [0, -1].forEach((qty) => {
      const tier = getPricingTier(qty);
      expect(tier.price).toBe(2.0);
    });
  });
});

// ===========================================
// CALCULATE STICKER TOTAL TESTS
// ===========================================
describe('calculateStickerTotal', () => {
  test('charges £2.00 per sticker for 1-8 without bottle', () => {
    const r = calculateStickerTotal(5);
    expect(r.quantity).toBe(5);
    expect(r.pricePerItem).toBe(2.0);
    expect(r.total).toBe(10.0);
    expect(r.fullPrice).toBe(12.5);
    expect(r.savings).toBe(2.5);
  });

  test('drops to £1.75 each at 9 stickers (no bottle)', () => {
    const r = calculateStickerTotal(10);
    expect(r.pricePerItem).toBe(1.75);
    expect(r.total).toBe(17.5);
  });

  test('drops to £1.50 each at 14 stickers (no bottle)', () => {
    const r = calculateStickerTotal(15);
    expect(r.pricePerItem).toBe(1.5);
    expect(r.total).toBe(22.5);
  });

  test('drops to £1.00 each at 21+ stickers (no bottle)', () => {
    const r = calculateStickerTotal(25);
    expect(r.pricePerItem).toBe(1.0);
    expect(r.total).toBeCloseTo(25.0, 5);
  });

  test('handles zero quantity', () => {
    const r = calculateStickerTotal(0);
    expect(r.total).toBe(0);
    expect(r.savings).toBe(0);
  });
});

// ===========================================
// DISCOUNT CODE TESTS
// ===========================================
describe('getDiscountCode', () => {
  test('returns STICKER1 for 1-8 stickers', () => {
    [1, 4, 8].forEach((qty) => expect(getDiscountCode(qty)).toBe('STICKER1'));
  });

  test('returns STICKER9 for 9-13 stickers', () => {
    [9, 11, 13].forEach((qty) => expect(getDiscountCode(qty)).toBe('STICKER9'));
  });

  test('returns STICKER14 for 14-20 stickers', () => {
    [14, 17, 20].forEach((qty) => expect(getDiscountCode(qty)).toBe('STICKER14'));
  });

  test('returns STICKER21 for 21+ stickers', () => {
    [21, 100].forEach((qty) => expect(getDiscountCode(qty)).toBe('STICKER21'));
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

  test('has 4 pricing tiers (1-8 / 9-13 / 14-20 / 21+)', () => {
    expect(STICKER_PRICING.TIERS).toHaveLength(4);
  });

  test('tier breakpoints are 1 / 9 / 14 / 21', () => {
    const mins = STICKER_PRICING.TIERS.map((t) => t.min);
    expect(mins).toEqual([1, 9, 14, 21]);
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

  test('9-13 stickers price the extras at £1.75 each', () => {
    const r9 = calculateStickerTotal(9, true);
    expect(r9.paidCount).toBe(1);
    expect(r9.total).toBe(1.75);

    const r13 = calculateStickerTotal(13, true);
    expect(r13.paidCount).toBe(5);
    expect(r13.total).toBeCloseTo(8.75, 5);
  });

  test('14-20 stickers price the extras at £1.50 each', () => {
    const r14 = calculateStickerTotal(14, true);
    expect(r14.paidCount).toBe(6);
    expect(r14.total).toBeCloseTo(9.0, 5);

    const r20 = calculateStickerTotal(20, true);
    expect(r20.paidCount).toBe(12);
    expect(r20.total).toBeCloseTo(18.0, 5);
  });

  test('21+ stickers price the extras at £1.00 each', () => {
    const r21 = calculateStickerTotal(21, true);
    expect(r21.paidCount).toBe(13);
    expect(r21.total).toBeCloseTo(13.0, 5);
  });

  test('without a bottle behaves like the standard tier table', () => {
    const r10 = calculateStickerTotal(10, false);
    expect(r10.total).toBe(17.5);
    expect(r10.freeCount).toBe(0);
  });
});

describe('getDiscountCode with Surface Tank bundle', () => {
  test('returns STICKER1 even at 1 sticker (covers the bottle\'s extra-paid tier too)', () => {
    expect(getDiscountCode(5, true)).toBe('STICKER1');
  });

  test('returns STICKER9 for 9-13 stickers + bottle', () => {
    [9, 11, 13].forEach((qty) => expect(getDiscountCode(qty, true)).toBe('STICKER9'));
  });

  test('returns STICKER14 for 14-20 stickers + bottle', () => {
    [14, 17, 20].forEach((qty) => expect(getDiscountCode(qty, true)).toBe('STICKER14'));
  });

  test('returns STICKER21 for 21+ stickers + bottle', () => {
    [21, 25, 100].forEach((qty) => expect(getDiscountCode(qty, true)).toBe('STICKER21'));
  });
});
