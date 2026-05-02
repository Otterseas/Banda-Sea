'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { STICKERS, REGIONS, BASE_PRICE, getAllStickers } from '@/data/stickers';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

// =============== reusable bits ===============

// SVG metaball/goo filter — defined once, applied via filter: url(#goo-tabs).
// Matches the staging GooeyFilter component: stdDeviation 10 + the 19 / -9
// alpha-threshold colour matrix that creates the metaball merge.
function GooeyFilterSvg() {
  return (
    <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="goo-tabs">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

// =============== main component ===============

export default function StickersPage() {
  const [activeTab, setActiveTab] = useState(REGIONS[0]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedStock, setSelectedStock] = useState({ loading: false, quantity: null, available: true });
  const [gridStock, setGridStock] = useState({});
  const [animatingItems, setAnimatingItems] = useState(new Set());

  // Suggestion form
  const [locationSuggestion, setLocationSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [suggestionSubmitting, setSuggestionSubmitting] = useState(false);

  const stickerGridRef = useRef(null);
  const regionNavRef = useRef(null);

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
      <GooeyFilterSvg />

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
      </section>

      {/* ============ REGION TABS + STICKER PANEL ============
            Simple gooey tab nav above a clean white panel. All tabs share
            the same teal fill at FULL opacity so the goo filter doesn't
            clip them out (the alpha-threshold colour matrix would zero out
            anything below ~0.47 alpha). Active state is shown by a colour
            shift to the brand deepWater rather than by opacity, so adjacent
            inactive pills stay visible and merge into the goo ribbon. */}
      <section
        className="px-4 md:px-8 pt-10 md:pt-12 pb-12 md:pb-16"
        style={{ backgroundColor: COLORS.cream }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-xs tracking-[0.3em] font-semibold mb-5"
            style={{ color: COLORS.surfaceTeal }}
          >
            CHOOSE YOUR REGION
          </p>

          {/* Goo tabs */}
          <div className="relative mb-5" style={{ filter: 'url(#goo-tabs)' }}>
            <div
              ref={regionNavRef}
              className="flex flex-wrap justify-center"
            >
              {REGIONS.map((region) => {
                const isActive = activeTab === region;
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setActiveTab(region)}
                    className="rounded-full px-6 py-3.5 text-sm md:text-base font-bold transition-all whitespace-nowrap"
                    style={{
                      backgroundColor: isActive ? COLORS.deepWater : COLORS.surfaceTeal,
                      color: 'white',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      margin: '5px',
                      letterSpacing: '0.02em',
                      textShadow: isActive ? '0 2px 4px rgba(0,0,0,0.25)' : 'none',
                    }}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean white sticker panel — no coloured sleeve. */}
          <div className="bg-white rounded-2xl px-4 md:px-6 pt-5 pb-6 md:pb-7 shadow-sm">
            <div className="flex items-center justify-end mb-4">
              <div className="text-sm font-medium" style={{ color: COLORS.midDepth }}>
                {activeStickers.length} stickers in {activeTab}
              </div>
            </div>

          {/* Scrollable grid */}
          <div
            ref={stickerGridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 overflow-y-auto pr-1"
            style={{
              maxHeight: 'calc(2 * (260px + 20px))',
              scrollbarWidth: 'thin',
              scrollbarColor: `${COLORS.surfaceTeal}80 transparent`,
            }}
          >
            <AnimatePresence mode="popLayout">
              {activeStickers.map((sticker, i) => {
                const inCart = isInCart(sticker.id);
                const quantity = getItemQuantity(sticker.id);
                const outOfStock = isStickerOutOfStock(sticker);
                const animating = animatingItems.has(sticker.id);

                return (
                  <motion.div
                    key={sticker.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0, scale: animating ? 1.04 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border overflow-hidden flex flex-col relative"
                    style={{
                      borderColor: inCart ? COLORS.surfaceTeal : '#E6EEF2',
                      boxShadow: inCart
                        ? `0 8px 24px ${COLORS.surfaceTeal}25`
                        : `0 2px 10px ${COLORS.deepWater}08`,
                      opacity: outOfStock ? 0.65 : 1,
                    }}
                  >
                    {outOfStock && (
                      <span
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider z-10"
                        style={{ backgroundColor: COLORS.midDepth, color: 'white' }}
                      >
                        Out
                      </span>
                    )}
                    {quantity > 0 && !outOfStock && (
                      <span
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10"
                        style={{
                          backgroundColor: COLORS.surfaceTeal,
                          color: 'white',
                          boxShadow: `0 4px 12px ${COLORS.surfaceTeal}40`,
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
                          className="w-full h-full object-contain p-3 transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          {sticker.name}
                        </div>
                      )}
                    </button>

                    <div className="p-3 flex flex-col flex-1">
                      <h3
                        className="text-sm font-semibold leading-tight truncate"
                        style={{ color: COLORS.deepWater }}
                      >
                        {sticker.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{sticker.country}</p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="text-sm font-bold" style={{ color: COLORS.deepWater }}>
                          {formatPrice(pricePerItem)}
                        </span>
                        {outOfStock ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(sticker)}
                            className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1.5 rounded-md"
                            style={{
                              backgroundColor: 'transparent',
                              color: COLORS.midDepth,
                              border: `1px solid ${COLORS.midDepth}40`,
                            }}
                          >
                            Notify Me
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleAddToCart(sticker, e)}
                            className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1.5 rounded-md transition-colors"
                            style={{
                              backgroundColor: inCart ? COLORS.surfaceTeal : COLORS.deepWater,
                              color: 'white',
                            }}
                          >
                            {inCart ? '+ Add' : 'Add'}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          </div>
          {/* /white sticker panel */}
        </div>
      </section>

      {/* ============ SUGGEST A LOCATION ============ */}
      <section className="px-4 md:px-8 py-14 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] font-semibold mb-2" style={{ color: COLORS.surfaceTeal }}>
            DON&rsquo;T SEE YOUR DIVE?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: COLORS.deepWater }}>
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

      <Footer />

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
