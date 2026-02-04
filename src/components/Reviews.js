'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Star Rating Component
export function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= rating ? '#FFB800' : 'none'}
          stroke={star <= rating ? '#FFB800' : '#D1D5DB'}
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// Single Review Card
export function ReviewCard({ review, variant = 'light' }) {
  const isDark = variant === 'dark';
  
  return (
    <div 
      className="p-6 rounded-2xl h-full flex flex-col backdrop-blur-md"
      style={{
        backgroundColor: isDark 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(255, 255, 255, 0.7)',
        border: isDark 
          ? `1px solid ${LUNA.highlight}20` 
          : '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: isDark 
          ? 'none' 
          : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
      }}
    >
      {/* Stars & Date */}
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.rating} />
        <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
          {review.date}
        </span>
      </div>
      
      {/* Review Text */}
      <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
        "{review.message}"
      </p>
      
      {/* Reviewer */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
        {/* Avatar */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
          style={{ 
            backgroundColor: isDark ? LUNA.surfaceTeal : `${LUNA.surfaceTeal}20`,
            color: isDark ? 'white' : LUNA.surfaceTeal,
          }}
        >
          {review.reviewer.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {review.reviewer}
          </p>
          {review.verified && (
            <p className="text-xs flex items-center gap-1" style={{ color: LUNA.surfaceTeal }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Verified Purchase
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Reviews Carousel/Section Component
export function ReviewsSection({ 
  reviews, 
  title = "What Divers Say",
  subtitle,
  variant = 'light',
  showAllLink,
  maxVisible = 3,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isDark = variant === 'dark';
  
  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= maxVisible) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / maxVisible));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, reviews.length, maxVisible]);

  // Get visible reviews based on screen size
  const visibleReviews = reviews.slice(
    currentIndex * maxVisible, 
    (currentIndex * maxVisible) + maxVisible
  );

  const totalPages = Math.ceil(reviews.length / maxVisible);

  if (reviews.length === 0) return null;

  return (
    <section 
      className="w-full py-16 px-8 relative overflow-hidden"
      style={{ 
        backgroundColor: isDark ? LUNA.abyss : 'white',
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle gradient blobs for glass effect - only on light variant */}
      {!isDark && (
        <>
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ background: `radial-gradient(circle, ${LUNA.highlight} 0%, transparent 70%)` }}
          />
          <div 
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ background: `radial-gradient(circle, ${LUNA.surfaceTeal} 0%, transparent 70%)` }}
          />
        </>
      )}
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          {subtitle && (
            <span 
              className="text-xs tracking-[0.3em] font-medium mb-3 block"
              style={{ color: LUNA.surfaceTeal }}
            >
              {subtitle}
            </span>
          )}
          <h2 
            className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : ''}`}
            style={{ color: isDark ? 'white' : LUNA.deepWater }}
          >
            {title}
          </h2>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <StarRating rating={5} size={20} />
            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              {reviews.length} reviews from Etsy
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={`${currentIndex}-${review.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard review={review} variant={variant} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: idx === currentIndex 
                    ? LUNA.surfaceTeal 
                    : isDark ? 'rgba(255,255,255,0.2)' : '#D1D5DB',
                  width: idx === currentIndex ? '24px' : '8px',
                }}
              />
            ))}
          </div>
        )}

        {/* View All Link */}
        {showAllLink && (
          <div className="text-center mt-8">
            <a
              href="https://www.etsy.com/uk/shop/Otterseas#reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
              style={{ color: LUNA.surfaceTeal }}
            >
              See All Reviews on Etsy
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// Compact Reviews Strip (for product pages)
export function ReviewsStrip({ reviews, variant = 'light' }) {
  const isDark = variant === 'dark';
  const scrollRef = useRef(null);
  
  if (reviews.length === 0) return null;

  return (
    <div className="w-full py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-3">
          <StarRating rating={5} size={18} />
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
            {reviews.length} Reviews
          </span>
        </div>
        <a
          href="https://www.etsy.com/uk/shop/Otterseas#reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium"
          style={{ color: LUNA.surfaceTeal }}
        >
          View on Etsy →
        </a>
      </div>

      {/* Horizontal Scroll */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="flex-shrink-0 w-80 snap-start"
          >
            <ReviewCard review={review} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
