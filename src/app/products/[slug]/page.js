'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Luna Color Palette
const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Collapsible Section Component
function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 
          className="text-xl md:text-2xl font-light"
          style={{ color: COLORS.deepWater, fontFamily: 'Montserrat, sans-serif' }}
        >
          {title}
        </h3>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="24"
          height="24"
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
            <div className="pb-6 text-gray-600 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Feature Icon Component
function FeatureIcon({ icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 mb-2 flex items-center justify-center">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      <p className="text-white text-xs font-medium leading-tight">{title}</p>
      <p className="text-white/60 text-xs">{subtitle}</p>
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
    
    // Add product to cart with variant info
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
      className="h-screen w-full overflow-hidden flex flex-col md:flex-row"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== LEFT PANEL - FIXED (60%) ==================== */}
      <div 
        className="w-full md:w-[60%] h-full flex flex-col relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${COLORS.midDepth} 0%, ${COLORS.deepWater} 40%, ${COLORS.abyss} 100%)`
        }}
      >
        {/* Header */}
        <header className="flex-shrink-0 h-20 flex items-center justify-between px-8 relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Otterseas"
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className="text-xl font-normal tracking-tight text-white">
              Otterseas
            </span>
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-8 pb-8 relative">
          {/* Title */}
          <div className="mb-4">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
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
              className="text-sm tracking-[0.3em] font-medium"
              style={{ color: COLORS.highlight }}
            >
              {product.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="max-w-sm mb-6">
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {product.description.intro}
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              {product.description.stickers}
            </p>
          </div>

          {/* Product Images & Features Row */}
          <div className="flex-1 flex items-center justify-center gap-4 relative">
            {/* Bottle Images */}
            <div className="flex items-end justify-center gap-4 flex-1">
              {product.variants.map((variant, index) => (
                <motion.div
                  key={variant.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedVariant === index ? 'scale-105 z-10' : 'scale-95 opacity-70'
                  }`}
                  onClick={() => setSelectedVariant(index)}
                  whileHover={{ scale: selectedVariant === index ? 1.05 : 1 }}
                >
                  {/* Product Image */}
                  <div 
                    className="w-32 md:w-40 lg:w-48 h-64 md:h-80 lg:h-96 relative overflow-hidden flex items-center justify-center"
                    style={{
                      filter: selectedVariant === index ? 'none' : 'brightness(0.7)',
                      transform: selectedVariant === index ? 'scale(1)' : 'scale(0.9)',
                    }}
                  >
                    {variant.image ? (
                      <img 
                        src={variant.image}
                        alt={`${product.name} - ${variant.name}`}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        style={{
                          filter: selectedVariant === index 
                            ? `drop-shadow(0 0 20px ${COLORS.highlight}40)`
                            : 'none'
                        }}
                      />
                    ) : (
                      /* Fallback placeholder */
                      <div 
                        className="w-full h-full rounded-3xl"
                        style={{
                          background: variant.id === 'white' 
                            ? 'linear-gradient(180deg, #F5F5F0 0%, #E8E8E0 50%, #54ACBF 85%, #26658C 100%)'
                            : `linear-gradient(180deg, ${COLORS.midDepth} 0%, ${COLORS.deepWater} 50%, ${COLORS.abyss} 100%)`,
                        }}
                      />
                    )}
                    {/* Out of Stock Badge */}
                    {!variant.inStock && (
                      <div className="absolute top-4 left-0 right-0 bg-red-500/90 text-white text-xs font-bold py-1 text-center rounded">
                        Out of Stock
                      </div>
                    )}
                    {/* Selection Ring */}
                    {selectedVariant === index && (
                      <div 
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                          boxShadow: `0 0 30px ${COLORS.highlight}40, inset 0 0 0 2px ${COLORS.highlight}30`
                        }}
                      />
                    )}
                  </div>
                  {/* Variant Name */}
                  <p className="text-center text-white/60 text-xs mt-2 font-medium">
                    {variant.name}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Feature Icons - Right side */}
            <div className="flex flex-col gap-6 pl-4">
              {product.features.map((feature, index) => (
                <FeatureIcon
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  subtitle={feature.subtitle}
                />
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex-shrink-0 mt-6">
            {/* Variant Selector */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/60 text-sm">Color:</span>
              <div className="flex gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
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
              {!currentVariant.inStock && (
                <span className="text-red-400 text-sm font-medium ml-2">Out of Stock</span>
              )}
            </div>

            {/* Price */}
            <p 
              className="text-3xl font-bold mb-4"
              style={{ color: COLORS.highlight }}
            >
              £{product.price.toFixed(2)}
            </p>

            {/* Add to Cart Button - Glassmorphism */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!currentVariant.inStock}
              className="px-8 py-4 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: currentVariant.inStock 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${currentVariant.inStock ? COLORS.highlight : 'rgba(255,255,255,0.2)'}`,
                color: currentVariant.inStock ? 'white' : 'rgba(255,255,255,0.4)',
                cursor: currentVariant.inStock ? 'pointer' : 'not-allowed',
                boxShadow: currentVariant.inStock ? `0 0 20px ${COLORS.highlight}30` : 'none'
              }}
              whileHover={currentVariant.inStock ? { scale: 1.02, boxShadow: `0 0 30px ${COLORS.highlight}50` } : {}}
              whileTap={currentVariant.inStock ? { scale: 0.98 } : {}}
            >
              {currentVariant.inStock ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT PANEL - SCROLLABLE (40%) ==================== */}
      <div className="w-full md:w-[40%] h-full bg-white flex flex-col relative">
        {/* Hamburger Menu */}
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="w-7 h-0.5" style={{ backgroundColor: COLORS.deepWater }} />
            <span className="w-7 h-0.5" style={{ backgroundColor: COLORS.deepWater }} />
            <span className="w-7 h-0.5" style={{ backgroundColor: COLORS.deepWater }} />
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
                  href="/stickers" 
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-12">
          {/* Story Section */}
          <section className="mb-12">
            <h2 
              className="text-2xl md:text-3xl font-light mb-4"
              style={{ color: COLORS.deepWater, fontFamily: 'Montserrat, sans-serif' }}
            >
              {product.story.headline}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {product.story.intro}
            </p>

            {/* 3-Step Journey */}
            <div className="space-y-6">
              {product.story.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <span 
                    className="text-4xl font-light"
                    style={{ color: COLORS.midDepth }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h4 
                      className="font-semibold text-lg"
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
          <section className="mb-12">
            <div className="relative h-24 flex items-center justify-center mb-4">
              {/* Sticker fan - overlapping circles */}
              <div className="flex -space-x-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, ${COLORS.midDepth} 100%)`,
                      zIndex: 5 - i,
                      transform: `rotate(${(i - 2) * 8}deg)`
                    }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  />
                ))}
              </div>
              {/* Arrow pointing down */}
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                style={{ color: '#FF6B9D' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h12z" />
                </svg>
              </div>
            </div>

            <Link
              href="/stickers"
              className="block text-center text-xl md:text-2xl font-semibold transition-colors hover:opacity-80"
              style={{ color: COLORS.surfaceTeal }}
            >
              Explore The Collection
            </Link>
          </section>

          {/* Product Description */}
          <section className="mb-8">
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.story.description}
            </p>
          </section>

          {/* Collapsible Sections */}
          <div className="border-t border-gray-200">
            {/* Product Info */}
            <CollapsibleSection title="Product Info." defaultOpen={true}>
              <ul className="space-y-2 mb-6">
                {product.specs.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: COLORS.surfaceTeal }}>•</span>
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="font-medium mb-4" style={{ color: COLORS.deepWater }}>
                Water Bottle Dimensions: {product.specs.dimensions}
              </p>
              
              {/* Temperature Icons */}
              <div className="flex items-center justify-between gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
                {/* Hot */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-lg">🔥</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{product.specs.hotRetention}</p>
                    <p className="text-sm font-medium" style={{ color: COLORS.deepWater }}>
                      {product.specs.hotTemp}
                    </p>
                  </div>
                </div>
                {/* Cold */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-500 text-lg">❄️</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{product.specs.coldRetention}</p>
                    <p className="text-sm font-medium" style={{ color: COLORS.deepWater }}>
                      {product.specs.coldTemp}
                    </p>
                  </div>
                </div>
                {/* Silicone Base */}
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-1">
                    <span className="text-gray-600 text-lg">⚓</span>
                  </div>
                  <p className="text-xs text-gray-500">Silicone Base</p>
                  <p className="text-xs" style={{ color: COLORS.deepWater }}>Boat Friendly</p>
                </div>
              </div>
            </CollapsibleSection>

            {/* Shipping Info */}
            <CollapsibleSection title="Shipping Info.">
              <ul className="space-y-2">
                {product.shipping.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: COLORS.surfaceTeal }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* FAQs */}
            <CollapsibleSection title="FAQs">
              <div className="space-y-4">
                {product.faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="font-medium mb-1" style={{ color: COLORS.deepWater }}>
                      {faq.question}
                    </p>
                    <p className="text-gray-500 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Return & Refunds */}
            <CollapsibleSection title="Return & Refunds">
              <ul className="space-y-2">
                {product.returns.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: COLORS.surfaceTeal }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* EU GPSR Compliance */}
            <CollapsibleSection title="EU GPSR Compliance">
              <p>{product.compliance.content}</p>
            </CollapsibleSection>
          </div>

          {/* Bottom Padding for scroll */}
          <div className="h-20" />
        </div>
      </div>

      {/* Floating Cart Button */}
      <FloatingCartButton />
    </div>
  );
}
