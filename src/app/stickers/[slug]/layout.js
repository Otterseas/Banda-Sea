import { getStickerBySlug } from '@/data/stickers';

// Generate dynamic metadata for each sticker page
export async function generateMetadata({ params }) {
  const sticker = getStickerBySlug(params.slug);

  if (!sticker) {
    return {
      title: 'Sticker Not Found | Otterseas',
      description: 'The requested sticker could not be found.',
    };
  }

  // Create SEO-optimized title and description
  const title = `${sticker.name} Dive Sticker – ${sticker.story?.headline || sticker.region} | Otterseas`;

  const description = sticker.story?.content
    ? `Add the ${sticker.name} dive sticker to your collection. ${sticker.story.content.slice(0, 140)}...`
    : `Collectible ${sticker.name} dive sticker from ${sticker.region}. Premium waterproof sticker perfect for dive journals, laptops, and gear bags.`;

  return {
    title,
    description,
    keywords: [
      // Location-specific keywords
      `${sticker.name} dive sticker`,
      `${sticker.name} scuba diving`,
      `${sticker.name} diving`,
      `dive ${sticker.name}`,
      `scuba ${sticker.name}`,
      sticker.country !== sticker.name ? `${sticker.country} diving` : null,
      sticker.country !== sticker.name ? `${sticker.country} scuba` : null,
      // Region keywords
      `${sticker.region} diving stickers`,
      `${sticker.region} scuba diving`,
      // Dive travel keywords
      'dive travel',
      'dive travel stickers',
      'scuba travel',
      'dive destination',
      'dive trip',
      'bucket list diving',
      // Scuba diving keywords
      'scuba diving stickers',
      'scuba stickers',
      'dive stickers',
      'diver stickers',
      'underwater stickers',
      // Sticker product keywords
      'dive journal stickers',
      'dive log stickers',
      'waterproof stickers',
      'laptop stickers diving',
      'water bottle stickers scuba',
      'dive gear stickers',
      // General diving keywords
      'scuba diver gift',
      'diving gift ideas',
      'diver accessories',
    ].filter(Boolean),
    openGraph: {
      title: `${sticker.name} Dive Sticker | Otterseas`,
      description,
      images: sticker.image ? [{ url: sticker.image, alt: `${sticker.name} Dive Sticker` }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${sticker.name} Dive Sticker | Otterseas`,
      description,
      images: sticker.image ? [sticker.image] : [],
    },
  };
}

export default function StickerLayout({ children }) {
  return children;
}
