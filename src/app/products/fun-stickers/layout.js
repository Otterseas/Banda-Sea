import { FUN_STICKERS } from '@/data/funStickers';

const title = 'Fun Dive Stickers – Vinyl Stickers with Scuba Humour';
const description =
  'Lighthearted waterproof vinyl stickers for divers: "Post-Dive Hair, Don\'t Care", "But First. Coffee!" and more. Premium matte vinyl, UV protected. £3.50 each.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/products/fun-stickers' },
  openGraph: {
    title: `${title} | Otterseas`,
    description,
    url: '/products/fun-stickers',
    images: FUN_STICKERS[0]?.images[0]
      ? [{ url: FUN_STICKERS[0].images[0], alt: 'Otterseas fun dive stickers' }]
      : [],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Otterseas`, description },
};

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Otterseas Fun Dive Stickers',
  itemListElement: FUN_STICKERS.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: s.title,
      description: s.description,
      image: s.images[0],
      brand: { '@type': 'Brand', name: 'Otterseas' },
      offers: {
        '@type': 'Offer',
        price: s.price.toFixed(2),
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: 'https://www.otterseas.com/products/fun-stickers',
      },
    },
  })),
};

export default function FunStickersLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      {children}
    </>
  );
}
