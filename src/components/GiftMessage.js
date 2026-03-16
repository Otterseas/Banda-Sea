'use client';

import { useState, useEffect } from 'react';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

const STORAGE_KEY = 'otterseas-gift-message';

/**
 * Gift Message Component
 * Allows users to add a gift message to their order
 * Persists to localStorage
 */
export default function GiftMessage() {
  const [isGift, setIsGift] = useState(false);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setIsGift(data.isGift || false);
        setMessage(data.message || '');
        setRecipientName(data.recipientName || '');
      }
    } catch (e) {
      console.error('Failed to load gift message:', e);
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    if (isGift || message || recipientName) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ isGift, message, recipientName })
        );
      } catch (e) {
        console.error('Failed to save gift message:', e);
      }
    }
  }, [isGift, message, recipientName]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearGiftMessage = () => {
    setIsGift(false);
    setMessage('');
    setRecipientName('');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="border-t border-gray-100 py-4 px-4">
      {/* Toggle */}
      <button
        onClick={() => setIsGift(!isGift)}
        className="flex items-center gap-2 w-full text-left group"
      >
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isGift ? 'border-transparent' : 'border-gray-300'
          }`}
          style={{ backgroundColor: isGift ? LUNA.surfaceTeal : 'transparent' }}
        >
          {isGift && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
          This is a gift
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={LUNA.surfaceTeal}
          strokeWidth="2"
          className="ml-1"
        >
          <path d="M20 12v10H4V12" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      </button>

      {/* Gift Options */}
      {isGift && (
        <div className="mt-4 space-y-3">
          {/* Recipient Name */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Recipient's Name (optional)
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g., Sarah"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              maxLength={50}
            />
          </div>

          {/* Gift Message */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Gift Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none"
              rows={3}
              maxLength={200}
            />
            <p className="text-[10px] text-gray-400 mt-1 text-right">
              {message.length}/200
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={clearGiftMessage}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Remove gift options
            </button>
            <button
              onClick={handleSave}
              className="text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{
                backgroundColor: saved ? '#22c55e' : LUNA.surfaceTeal,
                color: 'white',
              }}
            >
              {saved ? 'Saved!' : 'Save'}
            </button>
          </div>

          {/* Note */}
          <p className="text-[10px] text-gray-400 italic">
            Gift message will be printed on a card inside the package. No prices shown on gift orders.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Get the current gift message data
 * For use in checkout flow
 */
export function getGiftMessageData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to get gift message:', e);
  }
  return null;
}

/**
 * Clear gift message after successful checkout
 */
export function clearGiftMessageData() {
  localStorage.removeItem(STORAGE_KEY);
}
