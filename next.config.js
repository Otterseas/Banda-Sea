/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'], // Allow Shopify CDN images
  },
  async redirects() {
    return [
      // Corrected sticker slugs. Permanent (308) so search engines transfer
      // any accumulated signal to the properly spelled URL.
      {
        source: '/stickers/malapasqua',
        destination: '/stickers/malapascua',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
