'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
// POLICY TABS
// ===========================================
const POLICY_TABS = [
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'returns', label: 'Returns' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'faq', label: 'FAQs' },
];

// ===========================================
// POLICY CONTENT - Add your content here
// ===========================================
const POLICY_CONTENT = {
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Introduction',
        content: 'Welcome to Otterseas. By accessing and using our website, you accept and agree to be bound by the terms and conditions outlined below.',
      },
      {
        heading: 'Use of Website',
        content: 'Add your website usage terms here...',
      },
      {
        heading: 'Products & Pricing',
        content: 'Add your product and pricing terms here...',
      },
      {
        heading: 'Intellectual Property',
        content: 'Add your intellectual property terms here...',
      },
      {
        heading: 'Limitation of Liability',
        content: 'Add your liability terms here...',
      },
      {
        heading: 'Governing Law',
        content: 'Add your governing law terms here...',
      },
    ],
  },
  returns: {
    title: 'Returns Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Our Promise',
        content: 'We want you to be completely happy with your purchase. If for any reason you are not satisfied, we are here to help.',
      },
      {
        heading: 'Return Eligibility',
        content: 'Add your return eligibility criteria here...',
      },
      {
        heading: 'How to Return',
        content: 'Add your return process instructions here...',
      },
      {
        heading: 'Refund Process',
        content: 'Add your refund process details here...',
      },
      {
        heading: 'Exchanges',
        content: 'Add your exchange policy here...',
      },
      {
        heading: 'Damaged or Faulty Items',
        content: 'Add your damaged items policy here...',
      },
    ],
  },
  shipping: {
    title: 'Shipping Information',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Delivery Times',
        content: 'Add your delivery timeframes here...',
      },
      {
        heading: 'UK Shipping',
        content: 'Add your UK shipping rates and info here...',
      },
      {
        heading: 'International Shipping',
        content: 'Add your international shipping rates and info here...',
      },
      {
        heading: 'Order Tracking',
        content: 'Add your order tracking information here...',
      },
      {
        heading: 'Customs & Import Duties',
        content: 'Add your customs information here...',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'How long does delivery take?',
        content: 'Add your answer here...',
      },
      {
        heading: 'Are your stickers waterproof?',
        content: 'Add your answer here...',
      },
      {
        heading: 'Can I track my order?',
        content: 'Add your answer here...',
      },
      {
        heading: 'Do you ship internationally?',
        content: 'Add your answer here...',
      },
      {
        heading: 'What payment methods do you accept?',
        content: 'Add your answer here...',
      },
      {
        heading: 'How do I contact customer support?',
        content: 'Add your answer here...',
      },
      {
        heading: 'Can I change or cancel my order?',
        content: 'Add your answer here...',
      },
      {
        heading: 'Are the crochet creatures machine washable?',
        content: 'Add your answer here...',
      },
    ],
  },
};

// ===========================================
// DROPDOWN SECTION COMPONENT
// ===========================================
function DropdownSection({ heading, content, isOpen, onToggle }) {
  return (
    <div 
      className="border-b"
      style={{ borderColor: `${LUNA.highlight}30` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left transition-colors hover:opacity-80"
      >
        <span className="font-semibold" style={{ color: LUNA.deepWater }}>
          {heading}
        </span>
        <motion.svg 
          width="20" height="20" viewBox="0 0 24 24" fill="none" 
          stroke={LUNA.surfaceTeal} strokeWidth="2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6"/>
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600 text-sm leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===========================================
// MAIN PAGE COMPONENT
// ===========================================
export default function PoliciesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('terms');
  const [openSections, setOpenSections] = useState({});

  const currentPolicy = POLICY_CONTENT[activeTab];

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [`${activeTab}-${index}`]: !prev[`${activeTab}-${index}`],
    }));
  };

  const isSectionOpen = (index) => {
    return openSections[`${activeTab}-${index}`] || false;
  };

  return (
    <div 
      className="min-h-screen w-full bg-white"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-8 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Otterseas" 
            className="w-10 h-10 rounded-xl object-contain"
          />
          <span className="text-xl font-medium tracking-tight" style={{ color: LUNA.deepWater }}>
            Otterseas
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: LUNA.deepWater }}>
            Products
          </Link>
          <Link href="/stickers" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: LUNA.deepWater }}>
            Stickers
          </Link>
          <Link href="/products/crochet-creatures" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: LUNA.deepWater }}>
            Crochet Creatures
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
          <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
          <span className="w-6 h-0.5" style={{ backgroundColor: LUNA.deepWater }} />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden"
            >
              <Link href="/" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/products" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>All Products</Link>
              <Link href="/stickers" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>Location Stickers</Link>
              <Link href="/products/fun-stickers" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>Fun Stickers</Link>
              <Link href="/products/crochet-creatures" className="block px-8 py-4 hover:bg-gray-50" style={{ color: LUNA.deepWater }} onClick={() => setIsMenuOpen(false)}>Crochet Creatures</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="max-w-3xl mx-auto px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: LUNA.deepWater }}
          >
            Policies & Help
          </h1>
          <p className="text-gray-500">
            Everything you need to know about shopping with Otterseas
          </p>
        </div>

        {/* Pill Navigation */}
        <div className="flex justify-center mb-8">
          <div 
            className="inline-flex p-1 rounded-full"
            style={{ backgroundColor: `${LUNA.highlight}20` }}
          >
            {POLICY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-all"
                style={{
                  color: activeTab === tab.id ? 'white' : LUNA.deepWater,
                  backgroundColor: activeTab === tab.id ? LUNA.surfaceTeal : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Policy Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Section Header */}
            <div className="mb-6">
              <h2 
                className="text-2xl font-bold mb-1"
                style={{ color: LUNA.deepWater }}
              >
                {currentPolicy.title}
              </h2>
              <p className="text-xs text-gray-400">
                Last updated: {currentPolicy.lastUpdated}
              </p>
            </div>

            {/* Dropdown Sections */}
            <div 
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: `${LUNA.highlight}30` }}
            >
              {currentPolicy.sections.map((section, index) => (
                <DropdownSection
                  key={index}
                  heading={section.heading}
                  content={section.content}
                  isOpen={isSectionOpen(index)}
                  onToggle={() => toggleSection(index)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Contact CTA */}
        <div 
          className="mt-12 p-6 rounded-xl text-center"
          style={{ 
            background: `linear-gradient(135deg, ${LUNA.highlight}15 0%, ${LUNA.surfaceTeal}10 100%)`,
            border: `1px solid ${LUNA.highlight}30`,
          }}
        >
          <h3 className="font-bold mb-2" style={{ color: LUNA.deepWater }}>
            Still have questions?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            We're here to help! Get in touch and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:info@otterseas.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
              color: 'white',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Us
          </a>
        </div>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer 
        className="w-full py-12 px-8 mt-12"
        style={{ backgroundColor: LUNA.abyss }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Otterseas" className="w-10 h-10 rounded-xl object-contain" />
              <span className="text-lg font-medium text-white">Otterseas</span>
            </Link>
            
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/products" className="text-white/50 hover:text-white text-sm transition-colors">All Products</Link>
              <Link href="/products/surface-tank" className="text-white/50 hover:text-white text-sm transition-colors">Surface Tank</Link>
              <Link href="/products/dive-journal" className="text-white/50 hover:text-white text-sm transition-colors">Dive Journal</Link>
              <Link href="/stickers" className="text-white/50 hover:text-white text-sm transition-colors">Location Stickers</Link>
              <Link href="/products/fun-stickers" className="text-white/50 hover:text-white text-sm transition-colors">Fun Stickers</Link>
              <Link href="/products/crochet-creatures" className="text-white/50 hover:text-white text-sm transition-colors">Crochet Creatures</Link>
              <Link href="/policies" className="text-white/50 hover:text-white text-sm transition-colors">Policies</Link>
            </nav>

            <p className="text-white/40 text-sm">© 2025 Otterseas</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
