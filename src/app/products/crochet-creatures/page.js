'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

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
  },
  {
    id: 'fish-boxfish',
    name: 'Yellow Boxfish',
    category: 'Fish & Friends',
    price: 25.00,
    timeToMake: '5-6 hours',
    description: 'The cheerful Yellow Boxfish with its polka-dotted cube-shaped body.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Approximately 8-10cm in size',
      'Includes keychain/bag charm attachment',
      'Each one unique - slight variations in colour and shape',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132348_b89869bc-a6a8-4b05-8d55-de1473481338.jpg?v=1770010707&width=600',
    ],
    shopifyVariantId: 'fish-boxfish-001',
    uses: 'Keychain, bag charm, rearview mirror, nursery decor',
  },
  // Baby Mobiles
  {
    id: 'mobile-ocean-dreams',
    name: 'Ocean Dreams Mobile',
    category: 'Baby Mobiles',
    price: 105.00,
    timeToMake: '15-20 hours',
    description: 'A stunning nursery centrepiece featuring a collection of hand-crocheted sea creatures.',
    productInfo: [
      'Handmade with 100% cotton yarn',
      'Includes 5-6 individual creatures',
      'Wooden hoop frame included',
      'Approximately 30cm diameter',
      'Custom colour schemes available on request',
    ],
    images: [
      'https://38a44d-4c.myshopify.com/cdn/shop/files/IMG-20260109-WA0009.jpg?v=1770010474&width=600',
    ],
    shopifyVariantId: 'mobile-ocean-dreams-001',
    uses: 'Nursery centrepiece, baby shower gift, christening present',
  },
];

// ===========================================
// STORY CONTENT
// ===========================================
const STORY_SECTIONS = [
  {
    id: 'intro',
    title: 'Every Creature Has a Story',
    content: `What started as a way to bring the ocean home has grown into something truly special. Each creature 
              we create is a tiny tribute to the incredible marine life we've encountered beneath the waves.`,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=800',
  },
  {
    id: 'sketch',
    title: 'It Starts With a Sketch',
    content: `Every creature begins its journey on paper. We study real marine life – the way a nudibranch's 
              gills flutter, the curious expression of a cowfish, the delicate curl of a seahorse's tail. 
              These aren't just toys; they're tiny portraits of the ocean's most fascinating characters.`,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/IMG_20260202_130533_587.jpg?v=1770009456&width=800',
  },
  {
    id: 'craft',
    title: 'The Craft Behind Each Piece',
    content: `From sketch to finished creature, each piece represents hours of careful handwork. A small 
              nudibranch takes 3-4 hours, while larger fish need 5-6 hours of patient stitching. Our baby 
              mobiles? They're a labour of love at 15-20 hours each. This time is reflected in every detail – 
              from perfectly placed eyes to delicately shaped fins.`,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=800',
  },
  {
    id: 'unique',
    title: 'No Two Are Alike',
    content: `Because they're handmade, each creature has its own personality. A slightly different expression, 
              a unique quirk, a subtle variation in colour. Just like their real-life counterparts swimming 
              in our oceans, no two are ever exactly the same. That's not a flaw – it's what makes them special.`,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132348_b89869bc-a6a8-4b05-8d55-de1473481338.jpg?v=1770010707&width=800',
  },
  {
    id: 'nursery',
    title: 'From Ocean to Nursery',
    content: `Our baby mobiles bring the calm of the ocean into your little one's world. Each mobile features 
              a carefully curated collection of sea creatures, gently spinning and swaying to capture curious eyes. 
              Perfect for ocean-loving families, these mobiles make a truly special gift – a handmade heirloom 
              that tells a story of craftsmanship and care.`,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/IMG-20260109-WA0009.jpg?v=1770010474&width=800',
  },
  {
    id: 'custom',
    title: 'Your Vision, Our Hands',
    content: `Looking for something special? We love creating custom pieces. Whether it's your favourite 
              marine creature, a specific colour scheme to match a nursery, or a bespoke mobile featuring 
              creatures from your most memorable dives – get in touch and let's bring your vision to life.`,
    image: null,
    cta: {
      text: 'Request Custom Order',
      email: 'info@otterseas.com',
    },
  },
];

// ===========================================
// PRODUCT MODAL COMPONENT
// ===========================================
function ProductModal({ product, isOpen, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [productInfoOpen, setProductInfoOpen] = useState(false);
  const { addToCart, openCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
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
              className="w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${LUNA.surfaceTeal}`,
                boxShadow: `0 25px 80px ${LUNA.deepWater}40, 0 0 40px ${LUNA.surfaceTeal}20`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 z-20 bg-white/80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {/* Content - Landscape Grid */}
              <div className="flex flex-col md:flex-row max-h-[85vh]">
                
                {/* Left - Image Gallery */}
                <div className="md:w-1/2 relative bg-gray-50 flex-shrink-0 group">
                  <div className="aspect-square md:aspect-auto md:h-full">
                    <img 
                      src={product.images[activeImageIndex]} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </div>

                  {/* Image navigation */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev + 1) % product.images.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LUNA.deepWater} strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {product.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex(index);
                            }}
                            className="w-3 h-3 rounded-full transition-all"
                            style={{ 
                              backgroundColor: activeImageIndex === index ? LUNA.surfaceTeal : 'rgba(255,255,255,0.8)',
                              boxShadow: activeImageIndex === index ? `0 0 10px ${LUNA.surfaceTeal}` : '0 2px 4px rgba(0,0,0,0.2)',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Right - Product Info */}
                <div className="md:w-1/2 p-6 overflow-y-auto">
                  {/* Category */}
                  <p className="text-xs tracking-wider mb-1" style={{ color: LUNA.surfaceTeal }}>
                    {product.category.toUpperCase()}
                  </p>
                  
                  {/* Title & Price */}
                  <h2 className="text-2xl font-bold mb-1" style={{ color: LUNA.deepWater }}>
                    {product.name}
                  </h2>
                  <p className="text-2xl font-bold mb-2" style={{ color: LUNA.surfaceTeal }}>
                    £{product.price.toFixed(2)}
                  </p>
                  
                  {/* Time to make */}
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {product.timeToMake} of handcrafted love
                  </p>
                  
                  {/* Uses */}
                  <p className="text-xs text-gray-400 mb-4">
                    Perfect as: {product.uses}
                  </p>

                  {/* Collapsible Description */}
                  <div className="mb-3">
                    <button
                      onClick={() => setDescriptionOpen(!descriptionOpen)}
                      className="w-full flex items-center justify-between py-3 border-t"
                      style={{ borderColor: `${LUNA.surfaceTeal}20` }}
                    >
                      <span className="font-semibold" style={{ color: LUNA.deepWater }}>
                        Description
                      </span>
                      <motion.svg 
                        width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke={LUNA.surfaceTeal} strokeWidth="2"
                        animate={{ rotate: descriptionOpen ? 180 : 0 }}
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {descriptionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 text-sm leading-relaxed pb-3">
                            {product.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Collapsible Product Info */}
                  <div className="mb-6">
                    <button
                      onClick={() => setProductInfoOpen(!productInfoOpen)}
                      className="w-full flex items-center justify-between py-3 border-t"
                      style={{ borderColor: `${LUNA.surfaceTeal}20` }}
                    >
                      <span className="font-semibold" style={{ color: LUNA.deepWater }}>
                        Product Info
                      </span>
                      <motion.svg 
                        width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke={LUNA.surfaceTeal} strokeWidth="2"
                        animate={{ rotate: productInfoOpen ? 180 : 0 }}
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {productInfoOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="text-gray-600 text-sm space-y-2 pb-3">
                            {product.productInfo.map((info, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span style={{ color: LUNA.surfaceTeal }}>•</span>
                                {info}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-xl text-sm font-semibold transition-all"
                    style={{ 
                      background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                      color: 'white',
                      boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`,
                    }}
                    whileHover={{ scale: 1.02, boxShadow: `0 6px 30px ${LUNA.surfaceTeal}60` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ===========================================
// PRODUCT CARD COMPONENT (for carousel)
// ===========================================
function ProductCard({ product, onClick }) {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.shopifyVariantId,
      shopifyVariantId: product.shopifyVariantId,
      name: product.name,
      price: product.price,
      image: product.images[0],
      type: 'product',
    });
    if (openCart) openCart();
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
      style={{ 
        border: `1px solid ${LUNA.highlight}30`,
        width: '280px',
      }}
      whileHover={{ 
        y: -2, 
        boxShadow: `0 8px 30px ${LUNA.surfaceTeal}15`,
        borderColor: LUNA.surfaceTeal,
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-40 overflow-hidden bg-gray-50">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm mb-1" style={{ color: LUNA.deepWater }}>
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          {product.timeToMake}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm" style={{ color: LUNA.surfaceTeal }}>
            £{product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-80"
            style={{ 
              background: LUNA.surfaceTeal,
              color: 'white',
            }}
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ===========================================
// PRODUCT CAROUSEL COMPONENT
// ===========================================
function ProductCarousel({ title, subtitle, products, onProductClick }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold" style={{ color: LUNA.deepWater }}>
            {title}
          </h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        
        {/* Navigation Arrows */}
        {products.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              style={{ 
                background: canScrollLeft ? `${LUNA.surfaceTeal}15` : 'transparent',
                border: `1px solid ${LUNA.surfaceTeal}30`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LUNA.surfaceTeal} strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              style={{ 
                background: canScrollRight ? `${LUNA.surfaceTeal}15` : 'transparent',
                border: `1px solid ${LUNA.surfaceTeal}30`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LUNA.surfaceTeal} strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Carousel */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </div>
  );
}

// ===========================================
// MAIN PAGE COMPONENT
// ===========================================
export default function CrochetCreaturesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Group products by category
  const nudibranchs = ALL_PRODUCTS.filter(p => p.category === 'Nudibranchs');
  const fishFriends = ALL_PRODUCTS.filter(p => p.category === 'Fish & Friends');
  const babyMobiles = ALL_PRODUCTS.filter(p => p.category === 'Baby Mobiles');

  return (
    <div 
      className="min-h-screen w-full bg-white"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-8 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Otterseas" 
            className="w-10 h-10 rounded-xl object-contain"
          />
          <span className="text-xl font-medium tracking-tight" style={{ color: LUNA.deepWater }}>
            Otterseas
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: LUNA.deepWater }}>
            Products
          </Link>
          <Link href="/stickers" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: LUNA.deepWater }}>
            Stickers
          </Link>
          <Link href="/products/crochet-creatures" className="text-sm font-medium" style={{ color: LUNA.surfaceTeal }}>
            Crochet Creatures
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
          <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
          <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden"
            >
              <Link href="/" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/products" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>All Products</Link>
              <Link href="/stickers" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>Location Stickers</Link>
              <Link href="/products/fun-stickers" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>Fun Stickers</Link>
              <Link href="/products/crochet-creatures" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.surfaceTeal }} onClick={() => setIsMenuOpen(false)}>Crochet Creatures</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== SPLIT PANEL LAYOUT ==================== */}
      <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 64px)' }}>
        
        {/* LEFT PANEL - Story (scrollable) */}
        <div 
          className="w-full lg:w-1/2 overflow-y-auto"
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
            {STORY_SECTIONS.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="mb-12"
              >
                {section.image && (
                  <div className="rounded-xl overflow-hidden mb-4" style={{ boxShadow: `0 10px 40px ${LUNA.deepWater}10` }}>
                    <img src={section.image} alt={section.title} className="w-full h-auto" />
                  </div>
                )}
                <h2 className="text-xl font-bold mb-3" style={{ color: LUNA.deepWater }}>
                  {section.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {section.content}
                </p>
                {section.cta && (
                  <a
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
                  </a>
                )}
              </motion.div>
            ))}

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
              <p className="text-xs text-gray-500 mt-3">
                Our pricing reflects the time, skill, and love poured into each handmade piece.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - Products (scrollable) */}
        <div 
          className="w-full lg:w-1/2 overflow-y-auto border-l border-gray-100"
          style={{ background: 'white' }}
        >
          <div className="p-6 lg:p-8">
            {/* Nudibranchs Carousel */}
            <ProductCarousel
              title="Nudibranchs"
              subtitle="£17.50 each • Perfect as keychains, bag charms, desk companions"
              products={nudibranchs}
              onProductClick={(product) => setSelectedProduct(product)}
            />

            {/* Fish & Friends Carousel */}
            <ProductCarousel
              title="Fish & Friends"
              subtitle="£25 each • Perfect as keychains, bag charms, rearview mirror hangers"
              products={fishFriends}
              onProductClick={(product) => setSelectedProduct(product)}
            />

            {/* Baby Mobiles - Single Item */}
            <ProductCarousel
              title="Baby Mobiles"
              subtitle="£105 each • Perfect as nursery centrepiece, baby shower gift"
              products={babyMobiles}
              onProductClick={(product) => setSelectedProduct(product)}
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
      />

      {/* ==================== FOOTER ==================== */}
      <footer 
        className="w-full py-12 px-8"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Otterseas" className="w-10 h-10 rounded-xl object-contain" />
              <span className="text-lg font-medium text-white">Otterseas</span>
            </Link>
            
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/products" className="text-white/50 hover:text-white text-sm transition-colors">All Products</Link>
              <Link href="/products/surface-tank" className="text-white/50 hover:text-white text-sm transition-colors">Surface Tank</Link>
              <Link href="/products/dive-journal" className="text-white/50 hover:text-white text-sm transition-colors">Dive Journal</Link>
              <Link href="/stickers" className="text-white/50 hover:text-white text-sm transition-colors">Location Stickers</Link>
              <Link href="/products/fun-stickers" className="text-white/50 hover:text-white text-sm transition-colors">Fun Stickers</Link>
              <Link href="/products/crochet-creatures" className="text-white/50 hover:text-white text-sm transition-colors">Crochet Creatures</Link>
            </nav>

            <p className="text-white/40 text-sm">© 2025 Otterseas</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
