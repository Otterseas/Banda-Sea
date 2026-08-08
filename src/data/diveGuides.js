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

// ===========================================
// BATCH 2 — UK & EUROPE
// ===========================================

const CORNWALL = {
  intro:
    "Cornwall is where a lot of British divers fall in love with cold water. The south coast reefs around the Manacles are carpeted in jewel anemones in colours that look tropical until the 12°C water reminds you otherwise, and the county's wreck list runs to hundreds of ships lost on the Lizard and the Runnel Stone. The headline animal is the basking shark — the world's second largest fish, which arrives to feed on plankton blooms through late spring and summer, and is usually met on a snorkel trip rather than on scuba, since it feeds at the surface. Blue sharks draw a second season of offshore trips later in the summer. Grey seals are resident year-round. It is genuinely good diving that happens to need a drysuit and a thermos.",
  quickFacts: {
    bestTime: 'June to October, when visibility and water temperature peak',
    difficulty: 'Intermediate — cold water, tides, and boat diving',
    waterTemp: '8–17°C — drysuit, or a 7mm semi-dry in late summer',
    visibility: '5–15m, best on a settled neap tide',
  },
  topSites: [
    { name: 'The Manacles', note: 'Reef pinnacles smothered in jewel anemones, plus wrecks' },
    { name: 'Porthkerris', note: 'Excellent shore dive straight off the beach' },
    { name: 'Silver Steps, Falmouth', note: 'Easy shore entry, good for skills and night dives' },
    { name: 'Runnel Stone', note: 'Exposed pinnacle with big shoals — slack water only' },
    { name: 'Offshore shark trips', note: 'Basking sharks early summer, blue sharks later' },
  ],
  marineLife: [
    'Basking sharks (surface, seasonal)',
    'Blue sharks on offshore trips',
    'Grey seals',
    'Jewel anemones and dead man’s fingers',
    'Cuckoo wrasse, conger eels and spider crabs',
  ],
  faqs: [
    {
      question: 'When can you see basking sharks in Cornwall?',
      answer:
        'Basking sharks typically appear off the Cornish coast from around May into August, following plankton blooms, with sightings concentrated in warm settled spells. They feed at the surface with their mouths open, so encounters are almost always by snorkel from a boat rather than on scuba — bubbles tend to push them away. UK law protects them from disturbance, so reputable operators keep their distance, drop snorkellers ahead of the animal rather than chasing it, and will call off an encounter if the shark shows signs of being bothered.',
    },
    {
      question: 'How cold is diving in Cornwall and what should I wear?',
      answer:
        'Water ranges from roughly 8°C in early spring to 16–17°C at the end of summer, which is the warmest UK sea you will find. Most local divers wear a drysuit year-round. In August and September a good 7mm semi-dry with hood and gloves is workable for shorter dives, but if you are doing several dives a day or any decompression stops you will be far more comfortable dry. Hoods and gloves are not optional at any time of year.',
    },
    {
      question: 'What is the best time of year to dive Cornwall?',
      answer:
        'June to October is the window most divers target. Visibility improves once the spring plankton bloom settles, water temperature peaks in late August and September, and the summer weather gives more days when exposed sites like the Runnel Stone are actually diveable. Time your trip around neap tides where you can — slack water is longer and visibility is generally better than on big spring tides. Winter diving happens, but is mostly sheltered shore sites for the committed.',
    },
  ],
};

const PLYMOUTH = {
  intro:
    "Plymouth is the practical heart of UK diving — a working city with a huge natural harbour, a dive shop on most corners, and more wrecks within an hour's boat ride than most divers get through in years. Plymouth Sound became the UK's first National Marine Park in 2019. The two signature dives are the James Eagan Layne, an American Liberty ship torpedoed in 1945 and now sitting broken and swimmable in Whitsand Bay, and HMS Scylla, a Royal Navy frigate deliberately scuttled in 2004 to create an artificial reef and now thoroughly colonised. Add straightforward shore dives at Bovisand for training and skills, and it becomes obvious why so many British divers learn here.",
  quickFacts: {
    bestTime: 'May to October',
    difficulty: 'Beginner to intermediate — sheltered shore sites plus boat wrecks',
    waterTemp: '8–17°C — drysuit for most of the year',
    visibility: '3–12m, very dependent on wind and tide',
  },
  topSites: [
    { name: 'James Eagan Layne', note: 'WWII Liberty ship, broken open and easy to swim' },
    { name: 'HMS Scylla', note: 'Frigate scuttled in 2004 as an artificial reef' },
    { name: 'Bovisand', note: 'Sheltered shore dive, the classic training site' },
    { name: 'Glen Strathallan', note: 'Shallow wreck inside the breakwater' },
    { name: 'Hand Deeps', note: 'Offshore pinnacle for experienced divers' },
  ],
  marineLife: [
    'Conger eels and ballan wrasse in the wrecks',
    'Cuttlefish in spring',
    'Pollack and bib shoals',
    'Dead man’s fingers and plumose anemones',
    'Spider crabs and lobster',
  ],
  faqs: [
    {
      question: 'What are the best wreck dives in Plymouth?',
      answer:
        'The James Eagan Layne is the classic — a US Liberty ship torpedoed in 1945 and beached in Whitsand Bay, now lying at around 22 to 25 metres. Decades of collapse have opened her up, so she is unusually easy and well-lit to swim through compared with an intact hull. HMS Scylla, a Leander-class frigate scuttled nearby in 2004 as an artificial reef, is the other must-dive and is now completely covered in growth. Both sit at recreational depths and are run regularly by hard boats out of Plymouth.',
    },
    {
      question: 'Is Plymouth good for new divers?',
      answer:
        'It is one of the best places in the UK to build experience. Sheltered shore sites like Bovisand give you easy entries, shallow depths and enough to look at for skills practice and night dives, and the city has a dense concentration of clubs, schools and hard boats competing for business. The main wrecks sit within Advanced Open Water depths. The genuine challenge is not depth but conditions: cold water, a drysuit and reduced visibility all demand more task loading than a warm-water holiday dive.',
    },
    {
      question: 'How is visibility in Plymouth Sound?',
      answer:
        'Honestly, variable — anywhere from three metres after a blow to a very respectable twelve on a good day. Wind direction and tide state matter more than season: a settled spell with an offshore breeze on a neap tide transforms the place. The spring plankton bloom knocks visibility down through April and May before things clear again. Offshore sites like Hand Deeps generally offer better water than sites inside the Sound, which take runoff from the rivers after heavy rain.',
    },
  ],
};

const SCAPA_FLOW = {
  intro:
    "Scapa Flow in Orkney is a pilgrimage. On 21 June 1919, believing the armistice talks had collapsed, Rear Admiral von Reuter ordered the interned German High Seas Fleet scuttled where it lay — 74 warships opened their seacocks in a single afternoon. Most were salvaged in the decades that followed, but seven major vessels remain: three König-class battleships and four light cruisers, lying in 12 to 45 metres of cold, dark Orkney water. Diving them is like moving along the flank of a building — the battleships are so large that a single dive shows you a fraction of one. Add the shallow blockships in Burra Sound for a drift among sunlit wreckage, and it is arguably the finest wreck diving in Europe.",
  quickFacts: {
    bestTime: 'May to September',
    difficulty: 'Advanced — depth, cold and low light; nitrox is standard',
    waterTemp: '6–14°C — drysuit essential',
    visibility: '5–15m, and darker the deeper you go',
  },
  topSites: [
    { name: 'SMS Karlsruhe', note: 'The shallowest cruiser — the usual first wreck' },
    { name: 'SMS Dresden & SMS Cöln', note: 'Light cruisers lying on their sides' },
    { name: 'SMS Markgraf', note: 'Battleship at 45m — the deepest and most atmospheric' },
    { name: 'SMS Kronprinz Wilhelm', note: 'Battleship with huge exposed armour belt' },
    { name: 'Burra Sound blockships', note: 'Shallow, bright drift dives over broken wreckage' },
  ],
  marineLife: [
    'Plumose anemones carpeting the hulls',
    'Dead man’s fingers',
    'Ballan wrasse and pollack',
    'Nudibranchs on the wreckage',
    'Seals around the shallower sites',
  ],
  faqs: [
    {
      question: 'What experience do I need to dive Scapa Flow?',
      answer:
        'More than a typical UK reef trip. The cruisers sit around 25 to 35 metres and the battleships closer to 45, in cold water with limited natural light, so operators generally expect a solid drysuit diver with Advanced Open Water as a minimum and often ask for deep and nitrox qualifications. Nitrox is effectively standard here because it buys meaningful bottom time at those depths. Many divers do the battleships as staged decompression dives. If you are newly qualified, the blockships in Burra Sound are shallow and spectacular in their own right.',
    },
    {
      question: 'Which wrecks are left in Scapa Flow?',
      answer:
        'Seven major German warships from the 1919 scuttling remain: the battleships SMS König, SMS Kronprinz Wilhelm and SMS Markgraf, and the light cruisers SMS Karlsruhe, SMS Dresden, SMS Brummer and SMS Cöln. Most of the other 45 or so ships that sank were commercially salvaged between the wars. Alongside them lie the blockships deliberately sunk to seal the eastern approaches. HMS Royal Oak, torpedoed in 1939 with the loss of 835 lives, is a designated war grave and diving on her is prohibited.',
    },
    {
      question: 'When is the best time to dive Scapa Flow?',
      answer:
        'May to September, and within that many divers favour May and June for the longest daylight — at that latitude the summer evenings barely get dark, which matters when you are diving wrecks that swallow light. Water hovers between 6 and 14°C across the season. Orkney weather is the real variable: trips are usually liveaboard or shore-based out of Stromness, and a windy week can restrict which side of the Flow is diveable. Book well ahead, as the good boats fill a year out.',
    },
  ],
};

const FARNE_ISLANDS = {
  intro:
    "The Farne Islands off the Northumberland coast are the best seal dive in Britain, and possibly the most purely fun diving the UK offers. Several thousand grey seals live on the islands, and the juveniles are relentlessly curious — they will hang upside down in front of your mask, tug at fins, and follow divers around the kelp gullies for an entire dive. This is not a distant wildlife encounter; it is closer to being investigated by a labrador. The underwater terrain is good too, with kelp forests, gullies and a scattering of wrecks, and the islands are a National Trust reserve with enormous seabird colonies above water. Boats run from Seahouses, and dives are typically shallow enough that bottom time is limited by cold rather than by depth.",
  quickFacts: {
    bestTime: 'June to October',
    difficulty: 'Easy to intermediate — shallow, but cold with some tidal movement',
    waterTemp: '8–15°C — drysuit strongly recommended',
    visibility: '5–15m',
  },
  topSites: [
    { name: 'Knivestone', note: 'Exposed reef with the liveliest seal encounters' },
    { name: 'Longstone End', note: 'Kelp gullies and reliable seal traffic' },
    { name: 'Crumstone', note: 'Boulder terrain, good for wide-angle photography' },
    { name: 'Somali wreck', note: 'WWII steamer bombed in 1941, for a change of pace' },
    { name: 'Big Harcar', note: 'Shallow gullies, ideal in bright conditions' },
  ],
  marineLife: [
    'Grey seals, in numbers and very curious',
    'Kelp forest and dense soft coral',
    'Ballan wrasse and pollack',
    'Nudibranchs and edible crabs',
    'Lumpsuckers in spring',
  ],
  faqs: [
    {
      question: 'When is the best time to dive with seals at the Farne Islands?',
      answer:
        'June to October gives the best combination of settled seas, workable visibility and warm-ish water. Seals are resident year-round, so encounters are not really seasonal, but the juveniles that do most of the interacting are boldest later in the summer. Pupping season runs from around October into December, when boats keep further from the haul-out beaches to avoid disturbance. Diving in the depths of winter is possible but the North Sea is genuinely cold and the weather window narrow.',
    },
    {
      question: 'Is it safe to dive with grey seals?',
      answer:
        'Broadly yes, and encounters are among the highlights of UK diving, but treat them as large wild predators rather than pets. Juveniles mouth and tug at fins, which is play rather than aggression, though a nip through a drysuit fin is not unheard of. The guidance is simple: let them approach you, stay still and horizontal, do not chase or grab, and keep your hands close to your body. Adult bulls are much larger and less playful — give them space, particularly around the breeding season.',
    },
    {
      question: 'How deep is the diving at the Farnes?',
      answer:
        'Shallow, which is part of what makes it so relaxed. Most sites sit between 10 and 25 metres, and the best seal action tends to happen in the top 10 metres among the kelp where the light is good. That means long, easy no-decompression dives — the limiting factor is almost always cold rather than air or depth. It also makes the Farnes very approachable for divers with modest experience, provided they are comfortable diving dry in a bit of surface chop.',
    },
  ],
};

const ST_ABBS = {
  intro:
    "St Abbs, on the Berwickshire coast, is where people who claim UK diving is murky get proved wrong. The voluntary marine reserve established here in 1984 protects a stretch of coastline where cold, clean North Sea water regularly delivers ten to twenty metres of visibility over rock architecture that genuinely deserves the word dramatic. Cathedral Rock is the signature — a natural double arch swimmable at around 15 metres, walls covered in dead man's fingers. The reserve's protection shows in the fish: big ballan wrasse that do not flee, and the wolf-fish that St Abbs is quietly famous for, sitting in crevices looking thoroughly unimpressed. Shore diving from the harbour is easy and boats run from Eyemouth.",
  quickFacts: {
    bestTime: 'May to September',
    difficulty: 'Easy to intermediate — good shore access, some swell exposure',
    waterTemp: '7–14°C — drysuit',
    visibility: '10–20m, excellent by UK standards',
  },
  topSites: [
    { name: 'Cathedral Rock', note: 'The famous twin natural arch — the classic dive' },
    { name: 'Anemone Gullies', note: 'Shallow rock gullies packed with anemones' },
    { name: 'Big Green Carr', note: 'Boat site with walls and reliable wrasse' },
    { name: 'Glanmire', note: 'Broken steamer wreck at around 30m' },
    { name: 'St Abbs harbour', note: 'Sheltered shore entry, ideal for a check dive' },
  ],
  marineLife: [
    'Wolf-fish in the deeper crevices',
    'Ballan wrasse, unbothered by divers',
    'Dead man’s fingers carpeting the walls',
    'Nudibranchs and sea slugs',
    'Grey seals passing through',
  ],
  faqs: [
    {
      question: 'Why is visibility so good at St Abbs?',
      answer:
        'A combination of cold, clean North Sea water, a rocky rather than silty seabed, and relatively little freshwater runoff along this stretch of coast. There is nothing to put into suspension, so once any swell has settled the water clears quickly and ten to twenty metres is normal — occasionally more. The trade-off is exposure: this coastline takes weather straight off the North Sea, so a strong northerly or easterly will shut sites down and stir things up for a day or two afterwards.',
    },
    {
      question: 'Can you shore dive at St Abbs?',
      answer:
        'Yes, and it is one of the main attractions. Entries from St Abbs harbour and the nearby coves give straightforward access to sheltered gullies rich in anemones and wrasse, making it a favourite for club weekends and skills practice. Boat trips out of Eyemouth open up the bigger sites like Cathedral Rock and the offshore reefs. Check current guidance on harbour access and parking before travelling, as arrangements for divers have changed over the years.',
    },
    {
      question: 'What is the best time of year to dive St Abbs?',
      answer:
        'May to September, with midsummer offering long daylight and the calmest conditions. Visibility typically improves as the spring plankton bloom clears through late May and June. Water temperature runs from around 7°C early in the season to a peak of about 14°C in late August, so this is drysuit diving whenever you visit. Because the site is so weather-dependent, flexible dates beat fixed ones — keep an eye on wind direction rather than the calendar.',
    },
  ],
};

const LUNDY = {
  intro:
    "Lundy is a granite island in the Bristol Channel with an outsized place in British marine conservation history: it became the UK's first statutory Marine Nature Reserve in 1986, gained a no-take zone in 2003, and was designated the country's first Marine Conservation Zone in 2010. Decades of protection produced exactly what protection is supposed to produce — larger fish, recovering lobster and a reef in noticeably better condition than the mainland. For most divers, though, the draw is the grey seals, which are as playful here as at the Farnes. The catch is the Bristol Channel's enormous tidal range, which makes slack-water timing non-negotiable and puts the island firmly in the hands of skippers who know the water.",
  quickFacts: {
    bestTime: 'June to September',
    difficulty: 'Intermediate — strong tides demand slack-water timing',
    waterTemp: '10–17°C — drysuit or a good semi-dry',
    visibility: '5–15m, best on neaps',
  },
  topSites: [
    { name: 'Knoll Pins', note: 'Pinnacles covered in jewel anemones — the signature dive' },
    { name: 'Gannets Rock', note: 'Seal encounters in the shallows' },
    { name: 'Iona II', note: 'Victorian paddle steamer wreck, protected' },
    { name: 'The Rattles', note: 'Gullies and boulder terrain on the east side' },
    { name: 'Landing Bay', note: 'Sheltered and shallow, good for a second dive' },
  ],
  marineLife: [
    'Grey seals, curious and interactive',
    'Jewel anemones in dense colour',
    'Large ballan wrasse and pollack',
    'Crawfish and lobster, recovered under protection',
    'Sunset cup coral, a Lundy speciality',
  ],
  faqs: [
    {
      question: 'How do I dive Lundy?',
      answer:
        'By boat, from the north Devon coast — hard boats run out of Ilfracombe and Bideford, and the crossing takes a couple of hours depending on conditions. Some groups make a day of it with two dives; others book multi-day charters. There is limited accommodation on the island itself through the Landmark Trust, but no dive centre, so almost everyone dives from a visiting boat. Because the crossing is exposed and the tides are serious, trips are heavily weather-dependent and cancellations are normal.',
    },
    {
      question: 'Why are the tides at Lundy so important?',
      answer:
        'The Bristol Channel has one of the largest tidal ranges in the world, and Lundy sits right in the flow. Currents around the island can run hard enough to make diving impossible outside slack water, and they change fast. In practice this means dive times are dictated by the tide tables rather than by convenience, sites are chosen according to the state of the tide, and neap tides give a longer, more forgiving window than springs. It is the single biggest reason to dive Lundy with a skipper who knows it well.',
    },
    {
      question: 'What makes Lundy special for marine life?',
      answer:
        'Sustained protection. As the UK\'s first Marine Nature Reserve and later its first Marine Conservation Zone, with a no-take zone in place since 2003, Lundy has had far longer to recover than almost anywhere else in British waters — and the difference is visible in the size of the wrasse, the density of the jewel anemones and the presence of crawfish and lobster that would have been fished out elsewhere. It also hosts sunset cup coral, a rare species with very few UK sites.',
    },
  ],
};

const MALTA = {
  intro:
    "Malta has built one of Europe's most efficient diving destinations out of clear water, walkable shore entries and a deliberate policy of scuttling ships. Visibility of thirty metres or more is routine, the water is warm enough for a 5mm through the summer, and the wreck list is remarkable for a country this small — the tanker Um El Faroud, the patrol boat P29 and the tugboat Rozi all sit within recreational depths, most of them reachable from the shore at Cirkewwa. Around the wrecks are caverns, arches and reef walls in the limestone. It suits almost everyone: a beginner can shore dive Cirkewwa comfortably, while technical divers have deeper wrecks and cave systems to work through, and everything is a short drive apart.",
  quickFacts: {
    bestTime: 'May to October, though Malta dives year-round',
    difficulty: 'Beginner to technical — sites for every level',
    waterTemp: '15°C in winter to 27°C in late summer',
    visibility: '20–40m',
  },
  topSites: [
    { name: 'Um El Faroud', note: 'Large tanker scuttled in 1998, around 25–36m' },
    { name: 'Cirkewwa', note: 'Shore-dive hub — arch, reef and the Rozi tug' },
    { name: 'P29 patrol boat', note: 'Intact and photogenic at about 35m' },
    { name: 'HMS Maori', note: 'Shallow WWII destroyer wreck in Valletta' },
    { name: 'Ghar Lapsi', note: 'Easy shore dive through caverns and swim-throughs' },
  ],
  marineLife: [
    'Barracuda and amberjack around the wrecks',
    'Groupers in the caverns',
    'Octopus and moray eels',
    'Nudibranchs on the wreck structure',
    'Seasonal tuna passing offshore',
  ],
  faqs: [
    {
      question: 'When is the best time to dive Malta?',
      answer:
        'May to October is the main season, when the sea is warmest and calmest — late summer, around August into early October, is the pick if you want water in the mid-twenties and long days. Malta dives all year, and winter offers excellent visibility with almost no crowds, though the water drops to around 15°C and you will want a 7mm or a drysuit. Winter storms and northerly winds can close exposed sites, but the island is small enough that operators simply move to the sheltered side.',
    },
    {
      question: 'Can you shore dive in Malta?',
      answer:
        'Extensively, and it is one of the island\'s biggest advantages. Cirkewwa in the north is the best-known shore-diving site in the Mediterranean, with easy entry steps giving access to an arch, a reef wall and the Rozi tugboat without ever boarding a boat. Ghar Lapsi, Wied iz-Zurrieq and several other sites work the same way. It keeps costs down, removes boat schedules from your day, and means you can dive when you like — hire kit, drive, park and walk in.',
    },
    {
      question: 'What are the best wrecks to dive in Malta?',
      answer:
        'The Um El Faroud is the standout — a large tanker scuttled in 1998 off Wied iz-Zurrieq, sitting at roughly 25 to 36 metres and substantial enough to warrant several dives. The P29 patrol boat and the Rozi tugboat are both intact, shallow enough for Advanced divers and highly photogenic. HMS Maori in Valletta harbour is very shallow and suits newer divers. Many were scuttled deliberately as artificial reefs, so they are clean, structurally sound and far safer than wrecks that went down by accident.',
    },
  ],
};

const GOZO = {
  intro:
    "Gozo is Malta's quieter sister island, and for many divers it is the better half. The diving is defined by limestone — vertical walls, tunnels, caverns and the famous Blue Hole at Dwejra, a natural rock pool that connects to the open sea through an arch at around eight metres. Swimming out of that arch into blue water dropping away beneath you is one of the Mediterranean's genuinely great dive moments. Nearby, the collapsed remains of the Azure Window, which fell into the sea in a storm in March 2017, now form a boulder field that has become a dive site in its own right. Visibility is regularly thirty metres or more, and almost everything is a shore dive reached down a track and a set of steps.",
  quickFacts: {
    bestTime: 'May to October, diveable year-round',
    difficulty: 'Intermediate — shore entries can be awkward; some sites advanced',
    waterTemp: '15°C in winter to 27°C in late summer',
    visibility: '25–40m',
  },
  topSites: [
    { name: 'Blue Hole & the Arch', note: 'Gozo\'s signature dive at Dwejra' },
    { name: 'Azure Window remains', note: 'The collapsed arch, now a boulder field' },
    { name: 'The Chimney', note: 'Vertical crack you ascend through in the rock' },
    { name: 'Inland Sea tunnel', note: 'An 80m tunnel opening onto a sheer wall' },
    { name: 'Xlendi Cave', note: 'Shallow cavern, good for less experienced divers' },
  ],
  marineLife: [
    'Groupers and dentex along the walls',
    'Octopus and moray eels',
    'Barracuda in summer',
    'Nudibranchs in the caverns',
    'Cardinalfish shoaling in the tunnels',
  ],
  faqs: [
    {
      question: 'Is the Blue Hole in Gozo difficult to dive?',
      answer:
        'The diving itself is straightforward, but the logistics are not. The Blue Hole sits at the bottom of a rough limestone shore at Dwejra, and you carry your kit down uneven rock to reach it — the walk out afterwards is what people remember. Once in, you drop into a natural pool and swim out through an arch at around eight metres onto a wall dropping well past recreational limits. Swell can make the entry genuinely hazardous, so operators call it off when conditions are wrong. Depth discipline matters, as the wall invites you deeper.',
    },
    {
      question: 'Can you still dive the Azure Window?',
      answer:
        'Not as it was — the arch collapsed into the sea during a storm in March 2017. What remains is arguably still worth diving: enormous limestone blocks scattered across the seabed forming a dramatic boulder field and swim-throughs, at depths that suit recreational divers. It is combined with the Blue Hole on most Dwejra dives. If you saw photographs of the Window before it fell and expected to swim beneath it, adjust expectations, but do not skip the site.',
    },
    {
      question: 'Should I dive Gozo or Malta?',
      answer:
        'Ideally both, since the ferry between them takes about 25 minutes. Malta has the better wrecks — Um El Faroud, P29 and Rozi — plus more infrastructure and easier shore access. Gozo has the more dramatic topography: walls, tunnels, caverns and the Blue Hole, with fewer divers on the sites and generally slightly better visibility. Divers who prioritise wrecks base themselves on Malta; those who prefer rock architecture and a quieter trip stay on Gozo.',
    },
  ],
};

const ICELAND = {
  intro:
    "Silfra is the reason divers come to Iceland, and it is unlike anywhere else on earth. The fissure sits inside Þingvellir National Park, in the rift valley where the North American and Eurasian plates are pulling apart, and it is filled with glacial meltwater from Langjökull that has spent decades filtering through porous lava rock. The result is water so pure that visibility is routinely quoted at over a hundred metres — you can see the far end of a flooded canyon as clearly as you would in air. It is also 2 to 4°C, every day of the year, which is why every operator requires drysuit certification and logged dry dives. Iceland's other secret is Strýtan in the north, a geothermal chimney venting hot water on a site found almost nowhere else in the world.",
  quickFacts: {
    bestTime: 'Year-round — the water temperature never changes',
    difficulty: 'Intermediate — drysuit certification is mandatory, not optional',
    waterTemp: '2–4°C all year',
    visibility: 'Over 100m at Silfra, the clearest in the world',
  },
  topSites: [
    { name: 'Silfra Big Crack', note: 'The narrow section between the rift walls' },
    { name: 'Silfra Cathedral', note: 'Long, deep canyon with staggering visibility' },
    { name: 'Silfra Lagoon', note: 'Shallow finish over bright blue-green algae' },
    { name: 'Strýtan', note: 'Geothermal chimney rising from the seabed, north Iceland' },
    { name: 'Bjarnagjá', note: 'Quieter lava fissure on the Reykjanes peninsula' },
  ],
  marineLife: [
    'Almost none — Silfra is about geology and clarity',
    '“Troll hair” algae in vivid green',
    'Arctic char, occasionally',
    'Marine life around Strýtan in the north',
  ],
  faqs: [
    {
      question: 'Do I need drysuit certification to dive Silfra?',
      answer:
        'Yes, and operators enforce it strictly. Because the water sits at 2 to 4°C year-round, every Silfra dive operator requires a recognised drysuit specialty certification plus a minimum number of logged drysuit dives — commonly ten — within a recent period, and they will ask to see your logbook. Divers who turn up without it are turned away or offered snorkelling instead. If you want to dive Silfra, complete your drysuit training at home before you travel; you cannot do it on the day.',
    },
    {
      question: 'How cold is Silfra really, and can I handle it?',
      answer:
        'It is 2 to 4°C, which is cold enough that your exposed lips and cheeks go numb within minutes even in a properly fitted drysuit with thick undersuit, hood and dry gloves. Dives are deliberately short, typically around 30 to 40 minutes, and operators run two shorter dives rather than one long one. Most reasonably experienced drysuit divers cope fine — the shock is manageable and the visibility is so extraordinary that people forget the cold. If you dive dry regularly in the UK or northern Europe, you are well prepared.',
    },
    {
      question: 'Can you really touch two tectonic plates at Silfra?',
      answer:
        'This is the marketing line, and it needs a small caveat. Silfra is a fissure within the rift valley where the North American and Eurasian plates are separating, and in the narrowest section you can touch rock on both sides at once — which is where the photograph comes from. Strictly speaking the plate boundary is a wide zone rather than a single crack, so you are touching two walls of the same rift rather than the plates themselves. It remains a genuinely extraordinary place to dive; just enjoy it for the geology and the water.',
    },
  ],
};

const NORWAY = {
  intro:
    "Norway offers two completely different underwater experiences depending on when you go. In winter, the herring migration draws orcas and humpback whales into the fjords around Skjervøy and Tromsø, and snorkellers get into the water alongside feeding whales in the blue twilight of the Arctic day — an encounter with very few equals anywhere. In summer, the same coastline offers cold, clear water over kelp forests, wolf-fish and a long list of wrecks, with Gulen near Bergen acting as a hub for technical divers. Saltstraumen near Bodø adds the world's strongest tidal current, dived at slack water when the maelstrom briefly pauses. It is demanding, expensive and, for cold-water divers, close to the top of the list.",
  quickFacts: {
    bestTime: 'November to January for whales; May to September for diving',
    difficulty: 'Advanced — cold, remote, and current-affected',
    waterTemp: '4–15°C — drysuit essential year-round',
    visibility: '10–30m, often excellent in cold months',
  },
  topSites: [
    { name: 'Skjervøy & Tromsø fjords', note: 'Orca and humpback snorkelling in winter' },
    { name: 'Saltstraumen', note: 'The world\'s strongest tidal current — slack water only' },
    { name: 'Gulen', note: 'Wreck and technical diving hub near Bergen' },
    { name: 'Lofoten walls', note: 'Steep drop-offs with dense soft coral' },
    { name: 'Frankenwald wreck', note: 'Large intact wreck for experienced divers' },
  ],
  marineLife: [
    'Orcas and humpback whales, in winter',
    'Wolf-fish in the rocky reefs',
    'Kelp forests and dense soft coral',
    'King crab in the far north',
    'Cod, coalfish and lumpsuckers',
  ],
  faqs: [
    {
      question: 'Can you scuba dive with orcas in Norway?',
      answer:
        'No — whale encounters in Norway are snorkel-only, and that is both regulation and good practice. Norwegian rules restrict in-water interaction with whales, and operators run these trips as snorkelling from a boat rather than scuba. In practical terms it works better anyway: the whales are feeding near the surface on herring, bubbles from scuba tend to push them away, and a snorkeller can move quickly and quietly into position. Expect short, cold, repeated entries rather than a single long dive.',
    },
    {
      question: 'When is the whale season in northern Norway?',
      answer:
        'Roughly November through January, tied to the herring that draw the whales into the fjords — most operators run trips from Skjervøy, Tromsø and the surrounding area during that window. Be aware of the light: at that latitude in December there is no true sunrise, and you are working in a few hours of blue polar twilight each day. The herring shift their wintering grounds over the years, so the exact hotspot moves; check where operators are actually running before booking flights.',
    },
    {
      question: 'What is diving Saltstraumen like?',
      answer:
        'Saltstraumen is the strongest tidal current in the world, with enormous volumes of water forced through a narrow strait four times a day, generating whirlpools visible from the bridge above. You dive it only at slack water, in a window that can be as short as twenty minutes, with a guide who knows exactly when to get in and out. The reward is a reef fed by that constant nutrient flow — dense anemones, huge cod and wolf-fish. It is not a site for divers new to cold water or current.',
    },
  ],
};

const CROATIA = {
  intro:
    "Croatia's diving is Adriatic in character: clear, blue, and heavy on history. The signature dive is the Baron Gautsch, an Austro-Hungarian passenger steamer that struck a mine off Rovinj in August 1914 and went down with heavy loss of life — she sits between roughly 28 and 40 metres, remarkably intact, and is protected such that you dive her with a licensed guide. Beyond her, the coastline offers a long list of wrecks, limestone caves and walls scattered across more than a thousand islands, with the Kornati archipelago and the island of Vis particularly well regarded. Visibility of twenty to thirty metres is normal in summer, water reaches the mid-twenties, and the topside sailing-holiday scenery does no harm at all.",
  quickFacts: {
    bestTime: 'May to October',
    difficulty: 'Intermediate — several signature wrecks sit below 30m',
    waterTemp: '14°C in spring to 25°C in late summer',
    visibility: '20–30m',
  },
  topSites: [
    { name: 'Baron Gautsch', note: 'WWI passenger steamer off Rovinj — guided dives only' },
    { name: 'Vis island wrecks', note: 'B-17 bomber and several WWII ships' },
    { name: 'Kornati National Park', note: 'Walls and drop-offs in protected water' },
    { name: 'Premuda “Cathedral”', note: 'Cavern system with dramatic light shafts' },
    { name: 'Coriolanus', note: 'British minesweeper lost in 1945' },
  ],
  marineLife: [
    'Groupers and dentex along the walls',
    'Conger eels and moray in the wrecks',
    'Octopus and scorpionfish',
    'Lobster in the cavern systems',
    'Red gorgonians on the deeper drop-offs',
  ],
  faqs: [
    {
      question: 'Do I need a permit to dive in Croatia?',
      answer:
        'Foreign divers generally need to dive through a licensed Croatian dive centre, and there has historically been a diving card or permit requirement administered locally — arrangements have changed over the years, so confirm current rules with your operator before travelling. Certain protected wrecks, including the Baron Gautsch, may only be dived with an authorised guide, and some are inside marine protected areas with additional restrictions and fees. In practice, booking through an established centre handles all of this for you.',
    },
    {
      question: 'What is the best wreck dive in Croatia?',
      answer:
        'The Baron Gautsch, without much argument. An Austro-Hungarian passenger ship that struck a mine in August 1914 with significant loss of life, she lies off Rovinj in roughly 28 to 40 metres and is unusually intact for her age, with recognisable decks and superstructure. Because she is both a war grave and a protected monument, dives are guided and penetration is restricted. Her depth puts her firmly in Advanced territory, and many divers use nitrox to get worthwhile bottom time.',
    },
    {
      question: 'When is the best time to dive Croatia?',
      answer:
        'May to October, with the sweet spot in late summer. Water climbs to around 25°C at the surface by August and September — though expect a sharp thermocline below about 20 metres, where it can drop into the high teens, so a 5mm plus a hood is sensible even in high summer. Visibility is consistently good across the season. July and August bring the Adriatic tourist peak, so late May, June and September offer the same diving with fewer people and lower prices.',
    },
  ],
};

const CYPRUS = {
  intro:
    "Cyprus is, for most visiting divers, one wreck: the Zenobia. A Swedish-built roll-on roll-off ferry, she developed a ballast fault on her maiden voyage and capsized off Larnaca in June 1980, taking around a hundred articulated lorries down with her. She now lies on her port side in 16 to 42 metres of clear, warm Mediterranean water, and she is enormous — nearly 180 metres of ship, with the lorries still chained in rows on her cargo decks. Very few wrecks combine that scale, that clarity and that accessibility, which is why she appears on almost every list of the world's best wreck dives. The rest of Cyprus offers pleasant reef and cavern diving, but the Zenobia is the reason people book flights.",
  quickFacts: {
    bestTime: 'April to November; diveable year-round',
    difficulty: 'Intermediate for the outside; technical for deep penetration',
    waterTemp: '16°C in winter to 28°C in late summer',
    visibility: '20–40m',
  },
  topSites: [
    { name: 'Zenobia', note: 'The main event — 16 to 42m, lorries still aboard' },
    { name: 'Amphorae Caves, Paphos', note: 'Shallow caverns with ancient amphorae' },
    { name: 'Green Bay, Protaras', note: 'Very shallow, ideal for training and night dives' },
    { name: 'Cyclops cave', note: 'Cavern diving along the eastern coast' },
    { name: 'HMS Cricket', note: 'Gunboat wreck for more experienced divers' },
  ],
  marineLife: [
    'Enormous resident groupers on the Zenobia',
    'Barracuda and amberjack schools',
    'Moray eels in the wreck structure',
    'Turtles, occasionally',
    'Nudibranchs and tube worms on the hull',
  ],
  faqs: [
    {
      question: 'What certification do I need to dive the Zenobia?',
      answer:
        'The wreck starts at around 16 metres at the shallowest point of the hull, so an Open Water diver can dive parts of the exterior with a guide. Advanced Open Water opens up much more, since the most impressive sections — the cargo decks with the lorries, and the lower structure — sit between 25 and 42 metres. Any real penetration into the interior is overhead-environment diving and needs wreck training, appropriate gas and a guide who knows the routes. Many divers use nitrox to extend bottom time.',
    },
    {
      question: 'Why is the Zenobia considered one of the world\'s best wreck dives?',
      answer:
        'Scale, clarity and cargo. She is nearly 180 metres long, lying on her side in warm water with 20 to 40 metres of visibility, which means you can actually appreciate her size rather than groping along a hull in the gloom. The cargo is what makes her unique: around a hundred articulated lorries still chained to the decks, some with their loads intact, giving the wreck an eerie, frozen-in-1980 quality. She is also close to shore off Larnaca, so access is easy and dives are run daily.',
    },
    {
      question: 'When is the best time to dive Cyprus?',
      answer:
        'April to November covers the comfortable season, with water climbing from around 18°C in spring to 28°C by late summer and visibility consistently excellent. Diving continues through winter, when the sea drops to about 16°C and you would want a 7mm, but the water is often at its clearest and the sites are empty. Because the Zenobia sits in a sheltered position off Larnaca, trips run in most conditions, making Cyprus one of the more weather-reliable European destinations.',
    },
  ],
};

const SARDINIA = {
  intro:
    "Sardinia's nickname among divers comes from Corallium rubrum — the deep red Mediterranean coral that was harvested from these waters for centuries and traded like a precious metal, giving Alghero its reputation as a coral town. Today the coral is protected and regulated, and the diving that surrounds it is some of the best in the western Mediterranean. Nereo Cave at Capo Caccia is the headline: one of the largest underwater caves in the Mediterranean, a complex of tunnels and chambers big enough to feel genuinely cathedral-like. Elsewhere the island offers marine protected areas at Tavolara and Capo Carbonara where grouper populations have visibly recovered, granite topography, and a scattering of wrecks. The water is clear, the season is long, and it is far less crowded than the Italian mainland.",
  quickFacts: {
    bestTime: 'May to October',
    difficulty: 'Intermediate — cave and cavern sites need proper training',
    waterTemp: '14°C in spring to 26°C in late summer',
    visibility: '20–30m',
  },
  topSites: [
    { name: 'Nereo Cave, Capo Caccia', note: 'Among the largest underwater caves in the Med' },
    { name: 'Tavolara', note: 'Marine protected area with big groupers and walls' },
    { name: 'Capo Carbonara', note: 'Protected reserve off Villasimius' },
    { name: 'Angelika wreck', note: 'Accessible wreck on the north-west coast' },
    { name: 'Secca del Papa', note: 'Pinnacle dive with gorgonians and pelagics' },
  ],
  marineLife: [
    'Red coral on the deeper walls and cave roofs',
    'Dusky groupers, recovered in the reserves',
    'Red gorgonian fans',
    'Barracuda and amberjack',
    'Octopus, moray and scorpionfish',
  ],
  faqs: [
    {
      question: 'Can you see red coral diving in Sardinia?',
      answer:
        'Yes, and it is one of the island\'s signatures — Corallium rubrum grows on shaded overhangs, cave roofs and deeper walls, and Nereo Cave at Capo Caccia is particularly known for it. Bear in mind that it is a slow-growing, heavily regulated species: harvesting is tightly controlled and taking it as a diver is prohibited. The best displays tend to sit below 30 metres or in shaded cavern sections where light is limited, so a torch makes an enormous difference to seeing the colour properly.',
    },
    {
      question: 'Do I need cave training to dive Nereo Cave?',
      answer:
        'For the classic guided route, generally no — the main passage is large, has natural light at both ends and is dived as a cavern by recreational divers with a local guide who knows it. That said, it is still an overhead environment, and comfort with buoyancy, a torch and staying tight to your guide are essential. The deeper and more complex sections of the system are genuine cave diving and require proper cave training. Book with an Alghero operator that runs the site regularly rather than treating it as a casual dive.',
    },
    {
      question: 'When is the best time to dive Sardinia?',
      answer:
        'May to October, with June, September and early October offering the best balance — warm water, good visibility and far fewer tourists than the Italian August peak. Surface temperatures reach around 26°C in late summer, though a thermocline below 25 or 30 metres can drop things sharply, so a 5mm with a hood is a sensible minimum for deeper cave and wall dives. Winter diving is possible with the right exposure protection but many operators run reduced schedules.',
    },
  ],
};

const CANARY_ISLANDS = {
  intro:
    "The Canaries are Europe's year-round dive destination — water that never drops below about 18°C, visibility in the twenties and thirties, and volcanic terrain of arches, lava tubes and black sand that looks like nowhere else in Europe. The islands are also the last global stronghold of the angel shark, a critically endangered flat-bodied shark that has disappeared from most of its former range but is still reliably found here, half-buried in sandy bays through the winter months. Lanzarote adds the Museo Atlántico, Europe's first underwater sculpture museum, where Jason deCaires Taylor's cast figures stand in ranks at around thirteen metres. El Hierro's Mar de las Calmas reserve has the clearest water in the archipelago. It is easy, accessible diving with a genuine conservation story attached.",
  quickFacts: {
    bestTime: 'Year-round; angel sharks are most reliable November to March',
    difficulty: 'Beginner to intermediate',
    waterTemp: '18–24°C — a 5mm is comfortable year-round',
    visibility: '20–30m',
  },
  topSites: [
    { name: 'Museo Atlántico, Lanzarote', note: 'Underwater sculpture museum at around 13m' },
    { name: 'Mar de las Calmas, El Hierro', note: 'The clearest water in the Canaries' },
    { name: 'Radazul & Tabaiba, Tenerife', note: 'Easy shore dives, good for angel sharks' },
    { name: 'El Cabrón, Gran Canaria', note: 'Marine reserve with arches and gullies' },
    { name: 'Playa Chica, Lanzarote', note: 'Shore entry onto a wall dropping past 40m' },
  ],
  marineLife: [
    'Angel sharks, seasonally and reliably',
    'Rays and stingrays on the sand',
    'Barracuda and roncadores schooling',
    'Octopus, moray and cuttlefish',
    'Occasional whale sharks and pilot whales offshore',
  ],
  faqs: [
    {
      question: 'When can I see angel sharks in the Canary Islands?',
      answer:
        'The Canaries are the last reliable stronghold in the world for the critically endangered angel shark, and the best months are generally November through March, when they move into shallow sandy bays. They lie half-buried and motionless, so sightings depend on a guide who knows where to look rather than on luck. Shore dives on Tenerife, Lanzarote and Gran Canaria all produce encounters. Do not touch or crowd them — this is one of the few remaining populations, and disturbance in shallow breeding habitat is a genuine conservation concern.',
    },
    {
      question: 'Can you dive the Canary Islands all year?',
      answer:
        'Yes, and that is the archipelago\'s biggest selling point for European divers. Water temperature ranges only from about 18°C in late winter to 24°C at the end of summer, so a 5mm works year-round and there is no closed season. Winter brings slightly bigger Atlantic swell, which can shut exposed sites for a day or two, but the islands are shaped so there is almost always a sheltered coast. Winter is also angel shark season, so the cooler months are arguably the more interesting time to visit.',
    },
    {
      question: 'What is the Museo Atlántico?',
      answer:
        'Europe\'s first underwater sculpture museum, installed off Playa Blanca in Lanzarote and opened in 2016. It holds around three hundred cast concrete figures by the artist Jason deCaires Taylor, arranged in tableaux — a group walking towards a wall, a raft of figures, a boat — sitting at roughly twelve to fourteen metres on sand. The pieces double as an artificial reef and have been colonised by marine life. It is a shallow, easy dive suitable for newer divers, and it photographs like nothing else in European water.',
    },
  ],
};

const THE_AZORES = {
  intro:
    "The Azores sit in the middle of the Atlantic, and they dive like it. This is blue-water, big-animal territory: seamounts rising from deep ocean, baited shark dives with blues and makos, and the mobula ray aggregations at Princess Alice Bank, a submerged seamount some 45 nautical miles offshore where hundreds of devil rays gather in mid-summer. Getting there means several hours on a boat each way and then a descent into open blue water with no reference — magnificent, and not the place to discover you are uneasy without a bottom in sight. Closer in, the volcanic islands offer arches, wrecks and dramatic terrain, and the surface intervals come with sperm whales and dolphins. For divers who have done reefs and want ocean, it is one of the most exciting destinations in Europe.",
  quickFacts: {
    bestTime: 'July to October — mobulas peak mid-summer',
    difficulty: 'Advanced — offshore, blue water, current and long crossings',
    waterTemp: '17–24°C',
    visibility: '20–30m and often more offshore',
  },
  topSites: [
    { name: 'Princess Alice Bank', note: 'Offshore seamount, mobula rays in summer' },
    { name: 'Ambrósio, Santa Maria', note: 'Reliable devil ray aggregation site' },
    { name: 'Blue shark dives', note: 'Baited blue-water dives with blues and makos' },
    { name: 'Formigas islets', note: 'Remote reef with big pelagic traffic' },
    { name: 'Dori wreck, Faial', note: 'US Liberty ship, accessible and intact' },
  ],
  marineLife: [
    'Mobula (devil) rays in large aggregations',
    'Blue sharks and shortfin mako',
    'Dusky groupers on the seamounts',
    'Barracuda, amberjack and tuna',
    'Sperm whales and dolphins at the surface',
  ],
  faqs: [
    {
      question: 'When is the best time to dive the Azores?',
      answer:
        'July to October, and quite narrowly so. The mid-Atlantic weather makes offshore trips to seamounts like Princess Alice Bank impossible for much of the year, and the mobula ray aggregations peak in mid-summer, roughly July into September. Water reaches its warmest at around 23 to 24°C in late summer. Outside this window many operators reduce or stop offshore trips entirely, and while coastal diving continues, the pelagic encounters that justify the trip are seasonal.',
    },
    {
      question: 'How experienced do I need to be to dive Princess Alice Bank?',
      answer:
        'Considerably. The site is a seamount roughly 45 nautical miles offshore, meaning a boat crossing of two to three hours each way in Atlantic swell, followed by a descent in open blue water where the seamount top sits at around 35 metres and there is no visual reference on the way down. Current is common. Operators typically require Advanced Open Water with meaningful experience, good buoyancy without a reference, and confidence deploying an SMB. Seasickness on the crossing catches out more divers than the diving does.',
    },
    {
      question: 'Are the shark dives in the Azores baited?',
      answer:
        'Yes. Blue shark and mako encounters in the Azores are run as baited blue-water dives, typically with a chum line drawing the sharks in while divers stay in a group at shallow depth beneath the boat. Reputable operators use it to attract rather than feed, brief thoroughly, and cap group sizes. If baited encounters sit uncomfortably with you ethically, it is worth knowing in advance, because there is no realistic way to encounter these species here otherwise — they are open-ocean animals that do not gather at a reef.',
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
  malapascua: MALAPASCUA,
  moalboal: MOALBOAL,
  'apo-island': APO_ISLAND,
  coron: CORON,

  // Batch 2 — UK & Europe
  cornwall: CORNWALL,
  plymouth: PLYMOUTH,
  'scapa-flow': SCAPA_FLOW,
  'farne-islands': FARNE_ISLANDS,
  'st-abbs': ST_ABBS,
  lundy: LUNDY,
  malta: MALTA,
  gozo: GOZO,
  iceland: ICELAND,
  norway: NORWAY,
  croatia: CROATIA,
  cyprus: CYPRUS,
  sardinia: SARDINIA,
  'canary-islands': CANARY_ISLANDS,
  'the-azores': THE_AZORES,
};

export const getDiveGuide = (slug) => DIVE_GUIDES[slug] || null;
