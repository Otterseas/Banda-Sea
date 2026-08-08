'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NotifyMeButton } from '@/components/NotifyMe';
import RecentlyViewed from '@/components/RecentlyViewed';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import WhisperText from '@/components/WhisperText';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  pink: '#FF6B9D',
  cream: '#FAF7F1',
};

const SLUG = 'crochet-creatures';

// All product data preserved verbatim from the previous version (names,
// categories, prices, descriptions, productInfo, comingSoon flags, variant
// IDs). Images swapped to local crochet photos where there's a good match.
const ALL_PRODUCTS = [
  // Nudibranchs — one-of-a-kind handmade pieces, only 1 of each in stock
  {
    id: 'nudi-purple-white',
    name: 'Nudibranch — Purple & White',
    category: 'Nudibranchs',
    price: 12.5,
    timeToMake: '3-4 hours',
    description:
      'Soft lavender body, snowy white frill, and warm orange rhinophores — a quiet, dreamy little drifter.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'One-of-a-kind — only 1 in stock',
      'Slight natural variations in colour and shape',
    ],
    images: [
      '/images/products/Purple-nudis-product-shot.png',
      'https://cdn.shopify.com/s/files/1/0825/9108/8906/files/DL_02469.jpg?v=1778164867',
      'https://cdn.shopify.com/s/files/1/0825/9108/8906/files/purple-white-nud-01.jpg?v=1778164775',
    ],
    shopifyVariantId: '53007230468362',
    uses: 'Desk companion, dive bag charm, gift',
    comingSoon: false,
  },
  {
    id: 'nudi-black-white',
    name: 'Nudibranch — Black & White',
    category: 'Nudibranchs',
    price: 12.5,
    timeToMake: '3-4 hours',
    description:
      'Crisp white body with stark black gills and rhinophores — a pyjama-clad reef explorer.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'One-of-a-kind — only 1 in stock',
      'Slight natural variations in colour and shape',
    ],
    images: [
      '/images/products/black-white-nudis-product-shot.png',
      '/images/products/Black-white-crochet-nudi.jpg',
      'https://cdn.shopify.com/s/files/1/0825/9108/8906/files/Black-white-nudi-04_29805aa4-993f-4253-ac99-4901c3adff93.jpg?v=1778164626',
    ],
    shopifyVariantId: '53007231648010',
    uses: 'Desk companion, dive bag charm, gift',
    comingSoon: false,
  },
  {
    id: 'nudi-orange-blue',
    name: 'Nudibranch — Orange & Blue',
    category: 'Nudibranchs',
    price: 12.5,
    timeToMake: '3-4 hours',
    description:
      'Cool blue-grey body, vivid orange rhinophores, and a sunny yellow frill — bold reef contrast.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'One-of-a-kind — only 1 in stock',
      'Slight natural variations in colour and shape',
    ],
    images: [
      '/images/products/Blue-orange-crochet-nudi.jpg',
      '/images/products/Orange-blue-nudi.jpg',
      'https://cdn.shopify.com/s/files/1/0825/9108/8906/files/orange-blue-nudis-product-shot.png?v=1778163857',
    ],
    shopifyVariantId: '53007232696586',
    uses: 'Desk companion, dive bag charm, gift',
    comingSoon: false,
  },
  {
    id: 'nudi-black-green',
    name: 'Nudibranch — Black & Green',
    category: 'Nudibranchs',
    price: 12.5,
    timeToMake: '3-4 hours',
    description:
      'Inky black body laced with emerald-green frill and detail — a midnight-reef stand-out.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'One-of-a-kind — only 1 in stock',
      'Slight natural variations in colour and shape',
    ],
    images: [
      '/images/products/black-green-nudis-product-shot.png',
      'https://cdn.shopify.com/s/files/1/0825/9108/8906/files/green-black-nudi-04.jpg?v=1778164627',
    ],
    shopifyVariantId: '53007233057034',
    uses: 'Desk companion, dive bag charm, gift',
    comingSoon: false,
  },
  {
    id: 'nudi-orange-black',
    name: 'Nudibranch — Orange & Black',
    category: 'Nudibranchs',
    price: 12.5,
    timeToMake: '3-4 hours',
    description:
      'Black-cloaked body shot through with teal stripes and crowned with vivid orange rhinophores — sunset-on-the-reef energy.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'One-of-a-kind — only 1 in stock',
      'Slight natural variations in colour and shape',
    ],
    images: [
      '/images/products/Black-orange-nudi-product-shot.png',
      '/images/products/Black-orange-nudi-04.jpg',
    ],
    shopifyVariantId: '53007568896266',
    uses: 'Desk companion, dive bag charm, gift',
    comingSoon: false,
  },
  {
    id: 'nudi-red-purple',
    name: 'Nudibranch — Red & Purple',
    category: 'Nudibranchs',
    price: 12.5,
    timeToMake: '3-4 hours',
    description:
      'Coral-red body with playful lilac accents and golden rhinophores — full reef-disco vibes.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'One-of-a-kind — only 1 in stock',
      'Slight natural variations in colour and shape',
    ],
    images: [
      '/images/products/Red-purple-nudis.png',
      'https://cdn.shopify.com/s/files/1/0825/9108/8906/files/Red_1.jpg?v=1778164626',
    ],
    shopifyVariantId: '53007233679626',
    uses: 'Desk companion, dive bag charm, gift',
    comingSoon: false,
  },
  // Fish & Friends
  {
    id: 'fish-cowfish',
    name: 'Longhorn Cowfish',
    category: 'Fish & Friends',
    price: 25.0,
    timeToMake: '5-6 hours',
    description: 'The adorable Longhorn Cowfish with its distinctive horns and boxy shape.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 8-10cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=600',
      'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132348_b89869bc-a6a8-4b05-8d55-de1473481338.jpg?v=1770010707&width=600',
    ],
    shopifyVariantId: 'fish-cowfish-001',
    uses: 'Keychain, bag charm, rearview mirror, nursery decor',
    comingSoon: true,
  },
  {
    id: 'fish-frogfish',
    name: 'Hairy Frogfish',
    category: 'Fish & Friends',
    price: 25.0,
    timeToMake: '5-6 hours',
    description: 'The quirky Hairy Frogfish, master of camouflage and patience.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 8-10cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132348_b89869bc-a6a8-4b05-8d55-de1473481338.jpg?v=1770010707&width=600',
    ],
    shopifyVariantId: 'fish-frogfish-001',
    uses: 'Keychain, bag charm, rearview mirror, nursery decor',
    comingSoon: true,
  },
  {
    id: 'fish-seahorse',
    name: 'Pygmy Seahorse',
    category: 'Fish & Friends',
    price: 25.0,
    timeToMake: '5-6 hours',
    description: 'The delicate Pygmy Seahorse, tiny guardian of the coral fans.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 8-10cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=600',
    ],
    shopifyVariantId: 'fish-seahorse-001',
    uses: 'Keychain, bag charm, rearview mirror, nursery decor',
    comingSoon: true,
  },
  {
    id: 'fish-mandarin',
    name: 'Mandarin Fish',
    category: 'Fish & Friends',
    price: 25.0,
    timeToMake: '5-6 hours',
    description: 'The psychedelic Mandarin Fish with its swirling patterns of blue and orange.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 8-10cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=600',
    ],
    shopifyVariantId: 'fish-mandarin-001',
    uses: 'Keychain, bag charm, rearview mirror, nursery decor',
    comingSoon: true,
  },
  {
    id: 'fish-boxfish',
    name: 'Yellow Boxfish',
    category: 'Fish & Friends',
    price: 25.0,
    timeToMake: '5-6 hours',
    description: 'The cheerful Yellow Boxfish, a tiny cube of sunshine on the reef.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 8-10cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=600',
    ],
    shopifyVariantId: 'fish-boxfish-001',
    uses: 'Keychain, bag charm, rearview mirror, nursery decor',
    comingSoon: true,
  },
  // Baby Mobiles
  {
    id: 'mobile-ocean',
    name: 'Ocean Explorer Mobile',
    category: 'Baby Mobiles',
    price: 105.0,
    timeToMake: '15-20 hours',
    description:
      'A stunning handmade baby mobile featuring a collection of miniature ocean creatures, perfect as a nursery centrepiece.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 30cm diameter',
      'Includes wooden hoop and hanging cord',
      'Features 5-6 miniature sea creatures',
      'Each one unique - slight variations in colour and shape',
    ],
    images: ['/images/products/Crochet-nudis-table-shot.png'],
    shopifyVariantId: 'mobile-ocean-001',
    uses: "Nursery centrepiece, baby shower gift, children's room decor",
    comingSoon: true,
  },
];

// Story narrative — content is rich JSX so we can highlight the key
// 'handmade / custom / time-it-takes' phrases in pink.
const Highlight = ({ children }) => (
  <span className="font-semibold" style={{ color: '#FF6B9D' }}>
    {children}
  </span>
);

const STORY_SECTIONS = [
  {
    id: 'born-from-reef',
    title: 'Born from the reef.',
    eyebrow: 'THE CRAFT',
    content: (
      <>
        Every creature in our collection is{' '}
        <Highlight>designed and handcrafted by a single artist</Highlight>, who
        draws each pattern from scratch — no templates, no kits, just pure
        creativity. Inspired by the animals we&rsquo;ve encountered underwater,
        from the psychedelic swirls of a nudibranch, the grumpy pout of a
        frogfish, the delicate curl of a pygmy seahorse. It&rsquo;s{' '}
        <Highlight>original artwork you can hold in your hand</Highlight>.
      </>
    ),
    image: '/images/products/Crochet-nudis-hero-image.png',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'pencil-before-yarn',
    title: 'Pencil before yarn.',
    eyebrow: 'ON THE DRAWING BOARD',
    content: (
      <>
        Before any stitch, there&rsquo;s a <Highlight>sketch</Highlight>. Body,
        fins, frill, and colour palette — all worked out on screen long before
        the yarn comes out. Sometimes it&rsquo;s a single nudibranch. Sometimes
        it&rsquo;s a whole imagined scene, like our{' '}
        <Highlight>Under the Sea mobile</Highlight> — eight creatures planned,
        named, and coloured on one page. Only when the design{' '}
        <Highlight>feels right</Highlight> do we pick up the hook.
      </>
    ),
    image: '/images/products/crochet-creatures-planning.jpg',
    aspect: 'aspect-[4/3]',
    // Source is a portrait iPad shot. Bias upward so the sketch + palette
    // stay framed when object-cover crops the top/bottom.
    objectPosition: 'center 35%',
  },
  {
    id: 'every-stitch',
    title: 'Every stitch tells a story.',
    eyebrow: 'THE TIME IT TAKES',
    content: (
      <>
        Each creature is crocheted by hand using <Highlight>100% cotton yarn</Highlight>.{' '}
        <Highlight>No machines, no patterns, no shortcuts</Highlight>. A single
        nudibranch takes <Highlight>3–4 hours</Highlight>. A fish or seahorse
        takes <Highlight>5–6 hours</Highlight>. That&rsquo;s why no two are ever
        exactly the same — and why each one is{' '}
        <Highlight>so uniquely special</Highlight>.
      </>
    ),
    image: '/images/products/Crochet-nudis-red-purple.png',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'made-to-be-loved',
    title: 'Made to be loved.',
    eyebrow: 'BUILT TO TRAVEL WITH YOU',
    content: (
      <>
        Whether it&rsquo;s a keychain clipped to your dive bag, a frogfish
        hanging from your rearview mirror, or a nudibranch keeping watch on your
        desk — these creatures are{' '}
        <Highlight>designed to travel with you</Highlight>. Each one becomes a
        small, personal reminder of the dives that meant the most.
      </>
    ),
    image: '/images/products/Octopus-crochet-web.jpg',
    aspect: 'aspect-[4/3]',
    // Portrait source cropped to landscape — only vertical position is
    // honoured. 22% keeps the octopus head + body + tentacles framed.
    objectPosition: '50% 22%',
  },
];

// Photos that scroll in an infinite horizontal band beneath the Custom Orders
// callout. Order is mixed so adjacent images don't share a colour palette.
// Mix of local crochet shots and Shopify-hosted product photos.
const GALLERY_IMAGES = [
  '/images/products/Crochet-nudis-table-shot.png',
  '/images/products/Blue-orange-crochet-nudi.jpg',
  'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=900',
  '/images/products/Octopus-crochet-web.jpg',
  '/images/products/Crochet-nudis-red-purple.png',
  'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=900',
  '/images/products/black-green-nudis-product-shot.png',
  '/images/products/Black-white-crochet-nudi.jpg',
  '/images/products/Crochet-nudis-hero-image.png',
  'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132348_b89869bc-a6a8-4b05-8d55-de1473481338.jpg?v=1770010707&width=900',
  '/images/products/Purple-nudis-product-shot.png',
  '/images/products/Crochet-octopus.png',
  '/images/products/Red-purple-nudis.png',
  '/images/products/black-white-nudis-product-shot.png',
  '/images/products/Crochet-nudis-black-white.png',
];

const RELATED_PRODUCTS = [
  {
    name: 'The Surface Tank',
    href: '/products/surface-tank',
    image: '/images/products/The-surface-tank-sunset.jpg',
    priceLabel: '£35',
    originalPriceLabel: '£40',
    quickAdd: {
      shopifyVariantId: '52453682807050',
      name: 'The Surface Tank - Deep Ocean',
      price: 35.0,
    },
  },
  {
    name: 'The Dive Journal',
    href: '/products/dive-journal',
    image: '/images/products/The-dive-journal-product-shot.jpg',
    priceLabel: 'From £28',
    quickAdd: {
      shopifyVariantId: '49658874331402',
      name: 'The Dive Journal',
      price: 28.0,
    },
  },
  {
    name: 'Location Stickers',
    href: '/stickers',
    image: '/images/products/Location-stickers-close-up.jpg',
    priceLabel: 'From £1.00',
    quickAdd: null,
  },
  {
    name: 'Fun Stickers',
    href: '/products/fun-stickers',
    image:
      'https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare-MarketingImage.jpg?v=1746535285&width=600',
    priceLabel: 'From £3.50',
    quickAdd: null,
  },
];

// =============== Product card ===============

function ProductCard({ product, formatPrice, onPreview, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onPreview}
      className="flex-shrink-0 w-44 md:w-48 cursor-pointer"
    >
      <div
        className="aspect-square rounded-xl overflow-hidden mb-2.5 relative bg-white border"
        style={{ borderColor: '#E6EEF2' }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.comingSoon && (
          <div
            className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]"
            style={{ backgroundColor: 'rgba(2, 56, 89, 0.35)' }}
          >
            <span
              className="text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{ backgroundColor: COLORS.pink, color: 'white', boxShadow: `0 4px 14px ${COLORS.pink}50` }}
            >
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <h4 className="text-sm font-semibold leading-tight truncate" style={{ color: COLORS.deepWater }}>
        {product.name}
      </h4>
      <div className="flex items-baseline gap-2 mt-0.5">
        <p className="text-sm font-bold" style={{ color: COLORS.deepWater }}>
          {formatPrice(product.price)}
        </p>
        {product.timeToMake && (
          <p className="text-[10px] tracking-wider uppercase" style={{ color: COLORS.midDepth }}>
            · {product.timeToMake}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// =============== Carousel ===============

function ProductCarousel({ title, subtitle, products, onProductClick, formatPrice }) {
  const scrollRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 5);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: direction * 220, behavior: 'smooth' });
  };

  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-[11px] tracking-[0.25em] font-semibold mb-1" style={{ color: COLORS.pink }}>
            COLLECTION
          </p>
          <h3 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.deepWater }}>
            <WhisperText text={title} wordDelay={0.14} duration={0.9} />
          </h3>
          {subtitle && <p className="text-xs text-gray-500 mt-1.5">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Previous"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border hover:scale-105"
            style={{ borderColor: `${COLORS.surfaceTeal}40`, color: COLORS.deepWater }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Next"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border hover:scale-105"
            style={{ borderColor: `${COLORS.surfaceTeal}40`, color: COLORS.deepWater }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            onPreview={() => onProductClick(p)}
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </div>
  );
}

// =============== Modal ===============

function ProductModal({ product, isOpen, onClose, formatPrice, onAddToCart }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (product) setImgIdx(0);
  }, [product?.id]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(2, 56, 89, 0.45)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative grid md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100"
              style={{ color: COLORS.deepWater }}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="aspect-square md:aspect-auto md:min-h-[440px] relative" style={{ backgroundColor: COLORS.cream }}>
              <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setImgIdx((i) => (i - 1 + product.images.length) % product.images.length)}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImgIdx((i) => (i + 1) % product.images.length)}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="p-6 md:p-7 flex flex-col">
              <p
                className="text-[11px] tracking-[0.25em] font-semibold mb-2"
                style={{ color: COLORS.pink }}
              >
                {product.category.toUpperCase()}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3" style={{ color: COLORS.deepWater }}>
                {product.name}
              </h3>
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-bold" style={{ color: COLORS.deepWater }}>
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs tracking-wider uppercase" style={{ color: COLORS.midDepth }}>
                  · {product.timeToMake}
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">{product.description}</p>

              <ul className="space-y-1.5 mb-5">
                {product.productInfo.map((info, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span style={{ color: COLORS.surfaceTeal }}>•</span>
                    {info}
                  </li>
                ))}
              </ul>

              {product.uses && (
                <p className="text-xs text-gray-500 italic mb-6">Perfect for: {product.uses}</p>
              )}

              {product.comingSoon ? (
                <div className="mt-auto">
                  <div
                    className="rounded-xl p-4 mb-3 border"
                    style={{ borderColor: `${COLORS.pink}30`, backgroundColor: `${COLORS.pink}10` }}
                  >
                    <p className="text-xs tracking-[0.25em] font-bold uppercase mb-1" style={{ color: COLORS.pink }}>
                      Coming Soon
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Each piece is handmade — there&rsquo;s a queue. Sign up below to be notified
                      the moment {product.name} is available.
                    </p>
                  </div>
                  <NotifyMeButton
                    productName={product.name}
                    variantId={product.shopifyVariantId}
                    variant="light"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="mt-auto w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                >
                  Add to Cart · {formatPrice(product.price)}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============== Infinite-scroll gallery ===============
// Continuously scrolls a row of product photos. The track is doubled so the
// loop wraps seamlessly at -50% translation. Edges fade via mask-image so
// images don't pop on/off against the cream background.
function InfiniteScrollGallery({ images }) {
  const duplicated = [...images, ...images];

  return (
    <div className="w-full">
      <style>{`
        @keyframes crochet-gallery-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .crochet-gallery-track {
          animation: crochet-gallery-scroll 70s linear infinite;
          will-change: transform;
        }
        /* Pause from the wrapper so the mask layer doesn't swallow the
           hover state away from the animated track. */
        .crochet-gallery-wrapper:hover .crochet-gallery-track {
          animation-play-state: paused;
        }
        .crochet-gallery-mask {
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%);
          mask: linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%);
        }
        .crochet-gallery-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .crochet-gallery-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 18px 40px rgba(2, 56, 89, 0.18);
        }
      `}</style>
      <div className="crochet-gallery-wrapper crochet-gallery-mask w-full overflow-hidden">
        <div className="crochet-gallery-track flex gap-5 md:gap-6 w-max">
          {duplicated.map((src, i) => (
            <div
              key={i}
              className="crochet-gallery-card flex-shrink-0 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden bg-white border shadow-md"
              style={{ borderColor: '#E6EEF2' }}
            >
              <img
                src={src}
                alt="Handmade crochet marine creature by Otterseas"
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============== Main page ===============

export default function CrochetCreaturesPage() {
  const { formatPrice } = useCurrency();
  const { addToCart, openCart } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    addToRecentlyViewed({
      id: SLUG,
      name: 'Crochet Creatures',
      slug: SLUG,
      image: '/images/products/Crochet-nudis-hero-image.png',
      price: 17.5,
      type: 'product',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nudibranchs = ALL_PRODUCTS.filter((p) => p.category === 'Nudibranchs');
  const fishFriends = ALL_PRODUCTS.filter((p) => p.category === 'Fish & Friends');
  const babyMobiles = ALL_PRODUCTS.filter((p) => p.category === 'Baby Mobiles');

  const openSideCart = () => {
    if (openCart) openCart();
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: COLORS.cream }}
    >
      <Header variant="light" currentPath={`/products/${SLUG}`} />

      {/* ============ HERO ============ */}
      <section className="bg-white px-4 md:px-8 pt-10 md:pt-14 pb-12 md:pb-14">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm tracking-[0.28em] font-semibold mb-4"
            style={{ color: COLORS.pink }}
          >
            HANDMADE WITH LOVE
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-5"
            style={{
              background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, ${COLORS.pink} 50%, ${COLORS.deepWater} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <WhisperText text="Crochet creatures." wordDelay={0.18} duration={1.2} />
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            From a single artist&rsquo;s hands to your dive bag, your desk or the nursery — original
            crochet sea creatures, designed and made one stitch at a time.
          </p>
        </div>
      </section>

      {/* ============ STORY SECTIONS — alternating image/text rows ============ */}
      <section className="bg-white px-4 md:px-8 py-14 md:py-20">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {STORY_SECTIONS.map((story, idx) => {
            const imageLeft = idx % 2 === 0;
            return (
              <div
                key={story.id}
                className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: imageLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`${story.aspect || 'aspect-[4/3]'} rounded-2xl overflow-hidden relative ${
                    imageLeft ? 'order-1' : 'md:order-2 order-1'
                  }`}
                  style={{ backgroundColor: COLORS.cream }}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: story.objectPosition || 'center' }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={imageLeft ? 'order-2' : 'md:order-1 order-2'}
                >
                  <p
                    className="text-xs tracking-[0.3em] font-semibold mb-3"
                    style={{ color: COLORS.pink }}
                  >
                    {story.eyebrow}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                    style={{ color: COLORS.deepWater }}
                  >
                    <WhisperText text={story.title} wordDelay={0.16} duration={1.0} />
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">{story.content}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ PRODUCT CAROUSELS ============ */}
      <section className="px-4 md:px-8 pt-12 md:pt-16 pb-4 md:pb-6" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <ProductCarousel
            title="Nudibranchs."
            subtitle="Tiny, vivid, and full of character — the reef's most photogenic critters."
            products={nudibranchs}
            onProductClick={setSelectedProduct}
            formatPrice={formatPrice}
          />
          <ProductCarousel
            title="Fish & Friends."
            subtitle="Frogfish, seahorses, boxfish and more — quirky companions for every diver."
            products={fishFriends}
            onProductClick={setSelectedProduct}
            formatPrice={formatPrice}
          />
        </div>
      </section>

      {/* ============ CUSTOM ORDER CALLOUT + INFINITE-SCROLL GALLERY ============ */}
      <section className="pt-6 md:pt-8 pb-14 md:pb-20" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center mb-10 md:mb-14">
          <p
            className="text-xs tracking-[0.3em] font-semibold mb-3"
            style={{ color: COLORS.pink }}
          >
            CUSTOM ORDERS WELCOME
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{
              background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, ${COLORS.pink} 50%, ${COLORS.deepWater} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <WhisperText text="Got a creature in mind?" wordDelay={0.16} duration={1.0} />
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-7 max-w-xl mx-auto">
            Specific colours to match your <Highlight>dive gear</Highlight>? A
            bespoke piece for a <Highlight>baby shower</Highlight>? A creature
            we haven&rsquo;t made yet? Drop us a line and we&rsquo;ll create
            <Highlight> something special</Highlight> together.
          </p>
          <a
            href="mailto:info@otterseas.com?subject=Custom%20Crochet%20Order"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all hover:scale-105"
            style={{
              backgroundColor: COLORS.deepWater,
              color: 'white',
              boxShadow: `0 6px 20px ${COLORS.deepWater}30`,
            }}
          >
            Request Custom Order
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Full-width infinite-scroll photo band */}
        <InfiniteScrollGallery images={GALLERY_IMAGES} />
      </section>

      {/* ============ CUSTOMERS ALSO LOVE ============ */}
      <section className="px-4 md:px-8 py-14 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              CUSTOMERS ALSO LOVE
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {RELATED_PRODUCTS.map((rp, i) => (
              <motion.div
                key={rp.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden border transition-shadow hover:shadow-md flex flex-col"
                style={{ borderColor: '#E6EEF2' }}
              >
                <Link href={rp.href} className="block overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-base leading-tight mb-1" style={{ color: COLORS.deepWater }}>
                    {rp.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
                    {rp.priceLabel}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href={rp.href}
                      className="block text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors"
                      style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                    >
                      View Product
                    </Link>
                    {rp.quickAdd ? (
                      <button
                        type="button"
                        onClick={() => {
                          addToCart({
                            id: rp.quickAdd.shopifyVariantId,
                            shopifyVariantId: rp.quickAdd.shopifyVariantId,
                            name: rp.quickAdd.name,
                            price: rp.quickAdd.price,
                            image: rp.image,
                            type: 'product',
                          });
                          openSideCart();
                        }}
                        className="block w-full text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors border hover:bg-gray-50"
                        style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, backgroundColor: 'white' }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <Link
                        href={rp.href}
                        className="block text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors border hover:bg-gray-50"
                        style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, backgroundColor: 'white' }}
                      >
                        Choose Options
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed excludeId={SLUG} variant="light" />
      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        formatPrice={formatPrice}
        onAddToCart={(p) => {
          addToCart({
            id: p.shopifyVariantId,
            shopifyVariantId: p.shopifyVariantId,
            name: p.name,
            price: p.price,
            image: p.images[0],
            type: 'product',
          });
        }}
      />
    </div>
  );
}
