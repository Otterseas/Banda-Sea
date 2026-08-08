const title = 'The Surface Tank – 40oz Insulated Water Bottle for Scuba Divers';
const description =
  'The only water bottle designed around dive site stickers. 40oz double-wall vacuum-sealed stainless steel, silicone base for boat decks, and mask-shaped slots for up to 20 waterproof location stickers. £35.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/products/surface-tank' },
  openGraph: {
    title: `${title} | Otterseas`,
    description,
    url: '/products/surface-tank',
    images: [{ url: '/images/products/The-surface-tank-sunset.jpg', alt: 'Otterseas Surface Tank insulated dive water bottle at sunset' }],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Otterseas`, description },
};

const PRODUCT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The Surface Tank',
  description:
    '40oz double-wall vacuum-sealed stainless steel water bottle for scuba divers, with scuba-mask-shaped slots for up to 20 waterproof dive site stickers.',
  image: 'https://www.otterseas.com/images/products/The-surface-tank-sunset.jpg',
  brand: { '@type': 'Brand', name: 'Otterseas' },
  offers: {
    '@type': 'Offer',
    price: '35.00',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    url: 'https://www.otterseas.com/products/surface-tank',
  },
};

export default function SurfaceTankLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSONLD) }}
      />
      {children}
    </>
  );
}
