'use client';

import { useCart, STICKER_PRICING } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SHOPIFY_CHECKOUT_URL } from '@/config/urls';

// Luna color palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
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
  // Surface Tank (Large - £40)
  surfaceTank: {
    id: '52453682807050',
    shopifyVariantId: '52453682807050',
    name: 'Surface Tank',
    type: 'product',
    price: 40.00,
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

  const {
    cartItems,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    addToCart,
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
        className="flex items-center gap-3 p-3 rounded-xl"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        {/* Image */}
        <div 
          className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          {image && (
            <img src={image} alt={item.name} className="w-full h-full object-cover" />
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{item.name}</p>
          {item.region && (
            <p className="text-white/40 text-xs">{item.region}</p>
          )}
          <p className="text-white/60 text-xs">
            {formatPrice(item.price || 0)} each
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
            <span className="w-8 text-center text-white text-sm font-bold">
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
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ background: `linear-gradient(180deg, ${LUNA.abyss} 0%, ${LUNA.deepWater} 100%)` }}
          >
            {/* Header */}
            <div 
              className="flex-shrink-0 p-6 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${LUNA.highlight}20` }}
            >
              <div>
                <h2 className="text-xl font-light text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Your Collection
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  {totalItems} item{totalItems !== 1 ? 's' : ''} selected
                </p>
              </div>
              
              <button
                onClick={closeDrawer}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: 'none' }}>
              {totalItems === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${LUNA.highlight}20 0%, ${LUNA.highlight}10 100%)`,
                      border: `2px dashed ${LUNA.highlight}30`
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="1.5" opacity="0.7">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8M12 8v8"/>
                    </svg>
                  </div>
                  <p className="text-white/50 text-sm font-medium">Your collection is empty</p>
                  <p className="text-white/30 text-xs mt-1">Add items to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Products Section */}
                  {products.length > 0 && (
                    <div>
                      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Products</h3>
                      <div className="space-y-2">
                        {products.map(item => renderCartItem(item))}
                      </div>
                    </div>
                  )}

                  {/* Location Stickers Section */}
                  {locationStickers.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Location Stickers</h3>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${LUNA.surfaceTeal}30`, color: LUNA.highlight }}>
                          {locationStickerTier}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {locationStickers.map(item => renderCartItem(item))}
                      </div>
                    </div>
                  )}

                  {/* Fun Stickers Section */}
                  {funStickers.length > 0 && (
                    <div>
                      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Fun Stickers</h3>
                      <div className="space-y-2">
                        {funStickers.map(item => renderCartItem(item))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div 
              className="flex-shrink-0 p-4"
              style={{ 
                background: `linear-gradient(180deg, transparent 0%, ${LUNA.highlight}10 100%)`,
                borderTop: `1px solid ${LUNA.highlight}20`
              }}
            >
              {/* Location Sticker Pricing Tier Info */}
              {locationStickerCount > 0 && (
                <div 
                  className="mb-4 p-4 rounded-xl"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/60 font-medium">
                      {locationStickerCount < minOrder 
                        ? `Add ${minOrder - locationStickerCount} more stickers to checkout`
                        : locationStickerCount < 10
                          ? `Add ${10 - locationStickerCount} more for ${formatPrice(1.75)}/each!`
                          : locationStickerCount < 15
                            ? `Add ${15 - locationStickerCount} more for ${formatPrice(1.50)}/each!`
                            : '🎉 Best price unlocked!'
                      }
                    </span>
                    <span className="font-bold" style={{ color: LUNA.highlight }}>
                      {formatPrice(locationStickerPricePerItem)}/each
                    </span>
                  </div>
                  
                  {/* Progress Bar - 3 tiers: 5, 10, 15+ */}
                  <div className="flex gap-1 mb-2">
                    {/* Tier 1: 0-5 (unlocks £2.00) */}
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (locationStickerCount / 5) * 100)}%`,
                          backgroundColor: locationStickerCount >= 5 ? LUNA.midDepth : LUNA.midDepth
                        }}
                      />
                    </div>
                    {/* Tier 2: 5-10 (unlocks £1.75) */}
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (locationStickerCount - 5) / 5) * 100)}%`,
                          backgroundColor: locationStickerCount >= 10 ? LUNA.surfaceTeal : LUNA.surfaceTeal
                        }}
                      />
                    </div>
                    {/* Tier 3: 10-15+ (unlocks £1.50) */}
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (locationStickerCount - 10) / 5) * 100)}%`,
                          backgroundColor: locationStickerCount >= 15 ? LUNA.highlight : LUNA.highlight
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Tier labels */}
                  <div className="flex justify-between text-xs font-medium">
                    <span className={locationStickerCount >= 5 ? 'text-white/80' : 'text-white/40'}>
                      5 {locationStickerCount >= 5 && '✓'}
                    </span>
                    <span className={locationStickerCount >= 10 ? 'text-white/80' : 'text-white/40'}>
                      10 {locationStickerCount >= 10 && '✓'}
                    </span>
                    <span className={locationStickerCount >= 15 ? 'text-white/80' : 'text-white/40'}>
                      15+ {locationStickerCount >= 15 && '✓'}
                    </span>
                  </div>
                  
                  {/* Price per tier */}
                  <div className="flex justify-between text-[10px] text-white/30 mt-0.5">
                    <span>{formatPrice(2.00)}</span>
                    <span>{formatPrice(1.75)}</span>
                    <span>{formatPrice(1.50)}</span>
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-1 mb-4">
                {productCount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Products ({productCount})</span>
                    <span className="text-white">{formatPrice(productTotal)}</span>
                  </div>
                )}
                {locationStickerCount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                      Location Stickers ({locationStickerCount} × {formatPrice(locationStickerPricePerItem)})
                    </span>
                    <span className="text-white">{formatPrice(locationStickerTotal)}</span>
                  </div>
                )}
                {funStickerCount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Fun Stickers ({funStickerCount})</span>
                    <span className="text-white">{formatPrice(funStickerTotal)}</span>
                  </div>
                )}
                {locationStickerSavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Volume Savings ({locationStickerDiscount}% off)</span>
                    <span className="text-green-400">-{formatPrice(locationStickerSavings)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-white/60 text-sm font-medium">Total</span>
                <span className="text-3xl font-light" style={{ color: LUNA.highlight }}>
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
                    <div className="flex items-center gap-2 mb-4 p-2 rounded-lg" style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)' }}>
                      <span className="text-green-400 text-lg">🚚</span>
                      <span className="text-green-400 text-xs font-medium">FREE {regionLabel} shipping unlocked!</span>
                    </div>
                  );
                } else if (totalPrice > 0) {
                  return (
                    <div className="mb-4">
                      {/* Progress bar */}
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/50 text-xs">🚚 Free {regionLabel} shipping</span>
                          <span className="text-white/50 text-xs">{formatPrice(gap)} away</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: LUNA.surfaceTeal,
                            }}
                          />
                        </div>
                      </div>

                      {/* Upsell Product Tabs - Multiple smaller cards */}
                      <div className="mt-2 flex gap-2">
                        {upsellProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex-1 p-2 rounded-lg flex flex-col items-center text-center"
                            style={{
                              backgroundColor: 'rgba(167, 235, 242, 0.06)',
                              border: `1px solid ${LUNA.highlight}20`,
                            }}
                          >
                            {product.image && (
                              <div
                                className="w-10 h-10 rounded-lg overflow-hidden mb-1"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                              >
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <p className="text-white/70 text-[10px] font-medium truncate w-full">{product.name}</p>
                            <p style={{ color: LUNA.highlight }} className="text-[10px] font-semibold mb-1">{formatPrice(product.price)}</p>
                            <button
                              onClick={() => addToCart(product)}
                              className="w-full py-1 rounded text-[9px] font-semibold transition-all hover:scale-105"
                              style={{
                                backgroundColor: LUNA.surfaceTeal,
                                color: 'white',
                              }}
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                className="w-full py-4 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ 
                  background: canCheckout 
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: canCheckout ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.1)',
                  color: canCheckout ? 'white' : 'rgba(255, 255, 255, 0.3)',
                  cursor: canCheckout ? 'pointer' : 'not-allowed',
                  boxShadow: canCheckout ? `0 0 30px ${LUNA.highlight}30` : 'none'
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
                <p className="text-center text-white/40 text-xs mt-2">
                  Discount code {getDiscountCode()} will be applied at checkout
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
