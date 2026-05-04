'use client';

import { forwardRef } from 'react';
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
  const classes = ['fishy-btn', `fishy-btn--${variant}`, className]
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
          ref={forwardedRef}
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
      <Link href={href} ref={forwardedRef} className={classes} {...props}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={forwardedRef}
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
