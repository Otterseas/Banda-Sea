'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ===========================================
// STICKER PRICING TIERS (Location Stickers)
// ===========================================
const STICKER_PRICING = {
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
function getPricingTier(quantity) {
  const tier = STICKER_PRICING.TIERS.find(t => quantity >= t.min && quantity <= t.max);
  return tier || STICKER_PRICING.TIERS[0];
}

// ===========================================
// CALCULATE STICKER TOTAL WITH DISCOUNTS
// ===========================================
function calculateStickerTotal(quantity) {
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
function getDiscountCode(stickerCount) {
  if (stickerCount >= 15) return 'STICKER15PLUS';
  if (stickerCount >= 10) return 'STICKER10';
  if (stickerCount >= 5) return 'STICKER5';
  if (stickerCount >= 4) return 'STICKER4';
  if (stickerCount >= 3) return 'STICKER3';
  if (stickerCount >= 2) return 'STICKER2';
  return null;
}

// ===========================================
// CART CONTEXT
// ===========================================
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('otterseas-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('otterseas-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = useCallback((item) => {
    const id = item.id || item.shopifyVariantId;
    setCartItems(prev => ({
      ...prev,
      [id]: {
        ...item,
        quantity: (prev[id]?.quantity || 0) + 1,
      },
    }));
    setIsDrawerOpen(true);
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev => {
      const currentQty = prev[id]?.quantity || 0;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: newQty,
        },
      };
    });
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems({});
  }, []);

  // Open/close drawer
  const openCart = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Calculate totals
  const cartArray = Object.values(cartItems);
  
  // Separate stickers from products
  const locationStickers = cartArray.filter(item => item.type === 'location-sticker');
  const funStickers = cartArray.filter(item => item.type === 'fun-sticker');
  const products = cartArray.filter(item => item.type === 'product');
  
  // Location sticker calculations (tiered pricing)
  const locationStickerCount = locationStickers.reduce((sum, item) => sum + item.quantity, 0);
  const locationStickerCalc = calculateStickerTotal(locationStickerCount);
  
  // Fun stickers (flat price, no tiered discount)
  const funStickerTotal = funStickers.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const funStickerCount = funStickers.reduce((sum, item) => sum + item.quantity, 0);
  
  // Products total
  const productTotal = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const productCount = products.reduce((sum, item) => sum + item.quantity, 0);
  
  // Grand totals
  const totalItems = locationStickerCount + funStickerCount + productCount;
  const totalPrice = locationStickerCalc.total + funStickerTotal + productTotal;
  
  // Can checkout?
  const hasLocationStickers = locationStickerCount > 0;
  const stickersCanCheckout = !hasLocationStickers || locationStickerCount >= STICKER_PRICING.MIN_ORDER;
  const canCheckout = totalItems > 0 && stickersCanCheckout;

  const value = {
    // Cart state
    cartItems,
    isDrawerOpen,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeDrawer,
    
    // Location sticker specific
    locationStickerCount,
    locationStickerTotal: locationStickerCalc.total,
    locationStickerPricePerItem: locationStickerCalc.pricePerItem,
    locationStickerSavings: locationStickerCalc.savings,
    locationStickerTier: locationStickerCalc.tier,
    locationStickerDiscount: locationStickerCalc.discount,
    
    // Fun stickers
    funStickerCount,
    funStickerTotal,
    
    // Products
    productCount,
    productTotal,
    
    // Totals
    totalItems,
    totalPrice,
    savings: locationStickerCalc.savings,
    
    // Checkout
    canCheckout,
    minOrder: STICKER_PRICING.MIN_ORDER,
    
    // Legacy compatibility (for existing components)
    pricePerItem: locationStickerCalc.pricePerItem,
    pricingTier: { tier: locationStickerCalc.tier, discount: locationStickerCalc.discount },
    
    // Get discount code for checkout
    getDiscountCode: () => getDiscountCode(locationStickerCount),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Export pricing constants for use elsewhere
export { STICKER_PRICING, getPricingTier, calculateStickerTotal, getDiscountCode };
