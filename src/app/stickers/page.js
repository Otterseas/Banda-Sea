'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { STICKERS, REGIONS, BASE_PRICE, getAllStickers } from '@/data/stickers';
import { LOCATION_BUNDLES } from '@/data/bundles';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecentlyViewed from '@/components/RecentlyViewed';
import { NotifyMeButton, StockBadge } from '@/components/NotifyMe';
import WhisperText from '@/components/WhisperText';
import StickerGlobe from '@/components/StickerGlobe';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  cream: '#FAF7F1',
  bone: '#F5EFE6',
};

// Per-region gradient — each region tab gets a slightly different blue mix
// so the closed-panel ribbon has a visible progression instead of one flat
// colour. All stay inside the brand palette.
const REGION_GRADIENTS = {
  'UK/Europe':         'linear-gradient(160deg, #5BAFC8 0%, #226183 50%, #03304F 100%)',
  'USA/Canada':        'linear-gradient(160deg, #6CC0D6 0%, #2C7898 50%, #053D5F 100%)',
  'South East Asia':   'linear-gradient(160deg, #74CCDB 0%, #348AA8 50%, #064B68 100%)',
  'Caribbean':         'linear-gradient(160deg, #5FD3DD 0%, #2C97AB 50%, #045A77 100%)',
  'Indian Ocean':      'linear-gradient(160deg, #4FC0DC 0%, #2884AE 50%, #044768 100%)',
  'Pacific & Oceania': 'linear-gradient(160deg, #4798C7 0%, #1F5E97 50%, #022E5C 100%)',
  'Latin America':     'linear-gradient(160deg, #3D85B6 0%, #1A4F86 50%, #022448 100%)',
  'Expeditions':       'linear-gradient(160deg, #345578 0%, #122F54 50%, #001434 100%)',
};

// Customers Also Love — same shape as on the product pages. Quick-Add wired
// for the two products with known default Shopify variant IDs.
const RELATED_PRODUCTS = [
  {
    name: 'The Surface Tank',
    href: '/products/surface-tank',
    image: '/images/products/The-surface-tank-sunset.jpg',
    priceLabel: '£40',
    quickAdd: {
      shopifyVariantId: '52453682807050',
      name: 'The Surface Tank - Deep Ocean',
      price: 40.0,
    },
  },
  {
    name: 'The Dive Journal',
    href: '/products/dive-journal',
    image: '/images/products/The-dive-journal-product-shot.jpg',
    priceLabel: 'From £28',
    quickAdd: {
      shopifyVariantId: '49658874331402',
      name: 'The Dive Journal',
      price: 28.0,
    },
  },
  {
    name: 'Log Pages',
    href: '/products/logbook-booster-pack',
    image: '/images/products/The-log-pages-notes.jpg',
    priceLabel: 'From £12',
    quickAdd: {
      shopifyVariantId: '49872531325194',
      name: 'Log Pages (Booster Pack)',
      price: 12.0,
    },
  },
  {
    name: 'Crochet Creatures',
    href: '/products/crochet-creatures',
    image: '/images/products/Purple-nudis-product-shot.png',
    priceLabel: 'From £17.50',
    quickAdd: null,
  },
];

// Curated dive site coordinates — used as markers on the rotating globe in
// the hero. A subset of the full sticker catalogue, picked to give good
// visual coverage around the world.
const GLOBE_LOCATIONS = [
  { id: 'maldives', name: 'Maldives', location: [3.2028, 73.2207] },
  { id: 'bahamas', name: 'Bahamas', location: [24.7, -77.5] },
  { id: 'hawaii', name: 'Hawaii', location: [19.9, -155.5] },
  { id: 'sipadan', name: 'Sipadan', location: [4.115, 118.629] },
  { id: 'raja-ampat', name: 'Raja Ampat', location: [-0.5, 130.5] },
  { id: 'galapagos', name: 'Galápagos', location: [-0.79, -91.0] },
  { id: 'silfra', name: 'Silfra', location: [64.26, -21.12] },
  { id: 'palau', name: 'Palau', location: [7.5, 134.6] },
  { id: 'komodo', name: 'Komodo', location: [-8.55, 119.49] },
  { id: 'red-sea', name: 'Red Sea', location: [27.5, 33.8] },
  { id: 'fiji', name: 'Fiji', location: [-17.71, 178.07] },
  { id: 'cozumel', name: 'Cozumel', location: [20.5, -86.95] },
  { id: 'banda-sea', name: 'Banda Sea', location: [-4.5, 129] },
  { id: 'cocos', name: 'Cocos Island', location: [5.53, -87.08] },
  { id: 'anilao', name: 'Anilao', location: [13.76, 120.93] },
];

// =============== main component ===============

export default function StickersPage() {
  const [activeTab, setActiveTab] = useState(REGIONS[0]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [previewBundle, setPreviewBundle] = useState(null);
  const [selectedStock, setSelectedStock] = useState({ loading: false, quantity: null, available: true });
  const [gridStock, setGridStock] = useState({});
  const [animatingItems, setAnimatingItems] = useState(new Set());

  // Suggestion form
  const [locationSuggestion, setLocationSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [suggestionSubmitting, setSuggestionSubmitting] = useState(false);


  const {
    cartItems,
    totalItems,
    pricePerItem,
    pricingTier,
    addToCart,
    openCart,
  } = useCart();
  const { formatPrice } = useCurrency();

  const activeStickers = STICKERS[activeTab] || [];
  const allStickers = getAllStickers();

  // Fetch stock for stickers in the active region.
  useEffect(() => {
    const variantIds = activeStickers
      .filter((s) => s.shopifyVariantId)
      .map((s) => s.shopifyVariantId);
    if (variantIds.length === 0) return;

    let cancelled = false;
    const fetchGridStock = async () => {
      try {
        const response = await fetch(`/api/stock?ids=${variantIds.join(',')}&_t=${Date.now()}`, {
          cache: 'no-store',
        });
        const data = await response.json();
        if (!cancelled && !data.error) setGridStock((prev) => ({ ...prev, ...data }));
      } catch {
        // swallow — assume in stock if fetch fails
      }
    };
    fetchGridStock();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  // Fetch stock for the currently-previewed sticker.
  useEffect(() => {
    if (!selectedSticker?.shopifyVariantId) {
      setSelectedStock({ loading: false, quantity: null, available: true });
      return;
    }
    setSelectedStock({ loading: true, quantity: null, available: true });
    const fetchStock = async () => {
      try {
        const response = await fetch(
          `/api/stock?ids=${selectedSticker.shopifyVariantId}&_t=${Date.now()}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        if (data[selectedSticker.shopifyVariantId]) {
          setSelectedStock({
            loading: false,
            quantity: data[selectedSticker.shopifyVariantId].quantity,
            available:
              data[selectedSticker.shopifyVariantId].available &&
              !data[selectedSticker.shopifyVariantId].outOfStock,
          });
        } else {
          setSelectedStock({ loading: false, quantity: null, available: true });
        }
      } catch {
        setSelectedStock({ loading: false, quantity: null, available: true });
      }
    };
    fetchStock();
  }, [selectedSticker?.shopifyVariantId]);

  const isStickerOutOfStock = (sticker) => {
    const stock = gridStock[sticker.shopifyVariantId];
    if (!stock) return false;
    return !stock.available || stock.outOfStock || stock.quantity === 0;
  };

  const isInCart = (id) => cartItems[id]?.quantity > 0;
  const getItemQuantity = (id) => cartItems[id]?.quantity || 0;

  const handleAddToCart = (sticker, e) => {
    if (e) e.stopPropagation();
    setAnimatingItems((prev) => new Set(prev).add(sticker.id));
    setTimeout(() => {
      setAnimatingItems((prev) => {
        const next = new Set(prev);
        next.delete(sticker.id);
        return next;
      });
    }, 300);
    addToCart({ ...sticker, type: 'location-sticker', price: BASE_PRICE });
  };

  const handleOpenPreview = (sticker) => setSelectedSticker(sticker);
  const handleClosePreview = () => setSelectedSticker(null);

  const handleNavigateSticker = (direction) => {
    if (!selectedSticker) return;
    const idx = activeStickers.findIndex((s) => s.id === selectedSticker.id);
    let newIdx;
    if (direction === 'next') newIdx = idx < activeStickers.length - 1 ? idx + 1 : 0;
    else newIdx = idx > 0 ? idx - 1 : activeStickers.length - 1;
    setSelectedSticker(activeStickers[newIdx]);
  };

  const handleScrollToTabs = () => {
    const el = document.getElementById('region-tabs');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddSurfaceTank = () => {
    addToCart({
      id: '52453682807050',
      shopifyVariantId: '52453682807050',
      name: 'The Surface Tank - Deep Ocean',
      price: 40.0,
      type: 'product',
      image: '/images/products/The-surface-tank-sunset.jpg',
    });
    if (openCart) openCart();
  };

  const handleAddBundle = (bundle) => {
    addToCart({
      id: bundle.shopifyVariantId,
      shopifyVariantId: bundle.shopifyVariantId,
      name: bundle.name,
      price: bundle.price,
      type: 'product',
      image: null,
    });
    if (openCart) openCart();
  };

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    if (!locationSuggestion.trim()) return;
    setSuggestionSubmitting(true);
    try {
      await fetch('/api/klaviyo/suggest-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: locationSuggestion.trim() }),
      });
      setSuggestionSubmitted(true);
      setLocationSuggestion('');
      setTimeout(() => setSuggestionSubmitted(false), 3000);
    } catch {
      // ignore
    } finally {
      setSuggestionSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: COLORS.cream }}
    >
      {/* Free shipping banner */}
      <div
        className="w-full py-2 text-center text-sm font-medium"
        style={{ backgroundColor: COLORS.deepWater, color: COLORS.highlight }}
      >
        Free shipping on orders of 10+ stickers · Use code <strong>DIVE10</strong> at checkout
      </div>

      <Header variant="light" currentPath="/stickers" />

      {/* ============ HERO ============ */}
      <section className="bg-white px-4 md:px-8 pt-10 md:pt-14 pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p
              className="text-sm tracking-[0.28em] font-semibold mb-4"
              style={{ color: COLORS.surfaceTeal }}
            >
              LOCATION STICKER COLLECTION
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] mb-5"
              style={{
                background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, #FF6B9D 50%, ${COLORS.deepWater} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <WhisperText text="Build your dive map." wordDelay={0.18} duration={1.3} />
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 max-w-md">
              Every sticker marks a memory. Collect the dive sites you’ve conquered, the wrecks
              you’ve explored, and the reefs that took your breath away.
            </p>

            {/* Tier pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full mb-6 border"
              style={{
                borderColor: `${COLORS.surfaceTeal}40`,
                backgroundColor: `${COLORS.highlight}1F`,
              }}
            >
              <span className="text-xs uppercase tracking-wider font-medium" style={{ color: COLORS.midDepth }}>
                Your tier
              </span>
              <span className="text-sm font-semibold" style={{ color: COLORS.deepWater }}>
                {pricingTier.tier} · {formatPrice(pricePerItem)}/each
              </span>
            </motion.div>

            <div className="flex flex-wrap gap-3 text-xs tracking-wider font-medium" style={{ color: COLORS.midDepth }}>
              <span>· 1–10 stickers · {formatPrice(2.5)} each</span>
              <span>· 11–20 · {formatPrice(1.75)} each</span>
              <span>· 21+ · {formatPrice(1.25)} each</span>
            </div>
          </div>

          {/* Right: rotating globe (faded) */}
          <div className="relative w-full">
            <div className="absolute inset-0 -z-10 rounded-full blur-3xl"
                 style={{ backgroundColor: `${COLORS.highlight}33` }} />
            <StickerGlobe markers={GLOBE_LOCATIONS} opacity={0.6} className="max-w-[520px] mx-auto" />
            <p className="text-center text-xs tracking-[0.25em] uppercase mt-3" style={{ color: COLORS.midDepth }}>
              80+ dive sites · 8 regions
            </p>
          </div>
        </div>

        {/* Hero scroll-down anchor — bottom-centre, matches the cyan → pink →
            deep-water heading gradient. Smooth-scrolls to the region tabs. */}
        <div className="flex justify-center mt-10 md:mt-12">
          <motion.button
            type="button"
            onClick={handleScrollToTabs}
            aria-label="Jump to region selector"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, #FF6B9D 50%, ${COLORS.deepWater} 100%)`,
              color: 'white',
              boxShadow: '0 6px 20px rgba(255, 107, 157, 0.35)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* ============ REGION SELECTOR — InteractiveSelector pattern ============
            8 horizontal panels (one per region). Inactive panels show a deep
            blue gradient with the region name rotated 90°; click/hover to
            expand and the panel beige-up to reveal the full sticker grid for
            that region (internal scroll handles the longer regions). Mobile
            falls back to a vertical accordion of the same content. */}
      <section
        id="region-tabs"
        className="px-4 md:px-8 pt-10 md:pt-12 pb-12 md:pb-16 scroll-mt-4"
        style={{ backgroundColor: COLORS.cream }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center text-xs tracking-[0.3em] font-semibold mb-6"
            style={{ color: COLORS.surfaceTeal }}
          >
            CHOOSE YOUR REGION
          </p>

          {/* Desktop — horizontal expandable panels */}
          <div className="hidden md:flex w-full h-[600px] lg:h-[640px] items-stretch gap-1 rounded-2xl overflow-hidden shadow-sm">
            {REGIONS.map((region, idx) => {
              const isActive = activeTab === region;
              const stickers = STICKERS[region] || [];
              const num = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={region}
                  onClick={() => setActiveTab(region)}
                  onMouseEnter={() => setActiveTab(region)}
                  className="region-panel relative flex flex-col cursor-pointer overflow-hidden"
                  style={{
                    flex: isActive ? '7 1 0%' : '1 1 0%',
                    minWidth: '78px',
                    background: isActive
                      ? COLORS.bone
                      : REGION_GRADIENTS[region] ||
                        `linear-gradient(160deg, ${COLORS.surfaceTeal} 0%, ${COLORS.midDepth} 50%, ${COLORS.deepWater} 100%)`,
                    transition:
                      'flex-grow 700ms cubic-bezier(0.4,0,0.2,1), background 600ms ease',
                  }}
                >
                  {/* Number — top-left, switches colour with state */}
                  <div
                    className="absolute top-4 left-4 z-20 font-light text-2xl tracking-wider"
                    style={{
                      color: isActive ? COLORS.deepWater : 'white',
                      transition: 'color 400ms ease',
                      textShadow: isActive ? 'none' : '0 2px 8px rgba(0,0,0,0.4)',
                    }}
                  >
                    {num}
                  </div>

                  {/* Rotated region name — collapsed only */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: 'opacity 500ms ease',
                    }}
                  >
                    <span
                      className="font-bold uppercase tracking-[0.3em] text-base text-white whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.45)',
                      }}
                    >
                      {region}
                    </span>
                  </div>


                  {/* Active region — sticker grid */}
                  <div
                    className="absolute inset-0 flex flex-col px-6 lg:px-8 pt-14 pb-5 z-20"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 500ms ease 220ms',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="flex items-end justify-between mb-4 flex-shrink-0">
                      <h3
                        className="text-2xl lg:text-3xl font-bold leading-tight"
                        style={{ color: COLORS.deepWater }}
                      >
                        {region}
                      </h3>
                      <span className="text-xs tracking-wider font-medium" style={{ color: COLORS.midDepth }}>
                        {stickers.length} stickers
                      </span>
                    </div>
                    <div className="relative flex-1 min-h-0">
                    <div
                      className="sticker-grid grid grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto pr-1 h-full content-start auto-rows-min items-start"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${COLORS.surfaceTeal}80 transparent`,
                      }}
                    >
                      {stickers.map((sticker) => {
                        const inCart = isInCart(sticker.id);
                        const quantity = getItemQuantity(sticker.id);
                        const outOfStock = isStickerOutOfStock(sticker);
                        return (
                          <div
                            key={sticker.id}
                            className="bg-white rounded-xl border overflow-hidden flex flex-col relative"
                            style={{
                              borderColor: inCart ? COLORS.surfaceTeal : '#E6EEF2',
                              boxShadow: inCart
                                ? `0 4px 14px ${COLORS.surfaceTeal}25`
                                : `0 1px 6px ${COLORS.deepWater}08`,
                              opacity: outOfStock ? 0.65 : 1,
                            }}
                          >
                            {outOfStock && (
                              <span
                                className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider z-10"
                                style={{ backgroundColor: COLORS.midDepth, color: 'white' }}
                              >
                                Out
                              </span>
                            )}
                            {quantity > 0 && !outOfStock && (
                              <span
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10"
                                style={{
                                  backgroundColor: COLORS.surfaceTeal,
                                  color: 'white',
                                  boxShadow: `0 2px 6px ${COLORS.surfaceTeal}50`,
                                }}
                              >
                                {quantity}
                              </span>
                            )}
                            <button
                              type="button"
                              className="aspect-square overflow-hidden cursor-pointer"
                              style={{ backgroundColor: COLORS.cream }}
                              onClick={() => handleOpenPreview(sticker)}
                              aria-label={`Preview ${sticker.name} sticker`}
                            >
                              {sticker.image ? (
                                <img
                                  src={sticker.image}
                                  alt={sticker.name}
                                  className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 p-2 text-center">
                                  {sticker.name}
                                </div>
                              )}
                            </button>
                            <div className="p-2.5 flex flex-col flex-1">
                              <h4 className="text-xs font-semibold leading-tight truncate" style={{ color: COLORS.deepWater }}>
                                {sticker.name}
                              </h4>
                              <div className="mt-2 flex items-center justify-between gap-1">
                                <span className="text-[11px] font-bold" style={{ color: COLORS.deepWater }}>
                                  {formatPrice(pricePerItem)}
                                </span>
                                {outOfStock ? (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenPreview(sticker)}
                                    className="text-[9px] font-semibold tracking-wider uppercase px-2 py-1 rounded"
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: COLORS.midDepth,
                                      border: `1px solid ${COLORS.midDepth}40`,
                                    }}
                                  >
                                    Notify
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={(e) => handleAddToCart(sticker, e)}
                                    className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded transition-colors"
                                    style={{
                                      backgroundColor: inCart ? COLORS.surfaceTeal : COLORS.deepWater,
                                      color: 'white',
                                    }}
                                  >
                                    {inCart ? '+' : 'Add'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Scroll-down indicator — clickable, scrolls the grid by
                        roughly one row each press. Shown when the region has
                        more stickers than typically fit without scrolling. */}
                    {stickers.length > 9 && (
                      <>
                        <div
                          className="absolute bottom-0 left-0 right-1 h-12 pointer-events-none"
                          style={{
                            background: `linear-gradient(to top, ${COLORS.bone} 25%, transparent)`,
                          }}
                        />
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            const grid = e.currentTarget
                              .closest('.region-panel')
                              ?.querySelector('.sticker-grid');
                            if (grid) grid.scrollBy({ top: 220, behavior: 'smooth' });
                          }}
                          aria-label="Scroll for more stickers"
                          animate={{ y: [0, 4, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: COLORS.deepWater,
                            color: 'white',
                            boxShadow: `0 4px 14px ${COLORS.deepWater}50`,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </motion.button>
                      </>
                    )}
                    </div>
                    {/* /scroll wrapper */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile — vertical accordion */}
          <div className="md:hidden flex flex-col gap-2 rounded-2xl overflow-hidden">
            {REGIONS.map((region, idx) => {
              const isActive = activeTab === region;
              const stickers = STICKERS[region] || [];
              const num = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={region}
                  className="overflow-hidden rounded-xl"
                  style={{
                    background: isActive
                      ? COLORS.bone
                      : REGION_GRADIENTS[region] ||
                        `linear-gradient(160deg, ${COLORS.surfaceTeal} 0%, ${COLORS.midDepth} 50%, ${COLORS.deepWater} 100%)`,
                    transition: 'background 400ms ease',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab(isActive ? null : region)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-light text-base"
                        style={{ color: isActive ? COLORS.deepWater : 'white' }}
                      >
                        {num}
                      </span>
                      <span
                        className="font-bold uppercase tracking-wider text-sm"
                        style={{ color: isActive ? COLORS.deepWater : 'white' }}
                      >
                        {region}
                      </span>
                    </div>
                    <span
                      className="text-xs tracking-wider"
                      style={{ color: isActive ? COLORS.midDepth : 'white' }}
                    >
                      {stickers.length}
                    </span>
                  </button>
                  {isActive && (
                    <div
                      className="px-4 pb-4 grid grid-cols-3 gap-2 max-h-[420px] overflow-y-auto"
                      style={{ scrollbarWidth: 'thin' }}
                    >
                      {stickers.map((sticker) => {
                        const inCart = isInCart(sticker.id);
                        const outOfStock = isStickerOutOfStock(sticker);
                        const quantity = getItemQuantity(sticker.id);
                        return (
                          <div
                            key={sticker.id}
                            className="bg-white rounded-lg border overflow-hidden flex flex-col relative"
                            style={{
                              borderColor: inCart ? COLORS.surfaceTeal : '#E6EEF2',
                              opacity: outOfStock ? 0.65 : 1,
                            }}
                          >
                            {quantity > 0 && !outOfStock && (
                              <span
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold z-10"
                                style={{ backgroundColor: COLORS.surfaceTeal, color: 'white' }}
                              >
                                {quantity}
                              </span>
                            )}
                            <button
                              type="button"
                              className="aspect-square overflow-hidden cursor-pointer"
                              style={{ backgroundColor: COLORS.cream }}
                              onClick={() => handleOpenPreview(sticker)}
                            >
                              {sticker.image && (
                                <img src={sticker.image} alt={sticker.name} className="w-full h-full object-contain p-1.5" />
                              )}
                            </button>
                            <div className="p-1.5">
                              <p className="text-[10px] font-semibold truncate" style={{ color: COLORS.deepWater }}>
                                {sticker.name}
                              </p>
                              <div className="mt-1 flex items-center justify-between gap-1">
                                <span className="text-[9px] font-bold" style={{ color: COLORS.deepWater }}>
                                  {formatPrice(pricePerItem)}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => handleAddToCart(sticker, e)}
                                  disabled={outOfStock}
                                  className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: inCart ? COLORS.surfaceTeal : COLORS.deepWater,
                                    color: 'white',
                                    opacity: outOfStock ? 0.4 : 1,
                                  }}
                                >
                                  {outOfStock ? '—' : inCart ? '+' : 'Add'}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ BUNDLE PACKS + SURFACE TANK + SUGGEST A LOCATION ============
            Top row: bundle packs (left) and Surface Tank cross-promo (right) in
            a 2-col grid. Suggestion form pushed below the row, centred. Mobile
            stacks the row. */}
      <section className="px-4 md:px-8 py-14 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start mb-12 md:mb-14">
          {/* LEFT — bundle packs */}
          <div>
            <p
              className="text-xs tracking-[0.3em] font-semibold mb-2"
              style={{ color: COLORS.surfaceTeal }}
            >
              REGIONAL PACKS
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: COLORS.deepWater }}
            >
              <WhisperText text="Save with curated packs." wordDelay={0.14} duration={1.0} />
            </h2>
            <p className="text-gray-600 text-base mb-6 max-w-md">
              Hand-picked bundles for the regions divers visit most. Each pack is a
              ready-made set at a deeper discount than buying individually.
            </p>

            <div className="space-y-3">
              {LOCATION_BUNDLES.map((bundle) => (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl border p-4"
                  style={{ borderColor: '#E6EEF2' }}
                >
                  <div className="flex items-center gap-4">
                    {/* Sticker count badge */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                      style={{ backgroundColor: `${COLORS.highlight}33` }}
                    >
                      <span className="text-xl font-bold leading-none" style={{ color: COLORS.deepWater }}>
                        {bundle.stickerCount}
                      </span>
                      <span className="text-[9px] tracking-wider uppercase" style={{ color: COLORS.midDepth }}>
                        Stickers
                      </span>
                    </div>

                    {/* Bundle info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold leading-tight truncate" style={{ color: COLORS.deepWater }}>
                        {bundle.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-snug line-clamp-1 mt-0.5">
                        {bundle.description}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(bundle.originalPrice)}
                        </span>
                        <span className="text-sm font-bold" style={{ color: COLORS.deepWater }}>
                          {formatPrice(bundle.price)}
                        </span>
                        <span className="text-[10px] font-semibold" style={{ color: COLORS.surfaceTeal }}>
                          Save {formatPrice(bundle.savings)}
                        </span>
                      </div>
                    </div>

                    {/* Add button */}
                    <button
                      type="button"
                      onClick={() => handleAddBundle(bundle)}
                      className="flex-shrink-0 text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2.5 rounded-lg transition-colors hover:opacity-90"
                      style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                    >
                      Add Pack
                    </button>
                  </div>

                  {/* What's inside trigger — opens the bundle preview modal */}
                  <button
                    type="button"
                    onClick={() => setPreviewBundle(bundle)}
                    className="mt-3 text-[11px] font-semibold tracking-wider uppercase hover:underline inline-flex items-center gap-1"
                    style={{ color: COLORS.surfaceTeal }}
                  >
                    See what&rsquo;s inside →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Surface Tank cross-promo */}
          <div>
            <p
              className="text-xs tracking-[0.3em] font-semibold mb-2"
              style={{ color: COLORS.surfaceTeal }}
            >
              STICK YOUR STORY
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: COLORS.deepWater }}
            >
              <WhisperText text="Pair with The Surface Tank." wordDelay={0.14} duration={1.0} />
            </h2>
            <p className="text-gray-600 text-base mb-6 max-w-md">
              Our premium 40oz vacuum-sealed bottle — a blank canvas with mask-shaped slots
              for up to 20 stickers. Build your dive map on the bottle that goes everywhere.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border overflow-hidden flex"
              style={{ borderColor: '#E6EEF2' }}
            >
              <Link
                href="/products/surface-tank"
                className="block w-32 sm:w-36 flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: COLORS.cream }}
                aria-label="View The Surface Tank"
              >
                <div className="aspect-square">
                  <img
                    src="/images/products/The-surface-tank-sunset.jpg"
                    alt="The Surface Tank"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex-1 min-w-0 p-4 flex flex-col">
                <p
                  className="text-[10px] tracking-[0.2em] font-bold uppercase mb-0.5"
                  style={{ color: COLORS.surfaceTeal }}
                >
                  Memories That Stick
                </p>
                <h3 className="text-base font-semibold leading-tight mb-1" style={{ color: COLORS.deepWater }}>
                  The Surface Tank
                </h3>
                <p className="text-xs text-gray-500 leading-snug mb-3">
                  40oz · Pro Stainless · Diver&rsquo;s passport
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold" style={{ color: COLORS.deepWater }}>
                    {formatPrice(40)}
                  </span>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleAddSurfaceTank}
                    className="text-[11px] font-bold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors hover:opacity-90"
                    style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                  >
                    Add to Cart
                  </button>
                  <Link
                    href="/products/surface-tank"
                    className="block text-center text-[11px] font-bold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors border hover:bg-gray-50"
                    style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal }}
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          </div>
          {/* /grid */}

          {/* BELOW — suggest a location, centred under both columns */}
          <div
            className="max-w-2xl mx-auto text-center pt-10 md:pt-12 border-t"
            style={{ borderColor: `${COLORS.surfaceTeal}30` }}
          >
            <p
              className="text-xs tracking-[0.3em] font-semibold mb-2"
              style={{ color: COLORS.surfaceTeal }}
            >
              DON&rsquo;T SEE YOUR DIVE?
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: COLORS.deepWater }}
            >
              <WhisperText text="Suggest a location." wordDelay={0.16} duration={1.0} />
            </h2>
            <p className="text-gray-600 text-base mb-6 max-w-lg mx-auto">
              New stickers are added regularly. Tell us where you&rsquo;ve been diving and we&rsquo;ll add it to the queue.
            </p>

            <form
              onSubmit={handleSuggestionSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="text"
                value={locationSuggestion}
                onChange={(e) => setLocationSuggestion(e.target.value)}
                placeholder="e.g. Cocos Island, Costa Rica"
                required
                disabled={suggestionSubmitting || suggestionSubmitted}
                className="flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                style={{
                  borderColor: '#E6EEF2',
                  color: COLORS.deepWater,
                  backgroundColor: 'white',
                }}
              />
              <button
                type="submit"
                disabled={suggestionSubmitting || suggestionSubmitted}
                className="px-6 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all disabled:opacity-50"
                style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
              >
                {suggestionSubmitted
                  ? '✓ Sent'
                  : suggestionSubmitting
                  ? 'Sending…'
                  : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ CUSTOMERS ALSO LOVE ============ */}
      <section className="bg-white px-4 md:px-8 py-14 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              CUSTOMERS ALSO LOVE
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {RELATED_PRODUCTS.map((rp, i) => (
              <motion.div
                key={rp.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden border transition-shadow hover:shadow-md flex flex-col"
                style={{ borderColor: '#E6EEF2' }}
              >
                <Link href={rp.href} className="block overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-base leading-tight mb-1" style={{ color: COLORS.deepWater }}>
                    {rp.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
                    {rp.priceLabel}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href={rp.href}
                      className="block text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors"
                      style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                    >
                      View Product
                    </Link>
                    {rp.quickAdd ? (
                      <button
                        type="button"
                        onClick={() => {
                          addToCart({
                            id: rp.quickAdd.shopifyVariantId,
                            shopifyVariantId: rp.quickAdd.shopifyVariantId,
                            name: rp.quickAdd.name,
                            price: rp.quickAdd.price,
                            image: rp.image,
                            type: 'product',
                          });
                          if (openCart) openCart();
                        }}
                        className="block w-full text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors border hover:bg-gray-50"
                        style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, backgroundColor: 'white' }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <Link
                        href={rp.href}
                        className="block text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors border hover:bg-gray-50"
                        style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, backgroundColor: 'white' }}
                      >
                        Choose Options
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed variant="light" />
      <Footer />

      {/* ============ BUNDLE PREVIEW MODAL ============ */}
      <AnimatePresence>
        {previewBundle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPreviewBundle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(2, 56, 89, 0.45)', backdropFilter: 'blur(6px)' }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                type="button"
                onClick={() => setPreviewBundle(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ color: COLORS.deepWater }}
                aria-label="Close bundle preview"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="p-6 md:p-8">
                <p className="text-xs tracking-[0.25em] font-semibold mb-2" style={{ color: COLORS.surfaceTeal }}>
                  REGIONAL PACK · {previewBundle.stickerCount} STICKERS
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight" style={{ color: COLORS.deepWater }}>
                  {previewBundle.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-md">
                  {previewBundle.description}
                </p>

                {/* Price summary */}
                <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(previewBundle.originalPrice)}
                  </span>
                  <span className="text-2xl font-bold" style={{ color: COLORS.deepWater }}>
                    {formatPrice(previewBundle.price)}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${COLORS.highlight}40`, color: COLORS.deepWater }}
                  >
                    Save {formatPrice(previewBundle.savings)}
                  </span>
                </div>

                {/* Included stickers grid */}
                <p className="text-xs tracking-[0.25em] font-semibold mb-3" style={{ color: COLORS.surfaceTeal }}>
                  WHAT&rsquo;S INSIDE
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-6">
                  {previewBundle.stickerIds.map((sid) => {
                    const sticker = allStickers.find((s) => s.id === sid);
                    if (!sticker) return null;
                    return (
                      <div
                        key={sid}
                        className="bg-white rounded-lg border overflow-hidden"
                        style={{ borderColor: '#E6EEF2' }}
                      >
                        <div
                          className="aspect-square overflow-hidden flex items-center justify-center"
                          style={{ backgroundColor: COLORS.cream }}
                        >
                          {sticker.image ? (
                            <img
                              src={sticker.image}
                              alt={sticker.name}
                              className="w-full h-full object-contain p-1.5"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-400 text-center px-1">{sticker.name}</span>
                          )}
                        </div>
                        <p
                          className="text-[10px] font-semibold leading-tight truncate text-center px-1.5 py-1.5"
                          style={{ color: COLORS.deepWater }}
                        >
                          {sticker.name}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleAddBundle(previewBundle);
                    setPreviewBundle(null);
                  }}
                  className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-colors"
                  style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                >
                  Add {previewBundle.name} — {formatPrice(previewBundle.price)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ STICKER PREVIEW MODAL ============ */}
      <AnimatePresence>
        {selectedSticker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClosePreview}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(2, 56, 89, 0.45)', backdropFilter: 'blur(6px)' }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close */}
              <button
                type="button"
                onClick={handleClosePreview}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ color: COLORS.deepWater }}
                aria-label="Close preview"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                {/* Image side */}
                <div
                  className="rounded-xl overflow-hidden aspect-square flex items-center justify-center relative"
                  style={{ backgroundColor: COLORS.cream }}
                >
                  {/* Prev / next */}
                  <button
                    type="button"
                    onClick={() => handleNavigateSticker('prev')}
                    aria-label="Previous sticker"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigateSticker('next')}
                    aria-label="Next sticker"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>

                  {selectedSticker.image && (
                    <img
                      src={selectedSticker.image}
                      alt={selectedSticker.name}
                      className="w-full h-full object-contain p-6"
                    />
                  )}
                </div>

                {/* Detail side */}
                <div className="flex flex-col">
                  <p className="text-xs tracking-[0.25em] font-semibold mb-2" style={{ color: COLORS.surfaceTeal }}>
                    {selectedSticker.region} · {selectedSticker.country}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{ color: COLORS.deepWater }}>
                    {selectedSticker.name}
                  </h3>
                  {selectedSticker.story?.headline && (
                    <p className="text-sm font-semibold mb-2" style={{ color: COLORS.midDepth }}>
                      {selectedSticker.story.headline}
                    </p>
                  )}
                  {selectedSticker.story?.content && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-[10]">
                      {selectedSticker.story.content}
                    </p>
                  )}

                  <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold" style={{ color: COLORS.deepWater }}>
                        {formatPrice(pricePerItem)}
                      </span>
                      {!selectedStock.loading &&
                        selectedStock.quantity !== null &&
                        selectedStock.quantity > 0 &&
                        selectedStock.quantity <= 3 && (
                          <StockBadge quantity={selectedStock.quantity} />
                        )}
                    </div>

                    {selectedStock.loading ? (
                      <button
                        disabled
                        className="w-full py-3 rounded-xl text-sm font-semibold opacity-60 border-2"
                        style={{ borderColor: COLORS.midDepth, color: COLORS.midDepth }}
                      >
                        Checking stock…
                      </button>
                    ) : !selectedStock.available || selectedStock.quantity === 0 ? (
                      <NotifyMeButton
                        productName={selectedSticker.name}
                        variantId={selectedSticker.shopifyVariantId}
                        variant="light"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          handleAddToCart(selectedSticker, e);
                          if (openCart) openCart();
                        }}
                        className="w-full py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-colors"
                        style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                      >
                        {isInCart(selectedSticker.id) ? '+ Add Another' : 'Add to Pack'}
                      </button>
                    )}

                    {selectedSticker.slug && (
                      <Link
                        href={`/stickers/${selectedSticker.slug}`}
                        className="block text-center text-xs tracking-wider uppercase mt-3 hover:underline"
                        style={{ color: COLORS.surfaceTeal }}
                      >
                        Full sticker details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
