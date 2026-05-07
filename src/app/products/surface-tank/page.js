'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { NotifyMeButton, StockBadge } from '@/components/NotifyMe';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import RecentlyViewed from '@/components/RecentlyViewed';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import FishyButton from '@/components/FishyButton';
import WhisperText from '@/components/WhisperText';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  bone: '#F5EFE6',
  cream: '#FAF7F1',
};

const SLUG = 'surface-tank';

const GALLERY_IMAGES = [
  {
    src: '/images/products/The-surface-tank-sunset.jpg',
    alt: 'Surface Tank at sunset on the dive boat',
    type: 'lifestyle',
  },
  {
    src: '/images/products/The-surface-tank-close-up.jpg',
    alt: 'Close-up of the Surface Tank body',
    type: 'lifestyle',
  },
  {
    src: '/images/products/The-surface-tank-close-up-nudi.jpg',
    alt: 'Surface Tank with a nudibranch sticker applied',
    type: 'lifestyle',
  },
];

// Related products. quickAdd === null means variant selection is required (sticker
// site / creature type) so the 'Add to Cart' button routes to the product page
// instead of dropping a guessed default into the cart.
const RELATED_PRODUCTS = [
  {
    name: 'The Dive Journal',
    href: '/products/dive-journal',
    image: '/images/products/The-dive-journal-product-shot.jpg',
    priceLabel: '£28',
    quickAdd: {
      shopifyVariantId: '49658874331402',
      name: 'The Dive Journal',
      price: 28.0,
    },
  },
  {
    name: 'Log Pages',
    href: '/products/logbook-booster-pack',
    image: '/images/products/The-log-pages-in-binder.jpg',
    priceLabel: 'From £12',
    quickAdd: {
      shopifyVariantId: '49872531325194',
      name: 'Log Pages (Booster Pack)',
      price: 12.0,
    },
  },
  {
    name: 'Location Stickers',
    href: '/stickers',
    image: '/images/products/Location-stickers-close-up.jpg',
    priceLabel: 'From £1.75',
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

const STICKER_FAN_IMAGES = [
  { name: 'Palau', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Palau-sticker.png?v=1769313149&width=713' },
  { name: 'Anilao', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Anilao-sticker.png?v=1769261005&width=990' },
  { name: 'Mozambique', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Mozambique-sticker_b223b0b5-c086-4760-ae9d-a7de55cf2a25.png?v=1769312415&width=713' },
  { name: 'Banda Sea', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/BandaSea-sticker.png?v=1769229387&width=990' },
  { name: 'Dauin 01', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dauin1-sticker.png?v=1769310438&width=713' },
];

function HeroBadge({ children, color = COLORS.surfaceTeal }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {children}
    </span>
  );
}

function FeatureCard({ iconSrc, title, subtitle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-5 md:p-6 border transition-shadow hover:shadow-md flex flex-col items-center text-center"
      style={{ borderColor: '#E6EEF2' }}
    >
      <div
        className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${COLORS.highlight}33` }}
      >
        <img src={iconSrc} alt="" className="w-10 h-10 object-contain" />
      </div>
      <h3 className="text-base font-semibold mb-0.5 leading-tight" style={{ color: COLORS.deepWater }}>
        {title}
      </h3>
      <p className="text-xs text-gray-500 leading-snug">{subtitle}</p>
    </motion.div>
  );
}

// Compact gift-set card to slot into the hero right column.
function GiftSetMini({ formatPrice, currentVariant, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl p-4 grid grid-cols-[1fr_auto] gap-3 items-center"
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepWater} 0%, ${COLORS.midDepth} 100%)`,
        boxShadow: `0 6px 20px ${COLORS.midDepth}30`,
      }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="text-[9px] tracking-[0.2em] font-bold uppercase px-2 py-0.5 rounded-full"
            style={{ backgroundColor: COLORS.highlight, color: COLORS.abyss }}
          >
            Gift Set
          </span>
          <span className="text-[10px] font-medium" style={{ color: COLORS.highlight }}>
            Save {formatPrice(10.05)}
          </span>
        </div>
        <h4 className="text-sm font-bold text-white mb-0.5 leading-tight">
          The Diver&rsquo;s Gift Set
        </h4>
        <p className="text-white/70 text-[11px] mb-1.5 leading-tight">
          Surface Tank + Dive Journal
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-white/40 text-[10px] line-through">{formatPrice(68)}</span>
          <span className="text-base font-bold" style={{ color: COLORS.highlight }}>
            {formatPrice(57.95)}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        disabled={!currentVariant.inStock}
        className="px-4 py-2.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase transition-all whitespace-nowrap"
        style={{
          backgroundColor: currentVariant.inStock ? COLORS.highlight : 'rgba(255,255,255,0.2)',
          color: currentVariant.inStock ? COLORS.abyss : 'white',
          cursor: currentVariant.inStock ? 'pointer' : 'not-allowed',
          opacity: currentVariant.inStock ? 1 : 0.6,
        }}
      >
        Add Set
      </button>
    </motion.div>
  );
}

// Lamp-style spotlight section. Tweaks vs the previous version:
// - Smoother easing + longer duration on the cone/light-bar reveal
// - Three-stop conic gradients (color → transparent → transparent) for a softer falloff
// - Wide vertical seam-hider blob to soften where the two cones meet
// - Light bar is 60rem (≈ +50% on each side of the previous 30rem)
function LampSpotlight({ children }) {
  const ease = [0.22, 1, 0.36, 1];
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden pt-44 md:pt-56 pb-2 md:pb-4 px-6"
      style={{ backgroundColor: COLORS.abyss }}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mb-4">
        {/* Left cone — widened to spread light closer to the light bar's full reach */}
        <motion.div
          initial={{ opacity: 0.35, width: '15rem' }}
          whileInView={{ opacity: 1, width: '50rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${COLORS.surfaceTeal}, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[50rem] text-white"
        >
          <div
            className="absolute w-[100%] left-0 h-40 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to top, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
            }}
          />
          <div
            className="absolute w-40 h-[100%] left-0 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to right, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, white, transparent)',
            }}
          />
        </motion.div>
        {/* Right cone — widened to match */}
        <motion.div
          initial={{ opacity: 0.35, width: '15rem' }}
          whileInView={{ opacity: 1, width: '50rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${COLORS.surfaceTeal})`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[50rem] text-white"
        >
          <div
            className="absolute w-40 h-[100%] right-0 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to left, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to left, white, transparent)',
            }}
          />
          <div
            className="absolute w-[100%] right-0 h-40 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to top, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
            }}
          />
        </motion.div>

        {/* Soft vertical seam-hider — covers the line where the two cones meet */}
        <div
          className="absolute inset-auto z-25 h-56 w-40 -translate-y-2 rounded-full blur-3xl"
          style={{ backgroundColor: COLORS.abyss, opacity: 0.7 }}
        />

        {/* Bottom blur band to hide cone bases */}
        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
          style={{ backgroundColor: COLORS.abyss }}
        />
        {/* Soft glow halo */}
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: COLORS.surfaceTeal }}
        />
        {/* Bright center bulb */}
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: COLORS.highlight }}
        />
        {/* Light bar — extended 50% each side: 30rem → 60rem */}
        <motion.div
          initial={{ width: '20rem' }}
          whileInView={{ width: '60rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          className="absolute inset-auto z-50 h-0.5 w-[60rem] -translate-y-[7rem]"
          style={{ backgroundColor: COLORS.highlight }}
        />
        {/* Top mask */}
        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ backgroundColor: COLORS.abyss }}
        />
      </div>

      <div className="relative z-50 flex -translate-y-20 md:-translate-y-28 flex-col items-center px-5 max-w-3xl">
        {children}
      </div>
    </section>
  );
}

function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-1"
      >
        <h3 className="text-base md:text-lg font-medium" style={{ color: COLORS.deepWater }}>
          {title}
        </h3>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.midDepth}
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="pb-5 px-1 text-gray-600 text-sm leading-relaxed">{children}</div>
      </motion.div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-4 flex items-center justify-between text-left gap-3"
      >
        <h4 className="font-medium text-sm md:text-base" style={{ color: COLORS.deepWater }}>
          {question}
        </h4>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="flex-shrink-0 text-xl font-light leading-none"
          style={{ color: COLORS.surfaceTeal }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ maxHeight: isOpen ? 1500 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p className="pb-4 text-gray-600 text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function SurfaceTankPage() {
  const product = getProductBySlug(SLUG);
  const { addToCart, openDrawer } = useCart();
  const { formatPrice } = useCurrency();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [stock, setStock] = useState({ loading: true, quantity: null, available: true });

  const currentVariant = product?.variants?.[selectedVariant];

  const galleryImages = product
    ? [{ src: currentVariant.image, alt: `${product.name} — ${currentVariant.name}`, type: 'product' }, ...GALLERY_IMAGES]
    : [];
  const activeImage = galleryImages[selectedImageIndex] || galleryImages[0];

  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        slug: SLUG,
        image: currentVariant?.image,
        price: product.price,
        type: 'product',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant]);

  useEffect(() => {
    if (!currentVariant?.shopifyVariantId) return;
    const fetchStock = async () => {
      try {
        const response = await fetch(
          `/api/stock?ids=${currentVariant.shopifyVariantId}&_t=${Date.now()}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        if (data[currentVariant.shopifyVariantId]) {
          setStock({
            loading: false,
            quantity: data[currentVariant.shopifyVariantId].quantity,
            available:
              data[currentVariant.shopifyVariantId].available &&
              !data[currentVariant.shopifyVariantId].outOfStock,
          });
        } else {
          setStock({ loading: false, quantity: null, available: true });
        }
      } catch {
        setStock({ loading: false, quantity: null, available: true });
      }
    };
    setStock({ loading: true, quantity: null, available: true });
    fetchStock();
  }, [currentVariant?.shopifyVariantId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4" style={{ color: COLORS.deepWater }}>
            Product not found
          </h1>
          <Link href="/products" className="text-sm hover:underline" style={{ color: COLORS.surfaceTeal }}>
            ← Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = !stock.available || stock.quantity === 0;
  const isLowStock = stock.quantity !== null && stock.quantity > 0 && stock.quantity <= 3;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({
      id: `${product.id}-${currentVariant.id}`,
      name: `${product.name} - ${currentVariant.name}`,
      price: product.price,
      shopifyVariantId: currentVariant.shopifyVariantId,
      image: currentVariant.image,
      type: 'product',
    });
    openDrawer();
  };

  const handleAddGiftSet = () => {
    if (!currentVariant.inStock) return;
    const giftSetVariantId = currentVariant.id === 'blue' ? '52493497565450' : '52493497598218';
    addToCart({
      id: giftSetVariantId,
      shopifyVariantId: giftSetVariantId,
      name: `Diver's Gift Set (${currentVariant.name})`,
      price: 57.95,
      image: currentVariant.image,
      type: 'product',
    });
    openDrawer();
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: COLORS.cream }}
    >
      <Header variant="light" currentPath={`/products/${SLUG}`} />

      {/* ============ HERO ============ */}
      <section className="bg-white px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-14">
          {/* Image gallery — flex column with the gallery at a FIXED aspect ratio (so it doesn't stretch like before) and thumbnails pushed to the bottom of the column to line up with the gift-set card on the right. */}
          <div className="flex flex-col h-full pt-3 md:pt-5">
            <motion.div
              key={activeImage.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[5/4] w-full rounded-2xl overflow-hidden border shrink-0"
              style={{ borderColor: '#E6EEF2', backgroundColor: COLORS.cream }}
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full h-full"
                style={{
                  objectFit: activeImage.type === 'product' ? 'contain' : 'cover',
                  padding: activeImage.type === 'product' ? '8%' : 0,
                }}
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-2 mt-auto pt-3 shrink-0">
              {galleryImages.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setSelectedImageIndex(i)}
                  className="aspect-square rounded-xl overflow-hidden border-2 transition-all"
                  style={{
                    borderColor: i === selectedImageIndex ? COLORS.surfaceTeal : '#E6EEF2',
                    backgroundColor: COLORS.cream,
                    opacity: i === selectedImageIndex ? 1 : 0.7,
                  }}
                  aria-label={`View ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full"
                    style={{
                      objectFit: img.type === 'product' ? 'contain' : 'cover',
                      padding: img.type === 'product' ? '15%' : 0,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="flex flex-col h-full pt-3 md:pt-5">
            <p
              className="text-sm tracking-[0.28em] font-medium mb-4"
              style={{ color: COLORS.surfaceTeal }}
            >
              {product.tagline}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4"
              style={{ color: COLORS.deepWater }}
            >
              <WhisperText text={product.name} wordDelay={0.18} duration={1.2} />
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
              {product.description.intro}
            </p>

            {/* Quick feature pills */}
            <div className="flex flex-wrap gap-2 mb-7">
              <HeroBadge>40oz / 1.2L</HeroBadge>
              <HeroBadge color={COLORS.midDepth}>18hr Cold</HeroBadge>
              <HeroBadge color={COLORS.midDepth}>12hr Hot</HeroBadge>
              <HeroBadge color={COLORS.surfaceTeal}>Pro Stainless</HeroBadge>
            </div>

            {/* Variant selector */}
            <div className="mb-5">
              <label className="block text-xs tracking-wider font-medium mb-2 uppercase" style={{ color: COLORS.midDepth }}>
                Colour
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, i) => {
                  const isSelected = i === selectedVariant;
                  const disabled = !variant.inStock;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => !disabled && setSelectedVariant(i)}
                      disabled={disabled}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all"
                      style={{
                        borderColor: isSelected ? COLORS.surfaceTeal : '#E6EEF2',
                        backgroundColor: isSelected ? `${COLORS.highlight}25` : 'white',
                        color: COLORS.deepWater,
                        opacity: disabled ? 0.5 : 1,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: variant.color, borderColor: '#0002' }}
                      />
                      {variant.name}
                      {disabled && <span className="text-[10px] uppercase tracking-wider text-gray-500">Out</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price + stock */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xl md:text-2xl font-bold" style={{ color: COLORS.deepWater }}>
                {formatPrice(product.price)}
              </span>
              {!stock.loading && isLowStock && <StockBadge quantity={stock.quantity} />}
              {!stock.loading && isOutOfStock && (
                <span className="text-red-500 text-sm font-medium">Out of Stock</span>
              )}
            </div>

            {/* CTA */}
            <div className="mb-6">
              {stock.loading ? (
                <button
                  disabled
                  className="px-8 py-3.5 rounded-xl text-sm font-semibold opacity-60 border-2"
                  style={{ borderColor: COLORS.midDepth, color: COLORS.midDepth, backgroundColor: 'white' }}
                >
                  Checking stock…
                </button>
              ) : isOutOfStock ? (
                <NotifyMeButton
                  productName={`${product.name} - ${currentVariant.name}`}
                  variantId={currentVariant.shopifyVariantId}
                  variant="light"
                />
              ) : (
                <FishyButton onClick={handleAddToCart} variant="1">
                  ADD TO CART
                </FishyButton>
              )}
            </div>

            <TrustBadges variant="light" size="sm" />

            {/* Compact gift set — pushed to bottom of column to align with the thumbnail row on the left */}
            <div className="mt-auto pt-6">
              <GiftSetMini
                formatPrice={formatPrice}
                currentVariant={currentVariant}
                onAdd={handleAddGiftSet}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURE GRID — tight banner, single label heading ============ */}
      <section className="px-4 md:px-8 py-8 md:py-10" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              DESIGNED FOR DIVERS
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {product.features.map((feature, i) => (
              <FeatureCard
                key={i}
                iconSrc={feature.icon}
                title={feature.title}
                subtitle={feature.subtitle}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMBINED LAMP STORY + STICKER FAN — staged reveal ============ */}
      <LampSpotlight>
        {/* Phase 1 — label + heading reveal alongside the light bar */}
        <p
          className="text-base md:text-lg tracking-[0.3em] font-semibold mb-4"
          style={{ color: COLORS.highlight }}
        >
          MORE THAN A WATER BOTTLE
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">
          <WhisperText text={product.story.headline} wordDelay={0.18} duration={1.4} />
        </h2>

        {/* Phase 2 — paragraph fades in over the last words of the headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
        >
          {product.story.intro}
        </motion.p>

        {/* Phase 3 — sticker fan, 25% bigger, fades in staggered after paragraph */}
        <div className="relative h-32 flex items-center justify-center mb-6">
          <div className="flex -space-x-3">
            {STICKER_FAN_IMAGES.map((sticker, i) => (
              <motion.img
                key={i}
                src={sticker.image}
                alt={sticker.name}
                className="w-[6.25rem] h-[6.25rem] object-contain drop-shadow-2xl"
                style={{
                  zIndex: i === 2 ? 10 : 5 - Math.abs(i - 2),
                  transform: `rotate(${(i - 2) * 8}deg) scale(${i === 2 ? 1.15 : 0.9})`,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 2.0 + i * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.2, zIndex: 15, rotate: 0 }}
              />
            ))}
          </div>
        </div>

        {/* Phase 4 — supporting line + CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 2.7, ease: 'easeOut' }}
          className="text-white/60 text-sm tracking-[0.25em] uppercase mb-5"
        >
          Over 80 dive sites · One bottle
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <FishyButton href="/stickers" variant="1">
            EXPLORE STICKERS
          </FishyButton>
        </motion.div>
      </LampSpotlight>

      {/* ============ LIFESTYLE + 3-STEP JOURNEY ============ */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <img
              src="/images/products/The-surface-tank-close-up-nudi.jpg"
              alt="Surface Tank with a nudibranch sticker — your underwater passport"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            <p className="text-xs tracking-[0.3em] font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
              YOUR DIVE PASSPORT
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: COLORS.deepWater }}>
              <WhisperText text="Build your dive story." wordDelay={0.18} duration={1.2} />
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
              {product.story.description}
            </p>
            <div className="space-y-6">
              {product.story.steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 font-light text-lg"
                    style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-1">
                    <h4 className="font-semibold text-base mb-0.5" style={{ color: COLORS.deepWater }}>
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA — drives back to add-to-cart, with a fallback if out of stock */}
            <div className="mt-10">
              {isOutOfStock ? (
                <NotifyMeButton
                  productName={`${product.name} - ${currentVariant.name}`}
                  variantId={currentVariant.shopifyVariantId}
                  variant="light"
                />
              ) : (
                <FishyButton onClick={handleAddToCart} variant="1">
                  ADD TO CART
                </FishyButton>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DETAILS / SPECS — heading removed, sits between journey and FAQ ============ */}
      <section className="px-4 md:px-8 py-12 md:py-14" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border" style={{ borderColor: '#E6EEF2' }}>
            <div className="px-5 md:px-6">
              <CollapsibleSection title="Product Info." defaultOpen={true}>
                <ul className="space-y-1.5 mb-4">
                  {product.specs.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: COLORS.surfaceTeal }}>•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <p className="font-medium mb-1" style={{ color: COLORS.deepWater }}>
                  Dimensions: {product.specs.dimensions}
                </p>
              </CollapsibleSection>
              <CollapsibleSection title="Shipping Info.">
                <ul className="space-y-1.5">
                  {product.shipping.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: COLORS.surfaceTeal }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
              <CollapsibleSection title="Returns & Refunds">
                <ul className="space-y-1.5">
                  {product.returns.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: COLORS.surfaceTeal }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
              <CollapsibleSection title="EU GPSR Compliance">
                <p>{product.compliance.content}</p>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CUSTOMERS ALSO LOVE — 4 related product cards ============ */}
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
                          openDrawer();
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

      {/* ============ FAQ ============ */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] font-medium mb-2" style={{ color: COLORS.surfaceTeal }}>
              GOT QUESTIONS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.deepWater }}>
              <WhisperText text="Frequently Asked Questions." wordDelay={0.15} duration={1.1} />
            </h2>
          </div>
          <div className="bg-white rounded-2xl border px-5 md:px-6" style={{ borderColor: '#E6EEF2' }}>
            {product.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed excludeId={product.id} variant="light" />
      <Footer />

      {product.faqs && product.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: product.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
