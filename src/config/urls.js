// ===========================================
// CENTRALIZED URL CONFIGURATION
// ===========================================
// Update these values when switching from development to production
// All URLs across the site will update automatically

// ===========================================
// MAIN SITE URL
// ===========================================
// Change this when going live
export const SITE_URL = 'https://otterseas.com';

// ===========================================
// SHOPIFY STORE URLS
// ===========================================
// Development store - change to production when ready
export const SHOPIFY_STORE_URL = 'https://38a44d-4c.myshopify.com';

// Checkout URL (used by CartDrawer)
export const SHOPIFY_CHECKOUT_URL = `${SHOPIFY_STORE_URL}/cart/`;

// Blog URL (for linking to Shopify blog posts)
export const SHOPIFY_BLOG_URL = `${SHOPIFY_STORE_URL}/blogs/news`;

// ===========================================
// SOCIAL LINKS
// ===========================================
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/otter_seas',
  // Add more as needed:
  // facebook: 'https://facebook.com/otterseas',
  // tiktok: 'https://tiktok.com/@otterseas',
};

// ===========================================
// WHEN GOING LIVE - CHECKLIST
// ===========================================
// 1. Change SHOPIFY_STORE_URL to 'https://www.otterseas.com'
// 2. Verify all checkout flows work
// 3. Test blog links
// 4. Update DNS settings in Shopify admin
// 5. Enable SSL certificate
// ===========================================
