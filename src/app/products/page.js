'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
// ALL PRODUCTS - Flat list for grid display
// ===========================================
const ALL_PRODUCTS = [
  // Row 1: Hydration + Dive Logging
  {
    id: 'surface-tank',
    name: 'The Surface Tank',
    tagline: 'Memories That Stick',
    description: 'Premium insulated water bottle designed for divers',
    price: 40.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=600',
    link: '/products/surface-tank',
    badge: 'Best Seller',
    category: 'Hydration',
  },
  {
    id: 'dive-journal',
    name: 'The Dive Journal',
    tagline: 'More Than Just Stats',
    description: 'The ultimate dive log for recording your experiences',
    price: 28.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=600',
    link: '/products/dive-journal',
    badge: 'New',
    category: 'Dive Logging',
  },
  {
    id: 'booster-pack',
    name: 'Logbook Booster Pack',
    tagline: 'Keep Your Adventures Going',
    description: '30 additional full-colour dive log pages',
    price: 12.00,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=600',
    link: '/products/logbook-booster-pack',
    category: null, // Same category as previous, no header needed
  },
  // Row 2: Stickers
  {
    id: 'location-stickers',
    name: 'Location Stickers',
    tagline: 'Collect Your Adventures',
    description: 'Waterproof vinyl stickers from 80+ dive locations worldwide',
    price: 2.50,
    priceNote: 'from',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Location_sticker_overlays.png?v=1770000931&width=823',
    link: '/stickers',
    badge: '80+ Locations',
    category: 'Stickers',
  },
  {
    id: 'fun-stickers',
    name: 'Fun Stickers',
    tagline: 'Just For Fun',
    description: 'Lighthearted dive stickers for those who don\'t take themselves too seriously',
    price: 3.50,
    priceNote: 'from',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare-MarketingImage.jpg?v=1746535285&width=600',
    link: '/products/fun-stickers',
    badge: 'New',
    category: null, // Same category as previous
  },
];

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function ProductsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div 
      className="min-h-screen w-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 px-8 py-4" style={{ backgroundColor: `${LUNA.abyss}90`, backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Otterseas"
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className="text-xl font-medium tracking-tight text-white">
              Otterseas
            </span>
          </Link>

          {/* Hamburger Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <span className="w-6 h-0.5 bg-white" />
              <span className="w-6 h-0.5 bg-white" />
              <span className="w-6 h-0.5 bg-white" />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 right-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  <Link href="/" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/products" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm font-medium" style={{ color: LUNA.surfaceTeal }} onClick={() => setIsMenuOpen(false)}>
                    All Products
                  </Link>
                  <Link href="/products/surface-tank" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Surface Tank
                  </Link>
                  <Link href="/products/dive-journal" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Dive Journal
                  </Link>
                  <Link href="/products/logbook-booster-pack" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Booster Pack
                  </Link>
                  <Link href="/stickers" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Location Stickers
                  </Link>
                  <Link href="/products/fun-stickers" className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>
                    Fun Stickers
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 pt-10 pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            className="text-xs tracking-[0.25em] font-medium mb-3 block"
            style={{ color: LUNA.highlight }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            EXPLORE OUR RANGE
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Our Collections
          </motion.h1>
          <motion.p 
            className="text-white/70 text-base max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Everything you need to capture, document, and celebrate your underwater adventures.
          </motion.p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Category Header - only show if product has a category */}
                {product.category && (
                  <div className="mb-3">
                    <h2 className="text-lg font-bold text-white">{product.category}</h2>
                  </div>
                )}
                
                {/* Product Card */}
                <Link href={product.link}>
                  <div
                    className="group relative rounded-xl overflow-hidden cursor-pointer h-full transition-all hover:scale-[1.02]"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${LUNA.highlight}20`,
                    }}
                  >
                    {/* Badge */}
                    {product.badge && (
                      <div 
                        className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ 
                          backgroundColor: product.badge === 'New' ? '#FF6B9D' : LUNA.highlight,
                          color: product.badge === 'New' ? 'white' : LUNA.abyss
                        }}
                      >
                        {product.badge}
                      </div>
                    )}

                    {/* Image */}
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-[10px] tracking-wider mb-1" style={{ color: LUNA.highlight }}>
                        {product.tagline.toUpperCase()}
                      </p>
                      <h3 className="text-sm font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-white/60 text-xs mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {product.priceNote && (
                            <span className="text-white/40 text-xs mr-1">{product.priceNote}</span>
                          )}
                          <span className="text-sm font-bold" style={{ color: LUNA.highlight }}>
                            £{product.price.toFixed(2)}
                          </span>
                        </div>
                        <span 
                          className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                          style={{ color: LUNA.highlight }}
                        >
                          View
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 px-8"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Collection?
          </h2>
          <p className="text-white/60 mb-8">
            Explore our dive site stickers and start documenting your underwater adventures.
          </p>
          <Link
            href="/stickers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${LUNA.highlight}`,
              color: 'white',
              boxShadow: `0 0 30px ${LUNA.highlight}30`
            }}
          >
            Browse All Stickers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
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
