'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

const COOKIE_CONSENT_KEY = 'otterseas-cookie-consent';

// Helper to check if analytics cookies are allowed
export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to avoid layout shift on page load
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEssentialOnly = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
  };

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
    // Here you could trigger analytics/marketing scripts
    // e.g., window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl p-5 md:p-6 shadow-2xl border"
            style={{
              backgroundColor: 'white',
              borderColor: `${LUNA.highlight}30`,
            }}
          >
            {/* Text Content */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                To make sure Otterseas swims smoothly, we use cookies. Some are essential to make the shop work (like keeping track of your cart), while others help us see how many visitors are diving into our site.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                We respect your privacy and will never share your data without permission. You can change your mind at any time in our{' '}
                <Link
                  href="/policies#privacy"
                  className="underline hover:no-underline"
                  style={{ color: LUNA.surfaceTeal }}
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleEssentialOnly}
                className="flex-1 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-gray-50"
                style={{
                  color: LUNA.midDepth,
                  border: `1px solid ${LUNA.midDepth}30`,
                  backgroundColor: 'white',
                }}
              >
                Accept Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                }}
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
