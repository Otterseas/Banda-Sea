// ===========================================
// DIVE SITE GUIDES — practical destination info per sticker
// ===========================================
// The sticker `story` sells the sticker. This sells the *destination* — it
// targets what divers actually search for ("best time to dive Komodo",
// "is Sipadan hard", "what will I see in Raja Ampat") and feeds the FAQPage
// structured data on each sticker page.
//
// Keyed by sticker slug. Destinations with more than one sticker design
// (e.g. raja-ampat-01 / -02) share a single guide — same place, same advice.
//
// Batch 1: South East Asia (15 destinations).
// Guides are additive — a slug with no entry here simply renders the page
// exactly as it did before.

const RAJA_AMPAT = {
  intro:
    "Raja Ampat sits at the heart of the Coral Triangle, off the north-west tip of West Papua, and it is the most biodiverse marine region ever surveyed. A single dive at Cape Kri holds the record for the most fish species counted on one dive. What makes it special isn't one signature animal but the sheer density of everything at once — walls of fusiliers, resident wobbegong sharks draped over the coral, reef mantas queueing at cleaning stations, and pygmy seahorses on the sea fans. The trade-off is remoteness: getting there means a flight to Sorong and then a boat, and the currents that feed all this life demand respect. Most divers visit either by liveaboard, which reaches the far-flung sites around Misool and Wayag, or from a resort in the Dampier Strait.",
  quickFacts: {
    bestTime: 'October to April (calmest seas, most liveaboards running)',
    difficulty: 'Intermediate to advanced — currents are the main challenge',
    waterTemp: '27–30°C, a 3mm suit is plenty',
    visibility: '10–30m — plankton-rich water is what feeds the fish',
  },
  topSites: [
    { name: 'Cape Kri', note: 'Record-holder for most fish species on a single dive' },
    { name: 'Blue Magic', note: 'Seamount with reef and oceanic manta cleaning stations' },
    { name: 'Sardine Reef', note: 'Dense schooling action in the Dampier Strait' },
    { name: 'Boo Windows (Misool)', note: 'Two swim-through "eyes" in a coral ridge' },
    { name: 'Magic Mountain (Misool)', note: 'Manta cleaning station on an exposed seamount' },
  ],
  marineLife: [
    'Reef and oceanic manta rays',
    'Tasselled wobbegong sharks',
    'Walking (epaulette) sharks',
    'Pygmy seahorses',
    'Schooling fusiliers, jacks and barracuda',
  ],
  faqs: [
    {
      question: 'When is the best time to dive Raja Ampat?',
      answer:
        'October to April is the main season, with the calmest seas and the most liveaboards operating — many divers rate December to March as the sweet spot. June to September brings stronger winds, particularly in the south around Misool, and some liveaboards reposition elsewhere, though resorts in the Dampier Strait dive year-round. Manta activity is generally strongest between December and March. Water sits at 27–30°C whenever you go, so seasonality is about sea conditions and access rather than temperature.',
    },
    {
      question: 'Do I need to be an experienced diver for Raja Ampat?',
      answer:
        'You should be comfortable in current. Many of the best sites are seamounts and channels where the water moves, and reef hooks are standard kit on sites like Blue Magic and Cape Kri. Most operators ask for Advanced Open Water and around 50 logged dives, particularly on liveaboards. That said, the Dampier Strait has plenty of gentle reef and jetty diving, so a newer diver basing themselves at a resort can have a superb trip — just be honest with your guide about your experience so they pick the right sites and tides.',
    },
    {
      question: 'What will I see diving in Raja Ampat?',
      answer:
        'More species than anywhere else on the planet. The headline animals are reef and oceanic manta rays at cleaning stations, tasselled wobbegong sharks resting under table corals, and the walking shark that "strolls" across the reef on its fins at night. On the macro end there are pygmy seahorses on sea fans, nudibranchs and shrimps in abundance. But the thing most divers remember is the volume — schooling fusiliers, batfish, sweetlips and jacks in numbers that make the reef hard to see behind them.',
    },
  ],
};

const KOMODO = {
  intro:
    "Komodo National Park sits between Sumbawa and Flores, where the Pacific and Indian Oceans squeeze past each other. That funnel is what makes the diving extraordinary and demanding in equal measure: nutrient-rich upwelling feeds enormous schools, manta rays and thriving coral, but it also generates some of the strongest currents in Indonesia. The park splits neatly in two. The north is warm, clear and dominated by big fish action at sites like Castle Rock and Crystal Rock. The south is a different world — cold upwelling can drop the water to around 20°C, and the payoff is extraordinary macro life and the manta aggregations at Manta Alley. Most divers arrive via Labuan Bajo on Flores, either by day boat or on a liveaboard covering both halves of the park.",
  quickFacts: {
    bestTime: 'April to November for the whole park; the north dives well year-round',
    difficulty: 'Intermediate to advanced — strong currents, including downcurrents',
    waterTemp: '27–29°C in the north, but 20–24°C in the south — bring a 5mm',
    visibility: '15–30m, varies with tide and plankton',
  },
  topSites: [
    { name: 'Batu Bolong', note: 'A pinnacle carpeted in fish — dive the sheltered side' },
    { name: 'Castle Rock', note: 'Seamount with trevally and grey reef shark action' },
    { name: 'Crystal Rock', note: 'Clear water, hard coral, schooling fish' },
    { name: 'The Cauldron ("Shotgun")', note: 'A drift through a channel that fires you out over a plateau' },
    { name: 'Manta Alley (south)', note: 'Reliable manta cleaning station in cooler water' },
  ],
  marineLife: [
    'Reef manta rays',
    'Grey reef and whitetip reef sharks',
    'Green and hawksbill turtles',
    'Huge schools of trevally and surgeonfish',
    'Frogfish, nudibranchs and rare macro in the south',
  ],
  faqs: [
    {
      question: 'When is the best time to dive Komodo?',
      answer:
        'April to November is the classic season, covering the dry months when seas are calmest and the southern sites are reliably accessible. The northern park dives well all year, so Komodo is close to a year-round destination if you are flexible. January and February bring the heaviest rain and rougher crossings. Manta rays are present year-round but tend to be most active in the cooler, planktonic water between December and February — which is also when the south is at its coldest.',
    },
    {
      question: 'How cold is the water in Komodo?',
      answer:
        'Colder than most people expect for Indonesia, and it depends entirely on where in the park you are. The north sits at a comfortable 27–29°C. The south is fed by upwelling from the Indian Ocean and regularly drops to 20–24°C, occasionally lower on sites like Cannibal Rock. If your trip includes the southern park — and it should, because the macro life there is exceptional — take a 5mm wetsuit with a hood, or plan on a hooded vest. Divers who pack only a 3mm often cut southern dives short.',
    },
    {
      question: 'Is Komodo suitable for beginners?',
      answer:
        'Parts of it, with the right guide. Komodo is genuinely current-driven and includes downcurrents at exposed sites like Batu Bolong and Castle Rock, so operators typically ask for Advanced Open Water and around 30–50 dives for the signature sites. Newer divers can still have a great trip from Labuan Bajo by sticking to sheltered sites and slack tides. The critical thing is dive timing: a site that is benign at slack water can be serious an hour later, which is why local guides who read the tides matter so much here.',
    },
  ],
};

const SIPADAN = {
  intro:
    "Sipadan is a limestone pinnacle rising 600 metres from the floor of the Celebes Sea off Sabah, Malaysian Borneo — and it is famous for two things: turtles and barracuda. The turtle density is genuinely hard to believe until you see it, with green and hawksbill turtles resting on almost every ledge. At Barracuda Point, a tornado of chevron barracuda hangs in the current alongside walls of bigeye trevally. Access is strictly controlled: nobody has stayed on the island since 2005, and a limited number of daily permits are shared between the operators based on nearby Mabul, Kapalai and Semporna. Your resort books your permit in advance, which usually means committing to a package of several nights, with non-permit days spent on Mabul's excellent muck diving.",
  quickFacts: {
    bestTime: 'April to December, with visibility usually best April to August',
    difficulty: 'Intermediate — Barracuda Point runs a real current',
    waterTemp: '28–30°C year-round',
    visibility: '15–30m',
  },
  topSites: [
    { name: 'Barracuda Point', note: 'The barracuda tornado and trevally schools' },
    { name: 'Drop Off', note: 'Wall that plunges straight down from the jetty' },
    { name: 'South Point', note: 'Bigger current, best chance of pelagics' },
    { name: 'Turtle Cavern', note: 'Overhead environment — training required to enter' },
    { name: 'Mabul house reefs', note: 'Muck diving on your non-permit days' },
  ],
  marineLife: [
    'Green and hawksbill turtles in exceptional numbers',
    'Chevron barracuda tornadoes',
    'Bigeye trevally schools',
    'Grey reef and whitetip reef sharks',
    'Bumphead parrotfish at dawn',
  ],
  faqs: [
    {
      question: 'Do I need a permit to dive Sipadan?',
      answer:
        'Yes. Sipadan is a protected marine park with a strict daily quota of diver permits shared between licensed operators, and there is no way to buy one on arrival. Your resort on Mabul, Kapalai or in Semporna applies for permits on your behalf, which is why almost everyone books a multi-night package — you are typically allocated one or two Sipadan days within a longer stay. Book well ahead for peak months, and treat any operator promising guaranteed daily Sipadan access with scepticism.',
    },
    {
      question: 'When is the best time to dive Sipadan?',
      answer:
        'April to December is the main season, and visibility is generally at its best from April to August. Water temperature barely moves, sitting at 28–30°C all year, so the decision is about seas and rainfall rather than warmth. The monsoon months around January to March bring rougher crossings and more plankton in the water, which can knock visibility down. Turtles and barracuda are resident year-round, so there is no genuinely bad time to go — just some months with more comfortable boat rides.',
    },
    {
      question: 'What is the diving at Sipadan actually like?',
      answer:
        'Big, blue and busy. The island is the top of an underwater mountain, so most dives are walls dropping into open water with the reef crest shallow enough to finish your safety stop over coral. The signature dive is Barracuda Point, where you drift along the wall until the current picks up and the barracuda tornado appears. Turtles are constant background scenery. Because the drop-offs go far beyond recreational limits and the current can accelerate, buoyancy control and staying with your guide matter more here than on a typical reef.',
    },
  ],
};

const NUSA_PENIDA = {
  intro:
    "Nusa Penida sits across the strait from Bali and offers two completely different headline encounters. Reef manta rays patrol the cleaning stations at Manta Point year-round, close enough to shore that it works as a day trip from Sanur. Then, between roughly July and October, the mola mola arrives — the oceanic sunfish, a vast disc of a fish that rises from deep water to be cleaned at sites like Crystal Bay. That encounter comes at a price: the same cold upwelling that brings them can drop the water to 18°C or below, and Crystal Bay is notorious for sudden downcurrents. Nusa Penida is genuinely superb diving, but it has a reputation among Bali guides as a place where conditions change fast and divers get into trouble by underestimating it.",
  quickFacts: {
    bestTime: 'Mola mola July to October (peak August–September); mantas year-round',
    difficulty: 'Advanced for Crystal Bay in mola season; intermediate at Manta Point',
    waterTemp: '24–28°C typically, but 18°C or colder at Crystal Bay in mola season',
    visibility: '15–30m, occasionally much less in cold upwelling',
  },
  topSites: [
    { name: 'Crystal Bay', note: 'The mola mola site — cold, and prone to downcurrents' },
    { name: 'Manta Point', note: 'Reef manta cleaning station, surgy but shallow' },
    { name: 'Toyapakeh', note: 'Colourful drift over healthy hard coral' },
    { name: 'SD (Sental to Ped)', note: 'Easy drift, great for a first Penida dive' },
    { name: 'Blue Corner', note: 'Advanced only — serious, unpredictable current' },
  ],
  marineLife: [
    'Mola mola (oceanic sunfish), seasonally',
    'Reef manta rays, year-round',
    'Green and hawksbill turtles',
    'Bumphead parrotfish',
    'Healthy hard coral gardens',
  ],
  faqs: [
    {
      question: 'When can I see mola mola at Nusa Penida?',
      answer:
        'The season runs roughly from July to October, with August and September the most reliable months. Mola mola come up from deep water to be cleaned by reef fish, so sightings are tied to cold upwelling — which means the best chances come with the coldest water. Nothing is guaranteed: some divers see several in a day and others go a week without one. If mola are your priority, plan several days rather than a single trip, and be prepared for water around 18°C or below at Crystal Bay.',
    },
    {
      question: 'How cold does it get at Crystal Bay?',
      answer:
        'Much colder than the rest of Bali. During mola season the thermocline at Crystal Bay regularly drops the water to 18°C, and divers report colder still on some days. Bali dive shops often issue 5mm suits with hoods for Penida trips in season, and many experienced guides wear more. If you dive in a 3mm you will be uncomfortable enough to cut the dive short, which is a waste when you are waiting on a sunfish. Outside mola season the water is far more typical of Bali at 26–28°C.',
    },
    {
      question: 'Is Nusa Penida safe for less experienced divers?',
      answer:
        'It depends entirely on the site. Manta Point and the easier drifts like SD and Toyapakeh are manageable for divers with basic experience when conditions are calm, and they are dived by day-trippers from Bali constantly. Crystal Bay and Blue Corner are a different matter — both are known for strong and sometimes downward currents, and Blue Corner in particular is regarded as an advanced site only. Choose an operator that assesses your experience honestly rather than one that puts everyone on the same boat to the same site.',
    },
  ],
};

const KOH_TAO = {
  intro:
    "Koh Tao in the Gulf of Thailand certifies more divers than almost anywhere else on earth, and that reputation as a training island sometimes obscures how pleasant the diving actually is. The water is warm enough year-round that a shorty is often plenty, the sites are shallow granite pinnacles and coral gardens, and the island is compact, cheap and set up entirely around diving. Chumphon Pinnacle is the standout — a granite seamount that attracts big schools and, with luck, a whale shark. The trade-off is variability: visibility swings from a murky 5 metres to a beautiful 30 depending on plankton and weather, and popular sites can be busy with training groups. As a place to learn to dive or to log easy, warm, sociable dives, it is hard to beat.",
  quickFacts: {
    bestTime: 'March to September; October to December is the monsoon',
    difficulty: 'Beginner friendly — one of the world\'s main training destinations',
    waterTemp: '28–30°C year-round',
    visibility: '5–30m, highly variable',
  },
  topSites: [
    { name: 'Chumphon Pinnacle', note: 'The signature site — big schools, occasional whale sharks' },
    { name: 'Southwest Pinnacle', note: 'Granite pinnacles with barracuda and grouper' },
    { name: 'Sail Rock', note: 'A day trip, with a famous vertical chimney swim-through' },
    { name: 'HTMS Sattakut', note: 'Purpose-sunk wreck at around 30m' },
    { name: 'Japanese Gardens', note: 'Shallow, calm coral — ideal for first dives' },
  ],
  marineLife: [
    'Whale sharks (seasonal and lucky)',
    'Chevron barracuda schools',
    'Whitetip reef sharks',
    'Giant grouper and batfish',
    'Blue-spotted rays and pufferfish',
  ],
  faqs: [
    {
      question: 'Is Koh Tao a good place to learn to dive?',
      answer:
        'It is one of the best in the world for it, and the reason is a combination of warm shallow water, sheltered bays, low prices and enormous competition between schools. The island runs a huge volume of Open Water courses, which means instructors are experienced and equipment is well used but well maintained at reputable shops. The flip side of that volume is that standards vary, so choose a school on its reputation and class sizes rather than price alone, and ask how many students share one instructor in the water.',
    },
    {
      question: 'When can I see whale sharks at Koh Tao?',
      answer:
        'Whale sharks pass through the Gulf of Thailand unpredictably, with the most commonly cited windows being March to May and September to October. Chumphon Pinnacle and Sail Rock are the sites where they turn up most often. Be realistic: these are genuinely chance encounters rather than a reliable seasonal aggregation, and plenty of divers spend a week on Koh Tao without seeing one. Treat a sighting as a bonus on top of pleasant, easy diving rather than the reason to book the trip.',
    },
    {
      question: 'What is the best time of year to dive Koh Tao?',
      answer:
        'March to September offers the most settled conditions, and many divers rate April to July as the pick for warm, calm water. The monsoon runs roughly from late October through December, bringing rain, wind and reduced visibility, and some boats cancel trips to the exposed pinnacles. Water temperature stays at 28–30°C all year, so cold is never a factor. January and February are a decent shoulder season — quieter on the sites, with conditions improving as the monsoon fades.',
    },
  ],
};

const SIMILAN_ISLANDS = {
  intro:
    "The Similan Islands sit in the Andaman Sea off Khao Lak, and they look nothing like the coral-dominated diving further east. The signature landscape is granite: enormous rounded boulders stacked into arches, canyons and swim-throughs, with soft coral and fans filling the gaps. The park operates a hard season — it is closed by Thai authorities outside roughly 15 October to 15 May — which concentrates diving into the calm, clear half of the year. Most people dive it by liveaboard out of Khao Lak or Phuket, usually on a trip that also takes in Koh Bon, Koh Tachai and Richelieu Rock further north, where the manta and whale shark odds improve considerably. It is comfortable, scenic diving with excellent visibility and enough current at the northern sites to keep it interesting.",
  quickFacts: {
    bestTime: 'Mid-October to mid-May only — the park closes outside this window',
    difficulty: 'Beginner to intermediate; more current at Koh Bon and Koh Tachai',
    waterTemp: '27–30°C',
    visibility: '20–30m, often excellent',
  },
  topSites: [
    { name: 'Elephant Head Rock', note: 'Granite boulder maze of swim-throughs and canyons' },
    { name: 'Christmas Point', note: 'Boulder arches with soft coral' },
    { name: 'Koh Bon', note: 'Manta ray cleaning station on a limestone ridge' },
    { name: 'Koh Tachai Pinnacle', note: 'Exposed seamount, strong current, big fish' },
    { name: 'West of Eden', note: 'Sloping reef with sea fans and healthy coral' },
  ],
  marineLife: [
    'Reef manta rays, particularly at Koh Bon',
    'Whale sharks (seasonal, best odds in the north)',
    'Leopard (zebra) sharks resting on sand',
    'Schooling snapper and fusiliers',
    'Ghost pipefish and seahorses on the fans',
  ],
  faqs: [
    {
      question: 'When are the Similan Islands open for diving?',
      answer:
        'The Similan Islands National Park is closed each year during the south-west monsoon and typically opens from around 15 October to 15 May. Those dates are set by the Thai park authorities and can shift slightly year to year, so confirm before booking flights. Within the season, February to April usually delivers the calmest seas and the best visibility, and it is also the window when whale shark sightings at Koh Bon and Koh Tachai are most frequently reported. Outside the season there is no legal diving in the park at all.',
    },
    {
      question: 'Do I need a liveaboard to dive the Similans?',
      answer:
        'Not strictly, but it is by far the better option. Day trips run from Khao Lak and Phuket, and they work, but the islands are a long boat ride offshore and a day trip typically gives you two dives after several hours in transit. A liveaboard of three or four nights gets you four dives a day, reaches the northern sites at Koh Bon, Koh Tachai and Richelieu Rock where the mantas and whale sharks are, and lets you dive the popular sites early before the day boats arrive.',
    },
    {
      question: 'What makes Similan diving different from other Thai sites?',
      answer:
        'The terrain. Where most tropical diving is coral over sand or wall, the Similans are built from enormous granite boulders, creating arches, chimneys and canyons big enough to swim through comfortably. It gives dives a structure and sense of scale that reef diving rarely has, and it photographs beautifully in the strong Andaman visibility. Combine that with soft coral colour on the northern sites and a genuine chance of mantas at Koh Bon, and you get variety that is hard to match on a single short trip.',
    },
  ],
};

const RICHELIEU_ROCK = {
  intro:
    "Richelieu Rock is a horseshoe-shaped limestone pinnacle in the Andaman Sea near the Surin Islands, and it is widely regarded as Thailand's best single dive site. At high tide it barely breaks the surface, which means the entire structure is diveable, from a shallow crown at 5 metres down past 30. What sets it apart is colour: the rock is smothered in purple and magenta soft coral to a degree that makes it look artificial in photographs. It also has a reputation as Thailand's most reliable whale shark site, with the best odds in the late season around February to April. Add exceptional macro — tigertail seahorses, harlequin shrimp, ghost pipefish — and it rewards divers who slow down as much as those hoping for something enormous to emerge from the blue.",
  quickFacts: {
    bestTime: 'October to May, with whale shark odds best February to April',
    difficulty: 'Intermediate — exposed site with current',
    waterTemp: '27–30°C',
    visibility: '10–30m',
  },
  topSites: [
    { name: 'The shallow crown', note: 'Soft coral colour at 5–12m, ideal for the end of a dive' },
    { name: 'The horseshoe bay', note: 'Sheltered pocket where macro life concentrates' },
    { name: 'The outer wall', note: 'Drops past 30m — where pelagics cruise past' },
  ],
  marineLife: [
    'Whale sharks, seasonally',
    'Tigertail seahorses',
    'Harlequin shrimp and ghost pipefish',
    'Frogfish',
    'Schooling barracuda and trevally',
  ],
  faqs: [
    {
      question: 'What are the chances of seeing a whale shark at Richelieu Rock?',
      answer:
        'Richelieu is the most consistently productive whale shark site in Thailand, but it is still a chance encounter rather than a guarantee. The best-reported window is February to April, towards the end of the season, when plankton concentrations rise. Divers who spend several dives on the rock across a liveaboard trip have far better odds than someone doing a single day dive. Even when the whale sharks do not show, the site is worth the trip for the soft coral and the macro life alone — which is why it tops most Thailand dive lists regardless.',
    },
    {
      question: 'How do I dive Richelieu Rock?',
      answer:
        'Almost exclusively by liveaboard. The rock sits well offshore near the Surin Islands, north of the Similans, and it is too far for a comfortable day trip from the mainland. Most Similan liveaboards out of Khao Lak or Phuket include it, usually with two or three dives on the site so you can explore different sections. Like the Similans, it falls within the seasonal park closure, so diving runs roughly October to May only.',
    },
    {
      question: 'Is Richelieu Rock difficult to dive?',
      answer:
        'It is an exposed offshore pinnacle, so current is normal and can be strong on the outer edges, and there is no shelter if conditions pick up. That said, the horseshoe shape means there is almost always a protected side, and the shallow crown at 5–12 metres makes for a relaxed end to the dive. Most operators are happy to take Open Water divers with reasonable buoyancy, but if you are newly certified you will get more from the site with a few current dives already under your belt.',
    },
  ],
};

const LEMBEH = {
  intro:
    "The Lembeh Strait in North Sulawesi is the muck diving capital of the world, and it is a place that divides divers instantly. There is very little coral, the bottom is black volcanic sand, and the visibility is often unremarkable. What there is instead is the strangest concentration of animals on earth: hairy frogfish, mimic octopus, wonderpus, blue-ringed octopus, flamboyant cuttlefish, rhinopias, bobbit worms. Dives are shallow, current is usually minimal, and you spend the whole time hovering a metre off the sand while a guide points out something the size of your thumbnail that turns out to be extraordinary. It is heaven for underwater photographers and, for divers who need reef scenery and big animals, occasionally maddening. Most people pair it with Bunaken so they get walls as well as weirdness.",
  quickFacts: {
    bestTime: 'Year-round; July to September is cooler with excellent critter activity',
    difficulty: 'Easy — shallow, little current, but demands good buoyancy',
    waterTemp: '26–29°C, dropping to around 24°C in the cooler months',
    visibility: '5–15m — this is muck diving, not wall diving',
  },
  topSites: [
    { name: 'Hairball', note: 'Classic muck site for octopus and frogfish' },
    { name: 'Nudi Falls', note: 'A rare bit of wall and coral alongside the critters' },
    { name: 'TK (Teluk Kembahu)', note: 'Reliable for mimic and wonderpus octopus' },
    { name: 'Police Pier', note: 'Structure diving with seahorses and shrimpfish' },
    { name: 'Aer Prang', note: 'Rhinopias and other rare scorpionfish' },
  ],
  marineLife: [
    'Hairy frogfish',
    'Mimic octopus, wonderpus and blue-ringed octopus',
    'Flamboyant cuttlefish',
    'Rhinopias and Ambon scorpionfish',
    'Bobbit worms and countless nudibranchs',
  ],
  faqs: [
    {
      question: 'What is muck diving and why is Lembeh famous for it?',
      answer:
        'Muck diving means diving over soft sediment — sand, silt and volcanic debris — rather than coral reef, hunting for the unusual animals that live there. Lembeh is the definitive example because its black volcanic sand and nutrient-rich water support an astonishing density of rare critters in shallow, easy conditions. Animals that are once-in-a-career sightings elsewhere, like the mimic octopus or flamboyant cuttlefish, are realistic targets on a single trip here. If your idea of a great dive is coral scenery, Lembeh will surprise you; if it is finding strange animals, nowhere is better.',
    },
    {
      question: 'Do I need to be a photographer to enjoy Lembeh?',
      answer:
        'No, but it helps to be curious. Lembeh dives are slow and detailed, spent hovering over sand while your guide finds things you would never spot alone. Divers who love that patient, hunting style adore it whether or not they carry a camera. Divers who want sweeping reefs and big fish sometimes find the visibility and lack of scenery disappointing, which is why so many trips combine Lembeh with Bunaken — an hour or two away and offering exactly the dramatic wall diving that Lembeh does not.',
    },
    {
      question: 'When is the best time to dive Lembeh?',
      answer:
        'Lembeh dives well all year, which is part of its appeal. The cooler months from around July to September bring thermoclines and water closer to 24°C, and many guides rate this period highly for rare critter activity — bring a 5mm if you feel the cold, as you will be moving very little. October to December tends to be warm and calm. Rain is heaviest around January and February but affects surface comfort more than the diving itself, since sites are sheltered and shallow.',
    },
  ],
};

const BUNAKEN = {
  intro:
    "Bunaken National Marine Park, off Manado in North Sulawesi, is built on some of the most dramatic walls in Indonesia — sheer coral cliffs that drop from a shallow reef crest into water hundreds of metres deep. Protected since 1991, the park has mature, intact coral, enormous barrel sponges and gorgonian fans, and a turtle population so relaxed that green turtles will sit on a ledge and ignore you completely. The diving itself is straightforward: you drift along a wall with the reef on one shoulder and open blue on the other, watching turtles and reef fish come and go. Because it sits about an hour from the Lembeh Strait, most divers visiting North Sulawesi split their trip between the two, getting spectacular wall scenery here and world-class muck diving there.",
  quickFacts: {
    bestTime: 'March to October; January and February are the wettest',
    difficulty: 'Easy to intermediate — gentle walls, occasional current',
    waterTemp: '27–29°C',
    visibility: '20–30m and often more',
  },
  topSites: [
    { name: 'Lekuan I, II & III', note: 'The classic Bunaken walls, turtles guaranteed' },
    { name: 'Mandolin', note: 'Schooling fish along a steep drop-off' },
    { name: "Sachiko's Point", note: 'Healthy coral and reliable current for a drift' },
    { name: 'Fukui', note: 'Gentler slope with giant clams' },
    { name: 'Siladen', note: 'Neighbouring island with pretty shallow coral' },
  ],
  marineLife: [
    'Green and hawksbill turtles in abundance',
    'Giant barrel sponges and gorgonian fans',
    'Schooling bannerfish and surgeonfish',
    'Napoleon wrasse',
    'Pygmy seahorses on the fans',
  ],
  faqs: [
    {
      question: 'When is the best time to dive Bunaken?',
      answer:
        'March to October is the strongest window, with the driest weather and the best visibility, and many divers pick the middle of that range for the calmest seas. January and February bring the heaviest rain, which can reduce visibility and make crossings less comfortable, though the park still dives. Water temperature is stable at 27–29°C throughout the year. Because Bunaken pairs so naturally with the Lembeh Strait, most people plan around a combined trip rather than around Bunaken conditions alone.',
    },
    {
      question: 'Is Bunaken good for beginners?',
      answer:
        'Yes, with one caveat. The diving is largely gentle drifting along walls with excellent visibility, no decompression demands and abundant turtles, which makes it very rewarding for newer divers. The caveat is the walls themselves: with the reef dropping into hundreds of metres of water, it is easy to sink deeper than intended without a visual reference. Good buoyancy control and a close eye on your depth are essential. Operators are used to newer divers and generally choose sheltered sites when current is running.',
    },
    {
      question: 'Should I combine Bunaken with Lembeh?',
      answer:
        'Most divers do, and it is the single best reason to visit North Sulawesi. The two sit roughly an hour or two apart by road across the peninsula from Manado, and they offer opposite experiences: Bunaken is dramatic wall diving with turtles and clear water, Lembeh is shallow black-sand muck diving for rare critters. A week split between them gives far more variety than either alone, and most resorts and operators in the region will arrange the transfer and a combined package as standard.',
    },
  ],
};

const TUBBATAHA = {
  intro:
    "Tubbataha Reefs Natural Park sits alone in the middle of the Sulu Sea, roughly ten hours by boat from Puerto Princesa, and it is the closest thing the Philippines has to genuinely untouched reef. A UNESCO World Heritage Site with no inhabitants beyond a ranger station, it is protected to a degree that shows the moment you get in the water: shark encounters on almost every dive, walls of jacks and barracuda, coral cover that looks like archive footage. Access is deliberately narrow. There is no land to stay on, so it is liveaboard-only, and the weather window is short — trips run roughly from mid-March to mid-June and not at all outside that. Berths sell out a year ahead. For divers who have seen reefs degrade over their diving lives, Tubbataha is a reminder of what the baseline used to be.",
  quickFacts: {
    bestTime: 'Mid-March to mid-June only — the sole weather window',
    difficulty: 'Intermediate to advanced — currents and open-water walls',
    waterTemp: '28–30°C',
    visibility: '30–45m, exceptional',
  },
  topSites: [
    { name: 'North Atoll wall', note: 'Sheer drop-offs with constant shark traffic' },
    { name: 'Jessie Beazley Reef', note: 'Isolated reef, best odds of big schools' },
    { name: 'Washing Machine', note: 'Fast drift where currents converge' },
    { name: 'Delsan Wreck', note: 'Shark cleaning station on the sand' },
    { name: 'Malayan Wreck', note: 'South Atoll wall with turtles and pelagics' },
  ],
  marineLife: [
    'Grey reef and whitetip reef sharks on almost every dive',
    'Whale sharks, occasionally',
    'Reef manta rays',
    'Enormous jack and barracuda schools',
    'Hawksbill and green turtles',
  ],
  faqs: [
    {
      question: 'When can you dive Tubbataha?',
      answer:
        'Only between roughly mid-March and mid-June. Outside that window the Sulu Sea is too exposed for the crossing and the park is effectively inaccessible, so unlike most destinations there is no shoulder season to consider. Within it, April and May are generally regarded as the most settled. Because the season is so short and berths are limited to a handful of liveaboards, trips commonly sell out six to twelve months ahead — if Tubbataha is on your list, book far earlier than you would for anywhere else.',
    },
    {
      question: 'Do I need a liveaboard for Tubbataha?',
      answer:
        'Yes, there is no alternative. The park lies about 150 kilometres from Puerto Princesa in Palawan with no accommodation of any kind on the reefs beyond a park ranger station, so every visit is by liveaboard, typically on a five to seven night trip including the overnight crossing each way. Park fees are charged on top of the trip cost and go towards the ranger presence that keeps the reef in the condition it is in — which, given what you get to dive, is money well spent.',
    },
    {
      question: 'How experienced do I need to be for Tubbataha?',
      answer:
        'More than for a typical reef trip. The sites are open-water walls and reef corners with real current, sometimes fast drifts, and no shallow shelter to retreat to — the Washing Machine is named for exactly what it does. Most operators ask for Advanced Open Water and around 50 logged dives, and some request more. Good buoyancy, comfort with drift entries from a small boat, and confidence deploying an SMB are all genuinely useful here rather than nice-to-have.',
    },
  ],
};

const MALAPASCUA = {
  intro:
    "Malapascua is a small island off the northern tip of Cebu, and it is famous worldwide for one animal: the pelagic thresher shark. At Monad Shoal, a sunken plateau a short boat ride away, threshers rise from deep water at first light to visit cleaning stations — making this one of the only places on earth with a genuinely reliable, near-daily thresher encounter. It comes with a 4:30am alarm, a dive in the dark to a plateau at around 25–30 metres, and a wait in the blue as the light comes up. The rest of the island's diving is a pleasant surprise: Gato Island's tunnel and whitetip sharks, healthy coral, and good macro. The island was hit hard by Typhoon Haiyan in 2013 and rebuilt, and the diving community there has been closely involved in thresher research and protection ever since.",
  quickFacts: {
    bestTime: 'Threshers year-round; calmest weather roughly November to May',
    difficulty: 'Advanced-leaning — pre-dawn dive to 25–30m',
    waterTemp: '27–29°C, with cooler thermoclines at depth on Monad',
    visibility: '10–30m',
  },
  topSites: [
    { name: 'Monad Shoal', note: 'The thresher shark cleaning station, at dawn' },
    { name: 'Gato Island', note: 'Swim-through tunnel, whitetips and sea snakes' },
    { name: 'Kimud Shoal', note: 'Occasional hammerhead sightings in season' },
    { name: 'Lighthouse', note: 'Dusk dive for mandarinfish' },
    { name: 'Kalanggaman', note: 'Sandbar island with pretty wall diving' },
  ],
  marineLife: [
    'Pelagic thresher sharks',
    'Whitetip reef sharks and bamboo sharks at Gato',
    'Manta and devil rays, occasionally on Monad',
    'Mandarinfish at dusk',
    'Seahorses, frogfish and nudibranchs',
  ],
  faqs: [
    {
      question: 'Can you see thresher sharks at Malapascua year-round?',
      answer:
        'Yes — that is what makes the island unusual. The pelagic threshers visit the cleaning stations at Monad Shoal throughout the year rather than seasonally, so sightings are reported in every month, commonly quoted at well above a two-in-three success rate on any given morning. What does vary is the weather: the calmest, driest conditions run roughly November to May, while the June to October period brings more wind and rain and a higher chance of a boat being cancelled. Give yourself several mornings rather than one.',
    },
    {
      question: 'Why is the thresher shark dive so early?',
      answer:
        'Because the sharks come up to be cleaned at first light and drop back into deep water as the day brightens. Boats typically leave Malapascua around 4:30 to 5:00am so divers are in the water and settled behind the viewing line on the plateau before dawn. You descend in the dark to around 25–30 metres, then wait quietly while the light comes up and the threshers appear out of the blue. It is a genuinely different kind of diving — still, patient and cold-ish at depth — and worth setting expectations for before you book.',
    },
    {
      question: 'What certification do I need for Monad Shoal?',
      answer:
        'Most operators require Advanced Open Water, because the plateau sits at around 25–30 metres and the dive begins before sunrise with limited natural light. Good air consumption matters too, since the encounter rewards waiting still at depth rather than swimming around. Divers without Advanced can usually complete the qualification on the island in a couple of days, and many people plan exactly that. Strict no-touch, no-flash rules apply at the cleaning stations to avoid driving the sharks off the site.',
    },
  ],
};

const MOALBOAL = {
  intro:
    "Moalboal on Cebu's west coast has one of the most accessible spectacles in diving: a sardine run that sits permanently a short swim off Panagsama Beach, in water shallow enough that snorkellers see it too. Millions of sardines move as a single organism, splitting and reforming around divers, and unlike most baitball encounters it is there essentially year-round rather than for a few weeks. Beyond the sardines, Moalboal is an easy, affordable base: Pescador Island a few minutes offshore, turtles that graze the house reef reliably enough to be almost boring, and good macro for those who look. It is shore-diving country, which keeps costs low and makes it a favourite for divers who want to log a lot of dives without a boat schedule dictating their day.",
  quickFacts: {
    bestTime: 'Year-round; driest and calmest roughly November to May',
    difficulty: 'Easy — much of it is shore diving in shallow water',
    waterTemp: '27–29°C',
    visibility: '15–30m',
  },
  topSites: [
    { name: 'Panagsama house reef', note: 'The sardine run, straight off the beach' },
    { name: 'Pescador Island', note: 'Wall diving and the "Cathedral" chimney' },
    { name: 'Turtle Point', note: 'Reliable green turtle encounters' },
    { name: 'Talisay Wall', note: 'Easy drift along healthy coral' },
    { name: 'Tongo Point', note: 'Macro life and dusk mandarinfish' },
  ],
  marineLife: [
    'The resident sardine baitball, in its millions',
    'Green and hawksbill turtles',
    'Thresher sharks, occasionally off Pescador',
    'Frogfish and nudibranchs',
    'Mandarinfish at dusk',
  ],
  faqs: [
    {
      question: 'Is the Moalboal sardine run there all year?',
      answer:
        'Effectively yes, which is what makes it remarkable. Unlike the seasonal sardine runs elsewhere in the world, the shoal at Panagsama has been a near-permanent fixture for years, sitting just off the beach in shallow water. Its exact position shifts along the reef and the density varies, but divers and snorkellers find it in essentially every month. Because it sits in five to fifteen metres of water only a short swim from shore, it is one of the few genuinely world-class encounters accessible without a boat.',
    },
    {
      question: 'Is Moalboal good for beginners?',
      answer:
        'Very. The sardine run and the house reef are shallow shore dives with minimal current, so newly certified divers can experience the headline attraction on their first days. Pescador Island involves a short boat ride and some wall diving where buoyancy matters more, and a few sites pick up current, but the overall profile is relaxed. Combined with low prices and easy access from Cebu City, it is a common choice for divers building experience after certification or continuing straight into Advanced.',
    },
    {
      question: 'How does Moalboal compare to Malapascua?',
      answer:
        'They are complementary rather than competing, and many divers do both on one Cebu trip. Moalboal is easy, shallow, shore-based diving built around the sardine run and turtles, ideal for relaxed logging and newer divers. Malapascua, at the far northern tip of the island, is about one specific pre-dawn deep dive for thresher sharks and suits more experienced divers. The overland journey between them takes most of a day, so plan several nights in each rather than trying to day-trip.',
    },
  ],
};

const APO_ISLAND = {
  intro:
    "Apo Island, off the south-east coast of Negros, is one of the most cited conservation success stories in the diving world. In the 1980s local fishermen, working with marine scientists from Silliman University, established a community-managed no-take sanctuary on part of the reef — at a time when the idea was largely untested. Decades on, fish biomass recovered so dramatically that the island became a template studied and copied across the tropics. For divers, that history translates into dense hard coral gardens, sea turtles in numbers that make sightings a certainty rather than a hope, and healthy reef fish populations. The diving is mostly straightforward, though Coconut Point on the exposed side generates serious current and is treated as an advanced site. Most people visit as a day trip from Dauin or Dumaguete.",
  quickFacts: {
    bestTime: 'November to May for the calmest seas',
    difficulty: 'Easy to intermediate; Coconut Point is advanced',
    waterTemp: '27–29°C',
    visibility: '15–30m',
  },
  topSites: [
    { name: 'Rock Point East', note: 'Hard coral garden with constant turtle traffic' },
    { name: 'Coconut Point', note: 'Advanced — powerful current and big fish' },
    { name: 'Chapel', note: 'Gentle sloping reef, good for all levels' },
    { name: 'Mamsa Point', note: 'Jack schools when the current runs' },
    { name: 'The sanctuary', note: 'The original protected zone — snorkellable' },
  ],
  marineLife: [
    'Green and hawksbill turtles, in numbers',
    'Dense hard coral gardens',
    'Schooling jacks at Mamsa Point',
    'Bumphead parrotfish',
    'Sea snakes and reef fish in high density',
  ],
  faqs: [
    {
      question: 'Why is Apo Island famous among divers?',
      answer:
        'Because it demonstrated that community-managed marine protection works. Beginning in the 1980s, local fishermen and marine scientists established a no-take sanctuary covering part of the reef, accepting short-term loss for long-term recovery. Fish populations rebounded strongly enough that the surrounding fishery improved too, and the island became one of the most studied and copied examples of community-based conservation in the tropics. Divers get the visible result: dense coral, abundant turtles and reef fish populations that feel like a different era of diving.',
    },
    {
      question: 'How do I get to Apo Island to dive?',
      answer:
        'Almost everyone visits as a day trip by banca boat from Dauin or Dumaguete on Negros, a crossing of roughly 30 to 45 minutes depending on conditions. Dive operators along the Dauin coast run trips most days in season, typically offering two or three dives. There is limited simple accommodation on the island itself for those who want an early start or a longer stay. Entry and marine sanctuary fees apply and go towards the protection scheme that made the reef what it is.',
    },
    {
      question: 'Is Apo Island suitable for all diver levels?',
      answer:
        'Mostly yes, with one clear exception. Sites like Chapel and Rock Point are gentle sloping reefs with mild current, perfect for newer divers, and the shallow sanctuary is excellent even for snorkellers. Coconut Point is different: it sits on the exposed side of the island where currents converge and can run hard, sometimes with downward pull, and it is treated as an advanced dive by every reputable operator. Conditions vary strongly with tide, so let your guide choose the site order on the day.',
    },
  ],
};

const CORON = {
  intro:
    "Coron Bay in northern Palawan holds one of the most accessible WWII wreck fleets in the world. On 24 September 1944, US carrier aircraft caught a Japanese supply fleet sheltering here, and around a dozen ships went to the bottom in a single day. Eighty years on they sit in 10 to 40 metres of sheltered, warm water — cargo holds, engine rooms and decks colonised by coral and schooling fish. Because they are shallow by wreck-diving standards, recreational divers can enjoy them without technical training, though anything beyond light penetration properly requires a wreck course. Coron's other oddity is Barracuda Lake, a landlocked crater where you swim through a sharp thermocline into water that can exceed 38°C — a strange, memorable dive found almost nowhere else.",
  quickFacts: {
    bestTime: 'November to May, outside the typhoon and monsoon months',
    difficulty: 'Intermediate; penetration requires wreck training',
    waterTemp: '28–30°C (and up to 38°C+ in Barracuda Lake)',
    visibility: '10–25m, silt-dependent inside the wrecks',
  },
  topSites: [
    { name: 'Irako', note: 'The best-preserved wreck — deeper, around 30–40m' },
    { name: 'Okikawa Maru', note: 'Large tanker with swim-throughs at moderate depth' },
    { name: 'Akitsushima', note: 'Seaplane tender with its crane still visible' },
    { name: 'Olympia Maru', note: 'Shallow, coral-covered, ideal first wreck' },
    { name: 'Barracuda Lake', note: 'Extreme thermocline in a crater lake' },
  ],
  marineLife: [
    'Schooling batfish and snapper on the wrecks',
    'Lionfish and scorpionfish in the structure',
    'Sea turtles around the shallower hulls',
    'Nudibranchs and soft coral colonising the steel',
    'Barracuda and trevally in open water',
  ],
  faqs: [
    {
      question: 'Do I need wreck certification to dive Coron?',
      answer:
        'Not to dive the wrecks, but yes for anything more than a glance inside. Most of the fleet sits between 10 and 40 metres, so the shallower wrecks like Olympia Maru can be enjoyed from the outside by any certified diver, and Advanced Open Water covers the deeper ones. Real penetration — moving through cargo holds and engine rooms away from natural light — is overhead-environment diving and needs proper wreck training, a torch and a guide who knows the route. Silt inside the hulls goes up fast and visibility can drop to nothing.',
    },
    {
      question: 'When is the best time to dive Coron?',
      answer:
        'November to May offers the most settled conditions, with the driest weather and calmest seas across Palawan. The June to October period brings the south-west monsoon and the Philippine typhoon season, meaning more cancelled boats and reduced visibility, though the bay is relatively sheltered. Water stays at 28–30°C year-round, so this is purely about surface conditions. March to May typically delivers the clearest water for photographing the wrecks.',
    },
    {
      question: 'What is Barracuda Lake and why is it so warm?',
      answer:
        'Barracuda Lake is a landlocked crater lake reached by a short climb over limestone karst, and it is one of the strangest dives in Asia. The water is layered: cool fresh water on top, then a sharply defined thermocline where the temperature jumps dramatically — commonly reported above 38°C — before cooling again deeper. The heat comes from geothermal activity beneath the lake. Visually the thermocline shimmers like heat haze underwater, and the sheer limestone walls make it feel more like flying through a canyon than diving. There is very little marine life; you go for the sensation.',
    },
  ],
};

// Slug → guide.
// Where a destination has two sticker designs (raja-ampat-01 / -02) the guide
// is attached to ONE slug only. Publishing the same 700-word guide on both
// URLs would be duplicate content competing with itself; the second design
// keeps its own sticker-led title and story instead.
export const DIVE_GUIDES = {
  'raja-ampat-01': RAJA_AMPAT,
  komodo: KOMODO,
  sipadan: SIPADAN,
  'nusa-penida': NUSA_PENIDA,
  'koh-tao': KOH_TAO,
  'similan-islands': SIMILAN_ISLANDS,
  'richelieu-rock': RICHELIEU_ROCK,
  lembeh: LEMBEH,
  bunaken: BUNAKEN,
  tubbataha: TUBBATAHA,
  malapasqua: MALAPASCUA,
  moalboal: MOALBOAL,
  'apo-island': APO_ISLAND,
  coron: CORON,
};

export const getDiveGuide = (slug) => DIVE_GUIDES[slug] || null;
