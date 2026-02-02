// ===========================================
// LOCATION STICKER BUNDLES
// Updated with Shopify product IDs
// ===========================================

// Regional Packs (9 stickers @ £15)
// Theme Packs (10 stickers @ £16)

export const LOCATION_BUNDLES = [
  // ===========================================
  // REGIONAL PACKS (9 stickers @ £15)
  // ===========================================
  {
    id: 'pack-indonesia',
    type: 'regional',
    name: 'The Indonesia Pack',
    description: 'From Raja Ampat to Komodo - the best of the Coral Triangle',
    price: 15.00,
    originalPrice: 22.50, // 9 × £2.50
    savings: 7.50,
    stickerCount: 9,
    shopifyVariantId: '52451906945290',
    stickerIds: [
      'sea-1',  // Alor
      'sea-2',  // Ambon
      'sea-5',  // Banda Sea
      'sea-6',  // Bunaken
      'sea-13', // Komodo
      'sea-15', // Lembeh
      'sea-18', // Nusa Penida
      'sea-19', // Raja Ampat 01
      'sea-20', // Raja Ampat 02
    ],
    locations: ['Alor', 'Ambon', 'Banda Sea', 'Bunaken', 'Komodo', 'Lembeh', 'Nusa Penida', 'Raja Ampat 01', 'Raja Ampat 02'],
  },
  {
    id: 'pack-philippines',
    type: 'regional',
    name: 'The Philippines Pack',
    description: 'Macro paradise to whale sharks - discover the 7,000 islands',
    price: 15.00,
    originalPrice: 22.50,
    savings: 7.50,
    stickerCount: 9,
    shopifyVariantId: '52451902193930',
    stickerIds: [
      'sea-3',  // Anilao
      'sea-4',  // Apo Island
      'sea-7',  // Coron
      'sea-8',  // Dauin 01
      'sea-9',  // Dauin 02
      'sea-14', // Layte
      'sea-16', // Malapascua
      'sea-17', // Moalboal
      'sea-24', // Tubbataha
    ],
    locations: ['Anilao', 'Apo Island', 'Coron', 'Dauin', 'Layte', 'Malapascua', 'Moalboal', 'Tubbataha'],
  },
  // Add more regional packs as created in Shopify:
  // - Red Sea Collection
  // - Thailand & Malaysia
  // - Caribbean Dreams
  // - UK & Cold Water
  // - Maldives Paradise

  // ===========================================
  // THEME PACKS (10 stickers @ £16)
  // ===========================================
  // Add theme packs once created in Shopify:
  // {
  //   id: 'pack-sharks',
  //   type: 'theme',
  //   name: 'Shark Diver\'s Paradise',
  //   description: 'The world\'s best shark encounters',
  //   price: 16.00,
  //   originalPrice: 25.00,
  //   savings: 9.00,
  //   stickerCount: 10,
  //   shopifyVariantId: 'REPLACE_WHEN_CREATED',
  //   icon: '🦈',
  // },
];

// ===========================================
// PRODUCT BUNDLES (Journal, Booster, Gift Sets)
// ===========================================
export const PRODUCT_BUNDLES = [
  // Journal + Booster Bundles
  {
    id: 'bundle-journal-1booster',
    name: 'Journal + 1 Booster Pack',
    description: 'Dive Journal + 1 Booster Pack',
    contents: ['Dive Journal', '1× Logbook Booster Pack'],
    price: 35.00,
    originalPrice: 40.00,
    savings: 5.00,
    shopifyVariantId: '50232047665418',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=400',
  },
  {
    id: 'bundle-journal-2booster',
    name: 'Journal + 2 Booster Packs',
    description: 'Dive Journal + 2 Booster Packs',
    contents: ['Dive Journal', '2× Logbook Booster Pack'],
    price: 44.00,
    originalPrice: 52.00,
    savings: 8.00,
    shopifyVariantId: '52493311672586',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Journal_-_Image_only.jpg?v=1769573325&width=400',
  },
  // Booster Pack Bundles
  {
    id: 'bundle-booster-2pack',
    name: '2× Booster Packs',
    description: '2 Booster Packs - More logs, more dives',
    contents: ['2× Logbook Booster Pack'],
    price: 20.00,
    originalPrice: 24.00,
    savings: 4.00,
    shopifyVariantId: '52493596131594',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=400',
  },
  {
    id: 'bundle-booster-3pack',
    name: '3× Booster Packs',
    description: '3 Booster Packs - Best value for loggers',
    contents: ['3× Logbook Booster Pack'],
    price: 26.00,
    originalPrice: 36.00,
    savings: 10.00,
    shopifyVariantId: '52493614481674',
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Dive_Logs.jpg?v=1743749112&width=400',
  },
  // Gift Sets - with colour variants
  {
    id: 'bundle-gift-set-blue',
    name: 'Diver Gift Set (Blue)',
    description: 'Blue Surface Tank + Dive Journal',
    contents: ['Surface Tank (Blue)', 'Dive Journal'],
    price: 57.95,
    originalPrice: 68.00,
    savings: 10.05,
    shopifyVariantId: '52493497565450',
    colour: 'Blue',
    inStock: true,
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=400',
  },
  {
    id: 'bundle-gift-set-white',
    name: 'Diver Gift Set (White)',
    description: 'White Surface Tank + Dive Journal',
    contents: ['Surface Tank (White)', 'Dive Journal'],
    price: 57.95,
    originalPrice: 68.00,
    savings: 10.05,
    shopifyVariantId: '52493497598218',
    colour: 'White',
    inStock: false, // Currently out of stock
    image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=400',
  },
];

// ===========================================
// SURFACE TANK VARIANTS
// ===========================================
export const SURFACE_TANK_VARIANTS = {
  blue: {
    id: 'surface-tank-blue',
    name: 'Surface Tank - Blue',
    colour: 'Blue',
    colourHex: '#1e40af',
    price: 40.00,
    shopifyVariantId: '52453682807050',
    inStock: true,
  },
  white: {
    id: 'surface-tank-white',
    name: 'Surface Tank - White',
    colour: 'White',
    colourHex: '#ffffff',
    price: 40.00,
    shopifyVariantId: '52453682839818',
    inStock: false, // Currently out of stock
  },
};

// Helper to get all bundles
export function getAllBundles() {
  return [...LOCATION_BUNDLES, ...PRODUCT_BUNDLES];
}

// Helper to get bundles by type
export function getLocationBundles() {
  return LOCATION_BUNDLES;
}

export function getRegionalPacks() {
  return LOCATION_BUNDLES.filter(b => b.type === 'regional');
}

export function getThemePacks() {
  return LOCATION_BUNDLES.filter(b => b.type === 'theme');
}

export function getProductBundles() {
  return PRODUCT_BUNDLES;
}

export function getJournalBundles() {
  return PRODUCT_BUNDLES.filter(b => b.id.includes('journal'));
}

export function getBoosterBundles() {
  return PRODUCT_BUNDLES.filter(b => b.id.includes('booster') && !b.id.includes('journal'));
}

export function getGiftSets() {
  return PRODUCT_BUNDLES.filter(b => b.id.includes('gift'));
}

export function getSurfaceTankVariants() {
  return SURFACE_TANK_VARIANTS;
}
