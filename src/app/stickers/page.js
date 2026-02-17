'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { STICKERS, REGIONS, BASE_PRICE, getAllStickers } from '@/data/stickers';
import { LOCATION_BUNDLES } from '@/data/bundles';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReviewsSection } from '@/components/Reviews';
import { getReviewsByProduct } from '@/data/reviews';
import { motion, AnimatePresence } from 'framer-motion';
import { NotifyMeButton, StockBadge } from '@/components/NotifyMe';

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
  const [selectedSticker, setSelectedSticker] = useState(null); // For modal
  const [selectedStock, setSelectedStock] = useState({ loading: false, quantity: null, available: true });

  // Scroll indicator state
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const stickerGridRef = useRef(null);

  // Region nav scroll state
  const regionNavRef = useRef(null);
  const [showNavArrows, setShowNavArrows] = useState({ left: false, right: true });

  // Location suggestion state
  const [locationSuggestion, setLocationSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [suggestionSubmitting, setSuggestionSubmitting] = useState(false);

  // Grid stock state - tracks stock for all visible stickers
  const [gridStock, setGridStock] = useState({});

  // Fetch stock when a sticker is selected for the modal
  useEffect(() => {
    if (!selectedSticker?.shopifyVariantId) {
      setSelectedStock({ loading: false, quantity: null, available: true });
      return;
    }

    const fetchStock = async () => {
      setSelectedStock({ loading: true, quantity: null, available: true });
      try {
        const response = await fetch(`/api/stock?ids=${selectedSticker.shopifyVariantId}&_t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        if (data[selectedSticker.shopifyVariantId]) {
          setSelectedStock({
            loading: false,
            quantity: data[selectedSticker.shopifyVariantId].quantity,
            available: data[selectedSticker.shopifyVariantId].available && !data[selectedSticker.shopifyVariantId].outOfStock,
          });
        } else {
          setSelectedStock({ loading: false, quantity: null, available: true });
        }
      } catch (error) {
        console.error('Failed to fetch stock:', error);
        setSelectedStock({ loading: false, quantity: null, available: true });
      }
    };

    fetchStock();
  }, [selectedSticker?.shopifyVariantId]);

  const isSelectedOutOfStock = !selectedStock.available || selectedStock.quantity === 0;
  const isSelectedLowStock = selectedStock.quantity !== null && selectedStock.quantity > 0 && selectedStock.quantity <= 3;

  // Check if sticker grid can scroll (more than 2 rows of 5)
  useEffect(() => {
    const checkScroll = () => {
      if (stickerGridRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = stickerGridRef.current;
        // Show indicator if there's more content and not scrolled to bottom
        const canScrollMore = scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 10;
        setShowScrollIndicator(canScrollMore);
      }
    };

    checkScroll();
    const gridEl = stickerGridRef.current;
    if (gridEl) {
      gridEl.addEventListener('scroll', checkScroll);
      return () => gridEl.removeEventListener('scroll', checkScroll);
    }
  }, [activeTab]); // Re-check when tab changes

  // Check region nav scroll position for arrows
  useEffect(() => {
    const checkNavScroll = () => {
      if (regionNavRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = regionNavRef.current;
        setShowNavArrows({
          left: scrollLeft > 10,
          right: scrollLeft < scrollWidth - clientWidth - 10,
        });
      }
    };

    checkNavScroll();
    const navEl = regionNavRef.current;
    if (navEl) {
      navEl.addEventListener('scroll', checkNavScroll);
      window.addEventListener('resize', checkNavScroll);
      return () => {
        navEl.removeEventListener('scroll', checkNavScroll);
        window.removeEventListener('resize', checkNavScroll);
      };
    }
  }, []);

  const scrollRegionNav = (direction) => {
    if (regionNavRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      regionNavRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle location suggestion submit to Klaviyo
  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    if (!locationSuggestion.trim()) return;

    setSuggestionSubmitting(true);
    try {
      // Submit to Klaviyo API
      await fetch('/api/klaviyo/suggest-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: locationSuggestion.trim() }),
      });
      setSuggestionSubmitted(true);
      setLocationSuggestion('');
      // Reset after 3 seconds
      setTimeout(() => setSuggestionSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to submit suggestion:', error);
    } finally {
      setSuggestionSubmitting(false);
    }
  };

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
    clearCart,
    openCart,
  } = useCart();

  const { formatPrice } = useCurrency();

  // Get stickers for current tab
  const activeStickers = STICKERS[activeTab] || [];

  // Get all stickers flat
  const allStickers = getAllStickers();

  // Fetch stock for all stickers in current tab
  useEffect(() => {
    const variantIds = activeStickers
      .filter(s => s.shopifyVariantId)
      .map(s => s.shopifyVariantId);

    if (variantIds.length === 0) return;

    const fetchGridStock = async () => {
      try {
        const response = await fetch(`/api/stock?ids=${variantIds.join(',')}&_t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        if (!data.error) {
          setGridStock(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error('Failed to fetch grid stock:', error);
      }
    };

    fetchGridStock();
  }, [activeTab]);

  // Helper to check if a sticker is out of stock
  const isStickerOutOfStock = (sticker) => {
    const stock = gridStock[sticker.shopifyVariantId];
    if (!stock) return false; // Assume in stock if not loaded
    return !stock.available || stock.outOfStock || stock.quantity === 0;
  };

  // Check if sticker is in cart
  const isInCart = (stickerId) => cartItems[stickerId]?.quantity > 0;

  // Get quantity for a sticker
  const getItemQuantity = (stickerId) => cartItems[stickerId]?.quantity || 0;

  // Add sticker to cart with animation
  const handleAddToCart = (sticker, e) => {
    if (e) e.stopPropagation();
    setAnimatingItems(prev => new Set(prev).add(sticker.id));
    setTimeout(() => {
      setAnimatingItems(prev => {
        const next = new Set(prev);
        next.delete(sticker.id);
        return next;
      });
    }, 300);

    // Add with type for cart categorization (tiered pricing)
    addToCart({
      ...sticker,
      type: 'location-sticker',
      price: BASE_PRICE,
    });
  };

  // Open sticker preview modal
  const handleOpenPreview = (sticker) => {
    setSelectedSticker(sticker);
  };

  // Close modal
  const handleClosePreview = () => {
    setSelectedSticker(null);
  };

  // Navigate to next/previous sticker in region
  const handleNavigateSticker = (direction) => {
    if (!selectedSticker) return;
    const currentIndex = activeStickers.findIndex(s => s.id === selectedSticker.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex < activeStickers.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : activeStickers.length - 1;
    }
    setSelectedSticker(activeStickers[newIndex]);
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
          HEADER - SHARED COMPONENT
          =========================================== */}
      <Header variant="dark" currentPath="/stickers" />

      {/* ===========================================
          HERO SECTION - pt-20 for fixed header
          =========================================== */}
      <section className="px-6 pt-20 pb-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Large Title - With MAGENTA GRADIENT EFFECT (matching Surface Tank) */}
          <h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
            style={{ 
              background: `linear-gradient(135deg, ${LUNA.highlight} 0%, #FF6B9D 50%, ${LUNA.highlight} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Build Your Story
          </h1>

          {/* Content Row: Text Left, Gauge Center, Water Bottle Right */}
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            
            {/* Left: Description Text */}
            <div className="flex-1 lg:max-w-xs">
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
                  {pricingTier.tier} ({formatPrice(pricePerItem)}/each)
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
                      {formatPrice(2.50)}
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
                      {formatPrice(1.75)}
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
                      {formatPrice(1.50)}
                    </span>
                    <span className="absolute top-10 text-xs text-white/50 whitespace-nowrap">
                      Pro
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Featured Product (Water Bottle) - GLASS EFFECT CARD */}
            <Link 
              href="/products/surface-tank"
              className="w-full lg:w-56 rounded-2xl p-3 floating relative flex-shrink-0 block transition-all hover:scale-105"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                border: `2px solid ${LUNA.highlight}`,
                boxShadow: `0 0 20px ${LUNA.highlight}30`
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
                  <span style={{ color: LUNA.highlight }} className="text-lg font-bold">{formatPrice(40.00)}</span>
                  <span
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${LUNA.highlight}`,
                      color: 'white',
                      boxShadow: `0 0 15px ${LUNA.highlight}30`
                    }}
                  >
                    View →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===========================================
          FLOATING GLASS NAVIGATION
          =========================================== */}
      <div className="sticky top-16 z-40 flex justify-center px-6 py-4">
        <div className="relative flex items-center max-w-full">
          {/* Left Arrow - Mobile */}
          {showNavArrows.left && (
            <button
              onClick={() => scrollRegionNav('left')}
              className="md:hidden absolute left-0 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{
                background: `linear-gradient(90deg, ${LUNA.abyss} 0%, transparent 100%)`,
              }}
              aria-label="Scroll regions left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <nav
            ref={regionNavRef}
            className="inline-flex items-center gap-1 p-1.5 rounded-full overflow-x-auto hide-scrollbar max-w-full relative"
            style={{
              backgroundColor: `${LUNA.abyss}30`,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {REGIONS.map((region, index) => (
              <button
                key={region}
                onClick={() => setActiveTab(region)}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap z-10"
                style={{
                  color: activeTab === region ? LUNA.highlight : 'rgba(255,255,255,0.7)',
                }}
              >
                {/* Sliding Glass Indicator */}
                {activeTab === region && (
                  <motion.div
                    layoutId="activeRegionIndicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: 'rgba(167, 235, 242, 0.25)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${LUNA.highlight}`,
                      boxShadow: `0 0 20px ${LUNA.highlight}40, inset 0 1px 1px rgba(255,255,255,0.1)`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{region}</span>
              </button>
            ))}
          </nav>

          {/* Right Arrow - Mobile */}
          {showNavArrows.right && (
            <button
              onClick={() => scrollRegionNav('right')}
              className="md:hidden absolute right-0 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{
                background: `linear-gradient(270deg, ${LUNA.abyss} 0%, transparent 100%)`,
              }}
              aria-label="Scroll regions right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ===========================================
          STICKER GRID - Scrollable Section
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

          {/* Scrollable Grid Container - Shows 2 rows, scrolls for more */}
          <div className="relative">
            <div
              ref={stickerGridRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-3 px-1 overflow-y-auto hide-scrollbar"
              style={{
                maxHeight: 'calc(2 * (280px + 20px))', // ~2 rows of cards + gap
              }}
            >
            {activeStickers.map((sticker, index) => {
              const inCart = isInCart(sticker.id);
              const quantity = getItemQuantity(sticker.id);
              const isAnimating = animatingItems.has(sticker.id);
              const outOfStock = isStickerOutOfStock(sticker);

              return (
                <div
                  key={sticker.id}
                  className={`glass-card relative rounded-3xl p-4 ${inCart ? 'selected' : ''} ${outOfStock ? 'opacity-75' : ''}`}
                  style={{
                    background: `linear-gradient(145deg, rgba(38, 101, 140, 0.5) 0%, rgba(2, 56, 89, 0.7) 100%)`,
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: outOfStock
                      ? `3px solid rgba(255, 100, 100, 0.5)`
                      : inCart
                        ? `3px solid ${LUNA.highlight}`
                        : `3px solid rgba(167, 235, 242, 0.35)`,
                    boxShadow: inCart
                      ? `0 0 30px rgba(167, 235, 242, 0.4), inset 0 1px 2px rgba(255,255,255,0.15)`
                      : `0 8px 32px rgba(1, 28, 64, 0.5), inset 0 1px 2px rgba(255,255,255,0.1)`,
                  }}
                >
                  {/* Out of Stock Badge */}
                  {outOfStock && (
                    <div
                      className="absolute w-auto px-2 py-1 rounded-full flex items-center justify-center text-xs font-bold z-20"
                      style={{
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(220, 38, 38, 0.9)',
                        color: 'white',
                      }}
                    >
                      Out of Stock
                    </div>
                  )}

                  {/* Quantity Badge - positioned outside card bounds */}
                  {quantity > 0 && !outOfStock && (
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

                  {/* Clickable Image Area - Opens Preview Modal */}
                  <div
                    className="rounded-2xl p-2 cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 4px 15px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => handleOpenPreview(sticker)}
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
                    <p className="text-white/60 text-xs truncate mt-0.5">
                      {sticker.country}
                    </p>

                    {/* Price and Add Button Row */}
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <span style={{ color: outOfStock ? 'rgba(255,255,255,0.4)' : LUNA.highlight }} className="text-sm font-bold">
                        {formatPrice(pricePerItem)}
                      </span>
                      {outOfStock ? (
                        <button
                          onClick={() => handleOpenPreview(sticker)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 flex-shrink-0"
                          style={{
                            background: 'rgba(220, 38, 38, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(220, 38, 38, 0.5)',
                            color: 'rgba(255, 150, 150, 1)',
                          }}
                        >
                          Notify Me
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleAddToCart(sticker, e)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 flex-shrink-0"
                          style={{
                            background: inCart
                              ? LUNA.highlight
                              : 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: `2px solid ${LUNA.highlight}`,
                            color: inCart ? LUNA.abyss : 'white',
                            boxShadow: `0 0 15px ${LUNA.highlight}30`
                          }}
                        >
                          {inCart ? '+ Add More' : 'Add to Pack'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Scroll Indicator Arrow */}
            {showScrollIndicator && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    if (stickerGridRef.current) {
                      stickerGridRef.current.scrollBy({ top: 300, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 rounded-full transition-all hover:scale-110 animate-bounce"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: `2px solid ${LUNA.highlight}40`,
                  }}
                  aria-label="Scroll to see more stickers"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={LUNA.highlight}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===========================================
          LOCATION SUGGESTION BOX
          =========================================== */}
      <section className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${LUNA.highlight}30`,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Can't see your next dive spot?
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Tell us where you dive and we'll add it to our collection
            </p>

            {suggestionSubmitted ? (
              <div
                className="py-3 px-6 rounded-xl inline-flex items-center gap-2"
                style={{ backgroundColor: `${LUNA.highlight}20`, color: LUNA.highlight }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-medium">Thanks! We'll look into it</span>
              </div>
            ) : (
              <form onSubmit={handleSuggestionSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={locationSuggestion}
                  onChange={(e) => setLocationSuggestion(e.target.value)}
                  placeholder="e.g. Blue Hole, Belize"
                  className="flex-1 px-4 py-3 rounded-xl text-white placeholder-white/40 outline-none transition-all focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${LUNA.highlight}30`,
                  }}
                />
                <button
                  type="submit"
                  disabled={suggestionSubmitting || !locationSuggestion.trim()}
                  className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  style={{
                    background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                    color: 'white',
                    border: `2px solid ${LUNA.highlight}`,
                    boxShadow: `0 0 15px ${LUNA.highlight}30`,
                  }}
                >
                  {suggestionSubmitting ? 'Sending...' : 'Suggest'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===========================================
          BUNDLES SECTION - Regional & Theme Packs
          =========================================== */}
      <section id="bundles" className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Curated Packs</h2>
          <p className="text-white/60 mb-8">Pre-selected collections - better value than picking individually</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATION_BUNDLES.map((bundle) => {
              const bundleStickers = bundle.stickerIds
                .map(id => allStickers.find(s => s.id === id))
                .filter(Boolean);

              return (
                <div
                  key={bundle.id}
                  className="rounded-2xl p-6 transition-all hover:scale-[1.02]"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${LUNA.midDepth}`
                  }}
                >
                  {/* Pack Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ 
                        backgroundColor: bundle.type === 'regional' ? LUNA.surfaceTeal : LUNA.midDepth,
                        color: 'white' 
                      }}
                    >
                      {bundle.type === 'regional' ? '🗺️ REGIONAL' : '🎯 THEME'}
                    </span>
                    <span className="text-green-400 text-xs font-medium">
                      Save {formatPrice(bundle.savings)}
                    </span>
                  </div>

                  {/* Fanned Sticker Preview */}
                  <div className="flex -space-x-3 mb-4">
                    {bundleStickers.slice(0, 6).map((sticker, i) => (
                      <div
                        key={sticker.id}
                        className="w-11 h-11 rounded-lg bg-white flex items-center justify-center border-2 border-white shadow-lg"
                        style={{ 
                          transform: `rotate(${(i - 2.5) * 4}deg)`,
                          zIndex: 6 - i
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
                    {bundleStickers.length > 6 && (
                      <div
                        className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center border-2 border-white/30"
                        style={{ zIndex: 0 }}
                      >
                        <span className="text-white text-xs font-bold">+{bundleStickers.length - 6}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{bundle.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{bundle.description}</p>
                  
                  {/* Location list */}
                  <p className="text-white/40 text-xs mb-4 line-clamp-2">
                    {bundle.locations.join(' • ')}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/40 text-xs line-through mr-2">
                        {formatPrice(bundle.originalPrice)}
                      </span>
                      <span className="text-xl font-bold" style={{ color: LUNA.highlight }}>
                        {formatPrice(bundle.price)}
                      </span>
                      <span className="text-white/50 text-xs ml-1">
                        ({bundle.stickerCount} stickers)
                      </span>
                    </div>
                    {/* Glass Effect Button */}
                    <button
                      onClick={() => {
                        addToCart({
                          id: bundle.shopifyVariantId,
                          shopifyVariantId: bundle.shopifyVariantId,
                          name: bundle.name,
                          price: bundle.price,
                          type: 'product',
                        });
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${LUNA.highlight}`,
                        color: 'white',
                        boxShadow: `0 0 15px ${LUNA.highlight}30`
                      }}
                    >
                      Add Pack
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===========================================
          FLOATING CART BUTTON - Opens Side Cart Drawer
          =========================================== */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={openCart}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full transition-all hover:scale-105"
          style={{ 
            backgroundColor: `${LUNA.abyss}95`,
            backdropFilter: 'blur(20px)',
            border: `2px solid ${LUNA.highlight}`,
            boxShadow: `0 0 30px ${LUNA.highlight}40`
          }}
        >
          {/* Cart Icon with Count */}
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
              {formatPrice(totalPrice)}
            </p>
            {savings > 0 && (
              <p className="text-xs" style={{ color: LUNA.highlight }}>
                Save {formatPrice(savings)}
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
          >
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.button>
      )}

      {/* ===========================================
          STICKER PREVIEW MODAL
          =========================================== */}
      <AnimatePresence>
        {selectedSticker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(1, 28, 64, 0.9)' }}
            onClick={handleClosePreview}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md rounded-3xl p-6"
              style={{
                background: `linear-gradient(145deg, rgba(38, 101, 140, 0.95) 0%, rgba(2, 56, 89, 0.98) 100%)`,
                backdropFilter: 'blur(24px)',
                border: `3px solid ${LUNA.highlight}`,
                boxShadow: `0 0 60px ${LUNA.highlight}40, 0 25px 50px rgba(1, 28, 64, 0.8)`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClosePreview}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${LUNA.highlight}40`
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => handleNavigateSticker('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: LUNA.abyss,
                  border: `2px solid ${LUNA.highlight}`,
                  boxShadow: `0 0 20px ${LUNA.highlight}40`
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => handleNavigateSticker('next')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: LUNA.abyss,
                  border: `2px solid ${LUNA.highlight}`,
                  boxShadow: `0 0 20px ${LUNA.highlight}40`
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Sticker Image */}
              <div
                className="rounded-2xl p-4 mb-4"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center">
                  {selectedSticker.image && selectedSticker.image !== '/stickers/placeholder.png' ? (
                    <img
                      src={selectedSticker.image}
                      alt={selectedSticker.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="text-white/50 text-xl text-center p-4">
                      {selectedSticker.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Sticker Info */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {selectedSticker.name}
                </h3>
                <p className="text-white/60 text-sm">
                  {selectedSticker.country} • {selectedSticker.region}
                </p>
              </div>

              {/* Region Counter */}
              <p className="text-center text-white/40 text-xs mb-4">
                {activeStickers.findIndex(s => s.id === selectedSticker.id) + 1} of {activeStickers.length} in {activeTab}
              </p>

              {/* Price & Stock Status */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2">
                  <span style={{ color: LUNA.highlight }} className="text-2xl font-bold">
                    {formatPrice(pricePerItem)}
                  </span>
                  <span className="text-white/50 text-sm">each</span>
                  {!selectedStock.loading && isSelectedLowStock && (
                    <StockBadge quantity={selectedStock.quantity} />
                  )}
                </div>
                {!selectedStock.loading && isSelectedOutOfStock && (
                  <p className="text-red-400 text-xs mt-1">Out of Stock</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link
                  href={`/stickers/${selectedSticker.slug}`}
                  className="flex-1 py-3 rounded-xl text-center text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: `2px solid ${LUNA.highlight}40`,
                    color: 'white'
                  }}
                >
                  More Info →
                </Link>
                {selectedStock.loading ? (
                  <button
                    disabled
                    className="flex-1 py-3 rounded-xl text-sm font-semibold opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                      color: 'white',
                    }}
                  >
                    Checking...
                  </button>
                ) : isSelectedOutOfStock ? (
                  <div className="flex-1">
                    <NotifyMeButton
                      productName={selectedSticker.name}
                      variantId={selectedSticker.shopifyVariantId}
                      variant="dark"
                    />
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      handleAddToCart(selectedSticker, e);
                    }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                      border: `2px solid ${LUNA.highlight}`,
                      color: 'white',
                      boxShadow: `0 0 20px ${LUNA.highlight}40`
                    }}
                  >
                    {isInCart(selectedSticker.id) ? '+ Add Another' : 'Add to Pack'}
                  </button>
                )}
              </div>

              {/* Quantity indicator if in cart */}
              {isInCart(selectedSticker.id) && (
                <p className="text-center mt-3 text-sm" style={{ color: LUNA.highlight }}>
                  {getItemQuantity(selectedSticker.id)} in your pack
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===========================================
          CUSTOMER REVIEWS SECTION
          =========================================== */}
      <ReviewsSection 
        reviews={getReviewsByProduct('stickers')}
        title="What Divers Say"
        subtitle="VERIFIED REVIEWS"
        variant="dark"
        showAllLink={true}
      />

      {/* ===========================================
          FOOTER - SHARED COMPONENT
          =========================================== */}
      <Footer compact />
    </div>
  );
}
