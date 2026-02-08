'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SHOPIFY_BLOG_URL } from '@/config/urls';

// Luna Color Palette
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// Helper to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Helper to estimate read time
function estimateReadTime(content) {
  if (!content) return '3 min read';
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// Helper to get category from tags
function getCategoryFromTags(tags) {
  const categoryMap = {
    'dive-destinations': 'Dive Destinations',
    'gear-guides': 'Gear Guides',
    'community': 'Community',
    'conservation': 'Conservation',
    'destinations': 'Dive Destinations',
    'gear': 'Gear Guides',
    'tips': 'Gear Guides',
  };

  for (const tag of tags) {
    const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
    if (categoryMap[normalizedTag]) {
      return categoryMap[normalizedTag];
    }
  }
  return 'Community'; // Default category
}

// Blog Card Component
function BlogCard({ post, index, isShopifyPost }) {
  const blogUrl = isShopifyPost
    ? `${SHOPIFY_BLOG_URL}/${post.handle}`
    : '#';

  const CardWrapper = isShopifyPost ? 'a' : 'div';
  const cardProps = isShopifyPost
    ? { href: blogUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <CardWrapper {...cardProps} className={isShopifyPost ? 'block cursor-pointer' : ''}>
        <div
          className="aspect-[16/10] bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: post.image ? `url(${post.image.url || post.image})` : undefined,
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
            {(post.category || 'BLOG').toUpperCase()}
          </span>

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ backgroundColor: `${LUNA.abyss}80` }}
          >
            <span className="text-white text-sm font-medium px-6 py-2 rounded-full border border-white/50">
              {isShopifyPost ? 'Read Article' : 'Coming Soon'}
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
      </CardWrapper>
    </motion.article>
  );
}

// Loading Skeleton
function BlogCardSkeleton({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden bg-white shadow-sm"
    >
      <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-gray-200" />
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [shopifyPosts, setShopifyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']);

  // Fetch blog posts from Shopify
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blog?blog=news&limit=20');
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.articles && data.articles.length > 0) {
          // Transform Shopify articles to our format
          const posts = data.articles.map((article) => ({
            id: article.id,
            handle: article.handle,
            title: article.title,
            excerpt: article.excerpt || 'Read more about this topic...',
            category: getCategoryFromTags(article.tags || []),
            image: article.image,
            date: formatDate(article.publishedAt),
            readTime: estimateReadTime(article.content),
            tags: article.tags || [],
            isShopify: true,
          }));

          setShopifyPosts(posts);

          // Extract unique categories from posts
          const uniqueCategories = ['All', ...new Set(posts.map(p => p.category))];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  // Filter posts by category
  const filteredPosts = activeCategory === 'All'
    ? shopifyPosts
    : shopifyPosts.filter(post => post.category === activeCategory);

  const hasRealPosts = shopifyPosts.length > 0;

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

      {/* Category Filter - only show if we have posts */}
      {hasRealPosts && (
        <section className="w-full py-8 px-8 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
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
      )}

      {/* Blog Grid */}
      <section className="w-full py-12 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <BlogCardSkeleton key={i} index={i} />
              ))}
            </div>
          )}

          {/* No Posts / Coming Soon Notice */}
          {!isLoading && !hasRealPosts && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div
                className="max-w-md mx-auto p-8 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${LUNA.highlight}15 0%, ${LUNA.surfaceTeal}15 100%)`,
                  border: `1px solid ${LUNA.highlight}30`,
                }}
              >
                <span className="text-4xl mb-4 block">🌊</span>
                <h3 className="font-semibold text-xl mb-3" style={{ color: LUNA.deepWater }}>
                  Stories Coming Soon
                </h3>
                <p className="text-gray-600">
                  We're working on some great content for you. Check back soon for dive tales, tips, and adventures!
                </p>
              </div>
            </motion.div>
          )}

          {/* Posts Grid */}
          {!isLoading && hasRealPosts && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  isShopifyPost={post.isShopify}
                />
              ))}
            </div>
          )}

          {/* Empty Category State */}
          {!isLoading && hasRealPosts && filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No posts in this category yet.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-sm font-medium hover:underline"
                style={{ color: LUNA.surfaceTeal }}
              >
                View all posts
              </button>
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
