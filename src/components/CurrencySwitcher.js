'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';

// Luna colors
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

export default function CurrencySwitcher({ variant = 'default' }) {
  const { currency, setCurrency, currentCurrency, availableCurrencies, isLoaded } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't render until loaded to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <div className="w-16 h-8 rounded-lg animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
    );
  }

  const isDark = variant === 'dark' || variant === 'default';

  return (
    <div ref={dropdownRef} className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
        style={{
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          color: isDark ? 'white' : LUNA.deepWater,
          border: isDark ? `1px solid ${LUNA.highlight}30` : '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <span>{currentCurrency.flag}</span>
        <span>{currency}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-44 rounded-xl overflow-hidden shadow-xl z-50"
            style={{
              backgroundColor: isDark ? LUNA.abyss : 'white',
              border: isDark ? `1px solid ${LUNA.highlight}30` : '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {availableCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors"
                style={{
                  backgroundColor: currency === curr.code 
                    ? (isDark ? `${LUNA.highlight}20` : 'rgba(84, 172, 191, 0.1)')
                    : 'transparent',
                  color: isDark ? 'white' : LUNA.deepWater,
                }}
                onMouseEnter={(e) => {
                  if (currency !== curr.code) {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currency !== curr.code) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="text-lg">{curr.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{curr.code}</div>
                  <div className="text-xs opacity-60">{curr.name}</div>
                </div>
                {currency === curr.code && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LUNA.surfaceTeal} strokeWidth="3">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                )}
              </button>
            ))}
            
            {/* Note about checkout */}
            <div 
              className="px-4 py-2 text-xs border-t"
              style={{ 
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}
            >
              Checkout in selected currency
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
