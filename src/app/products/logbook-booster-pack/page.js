'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

// ===========================================
// LUNA COLOR PALETTE
// ===========================================
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// ===========================================
// PRODUCT DATA
// ===========================================
const PRODUCT = {
  name: 'Logbook Booster Pack',
  tagline: 'KEEP YOUR ADVENTURES GOING',
  price: 12.00,
  description: "Running low on log pages? Our Booster Pack includes 30 additional full-colour dive log pages to keep your adventures documented.",
  shopifyVariantId: '49872531325194',
  images: {
    hero: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=823',
    logPages: 'https://38a44d-4c.myshopify.com/cdn/shop/files/DiveLogPages_03f98e7f-41ac-43f6-bb36-837f8035258f.jpg?v=1743749112&width=823',
    withComputer: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20241030_100905.jpg?v=1743749112&width=823',
  }
};

// Quantity options with bulk pricing
const QUANTITY_OPTIONS = [
  { qty: 1, price: 12.00, savings: 0 },
  { qty: 2, price: 19.00, savings: 5.00, label: 'POPULAR' },
  { qty: 3, price: 26.00, savings: 10.00, label: 'BEST VALUE' },
];

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function BoosterPackPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState('hero');
  
  // Get cart context
  const { addToCart, openCart } = useCart();

  // Get selected quantity option
  const currentOption = QUANTITY_OPTIONS.find(opt => opt.qty === selectedQty) || QUANTITY_OPTIONS[0];

  // Thumbnail images
  const thumbnails = [
    { key: 'hero', label: 'Log Pages' },
    { key: 'logPages', label: 'Page Detail' },
    { key: 'withComputer', label: 'In Use' },
  ];

  // Handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < selectedQty; i++) {
      addToCart({
        id: PRODUCT.shopifyVariantId,
        shopifyVariantId: PRODUCT.shopifyVariantId,
        name: PRODUCT.name,
        price: PRODUCT.price,
      });
    }
    if (openCart) openCart();
  };

  return (
    <div 
      className="min-h-screen w-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ===========================================
          HERO SECTION
          =========================================== */}
      <section 
        className="min-h-screen relative"
        style={{
          background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
        }}
      >
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Otterseas"
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className="text-xl font-medium tracking-tight text-white">
              Otterseas
            </span>
          </Link>

          {/* Hamburger Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <span className="w-6 h-0.5 bg-white" />
              <span className="w-6 h-0.5 bg-white" />
              <span className="w-6 h-0.5 bg-white" />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 right-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  <Link href="/" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/products/surface-tank" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Surface Tank
                  </Link>
                  <Link href="/products/dive-journal" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Dive Journal
                  </Link>
                  <Link href="/products/logbook-booster-pack" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm font-medium" style={{ color: LUNA.surfaceTeal }} onClick={() => setIsMenuOpen(false)}>
                    Booster Pack
                  </Link>
                  <Link href="/stickers" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Location Stickers
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Hero Content */}
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 pt-24 pb-12 gap-12">
          {/* Left - Product Info */}
          <div className="lg:w-1/2 max-w-xl">
            {/* Back to Dive Journal */}
            <Link 
              href="/products/dive-journal"
              className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80"
              style={{ color: LUNA.highlight }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Dive Journal
            </Link>

            <motion.span 
              className="text-sm tracking-[0.25em] font-medium mb-4 block"
              style={{ color: LUNA.highlight }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {PRODUCT.tagline}
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Logbook<br/>Booster Pack
            </motion.h1>

            <motion.p 
              className="text-white/70 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {PRODUCT.description}
            </motion.p>

            {/* What's Included */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="text-white font-semibold mb-3">What's Included:</h3>
              <ul className="space-y-2">
                {[
                  '30 full-colour dive log pages',
                  'Diver\'gram equipment diagrams',
                  'Pre-punched for ring binder',
                  'Water-resistant paper',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quantity Selection */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-white font-semibold">Select Quantity:</h3>
              
              <div className="space-y-3">
                {QUANTITY_OPTIONS.map((option) => (
                  <div
                    key={option.qty}
                    className="p-4 rounded-xl cursor-pointer transition-all relative"
                    style={{ 
                      background: selectedQty === option.qty ? 'rgba(167, 235, 242, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: selectedQty === option.qty ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.1)',
                    }}
                    onClick={() => setSelectedQty(option.qty)}
                  >
                    {/* Badge */}
                    {option.label && (
                      <span 
                        className="absolute -top-2 right-4 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ 
                          backgroundColor: option.label === 'BEST VALUE' ? '#FF6B9D' : LUNA.highlight, 
                          color: option.label === 'BEST VALUE' ? 'white' : LUNA.abyss 
                        }}
                      >
                        {option.label}
                      </span>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Radio */}
                        <div 
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: selectedQty === option.qty ? LUNA.highlight : 'rgba(255,255,255,0.3)' }}
                        >
                          {selectedQty === option.qty && (
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LUNA.highlight }} />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{option.qty} Pack{option.qty > 1 ? 's' : ''}</p>
                          <p className="text-white/50 text-sm">{option.qty * 30} log pages</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold text-lg">£{option.price.toFixed(2)}</span>
                        {option.savings > 0 && (
                          <p className="text-xs" style={{ color: '#FF6B9D' }}>Save £{option.savings.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add to Cart */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="text-white/50 text-sm">Total:</span>
                  <span className="text-white text-2xl font-bold ml-2">£{currentOption.price.toFixed(2)}</span>
                </div>
                <motion.button
                  onClick={handleAddToCart}
                  className="px-8 py-4 rounded-xl text-sm font-semibold transition-all"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${LUNA.highlight}`,
                    color: 'white',
                    boxShadow: `0 0 30px ${LUNA.highlight}30`
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${LUNA.highlight}50` }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Collection
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right - Image Gallery */}
          <motion.div 
            className="lg:w-1/2 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Main Image */}
            <div className="relative mb-6">
              <motion.img
                key={selectedImage}
                src={PRODUCT.images[selectedImage]}
                alt={PRODUCT.name}
                className="max-h-[450px] w-auto rounded-2xl shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.key}
                  onClick={() => setSelectedImage(thumb.key)}
                  className="w-20 h-20 rounded-lg overflow-hidden transition-all"
                  style={{
                    border: selectedImage === thumb.key ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.2)',
                    opacity: selectedImage === thumb.key ? 1 : 0.6,
                  }}
                >
                  <img 
                    src={PRODUCT.images[thumb.key]} 
                    alt={thumb.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===========================================
          COMPATIBLE WITH SECTION
          =========================================== */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span 
            className="text-sm tracking-[0.25em] font-medium mb-4 block"
            style={{ color: LUNA.surfaceTeal }}
          >
            PERFECT COMPANION
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: LUNA.deepWater }}
          >
            Designed for The Dive Journal
          </h2>
          <p className="text-lg mb-12" style={{ color: LUNA.midDepth }}>
            Our Booster Packs are pre-punched and perfectly sized to fit your Dive Journal binder. 
            Simply add them in and keep logging your adventures.
          </p>

          {/* Dive Journal CTA Card */}
          <Link href="/products/dive-journal">
            <motion.div
              className="inline-flex items-center gap-8 p-6 rounded-2xl transition-all"
              style={{ 
                background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 100%)`,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=400"
                alt="The Dive Journal"
                className="w-32 h-32 object-cover rounded-xl"
              />
              <div className="text-left">
                <p className="text-sm mb-1" style={{ color: LUNA.highlight }}>Don't have one yet?</p>
                <h3 className="text-2xl font-bold text-white mb-2">The Dive Journal</h3>
                <p className="text-white/70 text-sm mb-3">The ultimate underwater adventure companion</p>
                <span 
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: LUNA.highlight }}
                >
                  View Product →
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ===========================================
          FOOTER
          =========================================== */}
      <footer 
        className="w-full py-12 px-8"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Otterseas"
                className="w-10 h-10 rounded-xl object-contain"
              />
              <span className="text-lg font-medium text-white">Otterseas</span>
            </div>
            
            <nav className="flex gap-6">
              <Link href="/products/surface-tank" className="text-white/50 hover:text-white text-sm transition-colors">
                Surface Tank
              </Link>
              <Link href="/products/dive-journal" className="text-white/50 hover:text-white text-sm transition-colors">
                Dive Journal
              </Link>
              <Link href="/stickers" className="text-white/50 hover:text-white text-sm transition-colors">
                Stickers
              </Link>
            </nav>

            <p className="text-white/40 text-sm">
              © 2025 Otterseas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
