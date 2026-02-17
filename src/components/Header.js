'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwitcher from './CurrencySwitcher';
import { useCart } from '@/context/CartContext';
import { ANNOUNCEMENT_CONFIG } from '@/config/announcement';
import { BANNER_HEIGHT } from './AnnouncementBanner';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Complete Navigation Links
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  { href: '/stickers', label: 'Sticker Collection' },
  { href: '/products/surface-tank', label: 'Surface Tank' },
  { href: '/products/dive-journal', label: 'Dive Journal' },
  { href: '/products/logbook-booster-pack', label: 'Booster Pack' },
  { href: '/products/fun-stickers', label: 'Fun Stickers' },
  { href: '/products/crochet-creatures', label: 'Crochet Creatures' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/policies', label: 'Policies' },
];

/**
 * Shared Header Component
 * 
 * Props:
 * @param {string} variant - 'dark' (default, for dark backgrounds) or 'light' (for white backgrounds)
 * @param {string} currentPath - Current page path to highlight in nav (e.g., '/products')
 * @param {boolean} hideOnScroll - Whether header hides when scrolling down (default: true)
 */
export default function Header({ 
  variant = 'dark', 
  currentPath = '/',
  hideOnScroll = true,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(false);
  const { totalItems, openCart } = useCart();

  // Check if announcement banner is visible
  useEffect(() => {
    if (!ANNOUNCEMENT_CONFIG.enabled) {
      setBannerVisible(false);
      return;
    }
    const dismissed = localStorage.getItem(`${ANNOUNCEMENT_CONFIG.bannerId}-dismissed`);
    setBannerVisible(!dismissed);

    // Listen for storage changes (in case banner is dismissed)
    const handleStorage = () => {
      const dismissed = localStorage.getItem(`${ANNOUNCEMENT_CONFIG.bannerId}-dismissed`);
      setBannerVisible(!dismissed);
    };
    window.addEventListener('storage', handleStorage);

    // Also check periodically for same-tab dismissal
    const interval = setInterval(() => {
      const dismissed = localStorage.getItem(`${ANNOUNCEMENT_CONFIG.bannerId}-dismissed`);
      setBannerVisible(!dismissed);
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  // Handle scroll to show/hide header
  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu when hiding
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideOnScroll]);

  const isDark = variant === 'dark';
  
  // Colors based on variant
  const bgColor = isDark ? `${LUNA.abyss}80` : 'rgba(255, 255, 255, 0.95)';
  const textColor = isDark ? 'white' : LUNA.deepWater;
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const borderColor = isDark ? 'border-white/10' : 'border-gray-100';

  // Banner height (approx 40px when visible)
  // Header positions below banner when banner is visible (not dismissed)
  const bannerHeight = bannerVisible ? BANNER_HEIGHT : 0;

  return (
    <motion.header
      className={`fixed left-0 right-0 z-50 px-6 py-3 ${borderColor}`}
      style={{
        backgroundColor: bgColor,
        backdropFilter: 'blur(12px)',
        top: bannerHeight,
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Otterseas"
            className="w-8 h-8 rounded-lg object-contain"
          />
          <span 
            className="text-lg font-normal tracking-tight"
            style={{ color: textColor }}
          >
            Otterseas
          </span>
        </Link>

        {/* Right Side: Currency Switcher + Cart + Menu */}
        <div className="flex items-center gap-3">
          <CurrencySwitcher variant={isDark ? 'dark' : 'light'} />

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className={`relative p-2 ${hoverBg} rounded-lg transition-colors`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 3H2" />
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{ backgroundColor: LUNA.highlight, color: LUNA.abyss }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex flex-col gap-1.5 p-2 ${hoverBg} rounded-lg transition-colors`}
            >
              <span 
                className="w-6 h-0.5"
                style={{ backgroundColor: textColor }}
              />
              <span 
                className="w-6 h-0.5"
                style={{ backgroundColor: textColor }}
              />
              <span 
                className="w-6 h-0.5"
                style={{ backgroundColor: textColor }}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 right-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {NAV_LINKS.map((link) => {
                    const isActive = currentPath === link.href;
                    return (
                      <Link 
                        key={link.href}
                        href={link.href}
                        className={`block px-5 py-3 hover:bg-gray-50 transition-colors text-sm ${isActive ? 'font-medium' : ''}`}
                        style={{ color: isActive ? LUNA.surfaceTeal : LUNA.deepWater }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
