const title = 'The Dive Journal – Scuba Diving Logbook That’s More Than Stats';
const description =
  'A premium scuba diving logbook with full-colour log pages, marine life spotting guides, milestones and space for the story behind every dive. Refillable with booster packs. £28.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/products/dive-journal' },
  openGraph: {
    title: `${title} | Otterseas`,
    description,
    url: '/products/dive-journal',
    images: [{ url: '/images/products/The-dive-journal-product-shot.jpg', alt: 'Otterseas Dive Journal scuba diving logbook' }],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Otterseas`, description },
};

const PRODUCT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The Dive Journal',
  description:
    'Premium scuba diving logbook with full-colour log pages, marine life guides and milestone tracking. Refillable with log page booster packs.',
  image: 'https://www.otterseas.com/images/products/The-dive-journal-product-shot.jpg',
  brand: { '@type': 'Brand', name: 'Otterseas' },
  offers: {
    '@type': 'Offer',
    price: '28.00',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    url: 'https://www.otterseas.com/products/dive-journal',
  },
};

export default function DiveJournalLayout({ children }) {
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
