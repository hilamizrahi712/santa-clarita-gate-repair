import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle, ChevronRight, AlertCircle, ArrowRight } from "lucide-react";
import { BRANDS, getBrandBySlug, anchorVerb, type BrandData } from "@/lib/brands-data";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
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
  if (brand.type === "both") return `${brand.name} Gate Operator & Opener Repair`;
  return `${brand.name} Gate Repair`;
}

// One plain line under the H1 so homeowners know straight away this page is for them.
function homeownerLine(brand: BrandData) {
  if (brand.slug === "doorbird") return "DoorBird video stations installed and repaired at home gates and front entries in the Santa Clarita and Antelope Valleys.";
  if (brand.type === "garage-door") return `${brand.name} garage door openers repaired or replaced at homes from Castaic to Pearblossom.`;
  if (brand.type === "both") return `${brand.name} gate operators and garage door openers repaired or replaced at homes from Castaic to Pearblossom.`;
  return `${brand.name} driveway gate operators repaired or replaced at homes from Castaic to Pearblossom.`;
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
  const ogImage = { url: IMAGES.og, width: 1200, height: 630 };
  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: brand.metaTitle, description: brand.metaDescription, url, images: [ogImage] },
    twitter: { card: "summary_large_image", images: [ogImage.url] },
  };
}

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

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const images = IMAGES.brands[brand.slug] ?? IMAGES.brandFallback;
  const typeInfo = TYPE_INFO[brand.type];
  const verbTitle = brand.type === "garage-door" ? "Opener Repair" : "Gate Repair";
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
    areaServed: ALL_CITIES.map((c) => ({ "@type": "City", name: `${c.name}, CA` })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.domain },
      { "@type": "ListItem", position: 2, name: brand.name, item: `${BUSINESS.domain}/brands/${brand.slug}` },
    ],
  };

  const faqs = brand.faqs;

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
          alt={IMAGE_ALT[images.hero]}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,8,5,0.95) 0%, rgba(5,8,5,0.55) 60%, rgba(5,8,5,0.25) 100%)" }}
        />
        <div className="relative z-10 container-max pb-12 pt-32">
          {/* Logo pill: skipped for brands without a usable logo */}
          {brand.logo && (
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
          )}

          <span className="eyebrow" style={{ color: "rgba(217,80,112,0.9)" }}>
            Santa Clarita Valley · Antelope Valley
          </span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "0.5rem" }}>
            {brandH1(brand)} — <em style={{ color: "#4db87a", fontStyle: "italic" }}>Santa Clarita &amp; Antelope Valley</em>
          </h1>
          <p className="font-semibold" style={{ color: "var(--text-warm)", fontSize: "1.05rem", marginBottom: "0.5rem", maxWidth: 560 }}>
            {homeownerLine(brand)}
          </p>
          <p style={{ color: "rgba(216,234,208,0.82)", fontSize: "1.05rem", marginBottom: "0.5rem", maxWidth: 560 }}>
            {brand.tagline}
          </p>
          <p className="font-semibold" style={{ color: "#4db87a", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Same-day service · Parts for common {brand.name} failures on the truck
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
            <span>✦ We work on {brand.name}</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span>Bonded &amp; Insured</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span>Same-day service</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span>Free on-site quote</span>
          </div>
          <p className="text-center text-sm font-medium mt-1.5" style={{ color: "rgba(255,255,255,0.85)" }}>
            Technicians across all 20 communities we cover in the Santa Clarita and Antelope Valleys.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main column */}
            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* Common reasons people call: symptoms only */}
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <h2 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
                  Common Reasons People Call About {brand.name}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {brand.callReasons.map((s) => (
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
                  Same-day service in most of our area · Free on-site quote before any work
                </p>
              </div>

              {/* Intro */}
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.5rem", color: "var(--heading)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  About {brand.name}
                </h2>
                <p style={{ color: "var(--text-mid)", lineHeight: 1.8, fontSize: "1.02rem" }}>
                  {brand.intro}
                </p>
              </div>

              {/* Local paragraph */}
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.25rem", color: "var(--heading)", marginBottom: "0.75rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  {brand.name} {verbTitle} in the Santa Clarita and Antelope Valleys
                </h2>
                <p style={{ color: "var(--text-mid)", lineHeight: 1.8, fontSize: "1rem" }}>
                  {brand.localParagraph}
                </p>
              </div>

              {/* Services */}
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <h2
                  className="font-heading font-bold"
                  style={{ fontSize: "1.25rem", color: "var(--heading)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  What We Fix on {brand.name} Equipment
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
                    Need one of these? Call or text and we book you while you are on the line.
                  </p>
                  <a href={BUSINESS.phoneHref} className="btn-primary" style={{ flexShrink: 0 }}>
                    <Phone size={15} /> Call Now
                  </a>
                </div>
              </div>

              {/* Photo */}
              <ArchImage
                src={images.photo}
                alt={IMAGE_ALT[images.photo]}
                aspect="4/5"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />

              {/* Models: every model with its other spellings, plus a finder */}
              {BRAND_MODELS[brand.slug] && (
                <div id="models" style={{ scrollMarginTop: "6rem" }}>
                  <h2
                    className="font-heading font-bold"
                    style={{ fontSize: "1.25rem", color: "var(--heading)", marginBottom: "0.5rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                  >
                    {`${shortName} Models: Current and Discontinued`}
                  </h2>
                  <p style={{ color: "var(--text-mid)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                    Current and older {shortName} models, including discontinued units. Find yours below or type the model from the sticker.
                  </p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <ModelFinder entries={finderEntries(BRANDS.map((b) => ({ slug: b.slug, name: shortBrandName(b.name) })))} currentBrandSlug={brand.slug} />
                  </div>
                  <ModelList slug={brand.slug} brandName={shortName} />
                  <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                    <Link href="/gate-operator-models" style={{ color: "var(--brown-warm)", textDecoration: "underline", fontWeight: 600 }}>
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
                    style={{ fontSize: "1.25rem", color: "var(--heading)", marginBottom: "0.75rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                  >
                    Fix It or Replace the {brand.name} Operator?
                  </h2>
                  <p style={{ color: "var(--text-mid)", lineHeight: 1.8 }}>
                    A failed {brand.name} operator is not always a dead one. Our first step is to find the part
                    that quit, whether that is a board, a gear set, a battery or a sensor, and replace just that.
                    We only suggest a new operator when yours is worn out, keeps failing after repairs, or uses
                    parts the maker has stopped producing, and then we show you which current models suit your
                    gate and quote it in writing. More on our{" "}
                    <Link href="/services/gate-motor-replacement" style={{ color: "var(--brown-warm)", textDecoration: "underline" }}>
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
                  Why Call Us About Your {brand.name}
                </h2>
                <p style={{ color: "rgba(216,234,208,0.8)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
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
                  style={{ fontSize: "1.5rem", color: "var(--heading)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  {brand.name} Questions We Get
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
                        style={{ fontSize: "1rem", color: "var(--heading)" }}
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
                  style={{ fontSize: "1.15rem", color: "var(--heading)", marginBottom: "1rem" }}
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
                  style={{ fontSize: "1.5rem", color: "var(--heading)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                >
                  {brand.name} Service Calls Across Our 20 Cities
                </h2>

                {/* LiftMaster only — Search Console priority cities, featured above the full list */}
                {featuredCities.length > 0 && (
                  <div
                    className="rounded-[var(--radius-lg)] p-5 mb-5"
                    style={{ background: "rgba(77,184,122,0.08)", border: "1px solid rgba(77,184,122,0.4)" }}
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
                          style={{ background: "#4db87a", color: "#1a1a1a", textDecoration: "none" }}
                        >
                          {brand.name} {verb} in {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Every city, grouped by valley, all links in the HTML */}
                {CITY_REGIONS.map((region) => (
                  <div key={region.name} className="mb-4">
                    <p className="font-heading font-semibold mb-2" style={{ fontSize: "0.95rem", color: "var(--heading)" }}>
                      {region.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
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
                  </div>
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
                  Same-day {brand.name} service
                </p>
                <a href={BUSINESS.phoneHref} className="btn-gold w-full justify-center">
                  <Phone size={16} /> {BUSINESS.phone}
                </a>
                <p style={{ fontSize: "0.78rem", color: "rgba(216,234,208,0.75)", marginTop: "0.75rem" }}>
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
                  style={{ fontSize: "0.9rem", color: "var(--heading)", marginBottom: "0.75rem" }}
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
          <span className="eyebrow" style={{ color: "var(--brown-warm)" }}>{brand.name} Trouble?</span>
          <h2 style={{ color: "var(--text-warm)", marginBottom: "0.75rem" }}>
            Get Your {brand.name} Working Again
          </h2>
          <SectionRule />
          <p style={{ color: "rgba(216,234,208,0.7)", marginTop: "1.25rem", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: 1.75 }}>
            Tell us the model on the sticker, or text a photo of it, and we send a technician who knows
            {" "}{brand.name}. Same-day service is available across most of the Santa Clarita and Antelope Valleys.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn-gold">
              <Phone size={16} /> Call {BUSINESS.phone}
            </a>
            <Link href="/contact" className="btn-secondary">
              Ask for a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
