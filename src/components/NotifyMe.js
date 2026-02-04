'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ===========================================
// CONFIGURATION - UPDATE THIS
// ===========================================
const KLAVIYO_PUBLIC_KEY = 'Y9qkuD'; // Otterseas Klaviyo Public Key

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// ===========================================
// NOTIFY ME BUTTON + MODAL COMPONENT
// ===========================================
export function NotifyMeButton({ 
  productName,
  variantId, // Shopify variant ID
  variant = 'dark', // 'dark' or 'light' styling
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const isDark = variant === 'dark';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Klaviyo Client-Side Back in Stock API
      const response = await fetch('https://a.klaviyo.com/client/back-in-stock-subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'revision': '2024-02-15',
          'Authorization': `Klaviyo-API-Key ${KLAVIYO_PUBLIC_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: 'back-in-stock-subscription',
            attributes: {
              channels: ['EMAIL'],
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email: email,
                  },
                },
              },
            },
            relationships: {
              variant: {
                data: {
                  type: 'catalog-variant',
                  id: `$shopify:::$default:::${variantId}`,
                },
              },
            },
          },
        }),
      });

      if (response.ok || response.status === 202) {
        setStatus('success');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setEmail('');
        }, 2500);
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.errors?.[0]?.detail || 'Something went wrong');
      }
    } catch (error) {
      console.error('Notify Me error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <>
      {/* Notify Me Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${className}`}
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : `${LUNA.deepWater}10`,
          color: isDark ? 'white' : LUNA.deepWater,
          border: `2px solid ${isDark ? LUNA.highlight : LUNA.surfaceTeal}`,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        Notify Me When Available
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(1, 28, 64, 0.8)' }}
            onClick={() => status !== 'loading' && setIsOpen(false)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={status === 'loading'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {status === 'success' ? (
                /* Success State */
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${LUNA.surfaceTeal}20` }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={LUNA.surfaceTeal} strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: LUNA.deepWater }}>
                    You're on the list!
                  </h3>
                  <p className="text-gray-500 text-sm">
                    We'll email you when <strong>{productName}</strong> is back in stock.
                  </p>
                </div>
              ) : (
                /* Form State */
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div 
                      className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${LUNA.surfaceTeal}15` }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={LUNA.surfaceTeal} strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: LUNA.deepWater }}>
                      Get Notified
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Enter your email and we'll let you know when <strong>{productName}</strong> is back in stock.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 rounded-xl border text-sm mb-4 focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: '#E5E7EB',
                        focusRingColor: LUNA.surfaceTeal,
                      }}
                    />

                    {/* Error Message */}
                    {status === 'error' && (
                      <p className="text-red-500 text-sm mb-4 text-center">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ 
                        background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                      }}
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Subscribing...
                        </span>
                      ) : (
                        'Notify Me'
                      )}
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    We'll only email you about this product. No spam.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ===========================================
// STOCK STATUS BADGE COMPONENT
// Only shows when stock is 3 or less
// ===========================================
export function StockBadge({ quantity, threshold = 3 }) {
  // Only show badge if quantity is 1, 2, or 3
  if (quantity === null || quantity > threshold || quantity === 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"/>
      Only {quantity} left!
    </span>
  );
}

// ===========================================
// SMART ADD TO CART / NOTIFY ME BUTTON
// ===========================================
export function SmartCartButton({
  productName,
  variantId,
  quantity, // Stock quantity (passed in)
  onAddToCart,
  variant = 'dark',
}) {
  const isDark = variant === 'dark';

  // Out of stock - show Notify Me
  if (quantity === 0) {
    return (
      <NotifyMeButton 
        productName={productName}
        variantId={variantId}
        variant={variant}
      />
    );
  }

  // In stock - show Add to Cart
  return (
    <button
      onClick={onAddToCart}
      className="w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
      style={{
        background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
        color: 'white',
        boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`,
      }}
    >
      Add to Cart
    </button>
  );
}

// ===========================================
// SMART PRODUCT BUTTON WITH AUTO STOCK FETCH
// Use this for automatic stock checking
// ===========================================
export function SmartProductButton({
  productName,
  variantId,
  onAddToCart,
  variant = 'dark',
  lowStockThreshold = 3, // Only show "X left" when 3 or less
  showStockBadge = true,
  className = '',
}) {
  const [stock, setStock] = useState({ loading: true, quantity: null, available: true });
  const isDark = variant === 'dark';

  // Fetch stock on mount
  useEffect(() => {
    if (!variantId) {
      setStock({ loading: false, quantity: null, available: true });
      return;
    }

    const fetchStock = async () => {
      try {
        const response = await fetch(`/api/stock?ids=${variantId}`);
        const data = await response.json();
        
        if (data[variantId]) {
          setStock({
            loading: false,
            quantity: data[variantId].quantity,
            available: data[variantId].available && !data[variantId].outOfStock,
          });
        } else {
          setStock({ loading: false, quantity: null, available: true });
        }
      } catch (error) {
        console.error('Failed to fetch stock:', error);
        setStock({ loading: false, quantity: null, available: true });
      }
    };

    fetchStock();
  }, [variantId]);

  // Loading state
  if (stock.loading) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <button
          disabled
          className="w-full py-4 px-6 rounded-xl font-semibold text-sm opacity-50"
          style={{
            background: isDark ? 'rgba(255,255,255,0.1)' : `${LUNA.deepWater}10`,
            color: isDark ? 'white' : LUNA.deepWater,
            border: `2px solid ${isDark ? LUNA.highlight : LUNA.surfaceTeal}40`,
          }}
        >
          Checking availability...
        </button>
      </div>
    );
  }

  const isOutOfStock = !stock.available || stock.quantity === 0;
  const isLowStock = stock.quantity !== null && stock.quantity > 0 && stock.quantity <= lowStockThreshold;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Stock Badge - Only shows when 3 or less */}
      {showStockBadge && isLowStock && (
        <div className="flex justify-end">
          <StockBadge quantity={stock.quantity} threshold={lowStockThreshold} />
        </div>
      )}

      {/* Button */}
      {isOutOfStock ? (
        <NotifyMeButton 
          productName={productName}
          variantId={variantId}
          variant={variant}
        />
      ) : (
        <button
          onClick={onAddToCart}
          className="w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
            color: 'white',
            boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`,
          }}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default NotifyMeButton;
