import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import CartDrawer from '@/components/CartDrawer';
import FloatingCartButton from '@/components/FloatingCartButton';
import CookieConsent from '@/components/CookieConsent';
import AnnouncementBannerWrapper from '@/components/AnnouncementBannerWrapper';

export const metadata = {
  title: 'Otterseas - Dive Stickers & Accessories',
  description: 'Build your dive story with waterproof vinyl stickers from the world\'s best dive sites. Premium dive journals, location stickers, and gifts for scuba divers.',
  keywords: ['dive stickers', 'scuba diving', 'dive journal', 'diving accessories', 'dive site stickers', 'waterproof stickers', 'scuba gifts'],
  authors: [{ name: 'Otterseas' }],
  creator: 'Otterseas',
  metadataBase: new URL('https://otterseas.com'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://otterseas.com',
    siteName: 'Otterseas',
    title: 'Otterseas - Dive Stickers & Accessories',
    description: 'Build your dive story with waterproof vinyl stickers from the world\'s best dive sites. Premium dive journals, location stickers, and gifts for scuba divers.',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CurrencyProvider>
          <CartProvider>
            <AnnouncementBannerWrapper />
            {children}
            <CartDrawer />
            <FloatingCartButton />
            <CookieConsent />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
