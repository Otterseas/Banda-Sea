'use client';

import { useParams } from 'next/navigation';
import { getStickerBySlug, BASE_PRICE } from '@/data/stickers';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import ProductDetails from '@/components/ProductDetails';
import MiniNav from '@/components/MiniNav';
import Link from 'next/link';

export default function StickerPage() {
  const params = useParams();
  const sticker = getStickerBySlug(params.slug);
  const { addToCart } = useCart();

  if (!sticker) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-navy mb-4">Sticker not found</h1>
          <Link href="/" className="text-ochre hover:underline">
            ← Back to collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToPack = () => {
    addToCart(sticker);
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col md:flex-row">
      {/* Left Column - White */}
      <div className="w-full md:w-[60%] h-full bg-white flex flex-col overflow-y-auto md:overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Otterseas" 
              className="w-9 h-9 rounded-xl object-contain"
            />
            <span 
              className="text-xl font-light tracking-tight"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#0A2540' }}
            >
              Otterseas
            </span>
          </Link>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col px-8 py-6 md:py-8">
          {/* Title Section */}
          <div className="mb-6">
            <h1 
              className="text-4xl md:text-5xl font-light mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#0A2540' }}
            >
              {sticker.name}
            </h1>
            <div className="flex flex-col gap-1">
              <p className="text-sm">
                <span className="text-gray-500">Region: </span>
                <span style={{ color: '#1a8a8a' }}>{sticker.region}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Country: </span>
                <span style={{ color: '#1a8a8a' }}>{sticker.country}</span>
              </p>
            </div>
          </div>

          {/* Add to Cart Button - Desktop inline */}
          <div className="hidden md:flex items-center gap-4 mb-8">
            <button
              onClick={handleAddToPack}
              className="px-8 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'white',
                color: '#0A2540',
                border: '2px solid #0A2540'
              }}
            >
              Add to Cart
            </button>
          </div>

          {/* Sticker Image */}
          <div className="flex-1 flex items-center justify-center py-4 md:py-0">
            <div className="relative w-full max-w-sm aspect-square">
              {sticker.image ? (
                <img 
                  src={sticker.image}
                  alt={sticker.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                // Placeholder - mask with dive scene
                <div 
                  className="w-full h-full rounded-3xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(180deg, #87CEEB 0%, #1E90FF 50%, #0A2540 100%)',
                  }}
                >
                  <div 
                    className="text-center text-white/50 p-8"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4 opacity-50">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a10 10 0 0 0 0 20"/>
                      <path d="M2 12h20"/>
                    </svg>
                    <p className="text-lg font-light">{sticker.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Dropdown */}
          <div className="flex-shrink-0 mt-auto pt-6 border-t border-gray-100">
            <ProductDetails />
          </div>

          {/* Mobile Add to Pack */}
          <div className="md:hidden mt-6">
            <p className="text-sm text-gray-500 mb-2">
              £{BASE_PRICE.toFixed(2)} / ea
            </p>
            <button
              onClick={handleAddToPack}
              className="w-full py-4 rounded-xl text-base font-semibold transition-all hover:scale-[1.02]"
              style={{ 
                backgroundColor: '#D99E30',
                color: 'white',
                boxShadow: '0 4px 20px rgba(217, 158, 48, 0.4)'
              }}
            >
              ADD TO PACK
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Blue Gradient */}
      <div 
        className="w-full md:w-[40%] h-full flex flex-col relative"
        style={{ 
          background: 'linear-gradient(180deg, #1a8a8a 0%, #0A2540 100%)'
        }}
      >
        {/* Hamburger Menu */}
        <div className="absolute top-6 right-6 z-10">
          <button className="flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-white/80"></span>
            <span className="w-6 h-0.5 bg-white/80"></span>
            <span className="w-6 h-0.5 bg-white/80"></span>
          </button>
        </div>

        {/* Story Content - Scrollable */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-8 py-12">
          {/* Story Headline */}
          <h2 
            className="text-2xl md:text-3xl font-light mb-6 italic"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#D99E30' }}
          >
            {sticker.story?.headline || 'The Story'}
          </h2>

          {/* Story Content */}
          <div className="text-white/80 text-sm leading-relaxed mb-10">
            <p>{sticker.story?.content || 'Story content coming soon...'}</p>
          </div>

          {/* Why We Chose This Design */}
          <h3 
            className="text-xl md:text-2xl font-light mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#D99E30' }}
          >
            Why We Chose This Design
          </h3>

          <div className="text-white/80 text-sm leading-relaxed">
            <p>{sticker.story?.designRationale || 'Design rationale coming soon...'}</p>
          </div>
        </div>

        {/* Mini Nav - Bottom Right */}
        <div className="flex-shrink-0 px-8 pb-8">
          <MiniNav currentSticker={sticker} />
        </div>

        {/* Vertical Text - "MEMORIES THAT STICK" */}
        <div 
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <span 
            className="vertical-text text-xs tracking-[0.3em] text-white/30 font-light uppercase"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Memories That Stick
          </span>
        </div>
      </div>
    </div>
  );
}
