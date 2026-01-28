'use client';

import { useParams } from 'next/navigation';
import { getStickerBySlug, BASE_PRICE, STICKERS } from '@/data/stickers';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Get related stickers (same region, excluding current)
const getRelatedStickers = (sticker) => {
  if (!sticker) return [];
  return STICKERS[sticker.region]?.filter(s => s.id !== sticker.id) || [];
};

// Get all stickers flat for navigation
const getAllStickersFlat = () => {
  return Object.values(STICKERS).flat();
};

export default function StickerPage() {
  const params = useParams();
  const sticker = getStickerBySlug(params.slug);
  const { addToCart, openCart } = useCart();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get all stickers for prev/next navigation
  const allStickers = getAllStickersFlat();
  const currentIndex = allStickers.findIndex(s => s.slug === params.slug);
  const prevSticker = currentIndex > 0 ? allStickers[currentIndex - 1] : null;
  const nextSticker = currentIndex < allStickers.length - 1 ? allStickers[currentIndex + 1] : null;
  
  // Related stickers
  const relatedStickers = getRelatedStickers(sticker);

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
      style={{ 
        fontFamily: 'Montserrat, sans-serif',
        background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
      }}
    >
      {/* ==================== HEADER ==================== */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-4 relative z-20">
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
                <Link href="/products" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                  All Products
                </Link>
                <Link href="/stickers" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm font-medium" style={{ color: LUNA.surfaceTeal }} onClick={() => setIsMenuOpen(false)}>
                  Sticker Collection
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
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative">
        
        {/* Back to Collection - Top Center */}
        <Link 
          href="/stickers"
          className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: LUNA.highlight }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Collection
        </Link>

        {/* Prev/Next Navigation - Sides */}
        {prevSticker && (
          <Link
            href={`/stickers/${prevSticker.slug}`}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ 
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${LUNA.highlight}30`
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </Link>
        )}
        
        {nextSticker && (
          <Link
            href={`/stickers/${nextSticker.slug}`}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ 
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${LUNA.highlight}30`
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>
        )}

        {/* ==================== FLIP CARD ==================== */}
        <div 
          className="relative w-full max-w-md mx-auto cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="relative w-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* ===== FRONT - Sticker Image ===== */}
            <div 
              className="w-full rounded-3xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {sticker.image ? (
                <img 
                  src={sticker.image}
                  alt={sticker.name}
                  className="w-full h-auto object-contain"
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
              
              {/* Tap hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
                </svg>
                <span className="text-white text-xs">Tap to read story</span>
              </div>
            </div>

            {/* ===== BACK - Story ===== */}
            <div 
              className="absolute inset-0 w-full rounded-3xl overflow-hidden p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${LUNA.highlight}30`
              }}
            >
              <div className="h-full overflow-y-auto hide-scrollbar">
                {/* Story Headline */}
                <h2 
                  className="text-2xl font-light mb-4 italic"
                  style={{ color: LUNA.highlight }}
                >
                  {sticker.story?.headline || 'The Story'}
                </h2>

                {/* Story Content */}
                <p className="text-white/90 text-sm leading-relaxed mb-6">
                  {sticker.story?.content || 'Story content coming soon...'}
                </p>

                {/* Why We Chose This Design */}
                <h3 
                  className="text-lg font-light mb-3"
                  style={{ color: LUNA.highlight }}
                >
                  Why We Chose This Design
                </h3>

                <p className="text-white/90 text-sm leading-relaxed">
                  {sticker.story?.designRationale || 'Design rationale coming soon...'}
                </p>
              </div>

              {/* Tap hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
                </svg>
                <span className="text-white text-xs">Tap to see sticker</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== STICKER INFO (Below Card) ==================== */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {sticker.name}
          </h1>
          <p className="text-white/60 mb-1">
            {sticker.region} • {sticker.country}
          </p>
          <p className="text-2xl font-bold mb-6" style={{ color: LUNA.highlight }}>
            £{BASE_PRICE.toFixed(2)}
          </p>

          {/* Add to Pack Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToPack();
            }}
            className="px-10 py-4 rounded-xl text-sm font-semibold transition-all"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${LUNA.highlight}`,
              color: 'white',
              boxShadow: `0 0 30px ${LUNA.highlight}30`
            }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${LUNA.highlight}50` }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Pack
          </motion.button>
        </div>
      </main>

      {/* ==================== RELATED STICKERS (Bottom) ==================== */}
      {relatedStickers.length > 0 && (
        <section className="flex-shrink-0 px-6 py-8 border-t" style={{ borderColor: `${LUNA.highlight}20` }}>
          <p className="text-center text-white/50 text-xs uppercase tracking-wider mb-4">
            More from {sticker.region}
          </p>
          
          <div className="flex justify-center gap-4 overflow-x-auto hide-scrollbar pb-2">
            {relatedStickers.slice(0, 5).map((s) => (
              <Link
                key={s.id}
                href={`/stickers/${s.slug}`}
                className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all hover:scale-110"
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
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
