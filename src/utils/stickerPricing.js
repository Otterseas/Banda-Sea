// ===========================================
// STICKER PRICING TIERS (Location Stickers)
// ===========================================
export const STICKER_PRICING = {
  BASE_PRICE: 2.50,
  MIN_ORDER: 5,
  TIERS: [
    { min: 1, max: 1, price: 2.50, tier: 'Single', discount: 0 },
    { min: 2, max: 2, price: 2.25, tier: '2 Pack', discount: 10 },
    { min: 3, max: 3, price: 2.15, tier: '3 Pack', discount: 14 },
    { min: 4, max: 4, price: 2.00, tier: '4 Pack', discount: 20 },
    { min: 5, max: 9, price: 2.00, tier: '5-9 Pack', discount: 20 },
    { min: 10, max: 14, price: 1.75, tier: '10-14 Pack', discount: 30 },
    { min: 15, max: Infinity, price: 1.50, tier: '15+ Pack', discount: 40 },
  ],
  // Bundle tiers apply when the cart contains a Surface Tank. The first 8
  // stickers are included free with the bottle; remaining stickers slide
  // through the same three per-unit prices (£2.00 / £1.75 / £1.50) shifted
  // to start at the 9th sticker.
  BUNDLE_FREE_COUNT: 8,
  BUNDLE_TIERS: [
    { min: 1, max: 8, price: 0.00, paidPrice: 0, tier: 'Bundle · Free', discount: 100 },
    { min: 9, max: 13, price: 2.00, paidPrice: 2.00, tier: 'Bundle · 9-13', discount: 20 },
    { min: 14, max: 20, price: 1.75, paidPrice: 1.75, tier: 'Bundle · 14-20', discount: 30 },
    { min: 21, max: Infinity, price: 1.50, paidPrice: 1.50, tier: 'Bundle · 21+', discount: 40 },
  ],
};

// ===========================================
// GET PRICING TIER FOR QUANTITY
// hasBottle === true switches to the bundle tier table.
// ===========================================
export function getPricingTier(quantity, hasBottle = false) {
  const table = hasBottle ? STICKER_PRICING.BUNDLE_TIERS : STICKER_PRICING.TIERS;
  const tier = table.find(t => quantity >= t.min && quantity <= t.max);
  return tier || table[0];
}

// ===========================================
// CALCULATE STICKER TOTAL WITH DISCOUNTS
// In the bundle scenario, the first 8 stickers cost £0 and only the
// remaining stickers are billed at the paid-tier price.
// ===========================================
export function calculateStickerTotal(quantity, hasBottle = false) {
  const tier = getPricingTier(quantity, hasBottle);
  const fullPrice = quantity * STICKER_PRICING.BASE_PRICE;

  let total;
  let paidCount;
  let paidPrice;
  let freeCount;

  if (hasBottle) {
    freeCount = Math.min(quantity, STICKER_PRICING.BUNDLE_FREE_COUNT);
    paidCount = Math.max(0, quantity - STICKER_PRICING.BUNDLE_FREE_COUNT);
    paidPrice = tier.paidPrice ?? 0;
    total = paidCount * paidPrice;
  } else {
    freeCount = 0;
    paidCount = quantity;
    paidPrice = tier.price;
    total = quantity * tier.price;
  }

  const savings = fullPrice - total;
  // pricePerItem is what we display in the "X per sticker" callout. In the
  // bundle scenario we show the paid-tier price once the customer is past
  // the free 8 — before that, there's no per-paid price to show yet so we
  // fall back to the tier they'll hit next.
  const pricePerItem = hasBottle
    ? (paidCount > 0 ? paidPrice : STICKER_PRICING.BUNDLE_TIERS[1].paidPrice)
    : tier.price;

  return {
    quantity,
    pricePerItem,
    total,
    fullPrice,
    savings,
    tier: tier.tier,
    discount: tier.discount,
    freeCount,
    paidCount,
    paidPrice,
    hasBottle,
  };
}

// ===========================================
// GET DISCOUNT CODE FOR CHECKOUT
// When a Surface Tank is in cart, an automatic Shopify "Buy X Get Y"
// discount makes 8 stickers free. The percentage codes below apply on top
// of that automatic discount to set the per-paid-sticker price.
// Math verified: with 14 stickers + bottle, STICKER10 (30%) gives every
// sticker line at £1.75; BXGY zeroes 8 of them; remaining 6 × £1.75 = £10.50.
// ===========================================
export function getDiscountCode(stickerCount, hasBottle = false) {
  if (stickerCount <= 0) return null;

  if (hasBottle) {
    if (stickerCount >= 21) return 'STICKER15PLUS';
    if (stickerCount >= 14) return 'STICKER10';
    if (stickerCount >= 9) return 'STICKER5';
    // 1-8 stickers + bottle: BXGY automatic handles it, no code needed.
    return null;
  }

  if (stickerCount >= 15) return 'STICKER15PLUS';
  if (stickerCount >= 10) return 'STICKER10';
  if (stickerCount >= 5) return 'STICKER5';
  if (stickerCount >= 4) return 'STICKER4';
  if (stickerCount >= 3) return 'STICKER3';
  if (stickerCount >= 2) return 'STICKER2';
  return null;
}
