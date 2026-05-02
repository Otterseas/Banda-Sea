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

// Local lifestyle photos that supplement the Shopify variant image.
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

const STICKER_FAN_IMAGES = [
  { name: 'Palau', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Palau-sticker.png?v=1769313149&width=713' },
  { name: 'Anilao', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Anilao-sticker.png?v=1769261005&width=990' },
  { name: 'Mozambique', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Mozambique-sticker_b223b0b5-c086-4760-ae9d-a7de55cf2a25.png?v=1769312415&width=713' },
  { name: 'Banda Sea', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/BandaSea-sticker.png?v=1769229387&width=990' },
  { name: 'Dauin 01', image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dauin1-sticker.png?v=1769310438&width=713' },
];

// Compact pill — used inside the hero next to the price for trust signals.
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

// Modified ProductCard pattern — feature card with SVG icon.
function FeatureCard({ iconSrc, title, subtitle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-5 md:p-6 border transition-shadow hover:shadow-md"
      style={{ borderColor: '#E6EEF2' }}
    >
      <div
        className="w-14 h-14 mb-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${COLORS.highlight}33` }}
      >
        <img src={iconSrc} alt="" className="w-9 h-9 object-contain" />
      </div>
      <h3 className="text-base font-semibold mb-0.5 leading-tight" style={{ color: COLORS.deepWater }}>
        {title}
      </h3>
      <p className="text-xs text-gray-500 leading-snug">{subtitle}</p>
    </motion.div>
  );
}

// Lamp-style spotlight section — adapted inline from the staging Lamp component
// so we don't pull a tailwind config extension or a cn helper into the project.
function LampSpotlight({ children }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden py-28 md:py-36 px-6"
      style={{ backgroundColor: COLORS.abyss }}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mb-4">
        {/* Left cone */}
        <motion.div
          initial={{ opacity: 0.3, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.4, ease: 'easeInOut' }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${COLORS.surfaceTeal}, transparent 30%)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white"
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
        {/* Right cone */}
        <motion.div
          initial={{ opacity: 0.3, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.4, ease: 'easeInOut' }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, ${COLORS.surfaceTeal} 70%)`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white"
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
        {/* Bottom blur band hides cone bases */}
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
          transition={{ delay: 0.3, duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: COLORS.highlight }}
        />
        {/* Light bar */}
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{ backgroundColor: COLORS.highlight }}
        />
        {/* Top mask */}
        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ backgroundColor: COLORS.abyss }}
        />
      </div>

      <div className="relative z-50 flex -translate-y-32 md:-translate-y-44 flex-col items-center px-5 max-w-3xl">
        {children}
      </div>
    </section>
  );
}

// Collapsible spec / shipping / returns block — content stays in the DOM for SEO.
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

  // Build the gallery: variant Shopify image first, then local lifestyle shots.
  const galleryImages = product
    ? [{ src: currentVariant.image, alt: `${product.name} — ${currentVariant.name}`, type: 'product' }, ...GALLERY_IMAGES]
    : [];
  const activeImage = galleryImages[selectedImageIndex] || galleryImages[0];

  // Track recently viewed
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

  // Reset to the variant image when the user picks a different colour.
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant]);

  // Live stock fetch from /api/stock for the current variant.
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
      <section className="bg-white px-4 md:px-8 pt-10 md:pt-14 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-14 items-start">
          {/* Image gallery */}
          <div>
            <motion.div
              key={activeImage.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square w-full rounded-2xl overflow-hidden border"
              style={{ borderColor: '#E6EEF2', backgroundColor: COLORS.cream }}
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full h-full object-cover"
                style={{
                  objectFit: activeImage.type === 'product' ? 'contain' : 'cover',
                  padding: activeImage.type === 'product' ? '12%' : 0,
                }}
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-2 mt-3">
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

          {/* Product info / buy box */}
          <div className="flex flex-col">
            <p
              className="text-xs tracking-[0.25em] font-medium mb-3"
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
              <span className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.deepWater }}>
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

            {/* Trust badges */}
            <TrustBadges variant="light" size="sm" />
          </div>
        </div>
      </section>

      {/* ============ LAMP SPOTLIGHT — STORY ============ */}
      <LampSpotlight>
        <p
          className="text-xs tracking-[0.3em] font-medium mb-3"
          style={{ color: COLORS.highlight }}
        >
          MORE THAN A WATER BOTTLE
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">
          <WhisperText text={product.story.headline} wordDelay={0.18} duration={1.4} />
        </h2>
        <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          {product.story.intro}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <FishyButton href="/stickers" variant="1">
            BROWSE STICKERS
          </FishyButton>
        </div>
      </LampSpotlight>

      {/* ============ FEATURE GRID ============ */}
      <section className="px-4 md:px-8 py-16 md:py-20" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs tracking-[0.3em] font-medium mb-2" style={{ color: COLORS.surfaceTeal }}>
              BUILT FOR DIVERS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.deepWater }}>
              <WhisperText text="Every detail engineered." wordDelay={0.15} duration={1.1} />
            </h2>
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

      {/* ============ LIFESTYLE + 3-STEP JOURNEY ============ */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Lifestyle photo */}
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

          {/* 3-step journey */}
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
          </div>
        </div>
      </section>

      {/* ============ STICKER FAN UPSELL ============ */}
      <section className="px-4 md:px-8 py-14 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
            COLLECT YOUR ADVENTURES
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: COLORS.deepWater }}>
            Over 80 dive sites. One bottle.
          </h3>
          <div className="relative h-28 flex items-center justify-center mb-7">
            <div className="flex -space-x-3">
              {STICKER_FAN_IMAGES.map((sticker, i) => (
                <motion.img
                  key={i}
                  src={sticker.image}
                  alt={sticker.name}
                  className="w-20 h-20 object-contain drop-shadow-lg"
                  style={{
                    zIndex: i === 2 ? 10 : 5 - Math.abs(i - 2),
                    transform: `rotate(${(i - 2) * 8}deg) scale(${i === 2 ? 1.15 : 0.9})`,
                  }}
                  whileHover={{ scale: 1.2, zIndex: 15, rotate: 0 }}
                />
              ))}
            </div>
          </div>
          <FishyButton href="/stickers" variant="1">
            EXPLORE STICKERS
          </FishyButton>
        </div>
      </section>

      {/* ============ GIFT SET BUNDLE ============ */}
      <section className="px-4 md:px-8 py-12 md:py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-6 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center"
            style={{
              background: `linear-gradient(135deg, ${COLORS.deepWater} 0%, ${COLORS.midDepth} 100%)`,
              boxShadow: `0 10px 40px ${COLORS.midDepth}30`,
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] tracking-[0.2em] font-bold uppercase px-2 py-1 rounded-full"
                  style={{ backgroundColor: COLORS.highlight, color: COLORS.abyss }}
                >
                  Gift Set
                </span>
                <span className="text-xs font-medium" style={{ color: COLORS.highlight }}>
                  Save {formatPrice(10.05)}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1.5">
                The Diver&rsquo;s Gift Set
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-4">
                Surface Tank + Dive Journal — the complete pair for your next trip.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-white/40 text-sm line-through">{formatPrice(68)}</span>
                <span className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.highlight }}>
                  {formatPrice(57.95)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddGiftSet}
              disabled={!currentVariant.inStock}
              className="px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all"
              style={{
                backgroundColor: currentVariant.inStock ? COLORS.highlight : 'rgba(255,255,255,0.2)',
                color: currentVariant.inStock ? COLORS.abyss : 'white',
                cursor: currentVariant.inStock ? 'pointer' : 'not-allowed',
                opacity: currentVariant.inStock ? 1 : 0.6,
              }}
            >
              Add Gift Set
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============ DETAILS / SPECS ============ */}
      <section className="px-4 md:px-8 py-12 md:py-14" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: COLORS.deepWater }}>
            <WhisperText text="The fine print." wordDelay={0.18} duration={1.2} />
          </h2>
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

      {/* ============ FAQ (kept at the bottom) ============ */}
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

      {/* JSON-LD FAQPage structured data — preserved for SEO / answer engines */}
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
