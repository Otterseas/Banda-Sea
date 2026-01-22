'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems, openDrawer } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-16 flex items-center justify-between px-6 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Otterseas" 
          className="w-9 h-9 rounded-xl object-contain"
        />
        <span 
          className="text-xl font-light tracking-tight"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#0A2540' }}
        >
          Otterseas
        </span>
      </Link>

      {/* Cart Button */}
      <button
        onClick={openDrawer}
        className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
        style={{ backgroundColor: '#D99E30', color: 'white' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {totalItems > 0 && (
          <span className="font-semibold">{totalItems}</span>
        )}
      </button>
    </header>
  );
}
