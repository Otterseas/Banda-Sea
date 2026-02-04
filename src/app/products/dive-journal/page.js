'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReviewsSection } from '@/components/Reviews';
import { getReviewsByProduct } from '@/data/reviews';
import { NotifyMeButton, StockBadge, SmartProductButton } from '@/components/NotifyMe';

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
const PRODUCT = {
  name: 'The Dive Journal',
  tagline: 'MORE THAN JUST STATS',
  price: 28.00,
  salePrice: 25.20,
  onSale: true,
  description: "While dive computers are great at capturing data, they can't tell the whole story. The Dive Journal is designed for divers who want to record more than just numbers.",
  shopifyVariantId: '49658874331402',
  images: {
    hero: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=823',
    stacked: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive-journals-stock_1.jpg?v=1743749687&width=823',
    withComputer: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20241030_100905.jpg?v=1743749112&width=823',
    storage: 'https://38a44d-4c.myshopify.com/cdn/shop/files/The_Dive_Journal.jpg?v=1743749112&width=823',
    logPages: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=823',
    reefFish: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Marine-Animals_1.jpg?v=1743749112&width=823',
    logPagesCard: 'https://38a44d-4c.myshopify.com/cdn/shop/files/DiveLogPages_03f98e7f-41ac-43f6-bb36-837f8035258f.jpg?v=1743749112&width=823',
    whereCanISee: 'https://38a44d-4c.myshopify.com/cdn/shop/files/WherecanIseePages.jpg?v=1743749112&width=823',
    milestones: 'https://38a44d-4c.myshopify.com/cdn/shop/files/MilestonePages.jpg?v=1743749112&width=823',
    marineSafari: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Marine-Safari-Pages.jpg?v=1743749112&width=823',
  }
};

const BOOSTER_PACK = {
  name: 'Logbook Booster Pack',
  description: '30 additional log pages',
  price: 12.00,
  shopifyVariantId: '49872531325194',
  link: '/products/logbook-booster-pack',
};

// Bundle pricing options - using bundle product Variant IDs
const BUNDLE_OPTIONS = [
  {
    id: 'journal-only',
    name: 'Journal Only',
    description: 'The Dive Journal',
    originalPrice: 28.00,
    price: 28.00,
    savings: 0,
    shopifyVariantId: '49658874331402', // Single journal variant
    isBundle: false,
  },
  {
    id: 'journal-plus-1',
    name: 'Journal + 1 Booster',
    description: 'The Dive Journal + 1 Booster Pack',
    originalPrice: 40.00, // 28 + 12
    price: 35.00,
    savings: 5.00,
    shopifyVariantId: '50232047665418', // Bundle product variant
    isBundle: true,
    recommended: true,
  },
  {
    id: 'journal-plus-2',
    name: 'Journal + 2 Boosters',
    description: 'The Dive Journal + 2 Booster Packs',
    originalPrice: 52.00, // 28 + 24
    price: 44.00,
    savings: 8.00,
    shopifyVariantId: '52493311672586', // Bundle product variant
    isBundle: true,
    bestValue: true,
  },
];

// Feature cards for the journal sections
const JOURNAL_FEATURES = [
  {
    id: 'log-pages',
    title: 'Dive Log Pages',
    subtitle: '30 Full Colour Pages',
    description: 'Quick & easy visual layout to log all dive info with our custom Diver\'gram for personal equipment setup.',
    image: 'logPagesCard',
    icon: '📝',
  },
  {
    id: 'marine-safari',
    title: 'Marine Safari',
    subtitle: 'Wildlife Checklist',
    description: 'Illustrated marine guide for wildlife spotting. Check off all you\'ve seen & add your own along the way.',
    image: 'marineSafari',
    icon: '🐠',
  },
  {
    id: 'where-can-i-see',
    title: 'Where Can I See?',
    subtitle: 'Global Hotspots',
    description: 'Worldwide dive site map & marine life hotspots. Plan your next underwater adventure.',
    image: 'whereCanISee',
    icon: '🗺️',
  },
  {
    id: 'milestones',
    title: 'Milestones & Achievements',
    subtitle: 'Track Your Journey',
    description: 'A dedicated space for your certifications, dive counts, and big achievements.',
    image: 'milestones',
    icon: '🏆',
  },
];

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function DiveJournalPage() {
  const [selectedImage, setSelectedImage] = useState('hero');
  const [selectedBundle, setSelectedBundle] = useState('journal-only');
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Get cart context for side cart
  const { addToCart, openCart } = useCart();
  
  // Get currency context
  const { formatPrice } = useCurrency();

  // Thumbnail images for gallery
  const thumbnails = [
    { key: 'hero', label: 'Overview' },
    { key: 'storage', label: 'Storage' },
    { key: 'logPages', label: 'Log Pages' },
    { key: 'reefFish', label: 'Marine Guide' },
    { key: 'withComputer', label: 'In Use' },
  ];

  // Get selected bundle data
  const currentBundle = BUNDLE_OPTIONS.find(b => b.id === selectedBundle);

  // Handle add to cart - opens side cart
  const handleAddToCart = () => {
    // Add the bundle (or single item) to cart using its Shopify variant ID
    addToCart({ 
      id: currentBundle.shopifyVariantId, 
      shopifyVariantId: currentBundle.shopifyVariantId,
      name: currentBundle.name,
      price: currentBundle.price,
      image: PRODUCT.images.hero,
      type: 'product',
    });
    // Open the side cart
    if (openCart) openCart();
  };

  return (
    <div 
      className="min-h-screen w-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ===========================================
          HEADER - SHARED COMPONENT
          =========================================== */}
      <Header variant="dark" currentPath="/products/dive-journal" />

      {/* ===========================================
          HERO SECTION
          =========================================== */}
      <section 
        className="min-h-screen relative pt-14"
        style={{
          background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
        }}
      >
        {/* Hero Content */}
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 pt-10 pb-12 gap-12">
          {/* Left - Product Info */}
          <div className="lg:w-1/2 max-w-xl">
            <motion.span 
              className="text-sm tracking-[0.25em] font-medium mb-4 block"
              style={{ color: LUNA.highlight }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {PRODUCT.tagline}
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
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
              The Dive<br/>Journal
            </motion.h1>

            <motion.p 
              className="text-white/70 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {PRODUCT.description}
            </motion.p>

            {/* Price & Bundle Selection */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Bundle Options */}
              <div className="space-y-3">
                {BUNDLE_OPTIONS.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="p-4 rounded-xl cursor-pointer transition-all relative"
                    style={{ 
                      background: selectedBundle === bundle.id ? 'rgba(167, 235, 242, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: selectedBundle === bundle.id ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.1)',
                    }}
                    onClick={() => setSelectedBundle(bundle.id)}
                  >
                    {/* Badges */}
                    {bundle.recommended && (
                      <span 
                        className="absolute -top-2 right-4 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: LUNA.highlight, color: LUNA.abyss }}
                      >
                        RECOMMENDED
                      </span>
                    )}
                    {bundle.bestValue && (
                      <span 
                        className="absolute -top-2 right-4 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: '#FF6B9D', color: 'white' }}
                      >
                        BEST VALUE
                      </span>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Radio button */}
                        <div 
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                          style={{ 
                            borderColor: selectedBundle === bundle.id ? LUNA.highlight : 'rgba(255,255,255,0.3)',
                          }}
                        >
                          {selectedBundle === bundle.id && (
                            <div 
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: LUNA.highlight }}
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{bundle.name}</p>
                          <p className="text-white/50 text-xs">{bundle.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {bundle.savings > 0 && (
                            <span className="text-white/40 text-sm line-through">{formatPrice(bundle.originalPrice)}</span>
                          )}
                          <span className="text-white font-bold text-lg">{formatPrice(bundle.price)}</span>
                        </div>
                        {bundle.savings > 0 && (
                          <span className="text-xs" style={{ color: '#FF6B9D' }}>
                            Save {formatPrice(bundle.savings)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booster Pack Link */}
              <div className="text-center">
                <Link 
                  href={BOOSTER_PACK.link}
                  className="text-sm hover:underline"
                  style={{ color: LUNA.highlight }}
                >
                  View Booster Pack details →
                </Link>
              </div>

              {/* Add to Cart / Notify Me Button - Auto-checks stock */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="text-white/50 text-sm">Total:</span>
                  <span className="text-white text-2xl font-bold ml-2">{formatPrice(currentBundle.price)}</span>
                </div>
                
                <SmartProductButton
                  productName={currentBundle.name}
                  variantId={currentBundle.shopifyVariantId}
                  onAddToCart={handleAddToCart}
                  variant="dark"
                  showStockBadge={true}
                />
              </div>
            </motion.div>
          </div>

          {/* Right - Image Gallery */}
          <motion.div 
            className="lg:w-1/2 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Main Image */}
            <div className="relative mb-6">
              <motion.img
                key={selectedImage}
                src={PRODUCT.images[selectedImage]}
                alt={PRODUCT.name}
                className="max-h-[500px] w-auto rounded-2xl shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.key}
                  onClick={() => setSelectedImage(thumb.key)}
                  className="w-16 h-16 rounded-lg overflow-hidden transition-all"
                  style={{
                    border: selectedImage === thumb.key ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.2)',
                    opacity: selectedImage === thumb.key ? 1 : 0.6,
                  }}
                >
                  <img 
                    src={PRODUCT.images[thumb.key]} 
                    alt={thumb.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* ===========================================
          WHAT'S INSIDE SECTION
          =========================================== */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className="text-sm tracking-[0.25em] font-medium mb-4 block"
              style={{ color: LUNA.surfaceTeal }}
            >
              WHAT'S INSIDE
            </span>
            <h2 
              className="text-4xl md:text-5xl font-bold"
              style={{ color: LUNA.deepWater }}
            >
              Everything You Need
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {JOURNAL_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ 
                  background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 100%)`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image - Better positioning */}
                  <div className="md:w-1/2 h-48 md:h-64 overflow-hidden">
                    <img 
                      src={PRODUCT.images[feature.image]}
                      alt={feature.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <span className="text-3xl mb-3">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm mb-3" style={{ color: LUNA.highlight }}>{feature.subtitle}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================
          THE DIVER'GRAM SECTION
          =========================================== */}
      <section 
        className="py-24 px-8"
        style={{
          background: `linear-gradient(180deg, ${LUNA.abyss} 0%, ${LUNA.deepWater} 100%)`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={PRODUCT.images.logPages}
                alt="Diver'gram"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span 
                className="text-sm tracking-[0.25em] font-medium mb-4 block"
                style={{ color: LUNA.highlight }}
              >
                UNIQUE FEATURE
              </span>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ 
                  background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                The Diver'gram
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Forget scribbling lengthy notes about your gear. We designed the Diver'gram to make logging intuitive. 
                Simply mark your weight placement and equipment setup directly on the visual diagram.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                It combines your standard stats with a clear layout, helping you remember exactly what configuration 
                worked best for your next dive.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  'Visual weight placement tracking',
                  'Equipment configuration at a glance',
                  'Build your personal benchmark',
                  'No more guessing what worked',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${LUNA.highlight}20`, border: `1px solid ${LUNA.highlight}` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="3">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===========================================
          LOG THE EXPERIENCE SECTION
          =========================================== */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: LUNA.deepWater }}
            >
              Log The Whole Experience
            </h2>
            <p 
              className="text-xl max-w-2xl mx-auto mb-12"
              style={{ color: LUNA.midDepth }}
            >
              Every dive is different. That's why The Dive Journal helps you capture how the dive felt, 
              what you learned, and what you saw. Not just your depth and bottom time.
            </p>
          </motion.div>

          {/* Image Row */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div 
              className="aspect-square rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img 
                src={PRODUCT.images.stacked}
                alt="Journals stacked"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            <motion.div 
              className="aspect-square rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={PRODUCT.images.withComputer}
                alt="In use with dive computer"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            <motion.div 
              className="aspect-square rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <img 
                src={PRODUCT.images.storage}
                alt="Storage compartment"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===========================================
          SPECS & CTA SECTION
          =========================================== */}
      <section 
        className="py-24 px-8"
        style={{
          background: `linear-gradient(180deg, ${LUNA.deepWater} 0%, ${LUNA.abyss} 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Specs */}
            <div>
              <span 
                className="text-sm tracking-[0.25em] font-medium mb-4 block"
                style={{ color: LUNA.highlight }}
              >
                SPECIFICATIONS
              </span>
              <h2 className="text-3xl font-bold text-white mb-8">What's Included</h2>
              
              <div className="space-y-4">
                {[
                  { icon: '📝', text: '30 detailed full-colour log pages' },
                  { icon: '💧', text: 'A5 water-resistant frosted ring binder' },
                  { icon: '🎨', text: 'Illustrated marine life guide' },
                  { icon: '📊', text: 'Custom Diver\'gram for gear setup' },
                  { icon: '🗺️', text: 'Worldwide dive site map' },
                  { icon: '🏆', text: 'Achievement & certification pages' },
                  { icon: '📦', text: 'Storage pocket for cards & notes' },
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80">
                    <span className="text-xl">{spec.icon}</span>
                    <span>{spec.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div 
              className="p-8 rounded-2xl"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${LUNA.highlight}30`
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Ready to Log Your Adventures?</h3>
              
              {/* Mini Bundle Selection */}
              <div className="space-y-2 mb-6">
                {BUNDLE_OPTIONS.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all"
                    style={{ 
                      background: selectedBundle === bundle.id ? 'rgba(167, 235, 242, 0.2)' : 'transparent',
                      border: selectedBundle === bundle.id ? `1px solid ${LUNA.highlight}` : '1px solid transparent',
                    }}
                    onClick={() => setSelectedBundle(bundle.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: selectedBundle === bundle.id ? LUNA.highlight : 'rgba(255,255,255,0.3)' }}
                      >
                        {selectedBundle === bundle.id && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LUNA.highlight }} />
                        )}
                      </div>
                      <span className="text-white text-sm">{bundle.name}</span>
                      {bundle.bestValue && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#FF6B9D', color: 'white' }}>
                          BEST VALUE
                        </span>
                      )}
                    </div>
                    <span className="text-white font-semibold">{formatPrice(bundle.price)}</span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl text-lg font-semibold transition-all mb-4"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${LUNA.highlight}`,
                  color: 'white',
                  boxShadow: `0 0 30px ${LUNA.highlight}30`
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${LUNA.highlight}50` }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Collection - {formatPrice(currentBundle.price)}
              </motion.button>

              <p className="text-white/50 text-sm text-center">
                Free shipping on orders over {formatPrice(30)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          CUSTOMER REVIEWS SECTION
          =========================================== */}
      <ReviewsSection 
        reviews={getReviewsByProduct('dive-journal')}
        title="What Divers Say"
        subtitle="VERIFIED REVIEWS"
        variant="dark"
        showAllLink={true}
      />

      {/* ===========================================
          FOOTER - SHARED COMPONENT
          =========================================== */}
      <Footer />
    </div>
  );
}
