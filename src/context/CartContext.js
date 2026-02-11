'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  STICKER_PRICING,
  getPricingTier,
  calculateStickerTotal,
  getDiscountCode,
} from '@/utils/stickerPricing';

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
