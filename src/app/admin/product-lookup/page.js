'use client';

import { useState, useEffect } from 'react';

// Simple password for admin access - change this to something secure
const ADMIN_PASSWORD = 'otterseas2025';

/**
 * Product Lookup Tool
 * Simple admin page to look up Shopify product info (variant IDs, images, etc.)
 * Access at: /admin/product-lookup
 * Password protected - enter password to access
 */
export default function ProductLookupPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // Check if already authenticated this session
  useEffect(() => {
    const authed = sessionStorage.getItem('admin-auth');
    if (authed === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-xl font-bold text-gray-900 mb-2 text-center">Admin Access</h1>
            <p className="text-gray-500 text-sm text-center mb-6">
              Enter password to access admin tools
            </p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 ${
                  authError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                autoFocus
              />
              {authError && (
                <p className="text-red-600 text-sm mb-3">Incorrect password</p>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Access
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!handle.trim()) return;

    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      // Convert product name to handle format (lowercase, hyphens)
      const productHandle = handle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const response = await fetch(`/api/product-info?handle=${productHandle}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data);
      } else {
        setError(data.error || 'Product not found');
      }
    } catch (err) {
      setError('Failed to fetch product info');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Lookup Tool</h1>
        <p className="text-gray-500 mb-8">
          Enter a product name or handle to get variant IDs and image URLs from Shopify
        </p>

        {/* Search Form */}
        <form onSubmit={handleLookup} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g., The UK Bundle Pack, canary-islands, dive-journal"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Looking up...' : 'Lookup'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Tip: You can enter the product name (e.g., "The UK Bundle Pack") or the handle (e.g., "the-uk-bundle-pack")
          </p>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {product && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Product Header */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">{product.title}</h2>
              <p className="text-gray-500 text-sm">Handle: {product.handle}</p>
              <p className="text-gray-500 text-sm">Product ID: {product.numericId}</p>
            </div>

            {/* Variants */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Variants</h3>
              <div className="space-y-3">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{variant.title}</p>
                      <p className="text-sm text-gray-500">
                        Price: £{variant.price} |
                        {variant.available ? ' In Stock' : ' Out of Stock'}
                        {variant.quantity !== null && ` (${variant.quantity})`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Variant ID:</p>
                      <button
                        onClick={() => copyToClipboard(variant.numericId)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-mono rounded hover:bg-blue-200"
                      >
                        {variant.numericId}
                        <span className="ml-2 text-blue-400">📋</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Images</h3>
              {product.images.length > 0 ? (
                <div className="space-y-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={image.url}
                        alt={image.alt || `Image ${index + 1}`}
                        className="w-20 h-20 object-contain bg-white rounded border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Image URL:</p>
                        <button
                          onClick={() => copyToClipboard(image.url)}
                          className="w-full text-left px-3 py-2 bg-white border border-gray-200 text-xs font-mono text-gray-600 rounded hover:bg-gray-50 truncate block"
                        >
                          {image.url}
                          <span className="ml-2 text-gray-400">📋</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No images found</p>
              )}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Quick Examples</h3>
          <div className="flex flex-wrap gap-2">
            {['the-uk-bundle-pack', 'canary-islands', 'dive-journal', 'surface-tank', 'location-stickers'].map((example) => (
              <button
                key={example}
                onClick={() => setHandle(example)}
                className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
