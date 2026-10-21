import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle, ChevronRight, AlertCircle, ArrowRight } from "lucide-react";
import { BRANDS, getBrandBySlug, anchorVerb, type BrandData } from "@/lib/brands-data";
import { BUSINESS, ALL_CITIES, ORG_ID } from "@/lib/constants";
import { CITY_REGIONS } from "@/lib/city-regions";
import { PRIORITY_CITY_SLUGS } from "@/lib/cities-data";
import ContactForm from "@/components/ContactForm";
import ArchImage from "@/components/ArchImage";
import IronDivider from "@/components/IronDivider";
import SectionRule from "@/components/SectionRule";
import ModelFinder from "@/components/ModelFinder";
import ModelList from "@/components/ModelList";
import { BRAND_MODELS, finderEntries, modelVariants, shortBrandName } from "@/lib/brand-models";
import TextUsCTA from "@/components/TextUsCTA";

// Matches the metaTitle money-phrase pattern for the visible H1.
function brandH1(brand: BrandData) {
  if (brand.slug === "doorbird") return "DoorBird Intercom Repair & Installation";
  if (brand.type === "garage-door") return `${brand.name} Garage Door Opener Repair`;
  if (brand.type === "both") return `${brand.name} Gate & Garage Door Repair`;
  return `${brand.name} Gate Repair`;
}

// One plain line under the H1 so homeowners know straight away this page is for them.
function homeownerLine(brand: BrandData) {
  if (brand.slug === "doorbird") return "Installation and repair of DoorBird intercoms on home gates and entries, same day across LA and the Valley.";
  if (brand.type === "garage-door") return `Repair or replacement for ${brand.name} openers on home garage doors, same day across LA and the Valley.`;
  if (brand.type === "both") return `Repair or replacement for ${brand.name} operators on home driveway gates and garage doors, same day across LA and the Valley.`;
  return `Repair or replacement for ${brand.name} operators on home driveway gates, same day across LA and the Valley.`;
}

// Brands that make gate operators get the repair-or-replace section.
const hasGateMotor = (brand: BrandData) => brand.type !== "garage-door" && brand.slug !== "doorbird";

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  const url = `/brands/${brand.slug}`;
  const ogImage = { url: "/images/og/og-default.jpg", width: 1200, height: 630 };
  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: brand.metaTitle, description: brand.metaDescription, url, images: [ogImage] },
    twitter: { card: "summary_large_image", images: [ogImage.url] },
  };
}

const BRAND_IMAGES: Record<string, { hero: string; photo: string }> = {
  "all-o-matic":  { hero: "/images/brands/all-o-matic/all-o-matic-hero.webp", photo: "/images/brands/all-o-matic/all-o-matic-1.webp" },
  "liftmaster":   { hero: "/images/brands/liftmaster/liftmaster-hero.webp",   photo: "/images/brands/liftmaster/liftmaster-1.webp" },
  "doorking":     { hero: "/images/gallery/commercial-1.webp",     photo: "/images/gallery/commercial-1.webp" },
  "genie":        { hero: "/images/services/garage-door-repair.webp",          photo: "/images/services/walnut-garage.webp" },
  "doorbird":     { hero: "/images/services/commercial-3.webp",        photo: "/images/gallery/outside-1.webp" },
  "chamberlain":  { hero: "/images/services/white-garage.webp",        photo: "/images/services/wood-garage.webp" },
  "elite":        { hero: "/images/brands/elite/elite-hero.webp",      photo: "/images/brands/elite/elite-1.webp" },
  "viking":       { hero: "/images/services/estate-gate.webp",         photo: "/images/services/iron-gold-gate.webp" },
  "ramset":       { hero: "/images/services/iron-gate-1.webp",         photo: "/images/services/long-iron-gate.webp" },
  "linear":       { hero: "/images/services/malibu-gate.webp",         photo: "/images/services/gate-motor.webp" },
  "eagle":        { hero: "/images/services/gated-community.webp",     photo: "/images/gallery/commercial-1.webp" },
};

// Alt text for the real jobsite photos (All-O-Matic, LiftMaster, Elite) — describes what's
// actually in each photo, not just the brand name. Images without an entry here (the 8
// brands still on generic stock photos) fall back to the generic alt pattern below.
const REAL_PHOTO_ALT: Record<string, string> = {
  "/images/brands/all-o-matic/all-o-matic-hero.webp": "All-O-Matic slide gate operator mounted beside a black horizontal-slat driveway gate",
  "/images/brands/all-o-matic/all-o-matic-1.webp": "All-O-Matic slide gate operator mounted against a stucco wall",
  "/images/brands/all-o-matic/all-o-matic-2.webp": "Black horizontal-slat sliding driveway gate with All-O-Matic operator",
  "/images/brands/all-o-matic/all-o-matic-4.webp": "Black horizontal-slat driveway gate and All-O-Matic operator on a residential street",
  "/images/brands/all-o-matic/all-o-matic-5.webp": "Black horizontal-slat driveway gate on a white stucco wall",
  "/images/brands/liftmaster/liftmaster-hero.webp": "LiftMaster slide gate operator mounted beside a black iron driveway gate",
  "/images/brands/liftmaster/liftmaster-1.webp": "LiftMaster swing gate operator on a gray composite horizontal-slat driveway gate",
  "/images/brands/liftmaster/liftmaster-2.webp": "LiftMaster swing gate operator on a wrought iron double driveway gate with scrollwork",
  "/images/brands/liftmaster/liftmaster-3.webp": "LiftMaster swing gate operator on an ornate bronze estate gate with floral ironwork",
  "/images/brands/liftmaster/liftmaster-4.webp": "LiftMaster swing gate operator on a black horizontal-slat driveway gate",
  "/images/brands/elite/elite-hero.webp": "Elite swing gate operator mounted on a black wrought iron driveway gate post",
  "/images/brands/elite/elite-1.webp": "Elite swing gate operator on a large arched wrought iron estate gate",
};

// Relevant service links by brand category.
const TYPE_INFO: Record<string, { services: { href: string; label: string }[] }> = {
  "gate": {
    services: [
      { href: "/services/gate-opener-repair", label: "Gate Opener Repair" },
      { href: "/services/automatic-gate-repair", label: "Automatic Gate Repair" },
    ],
  },
  "garage-door": {
    services: [
      { href: "/services/garage-door-opener-repair", label: "Garage Door Opener Repair" },
      { href: "/services/garage-door-repair", label: "Garage Door Repair" },
    ],
  },
  "both": {
    services: [
      { href: "/services/gate-opener-repair", label: "Gate Opener Repair" },
      { href: "/services/garage-door-opener-repair", label: "Garage Door Opener Repair" },
    ],
  },
  "access-control": {
    services: [
      { href: "/services/commercial-gate-repair", label: "Commercial Gate Repair" },
      { href: "/services/gate-opener-repair", label: "Gate Opener Repair" },
    ],
  },
};

const SYMPTOMS = [
  "Not responding to the remote or keypad",
  "Stops or reverses mid-travel",
  "Beeping or flashing an error light",
  "Making grinding or unusual noise before failing",
];

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const images = BRAND_IMAGES[brand.slug] ?? {
    hero: "/images/hero/hero-gate.webp",
    photo: "/images/services/gate-motor.webp",
  };
  const typeInfo = TYPE_INFO[brand.type];
  const whyUsShort = brand.whyUs.split(". ")[0] + ".";
  const verb = anchorVerb(brand.type);
  // LiftMaster is the Search Console priority brand — feature the priority cities first.
  const featuredCities = brand.slug === "liftmaster"
    ? PRIORITY_CITY_SLUGS.map((slug) => ALL_CITIES.find((c) => c.slug === slug)).filter((c): c is (typeof ALL_CITIES)[number] => Boolean(c))
    : [];

  const shortName = shortBrandName(brand.name);
  const modelData = BRAND_MODELS[brand.slug];
  const modelsSchema = modelData
    ? {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: `${shortName} models we repair and replace`,
        url: `${BUSINESS.domain}/brands/${brand.slug}#models`,
        hasDefinedTerm: modelData.groups.flatMap((g) =>
          g.models.map((m) => ({
            "@type": "DefinedTerm",
            name: `${shortName} ${m.name}`,
            alternateName: modelVariants(m, modelData.numberPrefixes),
            description: m.kind,
          })),
        ),
      }
    : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} Repair`,
    serviceType: `${brand.name} Repair`,
    description: brand.metaDescription,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Los Angeles County, CA" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.domain },
      { "@type": "ListItem", position: 2, name: brand.name, item: `${BUSINESS.domain}/brands/${brand.slug}` },
    ],
  };

  // Valley FAQ is added to every brand here so the visible list and the schema stay in sync.
  const faqs = [
    ...brand.faqs,
    {
      q: `Do you repair ${brand.name} in North Hollywood and the rest of the Valley?`,
      a: `Yes. We repair ${brand.name} systems same day in North Hollywood, Studio City, Sherman Oaks, Encino, Van Nuys and Burbank, and across the rest of the San Fernando Valley. Call or text ${BUSINESS.phone}.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {modelsSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(modelsSchema) }} />}

      {/* HERO — full image background */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: "55vh" }}>
        <Image
          src={images.hero}
          alt={REAL_PHOTO_ALT[images.hero] ?? `${brand.name} gate and garage door repair in Los Angeles`}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(12,30,53,0.95) 0%, rgba(12,30,53,0.55) 60%, rgba(12,30,53,0.25) 100%)" }}
        />
        <div className="relative z-10 container-max pb-12 pt-32">
          {/* Logo pill */}
          <div
            className="inline-flex items-center justify-center rounded-[var(--radius)] mb-5"
            style={{ background: "rgba(255,255,255,0.12)", padding: "0.6rem 1.25rem", backdropFilter: "blur(6px)" }}
          >
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={140}
              height={48}
              style={{ objectFit: "contain", maxHeight: 44, width: "auto" }}
              unoptimized
            />
          </div>

          <span className="eyebrow" style={{ color: "rgba(196,133,90,0.9)" }}>
            Expert Service · Los Angeles
          </span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "0.5rem" }}>
            {brandH1(brand)} — <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Los Angeles &amp; San Fernando Valley</em>
          </h1>
          <p className="font-semibold" style={{ color: "var(--text-warm)", fontSize: "1.05rem", marginBottom: "0.5rem", maxWidth: 560 }}>
            {homeownerLine(brand)}
          </p>
          <p style={{ color: "rgba(237,234,228,0.82)", fontSize: "1.05rem", marginBottom: "0.5rem", maxWidth: 560 }}>
            {brand.tagline}
          </p>
          <p className="font-semibold" style={{ color: "#C9A84C", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Fixed same-day · Most repairs in one visit
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={BUSINESS.phoneHref} className="btn-gold">
              <Phone size={16} /> Call {BUSINESS.phone}
            </a>
            <TextUsCTA className="btn-ghost" />
            <Link href="/contact" className="btn-ghost">
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <IronDivider />

      {/* TRUST BAR */}
      <div style={{ background: "var(--brown)", padding: "0.65rem 1rem" }}>
        <div className="container-max">
          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold"
            style={{ color: "#fff", letterSpacing: "0.02em" }}
          >
            <span>✦ {brand.name} Specialists</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span>Same-Day Service</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span>5★ Rated</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span>Bonded &amp; Insured</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span>Free Estimates</span>
          </div>
          <p className="text-center text-sm font-medium mt-1.5" style={{ color: "rgba(255,255,255,0.85)" }}>
            On-site service across greater Los Angeles, Ventura County, Orange County and the Central Valley.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main column */}
            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* Symptoms */}
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <h2 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
                  Is Your {brand.name} <em>Doing This?</em>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {SYMPTOMS.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--brown-warm)" }} />
                      <span style={{ color: "var(--text-mid)", fontSize: "0.92rem" }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timing & availability */}
              <div style={{ background: "var(--brown)", borderRadius: "var(--radius-lg)", padding: "0.85rem 1.5rem", textAlign: "center" }}>
                <p className="font-semibold" style={{ color: "var(--text-warm)", fontSize: "0.95rem" }}>
                  Fixed same-day · Free on-site estimate · Most repairs done in one visit
                </p>
              </div>

              {/* Intro */}
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  About {brand.name}
                </h2>
                <p style={{ color: "var(--text-mid)", lineHeight: 1.8, fontSize: "1.02rem" }}>
                  {brand.intro}
                </p>
              </div>

              {/* SFV paragraph */}
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.25rem", color: "var(--navy)", marginBottom: "0.75rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  {brand.name} {brand.type === "garage-door" ? "Garage Door Repair" : "Gate Repair"} Across the San Fernando Valley
                </h2>
                <p style={{ color: "var(--text-mid)", lineHeight: 1.8, fontSize: "1rem" }}>
                  {brand.sfvParagraph}
                </p>
              </div>

              {/* Services */}
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.25rem", color: "var(--navy)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  {brand.name} Services We Handle
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {brand.services.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={17}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--brown-warm)" }}
                      />
                      <span style={{ color: "var(--text-mid)", fontSize: "0.92rem" }}>{s}</span>
                    </li>
                  ))}
                </ul>

                {/* Inline CTA */}
                <div
                  className="mt-6 pt-5 flex flex-wrap items-center justify-between gap-4"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <p style={{ color: "var(--text-soft)", fontSize: "0.88rem" }}>
                    Need any of these services? We respond within 30 minutes.
                  </p>
                  <a href={BUSINESS.phoneHref} className="btn-primary" style={{ flexShrink: 0 }}>
                    <Phone size={15} /> Call Now
                  </a>
                </div>
              </div>

              {/* Photo */}
              <ArchImage
                src={images.photo}
                alt={REAL_PHOTO_ALT[images.photo] ?? `${brand.name} repair and installation work by Real Gate & Garage Door`}
                aspect="4/5"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />

              {/* Models: every model with its other spellings, plus a finder */}
              {BRAND_MODELS[brand.slug] && (
                <div id="models" style={{ scrollMarginTop: "6rem" }}>
                  <h2
                    className="font-heading font-bold"
                    style={{ fontSize: "1.25rem", color: "var(--navy)", marginBottom: "0.5rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                  >
                    {`${shortName} Models We Repair & Replace`}
                  </h2>
                  <p style={{ color: "var(--text-mid)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                    Current and older {shortName} models, including discontinued units. Find yours below or type the model from the sticker.
                  </p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <ModelFinder entries={finderEntries(BRANDS.map((b) => ({ slug: b.slug, name: shortBrandName(b.name) })))} currentBrandSlug={brand.slug} />
                  </div>
                  <ModelList slug={brand.slug} brandName={shortName} />
                  <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                    <Link href="/gate-operator-models" style={{ color: "var(--brown)", textDecoration: "underline", fontWeight: 600 }}>
                      See every gate opener model we repair and replace
                    </Link>
                  </p>
                </div>
              )}

              {/* Repair or replace — gate operator brands only */}
              {hasGateMotor(brand) && (
                <div>
                  <h2
                    className="font-heading font-bold"
                    style={{ fontSize: "1.25rem", color: "var(--navy)", marginBottom: "0.75rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                  >
                    Repair or Replace Your {brand.name} Motor?
                  </h2>
                  <p style={{ color: "var(--text-mid)", lineHeight: 1.8 }}>
                    We always check first whether your {brand.name} operator can be repaired, because a new control
                    board, gear or sensor often gets it running again. Replacement makes sense when the motor is
                    old and failing more often, when the same unit keeps breaking after repairs, or when parts for
                    your model are no longer made. If that is the case, we explain the options that fit your gate
                    and give you a clear quote before any work starts. See our{" "}
                    <Link href="/services/gate-motor-replacement" style={{ color: "var(--brown)", textDecoration: "underline" }}>
                      gate motor replacement
                    </Link>{" "}
                    service.
                  </p>
                </div>
              )}

              {/* Why Us — navy block */}
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "var(--navy)" }}
              >
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.15rem", color: "var(--text-warm)", marginBottom: "0.75rem" }}
                >
                  Why Choose Us for {brand.name}?
                </h2>
                <p style={{ color: "rgba(237,234,228,0.8)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  {whyUsShort}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={BUSINESS.phoneHref} className="btn-gold" style={{ fontSize: "0.9rem" }}>
                    <Phone size={15} /> Call {BUSINESS.phone}
                  </a>
                  <Link href="/contact" className="btn-ghost" style={{ fontSize: "0.9rem" }}>
                    Request Estimate
                  </Link>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  {brand.name} — Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-[var(--radius-lg)] p-5"
                      style={{ border: "1px solid var(--line)", background: "var(--bg-card)" }}
                    >
                      <h3
                        className="font-heading font-semibold mb-2"
                        style={{ fontSize: "1rem", color: "var(--navy)" }}
                      >
                        {faq.q}
                      </h3>
                      <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal Links — Related Services */}
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.15rem", color: "var(--navy)", marginBottom: "1rem" }}
                >
                  Related Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {typeInfo.services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm"
                      style={{ background: "var(--bg-muted)", border: "1px solid var(--line)", color: "var(--text-mid)", textDecoration: "none" }}
                    >
                      {s.label} <ArrowRight size={12} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Where We Repair <Brand> Operators — full city list, grouped by region */}
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  Where We Repair {brand.name} {brand.type === "garage-door" ? "Openers" : "Operators"}
                </h2>

                {/* LiftMaster only — Search Console priority cities, featured above the full list */}
                {featuredCities.length > 0 && (
                  <div
                    className="rounded-[var(--radius-lg)] p-5 mb-5"
                    style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.4)" }}
                  >
                    <p className="font-heading font-semibold text-xs uppercase mb-3" style={{ letterSpacing: "0.08em", color: "var(--brown-warm)" }}>
                      Most Requested
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredCities.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/areas/${c.slug}`}
                          className="px-3 py-1.5 rounded-full text-sm font-semibold"
                          style={{ background: "#C9A84C", color: "#1a1a1a", textDecoration: "none" }}
                        >
                          {brand.name} {verb} in {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* San Fernando Valley — expanded by default, always in the HTML */}
                <div className="mb-4">
                  <p className="font-heading font-semibold mb-2" style={{ fontSize: "0.95rem", color: "var(--navy)" }}>
                    {CITY_REGIONS[0].name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CITY_REGIONS[0].citySlugs.map((slug) => {
                      const c = ALL_CITIES.find((city) => city.slug === slug);
                      if (!c) return null;
                      return (
                        <Link
                          key={c.slug}
                          href={`/areas/${c.slug}`}
                          className="px-3 py-1.5 rounded-full text-sm"
                          style={{ background: "var(--bg-muted)", border: "1px solid var(--line)", color: "var(--text-mid)", textDecoration: "none" }}
                        >
                          {brand.name} {verb} in {c.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Other regions — collapsible on mobile, but rendered server-side so every link is in the HTML */}
                {CITY_REGIONS.slice(1).map((region) => (
                  <details key={region.name} className="mb-3">
                    <summary
                      className="font-heading font-semibold cursor-pointer"
                      style={{ fontSize: "0.95rem", color: "var(--navy)", padding: "0.4rem 0" }}
                    >
                      {region.name}
                    </summary>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {region.citySlugs.map((slug) => {
                        const c = ALL_CITIES.find((city) => city.slug === slug);
                        if (!c) return null;
                        return (
                          <Link
                            key={c.slug}
                            href={`/areas/${c.slug}`}
                            className="px-3 py-1.5 rounded-full text-sm"
                            style={{ background: "var(--bg-muted)", border: "1px solid var(--line)", color: "var(--text-mid)", textDecoration: "none" }}
                          >
                            {brand.name} {verb} in {c.name}
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">
              {/* Phone card */}
              <div
                className="rounded-[var(--radius-lg)] p-5 text-center"
                style={{ background: "var(--navy)" }}
              >
                <p
                  className="font-heading font-bold mb-3"
                  style={{ fontSize: "1rem", color: "var(--text-warm)" }}
                >
                  {brand.name} Repair — Same Day
                </p>
                <a href={BUSINESS.phoneHref} className="btn-gold w-full justify-center">
                  <Phone size={16} /> {BUSINESS.phone}
                </a>
                <p style={{ fontSize: "0.78rem", color: "rgba(237,234,228,0.5)", marginTop: "0.75rem" }}>
                  Bonded &amp; Insured · Sun–Fri 7AM–10PM
                </p>
              </div>

              <ContactForm />

              {/* Other brands */}
              <div
                className="rounded-[var(--radius-lg)] p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <p
                  className="font-heading font-bold"
                  style={{ fontSize: "0.9rem", color: "var(--navy)", marginBottom: "0.75rem" }}
                >
                  Other Brands We Service
                </p>
                <ul className="flex flex-col gap-1">
                  {BRANDS.filter((b) => b.slug !== brand.slug).map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/brands/${b.slug}`}
                        className="flex items-center gap-2 py-1.5"
                        style={{ color: "var(--text-soft)", fontSize: "0.85rem", textDecoration: "none" }}
                      >
                        <ChevronRight size={14} style={{ color: "var(--brown-light)", flexShrink: 0 }} />
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding section--dark">
        <div className="container-max max-w-2xl text-center">
          <span className="eyebrow" style={{ color: "var(--brown-warm)" }}>Ready to Get Started?</span>
          <h2 style={{ color: "var(--text-warm)", marginBottom: "0.75rem" }}>
            Need {brand.name} Service Today?
          </h2>
          <SectionRule />
          <p style={{ color: "rgba(237,234,228,0.7)", marginTop: "1.25rem", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: 1.75 }}>
            We offer same-day service for most {brand.name} repairs across greater Los Angeles. Call now
            and we&apos;ll have a technician at your property within hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn-gold">
              <Phone size={16} /> Call {BUSINESS.phone}
            </a>
            <Link href="/contact" className="btn-secondary">
              Request Estimate Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
