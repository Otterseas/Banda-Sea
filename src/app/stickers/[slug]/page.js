'use client';

import { useParams } from 'next/navigation';
import { getStickerBySlug, BASE_PRICE, STICKERS, REGIONS } from '@/data/stickers';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

export default function StickerPage() {
  const params = useParams();
  const sticker = getStickerBySlug(params.slug);
  const { addToCart, openCart } = useCart();
  const { formatPrice } = useCurrency();
  
  // Region tabs - default to current sticker's region
  const [activeRegion, setActiveRegion] = useState(sticker?.region || REGIONS[0]);
  
  // Track slide direction for animation
  const [slideDirection, setSlideDirection] = useState(0);
  
  // Update active region when sticker changes
  useEffect(() => {
    if (sticker?.region) {
      setActiveRegion(sticker.region);
    }
  }, [sticker?.region]);
  
  // Get stickers for the active region (excluding current sticker)
  const regionStickers = (STICKERS[activeRegion] || []).filter(s => s.id !== sticker?.id);

  // Handle region change with slide direction
  const handleRegionChange = (newRegion) => {
    const currentIndex = REGIONS.indexOf(activeRegion);
    const newIndex = REGIONS.indexOf(newRegion);
    setSlideDirection(newIndex > currentIndex ? 1 : -1);
    setActiveRegion(newRegion);
  };

  if (!sticker) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)` }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-light text-white mb-4">Sticker not found</h1>
          <Link href="/stickers" className="text-white/60 hover:text-white hover:underline">
            ← Back to collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToPack = () => {
    addToCart(sticker);
    if (openCart) openCart();
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== HEADER - SHARED COMPONENT ==================== */}
      <Header variant="light" currentPath="/stickers" hideOnScroll={false} />

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 flex flex-col md:flex-row pt-14">
        
        {/* ===== LEFT PANEL - White ===== */}
        <div className="w-full md:w-1/2 bg-white flex flex-col p-8 md:p-12">
          
          {/* Sticker Image */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="w-full max-w-sm">
              {sticker.image ? (
                <motion.img 
                  src={sticker.image}
                  alt={sticker.name}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <div 
                  className="w-full aspect-square rounded-3xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(180deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 40%, ${LUNA.abyss} 100%)`,
                  }}
                >
                  <p className="text-2xl font-semibold text-white">{sticker.name}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sticker Info */}
          <div className="flex-shrink-0">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: LUNA.deepWater }}
            >
              {sticker.name} <span className="font-normal">Dive Sticker</span>
            </h1>
            <p className="text-gray-500 mb-1">{sticker.region}</p>
            <p className="text-gray-400 text-sm mb-4">{sticker.country}</p>
            
            <p 
              className="text-2xl font-bold mb-6"
              style={{ color: LUNA.surfaceTeal }}
            >
              {formatPrice(BASE_PRICE)}
            </p>

            {/* Add to Pack Button */}
            <motion.button
              onClick={handleAddToPack}
              className="w-full md:w-auto px-10 py-4 rounded-xl text-sm font-semibold transition-all"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                color: 'white',
                boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`
              }}
              whileHover={{ scale: 1.02, boxShadow: `0 6px 30px ${LUNA.surfaceTeal}60` }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Pack
            </motion.button>
          </div>
        </div>

        {/* ===== RIGHT PANEL - Blue Gradient ===== */}
        <div 
          className="w-full md:w-1/2 flex flex-col"
          style={{ 
            background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
          }}
        >
          {/* Back to Collection */}
          <div className="flex-shrink-0 p-6 md:p-8">
            <Link 
              href="/stickers"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: LUNA.highlight }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Collection
            </Link>
          </div>

          {/* Story Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8">
            {/* Story Headline */}
            <h2 
              className="text-2xl md:text-3xl font-light mb-6 italic"
              style={{ color: LUNA.highlight }}
            >
              {sticker.story?.headline || 'The Story'}
            </h2>

            {/* Story Content */}
            <p className="text-white/85 text-sm leading-relaxed mb-10">
              {sticker.story?.content || 'Story content coming soon...'}
            </p>

            {/* Why We Chose This Design */}
            <h3 
              className="text-xl md:text-2xl font-light mb-4"
              style={{ color: LUNA.highlight }}
            >
              Why We Chose This Design
            </h3>

            <p className="text-white/85 text-sm leading-relaxed">
              {sticker.story?.designRationale || 'Design rationale coming soon...'}
            </p>
          </div>
        </div>
      </main>

      {/* ==================== BOTTOM SECTION ==================== */}
      <section 
        className="flex-shrink-0"
        style={{ backgroundColor: LUNA.abyss }}
      >
        {/* More From Region - With Slide Transition */}
        <div className="px-6 md:px-8 py-6 border-b overflow-hidden" style={{ borderColor: `${LUNA.highlight}15` }}>
          <p className="text-white/50 text-xs uppercase tracking-wider mb-4">
            More from {activeRegion}
          </p>
          
          <div className="relative min-h-[88px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeRegion}
                initial={{ x: slideDirection * 100 + '%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection * -100 + '%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex gap-3 overflow-x-auto hide-scrollbar pb-2"
              >
                {regionStickers.length > 0 ? (
                  regionStickers.map((s) => (
                    <Link
                      key={s.id}
                      href={`/stickers/${s.slug}`}
                      className="flex-shrink-0 group"
                    >
                      <div 
                        className="w-16 h-16 rounded-xl overflow-hidden transition-all group-hover:scale-110 mb-1"
                        style={{ border: `2px solid ${LUNA.highlight}30` }}
                      >
                        {s.image ? (
                          <img 
                            src={s.image} 
                            alt={s.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${LUNA.midDepth} 0%, ${LUNA.abyss} 100%)` }}
                          >
                            <span className="text-white/50 text-[8px] text-center px-1">{s.name}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-white/40 text-[10px] text-center truncate w-16 group-hover:text-white/70 transition-colors">
                        {s.name}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-white/30 text-sm">No other stickers in this region</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Region Tabs - Glass Style with Sliding Indicator */}
        <div className="px-6 md:px-8 py-4 flex justify-center">
          <nav 
            className="inline-flex items-center gap-1 p-1.5 rounded-full overflow-x-auto hide-scrollbar max-w-full relative"
            style={{ 
              backgroundColor: `${LUNA.abyss}30`,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionChange(region)}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap z-10"
                style={{
                  color: activeRegion === region ? LUNA.highlight : 'rgba(255,255,255,0.7)',
                }}
              >
                {/* Sliding Glass Indicator */}
                {activeRegion === region && (
                  <motion.div
                    layoutId="activeRegionIndicatorDetail"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: 'rgba(167, 235, 242, 0.25)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${LUNA.highlight}`,
                      boxShadow: `0 0 20px ${LUNA.highlight}40, inset 0 1px 1px rgba(255,255,255,0.1)`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{region}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
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
