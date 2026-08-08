import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import CartDrawer from '@/components/CartDrawer';
import FloatingCartButton from '@/components/FloatingCartButton';
import CookieConsent from '@/components/CookieConsent';
import AnnouncementBannerWrapper from '@/components/AnnouncementBannerWrapper';

export const metadata = {
  title: {
    default: 'Otterseas – Dive Site Stickers, Dive Journals & Gifts for Scuba Divers',
    template: '%s | Otterseas',
  },
  description: 'Build your dive story with waterproof stickers from 80+ of the world\'s best dive sites. Premium dive journals, insulated bottles, embroidered clothing and gifts for scuba divers.',
  keywords: ['dive stickers', 'scuba diving', 'dive journal', 'diving accessories', 'dive site stickers', 'waterproof stickers', 'scuba gifts', 'scuba diver gift ideas'],
  authors: [{ name: 'Otterseas' }],
  creator: 'Otterseas',
  metadataBase: new URL('https://www.otterseas.com'),
  alternates: { canonical: '/' },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.otterseas.com',
    siteName: 'Otterseas',
    title: 'Otterseas – Dive Site Stickers, Dive Journals & Gifts for Scuba Divers',
    description: 'Build your dive story with waterproof stickers from 80+ of the world\'s best dive sites. Premium dive journals, insulated bottles, embroidered clothing and gifts for scuba divers.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Otterseas Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Sitewide structured data so search engines and AI assistants understand
// who Otterseas is. Rendered once in the root layout.
const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.otterseas.com/#organization',
      name: 'Otterseas',
      url: 'https://www.otterseas.com',
      logo: 'https://www.otterseas.com/logo.png',
      email: 'support@otterseas.com',
      description:
        'Otterseas makes dive site sticker collections, dive journals, insulated water bottles, embroidered clothing and handmade gifts for scuba divers.',
      sameAs: ['https://instagram.com/otter_seas'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.otterseas.com/#website',
      url: 'https://www.otterseas.com',
      name: 'Otterseas',
      publisher: { '@id': 'https://www.otterseas.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <CurrencyProvider>
          <CartProvider>
            <AnnouncementBannerWrapper />
            {children}
            <CartDrawer />
            <FloatingCartButton />
            <CookieConsent />
          </CartProvider>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
