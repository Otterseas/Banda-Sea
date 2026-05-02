'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import RecentlyViewed from '@/components/RecentlyViewed';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { ReviewsSection } from '@/components/Reviews';
import { getReviewsByProduct } from '@/data/reviews';
import FishyButton from '@/components/FishyButton';
import WhisperText from '@/components/WhisperText';

const COLORS = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
  bone: '#F5EFE6',
  cream: '#FAF7F1',
};

const SLUG = 'dive-journal';

const PRODUCT = {
  name: 'The Dive Journal',
  tagline: 'MORE THAN JUST STATS',
  description:
    "While dive computers are great at capturing data, they can't tell the whole story. The Dive Journal is designed for divers who want to record more than just numbers.",
};

const BOOSTER_PACK_LINK = '/products/logbook-booster-pack';

// Bundle options — Shopify variant IDs preserved verbatim from the original page.
const BUNDLE_OPTIONS = [
  {
    id: 'journal-only',
    name: 'Journal Only',
    description: 'The Dive Journal',
    originalPrice: 28.0,
    price: 28.0,
    savings: 0,
    shopifyVariantId: '49658874331402',
    isBundle: false,
  },
  {
    id: 'journal-plus-1',
    name: 'Journal + 1 Booster',
    description: 'The Dive Journal + 1 Booster Pack',
    originalPrice: 40.0,
    price: 35.0,
    savings: 5.0,
    shopifyVariantId: '50232047665418',
    isBundle: true,
    badge: { label: 'RECOMMENDED', color: COLORS.highlight, textColor: COLORS.abyss },
  },
  {
    id: 'journal-plus-2',
    name: 'Journal + 2 Boosters',
    description: 'The Dive Journal + 2 Booster Packs',
    originalPrice: 52.0,
    price: 44.0,
    savings: 8.0,
    shopifyVariantId: '52493311672586',
    isBundle: true,
    badge: { label: 'BEST VALUE', color: COLORS.surfaceTeal, textColor: 'white' },
  },
];

const GALLERY_IMAGES = [
  { src: '/images/products/The-dive-journal-product-shot.jpg', alt: 'The Dive Journal closed binder' },
  { src: '/images/products/The-dive-journal-stacks.jpg', alt: 'Stack of Dive Journals' },
  { src: '/images/products/The-log-pages-in-binder.jpg', alt: 'Log pages inside the binder' },
  { src: '/images/products/The-dive-journal-marine-pages.jpg', alt: 'Marine animal spread inside the journal' },
];

const JOURNAL_FEATURES = [
  {
    title: 'Dive Log Pages',
    subtitle: '30 FULL-COLOUR PAGES',
    description:
      "Quick, visual layout for everything that matters — site, conditions, marine life, and our custom Diver'gram for equipment setup.",
    image: '/images/products/The-log-pages-in-binder.jpg',
  },
  {
    title: 'Marine Safari',
    subtitle: 'WILDLIFE CHECKLIST',
    description:
      "An illustrated guide to hundreds of marine species. Tick off everything you encounter and add your own along the way.",
    image: '/images/products/The-dive-journal-mantis-shrimp.jpg',
  },
  {
    title: 'Where Can I See?',
    subtitle: 'GLOBAL HOTSPOTS',
    description:
      'Worldwide dive site map and seasonal guides for the marine life on your bucket list. Plan the next trip from the same page.',
    image: '/images/products/The-dive-journal-marine-pages.jpg',
  },
  {
    title: 'Milestones',
    subtitle: 'TRACK YOUR JOURNEY',
    description:
      'A dedicated space for certifications, dive count milestones, and the moments worth remembering long after the bubbles settle.',
    image: '/images/products/The-dive-journal-milestones.jpg',
  },
];

const RELATED_PRODUCTS = [
  {
    name: 'The Surface Tank',
    href: '/products/surface-tank',
    image: '/images/products/The-surface-tank-sunset.jpg',
    priceLabel: '£40',
    quickAdd: {
      shopifyVariantId: '52453682807050', // Deep Ocean default
      name: 'The Surface Tank - Deep Ocean',
      price: 40.0,
    },
  },
  {
    name: 'Logbook Booster Pack',
    href: '/products/logbook-booster-pack',
    image: '/images/products/The-log-pages-notes.jpg',
    priceLabel: 'From £12',
    quickAdd: {
      shopifyVariantId: '49872531325194',
      name: 'Logbook Booster Pack',
      price: 12.0,
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

// SEO-rich FAQ list — preserved verbatim from the previous version.
const FAQ_ITEMS = [
  {
    question: 'What is a scuba dive logbook?',
    answer:
      "A scuba dive logbook is a record of your dives — a place to document the details of each underwater experience including the dive site, depth, bottom time, visibility, water temperature, equipment used and marine life encountered. Most scuba training agencies including PADI and SSI recommend keeping a dive log from your very first open water dive, both as a record of your development and as a practical reference for future dives at the same site. Traditionally a physical notebook, dive logbooks range from basic printed booklets to premium journals like the Otterseas Dive Journal, which extends the concept beyond stats to include visual equipment logging, a marine life guide and worldwide dive site planning.",
  },
  {
    question: 'What is the best dive logbook for beginner scuba divers?',
    answer:
      "The best dive logbook for a beginner is one that guides you through what to record rather than leaving a blank page in front of you. The Otterseas Dive Journal was built with exactly that in mind — it has structured, visual log pages with prompts for everything from conditions and visibility to marine life spotted and how your trim felt underwater. The Diver’gram is the feature that genuinely sets it apart for new divers: it’s a visual diagram where you mark your exact weight placement and equipment setup, so you can track what worked and improve your buoyancy dive by dive. Most beginners spend their first ten dives guessing at their configuration — this journal takes that guesswork away.",
  },
  {
    question: 'What should I record in a scuba diving log?',
    answer:
      "A good dive log captures far more than depth and bottom time. The essentials are dive site and location, entry and exit times, maximum and average depth, visibility, water temperature, current conditions, and your equipment setup including weights. But the dives you’ll actually remember are the ones where you also noted what you saw — the marine life, the unexpected moments, how the dive felt. The Otterseas Dive Journal structures all of this into a single visual page, including a dedicated section for your weight placement and BCD configuration, so over time you build a genuine record of your development as a diver rather than just a list of numbers.",
  },
  {
    question: 'Is a physical dive log better than a dive log app?',
    answer:
      "For most divers, yes — and here’s why. A dive app is great for storing data, but it can’t capture the texture of a dive: how the current caught you on the descent, what the visibility was really like, the nudibranch you spotted that you’ve never seen before. A physical journal slows you down in the best way, making you reflect on the dive rather than just sync it. The Otterseas Dive Journal is also designed to travel — it’s compact, water-resistant, and works anywhere on earth without needing a signal or a battery. That said, they work brilliantly together: use your dive computer for the numbers, and the journal for everything the computer can’t capture.",
  },
  {
    question: 'What makes the Otterseas Dive Journal different from other dive logbooks?',
    answer:
      "Three things that you won’t find anywhere else. First, the Diver’gram — a visual diagram of a diver that lets you map your exact weight placement and kit configuration on every dive, so you can build a personal benchmark and actually improve your trim over time. Second, the Marine Safari guide — an illustrated checklist of hundreds of marine species across sharks, rays, reef fish, crustaceans and more, so your journal doubles as a wildlife spotter’s guide. Third, the Where Can I See? pages — a global map of dive site hotspots that tells you the best locations and seasons for the marine life on your bucket list. Most logbooks just record what happened. The Otterseas Dive Journal helps you plan what happens next.",
  },
  {
    question: "What is the Diver’gram?",
    answer:
      "The Diver’gram is a unique feature of the Otterseas Dive Journal — a visual diagram of a diver in horizontal trim that lets you mark your exact weight placement on every dive. Rather than scribbling notes about how many kilos you used, you mark directly where weights were placed: weight belt, BCD integrated pockets, trim weights — alongside your full equipment configuration including tank size, BCD type, wetsuit thickness and exposure suit details. Over multiple dives it becomes your personal benchmark: you can look back and see exactly which configuration gave you the best trim, which tank position balanced you correctly, and what to adjust next time. It’s particularly valuable for divers who are still developing their buoyancy — which is most of us for the first fifty dives.",
  },
  {
    question: 'What is included in the Otterseas Dive Journal?',
    answer:
      "The journal is built around five core sections. Thirty full-colour structured log pages, each designed to capture a complete dive including the Diver’gram for equipment and weight logging. The Marine Safari — an illustrated guide to hundreds of marine species with checkboxes so you can tick off everything you encounter underwater. The Where Can I See? map — global hotspots for specific marine life with seasonal guides. Milestone and certification pages for recording your qualifications and significant dive count achievements. And a storage pocket for dive cards and notes. It all lives in a water-resistant frosted A5 ring binder with zip, compact enough for a carry-on or kit bag.",
  },
  {
    question: 'Is the Dive Journal suitable for complete beginners?',
    answer:
      "It’s genuinely one of the best things you can start with. The structured log pages guide you through exactly what to record after each dive, which is genuinely useful when you’re new and not sure what matters. The Diver’gram is the feature that makes the biggest difference early on — most beginners spend a frustrating amount of time trying to get their weighting right, and having a visual record of exactly what you used on each dive means you’re learning dive by dive rather than starting from scratch every time. The milestone pages are also a nice touch: seeing your Open Water certification recorded alongside your 10th dive, your 25th dive, and eventually your 50th is a proper record of a journey, not just a list of dives.",
  },
  {
    question: 'Can I use the Dive Journal for freediving or travelling?',
    answer:
      "For travel, absolutely — the A5 ring binder is designed to survive kit bags, overhead lockers and boat rides, and it’s compact enough not to take up meaningful space. The Where Can I See? world map and the Marine Safari guide are useful regardless of how you dive. For freediving specifically, the log pages and Diver’gram are built around scuba equipment configuration, so some fields won’t apply — but the marine life sections, personal notes pages and milestone tracking work just as well. A lot of freedivers use it alongside their scuba diving, keeping one journal for the full underwater story.",
  },
  {
    question: 'Can I add more pages when the journal is full?',
    answer:
      "Yes — this is one of the things that makes the ring binder format worth it. When you’ve filled your 30 log pages, you can add a Booster Pack of additional full-colour pages that slot straight into the same binder. So your journal becomes a genuine long-term record of your diving rather than something you replace. A journal with one Booster Pack costs £35 if you want to start with more pages, or £44 for two Booster Packs — and they’re always available separately on the website when you need them.",
  },
  {
    question: 'Is the Otterseas Dive Journal a good gift for a scuba diver?',
    answer:
      "It’s one of the most thoughtful gifts you can give a diver, and consistently one of the things we hear most in reviews. It works especially well for someone who has just got their Open Water certification — it gives them somewhere to start building their diving story from the very first dive. For more experienced divers it’s the kind of upgrade they’d love but wouldn’t buy for themselves: premium, beautifully designed, and genuinely more useful than the basic logbook that comes with most courses. If you want to go further, the Diver’s Gift Set pairs the journal with the Surface Tank water bottle for £57.95 — saving £10 on the pair and giving them everything they need above and below the surface.",
  },
  {
    question: 'How much does the Dive Journal cost and where can I buy it?',
    answer:
      "The Otterseas Dive Journal costs £28.00 with free UK shipping on orders over £50. If you want extra log pages from the start, a journal with one Booster Pack is £35 and with two Booster Packs is £44. The Diver’s Gift Set with the Surface Tank water bottle is £57.95. You can order directly from otterseas.com — use code NEWDIVER10 for 10% off your first order. The journal is also available through the Otterseas Etsy shop with international shipping options if you’re ordering from outside the UK.",
  },
];

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

// Inlined Lamp spotlight section. Same pattern as the Surface Tank page —
// see that file for the rationale (no tailwind extension / cn helper required).
function LampSpotlight({ children }) {
  const ease = [0.22, 1, 0.36, 1];
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden pt-44 md:pt-56 pb-2 md:pb-4 px-6"
      style={{ backgroundColor: COLORS.abyss }}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mb-4">
        <motion.div
          initial={{ opacity: 0.35, width: '15rem' }}
          whileInView={{ opacity: 1, width: '50rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${COLORS.surfaceTeal}, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[50rem] text-white"
        >
          <div
            className="absolute w-[100%] left-0 h-40 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to top, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
            }}
          />
          <div
            className="absolute w-40 h-[100%] left-0 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to right, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, white, transparent)',
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.35, width: '15rem' }}
          whileInView={{ opacity: 1, width: '50rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${COLORS.surfaceTeal})`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[50rem] text-white"
        >
          <div
            className="absolute w-40 h-[100%] right-0 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to left, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to left, white, transparent)',
            }}
          />
          <div
            className="absolute w-[100%] right-0 h-40 bottom-0 z-20"
            style={{
              backgroundColor: COLORS.abyss,
              maskImage: 'linear-gradient(to top, white, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
            }}
          />
        </motion.div>

        <div
          className="absolute inset-auto z-25 h-56 w-40 -translate-y-2 rounded-full blur-3xl"
          style={{ backgroundColor: COLORS.abyss, opacity: 0.7 }}
        />

        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
          style={{ backgroundColor: COLORS.abyss }}
        />
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: COLORS.surfaceTeal }}
        />
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: COLORS.highlight }}
        />
        <motion.div
          initial={{ width: '20rem' }}
          whileInView={{ width: '60rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.8, ease }}
          className="absolute inset-auto z-50 h-0.5 w-[60rem] -translate-y-[7rem]"
          style={{ backgroundColor: COLORS.highlight }}
        />
        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ backgroundColor: COLORS.abyss }}
        />
      </div>

      <div className="relative z-50 flex -translate-y-20 md:-translate-y-28 flex-col items-center px-5 max-w-3xl">
        {children}
      </div>
    </section>
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

export default function DiveJournalPage() {
  const { addToCart, openDrawer, openCart } = useCart();
  const { formatPrice } = useCurrency();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState('journal-only');

  const activeImage = GALLERY_IMAGES[selectedImageIndex];
  const currentBundle = BUNDLE_OPTIONS.find((b) => b.id === selectedBundle);

  useEffect(() => {
    addToRecentlyViewed({
      id: SLUG,
      name: PRODUCT.name,
      slug: SLUG,
      image: GALLERY_IMAGES[0].src,
      price: 28.0,
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
      id: currentBundle.shopifyVariantId,
      shopifyVariantId: currentBundle.shopifyVariantId,
      name: currentBundle.name,
      price: currentBundle.price,
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
          {/* Image gallery — fixed-frame card with thumbs anchored to bottom of column */}
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
            <div className="grid grid-cols-4 gap-2 mt-auto pt-3 shrink-0">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setSelectedImageIndex(i)}
                  className="aspect-square rounded-xl overflow-hidden border-2 transition-all"
                  style={{
                    borderColor: i === selectedImageIndex ? COLORS.surfaceTeal : '#E6EEF2',
                    backgroundColor: COLORS.cream,
                    opacity: i === selectedImageIndex ? 1 : 0.7,
                  }}
                  aria-label={`View ${img.alt}`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
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
              <WhisperText text="The Dive Journal" wordDelay={0.18} duration={1.2} />
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
              {PRODUCT.description}
            </p>

            {/* Quick feature pills */}
            <div className="flex flex-wrap gap-2 mb-7">
              <HeroBadge>30 Pages</HeroBadge>
              <HeroBadge color={COLORS.midDepth}>A5 Ring Binder</HeroBadge>
              <HeroBadge color={COLORS.midDepth}>Diver&rsquo;gram</HeroBadge>
              <HeroBadge color={COLORS.surfaceTeal}>Marine Guide</HeroBadge>
            </div>

            {/* Bundle selector */}
            <div className="mb-5">
              <label className="block text-xs tracking-wider font-medium mb-2 uppercase" style={{ color: COLORS.midDepth }}>
                Choose Bundle
              </label>
              <div className="space-y-2">
                {BUNDLE_OPTIONS.map((bundle) => {
                  const isSelected = selectedBundle === bundle.id;
                  return (
                    <button
                      key={bundle.id}
                      type="button"
                      onClick={() => setSelectedBundle(bundle.id)}
                      className="w-full text-left p-4 rounded-xl border-2 transition-all relative"
                      style={{
                        borderColor: isSelected ? COLORS.surfaceTeal : '#E6EEF2',
                        backgroundColor: isSelected ? `${COLORS.highlight}25` : 'white',
                      }}
                    >
                      {bundle.badge && (
                        <span
                          className="absolute -top-2 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: bundle.badge.color, color: bundle.badge.textColor }}
                        >
                          {bundle.badge.label}
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
                              {bundle.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{bundle.description}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-baseline gap-1.5 justify-end">
                            {bundle.savings > 0 && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(bundle.originalPrice)}
                              </span>
                            )}
                            <span className="text-base font-bold" style={{ color: COLORS.deepWater }}>
                              {formatPrice(bundle.price)}
                            </span>
                          </div>
                          {bundle.savings > 0 && (
                            <span className="text-[10px] font-medium" style={{ color: COLORS.surfaceTeal }}>
                              Save {formatPrice(bundle.savings)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total + CTA */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xl md:text-2xl font-bold" style={{ color: COLORS.deepWater }}>
                {formatPrice(currentBundle.price)}
              </span>
            </div>

            <div className="mb-6">
              <FishyButton onClick={handleAddToCart} variant="1">
                ADD TO CART
              </FishyButton>
            </div>

            <TrustBadges variant="light" size="sm" />

            <div className="mt-auto pt-6 text-center">
              <Link
                href={BOOSTER_PACK_LINK}
                className="text-xs tracking-wider hover:underline"
                style={{ color: COLORS.surfaceTeal }}
              >
                View Booster Pack details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURE BANNER ============ */}
      <section className="px-4 md:px-8 py-8 md:py-10" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-base md:text-lg tracking-[0.3em] font-semibold" style={{ color: COLORS.surfaceTeal }}>
              WHAT&rsquo;S INSIDE
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {JOURNAL_FEATURES.map((feature, i) => (
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

      {/* ============ LAMP SPOTLIGHT — story + Diver'gram visual ============ */}
      <LampSpotlight>
        <p
          className="text-base md:text-lg tracking-[0.3em] font-semibold mb-4"
          style={{ color: COLORS.highlight }}
        >
          MORE THAN JUST STATS
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">
          <WhisperText text="Beyond the dive computer." wordDelay={0.18} duration={1.4} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
        >
          Computers track your stats. The Dive Journal captures the texture — the unexpected
          nudibranch, the current that caught you on the descent, the configuration that finally
          clicked. Build a record of how you actually dive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 3.0, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 max-w-md w-full"
        >
          <img
            src="/images/products/The-log-pages-notes.jpg"
            alt="Diver'gram log page"
            className="rounded-xl drop-shadow-2xl w-full aspect-[3/2] object-cover"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 3.7, ease: 'easeOut' }}
          className="text-white/60 text-sm tracking-[0.25em] uppercase mb-5"
        >
          Diver&rsquo;gram · Marine Safari · Where Can I See?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 4.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <FishyButton onClick={handleAddToCart} variant="1">
            ADD TO CART
          </FishyButton>
        </motion.div>
      </LampSpotlight>

      {/* ============ DIVER'GRAM HIGHLIGHT ============ */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <img
              src="/images/products/The-log-pages-in-binder.jpg"
              alt="Diver'gram log page in the journal binder"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            <p className="text-xs tracking-[0.3em] font-medium mb-3" style={{ color: COLORS.surfaceTeal }}>
              UNIQUE FEATURE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: COLORS.deepWater }}>
              <WhisperText text="The Diver'gram." wordDelay={0.2} duration={1.2} />
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
              Forget scribbling notes about your gear. Mark your weight placement and equipment
              setup directly on a visual diagram. Over time, build a personal benchmark that helps
              you nail your trim dive after dive.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                'Visual weight + equipment logging',
                'BCD, tank size, wetsuit & exposure suit',
                'Dive-by-dive trim improvement',
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-0.5" style={{ color: COLORS.surfaceTeal }}>
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <FishyButton onClick={handleAddToCart} variant="1">
              ADD TO CART
            </FishyButton>
          </div>
        </div>
      </section>

      {/* ============ CUSTOMERS ALSO LOVE ============ */}
      <section className="bg-white px-4 md:px-8 py-14 md:py-16" style={{ backgroundColor: COLORS.cream }}>
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

      {/* ============ REVIEWS ============ */}
      <ReviewsSection
        reviews={getReviewsByProduct(SLUG)}
        title={<WhisperText text="What Divers Say" wordDelay={0.18} duration={1.3} />}
        subtitle="VERIFIED REVIEWS"
        variant="light"
        showAllLink={true}
      />

      <RecentlyViewed excludeId={SLUG} variant="light" />
      <Footer />
    </div>
  );
}
