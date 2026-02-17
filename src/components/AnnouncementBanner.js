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

/**
 * Announcement Banner Component
 *
 * Displays a dismissible banner at the top of the page with optional discount code.
 * Remembers dismissal state in localStorage.
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
  const [copied, setCopied] = useState(false);

  // Check if banner was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(`${bannerId}-dismissed`);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, [bannerId]);

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

  return (
    <>
      {/* Fixed Banner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
          >
            <div
              className="relative px-4 py-2.5 text-center"
              style={bgStyle}
            >
              <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
                {/* Main Message */}
                <span className="text-white text-sm font-medium">
                  {message}
                </span>

                {/* Discount Code with Copy Button */}
                {discountCode && (
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold transition-all hover:scale-105"
                    style={{
                      backgroundColor: LUNA.highlight,
                      color: LUNA.abyss,
                    }}
                  >
                    <span>{discountCode}</span>
                    {copied ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    className="text-sm font-medium underline underline-offset-2 transition-colors hover:opacity-80"
                    style={{ color: LUNA.highlight }}
                  >
                    {linkText}
                  </a>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Dismiss announcement"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push content down */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          />
        )}
      </AnimatePresence>
    </>
  );
}

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
