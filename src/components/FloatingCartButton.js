'use client';

import { useCart } from '@/context/CartContext';

const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  abyss: '#011C40',
};

export default function FloatingCartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{
        background: `linear-gradient(135deg, ${LUNA.surfaceTeal} 0%, ${LUNA.midDepth} 100%)`,
        boxShadow: `0 4px 20px ${LUNA.midDepth}80`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M6 6h15l-1.5 9h-12z" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M6 6L5 3H2" />
      </svg>
      {totalItems > 0 && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
          style={{ backgroundColor: LUNA.highlight, color: LUNA.abyss }}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
