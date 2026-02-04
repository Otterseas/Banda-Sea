'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { ReviewsSection } from '@/components/Reviews';
import { getFeaturedReviews } from '@/data/reviews';

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
const PRODUCTS = [
  {
    id: '01',
    name: 'The Surface Tank',
    shortName: 'The\nSurface\nTank',
    tagline: 'MEMORIES THAT STICK',
    description: 'Our premium water bottle that\'s more than just a vessel for hydration - it\'s your reliable companion above the waves.',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=823',
    link: '/products/surface-tank',
    linkText: 'Read More...',
  },
  {
    id: '02',
    name: 'The Dive Journal',
    shortName: 'The\nDive\nJournal',
    tagline: 'MORE THAN JUST STATS',
    description: 'Document your underwater adventures with our beautifully designed dive journal.',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_and_pages-upscale_-_No_Background.png?v=1769576208&width=823',
    link: '/products/dive-journal',
    linkText: 'Read More...',
    imageScale: 0.85,
  },
  {
    id: '03',
    name: 'Location Stickers',
    shortName: 'Location\nStickers',
    tagline: 'COLLECT YOUR ADVENTURES',
    description: 'Waterproof vinyl stickers designed through a diver\'s mask-eyed view.',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Location_sticker_overlays.png?v=1770000931&width=823',
    link: '/stickers',
    linkText: 'Read More...',
    imageScale: 0.7,
  },
  {
    id: '04',
    name: 'Crochet Creatures',
    shortName: 'Crochet\nCreatures',
    tagline: 'HANDCRAFTED WITH LOVE',
    description: 'Unique handmade marine animals - nudibranchs, seahorses, frogfish & more.',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Nudibranches_no_background.png?v=1770015398&width=990',
    link: '/products/crochet-creatures',
    linkText: 'Read More...',
    imageScale: 0.85,
    imageOffset: '5%', // Shift right
  },
];

// ===========================================
// ABOUT US DATA
// ===========================================
const ABOUT_SECTIONS = [
  {
    id: '01',
    title: 'Our Story',
    content: 'Born from a passion for diving and a desire to capture underwater memories, Otterseas creates products that celebrate the diving lifestyle.',
  },
  {
    id: '02', 
    title: 'Our Mission',
    content: 'To help divers around the world document, share, and celebrate their underwater adventures through beautifully designed products.',
  },
  {
    id: '03',
    title: 'Join The Community',
    content: 'Connect with fellow divers, share your collection, and be part of a growing community of underwater explorers.',
  },
];

// ===========================================
// LOADING SCREEN COMPONENT
// ===========================================
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(180deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 50%, ${LUNA.abyss} 100%)`
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ocean waves animation */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: `${progress}%`, transition: 'height 0.3s ease-out' }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={LUNA.highlight} stopOpacity="0.3" />
              <stop offset="100%" stopColor={LUNA.surfaceTeal} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,176C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Logo and text */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <img
          src="/logo.png"
          alt="Otterseas"
          className="w-20 h-20 rounded-2xl mb-4"
        />
        <h1 className="text-3xl font-bold text-white mb-2">Otterseas</h1>
        <p className="text-white/60 text-sm mb-8">Dive deeper, collect memories</p>
        
        {/* Progress bar */}
        <div className="w-48 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: LUNA.highlight, width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===========================================
// MAIN HOMEPAGE COMPONENT
// ===========================================
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentProduct = PRODUCTS[activeProduct];

  // Skip loading on subsequent visits (session storage)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('otterseas-visited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('otterseas-visited', 'true');
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        className="min-h-screen w-full"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Hero Section - Split Panels */}
        <div className="min-h-screen w-full flex flex-col md:flex-row">
          {/* ===========================================
              LEFT PANEL - PRODUCT SHOWCASE (60%)
              =========================================== */}
          <div 
            className="w-full md:w-[60%] min-h-screen md:h-screen md:sticky md:top-0 flex flex-col relative"
            style={{
              background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
            }}
          >
            {/* Header */}
            <header className="flex-shrink-0 h-16 flex items-center px-8 relative z-10">
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
            </header>

            {/* Product Content */}
            <div className="flex-1 flex flex-col justify-center px-8 pb-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row items-center gap-6"
                >
                  {/* Product Title - Left side with vertical line */}
                  <div className="flex items-start gap-4 md:w-1/4 flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <span 
                        className="text-xl font-light mb-2"
                        style={{ color: LUNA.highlight }}
                      >
                        {currentProduct.id}
                      </span>
                      <div 
                        className="w-0.5 h-36"
                        style={{ backgroundColor: LUNA.highlight }}
                      />
                    </div>
                    <h1 
                      className="text-5xl md:text-6xl font-bold leading-tight whitespace-pre-line"
                      style={{
                        background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {currentProduct.shortName}
                    </h1>
                  </div>

                  {/* Product Image - Center, larger */}
                  <div className="flex-1 flex justify-center items-center">
                    <motion.img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="object-contain drop-shadow-2xl"
                      style={{
                        maxHeight: currentProduct.imageScale ? `${500 * currentProduct.imageScale}px` : '500px',
                        maxWidth: '80%',
                        filter: `drop-shadow(0 20px 60px rgba(0,0,0,0.5))`,
                        marginLeft: currentProduct.imageOffset || '0',
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tagline and Link - Bottom Center */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tagline-${activeProduct}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                >
                  <p 
                    className="text-sm tracking-[0.2em] font-medium mb-2"
                    style={{ color: 'white' }}
                  >
                    {currentProduct.tagline}
                  </p>
                  <Link
                    href={currentProduct.link}
                    className="text-sm font-medium underline underline-offset-4 transition-colors hover:opacity-80"
                    style={{ color: LUNA.highlight }}
                  >
                    {currentProduct.linkText}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ===========================================
              RIGHT PANEL - NAVIGATION (40%)
              =========================================== */}
          <div className="w-full md:w-[40%] min-h-screen bg-white flex flex-col relative">
            {/* Currency Switcher & Hamburger Menu */}
            <div className="absolute top-4 right-6 z-20 flex items-center gap-3">
              <CurrencySwitcher variant="light" />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="w-7 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
                <span className="w-7 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
                <span className="w-7 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
              </button>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-14 right-6 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20"
                >
                  <Link 
                    href="/" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                    style={{ color: LUNA.surfaceTeal }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/products" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link 
                    href="/products/surface-tank" 
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                      style={{ color: LUNA.deepWater }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Surface Tank
                    </Link>
                    <Link 
                      href="/products/dive-journal" 
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                      style={{ color: LUNA.deepWater }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dive Journal
                    </Link>
                    <Link 
                      href="/products/logbook-booster-pack" 
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                      style={{ color: LUNA.deepWater }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Booster Pack
                    </Link>
                  <Link 
                    href="/stickers" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Location Stickers
                  </Link>
                  <Link 
                    href="/products/fun-stickers" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Fun Stickers
                  </Link>
                  <Link 
                    href="/products/crochet-creatures" 
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{ color: LUNA.deepWater }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Crochet Creatures
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Navigation */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12">
              <nav className="space-y-8">
                {PRODUCTS.map((product, index) => (
                  <motion.button
                    key={product.id}
                    onClick={() => setActiveProduct(index)}
                    className="w-full text-left group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <span 
                        className="text-sm font-light"
                        style={{ 
                          color: activeProduct === index ? LUNA.deepWater : LUNA.midDepth 
                        }}
                      >
                        {product.id}
                      </span>
                      <div 
                        className="h-px flex-1 max-w-[100px] transition-all duration-300"
                        style={{ 
                          backgroundColor: activeProduct === index ? LUNA.deepWater : '#E5E7EB',
                          transform: activeProduct === index ? 'scaleX(1)' : 'scaleX(0.6)',
                          transformOrigin: 'left'
                        }}
                      />
                    </div>
                    <h2 
                      className="text-2xl md:text-3xl font-semibold transition-colors duration-300"
                      style={{ 
                        color: activeProduct === index ? LUNA.deepWater : LUNA.midDepth,
                        opacity: activeProduct === index ? 1 : 0.6
                      }}
                    >
                      {product.name}
                    </h2>
                  </motion.button>
                ))}
              </nav>

              {/* See Products Button - Links to future products overview */}
              <div className="mt-16">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-wider transition-colors hover:opacity-70"
                  style={{ color: LUNA.deepWater }}
                >
                  SEE COLLECTIONS
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          {/* End of Hero Section - Split Panels */}
        </div>

        {/* ===========================================
            PARALLAX IMAGE SECTION
            =========================================== */}
        <section 
          className="relative h-[50vh] md:h-[60vh] overflow-hidden"
          style={{
            backgroundImage: 'url(https://38a44d-4c.myshopify.com/cdn/shop/files/DSC06170-1_b54324ec-8486-412e-9260-1178b2028915.jpg?v=1769573416&width=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${LUNA.abyss} 0%, transparent 30%, transparent 70%, ${LUNA.abyss} 100%)`
            }}
          />
        </section>

        {/* ===========================================
            ABOUT US SECTION - Full Width Below
            =========================================== */}
        <section 
          className="w-full py-20 px-8"
          style={{
            background: `linear-gradient(180deg, ${LUNA.abyss} 0%, ${LUNA.deepWater} 50%, ${LUNA.midDepth} 100%)`
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{
                  background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                About Otterseas
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Dive deeper into who we are and what drives us to create products for the diving community.
              </p>
            </motion.div>

            {/* About Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {ABOUT_SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="p-8 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid rgba(167, 235, 242, 0.2)`,
                  }}
                >
                  <span 
                    className="text-sm font-light"
                    style={{ color: LUNA.highlight }}
                  >
                    {section.id}
                  </span>
                  <h3 
                    className="text-2xl font-semibold text-white mt-2 mb-4"
                  >
                    {section.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${LUNA.highlight}`,
                  color: 'white',
                  boxShadow: `0 0 20px ${LUNA.highlight}30`
                }}
              >
                Learn More About Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ===========================================
            CUSTOMER REVIEWS SECTION
            =========================================== */}
        <ReviewsSection 
          reviews={getFeaturedReviews(6)}
          title="What Divers Say"
          subtitle="TRUSTED BY THE COMMUNITY"
          variant="light"
          showAllLink={true}
        />

        {/* ===========================================
            SALT & STORIES - BLOG SECTION
            =========================================== */}
        <section 
          className="w-full py-16 px-8"
          style={{ backgroundColor: LUNA.abyss }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span 
                className="text-xs tracking-[0.3em] font-medium mb-3 block"
                style={{ color: LUNA.highlight }}
              >
                FROM THE DEEP
              </span>
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ 
                  background: `linear-gradient(135deg, ${LUNA.highlight} 0%, #FF6B9D 50%, ${LUNA.highlight} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Salt & Stories
              </h2>
              <p className="text-white/60 max-w-lg mx-auto">
                Dive tales, travel tips, and underwater adventures from our community.
              </p>
            </motion.div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Blog Card 1 - Placeholder */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group rounded-2xl overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${LUNA.highlight}20`,
                }}
              >
                <div 
                  className="aspect-[16/10] bg-cover bg-center"
                  style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600)',
                    backgroundColor: LUNA.midDepth,
                  }}
                />
                <div className="p-5">
                  <span className="text-[10px] tracking-wider font-medium" style={{ color: LUNA.surfaceTeal }}>
                    DIVE DESTINATIONS
                  </span>
                  <h3 className="text-white font-semibold mt-2 mb-2 group-hover:text-[#A7EBF2] transition-colors">
                    Top 5 Nudibranch Hotspots in Southeast Asia
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2">
                    Discover the best macro diving destinations for spotting these colorful sea slugs...
                  </p>
                </div>
              </motion.article>

              {/* Blog Card 2 - Placeholder */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group rounded-2xl overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${LUNA.highlight}20`,
                }}
              >
                <div 
                  className="aspect-[16/10] bg-cover bg-center"
                  style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600)',
                    backgroundColor: LUNA.midDepth,
                  }}
                />
                <div className="p-5">
                  <span className="text-[10px] tracking-wider font-medium" style={{ color: LUNA.surfaceTeal }}>
                    GEAR GUIDES
                  </span>
                  <h3 className="text-white font-semibold mt-2 mb-2 group-hover:text-[#A7EBF2] transition-colors">
                    How to Keep Your Dive Gear in Perfect Condition
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2">
                    Essential maintenance tips to extend the life of your dive equipment...
                  </p>
                </div>
              </motion.article>

              {/* Blog Card 3 - Placeholder */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group rounded-2xl overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${LUNA.highlight}20`,
                }}
              >
                <div 
                  className="aspect-[16/10] bg-cover bg-center"
                  style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600)',
                    backgroundColor: LUNA.midDepth,
                  }}
                />
                <div className="p-5">
                  <span className="text-[10px] tracking-wider font-medium" style={{ color: LUNA.surfaceTeal }}>
                    COMMUNITY
                  </span>
                  <h3 className="text-white font-semibold mt-2 mb-2 group-hover:text-[#A7EBF2] transition-colors">
                    Meet the Divers Behind Our Sticker Designs
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2">
                    The stories and adventures that inspire each location sticker...
                  </p>
                </div>
              </motion.article>
            </div>

            {/* View All Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                style={{ color: LUNA.highlight }}
              >
                Read All Stories
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ===========================================
            NEWSLETTER SUBSCRIBE SECTION
            =========================================== */}
        <section 
          className="w-full py-16 px-8"
          style={{ backgroundColor: LUNA.deepWater }}
        >
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                Stay In The Loop
              </h3>
              <p className="text-white/60 mb-8">
                Get updates on new dive locations, products, and exclusive offers.
              </p>
              
              {/* Email Subscription Form */}
              <form 
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle subscription - integrate with your email service
                  const email = e.target.email.value;
                  console.log('Subscribe:', email);
                  alert('Thanks for subscribing!');
                  e.target.reset();
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-4 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                    color: 'white',
                    boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`
                  }}
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-white/40 text-xs mt-4">
                No spam, unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===========================================
            FULL FOOTER - With All Navigation
            =========================================== */}
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
                <Link href="/policies" className="text-white/50 hover:text-white text-sm transition-colors">
                  Policies
                </Link>
              </nav>

              <p className="text-white/40 text-sm">
                © 2025 Otterseas
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
