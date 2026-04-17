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
        question: 'Why do scuba divers need an insulated water bottle?',
        answer: "Staying hydrated is one of the most important and most overlooked aspects of safe diving. Dehydration is a known contributing factor to decompression sickness \u2014 even mild dehydration thickens the blood and makes it harder for your body to off-gas nitrogen efficiently after a dive. On a typical dive day you\u2019re exposed to sun, salt air and physical exertion between dives, all of which accelerate fluid loss. An insulated bottle solves two specific dive boat problems: keeping your water cold during a long surface interval in the heat, and keeping a warm drink hot on cold early morning drift dives. A standard plastic bottle does neither well. The Otterseas Surface Tank is a 40oz double-wall vacuum-sealed bottle designed specifically for divers, built to handle the conditions of a live-aboard, a day boat or a shore dive in any climate.",
      },
      {
        question: 'What should I look for in a water bottle for diving?',
        answer: "Four things matter more than anything else for a diver\u2019s water bottle. Insulation \u2014 you want double-wall vacuum sealing that keeps drinks cold for at least 18 hours on a hot boat and hot for at least 12 hours on a cold morning dive. Capacity \u2014 a full dive day means you need at least a litre, ideally more. Stability \u2014 a silicone or rubberised base that won\u2019t slide across a wet boat deck when you hit a wave. And durability \u2014 stainless steel that won\u2019t crack, warp or leave a metallic taste when it gets knocked around in a kit bag. The Otterseas Surface Tank ticks all four: 40oz, double-wall vacuum sealed, silicone base, 18/8 pro-grade stainless steel, and no external condensation so it won\u2019t soak your dive gear sitting next to it on the boat.",
      },
      {
        question: 'What is a dive site sticker collection?',
        answer: "A dive site sticker collection is a set of waterproof stickers, each representing a specific scuba diving location around the world, designed to be added to a water bottle, dive bag or logbook as a record of the places you\u2019ve dived. The concept is similar to national park passport stamps or country sticker maps \u2014 each location you dive earns its sticker, and over time your collection becomes a visual record of your diving life. Otterseas pioneered this concept for the diving world with their Surface Tank \u2014 a premium insulated water bottle designed with scuba mask-shaped slots across the body, each one sized to hold one of their illustrated location stickers. With over 80 dive sites available across regions including South East Asia, the Indian Ocean, the Pacific, the Caribbean and the UK, the Surface Tank turns into what Otterseas calls your underwater passport.",
      },
      {
        question: 'What is the Otterseas Surface Tank?',
        answer: "The Otterseas Surface Tank is a 40oz premium insulated water bottle designed specifically for scuba divers. What makes it unlike any other water bottle is the body design \u2014 the exterior is printed with scuba mask outlines, each one a slot for one of Otterseas\u2019s illustrated location stickers representing dive sites from around the world. As you dive new locations, you add the matching sticker to your bottle, transforming it over time into a personalised record of your diving adventures \u2014 what Otterseas calls your underwater passport. The bottle itself is pro-grade 18/8 stainless steel with double-wall vacuum sealing, a silicone base for boat stability, a protected straw design under a foldable cap, and no external condensation. It comes in Deep Ocean teal and Arctic White, and holds up to 20 stickers.",
      },
      {
        question: 'What makes the Surface Tank different from other insulated water bottles?',
        answer: "Most insulated bottles are purely functional. The Surface Tank is functional and collectible \u2014 it\u2019s the only water bottle in the world designed around a dive site sticker system. The scuba mask-shaped outlines printed across the body aren\u2019t just decoration, they\u2019re slots for Otterseas location stickers, each one an illustrated snapshot of a specific dive site designed through a diver\u2019s perspective. Over time the bottle becomes a completely personal object \u2014 no two will ever look the same. On the practical side it also holds its own against the premium bottle market: 40oz capacity, 18 hours cold, 12 hours hot, 18/8 stainless steel, silicone base for boat stability and no external condensation. But the reason divers choose it over a Stanley or a Hydro Flask isn\u2019t the specs \u2014 it\u2019s that it tells their story in a way no other bottle can.",
      },
      {
        question: 'What are the Otterseas location stickers and how do they work?',
        answer: "Each Otterseas location sticker represents a specific dive site somewhere in the world \u2014 from Palau\u2019s jellyfish lakes to Iceland\u2019s Silfra fissure to the Banda Sea\u2019s open ocean passages. They\u2019re illustrated in a scuba mask shape, designed to look as though you\u2019re seeing the location through a diver\u2019s mask, with the marine life and landscape of each site captured in the artwork. The stickers are printed on heavy-duty waterproof vinyl built to survive saltwater, sun exposure and the general roughness of life in a dive bag. They\u2019re sized to fit precisely into the mask-shaped slots on the Surface Tank but work equally well on logbooks, laptops, dry bags and helmets. You choose which locations to add based on where you\u2019ve been \u2014 or where you\u2019re planning to go. Over 80 locations are available across eight regions, sold individually from \u00a31.75 or in curated regional packs.",
      },
      {
        question: 'How many stickers fit on the Surface Tank?',
        answer: "The Surface Tank has space for up to 20 stickers across the bottle body. The scuba mask outlines printed on the exterior mark exactly where each sticker sits, so the finished result looks intentional and designed rather than randomly covered. Most divers fill their bottle gradually over months or years as they dive new locations \u2014 which is part of what makes it satisfying. If you\u2019re just starting out, the empty slots are a bucket list as much as anything else: a visual reminder of the dive sites still to come.",
      },
      {
        question: 'Is the Surface Tank suitable for use on a dive boat?',
        answer: "It\u2019s specifically designed for it. The silicone base gives it grip on wet, moving boat decks \u2014 one of the most common frustrations with standard water bottles on live-aboards and day boats. At 40oz it holds enough water for a full day of diving without needing constant refilling. The double-wall vacuum sealing means your water stays cold even sitting in direct sun between dives, and the protected straw design tucks under a foldable cap so it doesn\u2019t get contaminated by salt spray or tank residue. The stainless steel construction handles the knocks and drops that come with boat life, and the waterproof stickers are built to survive the saltwater environment rather than peel off after a week at sea.",
      },
      {
        question: 'How do the stickers hold up to saltwater and sun?',
        answer: "Very well \u2014 durability is something Otterseas has been deliberate about. The location stickers are printed on heavy-duty weatherproof vinyl designed to withstand saltwater immersion, prolonged UV exposure and the physical wear of being on a bottle that travels. They won\u2019t peel, fade or bubble under normal dive travel conditions. The ink is UV-resistant to maintain the colour of the illustrated artwork over time, which matters given how detailed and vibrant the designs are. If you\u2019re the kind of diver who takes their kit seriously and travels frequently, the stickers are built to keep up.",
      },
      {
        question: 'Which dive locations are available as stickers?',
        answer: "Otterseas currently offers over 80 dive site stickers across eight regions: UK and Europe, USA and Canada, South East Asia, the Caribbean, the Indian Ocean, Pacific and Oceania, Latin America, and Expeditions. Highlights include Palau, Fiji, the Maldives, Iceland, Norway, the Banda Sea, Nusa Penida, Belize, the Gal\u00e1pagos, Raja Ampat, Komodo, Cornwall, Scapa Flow and many more. Stickers are available individually from \u00a31.75, or in curated regional packs \u2014 the Indonesia Pack, the Philippines Pack and the UK Bundle are popular starting points. New locations are added regularly, and if your dive site isn\u2019t yet in the collection you can suggest it directly through the website.",
      },
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
