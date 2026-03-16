'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'otterseas-recently-viewed';
const MAX_ITEMS = 8;

/**
 * Hook to track and retrieve recently viewed products
 * Stores in localStorage for persistence across sessions
 */
export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recently viewed:', e);
    }
  }, []);

  // Add a product to recently viewed
  const addToRecentlyViewed = useCallback((product) => {
    if (!product || !product.id) return;

    setRecentlyViewed((prev) => {
      // Remove if already exists (will re-add at front)
      const filtered = prev.filter((p) => p.id !== product.id);

      // Add to front, limit to MAX_ITEMS
      const updated = [
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          price: product.price,
          type: product.type || 'product',
          viewedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, MAX_ITEMS);

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recently viewed:', e);
      }

      return updated;
    });
  }, []);

  // Clear all recently viewed
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear recently viewed:', e);
    }
  }, []);

  // Get recently viewed excluding a specific product (useful on product pages)
  const getRecentlyViewedExcluding = useCallback(
    (excludeId) => {
      return recentlyViewed.filter((p) => p.id !== excludeId);
    },
    [recentlyViewed]
  );

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    getRecentlyViewedExcluding,
  };
}
