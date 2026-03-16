'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllStickers, REGIONS } from '@/data/stickers';
import Link from 'next/link';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Regional hotspot positions on map (x, y percentages)
const REGION_HOTSPOTS = {
  'UK/Europe': { x: 47, y: 22, label: 'UK & Europe' },
  'USA/Canada': { x: 18, y: 30, label: 'North America' },
  'South East Asia': { x: 78, y: 48, label: 'SE Asia' },
  'Caribbean': { x: 25, y: 42, label: 'Caribbean' },
  'Indian Ocean': { x: 62, y: 52, label: 'Indian Ocean' },
  'Pacific & Oceania': { x: 88, y: 60, label: 'Pacific' },
  'Latin America': { x: 28, y: 62, label: 'Latin America' },
  'Expeditions': { x: 50, y: 75, label: 'Expeditions' },
};

// Popular dive spots for extra markers
const POPULAR_SPOTS = [
  { name: 'Red Sea', x: 55, y: 38, region: 'Indian Ocean' },
  { name: 'Great Barrier Reef', x: 88, y: 55, region: 'Pacific & Oceania' },
  { name: 'Maldives', x: 65, y: 48, region: 'Indian Ocean' },
  { name: 'Thailand', x: 74, y: 44, region: 'South East Asia' },
  { name: 'Philippines', x: 82, y: 42, region: 'South East Asia' },
  { name: 'Indonesia', x: 80, y: 54, region: 'South East Asia' },
  { name: 'Mexico', x: 18, y: 42, region: 'Caribbean' },
  { name: 'Galapagos', x: 22, y: 54, region: 'Latin America' },
];

/**
 * Interactive Dive Map Component
 * Shows world map with dive regions and allows suggestions
 */
export default function DiveMap({ onRegionSelect, showSuggest = true }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [suggestion, setSuggestion] = useState({ location: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState('idle');

  const allStickers = useMemo(() => getAllStickers(), []);

  // Count stickers per region
  const regionCounts = useMemo(() => {
    const counts = {};
    REGIONS.forEach((region) => {
      counts[region] = allStickers.filter((s) => s.region === region).length;
    });
    return counts;
  }, [allStickers]);

  // Handle region click
  const handleRegionClick = (region) => {
    setSelectedRegion(region === selectedRegion ? null : region);
    if (onRegionSelect) {
      onRegionSelect(region);
    }
  };

  // Submit location suggestion
  const handleSuggestSubmit = async (e) => {
    e.preventDefault();
    if (!suggestion.location || !suggestion.email) return;

    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/klaviyo/suggest-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: suggestion.email,
          location: suggestion.location,
          source: 'dive-map',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSuggestion({ location: '', email: '' });
        setTimeout(() => {
          setShowSuggestForm(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  // Get stickers for selected region
  const regionStickers = selectedRegion
    ? allStickers.filter((s) => s.region === selectedRegion).slice(0, 6)
    : [];

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: `linear-gradient(180deg, ${LUNA.deepWater} 0%, ${LUNA.abyss} 100%)`,
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-xl font-bold text-white mb-1">Explore Dive Regions</h3>
        <p className="text-white/60 text-sm">
          Click a region to discover available stickers
        </p>
      </div>

      {/* Map Container */}
      <div className="relative px-4 pb-4">
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            aspectRatio: '2/1',
            background: `linear-gradient(180deg, ${LUNA.midDepth}40 0%, ${LUNA.abyss}80 100%)`,
          }}
        >
          {/* Simplified World Map SVG */}
          <svg
            viewBox="0 0 100 50"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.3 }}
          >
            {/* Continents - simplified shapes */}
            <path
              d="M10 15 Q15 10 25 12 L30 18 Q28 25 22 28 L15 25 Q8 20 10 15"
              fill={LUNA.midDepth}
              opacity="0.5"
            />
            <path
              d="M15 30 Q20 28 25 35 L28 45 Q22 48 18 45 L12 38 Q12 32 15 30"
              fill={LUNA.midDepth}
              opacity="0.5"
            />
            <path
              d="M40 12 Q50 8 60 15 L58 25 Q50 28 42 22 L40 12"
              fill={LUNA.midDepth}
              opacity="0.5"
            />
            <path
              d="M45 28 Q55 25 65 35 L60 45 Q50 48 45 42 L45 28"
              fill={LUNA.midDepth}
              opacity="0.5"
            />
            <path
              d="M70 20 Q80 15 90 25 L88 40 Q78 45 72 38 L70 20"
              fill={LUNA.midDepth}
              opacity="0.5"
            />
            <path
              d="M85 42 Q92 38 95 45 L92 48 Q88 50 85 47 L85 42"
              fill={LUNA.midDepth}
              opacity="0.5"
            />
          </svg>

          {/* Region Hotspots */}
          {Object.entries(REGION_HOTSPOTS).map(([region, pos]) => {
            const count = regionCounts[region] || 0;
            const isSelected = selectedRegion === region;
            const size = Math.min(20, 8 + count * 0.8);

            return (
              <motion.button
                key={region}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => handleRegionClick(region)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Pulse animation for selected */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: LUNA.highlight }}
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Marker */}
                <div
                  className="relative rounded-full flex items-center justify-center transition-colors"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: isSelected ? LUNA.highlight : LUNA.surfaceTeal,
                    boxShadow: `0 0 ${isSelected ? 20 : 10}px ${
                      isSelected ? LUNA.highlight : LUNA.surfaceTeal
                    }80`,
                  }}
                >
                  <span
                    className="text-[8px] font-bold"
                    style={{ color: isSelected ? LUNA.abyss : 'white' }}
                  >
                    {count}
                  </span>
                </div>

                {/* Label */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-0.5 rounded text-[8px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: LUNA.abyss,
                    color: 'white',
                  }}
                >
                  {pos.label}
                </div>
              </motion.button>
            );
          })}

          {/* Popular Spot Markers (smaller) */}
          {POPULAR_SPOTS.map((spot) => (
            <motion.div
              key={spot.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onMouseEnter={() => setHoveredSpot(spot.name)}
              onMouseLeave={() => setHoveredSpot(null)}
              whileHover={{ scale: 1.5 }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: LUNA.highlight,
                  opacity: 0.6,
                }}
              />
              {hoveredSpot === spot.name && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-0.5 rounded text-[8px] whitespace-nowrap"
                  style={{ backgroundColor: LUNA.abyss, color: 'white' }}
                >
                  {spot.name}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Selected Region Panel */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 p-4 rounded-xl"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">{selectedRegion}</h4>
                <span className="text-xs" style={{ color: LUNA.highlight }}>
                  {regionCounts[selectedRegion]} stickers
                </span>
              </div>

              {/* Sticker Preview */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {regionStickers.map((sticker) => (
                  <Link
                    key={sticker.id}
                    href={`/stickers/${sticker.slug}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white hover:scale-105 transition-transform">
                      <img
                        src={sticker.image}
                        alt={sticker.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                ))}
                {regionCounts[selectedRegion] > 6 && (
                  <Link
                    href={`/stickers?region=${encodeURIComponent(selectedRegion)}`}
                    className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <span className="text-white text-xs font-medium">
                      +{regionCounts[selectedRegion] - 6}
                    </span>
                  </Link>
                )}
              </div>

              <Link
                href={`/stickers?region=${encodeURIComponent(selectedRegion)}`}
                className="mt-3 block text-center text-sm py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: LUNA.surfaceTeal,
                  color: 'white',
                }}
              >
                View All {selectedRegion} Stickers
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggest Location Section */}
      {showSuggest && (
        <div className="px-6 pb-6">
          {!showSuggestForm ? (
            <button
              onClick={() => setShowSuggestForm(true)}
              className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: `1px dashed ${LUNA.midDepth}`,
                color: 'white',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Can't find your dive spot? Suggest a location
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleSuggestSubmit}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Dive location (e.g., Sipadan, Malaysia)"
                value={suggestion.location}
                onChange={(e) =>
                  setSuggestion((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                required
              />
              <input
                type="email"
                placeholder="Your email (we'll notify you!)"
                value={suggestion.email}
                onChange={(e) =>
                  setSuggestion((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSuggestForm(false)}
                  className="flex-1 py-2 rounded-lg text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor:
                      submitStatus === 'success'
                        ? '#22c55e'
                        : submitStatus === 'error'
                        ? '#ef4444'
                        : LUNA.surfaceTeal,
                    color: 'white',
                  }}
                >
                  {submitStatus === 'loading'
                    ? 'Submitting...'
                    : submitStatus === 'success'
                    ? 'Thanks!'
                    : submitStatus === 'error'
                    ? 'Try Again'
                    : 'Submit'}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-center gap-4 text-[10px] text-white/40">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: LUNA.surfaceTeal }}
            />
            <span>Region</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: LUNA.highlight, opacity: 0.6 }}
            />
            <span>Popular Spot</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: LUNA.highlight }}
            />
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
