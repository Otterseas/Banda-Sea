'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { ReviewsSection } from '@/components/Reviews';
import { getFeaturedReviews } from '@/data/reviews';
import { SOCIAL_LINKS, SHOPIFY_BLOG_URL } from '@/config/urls';

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
// NEWSLETTER FORM COMPONENT
// ===========================================
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! 🎉');
        setEmail('');
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 border border-white/20"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <span className="text-white">{message}</span>
      </motion.div>
    );
  }

  return (
    <form 
      className="flex flex-col sm:flex-row gap-3"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === 'loading'}
        className="flex-1 px-5 py-4 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:hover:scale-100"
        style={{
          background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
          color: 'white',
          boxShadow: `0 4px 20px ${LUNA.surfaceTeal}40`
        }}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2">{message}</p>
      )}
    </form>
  );
}

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
    imageScale: 0.765,
    imageOffset: '12%', // Shift right to avoid text overlap
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
  const [blogPosts, setBlogPosts] = useState([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);

  const currentProduct = PRODUCTS[activeProduct];

  // Skip loading on subsequent visits (session storage)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('otterseas-visited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  // Fetch blog posts from Shopify
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('/api/blog?blog=news&limit=3');
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setBlogPosts(data.articles);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
      } finally {
        setIsBlogLoading(false);
      }
    }
    fetchBlogPosts();
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
              LEFT PANEL - PRODUCT SHOWCASE (60%) - Desktop Only
              =========================================== */}
          <div
            className="hidden md:flex w-full md:w-[60%] min-h-screen md:h-screen md:sticky md:top-0 flex-col relative"
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
              RIGHT PANEL - NAVIGATION (40%) / Mobile Full Width
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

            {/* Product Navigation - Accordion on Mobile, Tabs on Desktop */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-8 md:py-0">
              {/* Mobile Header */}
              <div className="md:hidden mb-6">
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <img
                    src="/logo.png"
                    alt="Otterseas"
                    className="w-10 h-10 rounded-xl object-contain"
                  />
                  <span className="text-xl font-medium tracking-tight" style={{ color: LUNA.deepWater }}>
                    Otterseas
                  </span>
                </Link>
              </div>

              <nav className="space-y-4 md:space-y-8">
                {PRODUCTS.map((product, index) => (
                  <div key={product.id}>
                    <motion.button
                      onClick={() => setActiveProduct(activeProduct === index ? -1 : index)}
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
                        {/* Mobile Accordion Arrow */}
                        <span className="md:hidden ml-auto">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={activeProduct === index ? LUNA.deepWater : LUNA.midDepth}
                            strokeWidth="2"
                            className={`transition-transform duration-300 ${activeProduct === index ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
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

                    {/* Mobile Accordion Content - Image & Info */}
                    <AnimatePresence>
                      {activeProduct === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="md:hidden overflow-hidden"
                        >
                          <div
                            className="mt-4 p-4 rounded-2xl"
                            style={{
                              background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 100%)`
                            }}
                          >
                            {/* Product Image */}
                            <div className="flex justify-center mb-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="object-contain drop-shadow-xl"
                                style={{
                                  maxHeight: product.imageScale ? `${200 * product.imageScale}px` : '200px',
                                  maxWidth: '80%',
                                }}
                              />
                            </div>
                            {/* Tagline */}
                            <p
                              className="text-xs tracking-[0.15em] font-medium text-center mb-2"
                              style={{ color: LUNA.highlight }}
                            >
                              {product.tagline}
                            </p>
                            {/* Description */}
                            <p className="text-white/70 text-sm text-center mb-4">
                              {product.description}
                            </p>
                            {/* Link */}
                            <Link
                              href={product.link}
                              className="block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all"
                              style={{
                                background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                                color: 'white',
                              }}
                            >
                              {product.linkText}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
              className="flex justify-center items-center gap-4 mt-12"
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
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${LUNA.highlight}`,
                  color: 'white',
                  boxShadow: `0 0 20px ${LUNA.highlight}30`
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @otter_seas
              </a>
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
            <div className={`grid gap-6 mb-10 ${blogPosts.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
              {isBlogLoading ? (
                // Loading skeletons
                [0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${LUNA.highlight}20`,
                    }}
                  >
                    <div className="aspect-[16/10] bg-white/10 animate-pulse" />
                    <div className="p-5">
                      <div className="h-3 w-20 bg-white/10 rounded animate-pulse mb-3" />
                      <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse mb-2" />
                      <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                    </div>
                  </div>
                ))
              ) : blogPosts.length > 0 ? (
                // Real blog posts from Shopify
                blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${LUNA.highlight}20`,
                    }}
                  >
                    <a
                      href={`${SHOPIFY_BLOG_URL}/${post.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div
                        className="aspect-[16/10] bg-cover bg-center"
                        style={{
                          backgroundImage: post.image?.url ? `url(${post.image.url})` : undefined,
                          backgroundColor: LUNA.midDepth,
                        }}
                      />
                      <div className="p-5">
                        <span className="text-[10px] tracking-wider font-medium" style={{ color: LUNA.surfaceTeal }}>
                          {(post.tags?.[0] || 'BLOG').toUpperCase()}
                        </span>
                        <h3 className="text-white font-semibold mt-2 mb-2 group-hover:text-[#A7EBF2] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-white/50 text-sm line-clamp-2">
                          {post.excerpt || 'Read more...'}
                        </p>
                      </div>
                    </a>
                  </motion.article>
                ))
              ) : (
                // No posts - show coming soon message
                <div className="col-span-full text-center py-8">
                  <p className="text-white/50">Blog posts coming soon!</p>
                </div>
              )}
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
              <NewsletterForm />
              
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
