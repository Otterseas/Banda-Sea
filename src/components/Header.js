'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwitcher from './CurrencySwitcher';
import { useCart } from '@/context/CartContext';
import { ANNOUNCEMENT_CONFIG } from '@/config/announcement';
import { BANNER_HEIGHT } from './AnnouncementBanner';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  pink: '#FF6B9D',
};

// Tight labels so all the categories fit along the top nav at lg+ widths.
// Home is omitted — the logo in the corner already routes to '/'. Shop and
// Blog moved to the mobile drawer to keep the desktop bar focused on the
// six core product pages.
const NAV_LINKS = [
  { href: '/products/dive-journal', label: 'Dive Journal' },
  { href: '/products/logbook-booster-pack', label: 'Log Pages' },
  { href: '/products/surface-tank', label: 'Surface Tank' },
  { href: '/stickers', label: 'Stickers' },
  { href: '/products/fun-stickers', label: 'Fun Stickers' },
  { href: '/products/clothing', label: 'Clothing' },
  { href: '/products/crochet-creatures', label: 'Crochet' },
];

// Mobile hamburger menu adds Home, Shop, Blog and Policies back — there's
// room for them on small screens.
const MOBILE_MENU_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  ...NAV_LINKS,
  { href: '/blogs', label: 'Blog' },
  { href: '/policies', label: 'Policies' },
];

// Tracks the active nav link and renders a glowing 'limelight' bar above it
// that slides between items. The bar + its trapezoidal glow use the cyan →
// pink → deep-water gradient we use on feature headlines.
function LimelightNav({ items, activeHref, isDark }) {
  const itemRefs = useRef([]);
  const limelightRef = useRef(null);
  const matchedIndex = items.findIndex((it) => it.href === activeHref);
  const [activeIndex, setActiveIndex] = useState(matchedIndex >= 0 ? matchedIndex : 0);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    const activeItem = itemRefs.current[activeIndex];
    if (limelight && activeItem) {
      // Match the bar to the active link's width (minus a small inset) so it
      // visually underlines/overlines the whole word rather than sitting as a
      // tiny dot in the middle.
      const barWidth = Math.max(40, activeItem.offsetWidth - 14);
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - barWidth / 2;
      limelight.style.width = `${barWidth}px`;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        const t = setTimeout(() => setIsReady(true), 60);
        return () => clearTimeout(t);
      }
    }
  }, [activeIndex, isReady, items]);

  // Sync the active item with the route when navigating.
  useEffect(() => {
    if (matchedIndex >= 0 && matchedIndex !== activeIndex) {
      setActiveIndex(matchedIndex);
    }
  }, [matchedIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const textColor = isDark ? 'white' : COLORS.deepWater;
  const limelightGradient = `linear-gradient(90deg, ${COLORS.surfaceTeal} 0%, ${COLORS.pink} 50%, ${COLORS.deepWater} 100%)`;
  const glowGradient = `linear-gradient(to bottom, ${COLORS.pink}55 0%, ${COLORS.surfaceTeal}22 40%, transparent 100%)`;

  return (
    <nav className="relative inline-flex items-center h-12 px-1">
      {items.map((item, i) => {
        const isActive = activeIndex === i;
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => setActiveIndex(i)}
            className="relative z-20 flex h-full items-center justify-center px-3 text-[11px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap transition-opacity hover:opacity-70"
            style={{
              color: textColor,
              opacity: isActive ? 1 : 0.32,
            }}
          >
            {item.label}
          </Link>
        );
      })}

      {/* The limelight bar + downward trapezoid glow. */}
      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 h-[3px] rounded-full pointer-events-none ${
          isReady ? 'transition-[left,width] duration-500 ease-in-out' : ''
        }`}
        style={{
          left: '-999px',
          width: '40px',
          background: limelightGradient,
          boxShadow: `0 0 16px ${COLORS.pink}80, 0 0 32px ${COLORS.pink}40`,
        }}
      >
        <div
          className="absolute left-[-40%] top-[3px] w-[180%] h-12"
          style={{
            clipPath: 'polygon(5% 100%, 25% 0, 75% 0, 95% 100%)',
            background: glowGradient,
          }}
        />
      </div>
    </nav>
  );
}

/**
 * Shared Header Component
 *
 * Props:
 * @param {string} variant - 'dark' (default, for dark backgrounds) or 'light' (for white backgrounds)
 * @param {string} currentPath - Current page path to highlight in nav
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

  // Announcement banner visibility
  useEffect(() => {
    if (!ANNOUNCEMENT_CONFIG.enabled) {
      setBannerVisible(false);
      return;
    }
    const dismissed = localStorage.getItem(`${ANNOUNCEMENT_CONFIG.bannerId}-dismissed`);
    setBannerVisible(!dismissed);
    const handleStorage = () => {
      const d = localStorage.getItem(`${ANNOUNCEMENT_CONFIG.bannerId}-dismissed`);
      setBannerVisible(!d);
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(() => {
      const d = localStorage.getItem(`${ANNOUNCEMENT_CONFIG.bannerId}-dismissed`);
      setBannerVisible(!d);
    }, 500);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  // Scroll show/hide
  useEffect(() => {
    if (!hideOnScroll) return;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 50) setIsVisible(true);
      else if (y > lastScrollY && y > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else if (y < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideOnScroll]);

  const isDark = variant === 'dark';
  const bgColor = isDark ? `${COLORS.abyss}80` : 'rgba(255, 255, 255, 0.95)';
  const textColor = isDark ? 'white' : COLORS.deepWater;
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const borderColor = isDark ? 'border-white/10' : 'border-gray-100';
  const bannerHeight = bannerVisible ? BANNER_HEIGHT : 0;

  return (
    <motion.header
      className={`fixed left-0 right-0 z-50 px-4 md:px-6 py-3 ${borderColor}`}
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
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
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

        {/* Desktop limelight nav — hidden below lg */}
        <div className="hidden lg:flex flex-1 justify-center">
          <LimelightNav items={NAV_LINKS} activeHref={currentPath} isDark={isDark} />
        </div>

        {/* Right side: currency + cart + hamburger (hamburger only below lg) */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <CurrencySwitcher variant={isDark ? 'dark' : 'light'} />

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            className={`relative p-2 ${hoverBg} rounded-lg transition-colors`}
            aria-label="Open cart"
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
                style={{ backgroundColor: COLORS.highlight, color: COLORS.abyss }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger — only on mobile/tablet (below lg) */}
          <div className="lg:hidden relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex flex-col gap-1.5 p-2 ${hoverBg} rounded-lg transition-colors`}
              aria-label="Open menu"
            >
              <span className="w-6 h-0.5" style={{ backgroundColor: textColor }} />
              <span className="w-6 h-0.5" style={{ backgroundColor: textColor }} />
              <span className="w-6 h-0.5" style={{ backgroundColor: textColor }} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {MOBILE_MENU_LINKS.map((link) => {
                    const isActive = currentPath === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-5 py-3 hover:bg-gray-50 transition-colors text-sm ${
                          isActive ? 'font-medium' : ''
                        }`}
                        style={{ color: isActive ? COLORS.surfaceTeal : COLORS.deepWater }}
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
