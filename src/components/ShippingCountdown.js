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

/**
 * Shipping Countdown Component
 * Shows "Order within X hours Y minutes for dispatch today"
 *
 * Props:
 * @param {number} cutoffHour - Hour of day for dispatch cutoff (24h format, default: 14 = 2pm)
 * @param {string} variant - 'dark' or 'light'
 */
export default function ShippingCountdown({
  cutoffHour = 14,
  variant = 'dark',
}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isWeekend, setIsWeekend] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 6 = Saturday

      // Check if weekend
      if (day === 0 || day === 6) {
        setIsWeekend(true);
        setTimeLeft(null);
        return;
      }

      setIsWeekend(false);

      // Create cutoff time for today
      const cutoff = new Date();
      cutoff.setHours(cutoffHour, 0, 0, 0);

      // If past cutoff, show next business day message
      if (now >= cutoff) {
        setTimeLeft(null);
        return;
      }

      // Calculate time remaining
      const diff = cutoff - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ hours, minutes });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [cutoffHour]);

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'rgba(167, 235, 242, 0.1)' : 'rgba(38, 101, 140, 0.08)';
  const textColor = isDark ? LUNA.highlight : LUNA.midDepth;
  const iconColor = isDark ? LUNA.surfaceTeal : LUNA.midDepth;

  // Weekend message
  if (isWeekend) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
        style={{ backgroundColor: bgColor }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span style={{ color: textColor }}>
          Orders ship next business day
        </span>
      </div>
    );
  }

  // Past cutoff - next day dispatch
  if (!timeLeft) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
        style={{ backgroundColor: bgColor }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span style={{ color: textColor }}>
          Order now for dispatch tomorrow
        </span>
      </div>
    );
  }

  // Show countdown
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      <span style={{ color: textColor }}>
        Order within{' '}
        <strong>
          {timeLeft.hours > 0 && `${timeLeft.hours}h `}
          {timeLeft.minutes}m
        </strong>
        {' '}for dispatch today
      </span>
    </div>
  );
}
