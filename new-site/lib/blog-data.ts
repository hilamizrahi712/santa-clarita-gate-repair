import { IMAGES } from "@/lib/images";

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  publishDate: string;
  readTime: string;
  category: "gate" | "garage-door";
  excerpt: string;
  content: string;
  img?: string;
  updatedAt?: string;
  pricingDisclaimer?: string;
  faq?: { q: string; a: string }[];
}

// Santa Clarita / Antelope Valley topics only. No DIY steps, no prices.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "high-desert-wind-sand-slide-gates",
    title: "Why Wind and Sand Are Hard on Slide Gates in Palmdale and Lancaster",
    metaTitle: "Wind, Sand and Slide Gates in Palmdale & Lancaster",
    metaDescription:
      "How Antelope Valley wind and blowing sand wear out slide gate wheels, tracks and operators, the warning signs to watch for, and when to call a technician.",
    primaryKeyword: "slide gate repair palmdale",
    publishDate: "2026-10-21",
    readTime: "4 min read",
    category: "gate",
    img: IMAGES.services["driveway-gate-repair"],
    excerpt:
      "Antelope Valley wind pushes on every gate and fills every track with grit. Here is what that does to a slide gate over time, and the signs that yours needs attention.",
    content: `Anyone who has lived through a spring in Palmdale or Lancaster knows the wind. It blows hard for days at a time, it carries fine sand off open lots, and it finds its way into every moving part on your property. Slide gates take more of that punishment than almost anything else outside the house.

## What the wind does to the gate itself

A solid gate acts like a sail. Every gust pushes the leaf sideways against its guide rollers, and the operator has to fight that pressure each time the gate moves. Over months, the guide rollers wear, the gate starts to lean, and the operator works harder than it was sized for. Open picket and slat designs let more air through, which is one reason we suggest them for new installs out here.

## What the sand does to the track

Most residential slide gates ride on V-groove wheels on a ground track. Sand settles into that groove after every windy day. The wheels roll over it, grind it in, and slowly wear flat spots into the wheels and the track. A gate with worn wheels gets rough and loud, and eventually it binds badly enough that the operator stops and reverses.

## Signs your slide gate needs a technician

✅ The gate scrapes, rumbles or hesitates along part of its travel
✅ The operator stops or reverses for no obvious reason, especially on windy days
✅ The gate leans or rocks in its guide rollers
✅ You can see flat spots or chips on the wheels
✅ The operator sounds strained, or the gate moves slower than it used to

## What we look at on a visit

We check the wheels, track, guide rollers and gate frame together, because one worn part puts stress on the others. We also look at the operator's sizing for your gate and your wind exposure, and at whether the track sits where sand collects. Sometimes a few worn parts are the whole story. On some properties, a cantilever gate that rides above the ground is the better long-term answer, and we explain the options before you decide.

If your slide gate in [Palmdale](/areas/palmdale), [Lancaster](/areas/lancaster) or [Quartz Hill](/areas/quartz-hill) is getting rough or unreliable, call or text us for a free on-site quote. See also our [driveway gate repair](/services/driveway-gate-repair) service.`,
    faq: [
      { q: "Is it the gate or the operator?", a: "Often it is both: a binding gate makes the operator strain and trip. We check the gate hardware first, then the operator." },
      { q: "Do you replace worn slide gate wheels?", a: "Yes. Wheels, tracks and guide rollers are common repairs on Antelope Valley slide gates." },
    ],
  },
  {
    slug: "solar-gate-openers-ranch-properties",
    title: "Solar Gate Openers on Ranch Properties in Agua Dulce and Acton",
    metaTitle: "Solar Gate Openers for Agua Dulce & Acton Ranches",
    metaDescription:
      "What makes solar gate openers work well on long ranch driveways in Agua Dulce, Acton and Leona Valley, and the problems that usually lead owners to call.",
    primaryKeyword: "solar gate opener agua dulce",
    publishDate: "2026-10-21",
    readTime: "4 min read",
    category: "gate",
    img: IMAGES.services["gate-opener-repair"],
    excerpt:
      "When the gate is a long way from the house, solar power often makes more sense than trenching a power line. Here is what makes a solar operator dependable on a ranch.",
    content: `On ranch and horse properties in Agua Dulce, Acton and Leona Valley, the front gate can sit hundreds of feet from the nearest outlet. Running power that far means trenching, conduit and a lot of digging through rocky ground. A solar-powered operator avoids most of that, and when it is set up right it is very reliable.

## What a solar gate system is made of

A solar setup has three parts that all have to be sized together: the panel that charges, the batteries that store the charge, and the operator that uses it. The gate's weight, how many times a day it opens, and how much sun the panel gets in December all decide what each part needs to be.

## Why solar gates stop working

Most solar gate calls we get come down to the power side, not the motor:

✅ Batteries that have aged and no longer hold a full day's charge
✅ A panel that is shaded part of the day, dusty, or facing the wrong way
✅ More daily cycles than the system was designed for, after a new horse trailer, a new tenant or a busier household
✅ Short winter days that drain the batteries faster than they recharge
✅ Loose or corroded wiring between the panel, batteries and board

The typical symptom is a gate that works fine in the afternoon and gets slow or stops by morning, or one that works all summer and starts failing in winter.

## Getting the most out of a ranch gate

Wide ranch gates are heavy, and trailers need the full opening every time. We size the operator for the actual gate, set exit sensors and keypads where a driver can reach them from a truck cab, and place the panel where it sees clear sun all year. When we repair a solar system, we test the panel output and battery health together so the fix lasts.

If your solar gate in [Agua Dulce](/areas/agua-dulce), [Acton](/areas/acton) or [Leona Valley](/areas/leona-valley) is getting unreliable, call or text us. For new ranch gates, see [gate installation](/services/gate-installation).`,
    faq: [
      { q: "Can an existing gate be converted to solar?", a: "Often, yes, if the gate and operator are suitable. We check the gate, the sun exposure and your daily use first." },
      { q: "How do I know if it is the batteries?", a: "A gate that slows down or quits after several cycles, or overnight, often points to the batteries. We test them on site." },
    ],
  },
  {
    slug: "hoa-approval-new-gate-garage-door-valencia",
    title: "Getting HOA Approval for a New Gate or Garage Door in Valencia",
    metaTitle: "HOA Approval for New Gates & Garage Doors in Valencia",
    metaDescription:
      "What Valencia and Stevenson Ranch HOAs usually ask for before a new gate or garage door goes in, and how we help you put the approval package together.",
    primaryKeyword: "hoa gate approval valencia",
    publishDate: "2026-10-21",
    readTime: "3 min read",
    category: "gate",
    img: IMAGES.services["gate-installation"],
    excerpt:
      "In most of Valencia and Stevenson Ranch, a new gate or garage door needs the association's sign-off first. Here is what committees usually want to see.",
    content: `Valencia, Stevenson Ranch and the newer tracts around Saugus and Castaic were built as planned communities, and most of them have architectural rules. Anything that changes how your home looks from the street, including a new driveway gate or a new garage door, usually needs approval from the HOA's architectural committee before work starts.

## What committees usually ask for

Every association is different, but most requests need some combination of:

✅ A drawing or photo showing what the gate or door will look like
✅ Dimensions: height, width and where it sits on the lot
✅ Materials and finish, often matched to an approved color list
✅ A manufacturer brochure or catalog page for a garage door
✅ For gates, where the operator, keypad and posts will go

## How we help

During the free on-site visit we measure, photograph the opening and talk through styles that fit what your neighborhood already allows. We then give you the measurements, product details and drawings your committee needs, so you can submit a complete package. Once you have approval, we schedule the install.

## Matching what is already there

A lot of approvals go faster when the new gate or door matches an existing approved style on your street. For garage doors, that usually means the same panel design and color family. For gates, it often means matching the fence style and height used across the tract.

## Quiet equipment for close neighbors

Homes in these communities sit close together, and many have bedrooms over the garage. We use quiet operators and belt-drive or wall-mount openers so a new gate or door does not become a noise complaint.

Planning a project in [Valencia](/areas/valencia) or [Stevenson Ranch](/areas/stevenson-ranch)? Call or text for a free on-site quote, and see [gate installation](/services/gate-installation) and [garage door installation](/services/garage-door-installation).`,
    faq: [
      { q: "Do you submit the HOA application for me?", a: "You or your property manager submit it, and we provide the measurements, drawings and product details it needs." },
      { q: "Do repairs need HOA approval?", a: "Usually not, if the repair does not change how the gate or door looks. Replacing a visible panel or gate leaf may need approval." },
    ],
  },
  {
    slug: "summer-heat-garage-door-openers-santa-clarita",
    title: "What Santa Clarita Summer Heat Does to Your Garage Door and Opener",
    metaTitle: "Summer Heat and Garage Door Openers in Santa Clarita",
    metaDescription:
      "Triple-digit days in Santa Clarita and the Antelope Valley are hard on garage doors and openers. The common heat-related problems and when to call.",
    primaryKeyword: "garage door opener repair santa clarita",
    publishDate: "2026-10-21",
    readTime: "3 min read",
    category: "garage-door",
    img: IMAGES.services["garage-door-opener-repair"],
    excerpt:
      "A closed garage in Canyon Country or Lancaster can get very hot in August. Here is how that heat affects your opener, sensors and door, and the signs to watch for.",
    content: `Summer in Santa Clarita regularly pushes past 100 degrees, and the Antelope Valley often gets hotter. A closed garage with a west-facing door can get much hotter than that inside, and everything in it, including the garage door opener, works in that heat all afternoon.

## Openers and electronics

Opener circuit boards and motors are built to handle warm garages, but years of heat take a toll. Heat speeds up the aging of boards, capacitors and the plastic gears in many openers. Openers that start acting up in the summer, and then seem fine in winter, are often showing early signs of a failing part.

## Safety sensors in the sun

The photo eyes near the floor can be thrown off when low afternoon sun shines straight into one of them. The result is a door that refuses to close, or reverses, only at a certain time of day. A technician can check the sensors and their placement.

## The door itself

Steel doors expand in the heat, and dark doors facing the sun get very hot to the touch. Weatherseals dry out and crack after a few summers, which lets heat and dust in. An insulated door makes a noticeable difference in how hot the garage gets, especially if the garage is attached or used as a gym or workshop.

## Signs to call a technician

✅ The door reverses or refuses to close in the afternoon
✅ The opener hums or clicks but the door does not move
✅ The opener works on some days and not others
✅ Cracked or missing weatherseal along the bottom of the door
✅ The door is noisy or moves unevenly

Garage door springs and cables are under high tension, so leave those to a technician. If your opener in [Santa Clarita](/areas/santa-clarita), [Canyon Country](/areas/canyon-country) or [Lancaster](/areas/lancaster) is acting up, call or text us. More on [garage door opener repair](/services/garage-door-opener-repair).`,
    faq: [
      { q: "Is an insulated garage door worth it here?", a: "For attached garages and garages people spend time in, insulation makes a real difference in summer heat and winter cold." },
      { q: "Can heat cause the door to reverse?", a: "Sun shining into a safety sensor can make the door reverse at certain times of day. We check the sensors on site." },
    ],
  },
  {
    slug: "broken-garage-door-spring-what-to-do",
    title: "Heard a Bang in the Garage? What a Broken Spring Means",
    metaTitle: "Broken Garage Door Spring in Santa Clarita? What It Means",
    metaDescription:
      "A loud bang from the garage often means a broken garage door spring. What that means, why it is not a DIY job, and how we handle spring calls across SCV and the AV.",
    primaryKeyword: "broken garage door spring santa clarita",
    publishDate: "2026-10-21",
    readTime: "3 min read",
    category: "garage-door",
    img: IMAGES.services["garage-door-spring-repair"],
    excerpt:
      "A sudden bang from the garage, then a door that will not lift, usually means a spring has snapped. Here is what is going on and why it needs a technician.",
    content: `It usually happens at the worst moment: a loud bang from the garage, and then the door will not open, or the opener strains and lifts it only a few inches. In most cases a garage door spring has broken.

## What the springs do

A garage door is heavy, often well over 100 pounds. The springs do almost all the lifting; the opener only guides the door up and down. When a spring breaks, the opener is suddenly trying to lift the full weight of the door, which it was never built to do.

## Why this is not a DIY job

Garage door springs are wound under very high tension. Releasing, winding or replacing them without the right tools and training can cause serious injury. We strongly recommend not trying to force the door open with the opener, and not touching the springs, cables or bottom brackets yourself.

## Signs of a broken spring

✅ A loud bang from the garage when no one was near the door
✅ A visible gap in the coil of the spring above the door
✅ The door feels extremely heavy or will not lift
✅ The opener runs and strains but the door barely moves
✅ Cables hanging loose beside the door

## How we handle spring calls

We replace broken springs with springs matched to your door's weight and size, and in most cases replace both springs on a two-spring door so they wear evenly. We also check the cables, drums and rollers, which often wear at the same time, and test the door's balance before we leave. You get a written quote before any work starts.

If you are in [Saugus](/areas/saugus), [Newhall](/areas/newhall), [Palmdale](/areas/palmdale) or anywhere else we cover and a spring has gone, call or text us. See [garage door spring repair](/services/garage-door-spring-repair).`,
    faq: [
      { q: "Can I still use the door with a broken spring?", a: "We recommend not operating it. Running the opener with a broken spring can damage the opener and is unsafe." },
      { q: "Do you replace both springs?", a: "On two-spring doors we usually recommend replacing both, so they wear evenly. We explain why on site." },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
