const title = 'Crochet Creatures – Handmade Marine Animals';
const description =
  'Handmade crochet nudibranchs, octopuses and other marine creatures for divers and ocean lovers. Each one unique, crocheted with love. From £17.50.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/products/crochet-creatures' },
  openGraph: {
    title: `${title} | Otterseas`,
    description,
    url: '/products/crochet-creatures',
    images: [{ url: '/images/products/Purple-nudis-product-shot.png', alt: 'Handmade crochet nudibranch marine creatures' }],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Otterseas`, description },
};

export default function CrochetLayout({ children }) {
  return children;
}
