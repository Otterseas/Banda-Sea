'use client';

import { useState, useEffect } from 'react';
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
  },
  {
    id: '03',
    name: 'Location Stickers',
    shortName: 'Location\nStickers',
    tagline: 'COLLECT YOUR ADVENTURES',
    description: 'Waterproof vinyl stickers designed through a diver\'s mask-eyed view.',
    image: '/images/stickers-collection.png', // Placeholder - update when image available
    link: '/stickers',
    linkText: 'Read More...',
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
// ABOUT US SECTION COMPONENT
// ===========================================
function AboutUsSection() {
  return (
    <section 
      className="w-full py-24 px-8"
      style={{
        background: `linear-gradient(180deg, ${LUNA.abyss} 0%, ${LUNA.deepWater} 50%, ${LUNA.midDepth} 100%)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div>
            <motion.span 
              className="text-sm tracking-[0.2em] font-medium mb-4 block"
              style={{ color: LUNA.highlight }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              OUR STORY
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Born From The Deep
            </motion.h2>
            
            <motion.p 
              className="text-white/70 text-base leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Otterseas was created by divers, for divers. We understand that every dive is more 
              than just a descent beneath the waves — it's a story, a memory, an adventure that 
              deserves to be captured and cherished.
            </motion.p>
            
            <motion.p 
              className="text-white/70 text-base leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Our products are designed to help you document your underwater journeys, from the 
              vibrant coral reefs of the tropics to the mysterious depths of cold water wrecks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-105"
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

          {/* Right - Visual Element */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div 
              className="aspect-square rounded-3xl p-8 relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${LUNA.highlight}30`
              }}
            >
              {/* Decorative elements */}
              <div 
                className="absolute top-4 right-4 w-20 h-20 rounded-full"
                style={{ 
                  background: `radial-gradient(circle, ${LUNA.highlight}40 0%, transparent 70%)` 
                }}
              />
              <div 
                className="absolute bottom-8 left-8 w-32 h-32 rounded-full"
                style={{ 
                  background: `radial-gradient(circle, ${LUNA.surfaceTeal}30 0%, transparent 70%)` 
                }}
              />
              
              {/* Center content - could be an image or icon */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                <img
                  src="/logo.png"
                  alt="Otterseas"
                  className="w-24 h-24 rounded-2xl mb-6"
                />
                <p 
                  className="text-2xl font-light italic"
                  style={{ color: LUNA.highlight }}
                >
                  "Dive deeper,<br/>collect memories"
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t"
          style={{ borderColor: `${LUNA.highlight}20` }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <p 
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: LUNA.highlight }}
            >
              80+
            </p>
            <p className="text-white/50 text-sm">Dive Locations</p>
          </div>
          <div className="text-center">
            <p 
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: LUNA.highlight }}
            >
              8
            </p>
            <p className="text-white/50 text-sm">Regions Covered</p>
          </div>
          <div className="text-center">
            <p 
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: LUNA.highlight }}
            >
              ∞
            </p>
            <p className="text-white/50 text-sm">Memories To Make</p>
          </div>
        </motion.div>
      </div>
    </section>
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
        {/* ===========================================
            HERO SECTION - SPLIT PANEL
            =========================================== */}
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
                  className="flex flex-col md:flex-row items-center gap-4"
                >
                  {/* Product Title - Left side with vertical line */}
                  <div className="flex items-start gap-4 md:w-1/3 flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <span 
                        className="text-lg font-light mb-2"
                        style={{ color: LUNA.highlight }}
                      >
                        {currentProduct.id}
                      </span>
                      <div 
                        className="w-0.5 h-44"
                        style={{ backgroundColor: LUNA.highlight }}
                      />
                    </div>
                    {/* Gradient text title - larger */}
                    <h1 
                      className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight whitespace-pre-line"
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

                  {/* Product Image - Larger, shifted slightly left */}
                  <div className="flex-1 flex justify-center items-center">
                    <motion.img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="max-h-[520px] w-auto object-contain drop-shadow-2xl"
                      style={{
                        filter: `drop-shadow(0 20px 60px rgba(0,0,0,0.5))`
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tagline and Link - Right side, under product image, left justified */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tagline-${activeProduct}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-8 md:mt-12 text-left md:ml-auto md:mr-16 md:w-1/2"
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
            {/* Hamburger Menu */}
            <div className="absolute top-4 right-6 z-20">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="w-7 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
                <span className="w-7 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
                <span className="w-7 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-14 right-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
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
                      href="/stickers" 
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                      style={{ color: LUNA.deepWater }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Location Stickers
                    </Link>
                    <Link 
                      href="#about" 
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                      style={{ color: LUNA.deepWater }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

              {/* See Collections Button - Links to products page (future) */}
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
        </div>

        {/* ===========================================
            ABOUT US SECTION
            =========================================== */}
        <div id="about">
          <AboutUsSection />
        </div>

        {/* ===========================================
            NEWSLETTER SECTION
            =========================================== */}
        <section 
          className="w-full py-20 px-8"
          style={{
            background: `linear-gradient(180deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 100%)`
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.span 
              className="text-sm tracking-[0.2em] font-medium mb-4 block"
              style={{ color: LUNA.highlight }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              STAY IN THE LOOP
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join Our Dive Community
            </motion.h2>
            
            <motion.p 
              className="text-white/70 text-base leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Subscribe to get updates on new dive locations, product launches, and exclusive offers for fellow ocean enthusiasts.
            </motion.p>

            {/* Newsletter Form */}
            <motion.form
              action="mailto:info@otterseas.com"
              method="POST"
              encType="text/plain"
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 rounded-lg text-sm outline-none transition-all focus:ring-2"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${LUNA.highlight}40`,
                  color: 'white',
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${LUNA.highlight}`,
                  color: 'white',
                  boxShadow: `0 0 20px ${LUNA.highlight}30`
                }}
              >
                Subscribe
              </button>
            </motion.form>

            <motion.p 
              className="text-white/40 text-xs mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              No spam, just good vibes from the deep. Unsubscribe anytime.
            </motion.p>
          </div>
        </section>

        {/* ===========================================
            FULL WIDTH FOOTER
            =========================================== */}
        <footer 
          className="w-full py-12 px-8"
          style={{ backgroundColor: LUNA.abyss }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Otterseas"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <span className="text-lg font-medium text-white">Otterseas</span>
              </div>
              
              <nav className="flex gap-6">
                <Link href="/products/surface-tank" className="text-white/50 hover:text-white text-sm transition-colors">
                  Surface Tank
                </Link>
                <Link href="/products/dive-journal" className="text-white/50 hover:text-white text-sm transition-colors">
                  Dive Journal
                </Link>
                <Link href="/stickers" className="text-white/50 hover:text-white text-sm transition-colors">
                  Stickers
                </Link>
              </nav>

              <p className="text-white/40 text-sm">
                © 2025 Otterseas. Dive deeper, collect memories.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
