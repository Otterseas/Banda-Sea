'use client';

import { motion } from 'framer-motion';

export default function WhisperText({
  text,
  className = '',
  wordDelay = 0.12,
  duration = 1.2,
  initialY = 14,
  startDelay = 0,
  triggerOnce = true,
  amount = 0.3,
}) {
  const words = String(text).split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: triggerOnce, amount }}
          transition={{
            duration,
            delay: startDelay + i * wordDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
