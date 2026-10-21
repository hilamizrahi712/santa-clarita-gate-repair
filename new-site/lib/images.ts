// Every image slot on the site. Files live in public/images/ and come only from this site's own
// photos (SITE-BRIEF.md "Photos"); regenerate with `node scripts/convert-images.mjs`.
// Slots without a matching photo reuse one of these; see IMAGE-GAPS.md.

const P = {
  woodSteel: "/images/photos/wood-steel-sliding-gate-valencia.webp",
  woodSlatOperator: "/images/photos/wood-slat-slide-gate-operator-saugus.webp",
  blackSteel: "/images/photos/black-steel-slide-gate-stevenson-ranch.webp",
  bronzeSlat: "/images/photos/bronze-slat-slide-gate-canyon-country.webp",
  commercial: "/images/photos/commercial-iron-slide-gate-santa-clarita.webp",
  hillside: "/images/photos/hillside-slat-slide-gate-agua-dulce.webp",
  ornateIron: "/images/photos/ornate-iron-swing-gate-castaic.webp",
};

// Describes what is actually in each photo.
export const IMAGE_ALT: Record<string, string> = {
  [P.woodSteel]: "Dark steel and wood-panel sliding driveway gate with matching pedestrian gate and stone intercom pillar",
  [P.woodSlatOperator]: "Horizontal wood-slat slide gate in a black steel frame with its gate operator in front",
  [P.blackSteel]: "Black vertical-bar slide gate and operator in front of a white farmhouse-style home",
  [P.bronzeSlat]: "Bronze horizontal-slat sliding driveway gate with keypad pillar in front of a single-story home with hills behind",
  [P.commercial]: "Arched black iron commercial slide gate with operator on a concrete pad and a technician testing the remote",
  [P.hillside]: "Black horizontal-slat slide gate between lit concrete pillars below an oak tree on a hillside lot",
  [P.ornateIron]: "Ornate bronze-finish wrought iron swing gate with scrollwork beside a stone pillar and operator",
};

export const IMAGES = {
  homeHero: P.blackSteel,
  homeWhy: P.woodSlatOperator,
  about: P.commercial,
  og: "/images/og/og-default.jpg",

  services: {
    "gate-repair": P.bronzeSlat,
    "automatic-gate-repair": P.woodSlatOperator,
    "driveway-gate-repair": P.woodSteel,
    "electric-gate-repair": P.blackSteel,
    "gate-opener-repair": P.woodSlatOperator,
    "gate-motor-replacement": P.commercial,
    "iron-gate-repair": P.ornateIron,
    "commercial-gate-repair": P.commercial,
    "emergency-gate-repair": P.hillside,
    "gate-installation": P.woodSteel,
    // No garage door photos in this site's folder: these show a garage door behind the gate.
    "garage-door-repair": P.bronzeSlat,
    "garage-door-spring-repair": P.woodSteel,
    "garage-door-opener-repair": P.bronzeSlat,
    "garage-door-cable-repair": P.woodSteel,
    "garage-door-panel-repair": P.bronzeSlat,
    "emergency-garage-door-repair": P.hillside,
    "commercial-garage-door": P.commercial,
    "garage-door-installation": P.woodSteel,
  } as Record<string, string>,
  serviceFallback: P.blackSteel,

  cityHeroPool: [P.bronzeSlat, P.hillside, P.blackSteel, P.woodSteel, P.ornateIron, P.woodSlatOperator, P.commercial],
  cityPhotoStrips: [
    [P.ornateIron, P.hillside, P.woodSlatOperator],
    [P.woodSteel, P.bronzeSlat, P.commercial],
    [P.blackSteel, P.ornateIron, P.woodSteel],
  ],
  serviceAreasStrip: [P.bronzeSlat, P.hillside, P.commercial, P.ornateIron],

  brands: {
    "all-o-matic": { hero: P.woodSlatOperator, photo: P.blackSteel },
    "liftmaster": { hero: P.commercial, photo: P.blackSteel },
    "doorking": { hero: P.commercial, photo: P.woodSteel },
    "genie": { hero: P.bronzeSlat, photo: P.woodSteel },
    "doorbird": { hero: P.woodSteel, photo: P.bronzeSlat },
    "chamberlain": { hero: P.bronzeSlat, photo: P.woodSteel },
    "elite": { hero: P.ornateIron, photo: P.hillside },
    "viking": { hero: P.hillside, photo: P.ornateIron },
    "ramset": { hero: P.blackSteel, photo: P.woodSlatOperator },
    "linear": { hero: P.woodSlatOperator, photo: P.commercial },
    "eagle": { hero: P.commercial, photo: P.blackSteel },
  } as Record<string, { hero: string; photo: string }>,
  brandFallback: { hero: P.blackSteel, photo: P.woodSlatOperator },

  // Brands strip. Viking, Ramset and Eagle have no usable logo (IMAGE-GAPS.md).
  brandLogos: {
    "all-o-matic": "/images/logos/all-o-matic.webp",
    "chamberlain": "/images/logos/chamberlain.webp",
    "doorbird": "/images/logos/doorbird.webp",
    "doorking": "/images/logos/doorking.webp",
    "elite": "/images/logos/elite.webp",
    "genie": "/images/logos/genie.webp",
    "liftmaster": "/images/logos/liftmaster.webp",
    "linear": "/images/logos/linear.webp",
  } as Record<string, string>,
};
