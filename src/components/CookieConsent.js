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

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: false,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
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
            className="max-w-4xl mx-auto rounded-2xl p-4 md:p-6 shadow-2xl border"
            style={{
              backgroundColor: 'white',
              borderColor: `${LUNA.highlight}30`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Text Content */}
              <div className="flex-1">
                <h3
                  className="font-semibold text-base mb-1"
                  style={{ color: LUNA.deepWater }}
                >
                  We use cookies
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use essential cookies to make our site work and analytics cookies to understand how you use it.
                  By clicking "Accept", you consent to our use of cookies. See our{' '}
                  <Link
                    href="/policies#privacy"
                    className="underline hover:no-underline"
                    style={{ color: LUNA.surfaceTeal }}
                  >
                    Privacy Policy
                  </Link>{' '}
                  for more details.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-gray-100"
                  style={{
                    color: LUNA.midDepth,
                    border: `1px solid ${LUNA.midDepth}30`,
                  }}
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
