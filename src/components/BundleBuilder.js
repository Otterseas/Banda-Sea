'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { getAllStickers, REGIONS } from '@/data/stickers';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Bundle configurations
const BUNDLE_OPTIONS = [
  { count: 6, price: 10.00, originalPrice: 15.00, savings: 5.00, label: '6 Pack' },
  { count: 9, price: 15.00, originalPrice: 22.50, savings: 7.50, label: '9 Pack' },
  { count: 12, price: 18.00, originalPrice: 30.00, savings: 12.00, label: '12 Pack' },
];

/**
 * Build Your Own Bundle Component
 * Allows users to select stickers and create a custom bundle at a discount
 */
export default function BundleBuilder() {
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [activeRegion, setActiveRegion] = useState('All');
  const [targetBundle, setTargetBundle] = useState(BUNDLE_OPTIONS[0]);
  const { addToCart, openDrawer } = useCart();
  const { formatPrice } = useCurrency();

  const allStickers = useMemo(() => getAllStickers(), []);

  // Filter stickers by region
  const filteredStickers = useMemo(() => {
    if (activeRegion === 'All') return allStickers;
    return allStickers.filter((s) => s.region === activeRegion);
  }, [allStickers, activeRegion]);

  // Toggle sticker selection
  const toggleSticker = (sticker) => {
    setSelectedStickers((prev) => {
      const exists = prev.find((s) => s.id === sticker.id);
      if (exists) {
        return prev.filter((s) => s.id !== sticker.id);
      }
      if (prev.length >= targetBundle.count) {
        // Replace oldest selection
        return [...prev.slice(1), sticker];
      }
      return [...prev, sticker];
    });
  };

  // Check if sticker is selected
  const isSelected = (stickerId) => selectedStickers.some((s) => s.id === stickerId);

  // Progress calculation
  const progress = (selectedStickers.length / targetBundle.count) * 100;
  const isComplete = selectedStickers.length >= targetBundle.count;

  // Add bundle to cart
  const handleAddBundle = () => {
    if (!isComplete) return;

    // Add each sticker individually with bundle pricing
    const pricePerSticker = targetBundle.price / targetBundle.count;

    selectedStickers.forEach((sticker) => {
      addToCart({
        id: sticker.shopifyVariantId,
        shopifyVariantId: sticker.shopifyVariantId,
        name: sticker.name,
        price: pricePerSticker,
        image: sticker.image,
        type: 'location-sticker',
        bundleId: `custom-bundle-${Date.now()}`,
      });
    });

    openDrawer();
    setSelectedStickers([]);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${LUNA.deepWater} 0%, ${LUNA.abyss} 100%)`,
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: LUNA.surfaceTeal, color: 'white' }}
          >
            BUILD YOUR OWN
          </span>
          <span className="text-green-400 text-xs font-medium">
            Save up to {formatPrice(12)}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">
          Custom Sticker Bundle
        </h3>
        <p className="text-white/60 text-sm">
          Pick your favorite dive spots and save
        </p>
      </div>

      {/* Bundle Size Selector */}
      <div className="px-6 pb-4">
        <div className="flex gap-2">
          {BUNDLE_OPTIONS.map((option) => (
            <button
              key={option.count}
              onClick={() => {
                setTargetBundle(option);
                // Trim selection if new target is smaller
                if (selectedStickers.length > option.count) {
                  setSelectedStickers((prev) => prev.slice(0, option.count));
                }
              }}
              className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  targetBundle.count === option.count
                    ? LUNA.surfaceTeal
                    : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border:
                  targetBundle.count === option.count
                    ? `2px solid ${LUNA.highlight}`
                    : '2px solid transparent',
              }}
            >
              <div>{option.label}</div>
              <div className="text-xs opacity-70">{formatPrice(option.price)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-xs text-white/60 mb-2">
          <span>
            {selectedStickers.length} of {targetBundle.count} selected
          </span>
          <span>Save {formatPrice(targetBundle.savings)}</span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: isComplete ? '#22c55e' : LUNA.surfaceTeal,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Selected Stickers Preview */}
      {selectedStickers.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {selectedStickers.map((sticker, index) => (
              <motion.div
                key={sticker.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="relative flex-shrink-0"
              >
                <div
                  className="w-12 h-12 rounded-lg overflow-hidden border-2"
                  style={{ borderColor: LUNA.highlight }}
                >
                  <img
                    src={sticker.image}
                    alt={sticker.name}
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
                <button
                  onClick={() => toggleSticker(sticker)}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center"
                >
                  ×
                </button>
              </motion.div>
            ))}
            {/* Empty slots */}
            {Array.from({ length: targetBundle.count - selectedStickers.length }).map(
              (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-12 h-12 rounded-lg border-2 border-dashed flex-shrink-0"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* Region Filter */}
      <div className="px-6 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveRegion('All')}
            className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
            style={{
              backgroundColor:
                activeRegion === 'All' ? LUNA.surfaceTeal : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
            }}
          >
            All Regions
          </button>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
              style={{
                backgroundColor:
                  activeRegion === region ? LUNA.surfaceTeal : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
              }}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Sticker Grid */}
      <div
        className="px-6 pb-4 max-h-[300px] overflow-y-auto"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {filteredStickers.map((sticker) => {
            const selected = isSelected(sticker.id);
            return (
              <motion.button
                key={sticker.id}
                onClick={() => toggleSticker(sticker)}
                className="relative aspect-square rounded-lg overflow-hidden transition-all"
                style={{
                  border: selected
                    ? `2px solid ${LUNA.highlight}`
                    : '2px solid transparent',
                  boxShadow: selected ? `0 0 10px ${LUNA.highlight}50` : 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  className="w-full h-full object-contain bg-white"
                />
                {selected && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(84, 172, 191, 0.3)' }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
                <div
                  className="absolute bottom-0 left-0 right-0 px-1 py-0.5 text-[8px] text-white font-medium truncate"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                >
                  {sticker.name}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Add Bundle Button */}
      <div className="px-6 pb-6">
        <motion.button
          onClick={handleAddBundle}
          disabled={!isComplete}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: isComplete
              ? `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`
              : 'rgba(255, 255, 255, 0.05)',
            color: isComplete ? 'white' : 'rgba(255, 255, 255, 0.3)',
            cursor: isComplete ? 'pointer' : 'not-allowed',
            boxShadow: isComplete ? `0 0 20px ${LUNA.surfaceTeal}40` : 'none',
          }}
          whileHover={isComplete ? { scale: 1.02 } : {}}
          whileTap={isComplete ? { scale: 0.98 } : {}}
        >
          {isComplete ? (
            <>
              Add Bundle to Cart - {formatPrice(targetBundle.price)}
              <span className="ml-2 text-xs opacity-70">
                (Save {formatPrice(targetBundle.savings)})
              </span>
            </>
          ) : (
            `Select ${targetBundle.count - selectedStickers.length} more stickers`
          )}
        </motion.button>
      </div>
    </div>
  );
}
