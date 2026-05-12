'use client';

import { useState, useEffect } from 'react';
import { useCart, STICKER_PRICING } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SHOPIFY_CHECKOUT_URL } from '@/config/urls';
import { TrustBadgesInline } from './TrustBadges';

// Luna color palette + the lighter accents used across the UI overhaul.
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  pink: '#FF6B9D',
  cream: '#FAF7F1',
  border: '#E6EEF2',
};

// ===========================================
// SHIPPING THRESHOLDS BY REGION (in GBP)
// ===========================================
const SHIPPING_THRESHOLDS = {
  GBP: 50,   // UK
  EUR: 80,   // EU
  USD: 100,  // USA / Rest of World
};

// ===========================================
// UPSELL PRODUCTS CATALOG
// ===========================================
const UPSELL_CATALOG = {
  // Fun Stickers (Small - £3.50)
  funSticker1: {
    id: '50590639194378',
    shopifyVariantId: '50590639194378',
    name: "Post-Dive Hair",
    type: 'fun-sticker',
    price: 3.50,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare-MarketingImage.jpg?v=1746535285&width=200',
  },
  funSticker2: {
    id: '51143940047114',
    shopifyVariantId: '51143940047114',
    name: 'BCD Coffee',
    type: 'fun-sticker',
    price: 3.50,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/BCD....BringCoffeeDown-MarketingImage.jpg?v=1746535044&width=200',
  },
  // Booster Pack (Medium - £12)
  boosterPack: {
    id: '49872531325194',
    shopifyVariantId: '49872531325194',
    name: 'Booster Pack',
    type: 'product',
    price: 12.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=200',
  },
  // Location Pack (Medium - £15)
  locationPack: {
    id: '52451906945290',
    shopifyVariantId: '52451906945290',
    name: 'Indonesia Pack',
    type: 'product',
    price: 15.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/RajaAmpat-sticker.png?v=1769313395&width=200',
  },
  // Dive Journal (Large - £28)
  diveJournal: {
    id: '49658874331402',
    shopifyVariantId: '49658874331402',
    name: 'Dive Journal',
    type: 'product',
    price: 28.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=200',
  },
  // Surface Tank (Large - £35 on sale, was £40)
  surfaceTank: {
    id: '52453682807050',
    shopifyVariantId: '52453682807050',
    name: 'Surface Tank',
    type: 'product',
    price: 35.00,
    originalPrice: 40.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=200',
  },
};

// ===========================================
// PAGE-SPECIFIC UPSELL RECOMMENDATIONS
// Each page shows 2-3 relevant products
// ===========================================
const PAGE_UPSELLS = {
  // Location Stickers page → Surface Tank, Fun Stickers
  'stickers': [
    UPSELL_CATALOG.funSticker1,
    UPSELL_CATALOG.surfaceTank,
  ],
  // Dive Journal page → Booster Packs, Location Pack, Fun Stickers
  'dive-journal': [
    UPSELL_CATALOG.funSticker2,
    UPSELL_CATALOG.boosterPack,
    UPSELL_CATALOG.locationPack,
  ],
  // Surface Tank page → Location Pack, Fun Stickers, Dive Journal
  'surface-tank': [
    UPSELL_CATALOG.funSticker1,
    UPSELL_CATALOG.locationPack,
    UPSELL_CATALOG.diveJournal,
  ],
  // Default/fallback
  'default': [
    UPSELL_CATALOG.funSticker1,
    UPSELL_CATALOG.boosterPack,
    UPSELL_CATALOG.diveJournal,
  ],
};

// Get page context from pathname
function getPageContext(pathname) {
  if (pathname?.includes('stickers')) return 'stickers';
  if (pathname?.includes('dive-journal')) return 'dive-journal';
  if (pathname?.includes('surface-tank')) return 'surface-tank';
  return 'default';
}

// ===========================================
// PRODUCT IMAGES (for items without images stored)
// ===========================================
const PRODUCT_IMAGES = {
  // Dive Journal & Booster
  '49658874331402': 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=200',
  '49872531325194': 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=200',
  // Surface Tank
  '52453682807050': 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=200',
  '52453682839818': 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=200',
  // Fun Stickers
  '50590639194378': 'https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare-MarketingImage.jpg?v=1746535285&width=200',
  '51143553548554': 'https://38a44d-4c.myshopify.com/cdn/shop/files/DiveFirstCoffeeSecond-MarketingImage.jpg?v=1746534827&width=200',
  '51143940047114': 'https://38a44d-4c.myshopify.com/cdn/shop/files/BCD....BringCoffeeDown-MarketingImage.jpg?v=1746535044&width=200',
  '50827800740106': 'https://38a44d-4c.myshopify.com/cdn/shop/files/Yes_My_Fins_Match_My_Mask_-_Marketing_Image.jpg?v=1746535398&width=200',
};

export default function CartDrawer() {
  const pathname = usePathname();
  const pageContext = getPageContext(pathname);
  const upsellProducts = PAGE_UPSELLS[pageContext] || PAGE_UPSELLS.default;

  // Stock state for upsell products
  const [upsellStock, setUpsellStock] = useState({});

  // Fetch stock for upsell products
  useEffect(() => {
    const variantIds = upsellProducts
      .map(p => p.shopifyVariantId)
      .filter(Boolean);

    if (variantIds.length === 0) return;

    const fetchUpsellStock = async () => {
      try {
        const response = await fetch(`/api/stock?ids=${variantIds.join(',')}&_t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        if (!data.error) {
          setUpsellStock(data);
        }
      } catch (error) {
        console.error('Failed to fetch upsell stock:', error);
      }
    };

    fetchUpsellStock();
  }, [pageContext]);

  // Filter out out-of-stock upsell products
  const availableUpsells = upsellProducts.filter(product => {
    const stock = upsellStock[product.shopifyVariantId];
    if (!stock) return true; // Show if not loaded yet
    return stock.available && !stock.outOfStock && stock.quantity !== 0;
  });

  const {
    cartItems,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    addToCart,
    // Bundle
    hasBottle,
    bundleFreeCount,
    bundlePaidCount,
    bundlePaidPrice,
    // Location stickers
    locationStickerCount,
    locationStickerTotal,
    locationStickerPricePerItem,
    locationStickerSavings,
    locationStickerTier,
    locationStickerDiscount,
    // Fun stickers
    funStickerCount,
    funStickerTotal,
    // Products
    productCount,
    productTotal,
    // Totals
    totalItems,
    totalPrice,
    canCheckout,
    minOrder,
    getDiscountCode,
  } = useCart();

  // Currency context
  const { formatPrice, getCheckoutCurrencyParam, currency } = useCurrency();

  // Convert cartItems object to arrays by type
  const cartArray = Object.values(cartItems);
  const locationStickers = cartArray.filter(item => item.type === 'location-sticker');
  const funStickers = cartArray.filter(item => item.type === 'fun-sticker');
  const products = cartArray.filter(item => item.type === 'product');

  // Handle checkout - goes directly to Shopify checkout
  const handleCheckout = () => {
    const items = [];

    // Add all items
    cartArray.forEach(item => {
      const variantId = item.shopifyVariantId || item.id;
      items.push(`${variantId}:${item.quantity}`);
    });

    const cartString = items.join(',');

    // Get discount code based on location sticker count
    const discountCode = getDiscountCode();

    // Build checkout URL with discount and currency
    let checkoutUrl = `${SHOPIFY_CHECKOUT_URL}${cartString}`;

    // Add discount code if applicable
    const params = [];
    if (discountCode) {
      params.push(`discount=${discountCode}`);
    }
    // Add currency parameter for Shopify Markets
    if (currency !== 'GBP') {
      params.push(`currency=${currency}`);
    }

    if (params.length > 0) {
      checkoutUrl += `?${params.join('&')}`;
    }

    window.location.href = checkoutUrl;
  };

  // Render a cart item
  const renderCartItem = (item, showQuantityControls = true) => {
    const image = item.image || PRODUCT_IMAGES[item.id] || PRODUCT_IMAGES[item.shopifyVariantId];
    
    return (
      <motion.div
        key={item.id || item.shopifyVariantId}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex items-center gap-2.5 p-2.5 rounded-xl border"
        style={{ backgroundColor: 'white', borderColor: LUNA.border }}
      >
        {/* Image */}
        <div
          className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
          style={{ backgroundColor: LUNA.cream }}
        >
          {image && (
            <img src={image} alt={item.name} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: LUNA.deepWater }}>
            {item.name}
          </p>
          {item.region && (
            <p className="text-xs" style={{ color: LUNA.midDepth }}>{item.region}</p>
          )}
          <p className="text-xs text-gray-500 flex items-baseline gap-1">
            {formatPrice(item.price || 0)} each
            {item.originalPrice && item.originalPrice > (item.price || 0) && (
              <span className="text-[10px] line-through text-gray-400">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </p>
        </div>

        {/* Quantity Controls */}
        {showQuantityControls && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(item.id || item.shopifyVariantId, -1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: LUNA.surfaceTeal, color: 'white' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <span className="w-8 text-center text-sm font-bold" style={{ color: LUNA.deepWater }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id || item.shopifyVariantId, 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: LUNA.surfaceTeal, color: 'white' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(2, 56, 89, 0.35)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ background: `linear-gradient(180deg, white 0%, ${LUNA.cream} 100%)` }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${LUNA.border}` }}
            >
              <div>
                <p
                  className="text-[10px] tracking-[0.28em] font-bold uppercase"
                  style={{ color: LUNA.pink }}
                >
                  Your Collection
                </p>
                <h2
                  className="text-lg font-bold mt-0.5"
                  style={{ color: LUNA.deepWater, fontFamily: 'Montserrat, sans-serif' }}
                >
                  {totalItems} item{totalItems !== 1 ? 's' : ''} selected
                </h2>
              </div>

              <button
                onClick={closeDrawer}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-gray-100"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Cart Items — min-height so the items list stays visible even
                when the footer features expand (tier card, shipping bar, upsells). */}
            <div className="flex-1 overflow-y-auto p-4 min-h-[180px]" style={{ scrollbarWidth: 'none' }}>
              {totalItems === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${LUNA.pink}1A 0%, ${LUNA.surfaceTeal}1A 100%)`,
                      border: `2px dashed ${LUNA.pink}50`
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={LUNA.pink} strokeWidth="1.5" opacity="0.85">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8M12 8v8"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: LUNA.deepWater }}>Your collection is empty</p>
                  <p className="text-xs text-gray-500 mt-1">Add items to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Products Section */}
                  {products.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: LUNA.midDepth }}>Products</h3>
                      <div className="space-y-1.5">
                        {products.map(item => renderCartItem(item))}
                      </div>
                    </div>
                  )}

                  {/* Location Stickers Section */}
                  {locationStickers.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: LUNA.midDepth }}>Location Stickers</h3>
                        <span
                          className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${LUNA.pink}1F`, color: LUNA.pink }}
                        >
                          {locationStickerTier}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {locationStickers.map(item => renderCartItem(item))}
                      </div>
                    </div>
                  )}

                  {/* Fun Stickers Section */}
                  {funStickers.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: LUNA.midDepth }}>Fun Stickers</h3>
                      <div className="space-y-1.5">
                        {funStickers.map(item => renderCartItem(item))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex-shrink-0 px-4 py-3"
              style={{
                background: `linear-gradient(180deg, ${LUNA.cream} 0%, white 100%)`,
                borderTop: `1px solid ${LUNA.border}`
              }}
            >
              {/* Bundle deal banner — shown whenever a Surface Tank is in cart, even before stickers are added,
                  so the customer understands the bundle benefit. */}
              {hasBottle && (
                <div
                  className="mb-3 p-2.5 rounded-lg border"
                  style={{
                    background: `linear-gradient(135deg, ${LUNA.pink}12 0%, ${LUNA.surfaceTeal}12 100%)`,
                    borderColor: `${LUNA.pink}55`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎁</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: LUNA.pink }}>
                        Surface Tank Bundle
                      </p>
                      <p className="text-[11px] font-medium leading-snug" style={{ color: LUNA.deepWater }}>
                        {bundleFreeCount === 0
                          ? 'Pick any 8 location stickers — included free.'
                          : bundleFreeCount < 8
                            ? `${bundleFreeCount} of 8 free stickers picked · ${8 - bundleFreeCount} to go`
                            : `All 8 free stickers picked ✓ ${bundlePaidCount > 0 ? `· ${bundlePaidCount} extra @ ${formatPrice(bundlePaidPrice)}` : ''}`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Location Sticker Pricing Tier Info — compact card. Tier
                  breakpoints sit at 9 / 14 / 21 regardless of bundle state;
                  the only difference is that the bundle waives the first 8. */}
              {locationStickerCount > 0 && (
                <div
                  className="mb-3 p-2.5 rounded-lg border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: LUNA.border,
                  }}
                >
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="font-medium" style={{ color: LUNA.midDepth }}>
                      {hasBottle
                        ? (locationStickerCount < 8
                            ? `${8 - locationStickerCount} free stickers left to add`
                            : locationStickerCount < 14
                              ? `Add ${14 - locationStickerCount} more · ${formatPrice(1.0)}/each!`
                              : locationStickerCount < 21
                                ? `Add ${21 - locationStickerCount} more · ${formatPrice(0.75)}/each!`
                                : '🎉 Best price unlocked!')
                        : (locationStickerCount < minOrder
                            ? `Add ${minOrder - locationStickerCount} more to checkout`
                            : locationStickerCount < 9
                              ? `Add ${9 - locationStickerCount} more · ${formatPrice(1.5)}/each!`
                              : locationStickerCount < 14
                                ? `Add ${14 - locationStickerCount} more · ${formatPrice(1.0)}/each!`
                                : locationStickerCount < 21
                                  ? `Add ${21 - locationStickerCount} more · ${formatPrice(0.75)}/each!`
                                  : '🎉 Best price unlocked!')
                      }
                    </span>
                    <span className="font-bold" style={{ color: LUNA.pink }}>
                      {hasBottle && bundlePaidCount === 0
                        ? 'FREE'
                        : `${formatPrice(locationStickerPricePerItem)}/each`
                      }
                    </span>
                  </div>

                  {/* Progress Bar — three tier segments at 9 / 14 / 21 stickers. */}
                  {(() => {
                    const [t1, t2, t3] = [9, 14, 21];
                    const seg2 = t2 - t1;
                    const seg3 = t3 - t2;
                    return (
                      <>
                        <div className="flex gap-1 mb-1">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: LUNA.border }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, (locationStickerCount / t1) * 100)}%`,
                                backgroundColor: LUNA.midDepth,
                              }}
                            />
                          </div>
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: LUNA.border }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, Math.max(0, (locationStickerCount - t1) / seg2) * 100)}%`,
                                backgroundColor: LUNA.surfaceTeal,
                              }}
                            />
                          </div>
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: LUNA.border }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, Math.max(0, (locationStickerCount - t2) / seg3) * 100)}%`,
                                backgroundColor: LUNA.pink,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between text-[10px] font-semibold">
                          <span style={{ color: locationStickerCount >= t1 ? LUNA.deepWater : '#9CA3AF' }}>
                            {t1} · {formatPrice(1.5)} {locationStickerCount >= t1 && '✓'}
                          </span>
                          <span style={{ color: locationStickerCount >= t2 ? LUNA.deepWater : '#9CA3AF' }}>
                            {t2} · {formatPrice(1.0)} {locationStickerCount >= t2 && '✓'}
                          </span>
                          <span style={{ color: locationStickerCount >= t3 ? LUNA.deepWater : '#9CA3AF' }}>
                            {t3} · {formatPrice(0.75)} {locationStickerCount >= t3 && '✓'}
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-0.5 mb-2">
                {productCount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Products ({productCount})</span>
                    <span style={{ color: LUNA.deepWater }}>{formatPrice(productTotal)}</span>
                  </div>
                )}
                {locationStickerCount > 0 && hasBottle ? (
                  <>
                    {bundleFreeCount > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Bundle stickers ({bundleFreeCount} × free)</span>
                        <span style={{ color: '#10B981' }}>{formatPrice(0)}</span>
                      </div>
                    )}
                    {bundlePaidCount > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">
                          Stickers ({bundlePaidCount} × {formatPrice(bundlePaidPrice)})
                        </span>
                        <span style={{ color: LUNA.deepWater }}>{formatPrice(locationStickerTotal)}</span>
                      </div>
                    )}
                  </>
                ) : locationStickerCount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      Stickers ({locationStickerCount} × {formatPrice(locationStickerPricePerItem)})
                    </span>
                    <span style={{ color: LUNA.deepWater }}>{formatPrice(locationStickerTotal)}</span>
                  </div>
                )}
                {funStickerCount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Fun Stickers ({funStickerCount})</span>
                    <span style={{ color: LUNA.deepWater }}>{formatPrice(funStickerTotal)}</span>
                  </div>
                )}
                {locationStickerSavings > 0 && (
                  <div className="flex justify-between text-xs font-semibold">
                    <span style={{ color: '#10B981' }}>
                      {hasBottle ? 'Bundle Savings' : `Volume Savings (${locationStickerDiscount}% off)`}
                    </span>
                    <span style={{ color: '#10B981' }}>-{formatPrice(locationStickerSavings)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-semibold" style={{ color: LUNA.midDepth }}>Total</span>
                <span
                  className="text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.pink} 50%, ${LUNA.deepWater} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Free Shipping Progress & Upsell Tabs */}
              {(() => {
                const threshold = SHIPPING_THRESHOLDS[currency] || SHIPPING_THRESHOLDS.USD;
                const gap = threshold - totalPrice;
                const progress = Math.min(100, (totalPrice / threshold) * 100);
                const regionLabel = currency === 'GBP' ? 'UK' : currency === 'EUR' ? 'EU' : 'international';

                if (gap <= 0) {
                  return (
                    <div
                      className="flex items-center gap-2 mb-3 px-2 py-1.5 rounded-lg"
                      style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                    >
                      <span className="text-base">🚚</span>
                      <span className="text-[11px] font-semibold" style={{ color: '#059669' }}>
                        FREE {regionLabel} shipping unlocked!
                      </span>
                    </div>
                  );
                } else if (totalPrice > 0) {
                  return (
                    <div className="mb-3">
                      {/* Progress bar */}
                      <div className="px-2 py-1.5 rounded-lg border" style={{ backgroundColor: LUNA.cream, borderColor: LUNA.border }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium" style={{ color: LUNA.midDepth }}>🚚 Free {regionLabel} shipping</span>
                          <span className="text-[11px] font-semibold" style={{ color: LUNA.deepWater }}>{formatPrice(gap)} away</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: LUNA.border }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${progress}%`,
                              background: `linear-gradient(90deg, ${LUNA.surfaceTeal} 0%, ${LUNA.pink} 100%)`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Upsell Product Tabs — 2-up on narrow phones (each
                          card stays readable), 3-up at sm+. Cards above the
                          first two flow onto a second row at small sizes. */}
                      {availableUpsells.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableUpsells.map((product) => (
                          <div
                            key={product.id}
                            className="p-2 rounded-lg flex flex-col items-center text-center bg-white border"
                            style={{ borderColor: LUNA.border }}
                          >
                            {product.image && (
                              <div
                                className="w-11 h-11 rounded-lg overflow-hidden mb-1.5"
                                style={{ backgroundColor: LUNA.cream }}
                              >
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <p className="text-[11px] font-semibold truncate w-full" style={{ color: LUNA.deepWater }}>{product.name}</p>
                            <p style={{ color: LUNA.pink }} className="text-[11px] font-bold mb-1.5">{formatPrice(product.price)}</p>
                            <button
                              onClick={() => addToCart(product)}
                              className="w-full py-1.5 rounded text-[10px] font-bold tracking-wide uppercase transition-all hover:scale-105"
                              style={{
                                backgroundColor: LUNA.deepWater,
                                color: 'white',
                              }}
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                      )}
                    </div>
                  );
                }
                return null;
              })()}

              {/* Trust Badges */}
              <div className="mb-2.5">
                <TrustBadgesInline variant="light" />
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: canCheckout ? LUNA.deepWater : '#E5E7EB',
                  color: canCheckout ? 'white' : '#9CA3AF',
                  cursor: canCheckout ? 'pointer' : 'not-allowed',
                  boxShadow: canCheckout ? `0 8px 24px ${LUNA.deepWater}30` : 'none',
                }}
              >
                {canCheckout
                  ? 'Proceed to Checkout →'
                  : locationStickerCount > 0 && locationStickerCount < minOrder
                    ? `Add ${minOrder - locationStickerCount} more location stickers`
                    : 'Add items to continue'
                }
              </button>

              {/* Discount Code Info */}
              {canCheckout && getDiscountCode() && (
                <p className="text-center text-[11px] mt-1.5" style={{ color: LUNA.midDepth }}>
                  Discount <span className="font-bold" style={{ color: LUNA.pink }}>{getDiscountCode()}</span> applied at checkout
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
