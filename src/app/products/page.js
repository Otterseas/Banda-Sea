'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
// ALL PRODUCTS - Organized by rows
// ===========================================
const PRODUCT_ROWS = [
  {
    id: 'row-1',
    categories: ['Hydration', 'Dive Logging', null], // Headers for each column
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
    id: 'row-2',
    categories: ['Stickers', null, null], // Only first column has header
    products: [
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
  {
    id: 'row-3',
    categories: ['Handmade', null, null],
    products: [
      {
        id: 'crochet-creatures',
        name: 'Crochet Creatures',
        tagline: 'Handcrafted With Love',
        description: 'Unique handmade marine animals - nudibranchs, seahorses, frogfish & more',
        price: 17.50,
        priceNote: 'from',
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=600',
        link: '/products/crochet-creatures',
        badge: 'New',
      },
    ],
  },
];

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function ProductsPage() {
  const { formatPrice } = useCurrency();

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

      {/* Shared Header */}
      <Header variant="dark" currentPath="/products" />

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
          {PRODUCT_ROWS.map((row, rowIndex) => (
            <motion.div
              key={row.id}
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: rowIndex * 0.1 }}
            >
              {/* Category Headers Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
                {row.categories.map((category, colIndex) => (
                  <div key={colIndex} className="h-7">
                    {category && (
                      <h2 className="text-lg font-bold text-white">{category}</h2>
                    )}
                  </div>
                ))}
              </div>

              {/* Products Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {row.products.map((product) => (
                  <Link href={product.link} key={product.id}>
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
                            backgroundColor: product.badge === 'New' ? '#FF6B9D' : product.badge === 'Coming Soon' ? LUNA.midDepth : LUNA.highlight,
                            color: product.badge === 'New' || product.badge === 'Coming Soon' ? 'white' : LUNA.abyss
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
                              {formatPrice(product.price)}
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

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
