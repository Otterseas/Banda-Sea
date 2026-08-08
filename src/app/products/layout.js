// Metadata for the /products listing. Child routes (surface-tank, clothing,
// etc.) each carry their own layout.js which overrides these fields.
export const metadata = {
  // Object form keeps the "%s | Otterseas" template alive for child segments —
  // a plain string here would wipe it for every product page below.
  title: {
    default: 'Shop All – Dive Journals, Stickers, Bottles & Diver Gifts',
    template: '%s | Otterseas',
  },
  description:
    'Browse the full Otterseas range: dive site stickers from 80+ locations, premium dive journals, insulated water bottles, embroidered ocean clothing and handmade crochet marine creatures.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Shop All – Dive Journals, Stickers, Bottles & Diver Gifts | Otterseas',
    description:
      'Browse the full Otterseas range: dive site stickers, dive journals, insulated bottles, ocean clothing and handmade gifts for scuba divers.',
    url: '/products',
  },
};

export default function ProductsLayout({ children }) {
  return children;
}
