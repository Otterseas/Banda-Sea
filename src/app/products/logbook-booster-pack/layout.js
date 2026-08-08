const title = 'Log Pages Booster Pack – 30 Extra Dive Log Pages';
const description =
  '30 additional full-colour dive log pages for the Otterseas Dive Journal. Keep logging when your journal fills up — same premium paper, same layout. £12.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/products/logbook-booster-pack' },
  openGraph: {
    title: `${title} | Otterseas`,
    description,
    url: '/products/logbook-booster-pack',
    images: [{ url: '/images/products/The-log-pages-in-binder.jpg', alt: 'Otterseas dive log booster pages in binder' }],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Otterseas`, description },
};

const PRODUCT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Log Pages Booster Pack',
  description: '30 additional full-colour dive log pages for the Otterseas Dive Journal.',
  image: 'https://www.otterseas.com/images/products/The-log-pages-in-binder.jpg',
  brand: { '@type': 'Brand', name: 'Otterseas' },
  offers: {
    '@type': 'Offer',
    price: '12.00',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    url: 'https://www.otterseas.com/products/logbook-booster-pack',
  },
};

export default function BoosterPackLayout({ children }) {
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
