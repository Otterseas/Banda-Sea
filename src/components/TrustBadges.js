'use client';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

/**
 * Trust Badges Component
 * Displays security and trust indicators near checkout buttons
 *
 * Props:
 * @param {string} variant - 'dark' or 'light'
 * @param {string} size - 'sm', 'md' (default), or 'lg'
 * @param {boolean} showAll - Show all badges or just essential ones
 */
export default function TrustBadges({
  variant = 'dark',
  size = 'md',
  showAll = false,
}) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)';
  const iconColor = isDark ? LUNA.surfaceTeal : LUNA.midDepth;

  const sizeClasses = {
    sm: 'text-[10px] gap-3',
    md: 'text-xs gap-4',
    lg: 'text-sm gap-5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const iconSize = iconSizes[size];

  const badges = [
    {
      id: 'secure',
      icon: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      label: 'Secure Checkout',
    },
    {
      id: 'shipping',
      icon: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
          <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
          <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      ),
      label: 'Fast Shipping',
    },
    {
      id: 'guarantee',
      icon: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
          <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      label: '30-Day Returns',
    },
    {
      id: 'quality',
      icon: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      label: 'Premium Quality',
      showOnlyWhenAll: true,
    },
    {
      id: 'support',
      icon: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      label: 'Friendly Support',
      showOnlyWhenAll: true,
    },
  ];

  const displayBadges = showAll
    ? badges
    : badges.filter((b) => !b.showOnlyWhenAll);

  return (
    <div className={`flex flex-wrap items-center justify-center ${sizeClasses[size]}`}>
      {displayBadges.map((badge) => (
        <div
          key={badge.id}
          className="flex items-center gap-1.5"
        >
          {badge.icon}
          <span style={{ color: textColor }}>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Inline version for tight spaces
 */
export function TrustBadgesInline({ variant = 'dark' }) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)';
  const iconColor = isDark ? LUNA.midDepth : LUNA.midDepth;

  return (
    <div className="flex items-center justify-center gap-1 text-[10px]" style={{ color: textColor }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>Secure</span>
      <span className="mx-1">|</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
        <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
      <span>Fast Shipping</span>
      <span className="mx-1">|</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      <span>30-Day Returns</span>
    </div>
  );
}
