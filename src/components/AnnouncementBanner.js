'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Banner height constant (used for spacer)
const BANNER_HEIGHT = 32;

/**
 * Announcement Banner Component
 *
 * Displays a dismissible banner at the top of the page with optional discount code.
 * Remembers dismissal state in localStorage.
 * Hides when scrolling down, reappears when scrolling up.
 *
 * Props:
 * @param {string} message - The announcement message to display
 * @param {string} discountCode - Optional discount code to show with copy button
 * @param {string} linkText - Optional link text
 * @param {string} linkHref - Optional link URL
 * @param {string} bannerId - Unique ID to track dismissal (default: 'announcement-banner')
 * @param {string} variant - 'gradient' (default) or 'solid'
 */
export default function AnnouncementBanner({
  message = 'Free shipping on orders over £50!',
  discountCode,
  linkText,
  linkHref,
  bannerId = 'announcement-banner',
  variant = 'gradient',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [copied, setCopied] = useState(false);

  // Check if banner was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(`${bannerId}-dismissed`);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, [bannerId]);

  // Handle scroll to show/hide banner
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top of page
      if (currentScrollY < 50) {
        setIsScrolledUp(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolledUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsScrolledUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(`${bannerId}-dismissed`, 'true');
  };

  const handleCopyCode = async () => {
    if (!discountCode) return;

    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = discountCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const bgStyle = variant === 'gradient'
    ? { background: `linear-gradient(90deg, ${LUNA.deepWater} 0%, ${LUNA.midDepth} 50%, ${LUNA.deepWater} 100%)` }
    : { backgroundColor: LUNA.deepWater };

  const shouldShow = isVisible && isScrolledUp;

  return (
    <>
      {/* Fixed Banner */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: shouldShow ? 0 : -BANNER_HEIGHT,
          opacity: shouldShow ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-[60]"
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <div
          className="relative px-4 py-1.5 text-center"
          style={bgStyle}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            {/* Main Message */}
            <span className="text-white text-xs font-medium">
              {message}
            </span>

            {/* Discount Code with Copy Button */}
            {discountCode && (
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: LUNA.highlight,
                  color: LUNA.abyss,
                }}
              >
                <span>{discountCode}</span>
                {copied ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
              </button>
            )}

            {/* Optional Link */}
            {linkText && linkHref && (
              <a
                href={linkHref}
                className="text-xs font-medium underline underline-offset-2 transition-colors hover:opacity-80"
                style={{ color: LUNA.highlight }}
              >
                {linkText}
              </a>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Dismiss announcement"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Spacer to push content down */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: BANNER_HEIGHT }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Export banner height for Header component
export { BANNER_HEIGHT };

/**
 * Helper function to reset banner dismissal (for testing)
 * Call this from browser console: resetAnnouncementBanner('announcement-banner')
 */
if (typeof window !== 'undefined') {
  window.resetAnnouncementBanner = (bannerId = 'announcement-banner') => {
    localStorage.removeItem(`${bannerId}-dismissed`);
    window.location.reload();
  };
}
