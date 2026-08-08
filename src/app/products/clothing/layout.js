import { CLOTHING } from '@/data/clothing';

const title = 'Ocean Clothing – Embroidered Beanies & Caps for Divers | Otterseas';
const description =
  'Embroidered marine life beanies and caps for scuba divers, sailors and ocean lovers. Mola mola, orca and crab designs, stitched to order. From £18.50.';

export const metadata = {
  title,
  description,
  keywords: [
    'scuba diving beanie',
    'embroidered beanie',
    'mola mola hat',
    'orca cap',
    'ocean clothing',
    'marine life hat',
    'diver gift',
    'sailing cap',
    'dive apparel',
    'crab beanie',
  ],
  alternates: { canonical: '/products/clothing' },
  openGraph: {
    title,
    description,
    url: '/products/clothing',
    type: 'website',
    images: CLOTHING[0]?.images[0]
      ? [{ url: CLOTHING[0].images[0], alt: 'Otterseas embroidered ocean beanies and caps' }]
      : [],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

// JSON-LD so search engines and AI assistants can read the product list
function ClothingJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Otterseas Ocean Clothing',
    itemListElement: CLOTHING.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: item.title,
        description: item.description,
        image: item.images[0],
        brand: { '@type': 'Brand', name: 'Otterseas' },
        offers: {
          '@type': 'Offer',
          price: item.price.toFixed(2),
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
          url: 'https://otterseas.com/products/clothing',
        },
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ClothingLayout({ children }) {
  return (
    <>
      <ClothingJsonLd />
      {children}
    </>
  );
}
