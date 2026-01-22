// ===========================================
// STICKER DATA
// Replace image URLs with your Shopify CDN URLs
// Update story content for each sticker
// ===========================================

export const STICKERS = {
  'UK/Europe': [
    { 
      id: 'uk-1', 
      slug: 'scapa-flow',
      name: 'Scapa Flow', 
      region: 'UK/Europe', 
      country: 'Scotland',
      shopifyVariantId: 'PLACEHOLDER_UK1',
      image: '/stickers/scapa-flow.png', // Replace with Shopify CDN URL
      story: {
        headline: 'The Graveyard of the German Fleet',
        content: 'Scapa Flow is one of the world\'s greatest wreck diving destinations. This natural harbour in Orkney witnessed the scuttling of the German High Seas Fleet in 1919, leaving behind an underwater museum of WWI battleships.',
        designRationale: 'We chose to feature the iconic SMS Karlsruhe, capturing the haunting beauty of these historic wrecks resting in the cold Scottish waters.'
      }
    },
    { 
      id: 'uk-2', 
      slug: 'ss-thistlegorm',
      name: 'SS Thistlegorm', 
      region: 'UK/Europe', 
      country: 'Egypt (Red Sea)',
      shopifyVariantId: 'PLACEHOLDER_UK2',
      image: '/stickers/ss-thistlegorm.png',
      story: {
        headline: 'A WWII Time Capsule',
        content: 'The SS Thistlegorm is perhaps the most famous wreck dive in the world. This British cargo ship was sunk by German bombers in 1941 while carrying supplies to Allied forces.',
        designRationale: 'Our design showcases the iconic motorcycles and locomotives still visible in the cargo holds, frozen in time beneath the Red Sea.'
      }
    },
    { 
      id: 'uk-3', 
      slug: 'hms-royal-oak',
      name: 'HMS Royal Oak', 
      region: 'UK/Europe', 
      country: 'Scotland',
      shopifyVariantId: 'PLACEHOLDER_UK3',
      image: '/stickers/hms-royal-oak.png',
      story: {
        headline: 'A War Grave',
        content: 'HMS Royal Oak is a designated war grave, torpedoed by a German U-boat in 1939. While diving the wreck itself is prohibited, the site remains a powerful memorial.',
        designRationale: 'We created a respectful tribute to this historic vessel and the 833 sailors who lost their lives.'
      }
    },
    { 
      id: 'uk-4', 
      slug: 'farne-islands',
      name: 'Farne Islands', 
      region: 'UK/Europe', 
      country: 'England',
      shopifyVariantId: 'PLACEHOLDER_UK4',
      image: '/stickers/farne-islands.png',
      story: {
        headline: 'Grey Seal Paradise',
        content: 'The Farne Islands off Northumberland are home to one of Europe\'s largest grey seal colonies. Diving here means playful encounters with curious seals.',
        designRationale: 'Our sticker captures the joy of seal diving - those big eyes and whiskered faces that make every dive unforgettable.'
      }
    },
    { 
      id: 'uk-5', 
      slug: 'lundy-island',
      name: 'Lundy Island', 
      region: 'UK/Europe', 
      country: 'England',
      shopifyVariantId: 'PLACEHOLDER_UK5',
      image: '/stickers/lundy-island.png',
      story: {
        headline: 'England\'s Only Marine Reserve',
        content: 'Lundy Island in the Bristol Channel was the UK\'s first Marine Conservation Zone. Its protected waters teem with life.',
        designRationale: 'We highlighted the vibrant colours of Lundy\'s underwater world - jewel anemones, sea fans, and the famous Lundy cabbage!'
      }
    },
    { 
      id: 'uk-6', 
      slug: 'malta-wrecks',
      name: 'Malta Wrecks', 
      region: 'UK/Europe', 
      country: 'Malta',
      shopifyVariantId: 'PLACEHOLDER_UK6',
      image: '/stickers/malta-wrecks.png',
      story: {
        headline: 'Mediterranean Wreck Capital',
        content: 'Malta\'s crystal-clear waters and deliberately scuttled wrecks make it a world-class diving destination.',
        designRationale: 'We featured the Um El Faroud, a former oil tanker that now serves as an artificial reef and one of Malta\'s signature dives.'
      }
    },
    { 
      id: 'uk-7', 
      slug: 'orkney-islands',
      name: 'Orkney Islands', 
      region: 'UK/Europe', 
      country: 'Scotland',
      shopifyVariantId: 'PLACEHOLDER_UK7',
      image: '/stickers/orkney-islands.png',
      story: {
        headline: 'Where History Meets the Sea',
        content: 'Beyond Scapa Flow, Orkney offers incredible coastal diving with seals, wrecks, and dramatic underwater landscapes.',
        designRationale: 'We captured the rugged beauty of Orkney\'s coastline meeting the North Sea.'
      }
    },
    { 
      id: 'uk-8', 
      slug: 'plymouth-sound',
      name: 'Plymouth Sound', 
      region: 'UK/Europe', 
      country: 'England',
      shopifyVariantId: 'PLACEHOLDER_UK8',
      image: '/stickers/plymouth-sound.png',
      story: {
        headline: 'England\'s Ocean City',
        content: 'Plymouth Sound offers diverse diving from historic wrecks to the UK\'s first National Marine Park.',
        designRationale: 'Our design celebrates Plymouth\'s rich maritime heritage and thriving marine life.'
      }
    },
  ],

  'USA/Canada': [
    { 
      id: 'us-1', 
      slug: 'florida-keys',
      name: 'Florida Keys', 
      region: 'USA/Canada', 
      country: 'USA',
      shopifyVariantId: 'PLACEHOLDER_US1',
      image: '/stickers/florida-keys.png',
      story: {
        headline: 'America\'s Underwater Paradise',
        content: 'The Florida Keys boast North America\'s only living coral barrier reef, stretching 170 miles from Key Largo to Key West.',
        designRationale: 'We showcased the vibrant reef life and the famous Christ of the Abyss statue at John Pennekamp.'
      }
    },
    { 
      id: 'us-2', 
      slug: 'monterey-bay',
      name: 'Monterey Bay', 
      region: 'USA/Canada', 
      country: 'USA',
      shopifyVariantId: 'PLACEHOLDER_US2',
      image: '/stickers/monterey-bay.png',
      story: {
        headline: 'The Kelp Forest Kingdom',
        content: 'Monterey Bay\'s towering kelp forests are among the most productive ecosystems on Earth.',
        designRationale: 'Our sticker captures the cathedral-like beauty of diving through giant kelp with sea otters above.'
      }
    },
    { 
      id: 'us-3', 
      slug: 'great-lakes',
      name: 'Great Lakes', 
      region: 'USA/Canada', 
      country: 'USA/Canada',
      shopifyVariantId: 'PLACEHOLDER_US3',
      image: '/stickers/great-lakes.png',
      story: {
        headline: 'Freshwater Shipwreck Capital',
        content: 'The Great Lakes hold more shipwrecks than any other body of water, preserved in cold freshwater.',
        designRationale: 'We featured the haunting beauty of perfectly preserved wooden schooners in crystal-clear freshwater.'
      }
    },
    { 
      id: 'us-4', 
      slug: 'vancouver-island',
      name: 'Vancouver Island', 
      region: 'USA/Canada', 
      country: 'Canada',
      shopifyVariantId: 'PLACEHOLDER_US4',
      image: '/stickers/vancouver-island.png',
      story: {
        headline: 'Cold Water Colour Explosion',
        content: 'Vancouver Island offers some of the most colourful cold water diving in the world.',
        designRationale: 'We highlighted the psychedelic colours of giant pacific octopus, wolf eels, and cloud sponges.'
      }
    },
    { 
      id: 'us-5', 
      slug: 'north-carolina',
      name: 'North Carolina', 
      region: 'USA/Canada', 
      country: 'USA',
      shopifyVariantId: 'PLACEHOLDER_US5',
      image: '/stickers/north-carolina.png',
      story: {
        headline: 'Graveyard of the Atlantic',
        content: 'North Carolina\'s Outer Banks have claimed thousands of ships over centuries.',
        designRationale: 'Our design features the dramatic sand tiger sharks that patrol these historic wrecks.'
      }
    },
    { 
      id: 'us-6', 
      slug: 'channel-islands',
      name: 'Channel Islands', 
      region: 'USA/Canada', 
      country: 'USA',
      shopifyVariantId: 'PLACEHOLDER_US6',
      image: '/stickers/channel-islands.png',
      story: {
        headline: 'California\'s Galápagos',
        content: 'The Channel Islands National Park offers pristine diving with sea lions, giant sea bass, and kelp forests.',
        designRationale: 'We captured the playful California sea lions that make every dive an adventure.'
      }
    },
    { 
      id: 'us-7', 
      slug: 'hawaii',
      name: 'Hawaii', 
      region: 'USA/Canada', 
      country: 'USA',
      shopifyVariantId: 'PLACEHOLDER_US7',
      image: '/stickers/hawaii.png',
      story: {
        headline: 'Volcanic Underwater Wonderland',
        content: 'Hawaii\'s volcanic origins create unique underwater landscapes found nowhere else.',
        designRationale: 'Our sticker showcases manta rays gliding over lava tubes - pure Hawaiian magic.'
      }
    },
    { 
      id: 'us-8', 
      slug: 'puget-sound',
      name: 'Puget Sound', 
      region: 'USA/Canada', 
      country: 'USA',
      shopifyVariantId: 'PLACEHOLDER_US8',
      image: '/stickers/puget-sound.png',
      story: {
        headline: 'Pacific Northwest Diving',
        content: 'Puget Sound\'s nutrient-rich waters support incredible biodiversity in America\'s far northwest.',
        designRationale: 'We featured the giant pacific octopus - the intelligent giants of these waters.'
      }
    },
  ],

  'Caribbean': [
    { 
      id: 'cb-1', 
      slug: 'cozumel',
      name: 'Cozumel', 
      region: 'Caribbean', 
      country: 'Mexico',
      shopifyVariantId: 'PLACEHOLDER_CB1',
      image: '/stickers/cozumel.png',
      story: {
        headline: 'Drift Diving Paradise',
        content: 'Cozumel\'s legendary drift dives carry you effortlessly along pristine coral walls.',
        designRationale: 'We captured the exhilarating feeling of flying over Palancar Reef\'s dramatic formations.'
      }
    },
    { 
      id: 'cb-2', 
      slug: 'bonaire',
      name: 'Bonaire', 
      region: 'Caribbean', 
      country: 'Netherlands',
      shopifyVariantId: 'PLACEHOLDER_CB2',
      image: '/stickers/bonaire.png',
      story: {
        headline: 'Shore Diving Capital',
        content: 'Bonaire pioneered marine conservation in the Caribbean. Every dive site is a short walk from shore.',
        designRationale: 'Our design celebrates Bonaire\'s famous yellow-painted stones marking dive sites along the coast.'
      }
    },
    { 
      id: 'cb-3', 
      slug: 'grand-cayman',
      name: 'Grand Cayman', 
      region: 'Caribbean', 
      country: 'Cayman Islands',
      shopifyVariantId: 'PLACEHOLDER_CB3',
      image: '/stickers/grand-cayman.png',
      story: {
        headline: 'Stingray City & Beyond',
        content: 'Grand Cayman offers everything from shallow stingray encounters to dramatic wall dives.',
        designRationale: 'We featured the friendly southern stingrays that have made Stingray City world-famous.'
      }
    },
    { 
      id: 'cb-4', 
      slug: 'roatan',
      name: 'Roatan', 
      region: 'Caribbean', 
      country: 'Honduras',
      shopifyVariantId: 'PLACEHOLDER_CB4',
      image: '/stickers/roatan.png',
      story: {
        headline: 'Bay Islands Beauty',
        content: 'Roatan sits on the Mesoamerican Barrier Reef, the second largest reef system in the world.',
        designRationale: 'Our sticker showcases the dramatic walls and swim-throughs that define Roatan diving.'
      }
    },
    { 
      id: 'cb-5', 
      slug: 'turks-and-caicos',
      name: 'Turks & Caicos', 
      region: 'Caribbean', 
      country: 'Turks & Caicos',
      shopifyVariantId: 'PLACEHOLDER_CB5',
      image: '/stickers/turks-and-caicos.png',
      story: {
        headline: 'Wall Diving Excellence',
        content: 'The vertical walls of Turks & Caicos plunge thousands of feet into the abyss.',
        designRationale: 'We captured the vertigo-inducing drop-offs that make these walls legendary.'
      }
    },
    { 
      id: 'cb-6', 
      slug: 'saba',
      name: 'Saba', 
      region: 'Caribbean', 
      country: 'Netherlands',
      shopifyVariantId: 'PLACEHOLDER_CB6',
      image: '/stickers/saba.png',
      story: {
        headline: 'The Unspoiled Queen',
        content: 'Saba\'s protected marine park offers pristine diving far from the crowds.',
        designRationale: 'Our design highlights the volcanic pinnacles that rise from the deep around this tiny island.'
      }
    },
    { 
      id: 'cb-7', 
      slug: 'st-lucia',
      name: 'St. Lucia', 
      region: 'Caribbean', 
      country: 'St. Lucia',
      shopifyVariantId: 'PLACEHOLDER_CB7',
      image: '/stickers/st-lucia.png',
      story: {
        headline: 'Pitons Underwater',
        content: 'St. Lucia\'s famous Pitons continue underwater, creating dramatic diving beneath the volcanic peaks.',
        designRationale: 'We featured the iconic Pitons with the underwater world that mirrors their dramatic beauty.'
      }
    },
    { 
      id: 'cb-8', 
      slug: 'belize-barrier',
      name: 'Belize Barrier', 
      region: 'Caribbean', 
      country: 'Belize',
      shopifyVariantId: 'PLACEHOLDER_CB8',
      image: '/stickers/belize-barrier.png',
      story: {
        headline: 'The Great Blue Hole',
        content: 'Belize\'s barrier reef includes the legendary Blue Hole, a giant marine sinkhole visible from space.',
        designRationale: 'Our sticker captures the haunting beauty of descending into the Blue Hole\'s depths.'
      }
    },
  ],

  'Latin America': [
    { 
      id: 'la-1', 
      slug: 'galapagos',
      name: 'Galápagos', 
      region: 'Latin America', 
      country: 'Ecuador',
      shopifyVariantId: 'PLACEHOLDER_LA1',
      image: '/stickers/galapagos.png',
      story: {
        headline: 'Evolution\'s Laboratory',
        content: 'The Galápagos Islands offer encounters with species found nowhere else on Earth.',
        designRationale: 'We featured marine iguanas - the only ocean-going lizards, unique to these enchanted islands.'
      }
    },
    { 
      id: 'la-2', 
      slug: 'cenotes',
      name: 'Cenotes', 
      region: 'Latin America', 
      country: 'Mexico',
      shopifyVariantId: 'PLACEHOLDER_LA2',
      image: '/stickers/cenotes.png',
      story: {
        headline: 'Sacred Underground Rivers',
        content: 'Mexico\'s cenotes are windows into the world\'s longest underwater cave systems.',
        designRationale: 'Our design captures the magical light beams piercing the crystal-clear freshwater.'
      }
    },
    { 
      id: 'la-3', 
      slug: 'cocos-island',
      name: 'Cocos Island', 
      region: 'Latin America', 
      country: 'Costa Rica',
      shopifyVariantId: 'PLACEHOLDER_LA3',
      image: '/stickers/cocos-island.png',
      story: {
        headline: 'Hammerhead Heaven',
        content: 'Cocos Island is one of the best places on Earth to dive with massive schools of hammerhead sharks.',
        designRationale: 'We showcased the iconic hammerhead silhouettes against the deep blue.'
      }
    },
    { 
      id: 'la-4', 
      slug: 'fernando-de-noronha',
      name: 'Fernando de Noronha', 
      region: 'Latin America', 
      country: 'Brazil',
      shopifyVariantId: 'PLACEHOLDER_LA4',
      image: '/stickers/fernando-de-noronha.png',
      story: {
        headline: 'Brazil\'s Atlantic Jewel',
        content: 'This UNESCO site offers Brazil\'s best diving with spinner dolphins and pristine reefs.',
        designRationale: 'Our sticker features the playful spinner dolphins that welcome divers every morning.'
      }
    },
    { 
      id: 'la-5', 
      slug: 'socorro',
      name: 'Socorro', 
      region: 'Latin America', 
      country: 'Mexico',
      shopifyVariantId: 'PLACEHOLDER_LA5',
      image: '/stickers/socorro.png',
      story: {
        headline: 'Giant Manta Encounters',
        content: 'Socorro\'s giant oceanic mantas are known for approaching divers for close encounters.',
        designRationale: 'We captured the awe of having a giant manta hover inches above you.'
      }
    },
    { 
      id: 'la-6', 
      slug: 'belize-blue-hole',
      name: 'Belize Blue Hole', 
      region: 'Latin America', 
      country: 'Belize',
      shopifyVariantId: 'PLACEHOLDER_LA6',
      image: '/stickers/belize-blue-hole.png',
      story: {
        headline: 'The Great Blue Hole',
        content: 'This 400-foot deep sinkhole is one of diving\'s most iconic bucket list destinations.',
        designRationale: 'Our design showcases the perfect circle of deep blue surrounded by reef.'
      }
    },
    { 
      id: 'la-7', 
      slug: 'sea-of-cortez',
      name: 'Sea of Cortez', 
      region: 'Latin America', 
      country: 'Mexico',
      shopifyVariantId: 'PLACEHOLDER_LA7',
      image: '/stickers/sea-of-cortez.png',
      story: {
        headline: 'The World\'s Aquarium',
        content: 'Jacques Cousteau called the Sea of Cortez "the world\'s aquarium" for its incredible biodiversity.',
        designRationale: 'We featured the friendly sea lions of Los Islotes who love to play with divers.'
      }
    },
    { 
      id: 'la-8', 
      slug: 'isla-mujeres',
      name: 'Isla Mujeres', 
      region: 'Latin America', 
      country: 'Mexico',
      shopifyVariantId: 'PLACEHOLDER_LA8',
      image: '/stickers/isla-mujeres.png',
      story: {
        headline: 'Whale Shark Central',
        content: 'Each summer, hundreds of whale sharks gather off Isla Mujeres in the world\'s largest aggregation.',
        designRationale: 'Our sticker captures the magic of swimming alongside the ocean\'s gentle giants.'
      }
    },
  ],

  'Indo-Pacific': [
    { 
      id: 'ip-1', 
      slug: 'raja-ampat',
      name: 'Raja Ampat', 
      region: 'Indo-Pacific', 
      country: 'Indonesia',
      shopifyVariantId: 'PLACEHOLDER_IP1',
      image: '/stickers/raja-ampat.png',
      story: {
        headline: 'The Epicenter of Marine Biodiversity',
        content: 'Raja Ampat contains more marine species than anywhere else on Earth - over 1,500 fish species and 75% of all known coral species.',
        designRationale: 'We tried to capture the impossible abundance of life on a single Raja Ampat reef.'
      }
    },
    { 
      id: 'ip-2', 
      slug: 'komodo',
      name: 'Komodo', 
      region: 'Indo-Pacific', 
      country: 'Indonesia',
      shopifyVariantId: 'PLACEHOLDER_IP2',
      image: '/stickers/komodo.png',
      story: {
        headline: 'Dragons Above, Mantas Below',
        content: 'Komodo offers world-class diving alongside the famous dragons on land.',
        designRationale: 'Our design features the manta rays that gather at Komodo\'s cleaning stations.'
      }
    },
    { 
      id: 'ip-3', 
      slug: 'sipadan',
      name: 'Sipadan', 
      region: 'Indo-Pacific', 
      country: 'Malaysia',
      shopifyVariantId: 'PLACEHOLDER_IP3',
      image: '/stickers/sipadan.png',
      story: {
        headline: 'The Oceanic Island',
        content: 'Sipadan rises 600 meters from the seafloor, creating a magnet for pelagic life.',
        designRationale: 'We showcased the famous tornado of barracuda that circles the island.'
      }
    },
    { 
      id: 'ip-4', 
      slug: 'great-barrier-reef',
      name: 'Great Barrier Reef', 
      region: 'Indo-Pacific', 
      country: 'Australia',
      shopifyVariantId: 'PLACEHOLDER_IP4',
      image: '/stickers/great-barrier-reef.png',
      story: {
        headline: 'The World\'s Largest Living Structure',
        content: 'Stretching over 2,300 kilometers, the Great Barrier Reef is visible from space.',
        designRationale: 'Our sticker celebrates this natural wonder and the urgent need to protect it.'
      }
    },
    { 
      id: 'ip-5', 
      slug: 'palau',
      name: 'Palau', 
      region: 'Indo-Pacific', 
      country: 'Palau',
      shopifyVariantId: 'PLACEHOLDER_IP5',
      image: '/stickers/palau.png',
      story: {
        headline: 'Blue Corner & Beyond',
        content: 'Palau\'s Blue Corner is consistently rated one of the world\'s best dive sites.',
        designRationale: 'We captured the wall of sharks and fish that greet divers at Blue Corner.'
      }
    },
    { 
      id: 'ip-6', 
      slug: 'philippines',
      name: 'Philippines', 
      region: 'Indo-Pacific', 
      country: 'Philippines',
      shopifyVariantId: 'PLACEHOLDER_IP6',
      image: '/stickers/philippines.png',
      story: {
        headline: '7,641 Islands of Diving',
        content: 'The Philippines offers incredible diversity from whale sharks to thresher sharks to tiny nudibranchs.',
        designRationale: 'Our design features the thresher sharks of Malapascua - nowhere else can you reliably dive with them.'
      }
    },
    { 
      id: 'ip-7', 
      slug: 'thailand',
      name: 'Thailand', 
      region: 'Indo-Pacific', 
      country: 'Thailand',
      shopifyVariantId: 'PLACEHOLDER_IP7',
      image: '/stickers/thailand.png',
      story: {
        headline: 'Similan Islands & Richelieu Rock',
        content: 'Thailand\'s Andaman Sea sites offer some of Asia\'s best diving.',
        designRationale: 'We showcased Richelieu Rock - a purple soft coral paradise and whale shark hotspot.'
      }
    },
    { 
      id: 'ip-8', 
      slug: 'banda-sea',
      name: 'Banda Sea', 
      region: 'Indo-Pacific', 
      country: 'Indonesia',
      shopifyVariantId: 'PLACEHOLDER_IP8',
      image: '/stickers/banda-sea.png',
      story: {
        headline: 'The Ring of Fire',
        content: 'The Banda Sea is the ultimate frontier for the adventurous diver. Located in the deep heart of Indonesia, this region is famous for its "Ring of Fire"—a chain of volcanic islands that drop into the abyss. But let\'s be real, you come here for one specific season: Hammerhead Season. Twice a year, when the water temps drop, these deep waters attract massive schools of Scalloped Hammerheads.',
        designRationale: 'You literally cannot dive the Banda Sea without a home-at-sea, so the traditional Phinisi schooner had to be the star of the surface view. We painted those iconic red sails to capture the romance of sailing through the Indonesian archipelago. For the underwater section, we focused on depth. We used a gradient of deep, rich blues to represent the bottomless drop-offs of the volcanic walls.'
      }
    },
  ],

  'Indian Ocean': [
    { 
      id: 'io-1', 
      slug: 'maldives',
      name: 'Maldives', 
      region: 'Indian Ocean', 
      country: 'Maldives',
      shopifyVariantId: 'PLACEHOLDER_IO1',
      image: '/stickers/maldives.png',
      story: {
        headline: 'Manta Magic',
        content: 'The Maldives\' channels funnel nutrients that attract massive gatherings of manta rays year-round.',
        designRationale: 'We featured the graceful mantas that make the Maldives a bucket-list destination.'
      }
    },
    { 
      id: 'io-2', 
      slug: 'seychelles',
      name: 'Seychelles', 
      region: 'Indian Ocean', 
      country: 'Seychelles',
      shopifyVariantId: 'PLACEHOLDER_IO2',
      image: '/stickers/seychelles.png',
      story: {
        headline: 'Granite Gardens',
        content: 'Seychelles\' unique granite boulder formations create otherworldly underwater landscapes.',
        designRationale: 'Our design captures the surreal beauty of diving among ancient granite formations.'
      }
    },
    { 
      id: 'io-3', 
      slug: 'mozambique',
      name: 'Mozambique', 
      region: 'Indian Ocean', 
      country: 'Mozambique',
      shopifyVariantId: 'PLACEHOLDER_IO3',
      image: '/stickers/mozambique.png',
      story: {
        headline: 'Whale Shark & Manta Coast',
        content: 'Mozambique\'s Tofo Beach offers year-round encounters with whale sharks and manta rays.',
        designRationale: 'We showcased the incredible megafauna encounters that define Mozambique diving.'
      }
    },
    { 
      id: 'io-4', 
      slug: 'sharm-el-sheikh',
      name: 'Sharm El Sheikh', 
      region: 'Indian Ocean', 
      country: 'Egypt',
      shopifyVariantId: 'PLACEHOLDER_IO4',
      image: '/stickers/sharm-el-sheikh.png',
      story: {
        headline: 'Red Sea Gateway',
        content: 'Sharm El Sheikh offers easy access to world-class Red Sea diving including Ras Mohammed National Park.',
        designRationale: 'Our sticker features the vibrant coral walls that drop into the deep blue.'
      }
    },
    { 
      id: 'io-5', 
      slug: 'hurghada',
      name: 'Hurghada', 
      region: 'Indian Ocean', 
      country: 'Egypt',
      shopifyVariantId: 'PLACEHOLDER_IO5',
      image: '/stickers/hurghada.png',
      story: {
        headline: 'Wreck Diving Paradise',
        content: 'Hurghada provides access to legendary wrecks including the Thistlegorm and countless pristine reefs.',
        designRationale: 'We captured the excitement of exploring the Red Sea\'s historic wrecks.'
      }
    },
    { 
      id: 'io-6', 
      slug: 'dahab',
      name: 'Dahab', 
      region: 'Indian Ocean', 
      country: 'Egypt',
      shopifyVariantId: 'PLACEHOLDER_IO6',
      image: '/stickers/dahab.png',
      story: {
        headline: 'The Blue Hole',
        content: 'Dahab\'s Blue Hole is one of diving\'s most notorious sites - a 100m deep sinkhole steps from shore.',
        designRationale: 'Our design captures both the beauty and the respect this legendary site demands.'
      }
    },
    { 
      id: 'io-7', 
      slug: 'marsa-alam',
      name: 'Marsa Alam', 
      region: 'Indian Ocean', 
      country: 'Egypt',
      shopifyVariantId: 'PLACEHOLDER_IO7',
      image: '/stickers/marsa-alam.png',
      story: {
        headline: 'Dugong Territory',
        content: 'Marsa Alam is one of the few places where you can reliably encounter dugongs.',
        designRationale: 'We featured the gentle dugongs that graze on seagrass beds in these waters.'
      }
    },
    { 
      id: 'io-8', 
      slug: 'zanzibar',
      name: 'Zanzibar', 
      region: 'Indian Ocean', 
      country: 'Tanzania',
      shopifyVariantId: 'PLACEHOLDER_IO8',
      image: '/stickers/zanzibar.png',
      story: {
        headline: 'Spice Island Diving',
        content: 'Zanzibar offers pristine coral reefs and the chance to see dolphins and whale sharks.',
        designRationale: 'Our sticker captures the vibrant marine life around this historic spice island.'
      }
    },
  ],

  'Expeditions': [
    { 
      id: 'ex-1', 
      slug: 'antarctica',
      name: 'Antarctica', 
      region: 'Expeditions', 
      country: 'Antarctica',
      shopifyVariantId: 'PLACEHOLDER_EX1',
      image: '/stickers/antarctica.png',
      story: {
        headline: 'The Final Frontier',
        content: 'Diving in Antarctica means ice diving among penguins, seals, and alien-like creatures found nowhere else.',
        designRationale: 'We captured the surreal beauty of diving beneath Antarctic ice.'
      }
    },
    { 
      id: 'ex-2', 
      slug: 'truk-lagoon',
      name: 'Truk Lagoon', 
      region: 'Expeditions', 
      country: 'Micronesia',
      shopifyVariantId: 'PLACEHOLDER_EX2',
      image: '/stickers/truk-lagoon.png',
      story: {
        headline: 'The Ghost Fleet',
        content: 'Truk Lagoon holds over 60 WWII Japanese shipwrecks - the largest concentration of wrecks in the world.',
        designRationale: 'Our design honors this underwater war memorial and the history it preserves.'
      }
    },
    { 
      id: 'ex-3', 
      slug: 'bikini-atoll',
      name: 'Bikini Atoll', 
      region: 'Expeditions', 
      country: 'Marshall Islands',
      shopifyVariantId: 'PLACEHOLDER_EX3',
      image: '/stickers/bikini-atoll.png',
      story: {
        headline: 'Nuclear Test Fleet',
        content: 'Bikini Atoll\'s wrecks include the USS Saratoga and other vessels sunk during nuclear testing.',
        designRationale: 'We featured the hauntingly beautiful aircraft carrier resting in radioactive waters.'
      }
    },
    { 
      id: 'ex-4', 
      slug: 'coron-bay',
      name: 'Coron Bay', 
      region: 'Expeditions', 
      country: 'Philippines',
      shopifyVariantId: 'PLACEHOLDER_EX4',
      image: '/stickers/coron-bay.png',
      story: {
        headline: 'Japanese WWII Wrecks',
        content: 'Coron Bay holds a fleet of Japanese supply ships sunk by American aircraft in 1944.',
        designRationale: 'Our sticker showcases the coral-encrusted wrecks that have become artificial reefs.'
      }
    },
    { 
      id: 'ex-5', 
      slug: 'red-sea-liveaboard',
      name: 'Red Sea Liveaboard', 
      region: 'Expeditions', 
      country: 'Egypt/Sudan',
      shopifyVariantId: 'PLACEHOLDER_EX5',
      image: '/stickers/red-sea-liveaboard.png',
      story: {
        headline: 'Brothers, Daedalus & Elphinstone',
        content: 'The Red Sea\'s remote reefs are only accessible by liveaboard and offer the best shark diving.',
        designRationale: 'We captured the thrill of encountering oceanic whitetips at these legendary sites.'
      }
    },
    { 
      id: 'ex-6', 
      slug: 'arctic-circle',
      name: 'Arctic Circle', 
      region: 'Expeditions', 
      country: 'Norway',
      shopifyVariantId: 'PLACEHOLDER_EX6',
      image: '/stickers/arctic-circle.png',
      story: {
        headline: 'Orca Encounters',
        content: 'Norway\'s Arctic waters offer the chance to snorkel with wild orcas hunting herring.',
        designRationale: 'Our design features the incredible orca encounters in the Norwegian fjords.'
      }
    },
    { 
      id: 'ex-7', 
      slug: 'galapagos-liveaboard',
      name: 'Galápagos Liveaboard', 
      region: 'Expeditions', 
      country: 'Ecuador',
      shopifyVariantId: 'PLACEHOLDER_EX7',
      image: '/stickers/galapagos-liveaboard.png',
      story: {
        headline: 'Darwin & Wolf',
        content: 'The remote northern islands of Darwin and Wolf offer the best hammerhead diving on Earth.',
        designRationale: 'We showcased the massive hammerhead schools that make this a bucket-list expedition.'
      }
    },
    { 
      id: 'ex-8', 
      slug: 'papua-new-guinea',
      name: 'Papua New Guinea', 
      region: 'Expeditions', 
      country: 'Papua New Guinea',
      shopifyVariantId: 'PLACEHOLDER_EX8',
      image: '/stickers/papua-new-guinea.png',
      story: {
        headline: 'The Land of the Unexpected',
        content: 'PNG offers pristine reefs, incredible WWII wrecks, and unique marine life.',
        designRationale: 'Our sticker captures the untouched beauty of this remote diving paradise.'
      }
    },
  ],
};

// ===========================================
// BUNDLE DATA
// ===========================================
export const BUNDLES = [
  { 
    id: 'bundle-1', 
    name: 'The Wreck Pack', 
    description: '5 legendary wreck dives', 
    stickerIds: ['uk-2', 'us-3', 'ex-2', 'ex-3', 'ex-4'],
    shopifyVariantId: 'PLACEHOLDER_BUNDLE1'
  },
  { 
    id: 'bundle-2', 
    name: 'Tropical Starter', 
    description: '5 warm water favorites', 
    stickerIds: ['cb-1', 'cb-2', 'ip-1', 'io-1', 'la-1'],
    shopifyVariantId: 'PLACEHOLDER_BUNDLE2'
  },
  { 
    id: 'bundle-3', 
    name: 'UK Explorer', 
    description: '5 British Isles classics', 
    stickerIds: ['uk-1', 'uk-3', 'uk-4', 'uk-5', 'uk-6'],
    shopifyVariantId: 'PLACEHOLDER_BUNDLE3'
  },
];

// ===========================================
// CONFIGURATION
// ===========================================
export const REGIONS = Object.keys(STICKERS);
export const MIN_ORDER = 5;
export const BASE_PRICE = 2.50;

// Tiered pricing
export const getPricePerItem = (totalItems) => {
  if (totalItems >= 21) return 1.50;
  if (totalItems >= 11) return 1.75;
  return 2.50;
};

export const getPricingTier = (totalItems) => {
  if (totalItems >= 21) return { tier: 'Best Value', color: '#4ade80', next: null };
  if (totalItems >= 11) return { tier: 'Great Deal', color: '#D99E30', next: 21 - totalItems };
  return { tier: 'Standard', color: '#94a3b8', next: 11 - totalItems };
};

// Flatten all stickers into single array
export const getAllStickers = () => Object.values(STICKERS).flat();

// Get sticker by slug
export const getStickerBySlug = (slug) => getAllStickers().find(s => s.slug === slug);

// Get related stickers (same region, excluding current)
export const getRelatedStickers = (sticker) => {
  if (!sticker) return [];
  return STICKERS[sticker.region]?.filter(s => s.id !== sticker.id) || [];
};
