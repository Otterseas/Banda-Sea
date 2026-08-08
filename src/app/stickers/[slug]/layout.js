import { getStickerBySlug } from '@/data/stickers';

// Generate dynamic metadata for each sticker page
export async function generateMetadata({ params }) {
  const sticker = getStickerBySlug(params.slug);

  if (!sticker) {
    return {
      title: 'Sticker Not Found',
      description: 'The requested sticker could not be found.',
    };
  }

  // Create SEO-optimized title and description
  // Root layout template appends "| Otterseas" — don't add it here.
  const title = `${sticker.name} Dive Sticker – ${sticker.story?.headline || sticker.region}`;

  const description = sticker.story?.content
    ? `Add the ${sticker.name} dive sticker to your collection. ${sticker.story.content.slice(0, 140)}...`
    : `Collectible ${sticker.name} dive sticker from ${sticker.region}. Premium waterproof sticker perfect for dive journals, laptops, and gear bags.`;

  return {
    title,
    description,
    alternates: { canonical: `/stickers/${params.slug}` },
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

// Per-sticker structured data: Product (name, image, £2.50, in stock) and
// a breadcrumb trail. Rendered server-side so crawlers and AI assistants
// get it without executing the page's client JS.
export default function StickerLayout({ children, params }) {
  const sticker = getStickerBySlug(params.slug);
  if (!sticker) return children;

  const url = `https://www.otterseas.com/stickers/${sticker.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: `${sticker.name} Dive Sticker`,
        description: sticker.story?.content
          ? sticker.story.content.slice(0, 300)
          : `Waterproof ${sticker.name} dive site sticker from the ${sticker.region} collection.`,
        image: sticker.image,
        brand: { '@type': 'Brand', name: 'Otterseas' },
        offers: {
          '@type': 'Offer',
          price: '2.50',
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
          url,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.otterseas.com' },
          { '@type': 'ListItem', position: 2, name: 'Dive Site Stickers', item: 'https://www.otterseas.com/stickers' },
          { '@type': 'ListItem', position: 3, name: `${sticker.name} (${sticker.region})`, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
