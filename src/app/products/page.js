'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecentlyViewed from '@/components/RecentlyViewed';
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

// Product rows preserved verbatim from the previous version — same order,
// same data — just rendered in the new light-theme product-card style.
const PRODUCT_ROWS = [
  {
    id: 'row-1',
    categories: ['Hydration', 'Dive Logging', null],
    products: [
      {
        id: 'surface-tank',
        name: 'The Surface Tank',
        tagline: 'Memories That Stick',
        description: 'Premium insulated water bottle designed for divers',
        price: 35.0,
        originalPrice: 40.0,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=600',
        link: '/products/surface-tank',
        badge: 'Sale · Save £5',
      },
      {
        id: 'dive-journal',
        name: 'The Dive Journal',
        tagline: 'More Than Just Stats',
        description: 'The ultimate dive log for recording your experiences',
        price: 28.0,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=600',
        link: '/products/dive-journal',
        badge: 'New',
      },
      {
        id: 'booster-pack',
        name: 'Log Pages',
        tagline: 'Booster Pack For The Dive Journal',
        description: '30 additional full-colour dive log pages',
        price: 12.0,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=600',
        link: '/products/logbook-booster-pack',
      },
    ],
  },
  {
    id: 'row-2',
    categories: ['Stickers', null, 'Handmade'],
    products: [
      {
        id: 'location-stickers',
        name: 'Location Stickers',
        tagline: 'Collect Your Adventures',
        description: 'Waterproof vinyl stickers from 80+ dive locations worldwide',
        price: 2.5,
        priceNote: 'from',
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Location_sticker_overlays.png?v=1770000931&width=823',
        link: '/stickers',
        badge: '80+ Locations',
      },
      {
        id: 'fun-stickers',
        name: 'Fun Stickers',
        tagline: 'Just For Fun',
        description: "Lighthearted dive stickers for those who don't take themselves too seriously",
        price: 3.5,
        priceNote: 'from',
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare-MarketingImage.jpg?v=1746535285&width=600',
        link: '/products/fun-stickers',
        badge: 'New',
      },
      {
        id: 'crochet-creatures',
        name: 'Crochet Creatures',
        tagline: 'Handcrafted With Love',
        description: 'Unique handmade marine animals — nudibranchs, seahorses, frogfish & more',
        price: 17.5,
        priceNote: 'from',
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Crochet_Nudibranchs.jpg?v=1770010608&width=600',
        link: '/products/crochet-creatures',
        badge: 'New',
      },
    ],
  },
  {
    id: 'row-3',
    categories: ['Clothing', null, null],
    products: [
      {
        id: 'clothing',
        name: 'Ocean Clothing',
        tagline: 'Wear The Ocean',
        description: 'Embroidered marine life beanies & caps — mola mola, orca and one sideways crab',
        price: 18.5,
        priceNote: 'from',
        image: '/images/products/Mola-mola-embroidered-beanie-hero.png',
        link: '/products/clothing',
        badge: 'New',
      },
    ],
  },
];

function ProductCard({ product, index, formatPrice }) {
  const badgeColor =
    product.badge === 'New'
      ? COLORS.pink
      : product.badge === 'Best Seller'
      ? COLORS.deepWater
      : COLORS.surfaceTeal;
  const badgeText =
    product.badge === 'New' || product.badge === 'Best Seller' ? 'white' : 'white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden border transition-shadow hover:shadow-md flex flex-col"
      style={{ borderColor: '#E6EEF2' }}
    >
      <Link href={product.link} className="block group">
        <div className="aspect-square overflow-hidden relative" style={{ backgroundColor: COLORS.cream }}>
          {product.badge && (
            <span
              className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
              style={{ backgroundColor: badgeColor, color: badgeText }}
            >
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <p
            className="text-[10px] tracking-[0.25em] font-semibold mb-1.5 uppercase"
            style={{ color: COLORS.surfaceTeal }}
          >
            {product.tagline}
          </p>
          <h3 className="text-lg font-bold leading-tight mb-1.5" style={{ color: COLORS.deepWater }}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 leading-snug line-clamp-2 mb-4">{product.description}</p>

          <div className="mt-auto flex items-baseline justify-between gap-2">
            <span className="text-lg font-bold flex items-baseline gap-1.5" style={{ color: COLORS.deepWater }}>
              {product.priceNote && (
                <span className="text-xs text-gray-400 mr-1 font-medium">{product.priceNote}</span>
              )}
              {formatPrice(product.price)}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs font-medium text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </span>
            <span
              className="text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
              style={{ color: COLORS.surfaceTeal }}
            >
              View
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
  const { formatPrice } = useCurrency();

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: COLORS.cream }}
    >
      <Header variant="light" currentPath="/products" />

      {/* ============ HERO ============ */}
      <section className="bg-white px-4 md:px-8 pt-10 md:pt-14 pb-12 md:pb-14">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm tracking-[0.28em] font-semibold mb-4"
            style={{ color: COLORS.pink }}
          >
            EXPLORE OUR RANGE
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
            <WhisperText text="Our Collections." wordDelay={0.18} duration={1.2} />
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to capture, document and celebrate your underwater adventures.
          </p>
        </div>
      </section>

      {/* ============ PRODUCT ROWS ============ */}
      <section className="px-4 md:px-8 py-12 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
          {PRODUCT_ROWS.map((row, rowIndex) => (
            <div key={row.id}>
              {/* Category headers row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-4">
                {row.categories.map((category, colIndex) => (
                  <div key={colIndex} className="min-h-[28px]">
                    {category && (
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-base font-bold tracking-[0.18em] uppercase"
                        style={{ color: COLORS.deepWater }}
                      >
                        {category}
                      </motion.h2>
                    )}
                  </div>
                ))}
              </div>

              {/* Products row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {row.products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={rowIndex * 3 + i}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA — Browse Stickers ============ */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-sm tracking-[0.28em] font-semibold mb-3"
            style={{ color: COLORS.pink }}
          >
            START YOUR COLLECTION
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{
              background: `linear-gradient(135deg, ${COLORS.surfaceTeal} 0%, ${COLORS.pink} 50%, ${COLORS.deepWater} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <WhisperText text="Build your dive map." wordDelay={0.18} duration={1.2} />
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Pick up dive site stickers from over 80 locations worldwide and start documenting your
            underwater adventures.
          </p>
          <Link
            href="/stickers"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all hover:scale-105"
            style={{
              backgroundColor: COLORS.deepWater,
              color: 'white',
              boxShadow: `0 8px 24px ${COLORS.deepWater}30`,
            }}
          >
            Browse All Stickers
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <RecentlyViewed variant="light" />
      <Footer />
    </div>
  );
}
