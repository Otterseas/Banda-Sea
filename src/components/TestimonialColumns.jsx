'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WhisperText from './WhisperText';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Row of amber stars sized by `size` px.
function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="p-5 md:p-6 rounded-2xl border bg-white shadow-sm w-full max-w-xs"
      style={{ borderColor: '#E6EEF2' }}
    >
      <StarRow rating={review.rating} />
      <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-4">{review.message}</p>
      <p className="text-sm font-semibold" style={{ color: COLORS.deepWater }}>
        {review.reviewer}
      </p>
      <p className="text-xs text-gray-500 mt-0.5">
        {review.date} · Verified Etsy
      </p>
    </motion.div>
  );
}

function ReviewsColumn({ reviews, duration = 22, className = '' }) {
  if (!reviews.length) return null;
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-5 list-none m-0 p-0"
      >
        {[...Array(2)].map((_, dup) =>
          reviews.map((r, i) => (
            <li key={`${dup}-${r.id ?? i}-${i}`} className="list-none">
              <ReviewCard review={r} />
            </li>
          ))
        )}
      </motion.ul>
    </div>
  );
}

/**
 * Three-column scrolling Etsy testimonials.
 *
 * Cols 2 and 3 hide on smaller breakpoints (md / lg) to keep the layout
 * sensible on phones. Each column scrolls at a slightly different speed so
 * the columns don't move in lock-step. Reviews are duplicated inside each
 * column with a translateY:-50% animation for a seamless infinite loop.
 *
 * Cards render an amber star row sized to review.rating, the message,
 * reviewer name, date, and a 'Verified Etsy' tag.
 */
export default function TestimonialColumns({
  reviews = [],
  heading = 'What divers say.',
  eyebrow = 'Reviewed on Etsy',
  subtext,
  durations = [22, 28, 25],
}) {
  if (!reviews.length) return null;

  // Split into three near-equal columns.
  const third = Math.ceil(reviews.length / 3);
  const col1 = reviews.slice(0, third);
  const col2 = reviews.slice(third, third * 2);
  const col3 = reviews.slice(third * 2);

  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          {eyebrow && (
            <div
              className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full text-[10px] font-semibold tracking-[0.25em] uppercase"
              style={{ backgroundColor: `${COLORS.surfaceTeal}15`, color: COLORS.surfaceTeal }}
            >
              <StarRow rating={5} size={11} />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: COLORS.deepWater }}>
            {typeof heading === 'string' ? (
              <WhisperText text={heading} wordDelay={0.18} duration={1.2} />
            ) : (
              heading
            )}
          </h2>
          {subtext && (
            <p className="text-gray-500 text-base max-w-md mx-auto">{subtext}</p>
          )}
        </div>

        <div
          className="flex justify-center gap-5 max-h-[640px] overflow-hidden"
          role="region"
          aria-label="Customer reviews"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <ReviewsColumn reviews={col1} duration={durations[0]} />
          <ReviewsColumn reviews={col2} duration={durations[1]} className="hidden md:block" />
          <ReviewsColumn reviews={col3} duration={durations[2]} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
