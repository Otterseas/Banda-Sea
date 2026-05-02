'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FishyButton from './FishyButton';

const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

const PRODUCTS = [
  {
    id: '01',
    name: 'The Surface Tank',
    tagline: 'MEMORIES THAT STICK',
    description:
      "Premium water bottle that's more than just a vessel for hydration — it's your reliable companion above the waves.",
    image: '/images/products/The-surface-tank-sunset.jpg',
    link: '/products/surface-tank',
  },
  {
    id: '02',
    name: 'The Dive Journal',
    tagline: 'MORE THAN JUST STATS',
    description:
      'Document your underwater adventures with our beautifully designed dive journal.',
    image: '/images/products/The-dive-journal-product-shot.jpg',
    link: '/products/dive-journal',
  },
  {
    id: '03',
    name: 'Location Stickers',
    tagline: 'COLLECT YOUR ADVENTURES',
    description:
      "Waterproof vinyl stickers designed through a diver's mask-eyed view.",
    image: '/images/products/Location-stickers-close-up.jpg',
    link: '/stickers',
  },
  {
    id: '04',
    name: 'Crochet Creatures',
    tagline: 'HANDCRAFTED WITH LOVE',
    description:
      'Unique handmade marine animals — nudibranchs, seahorses, frogfish & more.',
    image: '/images/hero/Crochet-nudis-table-shot.png',
    link: '/products/crochet-creatures',
  },
];

export default function HomeProductSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState([]);

  useEffect(() => {
    const timers = PRODUCTS.map((_, i) =>
      setTimeout(() => {
        setRevealedIndices((prev) => [...prev, i]);
      }, 220 * i)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      {/* Desktop — horizontal expandable selector */}
      <div
        className="hidden md:flex w-full h-[600px] lg:h-[680px] items-stretch overflow-hidden"
        style={{ backgroundColor: LUNA.abyss }}
      >
        {PRODUCTS.map((product, index) => {
          const isActive = activeIndex === index;
          const isRevealed = revealedIndices.includes(index);

          return (
            <div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className="relative flex flex-col cursor-pointer overflow-hidden border-r last:border-r-0"
              style={{
                backgroundImage: `url('${product.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderColor: `${LUNA.abyss}80`,
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateX(0)' : 'translateX(-60px)',
                flex: isActive ? '7 1 0%' : '1 1 0%',
                filter: isActive
                  ? 'grayscale(0) brightness(1)'
                  : 'grayscale(1) brightness(0.55)',
                minWidth: '90px',
                transition:
                  'flex-grow 700ms cubic-bezier(0.4, 0, 0.2, 1), filter 700ms ease, opacity 800ms ease, transform 800ms ease',
                willChange: 'flex-grow, filter, opacity, transform',
              }}
            >
              {/* Number — top center, only when collapsed */}
              <div
                className="absolute top-5 left-1/2 -translate-x-1/2 z-20 font-light text-3xl tracking-wider"
                style={{
                  color: '#F5EFE6',
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 400ms ease',
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
              >
                {product.id}
              </div>

              {/* Rotated product name — collapsed only */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 500ms ease',
                }}
              >
                <span
                  className="font-bold uppercase tracking-[0.3em] text-base text-[#F5EFE6]"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  }}
                >
                  {product.name}
                </span>
              </div>

              {/* Bottom info panel — active only. Number lives here, left-aligned with text. */}
              <div
                className="absolute inset-x-0 bottom-0 px-8 pt-20 pb-8 z-20"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(1,28,64,0.85) 50%, rgba(1,28,64,0.95) 100%)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition:
                    'opacity 500ms ease 200ms, transform 500ms ease 200ms',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div
                  className="font-light text-2xl mb-3 tracking-wider"
                  style={{ color: LUNA.highlight }}
                >
                  {product.id}
                </div>
                <p
                  className="text-xs tracking-[0.25em] font-medium mb-2"
                  style={{ color: LUNA.highlight }}
                >
                  {product.tagline}
                </p>
                <h3 className="text-3xl lg:text-4xl font-bold text-[#F5EFE6] mb-3 leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-[#F5EFE6]/75 mb-5 max-w-md leading-relaxed">
                  {product.description}
                </p>
                <FishyButton href={product.link} variant="1">
                  VISIT PRODUCT
                </FishyButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile — vertical stacked cards */}
      <div
        className="md:hidden flex flex-col gap-3 p-4"
        style={{ backgroundColor: LUNA.abyss }}
      >
        {PRODUCTS.map((product, index) => {
          const isActive = activeIndex === index;
          const isRevealed = revealedIndices.includes(index);

          return (
            <div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url('${product.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: isActive ? '440px' : '110px',
                filter: isActive
                  ? 'grayscale(0) brightness(1)'
                  : 'grayscale(1) brightness(0.6)',
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
                transition:
                  'height 500ms cubic-bezier(0.4,0,0.2,1), filter 500ms ease, opacity 600ms ease, transform 600ms ease',
              }}
            >
              {/* Collapsed number — top left */}
              <div
                className="absolute top-3 left-4 font-light text-xl z-10"
                style={{
                  color: '#F5EFE6',
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 300ms ease',
                  textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                }}
              >
                {product.id}
              </div>

              {/* Collapsed name — right side */}
              <div
                className="absolute top-1/2 -translate-y-1/2 right-5 z-10"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 400ms ease',
                }}
              >
                <span
                  className="font-bold uppercase tracking-[0.25em] text-sm text-[#F5EFE6]"
                  style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
                >
                  {product.name}
                </span>
              </div>

              {/* Active info — bottom panel with number left-aligned above text */}
              <div
                className="absolute inset-x-0 bottom-0 px-5 pt-12 pb-5 z-10"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(1,28,64,0.9) 50%, rgba(1,28,64,0.96) 100%)',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 400ms ease 200ms',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div
                  className="font-light text-lg mb-2 tracking-wider"
                  style={{ color: LUNA.highlight }}
                >
                  {product.id}
                </div>
                <p
                  className="text-[10px] tracking-[0.25em] font-medium mb-1"
                  style={{ color: LUNA.highlight }}
                >
                  {product.tagline}
                </p>
                <h3 className="text-2xl font-bold text-[#F5EFE6] mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-[#F5EFE6]/75 mb-3 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <Link
                  href={product.link}
                  className="inline-block text-xs font-semibold tracking-[0.15em] px-5 py-3 transition-colors"
                  style={{
                    backgroundColor: LUNA.deepWater,
                    color: '#F5EFE6',
                  }}
                >
                  VISIT PRODUCT →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
