// ===========================================
// FUN STICKERS DATA
// ===========================================

// Shared quality statement for all stickers
export const QUALITY_STATEMENT = "Each sticker is printed on a thick, durable vinyl with a matte finish – giving our stickers a premium look & feel.";

export const FUN_STICKERS = [
  {
    id: 'post-dive-hair',
    title: "Post-Dive Hair. Don't Care",
    price: 3.50,
    description: "That moment when your perfectly styled hair meets your mask strap and decides to go rogue!",
    productInfo: [
      "Die-cut premium vinyl - 75mm x 58mm / 2.95\" x 2.28\"",
      "Water & weather resistant (unlike your hairstyle)",
      "UV protected",
      "Durable & long-lasting (just like those post-dive hair kinks)",
    ],
    images: [
      "https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare-MarketingImage.jpg?v=1746535285&width=823",
      "https://38a44d-4c.myshopify.com/cdn/shop/files/PostDiveHairDontCare_b49b4b9d-5468-4489-ae49-6c5450ff3817.jpg?v=1746535285&width=823",
    ],
    shopifyVariantId: "50590639194378",
  },
  {
    id: 'but-first-coffee',
    title: "But First. Coffee!",
    price: 3.50,
    description: "For the diver who believes the best buddy is a hot cup of coffee!",
    productInfo: [
      "Die-cut premium vinyl - 75mm x 58mm / 2.95\" x 2.28\"",
      "Water & weather resistant",
      "UV protected",
      "Durable & long-lasting",
    ],
    images: [
      "https://38a44d-4c.myshopify.com/cdn/shop/files/DiveFirstCoffeeSecond-MarketingImage.jpg?v=1746534827&width=823",
      "https://38a44d-4c.myshopify.com/cdn/shop/files/Coffee_First_Dive_Second.png?v=1746534865&width=823",
    ],
    shopifyVariantId: "51143553548554",
  },
  {
    id: 'bcd-bring-coffee-down',
    title: "BCD... Bring Coffee Down",
    price: 3.50,
    description: "What we all wish BCD really stood for. (and was possible!)",
    productInfo: [
      "Die-cut premium vinyl - 75mm x 58mm / 2.95\" x 2.28\"",
      "Water & weather resistant",
      "UV protected",
      "Durable & long-lasting",
    ],
    images: [
      "https://38a44d-4c.myshopify.com/cdn/shop/files/BCD....BringCoffeeDown-MarketingImage.jpg?v=1746535044&width=823",
      "https://38a44d-4c.myshopify.com/cdn/shop/files/BringCoffeeDownBCD.png?v=1746535045&width=823",
    ],
    shopifyVariantId: "51143940047114",
  },
  {
    id: 'fins-match-mask',
    title: "Yes, my fins match my mask!",
    price: 3.50,
    description: "Secretly, we all know what the most important feature of your fins are... does it match my mask!?",
    productInfo: [
      "Die-cut premium vinyl - 75mm x 56mm / 2.95\" x 2.27\"",
      "Water & weather resistant",
      "UV protected",
      "Durable & long-lasting",
    ],
    images: [
      "https://38a44d-4c.myshopify.com/cdn/shop/files/Yes_My_Fins_Match_My_Mask_-_Marketing_Image.jpg?v=1746535398&width=823",
      "https://38a44d-4c.myshopify.com/cdn/shop/files/ColourComboOtter.png?v=1746535398&width=823",
    ],
    shopifyVariantId: "50827800740106",
  },
];

// Bundle pricing
export const BUNDLE_DISCOUNT = 0.25; // 25% off sticker when bundled
export const BUNDLED_STICKER_PRICE = 3.50 * (1 - BUNDLE_DISCOUNT); // £2.63

// Helper function to get sticker by ID
export const getFunStickerById = (id) => {
  return FUN_STICKERS.find(s => s.id === id);
};
