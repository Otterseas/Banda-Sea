'use client';

import Link from 'next/link';
import { getRelatedStickers } from '@/data/stickers';
import { useState } from 'react';

export default function MiniNav({ currentSticker }) {
  const relatedStickers = getRelatedStickers(currentSticker);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (relatedStickers.length === 0) return null;

  // Show 2 stickers at a time
  const visibleStickers = relatedStickers.slice(currentIndex, currentIndex + 2);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + 2 < relatedStickers.length;

  const goBack = () => {
    if (canGoBack) setCurrentIndex(prev => prev - 1);
  };

  const goForward = () => {
    if (canGoForward) setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Sticker previews */}
      <div className="flex gap-3">
        {visibleStickers.map((sticker) => (
          <Link
            key={sticker.id}
            href={`/stickers/${sticker.slug}`}
            className="w-16 h-16 rounded-xl overflow-hidden transition-all hover:scale-105 hover:ring-2 hover:ring-ochre"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {sticker.image ? (
              <img 
                src={sticker.image} 
                alt={sticker.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/30 text-xs text-center px-1">{sticker.name}</span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex flex-col gap-2">
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            canGoBack ? 'hover:bg-white/10 text-white' : 'text-white/20 cursor-not-allowed'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={goForward}
          disabled={!canGoForward}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            canGoForward ? 'hover:bg-white/10 text-white' : 'text-white/20 cursor-not-allowed'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
