'use client';

import { useState } from 'react';
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
// PRODUCT DATA
// ===========================================
const NUDIBRANCHS = [
  {
    id: 'nudi-spanish-dancer',
    name: 'Spanish Dancer',
    price: 15.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=400',
    shopifyVariantId: 'nudi-spanish-dancer-001', // Placeholder
  },
  {
    id: 'nudi-chromodoris',
    name: 'Chromodoris',
    price: 15.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=400',
    shopifyVariantId: 'nudi-chromodoris-001', // Placeholder
  },
  {
    id: 'nudi-nembrotha',
    name: 'Nembrotha',
    price: 15.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=400',
    shopifyVariantId: 'nudi-nembrotha-001', // Placeholder
  },
];

const FISH_FRIENDS = [
  {
    id: 'fish-cowfish',
    name: 'Longhorn Cowfish',
    price: 20.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=400',
    shopifyVariantId: 'fish-cowfish-001', // Placeholder
  },
  {
    id: 'fish-frogfish',
    name: 'Hairy Frogfish',
    price: 20.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132348_b89869bc-a6a8-4b05-8d55-de1473481338.jpg?v=1770010707&width=400',
    shopifyVariantId: 'fish-frogfish-001', // Placeholder
  },
  {
    id: 'fish-seahorse',
    name: 'Pygmy Seahorse',
    price: 20.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=400',
    shopifyVariantId: 'fish-seahorse-001', // Placeholder
  },
];

const BABY_MOBILES = [
  {
    id: 'mobile-ocean-dreams',
    name: 'Ocean Dreams Mobile',
    price: 100.00,
    description: 'A beautiful handcrafted mobile featuring an assortment of marine creatures, perfect for any ocean-loving family.',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/IMG-20260109-WA0009.jpg?v=1770010474&width=600',
    shopifyVariantId: 'mobile-ocean-dreams-001', // Placeholder
  },
];

// ===========================================
// PRODUCT CARD COMPONENT
// ===========================================
function ProductCard({ product, size = 'normal' }) {
  const { addToCart, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.shopifyVariantId,
      shopifyVariantId: product.shopifyVariantId,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product',
    });
    setTimeout(() => {
      setIsAdding(false);
      if (openCart) openCart();
    }, 300);
  };

  const isLarge = size === 'large';

  return (
    <motion.div
      className={`bg-white rounded-2xl overflow-hidden ${isLarge ? 'max-w-md mx-auto' : ''}`}
      style={{ 
        border: `2px solid ${LUNA.highlight}30`,
        boxShadow: `0 4px 20px ${LUNA.surfaceTeal}10`,
      }}
      whileHover={{ 
        y: -4, 
        boxShadow: `0 12px 40px ${LUNA.surfaceTeal}20`,
        borderColor: LUNA.surfaceTeal,
      }}
    >
      {/* Image */}
      <div className={`${isLarge ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden bg-gray-50`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className={`${isLarge ? 'p-6' : 'p-4'}`}>
        <h3 
          className={`font-semibold mb-1 ${isLarge ? 'text-xl' : 'text-sm'}`}
          style={{ color: LUNA.deepWater }}
        >
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-500 text-sm mb-3">{product.description}</p>
        )}
        <p 
          className={`font-bold mb-3 ${isLarge ? 'text-2xl' : 'text-lg'}`}
          style={{ color: LUNA.surfaceTeal }}
        >
          £{product.price.toFixed(2)}
        </p>
        
        <motion.button
          onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${isAdding ? 'scale-95' : ''}`}
          style={{ 
            background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
            color: 'white',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isAdding ? '✓ Added!' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ===========================================
// STORY SECTION COMPONENT
// ===========================================
function StorySection({ number, title, image, imageAlt, children, imagePosition = 'right' }) {
  const isLeft = imagePosition === 'left';
  
  return (
    <section className="py-16 md:py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          {/* Text */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="text-sm font-light tracking-widest"
              style={{ color: LUNA.surfaceTeal }}
            >
              {number}
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold mt-2 mb-6"
              style={{ color: LUNA.deepWater }}
            >
              {title}
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              {children}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="rounded-2xl overflow-hidden"
              style={{ 
                boxShadow: `0 20px 60px ${LUNA.deepWater}20`,
              }}
            >
              <img 
                src={image} 
                alt={imageAlt}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===========================================
// PRODUCTS SECTION COMPONENT  
// ===========================================
function ProductsSection({ title, subtitle, products, size = 'normal' }) {
  return (
    <section 
      className="py-16 px-8"
      style={{ 
        background: `linear-gradient(180deg, white 0%, ${LUNA.highlight}08 50%, white 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: LUNA.deepWater }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-gray-500">{subtitle}</p>
          )}
        </motion.div>

        <div className={`grid gap-6 ${
          size === 'large' 
            ? 'grid-cols-1 max-w-md mx-auto' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} size={size} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===========================================
// MAIN PAGE COMPONENT
// ===========================================
export default function CrochetCreaturesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <span 
            className="text-xl font-medium tracking-tight"
            style={{ color: LUNA.deepWater }}
          >
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
          <Link href="/products/crochet-creatures" className="text-sm font-medium transition-colors" style={{ color: LUNA.surfaceTeal }}>
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

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden"
            >
              <Link href="/" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <Link href="/products/surface-tank" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                Surface Tank
              </Link>
              <Link href="/products/dive-journal" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                Dive Journal
              </Link>
              <Link href="/stickers" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                Location Stickers
              </Link>
              <Link href="/products/fun-stickers" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                Fun Stickers
              </Link>
              <Link href="/products/crochet-creatures" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.surfaceTeal }} onClick={() => setIsMenuOpen(false)}>
                Crochet Creatures
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== HERO ==================== */}
      <section 
        className="relative py-20 md:py-32 px-8 overflow-hidden"
        style={{ 
          background: `linear-gradient(180deg, white 0%, ${LUNA.highlight}10 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="text-sm font-medium tracking-widest"
              style={{ color: LUNA.surfaceTeal }}
            >
              HANDCRAFTED WITH LOVE
            </span>
            <h1 
              className="text-4xl md:text-6xl font-bold mt-4 mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.deepWater} 0%, ${LUNA.midDepth} 50%, ${LUNA.surfaceTeal} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Every Creature Has a Story
            </h1>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Unique, handmade marine animals crafted with care. From tiny nudibranchs to charming cowfish, 
              each piece takes hours of love to create – and no two are ever exactly alike.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="rounded-3xl overflow-hidden"
              style={{ 
                boxShadow: `0 30px 80px ${LUNA.deepWater}20`,
              }}
            >
              <img 
                src="https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=1200" 
                alt="Handcrafted crochet nudibranchs"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== STORY: THE SKETCH ==================== */}
      <StorySection
        number="01"
        title="It Starts With a Sketch"
        image="https://38a44d-4c.myshopify.com/cdn/shop/files/IMG_20260202_130533_587.jpg?v=1770009456&width=800"
        imageAlt="Sketchpad with marine creature designs"
        imagePosition="right"
      >
        <p>
          Every creature begins its journey on paper. We study real marine life – the way a nudibranch's 
          gills flutter, the curious expression of a cowfish, the delicate curl of a seahorse's tail.
        </p>
        <p>
          These aren't just toys; they're tiny portraits of the ocean's most fascinating characters, 
          designed to capture the personality and charm that makes each species special.
        </p>
      </StorySection>

      {/* ==================== PRODUCTS: NUDIBRANCHS ==================== */}
      <ProductsSection
        title="Nudibranchs"
        subtitle="The ocean's most colourful characters • £15 each"
        products={NUDIBRANCHS}
      />

      {/* ==================== STORY: BRINGING TO LIFE ==================== */}
      <StorySection
        number="02"
        title="Bringing Characters to Life"
        image="https://38a44d-4c.myshopify.com/cdn/shop/files/20260202_132328_c68439a2-7680-4fbd-9fed-a0057b12f707.jpg?v=1770010704&width=800"
        imageAlt="Handcrafted crochet cowfish"
        imagePosition="left"
      >
        <p>
          From sketch to stitch, each creature takes between 4-8 hours of careful handwork. 
          We select yarns that capture the vibrant colours of the reef, and every detail – 
          from tiny eyes to delicate fins – is crafted with patience and precision.
        </p>
        <p>
          Because they're handmade, each one has its own personality. A slightly different expression, 
          a unique quirk. Just like their real-life counterparts, no two are exactly the same.
        </p>
      </StorySection>

      {/* ==================== PRODUCTS: FISH & FRIENDS ==================== */}
      <ProductsSection
        title="Fish & Friends"
        subtitle="Charming characters from the reef • £20 each"
        products={FISH_FRIENDS}
      />

      {/* ==================== STORY: BABY MOBILES ==================== */}
      <StorySection
        number="03"
        title="From Ocean to Nursery"
        image="https://38a44d-4c.myshopify.com/cdn/shop/files/IMG-20260109-WA0009.jpg?v=1770010474&width=800"
        imageAlt="Baby mobile with crochet sea creatures"
        imagePosition="right"
      >
        <p>
          Our baby mobiles bring the calm of the ocean into your little one's world. 
          Each mobile features a carefully curated collection of sea creatures, 
          gently spinning and swaying to capture curious eyes.
        </p>
        <p>
          Perfect for ocean-loving families, these mobiles make a truly special gift – 
          a handmade heirloom that tells a story of craftsmanship and care.
        </p>
      </StorySection>

      {/* ==================== PRODUCTS: BABY MOBILES ==================== */}
      <ProductsSection
        title="Baby Mobiles"
        subtitle="Handcrafted heirlooms for little ocean lovers"
        products={BABY_MOBILES}
        size="large"
      />

      {/* ==================== CUSTOM ORDERS CTA ==================== */}
      <section 
        className="py-20 px-8"
        style={{ 
          background: `linear-gradient(180deg, ${LUNA.highlight}10 0%, ${LUNA.surfaceTeal}10 100%)`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: LUNA.deepWater }}
            >
              Looking for Something Special?
            </h3>
            <p className="text-gray-600 mb-8">
              We love creating custom pieces. Whether it's your favourite marine creature, 
              a specific colour scheme, or a bespoke mobile – get in touch and let's bring your vision to life.
            </p>
            <a
              href="mailto:info@otterseas.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                color: 'white',
                boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Request a Custom Order
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer 
        className="w-full py-12 px-8"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Otterseas"
                className="w-10 h-10 rounded-xl object-contain"
              />
              <span className="text-lg font-medium text-white">Otterseas</span>
            </Link>
            
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/products" className="text-white/50 hover:text-white text-sm transition-colors">
                All Products
              </Link>
              <Link href="/products/surface-tank" className="text-white/50 hover:text-white text-sm transition-colors">
                Surface Tank
              </Link>
              <Link href="/products/dive-journal" className="text-white/50 hover:text-white text-sm transition-colors">
                Dive Journal
              </Link>
              <Link href="/products/logbook-booster-pack" className="text-white/50 hover:text-white text-sm transition-colors">
                Booster Pack
              </Link>
              <Link href="/stickers" className="text-white/50 hover:text-white text-sm transition-colors">
                Location Stickers
              </Link>
              <Link href="/products/fun-stickers" className="text-white/50 hover:text-white text-sm transition-colors">
                Fun Stickers
              </Link>
              <Link href="/products/crochet-creatures" className="text-white/50 hover:text-white text-sm transition-colors">
                Crochet Creatures
              </Link>
            </nav>

            <p className="text-white/40 text-sm">
              © 2025 Otterseas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
