// ===========================================
// STICKER PRICING TIERS (Location Stickers)
// ===========================================
// Per-sticker target prices live here and drive both the cart UI and the
// Shopify-side discount thresholds. Base price is £2.50 in Shopify; the
// STICKER1 / STICKER9 / STICKER14 / STICKER21 automatic collection
// discounts pull each tier down to the matching per-unit price below.
export const STICKER_PRICING = {
  BASE_PRICE: 2.50,
  MIN_ORDER: 5,
  TIERS: [
    { min: 1, max: 8, price: 2.00, tier: '1-8 Pack', discount: 20 },
    { min: 9, max: 13, price: 1.50, tier: '9-13 Pack', discount: 40 },
    { min: 14, max: 20, price: 1.00, tier: '14-20 Pack', discount: 60 },
    { min: 21, max: Infinity, price: 0.75, tier: '21+ Pack', discount: 70 },
  ],
  // Bundle tiers apply when the cart contains a Surface Tank. The first 8
  // stickers are included free with the bottle; remaining stickers slide
  // through the same three per-paid-sticker prices used without a bottle.
  BUNDLE_FREE_COUNT: 8,
  BUNDLE_TIERS: [
    { min: 1, max: 8, price: 0.00, paidPrice: 0, tier: 'Bundle · Free', discount: 100 },
    { min: 9, max: 13, price: 1.50, paidPrice: 1.50, tier: 'Bundle · 9-13', discount: 40 },
    { min: 14, max: 20, price: 1.00, paidPrice: 1.00, tier: 'Bundle · 14-20', discount: 60 },
    { min: 21, max: Infinity, price: 0.75, paidPrice: 0.75, tier: 'Bundle · 21+', discount: 70 },
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
// The STICKER1/9/14/21 collection auto-discounts in Shopify apply purely
// off quantity, so the cart-side code is mostly informational — these
// names are returned for parity with Shopify dashboard reporting and so
// the discount=CODE URL param resolves cleanly if those tier discounts
// are ever exposed as merchant-shareable codes.
// ===========================================
export function getDiscountCode(stickerCount, hasBottle = false) {
  if (stickerCount <= 0) return null;
  if (stickerCount >= 21) return 'STICKER21';
  if (stickerCount >= 14) return 'STICKER14';
  if (stickerCount >= 9) return 'STICKER9';
  if (stickerCount >= 1) return 'STICKER1';
  return null;
}
