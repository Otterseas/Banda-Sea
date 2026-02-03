'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { FUN_STICKERS, BUNDLED_STICKER_PRICE, QUALITY_STATEMENT } from '@/data/funStickers';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// ===========================================
// PRODUCT CARD COMPONENT
// ===========================================
function ProductCard({ sticker, onClick, formatPrice }) {
  const { addToCart, openCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % sticker.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + sticker.images.length) % sticker.images.length);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all"
      style={{ border: `2px solid ${LUNA.highlight}40` }}
      whileHover={{ 
        y: -4, 
        boxShadow: `0 12px 40px ${LUNA.surfaceTeal}20`,
        borderColor: LUNA.surfaceTeal,
      }}
      onClick={onClick}
    >
      {/* Image with navigation */}
      <div className="aspect-square overflow-hidden bg-gray-50 relative group">
        <img 
          src={sticker.images[currentImageIndex]} 
          alt={sticker.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Image navigation arrows - show on hover */}
        {sticker.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            {/* Image dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {sticker.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ 
                    backgroundColor: currentImageIndex === index ? LUNA.surfaceTeal : 'rgba(255,255,255,0.8)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 
          className="font-semibold text-sm mb-1 line-clamp-2"
          style={{ color: LUNA.deepWater }}
        >
          {sticker.title}
        </h3>
        <p 
          className="text-lg font-bold mb-3"
          style={{ color: LUNA.surfaceTeal }}
        >
          {formatPrice(sticker.price)}
        </p>
        
        <button
          onClick={handleAddToCart}
          className="w-full py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
          style={{ 
            background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
            color: 'white',
          }}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

// ===========================================
// PRODUCT MODAL COMPONENT
// ===========================================
function ProductModal({ sticker, isOpen, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [productInfoOpen, setProductInfoOpen] = useState(false);
  const { addToCart, openCart } = useCart();

  // Reset image index when sticker changes
  if (!sticker) return null;

  const handleAddToCart = () => {
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container - Centers the modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${LUNA.surfaceTeal}`,
                boxShadow: `0 25px 80px ${LUNA.deepWater}40, 0 0 40px ${LUNA.surfaceTeal}20`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 z-20 bg-white/80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {/* Content - Landscape Grid */}
              <div className="flex flex-col md:flex-row max-h-[85vh]">
                
                {/* Left - Image Gallery */}
                <div className="md:w-1/2 relative bg-gray-50 flex-shrink-0 group">
                  <div className="aspect-square md:aspect-auto md:h-full">
                    <img 
                      src={sticker.images[activeImageIndex]} 
                      alt={sticker.title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </div>

                  {/* Image navigation arrows and dots */}
                  {sticker.images.length > 1 && (
                    <>
                      {/* Left Arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev - 1 + sticker.images.length) % sticker.images.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </button>
                      
                      {/* Right Arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev + 1) % sticker.images.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>

                      {/* Image Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {sticker.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex(index);
                            }}
                            className="w-3 h-3 rounded-full transition-all"
                            style={{ 
                              backgroundColor: activeImageIndex === index ? LUNA.surfaceTeal : 'rgba(255,255,255,0.8)',
                              boxShadow: activeImageIndex === index ? `0 0 10px ${LUNA.surfaceTeal}` : '0 2px 4px rgba(0,0,0,0.2)',
                              border: activeImageIndex === index ? 'none' : '1px solid rgba(0,0,0,0.1)',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

              {/* Right - Product Info */}
              <div className="md:w-1/2 p-6 overflow-y-auto">
                {/* Title & Price */}
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ color: LUNA.deepWater }}
                >
                  {sticker.title}
                </h2>
                <p 
                  className="text-2xl font-bold mb-6"
                  style={{ color: LUNA.surfaceTeal }}
                >
                  {formatPrice(sticker.price)}
                </p>

                {/* Collapsible Description */}
                <div className="mb-3">
                  <button
                    onClick={() => setDescriptionOpen(!descriptionOpen)}
                    className="w-full flex items-center justify-between py-3 border-t"
                    style={{ borderColor: `${LUNA.surfaceTeal}20` }}
                  >
                    <span className="font-semibold" style={{ color: LUNA.deepWater }}>
                      Description
                    </span>
                    <motion.svg 
                      width="20" height="20" viewBox="0 0 24 24" fill="none" 
                      stroke={LUNA.surfaceTeal} strokeWidth="2"
                      animate={{ rotate: descriptionOpen ? 180 : 0 }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {descriptionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="text-gray-600 text-sm leading-relaxed pb-3">
                          <p className="mb-3">{sticker.description}</p>
                          <p className="text-gray-500 italic">{QUALITY_STATEMENT}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Collapsible Product Info */}
                <div className="mb-6">
                  <button
                    onClick={() => setProductInfoOpen(!productInfoOpen)}
                    className="w-full flex items-center justify-between py-3 border-t"
                    style={{ borderColor: `${LUNA.surfaceTeal}20` }}
                  >
                    <span className="font-semibold" style={{ color: LUNA.deepWater }}>
                      Product Info
                    </span>
                    <motion.svg 
                      width="20" height="20" viewBox="0 0 24 24" fill="none" 
                      stroke={LUNA.surfaceTeal} strokeWidth="2"
                      animate={{ rotate: productInfoOpen ? 180 : 0 }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {productInfoOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <ul className="text-gray-600 text-sm space-y-2 pb-3">
                          {sticker.productInfo.map((info, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span style={{ color: LUNA.surfaceTeal }}>•</span>
                              {info}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl text-sm font-semibold transition-all"
                  style={{ 
                    background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                    color: 'white',
                    boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`,
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 6px 30px ${LUNA.surfaceTeal}60` }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ===========================================
// MAIN PAGE COMPONENT
// ===========================================
export default function FunStickersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const { formatPrice } = useCurrency();

  return (
    <div 
      className="min-h-screen w-full flex flex-col bg-white"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== HEADER ==================== */}
      <header className="flex-shrink-0 h-16 flex items-center justify-between px-8 bg-white border-b border-gray-100 relative z-20">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Otterseas" 
            className="w-10 h-10 rounded-xl object-contain"
          />
          <span 
            className="text-xl font-medium tracking-tight"
            style={{ color: LUNA.deepWater }}
          >
            Otterseas
          </span>
        </Link>

        {/* Currency Switcher & Menu */}
        <div className="flex items-center gap-3">
          <CurrencySwitcher variant="light" />
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
              <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
              <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
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
                  <Link href="/products" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    All Products
                  </Link>
                  <Link href="/stickers" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Location Stickers
                  </Link>
                  <Link href="/products/fun-stickers" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm font-medium" style={{ color: LUNA.surfaceTeal }} onClick={() => setIsMenuOpen(false)}>
                    Fun Stickers
                  </Link>
                  <Link href="/products/surface-tank" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Surface Tank
                  </Link>
                  <Link href="/products/dive-journal" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Dive Journal
                  </Link>
                  <Link href="/products/logbook-booster-pack" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                  Booster Pack
                </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section className="px-8 py-12 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: LUNA.deepWater }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Just For Fun
        </motion.h1>
        <motion.p 
          className="text-lg mb-4"
          style={{ color: LUNA.surfaceTeal }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Dive Stickers & Magnets
        </motion.p>
        <motion.p 
          className="text-gray-500 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Lighthearted stickers for divers who don't take themselves too seriously. 
          Premium vinyl, waterproof, and built to last – perfect for laptops, water bottles, 
          dive logs, or anywhere you want the world to know you're part of the underwater club.
        </motion.p>
      </section>

      {/* ==================== PRODUCT GRID ==================== */}
      <section className="flex-1 px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {FUN_STICKERS.map((sticker, index) => (
              <motion.div
                key={sticker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <ProductCard 
                  sticker={sticker} 
                  onClick={() => setSelectedSticker(sticker)}
                  formatPrice={formatPrice}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BUNDLE SECTION ==================== */}
      <section 
        className="px-8 py-16"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span 
              className="text-sm tracking-[0.25em] font-medium mb-4 block"
              style={{ color: LUNA.highlight }}
            >
              BUNDLE & SAVE 25%
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              These Look Great On...
            </h2>
            <p className="text-white/60 mb-12">
              Add any fun sticker to these products and get 25% off your sticker!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Surface Tank */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/products/surface-tank">
                <div 
                  className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${LUNA.highlight}30`,
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=600"
                      alt="Surface Tank"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-xl font-bold text-white mb-1">Surface Tank</h3>
                    <p className="text-white/60 text-sm mb-3">Deck out your water bottle with fun dive stickers!</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold">{formatPrice(40)}</span>
                        <span className="text-white/40 text-sm ml-2">+ sticker {formatPrice(BUNDLED_STICKER_PRICE)}</span>
                      </div>
                      <span 
                        className="text-sm font-medium flex items-center gap-1"
                        style={{ color: LUNA.highlight }}
                      >
                        Shop Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Dive Journal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/products/dive-journal">
                <div 
                  className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${LUNA.highlight}30`,
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=600"
                      alt="Dive Journal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-xl font-bold text-white mb-1">The Dive Journal</h3>
                    <p className="text-white/60 text-sm mb-3">Personalise your journal cover with your favourites!</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold">{formatPrice(28)}</span>
                        <span className="text-white/40 text-sm ml-2">+ sticker {formatPrice(BUNDLED_STICKER_PRICE)}</span>
                      </div>
                      <span 
                        className="text-sm font-medium flex items-center gap-1"
                        style={{ color: LUNA.highlight }}
                      >
                        Shop Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer 
        className="w-full py-12 px-8"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Otterseas"
                className="w-10 h-10 rounded-xl object-contain"
              />
              <span className="text-lg font-medium text-white">Otterseas</span>
            </Link>
            
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/products" className="text-white/50 hover:text-white text-sm transition-colors">
                All Products
              </Link>
              <Link href="/products/surface-tank" className="text-white/50 hover:text-white text-sm transition-colors">
                Surface Tank
              </Link>
              <Link href="/products/dive-journal" className="text-white/50 hover:text-white text-sm transition-colors">
                Dive Journal
              </Link>
              <Link href="/products/logbook-booster-pack" className="text-white/50 hover:text-white text-sm transition-colors">
                Booster Pack
              </Link>
              <Link href="/stickers" className="text-white/50 hover:text-white text-sm transition-colors">
                Location Stickers
              </Link>
              <Link href="/products/fun-stickers" className="text-white/50 hover:text-white text-sm transition-colors">
                Fun Stickers
              </Link>
            </nav>

            <p className="text-white/40 text-sm">
              © 2025 Otterseas
            </p>
          </div>
        </div>
      </footer>

      {/* ==================== PRODUCT MODAL ==================== */}
      <ProductModal 
        sticker={selectedSticker}
        isOpen={!!selectedSticker}
        onClose={() => setSelectedSticker(null)}
      />
    </div>
  );
}
