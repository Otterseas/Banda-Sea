'use client';

import { useCart } from '@/context/CartContext';
import { getAllStickers, MIN_ORDER, BASE_PRICE } from '@/data/stickers';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Luna color palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Product data for non-sticker items
const PRODUCTS = {
  '49658874331402': { name: 'The Dive Journal', price: 28.00, image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=200' },
  '49872531325194': { name: 'Logbook Booster Pack', price: 12.00, image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=200' },
  '52453682807050': { name: 'Surface Tank - Blue', price: 40.00, image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=200' },
  '52453682839818': { name: 'Surface Tank - White', price: 40.00, image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=200' },
};

export default function CartDrawer() {
  const {
    cartItems,
    isDrawerOpen,
    closeDrawer,
    totalItems,
    pricePerItem,
    totalPrice,
    canCheckout,
    pricingTier,
    savings,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const allStickers = getAllStickers();
  
  // Separate stickers from other products
  const cartStickers = [];
  const cartProducts = [];
  
  Object.keys(cartItems).forEach(id => {
    const sticker = allStickers.find(s => s.id === id);
    if (sticker) {
      cartStickers.push({ ...sticker, quantity: cartItems[id] });
    } else if (PRODUCTS[id]) {
      cartProducts.push({ id, ...PRODUCTS[id], quantity: cartItems[id] });
    }
  });

  // Calculate totals
  const stickerCount = cartStickers.reduce((sum, s) => sum + s.quantity, 0);
  const productCount = cartProducts.reduce((sum, p) => sum + p.quantity, 0);
  const hasStickers = stickerCount > 0;
  const hasProducts = productCount > 0;
  
  // Only require minimum for stickers, products can checkout anytime
  const stickersCanCheckout = !hasStickers || stickerCount >= MIN_ORDER;
  const canProceed = (hasStickers || hasProducts) && stickersCanCheckout;

  // Calculate product total
  const productTotal = cartProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const stickerTotal = stickerCount * pricePerItem;
  const grandTotal = productTotal + stickerTotal;

  const handleCheckout = () => {
    const items = [];
    
    // Add stickers
    cartStickers.forEach(sticker => {
      items.push({ variantId: sticker.shopifyVariantId || sticker.id, quantity: sticker.quantity });
    });
    
    // Add products
    cartProducts.forEach(product => {
      items.push({ variantId: product.id, quantity: product.quantity });
    });
    
    const cartString = items.map(item => `${item.variantId}:${item.quantity}`).join(',');
    const baseUrl = 'https://38a44d-4c.myshopify.com/cart/';
    
    let discountParam = '';
    if (stickerCount >= 21) discountParam = '?discount=BULK21';
    else if (stickerCount >= 11) discountParam = '?discount=BULK11';
    
    const checkoutUrl = `${baseUrl}${cartString}${discountParam}`;
    window.location.href = checkoutUrl;
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
                <h2 
                  className="text-xl font-light text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
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
            <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
              {cartStickers.length === 0 && cartProducts.length === 0 ? (
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
                <div className="space-y-4">
                  {/* Products Section */}
                  {cartProducts.length > 0 && (
                    <div>
                      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Products</h3>
                      <div className="space-y-2">
                        {cartProducts.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 rounded-xl p-3"
                            style={{ 
                              backgroundColor: `${LUNA.highlight}10`,
                              border: `1px solid ${LUNA.highlight}20`
                            }}
                          >
                            {/* Thumbnail */}
                            <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-white/10">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{product.name}</p>
                              <p className="text-sm" style={{ color: LUNA.highlight }}>£{product.price.toFixed(2)}</p>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(product.id, -1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                style={{ backgroundColor: LUNA.highlight, color: LUNA.abyss }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M5 12h14"/>
                                </svg>
                              </button>
                              <span className="w-8 text-center text-white text-sm font-bold">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, 1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                style={{ backgroundColor: LUNA.highlight, color: LUNA.abyss }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M12 5v14M5 12h14"/>
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stickers Section */}
                  {cartStickers.length > 0 && (
                    <div>
                      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">
                        Stickers ({stickerCount})
                        {stickerCount < MIN_ORDER && (
                          <span className="text-yellow-400 ml-2">Min {MIN_ORDER} required</span>
                        )}
                      </h3>
                      <div className="space-y-2">
                        {cartStickers.map((sticker, index) => (
                          <motion.div
                            key={sticker.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 rounded-xl p-3"
                            style={{ 
                              backgroundColor: `${LUNA.surfaceTeal}15`,
                              border: `1px solid ${LUNA.surfaceTeal}30`
                            }}
                          >
                            {/* Thumbnail */}
                            <div 
                              className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
                              style={{ background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)` }}
                            >
                              {sticker.image && (
                                <img 
                                  src={sticker.image} 
                                  alt={sticker.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{sticker.name}</p>
                              <p className="text-white/40 text-xs">{sticker.region}</p>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(sticker.id, -1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                style={{ backgroundColor: LUNA.surfaceTeal, color: 'white' }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M5 12h14"/>
                                </svg>
                              </button>
                              <span className="w-8 text-center text-white text-sm font-bold">
                                {sticker.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(sticker.id, 1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                style={{ backgroundColor: LUNA.surfaceTeal, color: 'white' }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M12 5v14M5 12h14"/>
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        ))}
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
              {/* Sticker Progress Bar - Only show if has stickers */}
              {hasStickers && (
                <div 
                  className="mb-4 p-4 rounded-xl"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex justify-between text-xs mb-3">
                    <span className="text-white/60 font-medium">
                      {stickerCount < MIN_ORDER 
                        ? `Add ${MIN_ORDER - stickerCount} more stickers to checkout`
                        : 'Sticker Pricing Tier'
                      }
                    </span>
                    <span className="font-bold" style={{ color: LUNA.highlight }}>
                      {pricingTier.tier}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mb-2">
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (stickerCount / 10) * 100)}%`,
                          backgroundColor: LUNA.midDepth
                        }}
                      />
                    </div>
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (stickerCount - 10) / 10) * 100)}%`,
                          backgroundColor: LUNA.surfaceTeal
                        }}
                      />
                    </div>
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (stickerCount - 20) / 10) * 100)}%`,
                          backgroundColor: LUNA.highlight
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-white/40 font-medium">
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-1 mb-4">
                {hasProducts && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Products</span>
                    <span className="text-white">£{productTotal.toFixed(2)}</span>
                  </div>
                )}
                {hasStickers && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Stickers ({stickerCount} × £{pricePerItem.toFixed(2)})</span>
                    <span className="text-white">£{stickerTotal.toFixed(2)}</span>
                  </div>
                )}
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Sticker Savings</span>
                    <span className="text-green-400">-£{savings.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-white/60 text-sm font-medium">Total</span>
                <span className="text-3xl font-light" style={{ color: LUNA.highlight }}>
                  £{grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={!canProceed}
                className="w-full py-4 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ 
                  background: canProceed 
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: canProceed ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.1)',
                  color: canProceed ? 'white' : 'rgba(255, 255, 255, 0.3)',
                  cursor: canProceed ? 'pointer' : 'not-allowed',
                  boxShadow: canProceed ? `0 0 30px ${LUNA.highlight}30` : 'none'
                }}
              >
                {canProceed 
                  ? 'Proceed to Checkout →' 
                  : hasStickers && stickerCount < MIN_ORDER
                    ? `Add ${MIN_ORDER - stickerCount} more stickers`
                    : 'Add items to continue'
                }
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
