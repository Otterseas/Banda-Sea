'use client';

import Link from 'next/link';
import { SOCIAL_LINKS } from '@/config/urls';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Footer Navigation Links
const FOOTER_NAV = [
  { href: '/products', label: 'All Products' },
  { href: '/products/surface-tank', label: 'Surface Tank' },
  { href: '/products/dive-journal', label: 'Dive Journal' },
  { href: '/stickers', label: 'Location Stickers' },
  { href: '/products/fun-stickers', label: 'Fun Stickers' },
  { href: '/products/crochet-creatures', label: 'Crochet Creatures' },
];

// Legal Links
const LEGAL_LINKS = [
  { href: '/policies', label: 'Policies' },
  { href: '/policies#privacy', label: 'Privacy' },
  { href: '/policies#terms', label: 'Terms' },
];

/**
 * Shared Footer Component
 * 
 * Props:
 * @param {boolean} compact - Use smaller compact version (default: false)
 */
export default function Footer({ compact = false }) {
  
  if (compact) {
    return (
      <footer
        className="w-full px-6 py-6"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Otterseas"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="text-lg font-normal text-white">Otterseas</span>
            </Link>

            <div className="flex items-center gap-6">
              <p className="text-white/40 text-sm">
                © 2025 Otterseas
              </p>
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @otter_seas
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer 
      className="w-full px-6 py-12"
      style={{ backgroundColor: LUNA.abyss }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Top Row: Logo + Nav */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Otterseas"
                className="w-10 h-10 rounded-xl object-contain"
              />
              <span className="text-lg font-medium text-white">Otterseas</span>
            </Link>
            
            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6">
              {FOOTER_NAV.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Bottom Row: Copyright + Legal + Social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2025 Otterseas. Dive deeper, collect memories.
            </p>

            <div className="flex gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-white/40 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Instagram Link */}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @otter_seas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
