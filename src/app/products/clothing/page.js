'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CLOTHING, CLOTHING_QUALITY_STATEMENT } from '@/data/clothing';
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

const SLUG = 'clothing';

const RELATED_PRODUCTS = [
  {
    name: 'Fun Stickers',
    href: '/products/fun-stickers',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare-MarketingImage.jpg?v=1746535285&width=823',
    priceLabel: '£3.50',
    quickAdd: null,
  },
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
    name: 'Crochet Creatures',
    href: '/products/crochet-creatures',
    image: '/images/products/Purple-nudis-product-shot.png',
    priceLabel: 'From £17.50',
    quickAdd: null,
  },
];

// Combined gallery for an item: shared shots + the selected colour's mockup first
function galleryFor(item, variant) {
  return [variant.image, ...item.images];
}

// =============== Colour swatches ===============

function ColourSwatches({ item, selectedId, onSelect, size = 'sm' }) {
  const dim = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {item.variants.map((v) => {
        const isActive = v.id === selectedId;
        return (
          <button
            key={v.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(v.id);
            }}
            title={v.name}
            aria-label={`Colour: ${v.name}`}
            className={`${dim} rounded-full transition-transform ${isActive ? 'scale-110' : 'hover:scale-105'}`}
            style={{
              backgroundColor: v.color,
              border: '1px solid rgba(0,0,0,0.15)',
              boxShadow: isActive ? `0 0 0 2px white, 0 0 0 4px ${COLORS.pink}` : 'none',
            }}
          />
        );
      })}
    </div>
  );
}

// =============== Clothing card ===============

function ClothingCard({ item, formatPrice, onPreview, index, selectedVariantId, onSelectVariant }) {
  const { addToCart, openCart } = useCart();
  const variant = item.variants.find((v) => v.id === selectedVariantId) || item.variants[0];
  // Until the shopper picks a colour, lead with the hero photography (the
  // product's first Shopify image) — livelier than the flat colour mockups.
  const cardImage = selectedVariantId ? variant.image : item.images[0];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: variant.shopifyVariantId,
      shopifyVariantId: variant.shopifyVariantId,
      name: `${item.title} — ${variant.name}`,
      price: item.price,
      image: variant.image,
      type: 'product',
    });
    if (openCart) openCart();
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
      {/* Image — hero shot by default, swaps to the mockup once a colour is picked */}
      <div className="aspect-square overflow-hidden relative" style={{ backgroundColor: COLORS.cream }}>
        <img
          src={cardImage}
          alt={selectedVariantId ? `${item.title} in ${variant.name}` : item.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3 className="text-sm md:text-base font-semibold leading-tight mb-1" style={{ color: COLORS.deepWater }}>
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 italic mb-2">{item.subtitle}</p>
        <p className="text-base font-bold mb-3" style={{ color: COLORS.deepWater }}>
          {formatPrice(item.price)}
        </p>

        <div className="mb-4">
          <ColourSwatches item={item} selectedId={variant.id} onSelect={(id) => onSelectVariant(item.id, id)} />
          <p className="text-[11px] text-gray-500 mt-1.5">{variant.name}</p>
        </div>

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

// =============== Clothing preview modal ===============

function ClothingModal({ item, isOpen, onClose, formatPrice, selectedVariantId, onSelectVariant }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [descOpen, setDescOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [stock, setStock] = useState({ loading: true, quantity: null, available: true });
  const { addToCart, openCart } = useCart();

  const variant = item ? item.variants.find((v) => v.id === selectedVariantId) || item.variants[0] : null;
  const gallery = item && variant ? galleryFor(item, variant) : [];

  // Reset the gallery when the item or colour changes
  useEffect(() => {
    setImageIndex(0);
  }, [item?.id, variant?.id]);

  // Live stock check for the selected colour
  useEffect(() => {
    if (!variant?.shopifyVariantId) return;
    setStock({ loading: true, quantity: null, available: true });
    const fetchStock = async () => {
      try {
        const r = await fetch(`/api/stock?ids=${variant.shopifyVariantId}&_t=${Date.now()}`, { cache: 'no-store' });
        const data = await r.json();
        if (data[variant.shopifyVariantId]) {
          setStock({
            loading: false,
            quantity: data[variant.shopifyVariantId].quantity,
            available: data[variant.shopifyVariantId].available && !data[variant.shopifyVariantId].outOfStock,
          });
        } else {
          setStock({ loading: false, quantity: null, available: true });
        }
      } catch {
        setStock({ loading: false, quantity: null, available: true });
      }
    };
    fetchStock();
  }, [variant?.shopifyVariantId]);

  if (!item || !variant) return null;

  const isOut = !stock.available || stock.quantity === 0;
  const isLow = stock.quantity !== null && stock.quantity > 0 && stock.quantity <= 3;

  const handleAdd = () => {
    addToCart({
      id: variant.shopifyVariantId,
      shopifyVariantId: variant.shopifyVariantId,
      name: `${item.title} — ${variant.name}`,
      price: item.price,
      image: variant.image,
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
              <img
                src={gallery[imageIndex]}
                alt={`${item.title} in ${variant.name}`}
                className="w-full h-full object-contain p-6"
              />
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setImageIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow"
                    aria-label="Previous"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageIndex((i) => (i + 1) % gallery.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow"
                    aria-label="Next"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImageIndex(i)}
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

            {/* Detail side */}
            <div className="p-6 md:p-8 flex flex-col">
              <p className="text-[11px] tracking-[0.25em] font-semibold mb-2" style={{ color: COLORS.pink }}>
                CLOTHING
              </p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-1" style={{ color: COLORS.deepWater }}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 italic mb-3">{item.subtitle}</p>
              <p className="text-2xl font-bold mb-4" style={{ color: COLORS.deepWater }}>
                {formatPrice(item.price)}
              </p>

              {/* Colour picker */}
              <div className="mb-5">
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: COLORS.deepWater }}>
                  Colour — {variant.name}
                </p>
                <ColourSwatches
                  item={item}
                  selectedId={variant.id}
                  onSelect={(id) => onSelectVariant(item.id, id)}
                  size="lg"
                />
              </div>

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
                        <p className="mb-3">{item.description}</p>
                        <p className="mb-3 text-gray-500">{item.funFact}</p>
                        <p className="text-gray-500 italic">{CLOTHING_QUALITY_STATEMENT}</p>
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
                        {item.productInfo.map((line, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: COLORS.surfaceTeal }}>•</span>
                            {line}
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
                    productName={`${item.title} — ${variant.name}`}
                    variantId={variant.shopifyVariantId}
                    variant="light"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-colors"
                    style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                  >
                    Add to Cart — {formatPrice(item.price)}
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

export default function ClothingPage() {
  const { formatPrice } = useCurrency();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { addToCart, openCart } = useCart();
  const [previewId, setPreviewId] = useState(null);
  // Selected colour per item, keyed by item id
  const [selectedVariants, setSelectedVariants] = useState({});

  const previewItem = previewId ? CLOTHING.find((c) => c.id === previewId) : null;

  const selectVariant = (itemId, variantId) =>
    setSelectedVariants((prev) => ({ ...prev, [itemId]: variantId }));

  useEffect(() => {
    addToRecentlyViewed({
      id: SLUG,
      name: 'Clothing',
      slug: SLUG,
      image: CLOTHING[0]?.images[0],
      price: 18.5,
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
            <WhisperText text="Wear the ocean." wordDelay={0.18} duration={1.2} />
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-2 max-w-2xl mx-auto">
            Embroidered beanies and caps for divers, sailors and ocean people — featuring the
            marine life we can&apos;t stop thinking about at the surface.
          </p>
          <p className="text-gray-500 text-xs italic mt-5 max-w-xl mx-auto">{CLOTHING_QUALITY_STATEMENT}</p>
        </div>
      </section>

      {/* ============ CLOTHING GRID ============ */}
      <section className="px-4 md:px-8 py-12 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              <WhisperText text="THE COLLECTION" wordDelay={0.18} duration={1.0} />
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {CLOTHING.map((item, i) => (
              <ClothingCard
                key={item.id}
                item={item}
                formatPrice={formatPrice}
                index={i}
                selectedVariantId={selectedVariants[item.id]}
                onSelectVariant={selectVariant}
                onPreview={() => setPreviewId(item.id)}
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

      <ClothingModal
        item={previewItem}
        isOpen={!!previewItem}
        onClose={() => setPreviewId(null)}
        formatPrice={formatPrice}
        selectedVariantId={previewItem ? selectedVariants[previewItem.id] || previewItem.variants[0].id : null}
        onSelectVariant={selectVariant}
      />
    </div>
  );
}
