'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReviewsSection } from '@/components/Reviews';
import { getReviewsByProduct } from '@/data/reviews';
import { NotifyMeButton, StockBadge, SmartProductButton } from '@/components/NotifyMe';

// ===========================================
// LUNA COLOR PALETTE
// ===========================================
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// ===========================================
// PRODUCT DATA
// ===========================================
const PRODUCT = {
  name: 'The Dive Journal',
  tagline: 'MORE THAN JUST STATS',
  price: 28.00,
  salePrice: 25.20,
  onSale: true,
  description: "While dive computers are great at capturing data, they can't tell the whole story. The Dive Journal is designed for divers who want to record more than just numbers.",
  shopifyVariantId: '49658874331402',
  images: {
    hero: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=823',
    stacked: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive-journals-stock_1.jpg?v=1743749687&width=823',
    withComputer: 'https://38a44d-4c.myshopify.com/cdn/shop/files/20241030_100905.jpg?v=1743749112&width=823',
    storage: 'https://38a44d-4c.myshopify.com/cdn/shop/files/The_Dive_Journal.jpg?v=1743749112&width=823',
    logPages: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=823',
    reefFish: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Marine-Animals_1.jpg?v=1743749112&width=823',
    logPagesCard: 'https://38a44d-4c.myshopify.com/cdn/shop/files/DiveLogPages_03f98e7f-41ac-43f6-bb36-837f8035258f.jpg?v=1743749112&width=823',
    whereCanISee: 'https://38a44d-4c.myshopify.com/cdn/shop/files/WherecanIseePages.jpg?v=1743749112&width=823',
    milestones: 'https://38a44d-4c.myshopify.com/cdn/shop/files/MilestonePages.jpg?v=1743749112&width=823',
    marineSafari: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Marine-Safari-Pages.jpg?v=1743749112&width=823',
  }
};

const BOOSTER_PACK = {
  name: 'Logbook Booster Pack',
  description: '30 additional log pages',
  price: 12.00,
  shopifyVariantId: '49872531325194',
  link: '/products/logbook-booster-pack',
};

// Bundle pricing options - using bundle product Variant IDs
const BUNDLE_OPTIONS = [
  {
    id: 'journal-only',
    name: 'Journal Only',
    description: 'The Dive Journal',
    originalPrice: 28.00,
    price: 28.00,
    savings: 0,
    shopifyVariantId: '49658874331402', // Single journal variant
    isBundle: false,
  },
  {
    id: 'journal-plus-1',
    name: 'Journal + 1 Booster',
    description: 'The Dive Journal + 1 Booster Pack',
    originalPrice: 40.00, // 28 + 12
    price: 35.00,
    savings: 5.00,
    shopifyVariantId: '50232047665418', // Bundle product variant
    isBundle: true,
    recommended: true,
  },
  {
    id: 'journal-plus-2',
    name: 'Journal + 2 Boosters',
    description: 'The Dive Journal + 2 Booster Packs',
    originalPrice: 52.00, // 28 + 24
    price: 44.00,
    savings: 8.00,
    shopifyVariantId: '52493311672586', // Bundle product variant
    isBundle: true,
    bestValue: true,
  },
];

// ===========================================
// FAQ DATA
// Dual purpose: human-readable on-page FAQs +
// JSON-LD FAQPage schema for search / AI SEO.
// ===========================================
const FAQ_ITEMS = [
  {
    question: 'What is a scuba dive logbook?',
    answer: "A scuba dive logbook is a record of your dives \u2014 a place to document the details of each underwater experience including the dive site, depth, bottom time, visibility, water temperature, equipment used and marine life encountered. Most scuba training agencies including PADI and SSI recommend keeping a dive log from your very first open water dive, both as a record of your development and as a practical reference for future dives at the same site. Traditionally a physical notebook, dive logbooks range from basic printed booklets to premium journals like the Otterseas Dive Journal, which extends the concept beyond stats to include visual equipment logging, a marine life guide and worldwide dive site planning.",
  },
  {
    question: 'What is the best dive logbook for beginner scuba divers?',
    answer: "The best dive logbook for a beginner is one that guides you through what to record rather than leaving a blank page in front of you. The Otterseas Dive Journal was built with exactly that in mind \u2014 it has structured, visual log pages with prompts for everything from conditions and visibility to marine life spotted and how your trim felt underwater. The Diver\u2019gram is the feature that genuinely sets it apart for new divers: it\u2019s a visual diagram where you mark your exact weight placement and equipment setup, so you can track what worked and improve your buoyancy dive by dive. Most beginners spend their first ten dives guessing at their configuration \u2014 this journal takes that guesswork away.",
  },
  {
    question: 'What should I record in a scuba diving log?',
    answer: "A good dive log captures far more than depth and bottom time. The essentials are dive site and location, entry and exit times, maximum and average depth, visibility, water temperature, current conditions, and your equipment setup including weights. But the dives you\u2019ll actually remember are the ones where you also noted what you saw \u2014 the marine life, the unexpected moments, how the dive felt. The Otterseas Dive Journal structures all of this into a single visual page, including a dedicated section for your weight placement and BCD configuration, so over time you build a genuine record of your development as a diver rather than just a list of numbers.",
  },
  {
    question: 'Is a physical dive log better than a dive log app?',
    answer: "For most divers, yes \u2014 and here\u2019s why. A dive app is great for storing data, but it can\u2019t capture the texture of a dive: how the current caught you on the descent, what the visibility was really like, the nudibranch you spotted that you\u2019ve never seen before. A physical journal slows you down in the best way, making you reflect on the dive rather than just sync it. The Otterseas Dive Journal is also designed to travel \u2014 it\u2019s compact, water-resistant, and works anywhere on earth without needing a signal or a battery. That said, they work brilliantly together: use your dive computer for the numbers, and the journal for everything the computer can\u2019t capture.",
  },
  {
    question: 'What makes the Otterseas Dive Journal different from other dive logbooks?',
    answer: "Three things that you won\u2019t find anywhere else. First, the Diver\u2019gram \u2014 a visual diagram of a diver that lets you map your exact weight placement and kit configuration on every dive, so you can build a personal benchmark and actually improve your trim over time. Second, the Marine Safari guide \u2014 an illustrated checklist of hundreds of marine species across sharks, rays, reef fish, crustaceans and more, so your journal doubles as a wildlife spotter\u2019s guide. Third, the Where Can I See? pages \u2014 a global map of dive site hotspots that tells you the best locations and seasons for the marine life on your bucket list. Most logbooks just record what happened. The Otterseas Dive Journal helps you plan what happens next.",
  },
  {
    question: "What is the Diver\u2019gram?",
    answer: "The Diver\u2019gram is a unique feature of the Otterseas Dive Journal \u2014 a visual diagram of a diver in horizontal trim that lets you mark your exact weight placement on every dive. Rather than scribbling notes about how many kilos you used, you mark directly where weights were placed: weight belt, BCD integrated pockets, trim weights \u2014 alongside your full equipment configuration including tank size, BCD type, wetsuit thickness and exposure suit details. Over multiple dives it becomes your personal benchmark: you can look back and see exactly which configuration gave you the best trim, which tank position balanced you correctly, and what to adjust next time. It\u2019s particularly valuable for divers who are still developing their buoyancy \u2014 which is most of us for the first fifty dives.",
  },
  {
    question: 'What is included in the Otterseas Dive Journal?',
    answer: "The journal is built around five core sections. Thirty full-colour structured log pages, each designed to capture a complete dive including the Diver\u2019gram for equipment and weight logging. The Marine Safari \u2014 an illustrated guide to hundreds of marine species with checkboxes so you can tick off everything you encounter underwater. The Where Can I See? map \u2014 global hotspots for specific marine life with seasonal guides. Milestone and certification pages for recording your qualifications and significant dive count achievements. And a storage pocket for dive cards and notes. It all lives in a water-resistant frosted A5 ring binder with zip, compact enough for a carry-on or kit bag.",
  },
  {
    question: 'Is the Dive Journal suitable for complete beginners?',
    answer: "It\u2019s genuinely one of the best things you can start with. The structured log pages guide you through exactly what to record after each dive, which is genuinely useful when you\u2019re new and not sure what matters. The Diver\u2019gram is the feature that makes the biggest difference early on \u2014 most beginners spend a frustrating amount of time trying to get their weighting right, and having a visual record of exactly what you used on each dive means you\u2019re learning dive by dive rather than starting from scratch every time. The milestone pages are also a nice touch: seeing your Open Water certification recorded alongside your 10th dive, your 25th dive, and eventually your 50th is a proper record of a journey, not just a list of dives.",
  },
  {
    question: 'Can I use the Dive Journal for freediving or travelling?',
    answer: "For travel, absolutely \u2014 the A5 ring binder is designed to survive kit bags, overhead lockers and boat rides, and it\u2019s compact enough not to take up meaningful space. The Where Can I See? world map and the Marine Safari guide are useful regardless of how you dive. For freediving specifically, the log pages and Diver\u2019gram are built around scuba equipment configuration, so some fields won\u2019t apply \u2014 but the marine life sections, personal notes pages and milestone tracking work just as well. A lot of freedivers use it alongside their scuba diving, keeping one journal for the full underwater story.",
  },
  {
    question: 'Can I add more pages when the journal is full?',
    answer: "Yes \u2014 this is one of the things that makes the ring binder format worth it. When you\u2019ve filled your 30 log pages, you can add a Booster Pack of additional full-colour pages that slot straight into the same binder. So your journal becomes a genuine long-term record of your diving rather than something you replace. A journal with one Booster Pack costs \u00a335 if you want to start with more pages, or \u00a344 for two Booster Packs \u2014 and they\u2019re always available separately on the website when you need them.",
  },
  {
    question: 'Is the Otterseas Dive Journal a good gift for a scuba diver?',
    answer: "It\u2019s one of the most thoughtful gifts you can give a diver, and consistently one of the things we hear most in reviews. It works especially well for someone who has just got their Open Water certification \u2014 it gives them somewhere to start building their diving story from the very first dive. For more experienced divers it\u2019s the kind of upgrade they\u2019d love but wouldn\u2019t buy for themselves: premium, beautifully designed, and genuinely more useful than the basic logbook that comes with most courses. If you want to go further, the Diver\u2019s Gift Set pairs the journal with the Surface Tank water bottle for \u00a357.95 \u2014 saving \u00a310 on the pair and giving them everything they need above and below the surface.",
  },
  {
    question: 'How much does the Dive Journal cost and where can I buy it?',
    answer: "The Otterseas Dive Journal costs \u00a328.00 with free UK shipping on orders over \u00a350. If you want extra log pages from the start, a journal with one Booster Pack is \u00a335 and with two Booster Packs is \u00a344. The Diver\u2019s Gift Set with the Surface Tank water bottle is \u00a357.95. You can order directly from otterseas.com \u2014 use code NEWDIVER10 for 10% off your first order. The journal is also available through the Otterseas Etsy shop with international shipping options if you\u2019re ordering from outside the UK.",
  },
];

// Feature cards for the journal sections
const JOURNAL_FEATURES = [
  {
    id: 'log-pages',
    title: 'Dive Log Pages',
    subtitle: '30 Full Colour Pages',
    description: 'Quick & easy visual layout to log all dive info with our custom Diver\'gram for personal equipment setup.',
    image: 'logPagesCard',
    icon: '📝',
  },
  {
    id: 'marine-safari',
    title: 'Marine Safari',
    subtitle: 'Wildlife Checklist',
    description: 'Illustrated marine guide for wildlife spotting. Check off all you\'ve seen & add your own along the way.',
    image: 'marineSafari',
    icon: '🐠',
  },
  {
    id: 'where-can-i-see',
    title: 'Where Can I See?',
    subtitle: 'Global Hotspots',
    description: 'Worldwide dive site map & marine life hotspots. Plan your next underwater adventure.',
    image: 'whereCanISee',
    icon: '🗺️',
  },
  {
    id: 'milestones',
    title: 'Milestones & Achievements',
    subtitle: 'Track Your Journey',
    description: 'A dedicated space for your certifications, dive counts, and big achievements.',
    image: 'milestones',
    icon: '🏆',
  },
];

// ===========================================
// FAQ ACCORDION COMPONENT
// Content stays in the DOM at all times for SEO /
// AI-crawler visibility; we animate max-height only.
// ===========================================
function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-white"
            style={{ border: `1px solid ${LUNA.midDepth}25` }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50"
            >
              <h3
                className="text-base md:text-lg font-semibold leading-snug"
                style={{ color: LUNA.deepWater }}
              >
                {item.question}
              </h3>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                className="flex-shrink-0 text-2xl font-light leading-none"
                style={{ color: LUNA.surfaceTeal }}
              >
                +
              </motion.span>
            </button>
            <motion.div
              initial={false}
              animate={{
                maxHeight: isOpen ? 1200 : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <p
                className="px-5 pb-5 text-sm md:text-base leading-relaxed"
                style={{ color: LUNA.midDepth }}
              >
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function DiveJournalPage() {
  const [selectedImage, setSelectedImage] = useState('hero');
  const [selectedBundle, setSelectedBundle] = useState('journal-only');
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Get cart context for side cart
  const { addToCart, openCart } = useCart();
  
  // Get currency context
  const { formatPrice } = useCurrency();

  // Thumbnail images for gallery
  const thumbnails = [
    { key: 'hero', label: 'Overview' },
    { key: 'storage', label: 'Storage' },
    { key: 'logPages', label: 'Log Pages' },
    { key: 'reefFish', label: 'Marine Guide' },
    { key: 'withComputer', label: 'In Use' },
  ];

  // Get selected bundle data
  const currentBundle = BUNDLE_OPTIONS.find(b => b.id === selectedBundle);

  // Handle add to cart - opens side cart
  const handleAddToCart = () => {
    // Add the bundle (or single item) to cart using its Shopify variant ID
    addToCart({ 
      id: currentBundle.shopifyVariantId, 
      shopifyVariantId: currentBundle.shopifyVariantId,
      name: currentBundle.name,
      price: currentBundle.price,
      image: PRODUCT.images.hero,
      type: 'product',
    });
    // Open the side cart
    if (openCart) openCart();
  };

  return (
    <div 
      className="min-h-screen w-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ===========================================
          HEADER - SHARED COMPONENT
          =========================================== */}
      <Header variant="dark" currentPath="/products/dive-journal" />

      {/* ===========================================
          HERO SECTION
          =========================================== */}
      <section 
        className="min-h-screen relative pt-14"
        style={{
          background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
        }}
      >
        {/* Hero Content */}
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 pt-10 pb-12 gap-12">
          {/* Left - Product Info */}
          <div className="lg:w-1/2 max-w-xl">
            <motion.span 
              className="text-sm tracking-[0.25em] font-medium mb-4 block"
              style={{ color: LUNA.highlight }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {PRODUCT.tagline}
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              The Dive<br/>Journal
            </motion.h1>

            <motion.p 
              className="text-white/70 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {PRODUCT.description}
            </motion.p>

            {/* Price & Bundle Selection */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Bundle Options */}
              <div className="space-y-3">
                {BUNDLE_OPTIONS.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="p-4 rounded-xl cursor-pointer transition-all relative"
                    style={{ 
                      background: selectedBundle === bundle.id ? 'rgba(167, 235, 242, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: selectedBundle === bundle.id ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.1)',
                    }}
                    onClick={() => setSelectedBundle(bundle.id)}
                  >
                    {/* Badges */}
                    {bundle.recommended && (
                      <span 
                        className="absolute -top-2 right-4 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: LUNA.highlight, color: LUNA.abyss }}
                      >
                        RECOMMENDED
                      </span>
                    )}
                    {bundle.bestValue && (
                      <span 
                        className="absolute -top-2 right-4 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: '#FF6B9D', color: 'white' }}
                      >
                        BEST VALUE
                      </span>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Radio button */}
                        <div 
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                          style={{ 
                            borderColor: selectedBundle === bundle.id ? LUNA.highlight : 'rgba(255,255,255,0.3)',
                          }}
                        >
                          {selectedBundle === bundle.id && (
                            <div 
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: LUNA.highlight }}
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{bundle.name}</p>
                          <p className="text-white/50 text-xs">{bundle.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {bundle.savings > 0 && (
                            <span className="text-white/40 text-sm line-through">{formatPrice(bundle.originalPrice)}</span>
                          )}
                          <span className="text-white font-bold text-lg">{formatPrice(bundle.price)}</span>
                        </div>
                        {bundle.savings > 0 && (
                          <span className="text-xs" style={{ color: '#FF6B9D' }}>
                            Save {formatPrice(bundle.savings)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booster Pack Link */}
              <div className="text-center">
                <Link 
                  href={BOOSTER_PACK.link}
                  className="text-sm hover:underline"
                  style={{ color: LUNA.highlight }}
                >
                  View Booster Pack details →
                </Link>
              </div>

              {/* Add to Cart / Notify Me Button - Auto-checks stock */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="text-white/50 text-sm">Total:</span>
                  <span className="text-white text-2xl font-bold ml-2">{formatPrice(currentBundle.price)}</span>
                </div>
                
                <SmartProductButton
                  productName={currentBundle.name}
                  variantId={currentBundle.shopifyVariantId}
                  onAddToCart={handleAddToCart}
                  variant="dark"
                  showStockBadge={true}
                />
              </div>
            </motion.div>
          </div>

          {/* Right - Image Gallery */}
          <motion.div 
            className="lg:w-1/2 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Main Image */}
            <div className="relative mb-6">
              <motion.img
                key={selectedImage}
                src={PRODUCT.images[selectedImage]}
                alt={PRODUCT.name}
                className="max-h-[500px] w-auto rounded-2xl shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.key}
                  onClick={() => setSelectedImage(thumb.key)}
                  className="w-16 h-16 rounded-lg overflow-hidden transition-all"
                  style={{
                    border: selectedImage === thumb.key ? `2px solid ${LUNA.highlight}` : '2px solid rgba(255,255,255,0.2)',
                    opacity: selectedImage === thumb.key ? 1 : 0.6,
                  }}
                >
                  <img 
                    src={PRODUCT.images[thumb.key]} 
                    alt={thumb.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* ===========================================
          WHAT'S INSIDE SECTION
          =========================================== */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className="text-sm tracking-[0.25em] font-medium mb-4 block"
              style={{ color: LUNA.surfaceTeal }}
            >
              WHAT'S INSIDE
            </span>
            <h2 
              className="text-4xl md:text-5xl font-bold"
              style={{ color: LUNA.deepWater }}
            >
              Everything You Need
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {JOURNAL_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 100%)`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image - Better positioning */}
                  <div className="md:w-1/2 h-48 md:h-64 overflow-hidden">
                    <img
                      src={PRODUCT.images[feature.image]}
                      alt={feature.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <span className="text-3xl mb-3">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm mb-3" style={{ color: LUNA.highlight }}>{feature.subtitle}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add to Cart Button */}
          <motion.div
            className="flex justify-end mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleAddToCart}
              className="px-8 py-4 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 100%)`,
                border: `2px solid ${LUNA.surfaceTeal}`,
                color: 'white',
                boxShadow: `0 4px 20px ${LUNA.deepWater}50`
              }}
              whileHover={{ scale: 1.02, boxShadow: `0 6px 30px ${LUNA.deepWater}70` }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart - {formatPrice(currentBundle.price)}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ===========================================
          THE DIVER'GRAM SECTION
          =========================================== */}
      <section 
        className="py-24 px-8"
        style={{
          background: `linear-gradient(180deg, ${LUNA.abyss} 0%, ${LUNA.deepWater} 100%)`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={PRODUCT.images.logPages}
                alt="Diver'gram"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span 
                className="text-sm tracking-[0.25em] font-medium mb-4 block"
                style={{ color: LUNA.highlight }}
              >
                UNIQUE FEATURE
              </span>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ 
                  background: `linear-gradient(135deg, ${LUNA.highlight} 0%, ${LUNA.surfaceTeal} 50%, white 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                The Diver'gram
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Forget scribbling lengthy notes about your gear. We designed the Diver'gram to make logging intuitive. 
                Simply mark your weight placement and equipment setup directly on the visual diagram.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                It combines your standard stats with a clear layout, helping you remember exactly what configuration 
                worked best for your next dive.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  'Visual weight placement tracking',
                  'Equipment configuration at a glance',
                  'Build your personal benchmark',
                  'No more guessing what worked',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${LUNA.highlight}20`, border: `1px solid ${LUNA.highlight}` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={LUNA.highlight} strokeWidth="3">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===========================================
          LOG THE EXPERIENCE SECTION
          =========================================== */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: LUNA.deepWater }}
            >
              Log The Whole Experience
            </h2>
            <p 
              className="text-xl max-w-2xl mx-auto mb-12"
              style={{ color: LUNA.midDepth }}
            >
              Every dive is different. That's why The Dive Journal helps you capture how the dive felt, 
              what you learned, and what you saw. Not just your depth and bottom time.
            </p>
          </motion.div>

          {/* Image Row */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div 
              className="aspect-square rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img 
                src={PRODUCT.images.stacked}
                alt="Journals stacked"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            <motion.div 
              className="aspect-square rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={PRODUCT.images.withComputer}
                alt="In use with dive computer"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            <motion.div 
              className="aspect-square rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <img 
                src={PRODUCT.images.storage}
                alt="Storage compartment"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===========================================
          SPECS & CTA SECTION
          =========================================== */}
      <section 
        className="py-24 px-8"
        style={{
          background: `linear-gradient(180deg, ${LUNA.deepWater} 0%, ${LUNA.abyss} 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Specs */}
            <div>
              <span 
                className="text-sm tracking-[0.25em] font-medium mb-4 block"
                style={{ color: LUNA.highlight }}
              >
                SPECIFICATIONS
              </span>
              <h2 className="text-3xl font-bold text-white mb-8">What's Included</h2>
              
              <div className="space-y-4">
                {[
                  { icon: '📝', text: '30 detailed full-colour log pages' },
                  { icon: '💧', text: 'A5 water-resistant frosted ring binder' },
                  { icon: '🎨', text: 'Illustrated marine life guide' },
                  { icon: '📊', text: 'Custom Diver\'gram for gear setup' },
                  { icon: '🗺️', text: 'Worldwide dive site map' },
                  { icon: '🏆', text: 'Achievement & certification pages' },
                  { icon: '📦', text: 'Storage pocket for cards & notes' },
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80">
                    <span className="text-xl">{spec.icon}</span>
                    <span>{spec.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div 
              className="p-8 rounded-2xl"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${LUNA.highlight}30`
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Ready to Log Your Adventures?</h3>
              
              {/* Mini Bundle Selection */}
              <div className="space-y-2 mb-6">
                {BUNDLE_OPTIONS.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all"
                    style={{ 
                      background: selectedBundle === bundle.id ? 'rgba(167, 235, 242, 0.2)' : 'transparent',
                      border: selectedBundle === bundle.id ? `1px solid ${LUNA.highlight}` : '1px solid transparent',
                    }}
                    onClick={() => setSelectedBundle(bundle.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: selectedBundle === bundle.id ? LUNA.highlight : 'rgba(255,255,255,0.3)' }}
                      >
                        {selectedBundle === bundle.id && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LUNA.highlight }} />
                        )}
                      </div>
                      <span className="text-white text-sm">{bundle.name}</span>
                      {bundle.bestValue && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#FF6B9D', color: 'white' }}>
                          BEST VALUE
                        </span>
                      )}
                    </div>
                    <span className="text-white font-semibold">{formatPrice(bundle.price)}</span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl text-lg font-semibold transition-all mb-4"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${LUNA.highlight}`,
                  color: 'white',
                  boxShadow: `0 0 30px ${LUNA.highlight}30`
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${LUNA.highlight}50` }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Collection - {formatPrice(currentBundle.price)}
              </motion.button>

              <p className="text-white/50 text-sm text-center">
                Free shipping on orders over {formatPrice(30)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          FAQ SECTION
          Human-readable Q&A + JSON-LD FAQPage schema
          for traditional search and AI-answer engines.
          =========================================== */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm tracking-[0.25em] font-medium mb-4 block"
              style={{ color: LUNA.surfaceTeal }}
            >
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: LUNA.deepWater }}
            >
              Everything You Want to Know
            </h2>
            <p
              className="mt-4 text-base md:text-lg"
              style={{ color: LUNA.midDepth }}
            >
              Answers to the questions we hear most from divers.
            </p>
          </div>

          <FAQAccordion items={FAQ_ITEMS} />
        </div>

        {/* Structured data for search engines and AI answer engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_ITEMS.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </section>

      {/* ===========================================
          CUSTOMER REVIEWS SECTION
          =========================================== */}
      <ReviewsSection
        reviews={getReviewsByProduct('dive-journal')}
        title="What Divers Say"
        subtitle="VERIFIED REVIEWS"
        variant="dark"
        showAllLink={true}
      />

      {/* ===========================================
          FOOTER - SHARED COMPONENT
          =========================================== */}
      <Footer />
    </div>
  );
}
