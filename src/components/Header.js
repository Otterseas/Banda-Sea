'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwitcher from './CurrencySwitcher';

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
  { href: '/policies', label: 'Policies' },
];

/**
 * Shared Header Component
 * 
 * Props:
 * @param {string} variant - 'dark' (default, for dark backgrounds) or 'light' (for white backgrounds)
 * @param {string} currentPath - Current page path to highlight in nav (e.g., '/products')
 * @param {boolean} sticky - Whether header sticks to top (default: true)
 */
export default function Header({ 
  variant = 'dark', 
  currentPath = '/',
  sticky = true,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDark = variant === 'dark';
  
  // Colors based on variant
  const bgColor = isDark ? `${LUNA.abyss}80` : 'rgba(255, 255, 255, 0.95)';
  const textColor = isDark ? 'white' : LUNA.deepWater;
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const borderColor = isDark ? 'border-white/10' : 'border-gray-100';

  return (
    <header 
      className={`${sticky ? 'sticky top-0' : ''} z-50 px-6 py-3 ${borderColor}`}
      style={{ 
        backgroundColor: bgColor, 
        backdropFilter: 'blur(12px)',
      }}
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

        {/* Right Side: Currency Switcher + Menu */}
        <div className="flex items-center gap-3">
          <CurrencySwitcher variant={isDark ? 'dark' : 'light'} />
          
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
    </header>
  );
}
