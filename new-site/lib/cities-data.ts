export interface CityData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroH1: string;
  heroSubtitle: string;
  // Paragraphs split on blank lines; [text](/path) renders as an inline link.
  intro: string;
  whyUs: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  extraKeywords: string[];
  nearby: string[];
  // Body of the "New gate or garage door installation in <City>" section; inline links allowed.
  install: string;
  // Wording around the per-city brand links, written fresh for each city.
  brandsHeading: string;
  brandsIntro: string;
}

// Cities that had their own page on the old site (and Search Console history).
// Featured first on service and brand pages.
export const PRIORITY_CITY_SLUGS: string[] = [
  "santa-clarita", "valencia", "saugus", "newhall", "canyon-country", "castaic",
];

export const CITIES: CityData[] = [
  {
    slug: "santa-clarita",
    name: "Santa Clarita",
    metaTitle: "Gate Repair Santa Clarita, CA | Gates & Garage Doors",
    metaDescription:
      "Gate and garage door repair across Santa Clarita: sliding and swing gates, operators, springs and openers. Call or text for a free on-site quote.",
    heroH1: "Gate Repair in Santa Clarita",
    heroSubtitle:
      "Driveway gates, community gates and garage doors across Valencia, Saugus, Newhall and Canyon Country, fixed by a crew that works this valley every day.",
    intro:
      "Santa Clarita is really four towns under one city name, and the gates and doors change as you cross it. Valencia streets are full of HOA-managed entries and matching sectional doors, Saugus and Newhall have older tract homes with original hardware, and Canyon Country climbs into hillside lots where a [sliding gate](/services/driveway-gate-repair) has to hold its line on a slope.\n\nWe keep the parts for the operators and door systems we see most in these neighborhoods on the truck, so a dead [gate operator](/services/gate-opener-repair) or a snapped [garage door spring](/services/garage-door-spring-repair) can usually be handled on the first visit. You talk to a technician, not a call center, and you get a written quote before any work starts.",
    whyUs: [
      { title: "We know the four towns", desc: "From Bridgeport to Sand Canyon, we already know the gate styles and HOA rules you are dealing with." },
      { title: "Gates first, doors too", desc: "Most of our calls are driveway and community gates, and the same visit can cover the garage door." },
      { title: "Quote before work", desc: "The technician explains the problem and writes the quote at your gate. Nothing starts until you say yes." },
    ],
    faq: [
      { q: "Do you cover every part of Santa Clarita?", a: "Yes. Valencia, Saugus, Newhall and Canyon Country are all part of our regular routes, along with the unincorporated areas around them." },
      { q: "Can you work on a gate that belongs to our HOA?", a: "Yes. We work with HOA boards and property managers on entry and pedestrian gates, and we can coordinate access with the management company." },
      { q: "Do you also repair garage doors in Santa Clarita?", a: "We do. Springs, cables, openers and off-track doors are all part of our garage door work across the city." },
    ],
    extraKeywords: ["gate repair santa clarita", "garage door repair santa clarita", "gate operator repair santa clarita"],
    nearby: ["valencia", "saugus", "newhall", "canyon-country", "stevenson-ranch"],
    install:
      "Santa Clarita installs usually have to fit an HOA's approved colors and styles or a sloped lot. We measure the opening and the grade, match the look your neighborhood allows, and quote a [new gate](/services/gate-installation) or [garage door](/services/garage-door-installation) with the operator sized for it.",
    brandsHeading: "Operator and opener brands we service in Santa Clarita",
    brandsIntro:
      "Whatever is mounted on your gate post or garage ceiling in Santa Clarita, odds are we already work on it. Pick your brand below for details.",
  },
  {
    slug: "valencia",
    name: "Valencia",
    metaTitle: "Valencia Gate Repair | HOA, Driveway Gates & Garage Doors",
    metaDescription:
      "Valencia gate and garage door repair for HOA entries, master-planned homes and gated neighborhoods. Free on-site quote. Call or text today.",
    heroH1: "Valencia Gate & Garage Door Repair",
    heroSubtitle:
      "HOA entry gates, private driveway gates and sectional garage doors in Valencia's master-planned neighborhoods.",
    intro:
      "Valencia was laid out as a master-planned community, and that shapes almost every repair we do here. Neighborhoods like Westridge, Bridgeport, Northbridge and the Valencia Summit area have association rules on gate color, door style and even what can show from the street, so a repair that changes the look of your home can turn into an architectural review.\n\nWe keep repairs inside those rules. On community entries we handle [automatic gate operators](/services/automatic-gate-repair), loop detectors, keypads and telephone entry, and we work with property managers on scheduling. On homes, most calls are [garage door openers](/services/garage-door-opener-repair) and springs on doors that have been opening several times a day for years.",
    whyUs: [
      { title: "HOA-friendly repairs", desc: "We match existing finishes and hardware so the repair passes your association's look." },
      { title: "Entry gate experience", desc: "Community gates, keypads, telephone entry and vehicle loops are routine work for us." },
      { title: "Clear paperwork", desc: "Property managers get a written quote and a short report they can pass to the board." },
    ],
    faq: [
      { q: "Do you work directly with Valencia HOAs and property managers?", a: "Yes. We can quote and schedule through your management company, and we write up what we found so the board can approve the work." },
      { q: "Will a new opener or spring change how my garage door looks?", a: "No. Springs and openers are inside the garage. If a panel or hardware visible from the street needs replacing, we match it to what your HOA already approved." },
      { q: "Can you fix a community entry gate that keeps getting stuck open?", a: "Yes. A gate that stays open is often a loop detector, safety sensor or control board issue, and we diagnose it on site." },
    ],
    extraKeywords: ["gate repair valencia ca", "hoa gate repair valencia", "garage door repair valencia"],
    nearby: ["santa-clarita", "saugus", "stevenson-ranch", "newhall", "castaic"],
    install:
      "In Valencia a new gate or door usually needs your HOA's sign-off first. We give you the measurements, materials and finish details your architectural committee asks for, then install a [gate](/services/gate-installation) or [garage door](/services/garage-door-installation) that matches the approved style.",
    brandsHeading: "Gate and door brands in Valencia homes and communities",
    brandsIntro:
      "Valencia's community entries and newer homes run on a handful of common operator and opener makers. Choose yours below to see what we repair on it.",
  },
  {
    slug: "saugus",
    name: "Saugus",
    metaTitle: "Saugus Gate Repair & Garage Door Service | Santa Clarita",
    metaDescription:
      "Gate repair and garage door service in Saugus, from older tract homes to newer Copper Hill and Plum Canyon streets. Call or text for a free on-site quote.",
    heroH1: "Saugus Gates, Openers & Garage Doors",
    heroSubtitle:
      "Older tract homes, canyon-side lots and newer subdivisions along Bouquet Canyon, Copper Hill and Plum Canyon.",
    intro:
      "Saugus has two kinds of housing side by side. The older tracts off Bouquet Canyon Road still have plenty of original garage doors, extension springs and operators that have outlived their parts, while Copper Hill and Plum Canyon brought newer homes with quieter openers and HOA-managed streets.\n\nOn the older homes we often replace worn [springs and cables](/services/garage-door-cable-repair) and tired openers. On gates, the common Saugus calls are swing gates that sag on their hinges and [electric gates](/services/electric-gate-repair) whose motors stopped answering the remote.",
    whyUs: [
      { title: "Old and new hardware", desc: "We work on decades-old extension spring doors and brand-new opener setups alike." },
      { title: "Parts on the truck", desc: "Common springs, rollers and operator parts ride with us, so many repairs finish in one visit." },
      { title: "Straight answers", desc: "If an old opener is worth repairing we fix it. If it is not, we tell you why." },
    ],
    faq: [
      { q: "My Saugus home still has its original garage door. Can you repair it?", a: "Usually, yes. We carry springs, cables and rollers for older doors. If parts for your door are no longer made, we explain the options on site." },
      { q: "Do you repair swing gates that drag or no longer latch?", a: "Yes. Sagging swing gates are a common Saugus call. We repair hinges, posts and latches so the gate closes and locks properly again." },
      { q: "Do you serve Copper Hill and Plum Canyon?", a: "Yes. Both are part of our regular Saugus area routes." },
    ],
    extraKeywords: ["gate repair saugus", "garage door repair saugus ca", "garage door spring repair saugus"],
    nearby: ["santa-clarita", "valencia", "canyon-country", "newhall", "green-valley"],
    install:
      "Many Saugus owners replace an original door or add a gate to a lot that never had one. We fit insulated [garage doors](/services/garage-door-installation) into older openings and size [new driveway gates](/services/gate-installation) and operators for the lot you actually have.",
    brandsHeading: "Brands we repair around Saugus",
    brandsIntro:
      "Older Saugus homes and newer subdivisions use different equipment, and we work on both. Find your operator or opener brand below.",
  },
  {
    slug: "newhall",
    name: "Newhall",
    metaTitle: "Newhall Gate Repair | Iron Gates, Ranch Gates & Garage Doors",
    metaDescription:
      "Newhall gate and garage door repair for Old Town homes, Placerita Canyon and Circle J Ranch properties. Free on-site quote. Call or text now.",
    heroH1: "Newhall Gate Repair & Garage Doors",
    heroSubtitle:
      "Wrought iron gates near Old Town, ranch gates in Placerita Canyon and Circle J, and garage doors on homes of every age.",
    intro:
      "Newhall is the oldest part of Santa Clarita, and its gates show it. Around Old Town and the streets off Main Street you find older homes with ornamental iron and hand-built swing gates, while Placerita Canyon and the Circle J Ranch neighborhood have horse-keeping lots with wide gates set far back from the road.\n\nWe do a lot of [iron gate repair](/services/iron-gate-repair) here: hinge welding, post repair and straightening bent frames. On the ranch-style properties the work shifts to [gate openers](/services/gate-opener-repair) on heavy gates and keeping them reliable for trailers and livestock traffic.",
    whyUs: [
      { title: "Iron and welding", desc: "We repair older ornamental iron instead of pushing a full replacement." },
      { title: "Horse property gates", desc: "Wide, heavy ranch gates and their operators are familiar work in Placerita Canyon and Circle J." },
      { title: "Respect for older homes", desc: "We keep the character of an older Newhall entry while making it work right." },
    ],
    faq: [
      { q: "Can you repair an old wrought iron gate instead of replacing it?", a: "Often, yes. We weld broken hinges and joints, straighten frames and reset posts. We tell you on site if the metal is too far gone." },
      { q: "Do you work on gates in Placerita Canyon?", a: "Yes. We service ranch and driveway gates throughout Placerita Canyon and the Circle J area." },
      { q: "Can you add an opener to my existing manual gate?", a: "In many cases, yes. We check the gate's weight, hinges and posts first and tell you what the gate needs to run an operator safely." },
    ],
    extraKeywords: ["gate repair newhall", "iron gate repair newhall ca", "garage door repair newhall"],
    nearby: ["santa-clarita", "valencia", "stevenson-ranch", "canyon-country", "saugus"],
    install:
      "In Newhall a new gate often has to suit an older house or a horse property. We build and install [iron and ranch-style gates](/services/gate-installation) with posts set for the gate's weight, and fit [garage doors](/services/garage-door-installation) that suit older openings.",
    brandsHeading: "Gate operator brands we repair in Newhall",
    brandsIntro:
      "From a single swing gate in Old Town to a wide ranch gate in Placerita Canyon, Newhall operators come from many makers. Select yours below.",
  },
  {
    slug: "canyon-country",
    name: "Canyon Country",
    metaTitle: "Canyon Country Gate Repair | Hillside & Sand Canyon Gates",
    metaDescription:
      "Gate and garage door repair in Canyon Country: hillside driveways, Sand Canyon estates and Fair Oaks Ranch. Call or text for a free on-site quote.",
    heroH1: "Canyon Country Gate Repair",
    heroSubtitle:
      "Gates on steep driveways, large Sand Canyon lots and hillside neighborhoods like Fair Oaks Ranch, plus garage doors across the area.",
    intro:
      "Canyon Country is hillside country. Many driveways climb or drop from the street, and a gate on a slope works harder than one on flat ground. Slide gates have to resist rolling downhill, swing gates have to clear the grade, and operators carry more load on every cycle.\n\nIn Sand Canyon we see big estate and horse-property gates with long runs. Around Fair Oaks Ranch and the streets off Soledad Canyon Road it is more often HOA gates and garage doors. Common repairs include [gate motor replacement](/services/gate-motor-replacement), track and roller work on sloped slide gates, and [garage door repair](/services/garage-door-repair) on doors that face hard afternoon sun.",
    whyUs: [
      { title: "Slope-aware repairs", desc: "We set stops, rollers and operator force for gates that sit on a grade." },
      { title: "Estate and ranch gates", desc: "Long, heavy Sand Canyon gates are normal work for us." },
      { title: "One visit when possible", desc: "We stock the common operator parts so most repairs finish the same visit." },
    ],
    faq: [
      { q: "My slide gate is on a slope and keeps overrunning. Can you fix it?", a: "Yes. Gates on a grade need properly set stops, good rollers and correct operator settings. We check all three and correct what is wrong." },
      { q: "Do you service Sand Canyon properties?", a: "Yes. Sand Canyon estates and horse properties are a regular part of our work in Canyon Country." },
      { q: "Can my steep driveway support an automatic swing gate?", a: "Sometimes. It depends on how the ground falls across the swing path. We look at the site and recommend swing or slide based on what fits." },
    ],
    extraKeywords: ["gate repair canyon country", "hillside gate repair", "sand canyon gate repair"],
    nearby: ["santa-clarita", "saugus", "newhall", "agua-dulce", "acton"],
    install:
      "Installing on a Canyon Country hillside starts with the grade. We pick slide or swing based on how the driveway falls, size the [operator and gate](/services/gate-installation) for the slope, and fit [garage doors](/services/garage-door-installation) built for strong sun on west-facing fronts.",
    brandsHeading: "Canyon Country gate operator and opener brands",
    brandsIntro:
      "Hillside gates in Canyon Country need operators matched to the load, and we repair the brands built for that work. Find yours below.",
  },
  {
    slug: "stevenson-ranch",
    name: "Stevenson Ranch",
    metaTitle: "Stevenson Ranch Gate & Garage Door Repair | HOA Homes",
    metaDescription:
      "Gate and garage door repair in Stevenson Ranch's master-planned, HOA neighborhoods. Openers, springs and gates. Free on-site quote. Call or text.",
    heroH1: "Stevenson Ranch Gate & Garage Door Repair",
    heroSubtitle:
      "Repairs for the master-planned streets west of the 5, done to match your HOA's standards.",
    intro:
      "Stevenson Ranch is a master-planned community, built in phases on the hills west of Interstate 5 along Pico Canyon Road. Most homes share an HOA, which means garage doors and gates follow approved styles and colors, and repairs need to keep the street looking uniform.\n\nMany homes here are on sloped streets, so driveways tilt and garage doors take extra strain on one side. Our usual Stevenson Ranch work is [opener repair](/services/garage-door-opener-repair), spring replacement, off-track doors and [automatic gate repair](/services/automatic-gate-repair) on private and side-yard gates.",
    whyUs: [
      { title: "HOA style match", desc: "Panels and visible hardware are matched to your community's approved look." },
      { title: "Quiet, clean work", desc: "We protect your driveway and garage and clean up before we leave." },
      { title: "Openers and springs", desc: "These are the most common Stevenson Ranch calls, and we carry the parts." },
    ],
    faq: [
      { q: "Does my Stevenson Ranch HOA need to approve a garage door repair?", a: "Not usually for springs, cables or openers. If a visible panel or the whole door is replaced, check with your HOA. We can provide the details they ask for." },
      { q: "Why does my garage door close crooked?", a: "On sloped driveways a door can sit uneven, and worn cables or springs make it worse. We inspect the door and correct the cause." },
      { q: "Do you fix smaller side-yard and pedestrian gates?", a: "Yes. We repair latches, hinges and closers on side-yard gates as well as driveway gates." },
    ],
    extraKeywords: ["stevenson ranch garage door repair", "gate repair stevenson ranch", "hoa garage door stevenson ranch"],
    nearby: ["valencia", "newhall", "santa-clarita", "castaic"],
    install:
      "Stevenson Ranch installs follow the HOA's approved designs. We help you choose a [garage door](/services/garage-door-installation) or [gate](/services/gate-installation) your association will accept and set it up for the slope of your driveway.",
    brandsHeading: "Brands we service in Stevenson Ranch",
    brandsIntro:
      "Stevenson Ranch homes were built in phases, so openers and operators vary from street to street. Choose the brand on yours.",
  },
  {
    slug: "castaic",
    name: "Castaic",
    metaTitle: "Castaic Gate Repair | Hillside Driveways & Hasley Canyon",
    metaDescription:
      "Gate and garage door repair in Castaic: hillside driveways, Hasley Canyon horse properties and homes near the lake. Call or text for a free on-site quote.",
    heroH1: "Gate Repair in Castaic",
    heroSubtitle:
      "Hillside driveway gates, horse-property gates in Hasley Canyon and garage doors in neighborhoods near Castaic Lake.",
    intro:
      "Castaic sits in the hills at the north end of the Santa Clarita Valley, and many homes here have driveways that rise steeply from the street. Gates on these grades put constant strain on hinges, tracks and operators. In Hasley Canyon and the larger lots off the canyon roads, horse properties add wide, heavy gates that need strong operators and solid posts.\n\nWe handle [driveway gate repair](/services/driveway-gate-repair) on sloped lots, operator replacement on ranch gates, and [garage door spring repair](/services/garage-door-spring-repair) for homes in the newer subdivisions near the lake and along the canyon roads.",
    whyUs: [
      { title: "Steep driveway gates", desc: "We set up gates and operators to run safely on Castaic's grades." },
      { title: "Ranch-size gates", desc: "Heavy Hasley Canyon gates get operators and posts sized for them." },
      { title: "Garage doors too", desc: "Springs, cables and openers for Castaic homes, on the same visit when you need both." },
    ],
    faq: [
      { q: "Do you work on horse property gates in Hasley Canyon?", a: "Yes. We repair and automate wide ranch gates there, including operators, hinges and posts." },
      { q: "My hillside gate struggles to close. What causes that?", a: "Usually the operator is undersized for the grade, the hinges are worn, or the gate has shifted. We find which it is and fix it." },
      { q: "Do you cover the neighborhoods near Castaic Lake?", a: "Yes. The neighborhoods around the lake and along the canyon roads are all part of our Castaic service area." },
    ],
    extraKeywords: ["castaic gate repair", "gate repair castaic ca", "garage door repair castaic"],
    nearby: ["val-verde", "valencia", "stevenson-ranch", "santa-clarita"],
    install:
      "A new gate in Castaic usually means a hillside or a horse lot. We plan the swing or slide around the grade, set posts for heavy [ranch and driveway gates](/services/gate-installation), and install [garage doors](/services/garage-door-installation) that suit homes in the hills.",
    brandsHeading: "Castaic gate operator brands we work on",
    brandsIntro:
      "Steep Castaic driveways and big ranch gates call for heavy-duty operators. We repair all the brands below.",
  },
  {
    slug: "val-verde",
    name: "Val Verde",
    metaTitle: "Val Verde Gate Repair | Rural Lots & Garage Doors",
    metaDescription:
      "Gate and garage door repair in Val Verde, CA: rural lots, hilly driveways and manual gates converted to automatic. Free on-site quote. Call or text.",
    heroH1: "Val Verde Gate & Garage Door Repair",
    heroSubtitle:
      "Gates and garage doors for Val Verde's hilly rural lots and quiet residential streets.",
    intro:
      "Val Verde is a small, hilly community west of Castaic with a mix of older homes and rural lots. Many properties sit on uneven ground with long or unpaved driveways, so gates face dust, washouts at the posts and hinges that wear unevenly.\n\nWe repair manual and [automatic gates](/services/automatic-gate-repair), reset leaning posts, and convert manual gates to automatic where the gate and posts can handle it. For homes, we cover [garage door repair](/services/garage-door-repair) from broken springs to openers that stopped responding.",
    whyUs: [
      { title: "Rural property know-how", desc: "Uneven ground and dirt driveways are part of the job here, and we plan for them." },
      { title: "Manual to automatic", desc: "We check whether your gate can take an operator before we suggest one." },
      { title: "Local service", desc: "Val Verde is part of our regular Santa Clarita Valley routes." },
    ],
    faq: [
      { q: "Can you automate a gate on a dirt driveway?", a: "Yes, in many cases. We check post stability, the gate's weight and how the ground runs across the opening, then recommend the right setup." },
      { q: "My gate post is leaning. Is that a repair you do?", a: "Yes. We reset and reinforce posts so the gate hangs and latches properly." },
      { q: "Do you repair garage doors in Val Verde?", a: "Yes. Springs, cables, rollers and openers are all part of our work here." },
    ],
    extraKeywords: ["val verde gate repair", "gate repair val verde ca", "garage door repair val verde"],
    nearby: ["castaic", "valencia", "stevenson-ranch"],
    install:
      "For Val Verde's rural lots, a new gate starts with solid posts and a path that suits the ground. We install [manual or automatic gates](/services/gate-installation) built for dirt driveways, and [garage doors](/services/garage-door-installation) for homes of every age.",
    brandsHeading: "Operator brands we repair in Val Verde",
    brandsIntro:
      "Val Verde gates run on everything from simple swing operators to heavy slide units. Pick your brand below.",
  },
  {
    slug: "agua-dulce",
    name: "Agua Dulce",
    metaTitle: "Agua Dulce Gate Repair | Ranch Gates & Long Driveways",
    metaDescription:
      "Ranch gate and operator repair in Agua Dulce: horse properties, long driveways and solar gate openers. Free on-site quote. Call or text today.",
    heroH1: "Agua Dulce Ranch & Driveway Gate Repair",
    heroSubtitle:
      "Horse-property gates, long ranch driveways and solar-powered operators across Agua Dulce.",
    intro:
      "Agua Dulce is horse country. Properties are large, driveways run a long way from the road to the house, and the main gate often sits out at the property line, far from any power. That is why so many gates here run on [solar or battery operators](/services/gate-opener-repair), and why a weak battery or a dusty solar panel is one of the most common reasons a gate stops working.\n\nWe repair wide ranch gates, operators that struggle with heavy pipe or iron frames, and gate keypads and remotes that have to reach a long way. Dust and grit from dirt driveways also wear rollers and hinges, so we check those on every visit.",
    whyUs: [
      { title: "Solar gate experience", desc: "We test panels, batteries and chargers, not just the motor." },
      { title: "Built for ranch gates", desc: "Wide, heavy gates for trailers and livestock are our everyday work here." },
      { title: "Long-range access", desc: "We set up keypads and remotes that work at the end of a long driveway." },
    ],
    faq: [
      { q: "My solar gate stops working in the evening. Can you fix it?", a: "Yes. That pattern usually points to the battery, the solar panel or the charger. We test each part and replace what has failed." },
      { q: "Can you automate a wide ranch gate for horse trailers?", a: "Yes. We size the operator and hinges for the gate's width and weight and set it to open fully for trailer traffic." },
      { q: "Do you come out to properties at the end of long dirt roads?", a: "Yes. Remote Agua Dulce properties are a normal part of our service area." },
    ],
    extraKeywords: ["agua dulce gate repair", "ranch gate repair agua dulce", "solar gate opener repair"],
    nearby: ["acton", "canyon-country", "santa-clarita"],
    install:
      "Agua Dulce installs are often ranch gates set far from the house. We install wide [driveway and ranch gates](/services/gate-installation) with solar or hard-wired operators, set up access that works at the property line, and fit [garage doors](/services/garage-door-installation) for barns, shops and homes.",
    brandsHeading: "Gate operator brands on Agua Dulce ranch properties",
    brandsIntro:
      "Ranch gates in Agua Dulce need operators that handle weight, distance and solar power. These are the brands we repair.",
  },
  {
    slug: "acton",
    name: "Acton",
    metaTitle: "Acton Gate Repair | Horse Property & Ranch Gate Operators",
    metaDescription:
      "Gate and garage door repair in Acton, CA for horse properties, ranches and long driveways. Operators, posts and openers. Free on-site quote.",
    heroH1: "Acton Gate Repair for Ranches & Horse Properties",
    heroSubtitle:
      "Ranch gates, long driveways and garage doors on Acton's large rural properties.",
    intro:
      "Acton sits high in the hills along the 14, and its large lots are home to horse properties, small ranches and long private driveways. Gates here are often wide pipe or iron ranch gates that see trailer, truck and livestock traffic, and they sit exposed to wind, dust and cold winter nights.\n\nWide swing gates catch the wind like a sail, which loads hinges and operators. Cold mornings can also slow batteries in solar setups. We repair [gate operators](/services/gate-opener-repair), replace worn hinges and posts, and handle [garage door repair](/services/garage-door-repair) for homes, barns and shops.",
    whyUs: [
      { title: "Wind-ready setups", desc: "We check hinge strength and operator settings on gates that face Acton's wind." },
      { title: "Ranch gate repairs", desc: "Heavy-duty operators, posts and hinges for wide gates are routine for us." },
      { title: "Barns and shops", desc: "We also service roll-up and sectional doors on outbuildings." },
    ],
    faq: [
      { q: "Wind keeps pushing my swing gate. What can you do?", a: "We check the hinges, the operator's force settings and the gate stop, and recommend a fix suited to how exposed the gate is." },
      { q: "Do you repair doors on barns and workshops?", a: "Yes. We service roll-up and sectional doors on outbuildings as well as homes." },
      { q: "Is my solar gate a problem in cold weather?", a: "Batteries lose some capacity in the cold. We test the battery and charging system and replace what is no longer holding up." },
    ],
    extraKeywords: ["acton gate repair", "horse property gate acton", "ranch gate operator acton ca"],
    nearby: ["agua-dulce", "canyon-country", "palmdale", "littlerock"],
    install:
      "For Acton ranches and horse properties we install wide [ranch and driveway gates](/services/gate-installation) with posts and hinges built for wind, operators sized for heavy frames, and [garage and shop doors](/services/garage-door-installation) for homes and outbuildings.",
    brandsHeading: "Acton gate operator and opener brands",
    brandsIntro:
      "Acton's ranch gates and outbuildings use many different operators and openers. Find yours below to see what we can repair.",
  },
  {
    slug: "palmdale",
    name: "Palmdale",
    metaTitle: "Palmdale Gate Repair | High Desert Gates & Garage Doors",
    metaDescription:
      "Palmdale gate and garage door repair built for high desert heat, wind and sand. Operators, springs, slide gate tracks. Call or text for a free on-site quote.",
    heroH1: "Palmdale Gate & Garage Door Repair",
    heroSubtitle:
      "High desert heat, wind and blowing sand wear gates and doors faster. We repair them across Palmdale.",
    intro:
      "Palmdale's high desert climate is hard on gates and garage doors. Summer heat bakes operator electronics and batteries, strong afternoon wind pushes against swing gates, and blowing sand settles in [slide gate tracks](/services/driveway-gate-repair) and grinds down rollers and wheels.\n\nGarage doors take a beating too. Big temperature swings wear springs faster, and heat breaks down weatherstripping and opener parts. We see this in Rancho Vista, Anaverde, Desert View Highlands and the larger lots on the east side. Typical calls are [gate motor replacement](/services/gate-motor-replacement), spring and opener repair, and clearing and repairing sand-packed tracks.",
    whyUs: [
      { title: "Desert-tested repairs", desc: "We choose parts and settings that hold up to heat, wind and sand." },
      { title: "Slide gate track work", desc: "We clear sand-packed tracks and replace worn wheels and rollers." },
      { title: "Springs and openers", desc: "Heat-worn springs and openers are some of our most common Palmdale repairs." },
    ],
    faq: [
      { q: "Why do gate operators wear out faster in Palmdale?", a: "Heat, dust and wind all add strain. Electronics and batteries run hot and moving parts collect grit. We repair or replace the worn parts and set the operator up for local conditions." },
      { q: "My slide gate grinds and sticks. Is that the sand?", a: "Often, yes. Sand packs into the track and wears the wheels. We clean the track, replace worn wheels and check the operator." },
      { q: "Do garage door springs really break more often here?", a: "They do wear faster with daily temperature swings. We replace springs sized to your door so it balances correctly." },
    ],
    extraKeywords: ["palmdale gate repair", "garage door repair palmdale", "gate operator repair palmdale"],
    nearby: ["lancaster", "quartz-hill", "littlerock", "leona-valley", "acton"],
    install:
      "In Palmdale a new gate or door has to handle desert conditions. We install [slide and swing gates](/services/gate-installation) with track and hinge setups that cope with sand and wind, and [insulated garage doors](/services/garage-door-installation) that keep a hot garage cooler.",
    brandsHeading: "Palmdale gate and garage door brands we repair",
    brandsIntro:
      "Desert heat is hard on every brand of operator and opener, and we repair them all in Palmdale. Pick yours.",
  },
  {
    slug: "lancaster",
    name: "Lancaster",
    metaTitle: "Lancaster Gate Repair | Wind, Sand & Desert Heat",
    metaDescription:
      "Gate and garage door repair in Lancaster, CA. Wind-loaded swing gates, sand in slide tracks, heat-worn springs and openers. Free on-site quote.",
    heroH1: "Gate Repair in Lancaster",
    heroSubtitle:
      "Gates and garage doors that face Antelope Valley wind, sand and summer heat every day.",
    intro:
      "Lancaster is one of the windiest places we work. Strong wind loads tall swing gates and solid panels, wearing hinges and straining operators, and it drives sand into slide tracks and gate rollers. Summer heat adds to the wear on operator boards, batteries and garage door springs.\n\nOur Lancaster work runs from west side homes with sectional garage doors to larger east side lots with long driveways and horse setups. Common jobs are [electric gate repair](/services/electric-gate-repair), hinge and post repair on wind-worn swing gates, and [garage door spring](/services/garage-door-spring-repair) and opener replacement.",
    whyUs: [
      { title: "Wind-worn gates", desc: "We repair hinges, posts and operator arms on gates that fight the wind." },
      { title: "Sand and grit", desc: "We clear and repair tracks, rollers and wheels worn down by blowing sand." },
      { title: "Homes and larger lots", desc: "From west side homes to east side acreage, we cover all of Lancaster." },
    ],
    faq: [
      { q: "The wind keeps opening or slamming my gate. Can you fix that?", a: "Yes. We check the operator's force and stop settings, the latch and the hinges, and correct what lets the wind move the gate." },
      { q: "Do you repair gates on larger east Lancaster properties?", a: "Yes. Long driveways and wide gates on larger lots are a regular part of our Lancaster work." },
      { q: "Why does my garage door opener struggle in summer?", a: "Heat can stress the motor and electronics, and worn springs make the opener work harder. We check both." },
    ],
    extraKeywords: ["lancaster gate repair", "garage door repair lancaster ca", "electric gate repair lancaster"],
    nearby: ["palmdale", "quartz-hill", "leona-valley", "lake-hughes"],
    install:
      "Lancaster installs are planned around the wind. We often suggest [slide gates or open designs](/services/gate-installation) that catch less wind than solid swing gates, set posts deep enough for the load, and install [garage doors](/services/garage-door-installation) with wind-rated hardware where you need it.",
    brandsHeading: "Gate operator and opener brands in Lancaster",
    brandsIntro:
      "Lancaster wind tests every operator and opener brand. We repair each of these, whatever condition the wind left it in.",
  },
  {
    slug: "quartz-hill",
    name: "Quartz Hill",
    metaTitle: "Quartz Hill Gate Repair | Large Lots & Garage Doors",
    metaDescription:
      "Gate and garage door repair in Quartz Hill, CA for large lots, horse-friendly properties and long driveways. Call or text for a free on-site quote.",
    heroH1: "Quartz Hill Gate & Garage Door Repair",
    heroSubtitle:
      "Gates, operators and garage doors for Quartz Hill's larger lots and quiet residential streets.",
    intro:
      "Quartz Hill sits on the west side of the Lancaster and Palmdale area, with larger lots than you find in town and plenty of homes set back on long driveways. Many properties keep horses or have room for RVs and trailers, so gates tend to be wide and operators work hard.\n\nThe high desert conditions apply here too: wind, sand and summer heat. We repair [automatic gate operators](/services/automatic-gate-repair), worn slide gate wheels, and keypads and remotes, and we cover [garage door opener repair](/services/garage-door-opener-repair) and springs for homes across the community.",
    whyUs: [
      { title: "Wide-gate know-how", desc: "RV and trailer gates need the right operator, and we size it properly." },
      { title: "Desert wear repairs", desc: "We fix the sand, heat and wind damage common on Quartz Hill properties." },
      { title: "Garage doors handled", desc: "Springs, openers and off-track doors, on the same trip if needed." },
    ],
    faq: [
      { q: "Can you automate an RV gate?", a: "Yes. We look at the gate's width and weight and the ground it travels over, then recommend a slide or swing operator that fits." },
      { q: "Do you service horse properties in Quartz Hill?", a: "Yes. We repair and automate gates on horse-friendly lots throughout Quartz Hill." },
      { q: "My gate remote only works up close. Why?", a: "It can be the remote battery, the receiver or the antenna placement. We test the system and fix the range problem." },
    ],
    extraKeywords: ["quartz hill gate repair", "garage door repair quartz hill", "rv gate operator quartz hill"],
    nearby: ["lancaster", "palmdale", "leona-valley"],
    install:
      "Quartz Hill lots have room for wide RV and trailer gates. We install [slide or swing gates](/services/gate-installation) sized for the opening, with operators built for desert wind and sand, and [garage doors](/services/garage-door-installation) that suit the house.",
    brandsHeading: "Brands we repair in Quartz Hill",
    brandsIntro:
      "Quartz Hill's wide gates and family garages use a range of operators and openers. Choose yours below.",
  },
  {
    slug: "littlerock",
    name: "Littlerock",
    metaTitle: "Littlerock Gate Repair | Rural Gates & Garage Doors",
    metaDescription:
      "Gate and garage door repair in Littlerock, CA. Rural lots, sand-worn slide gates and solar operators. Free on-site quote. Call or text today.",
    heroH1: "Littlerock Gate Repair",
    heroSubtitle:
      "Rural property gates, solar operators and garage doors along Pearblossom Highway and the streets around Littlerock.",
    intro:
      "Littlerock is a rural community east of Palmdale, known for its orchards and fruit stands along Pearblossom Highway. Properties are large, driveways are often dirt or gravel, and gates are exposed to sand, wind and strong sun all year.\n\nSand in slide tracks and grit in hinges are the most common causes of gate trouble here, followed by solar operators whose batteries no longer hold a charge. We repair [gate openers](/services/gate-opener-repair), tracks, wheels and hinges, and we cover [garage door repair](/services/garage-door-repair) for homes and outbuildings.",
    whyUs: [
      { title: "Rural property service", desc: "Large lots and dirt driveways are normal work for us." },
      { title: "Solar operator repairs", desc: "We test and replace batteries, panels and chargers." },
      { title: "Sand damage fixed", desc: "We clear tracks and replace worn wheels, rollers and hinges." },
    ],
    faq: [
      { q: "Do you service gates on large rural lots in Littlerock?", a: "Yes. Rural properties with long driveways are a regular part of our Littlerock work." },
      { q: "My solar gate opens slowly. What is wrong?", a: "A slow gate usually means a weak battery or not enough charge. We test the full solar system and replace the parts that have worn out." },
      { q: "Can you repair the door on my shop or barn?", a: "Yes. We work on roll-up and sectional doors on outbuildings as well as home garage doors." },
    ],
    extraKeywords: ["littlerock gate repair", "gate repair littlerock ca", "solar gate repair littlerock"],
    nearby: ["palmdale", "sun-village", "pearblossom", "acton"],
    install:
      "For Littlerock's rural lots we install [driveway and ranch gates](/services/gate-installation) with solar operators where there is no power at the gate, set tracks and hinges to handle sand, and fit [garage and shop doors](/services/garage-door-installation).",
    brandsHeading: "Littlerock gate operator brands",
    brandsIntro:
      "Littlerock gates run on solar and hard-wired operators from many makers. We repair the brands below.",
  },
  {
    slug: "leona-valley",
    name: "Leona Valley",
    metaTitle: "Leona Valley Gate Repair | Ranch & Horse Property Gates",
    metaDescription:
      "Ranch and driveway gate repair in Leona Valley: horse properties, long driveways and solar operators. Free on-site quote. Call or text now.",
    heroH1: "Leona Valley Gate Repair",
    heroSubtitle:
      "Ranch gates, horse properties and long driveways along Elizabeth Lake Road and through the valley.",
    intro:
      "Leona Valley is a quiet rural valley west of Palmdale, with horse ranches, orchards and homes set well back from Elizabeth Lake Road. Long ranch driveways mean the main gate often sits far from the house, so many owners rely on [solar operators](/services/gate-opener-repair) and long-range remotes or keypads.\n\nWide pipe and iron ranch gates are common, and they need strong hinges and operators to handle the weight, the wind that funnels through the valley, and constant use by trucks and trailers. We repair operators, posts, hinges and access controls, and handle [garage door repair](/services/garage-door-repair) for homes and barns.",
    whyUs: [
      { title: "Ranch gate focus", desc: "Wide, heavy gates on horse properties are what we do here." },
      { title: "Solar and access", desc: "We repair solar systems, keypads and remotes on long driveways." },
      { title: "Barns and homes", desc: "Garage, barn and shop doors are part of the same service." },
    ],
    faq: [
      { q: "Do you repair horse ranch gates in Leona Valley?", a: "Yes. We repair and automate wide ranch gates, including operators, hinges and posts." },
      { q: "Can you set up a keypad at a gate far from my house?", a: "Yes. We install and repair keypads, receivers and remotes that work at the end of a long driveway." },
      { q: "Do you service garage and barn doors here?", a: "Yes. We repair sectional and roll-up doors on homes, barns and shops." },
    ],
    extraKeywords: ["leona valley gate repair", "ranch gate repair leona valley", "horse property gate leona valley"],
    nearby: ["palmdale", "lancaster", "quartz-hill", "lake-elizabeth"],
    install:
      "Leona Valley installs are usually ranch gates at the end of a long driveway. We install [wide ranch and driveway gates](/services/gate-installation) with solar or hard-wired operators and keypads at the road, plus [garage and barn doors](/services/garage-door-installation).",
    brandsHeading: "Gate operator brands on Leona Valley ranches",
    brandsIntro:
      "Leona Valley ranch gates use operators built for weight and distance. These are the brands we repair.",
  },
  {
    slug: "lake-hughes",
    name: "Lake Hughes",
    metaTitle: "Lake Hughes Gate Repair | Mountain Homes & Garage Doors",
    metaDescription:
      "Gate and garage door repair in Lake Hughes, CA for mountain homes, steep driveways and cold winters. Free on-site quote. Call or text today.",
    heroH1: "Lake Hughes Gate & Garage Door Repair",
    heroSubtitle:
      "Gates and garage doors for Lake Hughes mountain homes, cabins and steep driveways.",
    intro:
      "Lake Hughes is a small mountain community at the edge of the national forest, higher and cooler than the valley floor. Winters can be cold enough to slow operator batteries and stiffen garage door parts, and many driveways are steep and winding.\n\nWe repair [gate operators](/services/gate-opener-repair) that struggle in the cold, swing and slide gates on steep ground, and [garage doors](/services/garage-door-repair) on homes and cabins, including springs, cables and openers.",
    whyUs: [
      { title: "Mountain conditions", desc: "We set up gates and doors to run reliably through cold winters." },
      { title: "Steep driveway gates", desc: "Gates on grades get the right stops, hinges and operator settings." },
      { title: "Cabins and homes", desc: "We service full-time homes and weekend cabins alike." },
    ],
    faq: [
      { q: "Why does my gate act up on cold mornings?", a: "Cold reduces battery capacity and can stiffen moving parts. We test the battery and operator and replace what is no longer reliable." },
      { q: "Do you service cabins that are not lived in full time?", a: "Yes. We can arrange a visit around your schedule and explain what we found." },
      { q: "Do you repair garage doors in Lake Hughes?", a: "Yes. Springs, cables and openers on homes and cabins are part of our service here." },
    ],
    extraKeywords: ["lake hughes gate repair", "garage door repair lake hughes", "mountain gate repair"],
    nearby: ["lake-elizabeth", "leona-valley", "green-valley", "lancaster"],
    install:
      "In Lake Hughes a new gate or door has to work in the cold and on steep ground. We install [gates](/services/gate-installation) planned around the slope with operators that suit mountain winters, and [insulated garage doors](/services/garage-door-installation) for homes and cabins.",
    brandsHeading: "Brands we repair in Lake Hughes",
    brandsIntro:
      "Mountain homes in Lake Hughes use a mix of operators and openers. Find your brand below.",
  },
  {
    slug: "lake-elizabeth",
    name: "Lake Elizabeth",
    metaTitle: "Lake Elizabeth Gate Repair | Rural & Lakeside Homes",
    metaDescription:
      "Gate and garage door repair in Lake Elizabeth, CA for rural and lakeside homes, ranch gates and garage doors. Free on-site quote. Call or text.",
    heroH1: "Gate Repair in Lake Elizabeth",
    heroSubtitle:
      "Rural gates, lakeside homes and garage doors around Lake Elizabeth and Elizabeth Lake Road.",
    intro:
      "Lake Elizabeth is a small lakeside community in the hills between Leona Valley and Lake Hughes. Homes sit on rural lots with gravel driveways and wide gates, and the higher elevation brings colder winters than the valley below.\n\nWe repair [driveway gates](/services/driveway-gate-repair) and ranch gates, solar and hard-wired operators, and access keypads, and we handle [garage door spring repair](/services/garage-door-spring-repair) and opener work for homes around the lake.",
    whyUs: [
      { title: "Rural gate repairs", desc: "Gravel driveways and wide gates are normal work for us." },
      { title: "Cold-weather setups", desc: "We check batteries and operators so gates work through winter." },
      { title: "Doors and gates", desc: "One visit can cover both your gate and your garage door." },
    ],
    faq: [
      { q: "Do you come out to Lake Elizabeth?", a: "Yes. Lake Elizabeth is part of our Antelope Valley service area." },
      { q: "Can you repair a solar gate on a rural lot?", a: "Yes. We test panels, batteries and chargers and replace failed parts." },
      { q: "Do you repair garage door springs here?", a: "Yes. We replace broken or worn springs sized to your door." },
    ],
    extraKeywords: ["lake elizabeth gate repair", "gate repair lake elizabeth ca", "garage door repair lake elizabeth"],
    nearby: ["lake-hughes", "leona-valley", "green-valley"],
    install:
      "For Lake Elizabeth's rural lots we install [driveway and ranch gates](/services/gate-installation) with operators suited to cold winters and gravel drives, and [garage doors](/services/garage-door-installation) for lakeside homes.",
    brandsHeading: "Lake Elizabeth gate and opener brands",
    brandsIntro:
      "Gates and garage doors around Lake Elizabeth run on many different brands. Select yours below.",
  },
  {
    slug: "green-valley",
    name: "Green Valley",
    metaTitle: "Green Valley, CA Gate Repair | Mountain & Rural Homes",
    metaDescription:
      "Gate and garage door repair in Green Valley, CA for mountain homes, oak-shaded lots and steep driveways. Free on-site quote. Call or text.",
    heroH1: "Green Valley Gate & Garage Door Repair",
    heroSubtitle:
      "Gates and garage doors for Green Valley's rural mountain homes between Bouquet and San Francisquito Canyons.",
    intro:
      "Green Valley is a small mountain community tucked between Bouquet Canyon and San Francisquito Canyon. Homes sit on rural, often oak-shaded lots with winding, steep driveways, and the higher elevation brings cold winters.\n\nShade from the oaks can keep solar panels from fully charging a gate battery, and fallen leaves and debris collect in tracks and around sensors. We repair [gate operators](/services/gate-opener-repair), solar systems, swing and slide gates on slopes, and [garage doors](/services/garage-door-repair) on homes across the community.",
    whyUs: [
      { title: "Shade-aware solar", desc: "We check panel placement and charging when trees block the sun." },
      { title: "Slope experience", desc: "We set up gates to run safely on steep, winding drives." },
      { title: "Homes and cabins", desc: "Garage doors and gates on full-time homes and getaways." },
    ],
    faq: [
      { q: "My solar gate dies in winter. Is it the trees?", a: "It can be. Shade and short days reduce charging. We test the system and recommend a fix, such as moving the panel or adding capacity." },
      { q: "Do you repair gates on steep driveways in Green Valley?", a: "Yes. We adjust stops, hinges and operator settings for gates on a grade." },
      { q: "Do you also repair garage doors?", a: "Yes. Springs, cables and openers are part of our Green Valley service." },
    ],
    extraKeywords: ["green valley ca gate repair", "garage door repair green valley ca", "solar gate repair green valley"],
    nearby: ["saugus", "lake-elizabeth", "lake-hughes"],
    install:
      "Green Valley installs are planned around steep drives and shade. We place [gates and operators](/services/gate-installation) so solar panels get sun and the gate suits the slope, and install [garage doors](/services/garage-door-installation) for mountain homes.",
    brandsHeading: "Green Valley gate and door makers we work on",
    brandsIntro:
      "Green Valley's mountain homes use a range of gate and door equipment. Choose your brand below.",
  },
  {
    slug: "sun-village",
    name: "Sun Village",
    metaTitle: "Sun Village Gate Repair | Desert Lots & Garage Doors",
    metaDescription:
      "Gate and garage door repair in Sun Village, CA. Desert lots, sand-worn slide gates, heat-worn springs and openers. Free on-site quote.",
    heroH1: "Sun Village Gate & Garage Door Repair",
    heroSubtitle:
      "Gates and garage doors on Sun Village's open desert lots, where sand, wind and heat do the most damage.",
    intro:
      "Sun Village is a rural community on the east side of the Palmdale area, with open desert lots, dirt roads and plenty of room for gates, RVs and outbuildings. Blowing sand, wind and summer heat wear down gates and doors faster than in town.\n\nWe clear and repair [slide gate tracks](/services/driveway-gate-repair) packed with sand, replace worn wheels and rollers, repair operators that have suffered in the heat, and handle [garage door springs](/services/garage-door-spring-repair) and openers for homes and shops.",
    whyUs: [
      { title: "Desert lot repairs", desc: "We repair the sand, wind and heat damage common here." },
      { title: "Wide gate service", desc: "RV and equipment gates get operators sized for them." },
      { title: "Homes and shops", desc: "Garage and shop doors are part of the same visit." },
    ],
    faq: [
      { q: "Do you service Sun Village properties on dirt roads?", a: "Yes. Rural desert lots are a regular part of our service area." },
      { q: "My slide gate keeps jamming. Can you fix it?", a: "Yes. Sand in the track is a common cause. We clean the track, replace worn wheels and check the operator." },
      { q: "Can you repair the door on my shop?", a: "Yes. We service roll-up and sectional doors on shops and garages." },
    ],
    extraKeywords: ["sun village gate repair", "garage door repair sun village", "slide gate repair sun village"],
    nearby: ["littlerock", "palmdale", "pearblossom"],
    install:
      "For Sun Village's open lots we install [slide and swing gates](/services/gate-installation) built to handle sand and wind, including wide RV and equipment gates, and [garage and shop doors](/services/garage-door-installation).",
    brandsHeading: "Sun Village gate and garage door brands",
    brandsIntro:
      "We repair every operator and opener brand on Sun Village's homes, shops and wide gates. Pick yours below.",
  },
  {
    slug: "pearblossom",
    name: "Pearblossom",
    metaTitle: "Pearblossom Gate Repair | Rural Desert Gates",
    metaDescription:
      "Gate and garage door repair in Pearblossom, CA for rural desert properties, long driveways and solar gate operators. Free on-site quote.",
    heroH1: "Pearblossom Gate Repair",
    heroSubtitle:
      "Rural gates, long driveways and solar operators on Pearblossom's desert properties.",
    intro:
      "Pearblossom is a rural desert community along Pearblossom Highway, with large parcels, Joshua trees and long driveways out to the road. Many gates sit far from power, so solar operators are common, and sand, wind and summer heat all take their toll.\n\nWe repair [solar gate operators](/services/gate-opener-repair) and batteries, sand-worn tracks and wheels, and wind-worn hinges and posts. For homes and outbuildings we handle [garage door repair](/services/garage-door-repair), from springs to openers.",
    whyUs: [
      { title: "Solar specialists", desc: "We test the full solar setup, not just the motor." },
      { title: "Long driveway access", desc: "Keypads and remotes that work far from the house." },
      { title: "Desert-ready repairs", desc: "Parts and settings chosen for sand, wind and heat." },
    ],
    faq: [
      { q: "Do you service remote Pearblossom properties?", a: "Yes. Large rural parcels are a regular part of our Antelope Valley work." },
      { q: "My solar gate battery keeps dying. Can you help?", a: "Yes. We test the battery, panel and charger and replace what is no longer holding a charge." },
      { q: "Do you repair garage doors in Pearblossom?", a: "Yes. Springs, cables and openers for homes and outbuildings." },
    ],
    extraKeywords: ["pearblossom gate repair", "solar gate repair pearblossom", "garage door repair pearblossom"],
    nearby: ["littlerock", "sun-village", "palmdale"],
    install:
      "Pearblossom installs often start with no power at the gate. We install [driveway and ranch gates](/services/gate-installation) with solar operators, keypads at the road and hardware built for sand and wind, plus [garage and shop doors](/services/garage-door-installation).",
    brandsHeading: "Gate operator brands we repair in Pearblossom",
    brandsIntro:
      "Solar and hard-wired operators from these makers run Pearblossom's desert gates. Select yours.",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
