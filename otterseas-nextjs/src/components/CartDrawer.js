'use client';

import { useCart } from '@/context/CartContext';
import { getAllStickers, MIN_ORDER, BASE_PRICE } from '@/data/stickers';
import { motion, AnimatePresence } from 'framer-motion';

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
  const cartStickers = Object.keys(cartItems)
    .map(id => ({
      ...allStickers.find(s => s.id === id),
      quantity: cartItems[id]
    }))
    .filter(s => s.id);

  const handleCheckout = () => {
    const items = Object.entries(cartItems).map(([id, qty]) => {
      const sticker = allStickers.find(s => s.id === id);
      return { variantId: sticker?.shopifyVariantId || id, quantity: qty };
    });
    
    const cartString = items.map(item => `${item.variantId}:${item.quantity}`).join(',');
    const baseUrl = 'https://38a44d-4c.myshopify.com/cart/';
    
    let discountParam = '';
    if (totalItems >= 21) discountParam = '?discount=BULK21';
    else if (totalItems >= 11) discountParam = '?discount=BULK11';
    
    const checkoutUrl = `${baseUrl}${cartString}${discountParam}`;
    
    console.log('Checkout URL:', checkoutUrl);
    // In production: window.location.href = checkoutUrl;
    alert(`Checkout URL logged to console!\n\nTotal: ${totalItems} stickers\nPrice: £${totalPrice.toFixed(2)}`);
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
            style={{ background: 'linear-gradient(180deg, #0A2540 0%, #071a2e 100%)' }}
          >
            {/* Header */}
            <div 
              className="flex-shrink-0 p-6 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(217, 158, 48, 0.2)' }}
            >
              <div>
                <h2 
                  className="text-xl font-light text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Your Pack
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  {totalItems} sticker{totalItems !== 1 ? 's' : ''} selected
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
              {cartStickers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(217, 158, 48, 0.2) 0%, rgba(217, 158, 48, 0.1) 100%)',
                      border: '2px dashed rgba(217, 158, 48, 0.3)'
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D99E30" strokeWidth="1.5" opacity="0.7">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8M12 8v8"/>
                    </svg>
                  </div>
                  <p className="text-white/50 text-sm font-medium">Your pack is empty</p>
                  <p className="text-white/30 text-xs mt-1">Add stickers to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {cartStickers.map((sticker, index) => (
                    <motion.div
                      key={sticker.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 rounded-xl p-3"
                      style={{ 
                        backgroundColor: 'rgba(217, 158, 48, 0.1)',
                        border: '1px solid rgba(217, 158, 48, 0.2)'
                      }}
                    >
                      {/* Thumbnail */}
                      <div 
                        className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #D99E30 0%, #c48a20 100%)' }}
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
                          style={{ backgroundColor: '#D99E30', color: 'white' }}
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
                          style={{ backgroundColor: '#D99E30', color: 'white' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M12 5v14M5 12h14"/>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div 
              className="flex-shrink-0 p-4"
              style={{ 
                background: 'linear-gradient(180deg, transparent 0%, rgba(217, 158, 48, 0.1) 100%)',
                borderTop: '1px solid rgba(217, 158, 48, 0.2)'
              }}
            >
              {/* Progress Bar */}
              <div 
                className="mb-4 p-4 rounded-xl"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-white/60 font-medium">
                    {totalItems < MIN_ORDER 
                      ? `Add ${MIN_ORDER - totalItems} more to checkout`
                      : 'Pricing Progress'
                    }
                  </span>
                  <span className="font-bold" style={{ color: pricingTier.color }}>
                    {pricingTier.tier}
                  </span>
                </div>
                
                <div className="flex gap-1 mb-2">
                  <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(100, (totalItems / 10) * 100)}%`,
                        backgroundColor: '#94a3b8'
                      }}
                    />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(100, Math.max(0, (totalItems - 10) / 10) * 100)}%`,
                        backgroundColor: '#D99E30'
                      }}
                    />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/10">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(100, Math.max(0, (totalItems - 20) / 10) * 100)}%`,
                        backgroundColor: '#4ade80'
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

              {/* Price */}
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-white/60 text-sm font-medium">Total</span>
                <span className="text-3xl font-light" style={{ color: '#D99E30' }}>
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
              
              {savings > 0 && (
                <div className="text-right mb-4">
                  <span 
                    className="text-sm font-bold px-3 py-1 rounded-lg"
                    style={{ backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}
                  >
                    You save £{savings.toFixed(2)}!
                  </span>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                className="w-full py-4 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ 
                  background: canCheckout 
                    ? 'linear-gradient(135deg, #D99E30 0%, #c48a20 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: canCheckout ? 'white' : 'rgba(255, 255, 255, 0.3)',
                  cursor: canCheckout ? 'pointer' : 'not-allowed',
                  boxShadow: canCheckout ? '0 4px 20px rgba(217, 158, 48, 0.5)' : 'none'
                }}
              >
                {canCheckout ? 'Proceed to Checkout →' : `Minimum ${MIN_ORDER} stickers required`}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
