'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
// PRODUCT LINKS
// ===========================================
const PRODUCT_LINKS = [
  {
    title: 'Location Stickers',
    description: 'Collect the dive sites you\'ve explored',
    href: '/stickers',
    icon: '🗺️',
  },
  {
    title: 'Surface Tank',
    description: 'Premium insulated water bottle',
    href: '/products/surface-tank',
    icon: '🧊',
  },
  {
    title: 'Dive Journal',
    description: 'Document your underwater adventures',
    href: '/products/dive-journal',
    icon: '📓',
  },
  {
    title: 'Crochet Creatures',
    description: 'Handmade marine animals',
    href: '/products/crochet-creatures',
    icon: '🧶',
  },
];

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function AboutPage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* ==================== HEADER ==================== */}
      <Header variant="dark" currentPath="/about" />

      {/* ==================== HERO SECTION ==================== */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center pt-20"
        style={{
          background: `linear-gradient(180deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 50%, ${LUNA.abyss} 100%)`
        }}
      >
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://fy3d04d7fsncz1uz-82591088906.shopifypreview.com/cdn/shop/files/DSC05580_copy.jpg?v=1736924733&width=990)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-widest mb-4 block"
            style={{ color: LUNA.highlight }}
          >
            ABOUT OTTERSEAS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Born From The Deep
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 leading-relaxed"
          >
            A passion for diving. A love for memories. A mission to help divers
            around the world celebrate their underwater adventures.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
            style={{ borderColor: LUNA.highlight }}
          >
            <div
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: LUNA.highlight }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== FOUNDER STORY ==================== */}
      <section className="py-20 px-6" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: `0 20px 60px ${LUNA.deepWater}20` }}
              >
                <img
                  src="https://fy3d04d7fsncz1uz-82591088906.shopifypreview.com/cdn/shop/files/IMG-20240818-WA0010.jpg?v=1730577648&width=990"
                  alt="Founder of Otterseas"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative element */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
                style={{ backgroundColor: `${LUNA.highlight}30` }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="text-sm font-medium tracking-widest mb-4 block"
                style={{ color: LUNA.surfaceTeal }}
              >
                THE STORY
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: LUNA.deepWater }}
              >
                Hi, I'm the Diver Behind Otterseas
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Like many divers, my journey started with that first breath underwater —
                  the moment everything changed. The weightlessness, the silence, the
                  incredible creatures... I was hooked.
                </p>
                <p>
                  After years of diving across the globe — from the coral gardens of
                  Southeast Asia to the shark-filled waters of the Caribbean — I realised
                  something was missing. A way to truly capture and celebrate these
                  experiences beyond just photos and logbook entries.
                </p>
                <p>
                  That's why I created Otterseas. Products designed by a diver, for divers.
                  Each sticker represents a real dive destination. Each product is crafted
                  with the same attention to detail we bring to our dive planning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== UNDERWATER IMAGE SECTION ==================== */}
      <section
        className="relative py-32"
        style={{
          backgroundImage: 'url(https://fy3d04d7fsncz1uz-82591088906.shopifypreview.com/cdn/shop/files/VideoCapture_20240819-200009.jpg?v=1736867570&width=990)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `${LUNA.abyss}80` }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-light text-white italic leading-relaxed"
          >
            "Every dive tells a story. Our products help you remember, share,
            and celebrate those stories for years to come."
          </motion.blockquote>
        </div>
      </section>

      {/* ==================== MISSION & VALUES ==================== */}
      <section
        className="py-20 px-6"
        style={{
          background: `linear-gradient(180deg, ${LUNA.abyss} 0%, ${LUNA.deepWater} 100%)`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              className="text-sm font-medium tracking-widest mb-4 block"
              style={{ color: LUNA.highlight }}
            >
              WHAT DRIVES US
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Mission
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌊',
                title: 'Celebrate Adventures',
                content: 'Every dive is an adventure worth remembering. We create products that help you capture and celebrate your underwater experiences.',
              },
              {
                icon: '🤿',
                title: 'Built for Divers',
                content: 'Designed by divers, for divers. We understand the community because we\'re part of it. Every product is tested in real diving conditions.',
              },
              {
                icon: '🌍',
                title: 'Connect the Community',
                content: 'Diving connects us to the ocean and to each other. Our products spark conversations and build connections between divers worldwide.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${LUNA.highlight}20`,
                }}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXPLORE PRODUCTS ==================== */}
      <section className="py-20 px-6" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="text-sm font-medium tracking-widest mb-4 block"
              style={{ color: LUNA.surfaceTeal }}
            >
              EXPLORE
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: LUNA.deepWater }}
            >
              Our Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each product is designed to help you document, share, and celebrate
              your diving adventures.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_LINKS.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={product.href}
                  className="block p-6 rounded-2xl transition-all hover:scale-105 h-full"
                  style={{
                    background: `linear-gradient(135deg, ${LUNA.highlight}15 0%, ${LUNA.surfaceTeal}10 100%)`,
                    border: `1px solid ${LUNA.highlight}30`,
                  }}
                >
                  <span className="text-3xl mb-3 block">{product.icon}</span>
                  <h3
                    className="font-bold mb-2"
                    style={{ color: LUNA.deepWater }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BLOG & COMMUNITY ==================== */}
      <section
        className="py-20 px-6"
        style={{
          background: `linear-gradient(180deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-sm font-medium tracking-widest mb-4 block"
              style={{ color: LUNA.highlight }}
            >
              JOIN THE COMMUNITY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Dive Deeper With Us
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Follow our adventures, get dive tips, and connect with fellow
              ocean enthusiasts from around the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
                color: 'white',
                boxShadow: `0 10px 30px ${LUNA.abyss}50`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Read Our Blog
            </Link>
            <Link
              href="/stickers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${LUNA.highlight}`,
                color: 'white',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Explore Destinations
            </Link>
          </motion.div>

          {/* Social hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 text-white/50 text-sm"
          >
            Follow us on social media for daily dive inspiration
          </motion.p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <Footer />
    </div>
  );
}
