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
// PRODUCT COLLECTIONS DATA
// ===========================================
const COLLECTIONS = [
  {
    id: 'hydration',
    name: 'Hydration',
    description: 'Stay hydrated on your diving adventures',
    products: [
      {
        id: 'surface-tank',
        name: 'The Surface Tank',
        tagline: 'Memories That Stick',
        description: 'Premium insulated water bottle designed for divers',
        price: 40.00,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=600',
        link: '/products/surface-tank',
        badge: 'Best Seller',
      },
    ],
  },
  {
    id: 'logging',
    name: 'Dive Logging',
    description: 'Document your underwater adventures',
    products: [
      {
        id: 'dive-journal',
        name: 'The Dive Journal',
        tagline: 'More Than Just Stats',
        description: 'The ultimate dive log for recording your experiences',
        price: 28.00,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=600',
        link: '/products/dive-journal',
        badge: 'New',
      },
      {
        id: 'booster-pack',
        name: 'Logbook Booster Pack',
        tagline: 'Keep Your Adventures Going',
        description: '30 additional full-colour dive log pages',
        price: 12.00,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=600',
        link: '/products/logbook-booster-pack',
      },
    ],
  },
  {
    id: 'stickers',
    name: 'Stickers',
    description: 'Show off your dive adventures',
    products: [
      {
        id: 'location-stickers',
        name: 'Location Stickers',
        tagline: 'Collect Your Adventures',
        description: 'Waterproof vinyl stickers from 80+ dive locations worldwide',
        price: 2.50,
        priceNote: 'from',
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Marine-Animals_1.jpg?v=1743749112&width=600',
        link: '/stickers',
        badge: '80+ Locations',
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
      },
    ],
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
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 pt-16 pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            className="text-sm tracking-[0.25em] font-medium mb-4 block"
            style={{ color: LUNA.highlight }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            EXPLORE OUR RANGE
          </motion.span>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
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
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Everything you need to capture, document, and celebrate your underwater adventures.
          </motion.p>
        </div>
      </section>

      {/* Collections */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {COLLECTIONS.map((collection, collectionIndex) => (
            <motion.div
              key={collection.id}
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: collectionIndex * 0.1 }}
            >
              {/* Collection Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{collection.name}</h2>
                <p className="text-white/60">{collection.description}</p>
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.products.map((product, productIndex) => (
                  <Link href={product.link} key={product.id}>
                    <motion.div
                      className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${LUNA.highlight}20`,
                      }}
                      whileHover={{ scale: 1.02, borderColor: LUNA.highlight }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Badge */}
                      {product.badge && (
                        <div 
                          className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold"
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
                      <div className="p-6">
                        <p className="text-xs tracking-wider mb-2" style={{ color: LUNA.highlight }}>
                          {product.tagline.toUpperCase()}
                        </p>
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-white/60 text-sm mb-4">{product.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            {product.priceNote && (
                              <span className="text-white/40 text-sm mr-1">{product.priceNote}</span>
                            )}
                            <span className="text-xl font-bold" style={{ color: LUNA.highlight }}>
                              £{product.price.toFixed(2)}
                            </span>
                          </div>
                          <span 
                            className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                            style={{ color: LUNA.highlight }}
                          >
                            View
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
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
