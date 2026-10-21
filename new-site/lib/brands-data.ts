import { IMAGES } from "@/lib/images";

export interface BrandFAQ {
  q: string;
  a: string;
}

export interface BrandData {
  slug: string;
  name: string;
  logo: string;
  type: "gate" | "garage-door" | "both" | "access-control";
  tagline: string;
  intro: string;
  services: string[];
  customerInfo: string;
  whyUs: string;
  // Short paragraph naming 5-6 real Valley cities naturally (Part 1: brand page SFV section).
  sfvParagraph: string;
  faqs: BrandFAQ[];
  metaTitle: string;
  metaDescription: string;
}

// Gate-type and access-control brands get "gate repair" anchors; garage-door-only
// brands get "opener repair" anchors. "Both" brands (LiftMaster, Linear) default to
// gate repair — gates are this business's primary specialty and the search demand
// driving these pages (see CLAUDE-CODE-PROMPT-brands-x-cities.md).
export function anchorVerb(type: BrandData["type"]) {
  return type === "garage-door" ? "opener repair" : "gate repair";
}

// Brand category groups for the city-page "brands we repair" section (Part 2) —
// membership here isn't purely type-derived (DoorKing makes real gate operators and
// also access/entry systems, while DoorBird is intercom-only), so it's a short fixed
// map; each group just looks up the brand's live name/slug from BRANDS below.
export const BRAND_CATEGORY_GROUPS: { name: string; sentence: string; slugs: string[] }[] = [
  {
    name: "Gate Operators",
    sentence: "The motors and control systems that open and close automatic driveway gates.",
    slugs: ["all-o-matic", "liftmaster", "elite", "viking", "ramset", "eagle", "doorking", "linear"],
  },
  {
    name: "Garage Door Openers",
    sentence: "The motor units that raise, lower, and sense obstructions on a garage door.",
    slugs: ["liftmaster", "chamberlain", "genie", "linear"],
  },
  {
    name: "Access Control and Intercoms",
    sentence: "Keypads, telephone entry, and video intercoms that control who gets through the gate.",
    slugs: ["doorking", "doorbird"],
  },
];

export const BRANDS: BrandData[] = [
  // TODO(content): same brand slugs as REAL; model names only from REAL's verified model data.
  {
    slug: "liftmaster",
    name: "LiftMaster",
    logo: IMAGES.brandLogos["liftmaster"],
    type: "both",
    tagline: "TODO(content)",
    intro: "TODO(content)",
    services: [],
    customerInfo: "TODO(content)",
    whyUs: "TODO(content)",
    sfvParagraph: "TODO(content)",
    faqs: [],
    metaTitle: "TODO(content)",
    metaDescription: "TODO(content)",
  },
];

export function getBrandBySlug(slug: string): BrandData | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
