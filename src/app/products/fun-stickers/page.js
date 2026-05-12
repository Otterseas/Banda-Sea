'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FUN_STICKERS, QUALITY_STATEMENT } from '@/data/funStickers';
import { NotifyMeButton, StockBadge } from '@/components/NotifyMe';
import RecentlyViewed from '@/components/RecentlyViewed';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import WhisperText from '@/components/WhisperText';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  pink: '#FF6B9D',
  cream: '#FAF7F1',
};

const SLUG = 'fun-stickers';

const RELATED_PRODUCTS = [
  {
    name: 'The Surface Tank',
    href: '/products/surface-tank',
    image: '/images/products/The-surface-tank-sunset.jpg',
    priceLabel: '£35',
    originalPriceLabel: '£40',
    quickAdd: {
      shopifyVariantId: '52453682807050',
      name: 'The Surface Tank - Deep Ocean',
      price: 35.0,
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
    name: 'Location Stickers',
    href: '/stickers',
    image: '/images/products/Location-stickers-close-up.jpg',
    priceLabel: 'From £1.00',
    quickAdd: null,
  },
  {
    name: 'Crochet Creatures',
    href: '/products/crochet-creatures',
    image: '/images/products/Purple-nudis-product-shot.png',
    priceLabel: 'From £17.50',
    quickAdd: null,
  },
];

// =============== Sticker card ===============

function StickerCard({ sticker, formatPrice, onPreview, index }) {
  const { addToCart, openCart } = useCart();
  const [imageIndex, setImageIndex] = useState(0);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: sticker.shopifyVariantId,
      shopifyVariantId: sticker.shopifyVariantId,
      name: sticker.title,
      price: sticker.price,
      image: sticker.images[0],
      type: 'product',
    });
    if (openCart) openCart();
  };

  const next = (e) => {
    e.stopPropagation();
    setImageIndex((i) => (i + 1) % sticker.images.length);
  };
  const prev = (e) => {
    e.stopPropagation();
    setImageIndex((i) => (i - 1 + sticker.images.length) % sticker.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onPreview}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col border transition-shadow hover:shadow-md"
      style={{ borderColor: '#E6EEF2' }}
    >
      {/* Image with carousel */}
      <div className="aspect-square overflow-hidden relative group" style={{ backgroundColor: COLORS.cream }}>
        <img
          src={sticker.images[imageIndex]}
          alt={sticker.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        {sticker.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 shadow"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 shadow"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {sticker.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(i);
                  }}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: i === imageIndex ? COLORS.pink : 'rgba(255,255,255,0.85)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold leading-tight mb-1.5 line-clamp-2" style={{ color: COLORS.deepWater }}>
          {sticker.title}
        </h3>
        <p className="text-base font-bold mb-3" style={{ color: COLORS.deepWater }}>
          {formatPrice(sticker.price)}
        </p>
        <div className="mt-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="text-[11px] font-bold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors"
            style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={onPreview}
            className="text-[11px] font-bold tracking-[0.15em] uppercase py-2.5 rounded-lg border hover:bg-gray-50 transition-colors"
            style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, backgroundColor: 'white' }}
          >
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// =============== Sticker preview modal ===============

function StickerModal({ sticker, isOpen, onClose, formatPrice }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [descOpen, setDescOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [stock, setStock] = useState({ loading: true, quantity: null, available: true });
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    if (!sticker?.shopifyVariantId) return;
    setImageIndex(0);
    setStock({ loading: true, quantity: null, available: true });
    const fetchStock = async () => {
      try {
        const r = await fetch(`/api/stock?ids=${sticker.shopifyVariantId}&_t=${Date.now()}`, { cache: 'no-store' });
        const data = await r.json();
        if (data[sticker.shopifyVariantId]) {
          setStock({
            loading: false,
            quantity: data[sticker.shopifyVariantId].quantity,
            available: data[sticker.shopifyVariantId].available && !data[sticker.shopifyVariantId].outOfStock,
          });
        } else {
          setStock({ loading: false, quantity: null, available: true });
        }
      } catch {
        setStock({ loading: false, quantity: null, available: true });
      }
    };
    fetchStock();
  }, [sticker?.shopifyVariantId]);

  if (!sticker) return null;

  const isOut = !stock.available || stock.quantity === 0;
  const isLow = stock.quantity !== null && stock.quantity > 0 && stock.quantity <= 3;

  const handleAdd = () => {
    addToCart({
      id: sticker.shopifyVariantId,
      shopifyVariantId: sticker.shopifyVariantId,
      name: sticker.title,
      price: sticker.price,
      image: sticker.images[0],
      type: 'product',
    });
    if (openCart) openCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(2, 56, 89, 0.45)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative grid md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100"
              style={{ color: COLORS.deepWater }}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image side */}
            <div className="aspect-square md:aspect-auto md:min-h-[480px] relative" style={{ backgroundColor: COLORS.cream }}>
              <img src={sticker.images[imageIndex]} alt={sticker.title} className="w-full h-full object-contain p-6" />
              {sticker.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setImageIndex((i) => (i - 1 + sticker.images.length) % sticker.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow"
                    aria-label="Previous"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageIndex((i) => (i + 1) % sticker.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow"
                    aria-label="Next"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Detail side */}
            <div className="p-6 md:p-8 flex flex-col">
              <p className="text-[11px] tracking-[0.25em] font-semibold mb-2" style={{ color: COLORS.pink }}>
                FUN STICKER
              </p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3" style={{ color: COLORS.deepWater }}>
                {sticker.title}
              </h3>
              <p className="text-2xl font-bold mb-5" style={{ color: COLORS.deepWater }}>
                {formatPrice(sticker.price)}
              </p>

              {/* Description collapsible */}
              <div className="border-t" style={{ borderColor: '#E6EEF2' }}>
                <button
                  type="button"
                  onClick={() => setDescOpen(!descOpen)}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="text-sm font-semibold" style={{ color: COLORS.deepWater }}>
                    Description
                  </span>
                  <motion.svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={COLORS.surfaceTeal}
                    strokeWidth="2"
                    animate={{ rotate: descOpen ? 180 : 0 }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {descOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 text-sm text-gray-600 leading-relaxed">
                        <p className="mb-3">{sticker.description}</p>
                        <p className="text-gray-500 italic">{QUALITY_STATEMENT}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Product info collapsible */}
              <div className="border-t" style={{ borderColor: '#E6EEF2' }}>
                <button
                  type="button"
                  onClick={() => setInfoOpen(!infoOpen)}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="text-sm font-semibold" style={{ color: COLORS.deepWater }}>
                    Product Info
                  </span>
                  <motion.svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={COLORS.surfaceTeal}
                    strokeWidth="2"
                    animate={{ rotate: infoOpen ? 180 : 0 }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {infoOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-3 text-sm text-gray-600 leading-relaxed space-y-1.5">
                        {sticker.productInfo.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: COLORS.surfaceTeal }}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stock + CTA */}
              <div className="mt-6">
                {!stock.loading && isLow && (
                  <div className="mb-3">
                    <StockBadge quantity={stock.quantity} />
                  </div>
                )}
                {stock.loading ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl text-sm font-semibold opacity-60 border-2"
                    style={{ borderColor: COLORS.midDepth, color: COLORS.midDepth }}
                  >
                    Checking stock…
                  </button>
                ) : isOut ? (
                  <NotifyMeButton
                    productName={sticker.title}
                    variantId={sticker.shopifyVariantId}
                    variant="light"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-colors"
                    style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                  >
                    Add to Cart — {formatPrice(sticker.price)}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============== Main page ===============

export default function FunStickersPage() {
  const { formatPrice } = useCurrency();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { addToCart, openCart } = useCart();
  const [previewId, setPreviewId] = useState(null);

  const previewSticker = previewId ? FUN_STICKERS.find((s) => s.id === previewId) : null;

  useEffect(() => {
    addToRecentlyViewed({
      id: SLUG,
      name: 'Fun Stickers',
      slug: SLUG,
      image: FUN_STICKERS[0]?.images[0],
      price: 3.5,
      type: 'product',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSideCart = () => {
    if (openCart) openCart();
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: COLORS.cream }}
    >
      <Header variant="light" currentPath={`/products/${SLUG}`} />

      {/* ============ HERO ============ */}
      <section className="bg-white px-4 md:px-8 pt-20 md:pt-24 pb-12 md:pb-14">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-5"
            style={{
              background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, ${COLORS.pink} 50%, ${COLORS.deepWater} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <WhisperText text="Just for fun." wordDelay={0.18} duration={1.2} />
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-2 max-w-2xl mx-auto">
            Lighthearted vinyl stickers for divers who like to laugh at the surface. Slap them on
            your tank, your kit bag, your laptop — anywhere that needs a little dive humour.
          </p>
          <p className="text-gray-500 text-xs italic mt-5 max-w-xl mx-auto">{QUALITY_STATEMENT}</p>
        </div>
      </section>

      {/* ============ STICKER GRID ============ */}
      <section className="px-4 md:px-8 py-12 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              <WhisperText text="THE COLLECTION" wordDelay={0.18} duration={1.0} />
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {FUN_STICKERS.map((sticker, i) => (
              <StickerCard
                key={sticker.id}
                sticker={sticker}
                formatPrice={formatPrice}
                index={i}
                onPreview={() => setPreviewId(sticker.id)}
              />
            ))}
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
                          openSideCart();
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

      <RecentlyViewed excludeId={SLUG} variant="light" />
      <Footer />

      <StickerModal
        sticker={previewSticker}
        isOpen={!!previewSticker}
        onClose={() => setPreviewId(null)}
        formatPrice={formatPrice}
      />
    </div>
  );
}
