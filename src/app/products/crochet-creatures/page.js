'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ===========================================
// LUNA COLOR PALETTE
// ===========================================
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// ===========================================
// PRODUCT DATA WITH DETAILS FOR MODALS
// ===========================================
const ALL_PRODUCTS = [
  // Nudibranchs
  {
    id: 'nudi-spanish-dancer',
    name: 'Spanish Dancer',
    category: 'Nudibranchs',
    price: 17.50,
    timeToMake: '3-4 hours',
    description: 'Inspired by the graceful Spanish Dancer nudibranch, known for its flowing crimson form.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=600',
    ],
    shopifyVariantId: 'nudi-spanish-dancer-001',
    uses: 'Keychain, bag charm, desk companion',
    comingSoon: true,
  },
  {
    id: 'nudi-chromodoris',
    name: 'Chromodoris',
    category: 'Nudibranchs',
    price: 17.50,
    timeToMake: '3-4 hours',
    description: 'Based on the vibrant Chromodoris species with their striking colour patterns.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=600',
    ],
    shopifyVariantId: 'nudi-chromodoris-001',
    uses: 'Keychain, bag charm, desk companion',
    comingSoon: true,
  },
  {
    id: 'nudi-nembrotha',
    name: 'Nembrotha',
    category: 'Nudibranchs',
    price: 17.50,
    timeToMake: '3-4 hours',
    description: 'Capturing the bold colours of the Nembrotha nudibranch family.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=600',
    ],
    shopifyVariantId: 'nudi-nembrotha-001',
    uses: 'Keychain, bag charm, desk companion',
    comingSoon: true,
  },
  {
    id: 'nudi-phyllidia',
    name: 'Phyllidia',
    category: 'Nudibranchs',
    price: 17.50,
    timeToMake: '3-4 hours',
    description: 'The striking Phyllidia with its distinctive bumpy texture and bold patterns.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=600',
    ],
    shopifyVariantId: 'nudi-phyllidia-001',
    uses: 'Keychain, bag charm, desk companion',
    comingSoon: true,
  },
  {
    id: 'nudi-flabellina',
    name: 'Flabellina',
    category: 'Nudibranchs',
    price: 17.50,
    timeToMake: '3-4 hours',
    description: 'The delicate Flabellina with its feathery cerata and vibrant purple hues.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 6-8cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=600',
    ],
    shopifyVariantId: 'nudi-flabellina-001',
    uses: 'Keychain, bag charm, desk companion',
    comingSoon: true,
  },
  // Fish & Friends
  {
    id: 'fish-cowfish',
    name: 'Longhorn Cowfish',
    category: 'Fish & Friends',
    price: 25.00,
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
    price: 25.00,
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
    price: 25.00,
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
    price: 25.00,
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
    price: 25.00,
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
    price: 105.00,
    timeToMake: '15-20 hours',
    description: 'A stunning handmade baby mobile featuring a collection of miniature ocean creatures, perfect as a nursery centrepiece.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 30cm diameter',
      'Includes wooden hoop and hanging cord',
      'Features 5-6 miniature sea creatures',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://fy3d04d7fsncz1uz-82591088906.shopifypreview.com/cdn/shop/files/IMG-20260109-WA0009.jpg?v=1770010474&width=990',
    ],
    shopifyVariantId: 'mobile-ocean-001',
    uses: 'Nursery centrepiece, baby shower gift, children\'s room decor',
    comingSoon: true,
  },
];

// ===========================================
// STORY SECTIONS - Left Panel Content
// ===========================================
const STORY_SECTIONS = [
  {
    id: 'born-from-reef',
    title: 'Born From The Reef',
    content: 'Every creature in our collection is designed and handcrafted by a very talented artist, who creates each pattern from scratch — no templates, no kits, just pure creativity.\n\nInspired by the animals we\'ve encountered underwater, from the psychedelic swirls of a nudibranch, the grumpy pout of a frogfish, the delicate curl of a pygmy seahorse. It\'s original artwork you can hold in your hand.',
    image: 'https://fy3d04d7fsncz1uz-82591088906.shopifypreview.com/cdn/shop/files/IMG_20260202_130533_587.jpg?v=1770009456&width=990',
  },
  {
    id: 'every-stitch',
    title: 'Every Stitch Tells a Story',
    content: 'Each creature is crocheted by hand using 100% cotton yarn. There are no machines, no patterns, no shortcuts. A single nudibranch takes 3–4 hours. A fish or seahorse takes 5–6. Our baby mobiles take 15–20 hours of dedicated work.\n\nThat\'s why no two are ever exactly the same — and why each one is so uniquely special!',
    image: 'https://fy3d04d7fsncz1uz-82591088906.shopifypreview.com/cdn/shop/files/20260202_132348_b89869bc-a6a8-4b05-8d55-de1473481338.jpg?v=1770010707&width=990',
  },
  {
    id: 'made-to-be-loved',
    title: '',
    content: 'Whether it\'s a keychain clipped to your dive bag, a frogfish hanging from your rearview mirror, or a nudibranch keeping watch on your desk — these creatures are designed to travel with you. And for the littlest ocean lovers, our baby mobiles bring the underwater world into the nursery.',
    image: 'https://fy3d04d7fsncz1uz-82591088906.shopifypreview.com/cdn/shop/files/IMG-20260109-WA0009.jpg?v=1770010474&width=990',
  },
  {
    id: 'custom-orders',
    title: 'Custom Orders Welcome',
    content: 'Got a favourite creature we haven\'t made yet? Specific colours to match your dive gear? A bespoke mobile for a baby shower? We love a challenge. Drop us a line and let\'s create something special together.',
    cta: {
      text: 'Request Custom Order',
      email: 'info@otterseas.com',
    },
  },
];

// ===========================================
// PRODUCT CARD COMPONENT - With Coming Soon
// ===========================================
function ProductCard({ product, onClick, formatPrice }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isComingSoon = product.comingSoon;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      className="flex-shrink-0 w-48 cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(product)}
    >
      {/* Image */}
      <div 
        className="aspect-square rounded-xl overflow-hidden mb-2 relative group"
        style={{ 
          border: `2px solid ${LUNA.highlight}30`,
        }}
      >
        <img 
          src={product.images[currentImageIndex]} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <div 
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ backgroundColor: `${LUNA.abyss}70` }}
          >
            <span className="text-white text-xs font-medium px-4 py-1.5 rounded-full border border-white/50 backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
        )}

        {/* Image navigation - only show if multiple images */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Info */}
      <h4 
        className="text-sm font-semibold truncate"
        style={{ color: LUNA.deepWater }}
      >
        {product.name}
      </h4>
      <p className="text-sm font-bold" style={{ color: LUNA.surfaceTeal }}>
        {formatPrice(product.price)}
      </p>
      {product.timeToMake && (
        <p className="text-xs text-gray-400">{product.timeToMake}</p>
      )}
    </motion.div>
  );
}

// ===========================================
// PRODUCT CAROUSEL COMPONENT
// ===========================================
function ProductCarousel({ title, subtitle, products, onProductClick, formatPrice }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll);
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 220, behavior: 'smooth' });
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold" style={{ color: LUNA.deepWater }}>
          {title}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ 
              backgroundColor: canScrollLeft ? `${LUNA.surfaceTeal}20` : 'transparent',
              color: canScrollLeft ? LUNA.surfaceTeal : '#D1D5DB',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ 
              backgroundColor: canScrollRight ? `${LUNA.surfaceTeal}20` : 'transparent',
              color: canScrollRight ? LUNA.surfaceTeal : '#D1D5DB',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 mb-4">{subtitle}</p>
      )}

      {/* Scrollable Row */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </div>
  );
}

// ===========================================
// PRODUCT MODAL COMPONENT
// ===========================================
function ProductModal({ product, isOpen, onClose, formatPrice }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart, openCart } = useCart();

  if (!product) return null;

  const isComingSoon = product.comingSoon;

  const handleAddToCart = () => {
    if (isComingSoon) return;
    addToCart({
      id: product.shopifyVariantId,
      shopifyVariantId: product.shopifyVariantId,
      name: product.name,
      price: product.price,
      image: product.images[0],
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

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Coming Soon Overlay on Modal */}
                {isComingSoon && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: `${LUNA.abyss}60` }}
                  >
                    <span className="text-white text-sm font-medium px-6 py-2 rounded-full border border-white/50 backdrop-blur-sm">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Image dots */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className="w-2 h-2 rounded-full transition-all"
                        style={{ 
                          backgroundColor: activeImageIndex === index ? LUNA.surfaceTeal : 'rgba(255,255,255,0.8)',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-1" style={{ color: LUNA.deepWater }}>
                  {product.name}
                </h2>
                <p className="text-xs text-gray-400 mb-3">{product.category} • {product.timeToMake}</p>
                
                <p className="text-xl font-bold mb-4" style={{ color: LUNA.surfaceTeal }}>
                  {formatPrice(product.price)}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Uses */}
                {product.uses && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-1">PERFECT FOR</p>
                    <p className="text-sm text-gray-600">{product.uses}</p>
                  </div>
                )}

                {/* Product Info */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 mb-2">PRODUCT INFO</p>
                  <ul className="space-y-1">
                    {product.productInfo.map((info, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span style={{ color: LUNA.surfaceTeal }}>•</span>
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                {isComingSoon ? (
                  <div 
                    className="w-full py-3 rounded-xl text-sm font-semibold text-center"
                    style={{ 
                      backgroundColor: `${LUNA.deepWater}10`,
                      color: LUNA.midDepth,
                      border: `2px solid ${LUNA.midDepth}30`,
                    }}
                  >
                    Coming Soon
                  </div>
                ) : (
                  <motion.button
                    onClick={handleAddToCart}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ 
                      background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                      color: 'white',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                )}
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
export default function CrochetCreaturesPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { formatPrice } = useCurrency();

  // Group products by category
  const nudibranchs = ALL_PRODUCTS.filter(p => p.category === 'Nudibranchs');
  const fishFriends = ALL_PRODUCTS.filter(p => p.category === 'Fish & Friends');
  const babyMobiles = ALL_PRODUCTS.filter(p => p.category === 'Baby Mobiles');

  return (
    <div 
      className="min-h-screen w-full bg-white"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== HEADER - SHARED COMPONENT ==================== */}
      <Header variant="light" currentPath="/products/crochet-creatures" hideOnScroll={false} />

      {/* ==================== SPLIT PANEL LAYOUT ==================== */}
      <div className="flex flex-col lg:flex-row pt-14 lg:h-[calc(100vh-56px)]">

        {/* LEFT PANEL - Story (scrollable independently) */}
        <div
          className="w-full lg:w-1/2 overflow-y-auto lg:h-full"
          style={{
            background: `linear-gradient(180deg, white 0%, ${LUNA.highlight}08 100%)`,
          }}
        >
          <div className="p-8 lg:p-12">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <span className="text-xs font-medium tracking-widest" style={{ color: LUNA.surfaceTeal }}>
                HANDCRAFTED WITH LOVE
              </span>
              <h1 
                className="text-3xl lg:text-4xl font-bold mt-2 mb-4"
                style={{ color: LUNA.deepWater }}
              >
                Crochet Creatures
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Unique, handmade marine animals crafted with care. Each piece takes hours of dedicated 
                handwork – and no two are ever exactly alike.
              </p>
            </motion.div>

            {/* Story Sections */}
            {STORY_SECTIONS.map((section, index) => {
              // Alternate image alignment: even = right, odd = left
              const imageAlign = index % 2 === 0 ? 'right' : 'left';

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="mb-10 overflow-hidden"
                >
                  {section.title && (
                    <motion.h2
                      initial={{ opacity: 0, x: imageAlign === 'left' ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-xl font-bold mb-3"
                      style={{ color: LUNA.deepWater }}
                    >
                      {section.title}
                    </motion.h2>
                  )}

                  <div className="text-gray-600 text-sm leading-relaxed">
                    {/* Floating image with text wrap */}
                    {section.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`${imageAlign === 'right' ? 'float-right ml-4' : 'float-left mr-4'} mb-3 w-2/5 max-w-[180px]`}
                      >
                        <div
                          className="rounded-xl overflow-hidden"
                          style={{ boxShadow: `0 8px 30px ${LUNA.deepWater}15` }}
                        >
                          <img
                            src={section.image}
                            alt={section.title || 'Story image'}
                            className="w-full h-auto"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Text content */}
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
                        {paragraph}
                      </p>
                    ))}

                    {/* Clear float */}
                    <div className="clear-both" />
                  </div>

                  {section.cta && (
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      href={`mailto:${section.cta.email}`}
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                        color: 'white',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      {section.cta.text}
                    </motion.a>
                  )}
                </motion.div>
              );
            })}

            {/* Pricing Context */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600 mb-4 italic"
            >
              Our pricing reflects the time, skill, and love poured into each handmade piece.
            </motion.p>

            {/* Time Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl mb-8"
              style={{
                background: `linear-gradient(135deg, ${LUNA.highlight}20 0%, ${LUNA.surfaceTeal}10 100%)`,
                border: `1px solid ${LUNA.highlight}40`,
              }}
            >
              <h3 className="font-bold mb-3" style={{ color: LUNA.deepWater }}>
                Time & Love In Every Stitch
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span style={{ color: LUNA.surfaceTeal }}>•</span>
                  <strong>Nudibranchs:</strong> 3-4 hours each
                </p>
                <p className="flex items-center gap-2">
                  <span style={{ color: LUNA.surfaceTeal }}>•</span>
                  <strong>Fish & Friends:</strong> 5-6 hours each
                </p>
                <p className="flex items-center gap-2">
                  <span style={{ color: LUNA.surfaceTeal }}>•</span>
                  <strong>Baby Mobiles:</strong> 15-20 hours each
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - Products (scrollable independently) */}
        <div
          className="w-full lg:w-1/2 overflow-y-auto lg:h-full border-l border-gray-100"
          style={{ background: 'white' }}
        >
          <div className="p-6 lg:p-8">
            {/* Coming Soon Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 rounded-xl text-center"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.highlight}15 0%, ${LUNA.surfaceTeal}15 100%)`,
                border: `1px solid ${LUNA.highlight}30`,
              }}
            >
              <span className="text-xl mb-1 block">🧶</span>
              <h3 className="font-semibold text-sm mb-1" style={{ color: LUNA.deepWater }}>
                Products Coming Soon
              </h3>
              <p className="text-gray-500 text-xs">
                Our creatures are being lovingly crafted. Check back soon or request a custom order!
              </p>
            </motion.div>

            {/* Nudibranchs Carousel */}
            <ProductCarousel
              title="Nudibranchs"
              subtitle={`${formatPrice(17.50)} each • Perfect as keychains, bag charms, desk companions`}
              products={nudibranchs}
              onProductClick={(product) => setSelectedProduct(product)}
              formatPrice={formatPrice}
            />

            {/* Fish & Friends Carousel */}
            <ProductCarousel
              title="Fish & Friends"
              subtitle={`${formatPrice(25)} each • Perfect as keychains, bag charms, rearview mirror hangers`}
              products={fishFriends}
              onProductClick={(product) => setSelectedProduct(product)}
              formatPrice={formatPrice}
            />

            {/* Baby Mobiles */}
            <ProductCarousel
              title="Baby Mobiles"
              subtitle={`${formatPrice(105)} each • Perfect as nursery centrepiece, baby shower gift`}
              products={babyMobiles}
              onProductClick={(product) => setSelectedProduct(product)}
              formatPrice={formatPrice}
            />

            {/* Custom Orders CTA */}
            <div 
              className="mt-8 p-6 rounded-xl text-center"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.highlight}15 0%, ${LUNA.surfaceTeal}10 100%)`,
                border: `1px solid ${LUNA.highlight}30`,
              }}
            >
              <h3 className="font-bold mb-2" style={{ color: LUNA.deepWater }}>
                Looking for Something Special?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                We love creating custom pieces – your favourite creature, specific colours, or a bespoke mobile.
              </p>
              <a
                href="mailto:info@otterseas.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                  color: 'white',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Request Custom Order
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        formatPrice={formatPrice}
      />

      {/* ==================== FOOTER - SHARED COMPONENT ==================== */}
      <Footer />
    </div>
  );
}
