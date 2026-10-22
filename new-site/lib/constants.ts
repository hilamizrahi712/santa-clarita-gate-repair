export const FORMSPREE_URL = "https://formspree.io/f/mdavyrrl";

// Existing GA4 property: keep this exact ID so analytics history and conversions carry over.
export const GA4_ID = "G-RR82654PGL";

export const BUSINESS = {
  name: "Santa Clarita Gate Repair",
  shortName: "SCV Gate Repair",
  tagline: "Gate & Garage Door Repair in Santa Clarita & Antelope Valley",
  phone: "(661) 519-1599",
  phoneHref: "tel:+16615191599",
  smsHref: "sms:+16615191599",
  email: "", // TODO(pending): business email not decided yet
  address: "Santa Clarita, CA", // service-area business: city only, no street address
  domain: "https://santaclaritagaterepair.com",
  hours: "Sun to Fri 7AM to 10PM, closed Saturdays for routine appointments, 24/7 emergency dispatch",
};

// Stable entity ID for the LocalBusiness JSON-LD in app/layout.tsx. Every other
// schema block on the site should reference this via provider: { "@id": ORG_ID }
// instead of repeating a full LocalBusiness object.
export const ORG_ID = `${BUSINESS.domain}/#organization`;

export const SCV_CITIES = [
  { name: "Santa Clarita", slug: "santa-clarita" },
  { name: "Valencia", slug: "valencia" },
  { name: "Saugus", slug: "saugus" },
  { name: "Newhall", slug: "newhall" },
  { name: "Canyon Country", slug: "canyon-country" },
  { name: "Stevenson Ranch", slug: "stevenson-ranch" },
  { name: "Castaic", slug: "castaic" },
  { name: "Val Verde", slug: "val-verde" },
  { name: "Agua Dulce", slug: "agua-dulce" },
  { name: "Acton", slug: "acton" },
];

export const AV_CITIES = [
  { name: "Palmdale", slug: "palmdale" },
  { name: "Lancaster", slug: "lancaster" },
  { name: "Quartz Hill", slug: "quartz-hill" },
  { name: "Littlerock", slug: "littlerock" },
  { name: "Leona Valley", slug: "leona-valley" },
  { name: "Lake Hughes", slug: "lake-hughes" },
  { name: "Lake Elizabeth", slug: "lake-elizabeth" },
  { name: "Green Valley", slug: "green-valley" },
  { name: "Sun Village", slug: "sun-village" },
  { name: "Pearblossom", slug: "pearblossom" },
];

export const ALL_CITIES = [...SCV_CITIES, ...AV_CITIES];

// IndexNow key (Bing etc.), generated for this domain; the same value is served at /<key>.txt from public/.
export const INDEXNOW_KEY = "a2a83c52046d794b2196eb4c84044838";
