'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const details = [
    'High-quality stickers, designed to last!',
    'Die-cut premium vinyl - 60mm x 37mm / 2.38" x 1.5"',
    'Water & weather resistant',
    'UV protected',
    'Durable & long-lasting',
  ];

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-left group"
      >
        <h3 
          className="text-xl font-light"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#0A2540' }}
        >
          Product Details
        </h3>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D99E30"
          strokeWidth="2"
          className="mt-1"
        >
          <path d="M6 9l6 6 6-6"/>
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2">
              {details.map((detail, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: '#D99E30' }}
                >
                  <span className="mt-1">•</span>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
