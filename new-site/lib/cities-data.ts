export interface CityData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroH1: string;
  heroSubtitle: string;
  intro: string;
  whyUs: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  extraKeywords: string[];
  nearby: string[];
  arrivalTime: string;
  // Priority cities only (Search Console: highest brand + city impressions).
  // Two short paragraphs for a dedicated "LiftMaster gate repair in <City>" section.
  liftmasterSection?: [string, string];
  // Compact 1-2 sentence blurbs for Viking, Elite, All-O-Matic, Ramset, DoorKing, each linking to /brands/<slug>.
  brandCompact?: { slug: string; text: string }[];
}

// Search Console priority cities (last 3 months) — strongest existing "gate repair <city>"
// and brand+city signal. These get the extra LiftMaster/brand sections and schema brand mentions.
export const PRIORITY_CITY_SLUGS: string[] = [
  // TODO(content): cities featured first on brand pages, chosen from the 20 in SITE-BRIEF.md.
  "santa-clarita",
];

export const CITIES: CityData[] = [
  // TODO(content): one genuinely local page per city in SITE-BRIEF.md.
  {
    slug: "santa-clarita",
    name: "Santa Clarita",
    metaTitle: "TODO(content)",
    metaDescription: "TODO(content)",
    heroH1: "TODO(content)",
    heroSubtitle: "TODO(content)",
    intro: "TODO(content)",
    whyUs: [],
    faq: [],
    extraKeywords: [],
    nearby: ["valencia", "saugus", "newhall", "canyon-country"],
    arrivalTime: "TODO(content)",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
