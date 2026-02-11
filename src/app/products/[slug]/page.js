'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NotifyMeButton, StockBadge } from '@/components/NotifyMe';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Luna Color Palette
const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Sticker images for the fan display
const STICKER_FAN_IMAGES = [
  {
    name: 'Palau',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Palau-sticker.png?v=1769313149&width=713'
  },
  {
    name: 'Anilao',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Anilao-sticker.png?v=1769261005&width=990'
  },
  {
    name: 'Mozambique',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Mozambique-sticker_b223b0b5-c086-4760-ae9d-a7de55cf2a25.png?v=1769312415&width=713'
  },
  {
    name: 'Banda Sea',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/BandaSea-sticker.png?v=1769229387&width=990'
  },
  {
    name: 'Dauin 01',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dauin1-sticker.png?v=1769310438&width=713'
  }
];

// Feature Icon Component using SVG files from /public/icons/
function FeatureIcon({ type, title, subtitle, isFirst = false }) {
  const iconMap = {
    vacuum: '/icons/Vacuum_Insulation.svg',
    capacity: '/icons/Water_Capacity.svg',
    steel: '/icons/Stainless_Steel.svg',
    bpa: '/icons/BPA_Free.svg',
    condensation: '/icons/No_Condensation.svg',
  };
  
  const iconSrc = iconMap[type] || iconMap.vacuum;
  
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`${isFirst ? 'w-16 h-16' : 'w-12 h-12'} mb-1 flex items-center justify-center`}>
        <img 
          src={iconSrc} 
          alt={title}
          className={`${isFirst ? 'w-14 h-14' : 'w-10 h-10'} object-contain`}
        />
      </div>
      <p className="text-white text-[10px] font-medium leading-tight">{title}</p>
      <p className="text-white/60 text-[10px]">{subtitle}</p>
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 
          className="text-lg md:text-xl font-light"
          style={{ color: COLORS.deepWater, fontFamily: 'Montserrat, sans-serif' }}
        >
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-gray-600 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating Cart Button Component
function FloatingCartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <motion.button
      onClick={openDrawer}
      className="fixed bottom-6 left-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, ${COLORS.midDepth} 100%)`,
        boxShadow: `0 4px 20px ${COLORS.midDepth}80`,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M6 6h15l-1.5 9h-12z" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M6 6L5 3H2" />
      </svg>
      {totalItems > 0 && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
          style={{ backgroundColor: COLORS.highlight, color: COLORS.abyss }}
        >
          {totalItems}
        </span>
      )}
    </motion.button>
  );
}

export default function ProductPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug);
  const { addToCart, openDrawer } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [stock, setStock] = useState({ loading: true, quantity: null, available: true });

  const currentVariant = product?.variants?.[selectedVariant];

  // Fetch stock when variant changes
  useEffect(() => {
    if (!currentVariant?.shopifyVariantId) return;
    
    const fetchStock = async () => {
      try {
        const response = await fetch(`/api/stock?ids=${currentVariant.shopifyVariantId}`);
        const data = await response.json();
        if (data[currentVariant.shopifyVariantId]) {
          setStock({
            loading: false,
            quantity: data[currentVariant.shopifyVariantId].quantity,
            available: data[currentVariant.shopifyVariantId].available && !data[currentVariant.shopifyVariantId].outOfStock,
          });
        } else {
          setStock({ loading: false, quantity: null, available: true });
        }
      } catch (error) {
        setStock({ loading: false, quantity: null, available: true });
      }
    };
    
    setStock({ loading: true, quantity: null, available: true });
    fetchStock();
  }, [currentVariant?.shopifyVariantId]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: COLORS.abyss }}>
        <div className="text-center">
          <h1 className="text-2xl font-light text-white mb-4">Product not found</h1>
          <Link href="/stickers" className="text-white/60 hover:text-white hover:underline">
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
      type: 'product'
    });
    openDrawer();
  };

  // Feature icon types mapped to product features
  const featureTypes = ['vacuum', 'capacity', 'steel', 'bpa', 'condensation'];

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Background that extends full height behind header */}
      <div
        className="fixed top-0 left-0 w-full md:w-[60%] h-full -z-10"
        style={{
          background: `linear-gradient(160deg, ${COLORS.midDepth} 0%, ${COLORS.deepWater} 40%, ${COLORS.abyss} 100%)`
        }}
      />

      {/* Shared Header */}
      <Header variant="dark" currentPath={`/products/${params.slug}`} />

      {/* Main Content - Split Layout */}
      <div className="flex flex-col md:flex-row pt-16">
        {/* ==================== LEFT PANEL - FIXED (60%) ==================== */}
        <div
          className="w-full md:w-[60%] md:h-[calc(100vh-64px)] md:sticky md:top-16 flex flex-col relative overflow-hidden"
        >
          {/* Main Content */}
          <div className="flex-1 flex flex-col px-6 py-6 relative overflow-y-auto">
          {/* Title */}
          <div className="mb-3">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1"
              style={{
                background: `linear-gradient(135deg, ${COLORS.highlight} 0%, #FF6B9D 50%, ${COLORS.highlight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {product.name}
            </h1>
            <p 
              className="text-xs tracking-[0.2em] font-medium"
              style={{ color: COLORS.highlight }}
            >
              {product.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="max-w-sm mb-4">
            <p className="text-white/80 text-xs leading-relaxed mb-2">
              {product.description.intro}
            </p>
            <p className="text-white/80 text-xs leading-relaxed">
              {product.description.stickers}
            </p>
          </div>

          {/* Product Image & Features Row */}
          <div className="flex-1 flex items-center justify-center gap-4 min-h-0">
            {/* Single Large Product Image - Shifted Right & Smaller */}
            <div className="flex-1 flex items-center justify-end pr-8">
              <div className="w-full max-w-[160px] md:max-w-[180px]">
                <img 
                  src={product.variants[0].image}
                  alt={product.name}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{
                    filter: `drop-shadow(0 0 30px ${COLORS.highlight}30)`
                  }}
                />
              </div>
            </div>

            {/* Feature Icons - Right side */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              {product.features.map((feature, index) => (
                <FeatureIcon
                  key={index}
                  type={featureTypes[index]}
                  title={feature.title}
                  subtitle={feature.subtitle}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Variant Selector, Price & Add to Cart */}
          <div className="flex-shrink-0 mt-4 pt-4 border-t border-white/10">
            {/* Colour Dropdown Selector */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/60 text-xs">Colour:</span>
              <div className="relative">
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(Number(e.target.value))}
                  className="appearance-none px-4 py-2 pr-8 rounded-lg text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${COLORS.highlight}50`,
                    color: 'white',
                  }}
                >
                  {product.variants.map((variant, index) => (
                    <option 
                      key={variant.id} 
                      value={index}
                      disabled={!variant.inStock}
                      style={{ color: '#023859', backgroundColor: 'white' }}
                    >
                      {variant.name} {!variant.inStock ? '(Out of Stock)' : ''}
                    </option>
                  ))}
                </select>
                <svg 
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" 
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
              {/* Colour swatch preview */}
              <div 
                className="w-6 h-6 rounded-full border-2"
                style={{ 
                  backgroundColor: currentVariant.color,
                  borderColor: COLORS.highlight 
                }}
              />
              {/* Stock Badge */}
              {!stock.loading && isLowStock && (
                <StockBadge quantity={stock.quantity} />
              )}
              {!stock.loading && isOutOfStock && (
                <span className="text-red-400 text-xs font-medium">Out of Stock</span>
              )}
            </div>

            {/* Price */}
            <p 
              className="text-2xl font-bold mb-3"
              style={{ color: COLORS.highlight }}
            >
              {formatPrice(product.price)}
            </p>

            {/* Add to Cart / Notify Me Button */}
            {stock.loading ? (
              <button
                disabled
                className="px-6 py-3 rounded-xl text-sm font-semibold opacity-50"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${COLORS.highlight}40`,
                  color: 'white',
                }}
              >
                Checking...
              </button>
            ) : isOutOfStock ? (
              <NotifyMeButton 
                productName={`${product.name} - ${currentVariant.name}`}
                variantId={currentVariant.shopifyVariantId}
                variant="dark"
              />
            ) : (
              <motion.button
                onClick={handleAddToCart}
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${COLORS.highlight}`,
                  color: 'white',
                  boxShadow: `0 0 20px ${COLORS.highlight}30`
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${COLORS.highlight}50` }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
            )}

            {/* Gift Set Upsell - Compact */}
            <div 
              className="mt-4 p-3 rounded-xl max-w-[240px]"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${COLORS.highlight}30`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: COLORS.surfaceTeal, color: 'white' }}>
                  GIFT SET
                </span>
                <span className="text-green-400 text-[10px] font-medium">Save {formatPrice(10.05)}</span>
              </div>
              <p className="text-white text-xs font-medium mb-0.5">Diver's Gift Set</p>
              <p className="text-white/60 text-[10px] mb-2">Surface Tank + Dive Journal</p>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-white/40 text-[10px] line-through mr-1">{formatPrice(68)}</span>
                  <span className="text-sm font-bold" style={{ color: COLORS.highlight }}>{formatPrice(57.95)}</span>
                </div>
                <motion.button
                  onClick={() => {
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
                  }}
                  disabled={!currentVariant.inStock}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
                  style={{
                    background: currentVariant.inStock ? COLORS.surfaceTeal : 'rgba(255,255,255,0.1)',
                    color: 'white',
                    cursor: currentVariant.inStock ? 'pointer' : 'not-allowed',
                    opacity: currentVariant.inStock ? 1 : 0.5,
                  }}
                  whileHover={currentVariant.inStock ? { scale: 1.05 } : {}}
                  whileTap={currentVariant.inStock ? { scale: 0.95 } : {}}
                >
                  Add Gift Set
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT PANEL - SCROLLABLE (40%) ==================== */}
      <div className="w-full md:w-[40%] min-h-screen bg-white flex flex-col relative">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-10">
          {/* Story Section */}
          <section className="mb-10">
            <h2 
              className="text-xl md:text-2xl font-light mb-3"
              style={{ color: COLORS.deepWater, fontFamily: 'Montserrat, sans-serif' }}
            >
              {product.story.headline}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.story.intro}
            </p>

            {/* 3-Step Journey with Circles */}
            <div className="space-y-5">
              {product.story.steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                    style={{ 
                      borderColor: COLORS.midDepth,
                      color: COLORS.midDepth
                    }}
                  >
                    <span className="text-lg font-light">{step.number}</span>
                  </div>
                  <div className="pt-1">
                    <h4 
                      className="font-semibold text-base"
                      style={{ color: COLORS.deepWater }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sticker Fan Visual */}
          <section className="mb-10">
            <div className="relative h-24 flex items-center justify-center mb-3">
              {/* Sticker fan - overlapping sticker images (no circle frames) */}
              <div className="flex -space-x-2">
                {STICKER_FAN_IMAGES.map((sticker, i) => (
                  <motion.img
                    key={i}
                    src={sticker.image}
                    alt={sticker.name}
                    className="w-16 h-16 object-contain drop-shadow-lg"
                    style={{
                      zIndex: i === 2 ? 10 : 5 - Math.abs(i - 2),
                      transform: `rotate(${(i - 2) * 8}deg) scale(${i === 2 ? 1.15 : 0.9})`
                    }}
                    whileHover={{ scale: 1.2, zIndex: 15, rotate: 0 }}
                  />
                ))}
              </div>
              {/* Arrow pointing down */}
              <div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                style={{ color: '#FF6B9D' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h12z" />
                </svg>
              </div>
            </div>

            <Link
              href="/stickers"
              className="block text-center text-lg md:text-xl font-semibold transition-colors hover:opacity-80"
              style={{ color: COLORS.surfaceTeal }}
            >
              Explore The Collection
            </Link>
          </section>

          {/* Product Description */}
          <section className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.story.description}
            </p>
          </section>

          {/* Collapsible Sections */}
          <div className="border-t border-gray-200">
            {/* Product Info */}
            <CollapsibleSection title="Product Info." defaultOpen={true}>
              <ul className="space-y-1.5 mb-4">
                {product.specs.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: COLORS.surfaceTeal }}>•</span>
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="font-medium mb-4 text-sm" style={{ color: COLORS.deepWater }}>
                Water Bottle Dimensions: {product.specs.dimensions}
              </p>
              
              {/* Temperature Icons */}
              <div className="flex items-center justify-between gap-3 mt-4 p-3 bg-gray-50 rounded-xl">
                {/* Hot */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-sm">🔥</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">{product.specs.hotRetention}</p>
                    <p className="text-xs font-medium" style={{ color: COLORS.deepWater }}>
                      {product.specs.hotTemp}
                    </p>
                  </div>
                </div>
                {/* Cold */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-500 text-sm">❄️</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">{product.specs.coldRetention}</p>
                    <p className="text-xs font-medium" style={{ color: COLORS.deepWater }}>
                      {product.specs.coldTemp}
                    </p>
                  </div>
                </div>
                {/* Silicone Base */}
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-0.5">
                    <span className="text-gray-600 text-sm">⚓</span>
                  </div>
                  <p className="text-[10px] text-gray-500">Silicone Base</p>
                  <p className="text-[10px]" style={{ color: COLORS.deepWater }}>Boat Friendly</p>
                </div>
              </div>
            </CollapsibleSection>

            {/* Shipping Info */}
            <CollapsibleSection title="Shipping Info.">
              <ul className="space-y-1.5">
                {product.shipping.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: COLORS.surfaceTeal }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* FAQs */}
            <CollapsibleSection title="FAQs">
              <div className="space-y-3">
                {product.faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="font-medium mb-1 text-sm" style={{ color: COLORS.deepWater }}>
                      {faq.question}
                    </p>
                    <p className="text-gray-500 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Return & Refunds */}
            <CollapsibleSection title="Return & Refunds">
              <ul className="space-y-1.5">
                {product.returns.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: COLORS.surfaceTeal }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* EU GPSR Compliance */}
            <CollapsibleSection title="EU GPSR Compliance">
              <p className="text-sm">{product.compliance.content}</p>
            </CollapsibleSection>
          </div>

          {/* Bottom Padding for scroll */}
          <div className="h-16" />
        </div>
      </div>
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
