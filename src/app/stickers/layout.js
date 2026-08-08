const title = 'Dive Site Stickers – 80+ Waterproof Location Stickers';
const description =
  'Collect waterproof vinyl stickers from over 80 dive sites worldwide — Raja Ampat, Palau, the Maldives, Cornwall and more. Illustrated through a diver\'s mask-eyed view, with bundle discounts the more you collect.';

export const metadata = {
  // Object form keeps the "%s | Otterseas" template alive for /stickers/[slug].
  title: { default: title, template: '%s | Otterseas' },
  description,
  alternates: { canonical: '/stickers' },
  openGraph: {
    title: `${title} | Otterseas`,
    description,
    url: '/stickers',
    images: [{ url: '/images/products/Location-stickers-close-up.jpg', alt: 'Otterseas dive site location stickers close up' }],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Otterseas`, description },
};

export default function StickersLayout({ children }) {
  return children;
}
