'use client';

import { useParams } from 'next/navigation';
import { getStickerBySlug, BASE_PRICE, STICKERS } from '@/data/stickers';
import { useCart } from '@/context/CartContext';
import ProductDetails from '@/components/ProductDetails';
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

export default function StickerPage() {
  const params = useParams();
  const sticker = getStickerBySlug(params.slug);
  const { addToCart, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // MiniNav state
  const relatedStickers = getRelatedStickers(sticker);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleStickers = relatedStickers.slice(currentIndex, currentIndex + 2);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + 2 < relatedStickers.length;

  if (!sticker) {
    return (
      <div 
        className="h-screen flex items-center justify-center"
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
    <div className="h-screen w-full overflow-hidden flex flex-col md:flex-row" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* ==================== LEFT COLUMN - WHITE ==================== */}
      <div className="w-full md:w-[55%] h-full bg-white flex flex-col overflow-y-auto md:overflow-hidden">
        
        {/* Header - Matching site navigation */}
        <header className="flex-shrink-0 h-16 flex items-center justify-between px-8 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Otterseas" 
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span 
              className="text-xl font-normal tracking-tight"
              style={{ color: LUNA.deepWater }}
            >
              Otterseas
            </span>
          </Link>

          {/* Hamburger Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
              <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
              <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 right-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  <Link 
                    href="/" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/products" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link 
                    href="/stickers" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                    style={{ color: LUNA.surfaceTeal }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sticker Collection
                  </Link>
                  <Link 
                    href="/products/surface-tank" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Surface Tank
                  </Link>
                  <Link 
                    href="/products/dive-journal" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dive Journal
                  </Link>
                  <Link 
                    href="/products/logbook-booster-pack" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Booster Pack
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col px-8 py-8">
          
          {/* Title & Add to Cart Row */}
          <div className="mb-2">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ color: LUNA.deepWater }}
            >
              {sticker.name}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-base">
                  <span className="text-gray-400">Region: </span>
                  <span style={{ color: LUNA.surfaceTeal }}>{sticker.region}</span>
                </p>
                <p className="text-base">
                  <span className="text-gray-400">Country: </span>
                  <span style={{ color: LUNA.surfaceTeal }}>{sticker.country}</span>
                </p>
              </div>
              
              {/* Add to Cart Button - Glass effect style */}
              <motion.button
                onClick={handleAddToPack}
                className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
                style={{ 
                  backgroundColor: 'white',
                  color: LUNA.deepWater,
                  border: `2px solid ${LUNA.highlight}`,
                  boxShadow: `0 0 15px ${LUNA.highlight}30`
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${LUNA.highlight}50` }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Collection
              </motion.button>
            </div>
          </div>

          {/* Sticker Image - Large & Centered */}
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="w-full max-w-md">
              {sticker.image ? (
                <img 
                  src={sticker.image}
                  alt={sticker.name}
                  className="w-full h-auto object-contain"
                />
              ) : (
                /* Placeholder - Dive mask shape */
                <div 
                  className="w-full aspect-[4/3] rounded-3xl flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(180deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 40%, ${LUNA.abyss} 100%)`,
                  }}
                >
                  {/* Mask frame */}
                  <div className="absolute inset-4 rounded-2xl border-8 border-gray-300 bg-transparent" />
                  <div 
                    className="text-center text-white p-8 z-10"
                  >
                    <p className="text-2xl font-semibold tracking-wide">{sticker.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details - Moved up */}
          <div className="flex-shrink-0 pt-4 border-t border-gray-100">
            <ProductDetails />
          </div>
        </div>
      </div>

      {/* ==================== RIGHT COLUMN - BLUE GRADIENT ==================== */}
      <div 
        className="w-full md:w-[45%] h-full flex flex-col relative overflow-hidden"
        style={{ 
          background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
        }}
      >
        {/* Back to Collection Link */}
        <div className="absolute top-6 right-8 z-10">
          <Link 
            href="/stickers"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: LUNA.highlight }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Collection
          </Link>
        </div>

        {/* Story Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-10 py-16 pb-64 md:pb-12">
          {/* Story Headline */}
          <h2 
            className="text-2xl md:text-3xl font-light mb-6 italic"
            style={{ color: LUNA.highlight }}
          >
            {sticker.story?.headline || 'The Story'}
          </h2>

          {/* Story Content */}
          <div className="text-white/85 text-sm leading-relaxed mb-10 max-w-md">
            <p>{sticker.story?.content || 'Story content coming soon...'}</p>
          </div>

          {/* Why We Chose This Design */}
          <h3 
            className="text-xl md:text-2xl font-light mb-4"
            style={{ color: LUNA.highlight }}
          >
            Why We Chose This Design
          </h3>

          <div className="text-white/85 text-sm leading-relaxed max-w-sm">
            <p>{sticker.story?.designRationale || 'Design rationale coming soon...'}</p>
          </div>
        </div>

        {/* ==================== WHITE CURVED SECTION (Bottom Right) ==================== */}
        <div 
          className="absolute bottom-0 right-0 bg-white"
          style={{
            width: '280px',
            height: '220px',
            borderTopLeftRadius: '100px',
          }}
        >
          {/* MiniNav inside white section */}
          <div className="absolute bottom-8 left-8 right-12">
            {/* Sticker Thumbnails */}
            <div className="flex gap-3 mb-4">
              {visibleStickers.map((s) => (
                <Link
                  key={s.id}
                  href={`/stickers/${s.slug}`}
                  className="w-16 h-16 rounded-xl overflow-hidden transition-all hover:scale-105 flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${LUNA.midDepth} 0%, ${LUNA.abyss} 100%)`,
                    border: '2px solid #e5e7eb'
                  }}
                >
                  {s.image ? (
                    <img 
                      src={s.image} 
                      alt={s.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/50 text-[8px] text-center px-1 leading-tight">{s.name}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Navigation Arrows - Horizontal */}
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => canGoBack && setCurrentIndex(prev => prev - 1)}
                disabled={!canGoBack}
                className={`text-2xl transition-all ${canGoBack ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'}`}
              >
                ←
              </button>
              <button
                onClick={() => canGoForward && setCurrentIndex(prev => prev + 1)}
                disabled={!canGoForward}
                className={`text-2xl transition-all ${canGoForward ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'}`}
              >
                →
              </button>
            </div>
          </div>

          {/* "MEMORIES THAT STICK" - Vertical text on white section edge */}
          <div 
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <span 
              className="vertical-text text-[10px] tracking-[0.25em] text-gray-400 font-light uppercase"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Memories That Stick
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
