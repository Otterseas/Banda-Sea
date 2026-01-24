import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

export const metadata = {
  title: 'Otterseas - Dive Stickers',
  description: 'Build your dive story with waterproof vinyl stickers from the world\'s best dive sites.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
