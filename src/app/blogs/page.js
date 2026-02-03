'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Blog Categories
const CATEGORIES = ['All', 'Dive Destinations', 'Gear Guides', 'Community', 'Conservation'];

// Placeholder blog posts - will be replaced with Shopify blog data
const PLACEHOLDER_POSTS = [
  {
    id: 1,
    title: 'Top 5 Nudibranch Hotspots in Southeast Asia',
    excerpt: 'Discover the best macro diving destinations for spotting these colorful sea slugs. From the muck diving mecca of Anilao to the pristine reefs of Raja Ampat.',
    category: 'Dive Destinations',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    date: 'Coming Soon',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'How to Keep Your Dive Gear in Perfect Condition',
    excerpt: 'Essential maintenance tips to extend the life of your dive equipment. Learn the proper care routine for regulators, BCDs, wetsuits and more.',
    category: 'Gear Guides',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
    date: 'Coming Soon',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Meet the Divers Behind Our Sticker Designs',
    excerpt: 'The stories and adventures that inspire each location sticker. From our designers who have logged thousands of dives across the globe.',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
    date: 'Coming Soon',
    readTime: '4 min read',
  },
  {
    id: 4,
    title: 'Protecting Our Reefs: A Diver\'s Responsibility',
    excerpt: 'Simple actions every diver can take to minimize their impact on marine ecosystems and help preserve the underwater world for future generations.',
    category: 'Conservation',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800',
    date: 'Coming Soon',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Night Diving: A Whole New World After Dark',
    excerpt: 'Everything you need to know about diving after sunset. From essential equipment to the incredible nocturnal creatures you might encounter.',
    category: 'Dive Destinations',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800',
    date: 'Coming Soon',
    readTime: '8 min read',
  },
  {
    id: 6,
    title: 'The Art of Underwater Photography',
    excerpt: 'Tips and techniques for capturing stunning images beneath the waves. From camera settings to composition and working with natural light.',
    category: 'Gear Guides',
    image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800',
    date: 'Coming Soon',
    readTime: '10 min read',
  },
];

// Blog Card Component
function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="aspect-[16/10] bg-cover bg-center relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${post.image})`,
          backgroundColor: LUNA.midDepth,
        }}
      >
        {/* Category Badge */}
        <span 
          className="absolute top-4 left-4 text-[10px] tracking-wider font-semibold px-3 py-1 rounded-full"
          style={{ 
            backgroundColor: LUNA.surfaceTeal,
            color: 'white',
          }}
        >
          {post.category.toUpperCase()}
        </span>
        
        {/* Hover Overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ backgroundColor: `${LUNA.abyss}80` }}
        >
          <span className="text-white text-sm font-medium px-6 py-2 rounded-full border border-white/50">
            Coming Soon
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-gray-400">{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-xs text-gray-400">{post.readTime}</span>
        </div>
        
        <h3 
          className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#54ACBF] transition-colors"
          style={{ color: LUNA.deepWater }}
        >
          {post.title}
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
}

// Main Page Component
export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter posts by category
  const filteredPosts = activeCategory === 'All' 
    ? PLACEHOLDER_POSTS 
    : PLACEHOLDER_POSTS.filter(post => post.category === activeCategory);

  return (
    <div 
      className="min-h-screen w-full bg-gray-50"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <Header variant="light" currentPath="/blogs" />

      {/* Hero Section */}
      <section 
        className="w-full pt-20 pb-16 px-8"
        style={{
          background: `linear-gradient(160deg, ${LUNA.midDepth} 0%, ${LUNA.deepWater} 40%, ${LUNA.abyss} 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] font-medium mb-4 block"
            style={{ color: LUNA.highlight }}
          >
            FROM THE DEEP
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ 
              background: `linear-gradient(135deg, ${LUNA.highlight} 0%, #FF6B9D 50%, ${LUNA.highlight} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Salt & Stories
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Dive tales, travel tips, and underwater adventures from our community of ocean lovers.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full py-8 px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeCategory === category ? LUNA.surfaceTeal : 'transparent',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full py-12 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12 p-6 rounded-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${LUNA.highlight}15 0%, ${LUNA.surfaceTeal}15 100%)`,
              border: `1px solid ${LUNA.highlight}30`,
            }}
          >
            <span className="text-2xl mb-2 block">🌊</span>
            <h3 className="font-semibold mb-2" style={{ color: LUNA.deepWater }}>
              Stories Coming Soon
            </h3>
            <p className="text-gray-600 text-sm">
              We're working on some great content for you. Check back soon for dive tales, tips, and adventures!
            </p>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section 
        className="w-full py-16 px-8"
        style={{ backgroundColor: LUNA.deepWater }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Don't Miss a Story
          </h3>
          <p className="text-white/60 mb-6">
            Subscribe to get notified when we publish new content.
          </p>
          <Link
            href="/#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
              color: 'white',
            }}
          >
            Subscribe to Updates
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
