'use client';

import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useCurrency } from '@/context/CurrencyContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

/**
 * Recently Viewed Products Section
 *
 * Props:
 * @param {string} excludeId - Product ID to exclude (current product)
 * @param {string} variant - 'dark' (default) or 'light'
 * @param {number} maxItems - Max items to show (default: 4)
 * @param {string} title - Section title
 */
export default function RecentlyViewed({
  excludeId,
  variant = 'dark',
  maxItems = 4,
  title = 'Recently Viewed',
}) {
  const { recentlyViewed, getRecentlyViewedExcluding } = useRecentlyViewed();
  const { formatPrice } = useCurrency();

  const items = excludeId
    ? getRecentlyViewedExcluding(excludeId).slice(0, maxItems)
    : recentlyViewed.slice(0, maxItems);

  // Don't render if no items
  if (items.length === 0) return null;

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
  const textColor = isDark ? 'white' : LUNA.deepWater;
  const subtextColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <section
      className="py-8 px-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-1 h-5 rounded-full"
            style={{ backgroundColor: LUNA.midDepth }}
          />
          <h3
            className="text-sm font-medium tracking-wide uppercase"
            style={{ color: subtextColor }}
          >
            {title}
          </h3>
        </div>

        {/* Products Grid */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.type === 'sticker' ? `/stickers/${item.slug}` : `/products/${item.slug}`}
                className="block group"
              >
                <div
                  className="w-28 p-2 rounded-xl transition-all group-hover:scale-105"
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  {/* Image */}
                  <div
                    className="w-full aspect-square rounded-lg mb-2 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white' }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span style={{ color: subtextColor }}>📦</span>
                    )}
                  </div>

                  {/* Name */}
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: textColor }}
                  >
                    {item.name}
                  </p>

                  {/* Price */}
                  {item.price && (
                    <p
                      className="text-xs"
                      style={{ color: LUNA.surfaceTeal }}
                    >
                      {formatPrice(item.price)}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Compact version for cart drawer
 */
export function RecentlyViewedCompact({ maxItems = 3 }) {
  const { recentlyViewed } = useRecentlyViewed();
  const { formatPrice } = useCurrency();

  const items = recentlyViewed.slice(0, maxItems);

  if (items.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-gray-100">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
        Recently Viewed
      </p>
      <div className="flex gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.type === 'sticker' ? `/stickers/${item.slug}` : `/products/${item.slug}`}
            className="flex-shrink-0"
          >
            <div
              className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 hover:border-gray-300 transition-colors"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-300 text-xs">📦</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
