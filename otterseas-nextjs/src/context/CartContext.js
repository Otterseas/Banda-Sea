'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getPricePerItem, MIN_ORDER, BASE_PRICE, getPricingTier } from '@/data/stickers';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('otterseas-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('otterseas-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculated values
  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const pricePerItem = getPricePerItem(totalItems);
  const totalPrice = totalItems * pricePerItem;
  const canCheckout = totalItems >= MIN_ORDER;
  const pricingTier = getPricingTier(totalItems);
  const savings = (totalItems * BASE_PRICE) - totalPrice;

  // Add item to cart (opens drawer automatically)
  const addToCart = (sticker) => {
    setCartItems(prev => ({
      ...prev,
      [sticker.id]: (prev[sticker.id] || 0) + 1
    }));
    setIsDrawerOpen(true);
  };

  // Remove item from cart completely
  const removeFromCart = (stickerId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[stickerId];
      return newCart;
    });
  };

  // Update quantity
  const updateQuantity = (stickerId, delta) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      const newQty = (newCart[stickerId] || 0) + delta;
      if (newQty <= 0) {
        delete newCart[stickerId];
      } else {
        newCart[stickerId] = newQty;
      }
      return newCart;
    });
  };

  // Toggle single item (for sticker builder)
  const toggleItem = (stickerId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[stickerId]) {
        delete newCart[stickerId];
      } else {
        newCart[stickerId] = 1;
      }
      return newCart;
    });
  };

  // Add bundle
  const addBundle = (bundle) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      bundle.stickerIds.forEach(id => {
        newCart[id] = (newCart[id] || 0) + 1;
      });
      return newCart;
    });
    setIsDrawerOpen(true);
  };

  // Toggle drawer
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Clear cart
  const clearCart = () => setCartItems({});

  const value = {
    cartItems,
    isDrawerOpen,
    totalItems,
    pricePerItem,
    totalPrice,
    canCheckout,
    pricingTier,
    savings,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleItem,
    addBundle,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    clearCart,
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
