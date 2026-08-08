'use client';

// Compact social-proof line for product pages — five pink stars + a short
// "rated by divers" label, designed to sit right next to the price so the
// proof is visible at the moment of decision. Matches the pink-star styling
// of the Judge.me quote banner on the Surface Tank page.

const PINK = '#FF6B9D';

export default function ReviewStrip({ label = 'Rated 5.0 by divers on Etsy', variant = 'light' }) {
  const textColor = variant === 'dark' ? 'rgba(255,255,255,0.75)' : '#26658C';

  return (
    <div className="flex items-center gap-2" aria-label={`Five star rating — ${label}`}>
      <span className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={PINK}
            />
          </svg>
        ))}
      </span>
      <span className="text-xs font-semibold" style={{ color: textColor }}>
        {label}
      </span>
    </div>
  );
}
