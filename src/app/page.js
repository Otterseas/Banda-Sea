'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STICKERS, BUNDLES, REGIONS, BASE_PRICE, getAllStickers } from '@/data/stickers';
import { useCart } from '@/context/CartContext';

// ===========================================
// LUNA COLOR PALETTE
// ===========================================
const LUNA = {
  highlight: '#A7EBF2',      // Glows, Active Borders, Active Text
  surfaceTeal: '#54ACBF',    // Hero Section, Accents
  midDepth: '#26658C',       // Gradient Middle
  deepWater: '#023859',      // Gradient Transition
  abyss: '#011C40',          // Page Bottom, Footer, Darkest
  text: '#FFFFFF',           // Pure White
};

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function Home() {
  const [activeTab, setActiveTab] = useState(REGIONS[0]);
  const [animatingItems, setAnimatingItems] = useState(new Set());
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  
  const {
    cartItems,
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
  } = useCart();

  // Get stickers for current tab
  const activeStickers = STICKERS[activeTab] || [];

  // Get all stickers flat
  const allStickers = getAllStickers();

  // Check if sticker is in cart
  const isInCart = (stickerId) => cartItems[stickerId] > 0;
  
  // Get quantity for a sticker
  const getItemQuantity = (stickerId) => cartItems[stickerId] || 0;

  // Toggle sticker in cart with animation
  const handleToggleSticker = (sticker) => {
    setAnimatingItems(prev => new Set(prev).add(sticker.id));
    setTimeout(() => {
      setAnimatingItems(prev => {
        const next = new Set(prev);
        next.delete(sticker.id);
        return next;
      });
    }, 300);

    toggleItem(sticker.id);
  };

  // Checkout handler
  const handleCheckout = () => {
    const cartItemsArray = Object.entries(cartItems).map(([id, qty]) => {
      const sticker = allStickers.find(s => s.id === id);
      return { 
        variantId: sticker?.shopifyVariantId || id, 
        quantity: qty 
      };
    });

    const cartString = cartItemsArray
      .map(item => `${item.variantId}:${item.quantity}`)
      .join(',');

    const baseUrl = 'https://38a44d-4c.myshopify.com/cart/';
    
    let discountParam = '';
    if (totalItems >= 21) {
      discountParam = '?discount=BULK21';
    } else if (totalItems >= 11) {
      discountParam = '?discount=BULK11';
    }

    const checkoutUrl = `${baseUrl}${cartString}${discountParam}`;
    window.location.href = checkoutUrl;
  };

  // Handle bundle add
  const handleAddBundle = (bundle) => {
    addBundle(bundle);
  };

  // Get cart items with full sticker data for display
  const getCartItemsWithData = () => {
    return Object.entries(cartItems).map(([id, quantity]) => {
      const sticker = allStickers.find(s => s.id === id);
      return sticker ? { ...sticker, quantity } : null;
    }).filter(Boolean);
  };

  const cartItemsWithData = getCartItemsWithData();

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* ===========================================
          GLOBAL STYLES
          =========================================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        
        /* Hide scrollbar */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Glass card hover effect */
        .glass-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 0 40px rgba(167, 235, 242, 0.4), 
                      0 20px 40px rgba(1, 28, 64, 0.5),
                      inset 0 1px 2px rgba(255,255,255,0.2) !important;
          border-color: #A7EBF2 !important;
        }
        .glass-card.selected {
          box-shadow: 0 0 40px rgba(167, 235, 242, 0.5), 
                      0 20px 40px rgba(1, 28, 64, 0.4),
                      inset 0 1px 2px rgba(255,255,255,0.2) !important;
          border-color: #A7EBF2 !important;
        }
        
        /* Floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Glow pulse */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(167, 235, 242, 0.3); }
          50% { box-shadow: 0 0 40px rgba(167, 235, 242, 0.5); }
        }
        .glow-pulse {
          animation: glowPulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* ===========================================
          FIXED BACKGROUND GRADIENT
          =========================================== */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 30%, ${LUNA.deepWater} 60%, ${LUNA.abyss} 100%)`
        }}
      />

      {/* ===========================================
          ANNOUNCEMENT BANNER
          =========================================== */}
      <div 
        className="w-full py-2 text-center text-sm font-medium"
        style={{ 
          backgroundColor: LUNA.highlight,
          color: LUNA.abyss
        }}
      >
        🌊 Free shipping on orders of 10+ stickers • Use code DIVE10 at checkout
      </div>

      {/* ===========================================
          HEADER
          =========================================== */}
      <header className="sticky top-0 z-50 px-6 py-4" style={{ backgroundColor: `${LUNA.abyss}80`, backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: LUNA.highlight }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LUNA.abyss} strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Otterseas
            </span>
          </Link>

          {/* Nav - Right */}
          <nav className="flex items-center gap-4">
            <Link 
              href="#bundles" 
              className="text-white/70 hover:text-white text-sm font-medium transition-colors hidden md:block"
            >
              Bundles
            </Link>
            <Link 
              href="#surface-tank" 
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ 
                backgroundColor: LUNA.highlight,
                color: LUNA.abyss
              }}
            >
              Surface Tank
            </Link>
          </nav>
        </div>
      </header>

      {/* ===========================================
          HERO SECTION
          =========================================== */}
      <section className="px-6 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Large Title - Left aligned with gradient overlay effect */}
          <h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
            style={{ 
              background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, ${LUNA.midDepth} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none'
            }}
          >
            Build Your Story
          </h1>

          {/* Content Row: Text Left, Gauge Center, Water Bottle Right */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left: Description Text */}
            <div className="flex-1 lg:max-w-sm">
              <p className="text-white/70 text-base leading-relaxed mb-4">
                Every sticker marks a memory. Collect the dive sites you've conquered, 
                the wrecks you've explored, and the reefs that took your breath away.
              </p>
              
              {/* Current tier indicator */}
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-sm">Your tier:</span>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ 
                    backgroundColor: `${LUNA.highlight}20`,
                    color: LUNA.highlight,
                    border: `1px solid ${LUNA.highlight}40`
                  }}
                >
                  {pricingTier.tier} (£{pricePerItem.toFixed(2)}/each)
                </span>
              </div>
            </div>

            {/* Center: Depth Gauge Pricing */}
            <div className="flex-1 w-full max-w-sm">
              <p className="text-white/50 text-xs font-medium mb-3 uppercase tracking-wider text-center">
                Dive Deeper, Save More
              </p>
              
              {/* Glass Track */}
              <div className="relative">
                <div 
                  className="h-2 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                />
                
                {/* Progress Fill */}
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(100, (totalItems / 21) * 100)}%`,
                    backgroundColor: LUNA.highlight,
                    boxShadow: `0 0 10px ${LUNA.highlight}`
                  }}
                />
                
                {/* Nodes */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between">
                  {/* Node 1: Starter */}
                  <div className="relative flex flex-col items-center">
                    <div 
                      className="w-4 h-4 rounded-full border-2 transition-all"
                      style={{ 
                        backgroundColor: totalItems >= 1 ? LUNA.highlight : 'transparent',
                        borderColor: LUNA.highlight,
                        boxShadow: totalItems >= 1 ? `0 0 10px ${LUNA.highlight}` : 'none'
                      }}
                    />
                    <span className="absolute top-6 text-xs font-semibold whitespace-nowrap" style={{ color: LUNA.highlight }}>
                      £2.50
                    </span>
                    <span className="absolute top-10 text-xs text-white/50 whitespace-nowrap">
                      Starter
                    </span>
                  </div>
                  
                  {/* Node 2: Explorer */}
                  <div className="relative flex flex-col items-center">
                    <div 
                      className="w-4 h-4 rounded-full border-2 transition-all"
                      style={{ 
                        backgroundColor: totalItems >= 11 ? LUNA.highlight : 'transparent',
                        borderColor: totalItems >= 11 ? LUNA.highlight : 'rgba(255,255,255,0.3)',
                        boxShadow: totalItems >= 11 ? `0 0 10px ${LUNA.highlight}` : 'none'
                      }}
                    />
                    <span 
                      className="absolute top-6 text-xs font-semibold whitespace-nowrap"
                      style={{ color: totalItems >= 11 ? LUNA.highlight : 'rgba(255,255,255,0.4)' }}
                    >
                      £1.75
                    </span>
                    <span className="absolute top-10 text-xs text-white/50 whitespace-nowrap">
                      Explorer
                    </span>
                  </div>
                  
                  {/* Node 3: Pro */}
                  <div className="relative flex flex-col items-center">
                    <div 
                      className="w-4 h-4 rounded-full border-2 transition-all"
                      style={{ 
                        backgroundColor: totalItems >= 21 ? LUNA.highlight : 'transparent',
                        borderColor: totalItems >= 21 ? LUNA.highlight : 'rgba(255,255,255,0.3)',
                        boxShadow: totalItems >= 21 ? `0 0 10px ${LUNA.highlight}` : 'none'
                      }}
                    />
                    <span 
                      className="absolute top-6 text-xs font-semibold whitespace-nowrap"
                      style={{ color: totalItems >= 21 ? LUNA.highlight : 'rgba(255,255,255,0.4)' }}
                    >
                      £1.50
                    </span>
                    <span className="absolute top-10 text-xs text-white/50 whitespace-nowrap">
                      Pro
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Featured Product (Water Bottle) - Square */}
            <div 
              className="w-full lg:w-56 rounded-2xl p-3 floating relative flex-shrink-0"
              style={{ 
                background: `rgba(2, 56, 89, 0.3)`,
                backdropFilter: 'blur(12px)',
                border: `3px solid ${LUNA.highlight}`,
                boxShadow: `0 0 30px ${LUNA.highlight}40`
              }}
            >
              {/* Badge */}
              <div 
                className="absolute -top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold z-10"
                style={{ 
                  backgroundColor: LUNA.highlight,
                  color: LUNA.abyss
                }}
              >
                Memories That Stick
              </div>
              
              {/* Inner Box - Semi-transparent glass effect */}
              <div 
                className="rounded-xl p-2 mb-3"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {/* ====== WATER BOTTLE IMAGE ====== */}
                {/* Replace the src URL below with your Shopify image URL */}
                <div className="aspect-square rounded-lg flex items-center justify-center overflow-hidden bg-white/10">
                  <img 
                    src="https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=823"
                    alt="Surface Tank Water Bottle"
                    className="w-full h-full object-contain"
                   />
                 </div>
              </div>
              
              {/* Product Info */}
              <div className="px-1">
                <h3 className="text-sm font-bold text-white mb-0.5">Surface Tank</h3>
                <p className="text-white/60 text-xs mb-2">750ml Insulated</p>
                <div className="flex items-center justify-between">
                  <span style={{ color: LUNA.highlight }} className="text-lg font-bold">£24.99</span>
                  {/* 
                    TODO: Replace href with your water bottle product page URL, e.g.:
                    href="/products/surface-tank" or external Shopify URL
                  */}
                  <Link 
                    href="#surface-tank"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: LUNA.highlight,
                      color: LUNA.abyss
                    }}
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          FLOATING GLASS NAVIGATION
          =========================================== */}
      <div className="sticky top-20 z-40 flex justify-center px-6 py-4">
        <nav 
          className="inline-flex items-center gap-1 p-1.5 rounded-full overflow-x-auto hide-scrollbar max-w-full"
          style={{ 
            backgroundColor: `${LUNA.abyss}30`,
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveTab(region)}
              className="relative px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeTab === region ? LUNA.highlight : 'transparent',
                color: activeTab === region ? LUNA.abyss : 'rgba(255,255,255,0.7)',
              }}
            >
              {region}
            </button>
          ))}
        </nav>
      </div>

      {/* ===========================================
          STICKER GRID
          =========================================== */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {activeTab}
            </h2>
            <span className="text-white/50 text-sm">
              {activeStickers.length} stickers
            </span>
          </div>

          {/* Grid - extra padding for badge overflow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-3 px-1">
            {activeStickers.map((sticker, index) => {
              const inCart = isInCart(sticker.id);
              const quantity = getItemQuantity(sticker.id);
              const isAnimating = animatingItems.has(sticker.id);

              return (
                <div
                  key={sticker.id}
                  className={`glass-card relative rounded-3xl p-4 cursor-pointer ${inCart ? 'selected' : ''}`}
                  style={{
                    background: `linear-gradient(145deg, rgba(38, 101, 140, 0.5) 0%, rgba(2, 56, 89, 0.7) 100%)`,
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: inCart 
                      ? `3px solid ${LUNA.highlight}`
                      : `3px solid rgba(167, 235, 242, 0.35)`,
                    boxShadow: inCart
                      ? `0 0 30px rgba(167, 235, 242, 0.4), inset 0 1px 2px rgba(255,255,255,0.15)`
                      : `0 8px 32px rgba(1, 28, 64, 0.5), inset 0 1px 2px rgba(255,255,255,0.1)`,
                  }}
                  onClick={() => handleToggleSticker(sticker)}
                >
                  {/* Quantity Badge - positioned outside card bounds */}
                  {quantity > 0 && (
                    <div 
                      className="absolute w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-20"
                      style={{ 
                        top: '-10px',
                        right: '-10px',
                        backgroundColor: LUNA.highlight,
                        color: LUNA.abyss,
                        boxShadow: `0 0 15px ${LUNA.highlight}`
                      }}
                    >
                      {quantity}
                    </div>
                  )}

                  {/* Inner Box - Semi-transparent glass effect */}
                  <div 
                    className="rounded-2xl p-2"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 4px 15px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Sticker Image */}
                    <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center">
                      {sticker.image && sticker.image !== '/stickers/placeholder.png' ? (
                        <img 
                          src={sticker.image} 
                          alt={sticker.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-white/50 text-xs text-center p-2">
                          {sticker.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-2 py-3">
                    <h3 className="text-white text-sm font-bold truncate">
                      {sticker.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-white/60 text-xs truncate flex-1">
                        {sticker.country}
                      </span>
                      <Link 
                        href={`/stickers/${sticker.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold transition-all hover:scale-105"
                        style={{ color: LUNA.highlight }}
                      >
                        View →
                      </Link>
                    </div>
                    <div className="flex items-center justify-end mt-1">
                      <span style={{ color: LUNA.highlight }} className="text-sm font-bold">
                        £{pricePerItem.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===========================================
          BUNDLES SECTION
          =========================================== */}
      <section id="bundles" className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Curated Bundles</h2>
          <p className="text-white/60 mb-8">Pre-selected collections for every type of diver</p>

          <div className="grid md:grid-cols-3 gap-6">
            {BUNDLES.map((bundle) => {
              const bundleStickers = bundle.stickerIds
                .map(id => allStickers.find(s => s.id === id))
                .filter(Boolean);

              return (
                <div
                  key={bundle.id}
                  className="rounded-2xl p-6 transition-all hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: LUNA.deepWater,
                    border: `1px solid ${LUNA.midDepth}`
                  }}
                >
                  {/* Fanned Sticker Preview */}
                  <div className="flex -space-x-4 mb-4">
                    {bundleStickers.slice(0, 5).map((sticker, i) => (
                      <div
                        key={sticker.id}
                        className="w-12 h-12 rounded-lg bg-white flex items-center justify-center border-2 border-white shadow-lg"
                        style={{ 
                          transform: `rotate(${(i - 2) * 5}deg)`,
                          zIndex: 5 - i
                        }}
                      >
                        {sticker.image && sticker.image !== '/stickers/placeholder.png' ? (
                          <img 
                            src={sticker.image} 
                            alt={sticker.name}
                            className="w-full h-full object-contain rounded-md"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">📍</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{bundle.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{bundle.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-sm">
                      {bundle.stickerIds.length} stickers
                    </span>
                    <button
                      onClick={() => handleAddBundle(bundle)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: LUNA.highlight,
                        color: LUNA.abyss
                      }}
                    >
                      Add Bundle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===========================================
          FLOATING CART PILL
          =========================================== */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsCartExpanded(!isCartExpanded)}
            className="flex items-center gap-3 px-5 py-3 rounded-full transition-all hover:scale-105"
            style={{ 
              backgroundColor: `${LUNA.abyss}90`,
              backdropFilter: 'blur(20px)',
              border: `2px solid ${LUNA.highlight}`,
              boxShadow: `0 0 30px ${LUNA.highlight}40`
            }}
          >
            {/* Cart Icon */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: LUNA.highlight }}
            >
              <span className="text-sm font-bold" style={{ color: LUNA.abyss }}>
                {totalItems}
              </span>
            </div>
            
            {/* Total */}
            <div className="text-left">
              <p className="text-white text-sm font-semibold">
                £{totalPrice.toFixed(2)}
              </p>
              {savings > 0 && (
                <p className="text-xs" style={{ color: LUNA.highlight }}>
                  Save £{savings.toFixed(2)}
                </p>
              )}
            </div>

            {/* Arrow */}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={LUNA.highlight}
              strokeWidth="2"
              className={`transition-transform ${isCartExpanded ? 'rotate-180' : ''}`}
            >
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>

          {/* Expanded Cart Panel */}
          {isCartExpanded && (
            <div 
              className="absolute bottom-16 right-0 w-80 rounded-2xl p-4 max-h-96 overflow-y-auto hide-scrollbar"
              style={{ 
                backgroundColor: `${LUNA.abyss}95`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${LUNA.highlight}40`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Your Pack</h3>
                <button
                  onClick={(e) => { e.stopPropagation(); clearCart(); setIsCartExpanded(false); }}
                  className="text-white/50 text-xs hover:text-white transition-colors"
                >
                  Clear all
                </button>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cartItemsWithData.length > 0 ? (
                  cartItemsWithData.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.image && item.image !== '/stickers/placeholder.png' ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xs">📍</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-white/50 text-xs">×{item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                          className="w-6 h-6 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 flex items-center justify-center"
                        >
                          -
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                          className="w-6 h-6 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/50 text-sm text-center py-4">Your pack is empty</p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all"
                style={{ 
                  backgroundColor: canCheckout ? LUNA.highlight : 'rgba(255,255,255,0.1)',
                  color: canCheckout ? LUNA.abyss : 'rgba(255,255,255,0.3)',
                  cursor: canCheckout ? 'pointer' : 'not-allowed'
                }}
              >
                {canCheckout ? 'Checkout →' : `Min 5 stickers required`}
              </button>

              {!canCheckout && totalItems > 0 && (
                <p className="text-center text-white/50 text-xs mt-2">
                  Add {5 - totalItems} more to checkout
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===========================================
          FOOTER
          =========================================== */}
      <footer 
        className="px-6 py-12 mt-16"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: LUNA.highlight }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LUNA.abyss} strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Otterseas</span>
            </div>
            
            <p className="text-white/40 text-sm">
              © 2025 Otterseas. Dive deeper, collect memories.
            </p>

            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
