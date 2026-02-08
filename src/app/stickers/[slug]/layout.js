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
      `${sticker.name} dive sticker`,
      `${sticker.name} scuba diving`,
      `${sticker.region} diving stickers`,
      'dive stickers',
      'scuba diving stickers',
      'underwater stickers',
      'dive journal stickers',
      sticker.country !== sticker.name ? `${sticker.country} diving` : null,
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
