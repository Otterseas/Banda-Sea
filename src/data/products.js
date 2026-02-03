// Product data for Otterseas
// Water bottles and other merchandise

export const PRODUCTS = {
  'surface-tank': {
    id: 'surface-tank',
    slug: 'surface-tank',
    name: 'The Surface Tank',
    tagline: 'MEMORIES THAT STICK',
    price: 40.00,
    currency: 'GBP',
    description: {
      intro: "Capture yours with The Surface Tank - our premium water bottle that's more than just a vessel for hydration, its your reliable companion above the waves for all your underwater adventures.",
      stickers: "Each waterproof vinyl sticker is designed through a diver's mask-eyed view, capturing the unique vibe of every destination."
    },
    variants: [
      {
        id: 'blue',
        name: 'Deep Ocean',
        color: '#26658C',
        shopifyVariantId: '52453682807050',
        inStock: true,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=823'
      },
      {
        id: 'white',
        name: 'Arctic White',
        color: '#F5F5F0',
        shopifyVariantId: '52453682839818',
        inStock: false,
        image: 'https://38a44d-4c.myshopify.com/cdn/shop/files/Water_bottles_and_stickers.png?v=1769395822&width=823'
      }
    ],
    features: [
      {
        icon: '/icons/Vaccum_Insulation.svg',
        title: 'Double Wall',
        subtitle: 'Vacuum Sealed'
      },
      {
        icon: '/icons/Water_Capacity.svg',
        title: '40 oz / 1.2 L',
        subtitle: 'Capacity'
      },
      {
        icon: '/icons/Stainless_Steel.svg',
        title: 'Pro-Grade',
        subtitle: 'Stainless Steel'
      },
      {
        icon: '/icons/BPA_Free.svg',
        title: 'BPA Free',
        subtitle: 'Materials'
      },
      {
        icon: '/icons/No_Condensation.svg',
        title: 'No External',
        subtitle: 'Condensation'
      }
    ],
    specs: {
      capacity: '40oz / 1.2 litres',
      hotRetention: '12 hours',
      coldRetention: '18 hours',
      hotTemp: '≥48°C / 118.4°F',
      coldTemp: '≥12°C / 53.6°F',
      dimensions: '30 x 9 x 9cm',
      details: [
        '40oz / 1.2 litres Capacity',
        'Keeps drinks hot for 12 hours and cold for 18 hours',
        'Double-walled vacuum-sealed construction',
        'Premium stainless steel build',
        'Silicone base for enhanced stability on boats',
        'Protected straw design tucked under foldable cap',
        'Customizable with up to 20 waterproof stickers',
        'Perfect size for a full day\'s diving'
      ]
    },
    story: {
      headline: 'Every dive tells a story.',
      intro: "It's your underwater passport, transforming your Surface Tank into a unique logbook of underwater memories, space for up to 20 customised waterproof stickers.",
      description: "This premium double-walled vacuum-sealed bottle doesn't just keep your drinks cold on blazing boat rides and hot on chilly surface intervals, perfectly tempered – it becomes a passport of your diving adventures.",
      steps: [
        {
          number: '01',
          title: 'Choose Your Bottle',
          description: 'Durable, Reliable, Designed for Adventure.'
        },
        {
          number: '02',
          title: 'Select Your Stickers',
          description: 'Every location you dive has a matching sticker to add.'
        },
        {
          number: '03',
          title: 'Start Your Journey',
          description: 'Your bottle becomes your dive passport to your diving adventures.'
        }
      ]
    },
    shipping: {
      title: 'Shipping Info',
      content: [
        'Standard UK delivery: 3-5 business days',
        'Express UK delivery: 1-2 business days',
        'International shipping available',
        'All orders shipped with tracking'
      ]
    },
    faqs: [
      {
        question: 'How many stickers can fit on the bottle?',
        answer: 'The Surface Tank has space for up to 20 of our waterproof dive stickers, giving you plenty of room to document your underwater adventures.'
      },
      {
        question: 'Are the stickers really waterproof?',
        answer: 'Yes! Our stickers are made from premium waterproof vinyl that can withstand saltwater, chlorine, and repeated washing.'
      },
      {
        question: 'Can I put hot drinks in the bottle?',
        answer: 'Absolutely! The double-walled vacuum insulation keeps hot drinks hot for up to 12 hours and cold drinks cold for up to 18 hours.'
      },
      {
        question: 'Is it dishwasher safe?',
        answer: 'We recommend hand washing to preserve the finish and any stickers you\'ve applied. The lid should always be hand washed.'
      }
    ],
    returns: {
      title: 'Return & Refunds',
      content: [
        '30-day return policy for unused items',
        'Items must be in original packaging',
        'Refunds processed within 5-7 business days',
        'Contact support@otterseas.com for returns'
      ]
    },
    compliance: {
      title: 'EU GPSR Compliance',
      content: 'This product complies with the EU General Product Safety Regulation (GPSR). For safety information and manufacturer details, please contact us at compliance@otterseas.com'
    }
  }
};

export const getProductBySlug = (slug) => {
  return PRODUCTS[slug] || null;
};

export const getAllProducts = () => {
  return Object.values(PRODUCTS);
};
