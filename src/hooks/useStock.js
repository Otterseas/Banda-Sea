'use client';

import { useState, useEffect, useCallback } from 'react';

// ===========================================
// STOCK CACHE (in-memory, clears on refresh)
// ===========================================
const stockCache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute cache

// ===========================================
// USE STOCK HOOK
// Fetches stock level for a single variant
// ===========================================
export function useStock(variantId) {
  const [stock, setStock] = useState({
    loading: true,
    available: true,
    quantity: null,
    outOfStock: false,
    error: null,
  });

  useEffect(() => {
    if (!variantId) {
      setStock(prev => ({ ...prev, loading: false }));
      return;
    }

    // Check cache first
    const cached = stockCache.get(variantId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setStock({
        loading: false,
        available: cached.data.available,
        quantity: cached.data.quantity,
        outOfStock: cached.data.outOfStock,
        error: null,
      });
      return;
    }

    // Fetch from API
    const fetchStock = async () => {
      try {
        const response = await fetch(`/api/stock?ids=${variantId}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        const variantStock = data[variantId] || {
          available: true,
          quantity: null,
          outOfStock: false,
        };

        // Update cache
        stockCache.set(variantId, {
          data: variantStock,
          timestamp: Date.now(),
        });

        setStock({
          loading: false,
          available: variantStock.available,
          quantity: variantStock.quantity,
          outOfStock: variantStock.outOfStock || !variantStock.available,
          error: null,
        });
      } catch (error) {
        console.error('Failed to fetch stock:', error);
        setStock({
          loading: false,
          available: true, // Assume available on error
          quantity: null,
          outOfStock: false,
          error: error.message,
        });
      }
    };

    fetchStock();
  }, [variantId]);

  return stock;
}

// ===========================================
// USE MULTIPLE STOCKS HOOK
// Fetches stock levels for multiple variants at once
// ===========================================
export function useStocks(variantIds = []) {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!variantIds.length) {
      setLoading(false);
      return;
    }

    // Filter out cached items
    const uncachedIds = variantIds.filter(id => {
      const cached = stockCache.get(id);
      return !cached || Date.now() - cached.timestamp >= CACHE_TTL;
    });

    // Get cached data
    const cachedData = {};
    variantIds.forEach(id => {
      const cached = stockCache.get(id);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        cachedData[id] = cached.data;
      }
    });

    if (uncachedIds.length === 0) {
      setStocks(cachedData);
      setLoading(false);
      return;
    }

    // Fetch uncached items
    const fetchStocks = async () => {
      try {
        const response = await fetch(`/api/stock?ids=${uncachedIds.join(',')}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Update cache and merge with cached data
        const allData = { ...cachedData };
        Object.entries(data).forEach(([id, stockData]) => {
          stockCache.set(id, {
            data: stockData,
            timestamp: Date.now(),
          });
          allData[id] = stockData;
        });

        setStocks(allData);
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
        // On error, still use cached data and assume available for uncached
        const fallbackData = { ...cachedData };
        uncachedIds.forEach(id => {
          fallbackData[id] = { available: true, quantity: null, outOfStock: false };
        });
        setStocks(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [variantIds.join(',')]);

  return { stocks, loading };
}

// ===========================================
// STOCK STATUS HELPERS
// ===========================================
export function getStockStatus(stock, lowStockThreshold = 5) {
  if (!stock || stock.loading) {
    return 'loading';
  }

  if (stock.outOfStock || !stock.available) {
    return 'out-of-stock';
  }

  if (stock.quantity !== null && stock.quantity <= lowStockThreshold) {
    return 'low-stock';
  }

  return 'in-stock';
}

export function isInStock(stock) {
  if (!stock || stock.loading) return true; // Assume in stock while loading
  return stock.available && !stock.outOfStock;
}

// ===========================================
// CLEAR STOCK CACHE (useful after purchase)
// ===========================================
export function clearStockCache() {
  stockCache.clear();
}
