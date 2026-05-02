'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

/**
 * Cobe-powered globe used as a hero flourish on the stickers page.
 *
 * Mirrors the staging GlobeInteractive config — mapBrightness 10, white base,
 * deep-blue markers — and drives the rotation via an explicit RAF loop +
 * globe.update({phi}) (the onRender approach was unreliable here).
 *
 * Anchor-positioned labels (Chromium-only) are intentionally omitted; the dive
 * site list is shown as plain copy beside the globe.
 */
export default function StickerGlobe({
  markers = [],
  opacity = 0.7,
  speed = 0.005,
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
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.2, 0.45],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0,
        markers: markers.map((m) => ({ location: m.location, size: 0.045 })),
      });

      const animate = () => {
        phi += speed;
        if (globe) globe.update({ phi, theta: 0.25 });
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
