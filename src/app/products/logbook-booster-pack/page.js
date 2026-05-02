'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import RecentlyViewed from '@/components/RecentlyViewed';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { REVIEWS } from '@/data/reviews';
import FishyButton from '@/components/FishyButton';
import WhisperText from '@/components/WhisperText';
import TestimonialColumns from '@/components/TestimonialColumns';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  bone: '#F5EFE6',
  cream: '#FAF7F1',
};

// URL slug remains the original 'logbook-booster-pack' to preserve every
// inbound link (Etsy, indexed pages, internal nav). Display name and copy
// reframe the product as 'Log Pages — booster pack for the Dive Journal'.
const SLUG = 'logbook-booster-pack';
const JOURNAL_LINK = '/products/dive-journal';

const PRODUCT = {
  displayName: 'Log Pages',
  tagline: 'BOOSTER PACK FOR THE DIVE JOURNAL',
  description:
    "Running low on log pages? Each Booster Pack is 30 additional full-colour log pages — identical to the ones in your Dive Journal — so you can keep recording every dive without replacing the binder.",
};

// Quantity options preserved verbatim from the original page —
// same Shopify variant IDs, same prices, same savings.
const QUANTITY_OPTIONS = [
  {
    id: 'pack-1',
    qty: 1,
    name: '1× Pack',
    description: '30 log pages',
    originalPrice: 12.0,
    price: 12.0,
    savings: 0,
    shopifyVariantId: '49872531325194',
  },
  {
    id: 'pack-2',
    qty: 2,
    name: '2× Packs',
    description: '60 log pages',
    originalPrice: 24.0,
    price: 20.0,
    savings: 4.0,
    shopifyVariantId: '52493596131594',
    badge: { label: 'POPULAR', color: COLORS.highlight, textColor: COLORS.abyss },
  },
  {
    id: 'pack-3',
    qty: 3,
    name: '3× Packs',
    description: '90 log pages',
    originalPrice: 36.0,
    price: 26.0,
    savings: 10.0,
    shopifyVariantId: '52493614481674',
    badge: { label: 'BEST VALUE', color: COLORS.surfaceTeal, textColor: 'white' },
  },
];

// Marine Safari spread is intentionally NOT included — that lives only in
// the Dive Journal binder, not in the booster pack.
const GALLERY_IMAGES = [
  { src: '/images/products/Log-book-sheets.jpg', alt: 'Log Pages laid out' },
  { src: '/images/products/The-log-pages-in-binder.jpg', alt: 'Log pages inside the journal binder' },
  { src: '/images/products/The-log-pages-notes.jpg', alt: 'Detailed log page notes' },
  { src: '/images/products/The-dive-journal-notes.jpg', alt: "Diver'gram and detailed dive notes" },
  {
    src: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=823',
    alt: 'Dive logs',
  },
  {
    src: 'https://38a44d-4c.myshopify.com/cdn/shop/files/DiveLogPages_03f98e7f-41ac-43f6-bb36-837f8035258f.jpg?v=1743749112&width=823',
    alt: 'Log page detail',
  },
  {
    src: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20241030_100905.jpg?v=1743749112&width=823',
    alt: 'Journal with dive computer in use',
  },
];

const FEATURE_CARDS = [
  {
    title: '30 Pages Per Pack',
    subtitle: 'FULL-COLOUR LOG PAGES',
    description:
      'Every dive deserves a page. Each Booster Pack adds 30 more, identical to the ones in your Dive Journal.',
    image: '/images/products/Log-book-sheets.jpg',
  },
  {
    title: "Diver'gram on Every Page",
    subtitle: 'VISUAL EQUIPMENT LOGGING',
    description:
      "Mark your weight placement and gear setup directly on the diver diagram — the journal's signature feature, on every page.",
    image: '/images/products/The-log-pages-notes.jpg',
  },
  {
    title: 'Plan Each Dive',
    subtitle: 'STRUCTURED PROMPTS',
    description:
      'Site, depth, visibility, conditions and gear — every field you actually want to record, in one focused layout.',
    image: '/images/products/The-dive-journal-notes.jpg',
  },
  {
    title: 'Slots Straight In',
    subtitle: 'A5 RING-BINDER FORMAT',
    description:
      "Drilled to fit the Otterseas Dive Journal binder. No replacing the journal — just slot the new pages in.",
    image: '/images/products/The-log-pages-in-binder.jpg',
  },
];

const INCLUSIONS = [
  '30 full-colour log pages — one full dive per page',
  "Custom Diver'gram diagram on every page",
  'Structured prompts for site, depth, conditions, gear and notes',
  'A5 size, drilled for the Dive Journal ring binder',
  'Identical paper stock and artwork to the original journal pages',
  'Loose pages — slot them in and you’re ready for the next dive',
];

const RELATED_PRODUCTS = [
  {
    name: 'The Dive Journal',
    href: '/products/dive-journal',
    image: '/images/products/The-dive-journal-product-shot.jpg',
    priceLabel: 'From £28',
    quickAdd: {
      shopifyVariantId: '49658874331402',
      name: 'The Dive Journal',
      price: 28.0,
    },
  },
  {
    name: 'The Surface Tank',
    href: '/products/surface-tank',
    image: '/images/products/The-surface-tank-sunset.jpg',
    priceLabel: '£40',
    quickAdd: {
      shopifyVariantId: '52453682807050',
      name: 'The Surface Tank - Deep Ocean',
      price: 40.0,
    },
  },
  {
    name: 'Location Stickers',
    href: '/stickers',
    image: '/images/products/Location-stickers-close-up.jpg',
    priceLabel: 'From £1.75',
    quickAdd: null,
  },
  {
    name: 'Crochet Creatures',
    href: '/products/crochet-creatures',
    image: '/images/products/Purple-nudis-product-shot.png',
    priceLabel: 'From £17.50',
    quickAdd: null,
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is a Logbook Booster Pack?',
    answer:
      "A Logbook Booster Pack is a set of 30 additional full-colour dive log pages designed to slot straight into the Otterseas Dive Journal binder. Each page is identical to the log pages that come with the journal — same structured layout, the same Diver'gram for visual weight and equipment logging, the same prompts for conditions, marine life and detailed notes. When you fill the original 30 pages in your journal, a Booster Pack lets you keep going without replacing the whole journal. Available as a single pack of 30 pages, or in 2-pack and 3-pack bundles for divers who know they'll be busy.",
  },
  {
    question: 'Will these pages fit my Dive Journal?',
    answer:
      "Yes — the pages are designed exclusively for the Otterseas Dive Journal. They're A5 size with the same hole-punch pattern as the original log pages, so they slot directly into the journal's frosted ring binder. If you already have a Dive Journal, a Booster Pack is the most efficient way to keep logging — your binder, marine guide, milestone pages and storage pocket all stay; you're just adding more space to record dives.",
  },
  {
    question: 'How many dives can I log per pack?',
    answer:
      "Each pack contains 30 full-colour log pages, with one dive per page. So a single pack covers 30 dives. For divers logging weekly trips or live-aboards the 2-pack (60 pages, save £4) or 3-pack (90 pages, save £10) work out cheaper per page. If you're somewhere between 5 and 15 dives a year a single pack will typically last a full year of diving.",
  },
  {
    question: 'Are these the same pages as in the Dive Journal?',
    answer:
      "Identical. The log pages in the Booster Pack come from the same printer, with the same paper stock, the same colour artwork, and exactly the same layout as the pages in the original Dive Journal. The pack is purely a refill — there's no marine life guide, milestone pages or world map, since those already live in your journal binder.",
  },
  {
    question: 'Do I need a Dive Journal to use these?',
    answer:
      "The Booster Pack is designed to refill an Otterseas Dive Journal rather than work as a standalone product. The pages are loose, A5, and drilled for our specific binder. If you don't have a journal yet, the easiest route is to grab a Journal + 1 Booster bundle (£35, saves £5) or a Journal + 2 Boosters bundle (£44, saves £8) directly from the Dive Journal page.",
  },
  {
    question: "What's a Diver'gram and is it on every page?",
    answer:
      "The Diver'gram is the visual diagram of a diver in horizontal trim that lets you mark your exact weight placement, BCD setup, tank size and exposure suit on every dive. It's printed on every single log page in the Booster Pack, just as it is in the journal. Over multiple dives it becomes a personal benchmark — you can see exactly which configuration gave you the best trim and what to adjust for the next dive.",
  },
  {
    question: 'Can I buy multiple packs at once?',
    answer:
      "Yes — and there's a discount when you do. A single pack is £12, two packs are £20 (saving £4), and three packs are £26 (saving £10). The bigger packs are popular with divers heading on long trips, dive instructors logging lots of training dives, or anyone who knows they want a multi-year supply.",
  },
  {
    question: 'How do I add the pages to my journal?',
    answer:
      "Open your journal binder, slot the new pages onto the rings, and close. The pages come pre-drilled and pre-ordered, so it's a one-minute job. Most divers either add a full Booster Pack at once when they're running low, or feed pages in a few at a time as they fill up — both work fine.",
  },
];

// =============== reusable bits ===============

function HeroBadge({ children, color = COLORS.surfaceTeal }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {children}
    </span>
  );
}

function FeatureCard({ image, title, subtitle, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden border transition-shadow hover:shadow-md flex flex-col"
      style={{ borderColor: '#E6EEF2' }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5 flex-1">
        <p className="text-[11px] tracking-[0.25em] font-semibold mb-1.5" style={{ color: COLORS.surfaceTeal }}>
          {subtitle}
        </p>
        <h3 className="text-lg font-bold mb-2 leading-tight" style={{ color: COLORS.deepWater }}>
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-4 flex items-center justify-between text-left gap-3"
      >
        <h4 className="font-medium text-sm md:text-base" style={{ color: COLORS.deepWater }}>
          {question}
        </h4>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="flex-shrink-0 text-xl font-light leading-none"
          style={{ color: COLORS.surfaceTeal }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ maxHeight: isOpen ? 1500 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p className="pb-4 text-gray-600 text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

// =============== main component ===============

export default function LogPagesPage() {
  const { addToCart, openDrawer, openCart } = useCart();
  const { formatPrice } = useCurrency();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [selectedQty, setSelectedQty] = useState('pack-1');

  const VISIBLE_THUMBS = 4;
  const totalImages = GALLERY_IMAGES.length;
  const canScrollPrev = thumbStartIndex > 0;
  const canScrollNext = thumbStartIndex + VISIBLE_THUMBS < totalImages;

  const activeImage = GALLERY_IMAGES[selectedImageIndex];
  const currentOption = QUANTITY_OPTIONS.find((o) => o.id === selectedQty) || QUANTITY_OPTIONS[0];

  // Pull only Etsy reviews that specifically mention the log pages / refill /
  // booster aspect — drops generic 'great journal' reviews so what's shown
  // here is genuinely about the pages this page sells.
  const LOG_PAGES_RX =
    /log\s*pages?|log\s*book|logbook|refill|booster|extra\s+pages|more\s+pages|add\s+pages|run\s+out|pages?\s+(once|when|run|fill)/i;
  const reviews = REVIEWS.filter((r) => LOG_PAGES_RX.test(r.message));

  useEffect(() => {
    addToRecentlyViewed({
      id: SLUG,
      name: PRODUCT.displayName,
      slug: SLUG,
      image: GALLERY_IMAGES[0].src,
      price: 12.0,
      type: 'product',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSideCart = () => {
    if (openDrawer) openDrawer();
    else if (openCart) openCart();
  };

  const handleAddToCart = () => {
    addToCart({
      id: currentOption.shopifyVariantId,
      shopifyVariantId: currentOption.shopifyVariantId,
      name:
        currentOption.qty === 1
          ? `${PRODUCT.displayName} (Booster Pack)`
          : `${currentOption.qty}× ${PRODUCT.displayName} (Booster Packs)`,
      price: currentOption.price,
      image: GALLERY_IMAGES[0].src,
      type: 'product',
    });
    openSideCart();
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: COLORS.cream }}
    >
      <Header variant="light" currentPath={`/products/${SLUG}`} />

      {/* ============ HERO ============ */}
      <section className="bg-white px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-14">
          {/* Image gallery — main + thumb carousel with arrows */}
          <div className="flex flex-col h-full pt-3 md:pt-5">
            <motion.div
              key={activeImage.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[5/4] w-full rounded-2xl overflow-hidden border shrink-0"
              style={{ borderColor: '#E6EEF2', backgroundColor: COLORS.cream }}
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="relative mt-auto pt-3 mb-10 md:mb-12 shrink-0">
              <button
                type="button"
                onClick={() => setThumbStartIndex((i) => Math.max(0, i - 1))}
                disabled={!canScrollPrev}
                aria-label="Previous images"
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                style={{ border: `1px solid ${COLORS.surfaceTeal}40` }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: VISIBLE_THUMBS }).map((_, slot) => {
                  const idx = thumbStartIndex + slot;
                  const img = GALLERY_IMAGES[idx];
                  if (!img) return <div key={`empty-${slot}`} className="aspect-square" />;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className="aspect-square rounded-xl overflow-hidden border-2 transition-all"
                      style={{
                        borderColor: idx === selectedImageIndex ? COLORS.surfaceTeal : '#E6EEF2',
                        backgroundColor: COLORS.cream,
                        opacity: idx === selectedImageIndex ? 1 : 0.7,
                      }}
                      aria-label={`View ${img.alt}`}
                    >
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setThumbStartIndex((i) => Math.min(totalImages - VISIBLE_THUMBS, i + 1))}
                disabled={!canScrollNext}
                aria-label="Next images"
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                style={{ border: `1px solid ${COLORS.surfaceTeal}40` }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepWater} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Buy box */}
          <div className="flex flex-col h-full pt-3 md:pt-5">
            <p
              className="text-sm tracking-[0.28em] font-medium mb-4"
              style={{ color: COLORS.surfaceTeal }}
            >
              {PRODUCT.tagline}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4"
              style={{ color: COLORS.deepWater }}
            >
              <WhisperText text={PRODUCT.displayName} wordDelay={0.2} duration={1.2} />
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
              {PRODUCT.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              <HeroBadge>30 Pages / Pack</HeroBadge>
              <HeroBadge color={COLORS.midDepth}>A5 Drilled</HeroBadge>
              <HeroBadge color={COLORS.midDepth}>Diver&rsquo;gram</HeroBadge>
              <HeroBadge color={COLORS.surfaceTeal}>Refill Ready</HeroBadge>
            </div>

            {/* Quantity selector */}
            <div className="mb-5">
              <label className="block text-xs tracking-wider font-medium mb-2 uppercase" style={{ color: COLORS.midDepth }}>
                Choose Quantity
              </label>
              <div className="space-y-2">
                {QUANTITY_OPTIONS.map((opt) => {
                  const isSelected = selectedQty === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedQty(opt.id)}
                      className="w-full text-left p-4 rounded-xl border-2 transition-all relative"
                      style={{
                        borderColor: isSelected ? COLORS.surfaceTeal : '#E6EEF2',
                        backgroundColor: isSelected ? `${COLORS.highlight}25` : 'white',
                      }}
                    >
                      {opt.badge && (
                        <span
                          className="absolute -top-2 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: opt.badge.color, color: opt.badge.textColor }}
                        >
                          {opt.badge.label}
                        </span>
                      )}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                            style={{ borderColor: isSelected ? COLORS.surfaceTeal : '#D1D5DB' }}
                          >
                            {isSelected && (
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: COLORS.surfaceTeal }}
                              />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate" style={{ color: COLORS.deepWater }}>
                              {opt.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{opt.description}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-baseline gap-1.5 justify-end">
                            {opt.savings > 0 && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(opt.originalPrice)}
                              </span>
                            )}
                            <span className="text-base font-bold" style={{ color: COLORS.deepWater }}>
                              {formatPrice(opt.price)}
                            </span>
                          </div>
                          {opt.savings > 0 && (
                            <span className="text-[10px] font-medium" style={{ color: COLORS.surfaceTeal }}>
                              Save {formatPrice(opt.savings)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <span className="text-xl md:text-2xl font-bold" style={{ color: COLORS.deepWater }}>
                {formatPrice(currentOption.price)}
              </span>
            </div>

            <div className="mb-3">
              <FishyButton onClick={handleAddToCart} variant="1">
                ADD TO CART
              </FishyButton>
            </div>

            {/* Pairs Well With card — small, fits into the buy-box width.
                Moved here from the bottom of the column so the cross-link to
                the journal sits right alongside the cart action. */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 rounded-xl p-3 grid grid-cols-[auto_1fr_auto] gap-3 items-center border"
              style={{
                borderColor: `${COLORS.surfaceTeal}40`,
                backgroundColor: 'white',
              }}
            >
              <Link
                href={JOURNAL_LINK}
                className="block w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                style={{ backgroundColor: COLORS.cream }}
                aria-label="View The Dive Journal"
              >
                <img
                  src="/images/products/The-dive-journal-product-shot.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="min-w-0">
                <p
                  className="text-[10px] tracking-[0.2em] font-bold uppercase mb-0.5"
                  style={{ color: COLORS.surfaceTeal }}
                >
                  Pairs Well With
                </p>
                <Link
                  href={JOURNAL_LINK}
                  className="text-sm font-semibold hover:underline truncate block"
                  style={{ color: COLORS.deepWater }}
                >
                  The Dive Journal
                </Link>
              </div>
              <Link
                href={JOURNAL_LINK}
                className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-2 rounded-lg whitespace-nowrap transition-colors hover:bg-gray-50"
                style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, border: '1px solid' }}
              >
                View
              </Link>
            </motion.div>

            <TrustBadges variant="light" size="sm" />
          </div>
        </div>
      </section>

      {/* ============ FEATURE BANNER ============ */}
      <section className="px-4 md:px-8 py-8 md:py-10" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              WHAT&rsquo;S ON EVERY PAGE
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {FEATURE_CARDS.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                image={feature.image}
                title={feature.title}
                subtitle={feature.subtitle}
                description={feature.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ ALTERNATING IMAGE/TEXT ============ */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto space-y-14 md:space-y-20">
          {/* Row 1: image LEFT, text RIGHT */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/3] rounded-2xl overflow-hidden order-1"
            >
              <img
                src="/images/products/The-log-pages-in-binder.jpg"
                alt="Log pages slotted into the Dive Journal binder"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="order-2">
              <p className="text-xs tracking-[0.3em] font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
                BUILT FOR THE BINDER
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: COLORS.deepWater }}>
                <WhisperText text="Refill, don't replace." wordDelay={0.2} duration={1.2} />
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                The whole point of the ring-binder format is that you never have to replace your
                journal. When you fill the original 30 pages, slot in a Booster Pack and keep going
                — the Marine Safari guide, milestone pages, world map and storage pocket all stay
                exactly where they are.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Same A5 size, same hole pattern, same paper stock and the same colour artwork as
                day one.
              </p>
            </div>
          </div>

          {/* Row 2: text LEFT, image RIGHT */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="md:order-1 order-2">
              <p className="text-xs tracking-[0.3em] font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
                ON EVERY PAGE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: COLORS.deepWater }}>
                <WhisperText text="The Diver'gram, every dive." wordDelay={0.18} duration={1.2} />
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-5">
                Every booster page carries the same Diver&rsquo;gram diagram you&rsquo;ll know from
                the journal — mark exactly where weights, tank, BCD and exposure suit sat on each
                dive, and watch the picture of your trim sharpen across a season.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'One full dive per page',
                  'Visual weight + equipment diagram',
                  'Conditions, marine life and notes prompts',
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5" style={{ color: COLORS.surfaceTeal }}>✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <FishyButton onClick={handleAddToCart} variant="1">
                ADD TO CART
              </FishyButton>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/3] rounded-2xl overflow-hidden md:order-2 order-1"
            >
              <img
                src="/images/products/The-log-pages-notes.jpg"
                alt="Close-up of a Diver'gram log page"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <section className="px-4 md:px-8 py-16 md:py-20" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-square rounded-2xl overflow-hidden border bg-white"
            style={{ borderColor: '#E6EEF2' }}
          >
            <img
              src="/images/products/Log-book-sheets.jpg"
              alt="Log Pages laid out"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            <p className="text-xs tracking-[0.3em] font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
              WHAT&rsquo;S IN THE PACK
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: COLORS.deepWater }}>
              <WhisperText text="Thirty more dives, ready to record." wordDelay={0.16} duration={1.2} />
            </h2>
            <ul className="space-y-3 mb-7">
              {INCLUSIONS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-gray-700 leading-snug">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS.surfaceTeal }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div
              className="rounded-xl p-4 mb-7 border"
              style={{ borderColor: `${COLORS.surfaceTeal}40`, backgroundColor: `${COLORS.highlight}1F` }}
            >
              <p className="text-[11px] tracking-[0.25em] font-semibold mb-1" style={{ color: COLORS.surfaceTeal }}>
                NEW TO OTTERSEAS?
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                The Booster Pack only makes sense if you already have the Dive Journal — its A5
                ring-binder is what these pages slot into. Grab the journal first, then add Booster
                Packs as you fill it.
              </p>
              <Link
                href={JOURNAL_LINK}
                className="text-sm font-semibold hover:underline"
                style={{ color: COLORS.deepWater }}
              >
                View The Dive Journal →
              </Link>
            </div>

            <FishyButton onClick={handleAddToCart} variant="1">
              ADD TO CART
            </FishyButton>
          </div>
        </div>
      </section>

      {/* ============ CUSTOMER REVIEWS — shared 3-column carousel ============ */}
      <TestimonialColumns
        reviews={reviews}
        heading="What divers say."
        eyebrow="Reviewed on Etsy"
        subtext="Verified Etsy reviews from divers who specifically called out the log pages and refills."
      />

      {/* ============ CUSTOMERS ALSO LOVE ============ */}
      <section className="px-4 md:px-8 py-14 md:py-16" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              CUSTOMERS ALSO LOVE
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {RELATED_PRODUCTS.map((rp, i) => (
              <motion.div
                key={rp.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden border transition-shadow hover:shadow-md flex flex-col"
                style={{ borderColor: '#E6EEF2' }}
              >
                <Link href={rp.href} className="block overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-base leading-tight mb-1" style={{ color: COLORS.deepWater }}>
                    {rp.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
                    {rp.priceLabel}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href={rp.href}
                      className="block text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors"
                      style={{ backgroundColor: COLORS.deepWater, color: 'white' }}
                    >
                      View Product
                    </Link>
                    {rp.quickAdd ? (
                      <button
                        type="button"
                        onClick={() => {
                          addToCart({
                            id: rp.quickAdd.shopifyVariantId,
                            shopifyVariantId: rp.quickAdd.shopifyVariantId,
                            name: rp.quickAdd.name,
                            price: rp.quickAdd.price,
                            image: rp.image,
                            type: 'product',
                          });
                          openSideCart();
                        }}
                        className="block w-full text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors border hover:bg-gray-50"
                        style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, backgroundColor: 'white' }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <Link
                        href={rp.href}
                        className="block text-center text-[11px] font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-colors border hover:bg-gray-50"
                        style={{ borderColor: COLORS.surfaceTeal, color: COLORS.surfaceTeal, backgroundColor: 'white' }}
                      >
                        Choose Options
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] font-medium mb-2" style={{ color: COLORS.surfaceTeal }}>
              GOT QUESTIONS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.deepWater }}>
              <WhisperText text="Frequently Asked Questions." wordDelay={0.15} duration={1.1} />
            </h2>
          </div>
          <div className="bg-white rounded-2xl border px-5 md:px-6" style={{ borderColor: '#E6EEF2' }}>
            {FAQ_ITEMS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_ITEMS.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            }),
          }}
        />
      </section>

      <RecentlyViewed excludeId={SLUG} variant="light" />
      <Footer />
    </div>
  );
}
