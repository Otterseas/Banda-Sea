'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

/**
 * Cobe-powered globe used as a hero flourish on the stickers page.
 *
 * Mirrors the staging GlobeInteractive cobe config (mapBrightness 10, white
 * base, deep-blue markers) and drives rotation via an explicit RAF loop +
 * globe.update({phi}).
 *
 * Adds floating HTML labels positioned every frame by projecting each marker
 * from lat/lng → screen coords. Labels fade in as the marker rotates onto the
 * front of the globe and fade out as it crosses to the back, so the names
 * "alternate fading in and out" without any JS state thrash.
 */
export default function StickerGlobe({
  markers = [],
  opacity = 0.7,
  speed = 0.005,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);
  // Pre-size the ref array so React's render lays it out before the RAF loop
  // tries to read from it.
  if (labelRefs.current.length !== markers.length) {
    labelRefs.current.length = markers.length;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let phi = 0;
    const theta = 0.25;
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
        theta,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.2, 0.45],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0,
        markers: markers.map((m) => ({ location: m.location, size: 0.05 })),
      });

      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      const animate = () => {
        phi += speed;
        if (globe) globe.update({ phi, theta });

        // Project each marker's lat/lng into the visible 2D coordinates of
        // the canvas, then position the matching HTML label there. We avoid
        // React state updates and write transforms straight to the DOM.
        const w = container.offsetWidth;
        const cx = w / 2;
        const cy = w / 2;
        const r = w / 2;

        markers.forEach((m, i) => {
          const labelEl = labelRefs.current[i];
          if (!labelEl) return;

          const lat = (m.location[0] * Math.PI) / 180;
          const lng = (m.location[1] * Math.PI) / 180;

          // Marker on unit sphere with phi rotation around Y-axis. Cobe spins
          // such that increasing phi sweeps the globe so eastern hemispheres
          // rotate INTO view from the right; adding phi to lng matches that.
          let x = Math.cos(lat) * Math.sin(lng + phi);
          let y = Math.sin(lat);
          let z = Math.cos(lat) * Math.cos(lng + phi);

          // Tilt around X-axis by theta.
          const yt = y * cosTheta - z * sinTheta;
          const zt = y * sinTheta + z * cosTheta;
          y = yt;
          z = zt;

          // Orthographic projection. y is inverted because screen y grows down.
          const sx = cx + x * r;
          const sy = cy - y * r;

          // Fade based on z (front-of-globe = z > 0). Soft edge so labels
          // ease in/out rather than popping at the horizon.
          const fade = Math.max(0, Math.min(1, (z - 0.05) * 4));

          labelEl.style.transform = `translate(calc(${sx}px - 50%), calc(${sy}px - 50%))`;
          labelEl.style.opacity = String(fade * 0.9);
          // Mark the back-of-globe labels as inert so they don't intercept
          // pointer events when transparent.
          labelEl.style.pointerEvents = fade > 0.2 ? 'none' : 'none';
        });

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
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          transition: 'opacity 1.6s ease',
        }}
      />
      {markers.map((m, i) => (
        <div
          key={m.id || `${m.name}-${i}`}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 pointer-events-none whitespace-nowrap"
          style={{
            transform: 'translate(-9999px, -9999px)',
            opacity: 0,
            transition: 'opacity 0.4s ease-out',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: '#023859',
            padding: '3px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderRadius: '999px',
            border: '1px solid rgba(167, 235, 242, 0.7)',
            boxShadow: '0 1px 4px rgba(2, 56, 89, 0.08)',
          }}
        >
          {m.name}
        </div>
      ))}
    </div>
  );
}
