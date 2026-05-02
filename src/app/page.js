'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import HomeProductSelector from '@/components/HomeProductSelector';
import FishyButton from '@/components/FishyButton';
import WhisperText from '@/components/WhisperText';
import TestimonialColumns from '@/components/TestimonialColumns';
import { REVIEWS } from '@/data/reviews';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);

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
        {/* Top Header — full-width white bar */}
        <header className="w-full bg-white border-b border-gray-100 relative z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
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

            <div className="flex items-center gap-3 relative">
              <CurrencySwitcher variant="light" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
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
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {[
                      { href: '/', label: 'Home', accent: true },
                      { href: '/products', label: 'All Products' },
                      { href: '/products/surface-tank', label: 'Surface Tank' },
                      { href: '/products/dive-journal', label: 'Dive Journal' },
                      { href: '/products/logbook-booster-pack', label: 'Log Pages' },
                      { href: '/stickers', label: 'Location Stickers' },
                      { href: '/products/fun-stickers', label: 'Fun Stickers' },
                      { href: '/products/crochet-creatures', label: 'Crochet Creatures' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                        style={{
                          color: item.accent ? LUNA.surfaceTeal : LUNA.deepWater,
                          fontWeight: item.accent ? 500 : 400,
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Brand Tagline — sits above the hero on a white panel */}
        <section className="w-full bg-white pt-10 md:pt-14 pb-6 md:pb-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl md:text-6xl font-bold leading-[1.1] mb-3"
              style={{
                background: `linear-gradient(135deg, ${LUNA.deepWater} 0%, ${LUNA.surfaceTeal} 60%, ${LUNA.midDepth} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <WhisperText text="Build your dive story." wordDelay={0.4} duration={2.0} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 3.4 }}
              className="text-base md:text-lg max-w-2xl mx-auto"
              style={{ color: LUNA.midDepth }}
            >
              Dive stickers, journals, and accessories from the world&rsquo;s best dive sites.
            </motion.p>
          </div>
        </section>

        {/* Hero — Product Selector (padded white container) */}
        <section className="w-full bg-white pb-12 md:pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <HomeProductSelector />
          </div>
        </section>

        {/* ===========================================
            ABOUT US SECTION - With Parallax Background
            =========================================== */}
        <section
          className="w-full py-20 px-8 relative"
          style={{
            backgroundImage: 'url(https://38a44d-4c.myshopify.com/cdn/shop/files/DSC06170-1_b54324ec-8486-412e-9260-1178b2028915.jpg?v=1769573416&width=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${LUNA.abyss}99 0%, ${LUNA.deepWater}88 50%, ${LUNA.midDepth}99 100%)`
            }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header — heading reveals first, paragraph and cards cascade after */}
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{
                  background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <WhisperText text="About Otterseas" wordDelay={0.2} duration={1.4} />
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
                className="text-white/60 text-lg max-w-2xl mx-auto"
              >
                Dive deeper into who we are and what drives us to create products for the diving community.
              </motion.p>
            </div>

            {/* About Cards — cascade in after the heading completes */}
            <div className="grid md:grid-cols-3 gap-8">
              {ABOUT_SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 2.4 + index * 0.4,
                  }}
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
                  <h3 className="text-2xl font-semibold text-white mt-2 mb-4">
                    {section.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA — last in the cascade */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 4.0,
              }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12"
            >
              <FishyButton href="/about">LEARN MORE ABOUT US</FishyButton>
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
                  boxShadow: `0 0 20px ${LUNA.highlight}30`,
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
            CUSTOMER REVIEWS — 3-column scrolling Etsy testimonials
            =========================================== */}
        <TestimonialColumns
          reviews={REVIEWS}
          heading="What divers say."
          eyebrow="Reviewed on Etsy"
          subtext="Verified five-star reviews from divers across the Otterseas Etsy shop."
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
                  Log Pages
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
