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
};

// ===========================================
// GET PRICING TIER FOR QUANTITY
// ===========================================
export function getPricingTier(quantity) {
  const tier = STICKER_PRICING.TIERS.find(t => quantity >= t.min && quantity <= t.max);
  return tier || STICKER_PRICING.TIERS[0];
}

// ===========================================
// CALCULATE STICKER TOTAL WITH DISCOUNTS
// ===========================================
export function calculateStickerTotal(quantity) {
  const tier = getPricingTier(quantity);
  const total = quantity * tier.price;
  const fullPrice = quantity * STICKER_PRICING.BASE_PRICE;
  const savings = fullPrice - total;

  return {
    quantity,
    pricePerItem: tier.price,
    total,
    fullPrice,
    savings,
    tier: tier.tier,
    discount: tier.discount,
  };
}

// ===========================================
// GET DISCOUNT CODE FOR CHECKOUT
// ===========================================
export function getDiscountCode(stickerCount) {
  if (stickerCount >= 15) return 'STICKER15PLUS';
  if (stickerCount >= 10) return 'STICKER10';
  if (stickerCount >= 5) return 'STICKER5';
  if (stickerCount >= 4) return 'STICKER4';
  if (stickerCount >= 3) return 'STICKER3';
  if (stickerCount >= 2) return 'STICKER2';
  return null;
}
