'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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

// Feature icons data with external SVG paths
const FEATURE_ICONS = [
  { icon: '/icons/Vacuum_Insulation.svg', title: 'Double Wall', subtitle: 'Vacuum Sealed' },
  { icon: '/icons/Water_Capacity.svg', title: '40 oz / 1.2 L', subtitle: 'Capacity' },
  { icon: '/icons/Stainless_Steel.svg', title: 'Pro-Grade', subtitle: 'Stainless Steel' },
  { icon: '/icons/BPA_Free.svg', title: 'BPA Free', subtitle: 'Materials' },
  { icon: '/icons/No_Condensation.svg', title: 'No External', subtitle: 'Condensation' },
];

// Feature Icon Component
function FeatureIcon({ icon, title, subtitle }) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-14 h-14 mb-1 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={icon} 
            alt={title} 
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback icon if SVG doesn't load
          <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center">
            <span className="text-white/50 text-xs">?</span>
          </div>
        )}
      </div>
      <p className="text-white text-[11px] font-medium leading-tight">{title}</p>
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

// Floating Cart Button Component - NOW ON RIGHT SIDE
function FloatingCartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <motion.button
      onClick={openDrawer}
      className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
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
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: COLORS.abyss }}>
        <div className="text-center">
          <h1 className="text-2xl font-light text-white mb-4">Product not found</h1>
          <Link href="/" className="text-white/60 hover:text-white hover:underline">
            ← Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    if (!currentVariant.inStock) return;
    
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

  return (
    <div 
      className="min-h-screen w-full flex flex-col md:flex-row"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== LEFT PANEL - FIXED (60%) ==================== */}
      <div 
        className="w-full md:w-[60%] md:h-screen md:sticky md:top-0 flex flex-col relative"
        style={{
          background: `linear-gradient(160deg, ${COLORS.midDepth} 0%, ${COLORS.deepWater} 40%, ${COLORS.abyss} 100%)`
        }}
      >
        {/* Header */}
        <header className="flex-shrink-0 h-12 flex items-center px-6 relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Otterseas"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-lg font-normal tracking-tight text-white">
              Otterseas
            </span>
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-6 pb-4 overflow-hidden">
          
          {/* TITLE - Full Width, Large, Single Line */}
          <div className="mb-2">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap"
              style={{
                background: `linear-gradient(135deg, ${COLORS.highlight} 0%, #FF6B9D 50%, ${COLORS.highlight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Surface Tank
            </h1>
            <p 
              className="text-xs tracking-[0.25em] font-medium mt-1"
              style={{ color: COLORS.highlight }}
            >
              MEMORIES THAT STICK
            </p>
          </div>

          {/* Content Grid - 3 Columns */}
          <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
            
            {/* Left Column - Text & CTA */}
            <div className="col-span-4 flex flex-col justify-between py-1">
              {/* First Description */}
              <div>
                <p className="text-white/80 text-xs leading-relaxed italic">
                  {product.description.intro}
                </p>
              </div>

              {/* Second Description */}
              <div className="my-2">
                <p className="text-white/80 text-xs leading-relaxed italic">
                  {product.description.stickers}
                </p>
              </div>

              {/* Bottom Section - Variant, Price, CTA */}
              <div>
                {/* Variant Selector */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white/60 text-xs">Color:</span>
                  <div className="flex gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(index)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedVariant === index ? 'scale-110' : 'opacity-60'
                        }`}
                        style={{
                          backgroundColor: variant.color,
                          borderColor: selectedVariant === index ? COLORS.highlight : 'transparent'
                        }}
                        title={variant.name}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">{currentVariant.name}</span>
                  {!currentVariant.inStock && (
                    <span className="text-red-400 text-xs font-medium">Out of Stock</span>
                  )}
                </div>

                {/* Price */}
                <p 
                  className="text-2xl font-bold mb-2"
                  style={{ color: COLORS.highlight }}
                >
                  £{product.price.toFixed(2)}
                </p>

                {/* Add to Collection Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!currentVariant.inStock}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: currentVariant.inStock 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${currentVariant.inStock ? COLORS.highlight : 'rgba(255,255,255,0.2)'}`,
                    color: currentVariant.inStock ? 'white' : 'rgba(255,255,255,0.4)',
                    cursor: currentVariant.inStock ? 'pointer' : 'not-allowed',
                    boxShadow: currentVariant.inStock ? `0 0 15px ${COLORS.highlight}30` : 'none'
                  }}
                  whileHover={currentVariant.inStock ? { scale: 1.02, boxShadow: `0 0 25px ${COLORS.highlight}50` } : {}}
                  whileTap={currentVariant.inStock ? { scale: 0.98 } : {}}
                >
                  {currentVariant.inStock ? 'Add to Collection' : 'Out of Stock'}
                </motion.button>
              </div>
            </div>

            {/* Center Column - Product Image (shifted right) */}
            <div className="col-span-5 flex items-center justify-end pr-2">
              <div className="w-full max-w-[240px]">
                <img 
                  src={product.variants[0].image}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                  style={{
                    filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.4))`
                  }}
                />
              </div>
            </div>

            {/* Right Column - Feature Icons */}
            <div className="col-span-3 flex flex-col justify-center items-center gap-3">
              {FEATURE_ICONS.map((feature, index) => (
                <FeatureIcon
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  subtitle={feature.subtitle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT PANEL - SCROLLABLE (40%) ==================== */}
      <div className="w-full md:w-[40%] min-h-screen bg-white flex flex-col relative">
        {/* Hamburger Menu */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="w-6 h-0.5" style={{ backgroundColor: COLORS.deepWater }} />
            <span className="w-6 h-0.5" style={{ backgroundColor: COLORS.deepWater }} />
            <span className="w-6 h-0.5" style={{ backgroundColor: COLORS.deepWater }} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <Link 
                  href="/" 
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors text-sm"
                  style={{ color: COLORS.deepWater }}
                >
                  Home
                </Link>
                <Link 
                  href="/" 
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors text-sm"
                  style={{ color: COLORS.deepWater }}
                >
                  Sticker Collection
                </Link>
                <Link 
                  href="/products/surface-tank" 
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                  style={{ color: COLORS.surfaceTeal }}
                >
                  Surface Tank
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scrollable Content - Added top padding to align with title */}
        <div className="flex-1 overflow-y-auto px-6 pt-14 pb-8">
          {/* Story Section */}
          <section className="mb-8">
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
            <div className="space-y-4">
              {product.story.steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                    style={{ 
                      borderColor: COLORS.midDepth,
                      color: COLORS.midDepth
                    }}
                  >
                    <span className="text-sm font-light">{step.number}</span>
                  </div>
                  <div className="pt-0.5">
                    <h4 
                      className="font-semibold text-sm"
                      style={{ color: COLORS.deepWater }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-xs">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sticker Fan Visual - LARGER CIRCLES */}
          <section className="mb-8">
            <div className="relative h-24 flex items-center justify-center mb-2">
              {/* Sticker fan - LARGER overlapping circles with proper image centering */}
              <div className="flex -space-x-3">
                {STICKER_FAN_IMAGES.map((sticker, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-full border-2 border-white shadow-lg overflow-hidden flex-shrink-0"
                    style={{
                      zIndex: i === 2 ? 10 : 5 - Math.abs(i - 2),
                      transform: `rotate(${(i - 2) * 5}deg) scale(${i === 2 ? 1.15 : 1})`
                    }}
                    whileHover={{ scale: 1.25, zIndex: 15, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img 
                      src={sticker.image} 
                      alt={sticker.name}
                      className="w-full h-full object-cover object-center"
                      style={{ 
                        transform: 'scale(1.1)',
                        objectPosition: 'center center'
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              {/* Arrow pointing down */}
              <div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                style={{ color: '#FF6B9D' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h12z" />
                </svg>
              </div>
            </div>

            <Link
              href="/"
              className="block text-center text-base md:text-lg font-semibold transition-colors hover:opacity-80"
              style={{ color: COLORS.surfaceTeal }}
            >
              Explore The Collection
            </Link>
          </section>

          {/* Product Description */}
          <section className="mb-5">
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
              <div className="flex items-center justify-between gap-2 mt-4 p-3 bg-gray-50 rounded-xl">
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

      {/* Floating Cart Button - NOW ON RIGHT SIDE */}
      <FloatingCartButton />
    </div>
  );
}
