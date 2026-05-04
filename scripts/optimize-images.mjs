// One-shot batch image optimizer.
//
// Walks public/images/products and rewrites any JPEG/PNG over 800KB into a
// web-friendly version: max 1600px wide, mozjpeg quality 82, autorotated.
// Falls back to PNG-as-PNG (palette-quantised) only when transparency is in
// play. Originals are replaced in place — re-run safe (skips files already
// under the threshold).
//
// Run from repo root:  node scripts/optimize-images.mjs

import { readdir, stat } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const TARGET = path.resolve('public/images/products');
const MIN_BYTES = 800 * 1024;        // 800 KB — anything bigger gets resized
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const before = (await stat(filePath)).size;
  if (before < MIN_BYTES) return { filePath, before, after: before, skipped: true };

  const meta = await sharp(filePath).metadata();
  const isPNG = ext === '.png';
  const hasAlpha = meta.hasAlpha;

  let pipeline = sharp(filePath).rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  // PNGs with real transparency stay PNG; everything else goes to JPEG mozjpeg.
  if (isPNG && hasAlpha) {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  // Write to a temp file then swap, so a crash doesn't half-overwrite.
  const tmp = filePath + '.tmp';
  await pipeline.toFile(tmp);
  const { rename } = await import('fs/promises');
  await rename(tmp, filePath);

  const after = (await stat(filePath)).size;
  return { filePath, before, after, skipped: false };
}

const fmt = (n) => (n / 1024).toFixed(0) + ' KB';

const files = await readdir(TARGET);
let totalBefore = 0;
let totalAfter = 0;
let resized = 0;

for (const f of files) {
  const fp = path.join(TARGET, f);
  const s = await stat(fp);
  if (!s.isFile()) continue;
  try {
    const result = await processFile(fp);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.after;
    if (!result.skipped) {
      resized++;
      const pct = (100 * (1 - result.after / result.before)).toFixed(1);
      console.log(`${path.basename(fp).padEnd(48)}  ${fmt(result.before).padStart(10)}  ->  ${fmt(result.after).padStart(10)}  (-${pct}%)`);
    }
  } catch (e) {
    console.error('FAILED', fp, e.message);
  }
}

console.log('\nSummary:');
console.log('  files resized:', resized);
console.log('  total before :', (totalBefore / 1048576).toFixed(1), 'MB');
console.log('  total after  :', (totalAfter / 1048576).toFixed(1), 'MB');
console.log('  saved        :', ((totalBefore - totalAfter) / 1048576).toFixed(1), 'MB');
