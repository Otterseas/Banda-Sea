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

const BottleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2.5h5v3l1 1.5v11.5a2.5 2.5 0 0 1-2.5 2.5h-2a2.5 2.5 0 0 1-2.5-2.5V7l1-1.5v-3z" />
    <path d="M9.5 9h5" />
  </svg>
);

const BookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15l-4-2-4 2-4-2-4 2V5z" />
    <path d="M8 7h8M8 11h8M8 15h5" />
  </svg>
);

const PinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 21s-7-7.4-7-12.5A7 7 0 0 1 19 8.5C19 13.6 12 21 12 21z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const JellyfishIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 11a7 7 0 0 1 14 0v3H5v-3z" />
    <path d="M7 14v3M11 14v4.5M13 14v3.5M17 14v3" />
  </svg>
);

const PRODUCTS = [
  {
    id: '01',
    name: 'The Surface Tank',
    tagline: 'MEMORIES THAT STICK',
    description:
      "Premium water bottle that's more than just a vessel for hydration — it's your reliable companion above the waves.",
    image: '/images/products/The-surface-tank-sunset.jpg',
    bgPosition: 'center center',
    link: '/products/surface-tank',
    Icon: BottleIcon,
  },
  {
    id: '02',
    name: 'The Dive Journal',
    tagline: 'MORE THAN JUST STATS',
    description:
      'Document your underwater adventures with our beautifully designed dive journal.',
    image: '/images/products/The-dive-journal-product-shot.jpg',
    bgPosition: 'center center',
    link: '/products/dive-journal',
    Icon: BookIcon,
  },
  {
    id: '03',
    name: 'Location Stickers',
    tagline: 'COLLECT YOUR ADVENTURES',
    description:
      "Waterproof vinyl stickers designed through a diver's mask-eyed view.",
    image: '/images/products/Location-stickers-close-up.jpg',
    bgPosition: 'center center',
    link: '/stickers',
    Icon: PinIcon,
  },
  {
    id: '04',
    name: 'Crochet Creatures',
    tagline: 'HANDCRAFTED WITH LOVE',
    description:
      'Unique handmade marine animals — nudibranchs, seahorses, frogfish & more.',
    image: '/images/hero/Crochet-nudis-table-shot.png',
    bgPosition: 'center center',
    link: '/products/crochet-creatures',
    Icon: JellyfishIcon,
  },
];

const IconBadge = ({ children, size = 28 }) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{
      width: size,
      height: size,
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(255, 255, 255, 0.95)',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.45)',
      color: '#FFFFFF',
    }}
  >
    {children}
  </div>
);

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
        className="hidden md:flex w-full h-[480px] lg:h-[540px] items-stretch overflow-hidden rounded-xl"
        style={{ backgroundColor: LUNA.abyss }}
      >
        {PRODUCTS.map((product, index) => {
          const isActive = activeIndex === index;
          const isRevealed = revealedIndices.includes(index);
          const Icon = product.Icon;

          return (
            <div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className="relative flex flex-col cursor-pointer overflow-hidden border-r last:border-r-0"
              style={{
                borderColor: `${LUNA.abyss}80`,
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateX(0)' : 'translateX(-60px)',
                flex: isActive ? '7 1 0%' : '1 1 0%',
                minWidth: '90px',
                backgroundColor: LUNA.abyss,
                transition:
                  'flex-grow 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 800ms ease, transform 800ms ease',
                willChange: 'flex-grow, opacity, transform',
              }}
            >
              {/* Filtered background layer — only this gets grayscaled when collapsed */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${product.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: product.bgPosition,
                  backgroundRepeat: 'no-repeat',
                  filter: isActive
                    ? 'grayscale(0) brightness(1)'
                    : 'grayscale(1) brightness(0.55)',
                  transition: 'filter 700ms ease',
                }}
              />

              {/* Number — top-left, aligned with bottom-panel padding so it lines up vertically with the expanded icon */}
              <div
                className="absolute top-4 left-8 z-20 font-light text-2xl tracking-wider"
                style={{
                  color: isActive ? LUNA.highlight : '#FFFFFF',
                  transition: 'color 400ms ease',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                }}
              >
                {product.id}
              </div>

              {/* Rotated product name — collapsed only, white */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 500ms ease',
                }}
              >
                <span
                  className="font-bold uppercase tracking-[0.3em] text-base"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    color: '#FFFFFF',
                    textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                  }}
                >
                  {product.name}
                </span>
              </div>

              {/* Icon badge — collapsed: bottom-center; expanded: hidden (lives inside info panel) */}
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 400ms ease',
                  pointerEvents: isActive ? 'none' : 'auto',
                }}
              >
                <IconBadge size={28}>
                  <Icon width={14} height={14} />
                </IconBadge>
              </div>

              {/* Bottom info panel — active only. Tagline above; icon sits inline with the title so they share a baseline. */}
              <div
                className="absolute inset-x-0 bottom-0 px-8 pt-16 pb-7 z-20"
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
                <p
                  className="text-xs tracking-[0.25em] font-medium mb-2"
                  style={{ color: LUNA.highlight }}
                >
                  {product.tagline}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <IconBadge size={28}>
                    <Icon width={14} height={14} />
                  </IconBadge>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {product.name}
                  </h3>
                </div>
                <p className="text-sm text-white/75 mb-5 max-w-md leading-relaxed">
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
        className="md:hidden flex flex-col gap-3 rounded-xl overflow-hidden"
        style={{ backgroundColor: LUNA.abyss }}
      >
        {PRODUCTS.map((product, index) => {
          const isActive = activeIndex === index;
          const isRevealed = revealedIndices.includes(index);
          const Icon = product.Icon;

          return (
            <div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                backgroundColor: LUNA.abyss,
                height: isActive ? '420px' : '100px',
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
                transition:
                  'height 500ms cubic-bezier(0.4,0,0.2,1), opacity 600ms ease, transform 600ms ease',
              }}
            >
              {/* Filtered background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${product.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: product.bgPosition,
                  backgroundRepeat: 'no-repeat',
                  filter: isActive
                    ? 'grayscale(0) brightness(1)'
                    : 'grayscale(1) brightness(0.6)',
                  transition: 'filter 500ms ease',
                }}
              />

              {/* Number — top-left */}
              <div
                className="absolute top-3 left-4 z-10 font-light text-xl"
                style={{
                  color: isActive ? LUNA.highlight : '#FFFFFF',
                  transition: 'color 300ms ease',
                  textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                }}
              >
                {product.id}
              </div>

              {/* Collapsed name + icon */}
              <div
                className="absolute inset-0 flex items-center justify-between px-5 z-10 pointer-events-none"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 400ms ease',
                }}
              >
                <span
                  className="font-bold uppercase tracking-[0.25em] text-sm ml-12"
                  style={{
                    color: '#FFFFFF',
                    textShadow: '0 2px 6px rgba(0,0,0,0.85)',
                  }}
                >
                  {product.name}
                </span>
                <IconBadge size={24}>
                  <Icon width={12} height={12} />
                </IconBadge>
              </div>

              {/* Active info — bottom panel. Tagline above; icon inline with title. */}
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
                <p
                  className="text-[10px] tracking-[0.25em] font-medium mb-1"
                  style={{ color: LUNA.highlight }}
                >
                  {product.tagline}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <IconBadge size={24}>
                    <Icon width={12} height={12} />
                  </IconBadge>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {product.name}
                  </h3>
                </div>
                <p className="text-xs text-white/75 mb-3 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <Link
                  href={product.link}
                  className="inline-block text-xs font-semibold tracking-[0.15em] px-5 py-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: LUNA.deepWater,
                    color: '#FFFFFF',
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
