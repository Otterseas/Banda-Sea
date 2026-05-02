'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import Link from 'next/link';

const FishyButton = forwardRef(function FishyButton(
  {
    children,
    href,
    onClick,
    type = 'button',
    variant = '1',
    className = '',
    target,
    rel,
    ...props
  },
  forwardedRef
) {
  const localRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const setRefs = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useEffect(() => {
    const node = localRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [
    'fishy-btn',
    `fishy-btn--${variant}`,
    revealed ? 'is-revealed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span className="fishy-btn__wave" aria-hidden="true" />
      <span className="fishy-btn__wave" aria-hidden="true" />
      <span className="fishy-btn__wave" aria-hidden="true" />
      <span className="fishy-btn__wave" aria-hidden="true" />
      <span className="fishy-btn__fish" aria-hidden="true" />
      <span className="fishy-btn__text">{children}</span>
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || target === '_blank';
    if (isExternal) {
      return (
        <a
          ref={setRefs}
          href={href}
          target={target}
          rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={classes}
          {...props}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} ref={setRefs} className={classes} {...props}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={setRefs}
      type={type}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {inner}
    </button>
  );
});

export default FishyButton;
