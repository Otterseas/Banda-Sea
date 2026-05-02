'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

/**
 * Lightweight cobe-powered globe used as a background flourish on the
 * stickers page. Auto-rotates, shows static dive-site markers as cyan
 * dots, and renders at the supplied opacity so it doesn't dominate the
 * surrounding hero copy.
 *
 * Anchor-positioned labels (the staging GlobeInteractive feature) are
 * intentionally NOT used here — they only work in Chromium and the dive
 * site list works better as a separate copy block.
 */
export default function StickerGlobe({
  markers = [],
  opacity = 0.55,
  speed = 0.0035,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let phi = 0;
    let animationId;
    let globe = null;

    const init = () => {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.25,
        dark: 0,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 7,
        baseColor: [0.96, 0.96, 0.94],
        markerColor: [0.33, 0.67, 0.75], // surfaceTeal
        glowColor: [0.83, 0.92, 0.95],
        opacity: 0.95,
        markers: markers.map((m) => ({ location: m.location, size: 0.045 })),
        onRender: (state) => {
          state.phi = phi;
          phi += speed;
        },
      });

      const animate = () => {
        animationId = requestAnimationFrame(animate);
      };
      animate();

      requestAnimationFrame(() => {
        if (canvas) canvas.style.opacity = String(opacity);
      });
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) {
        globe.destroy();
        globe = null;
      }
    };
  }, [markers, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        opacity: 0,
        transition: 'opacity 1.6s ease',
      }}
    />
  );
}
