import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { CITIES, getCityBySlug, PRIORITY_CITY_SLUGS } from "@/lib/cities-data";
import { SERVICES } from "@/lib/services-data";
import { BRANDS, anchorVerb, BRAND_CATEGORY_GROUPS } from "@/lib/brands-data";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { BUSINESS, ORG_ID } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";
import BrandsMarquee from "@/components/BrandsMarquee";
import ArchImage from "@/components/ArchImage";
import IronDivider from "@/components/IronDivider";
import InlineLinks from "@/components/InlineLinks";
import SectionRule from "@/components/SectionRule";
import TextUsCTA from "@/components/TextUsCTA";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return {};
  const url = `/areas/${city}`;
  const ogImage = { url: IMAGES.og, width: 1200, height: 630 };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: data.metaTitle, description: data.metaDescription, url, images: [ogImage] },
    twitter: { card: "summary_large_image", images: [ogImage.url] },
  };
}

const gateCityServices = [
  { href: "/services/gate-repair",               label: "Gate Repair",            img: IMAGES.services["gate-repair"] },
  { href: "/services/automatic-gate-repair",     label: "Automatic Gate Repair",  img: IMAGES.services["automatic-gate-repair"] },
  { href: "/services/electric-gate-repair",      label: "Electric Gate Repair",   img: IMAGES.services["electric-gate-repair"] },
  { href: "/services/iron-gate-repair",          label: "Iron Gate Repair",       img: IMAGES.services["iron-gate-repair"] },
];

const garageCityServices = [
  { href: "/services/garage-door-repair",        label: "Garage Door Repair",     img: IMAGES.services["garage-door-repair"] },
  { href: "/services/garage-door-spring-repair", label: "Spring Repair",          img: IMAGES.services["garage-door-spring-repair"] },
  { href: "/services/garage-door-opener-repair", label: "Opener Repair",          img: IMAGES.services["garage-door-opener-repair"] },
  { href: "/services/emergency-garage-door-repair", label: "24/7 Emergency",      img: IMAGES.services["emergency-garage-door-repair"] },
];

const CITY_HERO_POOL = IMAGES.cityHeroPool;

// Rotating sets so nearby cities on the list don't all show the same three photos
const CITY_PHOTO_STRIPS = IMAGES.cityPhotoStrips.map((strip) => strip.map((src) => ({ src, alt: IMAGE_ALT[src] })));

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();


  const cityIndex = CITIES.findIndex((c) => c.slug === city);
  const heroImg = CITY_HERO_POOL[cityIndex % CITY_HERO_POOL.length];
  const photoStrip = CITY_PHOTO_STRIPS[cityIndex % CITY_PHOTO_STRIPS.length];

  // Real geographic adjacencies only — never padded with distant cities.
  // Below 3 entries, the Nearby Areas module is hidden entirely (see render below).
  const nearbyCities = data.nearby
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c): c is (typeof CITIES)[number] => Boolean(c));

  // Query by business name + city, not just the city, so the embed actually resolves
  // to our verified Google Business Profile instead of a generic point on the map.
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${BUSINESS.name}, ${data.name}, CA`)}&output=embed&z=12`;

  const isPriority = PRIORITY_CITY_SLUGS.includes(city);

  const cityServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Gate repair",
    name: `Gate & Garage Door Repair — ${data.name}, CA`,
    description: data.metaDescription,
    url: `${BUSINESS.domain}/areas/${city}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: data.name },
    ...(isPriority
      ? { brand: ["LiftMaster", "Viking", "Elite", "All-O-Matic"].map((b) => ({ "@type": "Brand", name: b })) }
      : {}),
  };

  // Generated from BRANDS data (Part 2) — every brand added there appears here automatically.
  const cityBrandNames = BRANDS.map((b) => b.name).join(", ");
  const brandsFaqAnswer = `We repair all major gate operator and garage door opener brands in ${data.name}, including ${cityBrandNames}. Our most-requested brands are LiftMaster, Viking, and Elite.`;
  const brandsFaqQuestion = `Which gate operator brands do you repair in ${data.name}?`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...data.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
      { "@type": "Question", name: brandsFaqQuestion, acceptedAnswer: { "@type": "Answer", text: brandsFaqAnswer } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.domain },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${BUSINESS.domain}/service-areas` },
      { "@type": "ListItem", position: 3, name: data.name, item: `${BUSINESS.domain}/areas/${city}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "55vh" }}>
        <Image
          src={heroImg}
          alt={`Gate and garage door repair in ${data.name}, CA`}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,8,5,0.95) 0%, rgba(5,8,5,0.55) 60%, rgba(5,8,5,0.3) 100%)" }}
        />
        <div
          className="relative z-10 container-max flex items-center"
          style={{ minHeight: "55vh", paddingTop: "7rem", paddingBottom: "2rem" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center w-full">
            <div>
              <span className="eyebrow" style={{ color: "rgba(217,80,112,0.9)" }}>
                {data.name}, CA
              </span>
              <h1 style={{ color: "var(--text-warm)", marginBottom: "0.75rem" }}>
                {data.heroH1}
              </h1>
              <p style={{ color: "rgba(216,234,208,0.8)", fontSize: "1.05rem", marginBottom: "1.5rem", maxWidth: 560 }}>
                {data.heroSubtitle}
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

            {/* Mini lead form — desktop only, mirrors hero on mobile below */}
            <div className="hidden lg:block">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>

      <IronDivider />

      {/* MOBILE FORM — directly below hero */}
      <div className="lg:hidden" style={{ background: "var(--bg-muted)", padding: "1.5rem" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <ContactForm compact />
        </div>
      </div>

      {/* TRUST BAR — gold */}
      <div style={{ background: "#4db87a", padding: "0.65rem 1rem" }}>
        <div className="container-max">
          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold"
            style={{ color: "#1a1a1a", letterSpacing: "0.02em" }}
          >
            <span>✦ Serving {data.name}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{data.arrivalTime} to {data.name}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Same-Day Service</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>5★ Rated</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Bonded &amp; Insured</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Free Estimates</span>
          </div>
        </div>
      </div>

      {/* LIFTMASTER + BRAND SECTION — priority cities only (Search Console: strongest brand+city signal) */}
      {data.liftmasterSection && data.brandCompact && (
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max">
            <h2
              style={{
                marginBottom: "1rem",
                fontSize: "1.75rem",
                borderLeft: "4px solid var(--brown)",
                paddingLeft: "0.75rem",
              }}
            >
              LiftMaster Gate Repair in {data.name}
            </h2>
            {data.liftmasterSection.map((para, i) => (
              <p
                key={i}
                className="leading-relaxed mb-4"
                style={{ color: "var(--text-mid)", fontSize: "1rem", paddingLeft: "0.75rem" }}
              >
                {para}
              </p>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6" style={{ paddingLeft: "0.75rem" }}>
              {data.brandCompact.map((b) => (
                <div key={b.slug} className="card" style={{ borderTop: "3px solid var(--brown-warm)" }}>
                  <p
                    style={{ color: "var(--text-soft)", fontSize: "0.88rem" }}
                    dangerouslySetInnerHTML={{ __html: b.text }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max space-y-10">

          {/* Gate Services — with images */}
          <div>
            <h2
              style={{
                marginBottom: "0.5rem",
                fontSize: "1.75rem",
                borderLeft: "4px solid var(--brown)",
                paddingLeft: "0.75rem",
              }}
            >
              Gate Repair in {data.name}
            </h2>
            <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", marginBottom: "1.25rem", paddingLeft: "0.75rem" }}>
              Sliding, swing, and automatic gates — motors, sensors, hinges, and tracks fixed same-day for {data.name} homes and businesses.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gateCityServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="card flex flex-col overflow-hidden transition-all hover:shadow-md"
                  style={{ textDecoration: "none", padding: 0 }}
                >
                  <div className="relative" style={{ height: 100, overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
                    <Image
                      src={s.img}
                      alt={`${s.label} in ${data.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="px-3 py-2.5 flex items-center gap-2">
                    <span className="font-semibold text-xs" style={{ color: "var(--heading)", flex: 1, lineHeight: 1.3 }}>
                      {s.label}
                    </span>
                    <ArrowRight size={12} style={{ color: "var(--stone-light)", flexShrink: 0 }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Garage Door Services — with images */}
          <div>
            <h2
              style={{
                marginBottom: "0.5rem",
                fontSize: "1.75rem",
                borderLeft: "4px solid var(--brown)",
                paddingLeft: "0.75rem",
              }}
            >
              Garage Door Repair in {data.name}
            </h2>
            <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", marginBottom: "1.25rem", paddingLeft: "0.75rem" }}>
              Springs, cables, openers, and emergencies — our technicians carry the parts for one-visit repairs across {data.name}.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {garageCityServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="card flex flex-col overflow-hidden transition-all hover:shadow-md"
                  style={{ textDecoration: "none", padding: 0 }}
                >
                  <div className="relative" style={{ height: 100, overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
                    <Image
                      src={s.img}
                      alt={`${s.label} in ${data.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="px-3 py-2.5 flex items-center gap-2">
                    <span className="font-semibold text-xs" style={{ color: "var(--heading)", flex: 1, lineHeight: 1.3 }}>
                      {s.label}
                    </span>
                    <ArrowRight size={12} style={{ color: "var(--stone-light)", flexShrink: 0 }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Inline CTA */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] px-5 py-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
          >
            <div>
              <p className="font-semibold" style={{ color: "var(--heading)", marginBottom: "0.15rem" }}>
                Need same-day service in {data.name}?
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--stone)" }}>
                We respond within 30 minutes during business hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3" style={{ flexShrink: 0 }}>
              <a href={BUSINESS.phoneHref} className="btn-primary">
                <Phone size={15} /> Call Now
              </a>
              <TextUsCTA className="btn-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <BrandsMarquee />

      {/* BRANDS WE REPAIR — generated from BRANDS data, every brand added there appears automatically */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <h2
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.75rem",
              borderLeft: "4px solid var(--brown)",
              paddingLeft: "0.75rem",
            }}
          >
            Gate Operator and Opener Brands We Repair in {data.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BRAND_CATEGORY_GROUPS.map((group) => (
              <div key={group.name}>
                <h3
                  className="font-heading font-semibold mb-1"
                  style={{ fontSize: "0.95rem", color: "var(--heading)" }}
                >
                  {group.name}
                </h3>
                <p style={{ color: "var(--text-soft)", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
                  {group.sentence}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.slugs.map((slug) => {
                    const b = BRANDS.find((brand) => brand.slug === slug);
                    if (!b) return null;
                    return (
                      <Link
                        key={b.slug}
                        href={`/brands/${b.slug}`}
                        className="px-3 py-1.5 rounded-full text-sm"
                        style={{ background: "var(--bg-muted)", border: "1px solid var(--line)", color: "var(--text-mid)", textDecoration: "none" }}
                      >
                        {b.name} {anchorVerb(b.type)} in {data.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-max">
          <div className="grid grid-cols-3 gap-3">
            {photoStrip.map((photo, i) => (
              <ArchImage
                key={i}
                src={photo.src}
                alt={`${photo.alt} in ${data.name}`}
                aspect="3/4"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* TEXT + everything else */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <div>
              {data.intro.split("\n\n").map((para, i) => (
                <p key={i} className="leading-relaxed mb-4" style={{ color: "var(--text-mid)", fontSize: "1.02rem" }}>
                  <InlineLinks text={para} />
                </p>
              ))}
            </div>

            {/* Why Us */}
            <div>
              <h2
                style={{
                  marginBottom: "1.25rem",
                  fontSize: "1.75rem",
                  borderLeft: "4px solid var(--brown)",
                  paddingLeft: "0.75rem",
                }}
              >
                Why {data.name} Residents Choose Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.whyUs.map((item) => (
                  <div key={item.title} className="card" style={{ borderTop: "3px solid var(--brown-warm)" }}>
                    <h3
                      className="font-heading font-semibold mb-2"
                      style={{ fontSize: "0.95rem", color: "var(--heading)" }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.88rem" }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA after Why Us */}
              <div className="flex flex-wrap gap-3 mt-6">
                <a href={BUSINESS.phoneHref} className="btn-primary">
                  <Phone size={16} /> Call {BUSINESS.phone}
                </a>
                <TextUsCTA className="btn-secondary" />
                <Link href="/contact" className="btn-secondary">
                  Request Free Estimate
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2
                style={{
                  marginBottom: "1.25rem",
                  fontSize: "1.75rem",
                  borderLeft: "4px solid var(--brown)",
                  paddingLeft: "0.75rem",
                }}
              >
                {data.name} — Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {data.faq.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-[var(--radius-lg)] p-5"
                    style={{ border: "1px solid var(--line)", background: "var(--bg-card)" }}
                  >
                    <h3
                      className="font-heading font-semibold mb-2"
                      style={{ fontSize: "1rem", color: "var(--heading)" }}
                    >
                      {f.q}
                    </h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.92rem" }}>{f.a}</p>
                  </div>
                ))}

                {/* Generated from BRANDS data — new brands appear here automatically */}
                <div
                  className="rounded-[var(--radius-lg)] p-5"
                  style={{ border: "1px solid var(--line)", background: "var(--bg-card)" }}
                >
                  <h3
                    className="font-heading font-semibold mb-2"
                    style={{ fontSize: "1rem", color: "var(--heading)" }}
                  >
                    {brandsFaqQuestion}
                  </h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem" }}>
                    We repair all major gate operator and garage door opener brands in {data.name}, including {cityBrandNames}.
                    Our most-requested brands are{" "}
                    <Link href="/brands/liftmaster" className="rg-link">LiftMaster</Link>,{" "}
                    <Link href="/brands/viking" className="rg-link">Viking</Link>, and{" "}
                    <Link href="/brands/elite" className="rg-link">Elite</Link>.
                  </p>
                </div>
              </div>
            </div>

            {/* Nearby Areas — hidden when there are fewer than 3 real neighbors */}
            {nearbyCities.length >= 3 ? (
              <div>
                <h2
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.4rem",
                    borderLeft: "4px solid var(--brown)",
                    paddingLeft: "0.75rem",
                  }}
                >
                  Nearby Areas We Serve
                </h2>
                <div className="flex flex-wrap gap-2">
                  {nearbyCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/areas/${c.slug}`}
                      className="px-3 py-1.5 rounded-full text-sm transition-colors"
                      style={{
                        background: "var(--bg-muted)",
                        color: "var(--text-mid)",
                        border: "1px solid var(--line)",
                        textDecoration: "none",
                      }}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.4rem",
                    borderLeft: "4px solid var(--brown)",
                    paddingLeft: "0.75rem",
                  }}
                >
                  All Our Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="px-3 py-1.5 rounded-full text-sm transition-colors"
                      style={{
                        background: "var(--bg-muted)",
                        color: "var(--text-mid)",
                        border: "1px solid var(--line)",
                        textDecoration: "none",
                      }}
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div
              className="section--dark rounded-[var(--radius-lg)] p-6 text-center"
              style={{ background: "var(--navy)" }}
            >
              <h2 className="font-heading font-bold text-xl mb-2" style={{ color: "var(--text-warm)" }}>
                Ready for Same-Day Service in {data.name}?
              </h2>
              <SectionRule />
              <p style={{ color: "rgba(216,234,208,0.7)", fontSize: "0.9rem", marginTop: "1.25rem", marginBottom: "1.25rem" }}>
                Call now or fill out the form — we respond within 30 minutes during business hours.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={BUSINESS.phoneHref} className="btn-gold">
                  <Phone size={16} /> Call {BUSINESS.phone}
                </a>
                <TextUsCTA className="btn-secondary" />
                <Link href="/contact" className="btn-secondary">
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div
              className="rounded-[var(--radius-lg)] p-5 text-center"
              style={{ background: "var(--navy)" }}
            >
              <p
                className="font-heading font-bold mb-3"
                style={{ fontSize: "1rem", color: "var(--text-warm)" }}
              >
                Same-Day Service in {data.name}
              </p>
              <a href={BUSINESS.phoneHref} className="btn-gold w-full justify-center">
                <Phone size={16} /> {BUSINESS.phone}
              </a>
              <TextUsCTA className="btn-secondary w-full justify-center mt-2" label="Text Us a Photo" />
              <p style={{ fontSize: "0.78rem", color: "rgba(216,234,208,0.75)", marginTop: "0.75rem" }}>
                Bonded &amp; Insured · Sun–Fri 7AM–10PM
              </p>
            </div>

            <p className="text-center font-heading font-bold" style={{ color: "#4db87a", fontSize: "1.05rem" }}>
              Get a Free Estimate in {data.name}
            </p>
            <p className="text-center" style={{ fontSize: "0.8rem", color: "var(--stone)" }}>
              Call and a technician diagnoses it on-site — you get the price in writing before any work.
            </p>
            <ContactForm />

            {/* Google Map + business card */}
            <div
              className="rounded-[var(--radius-lg)] overflow-hidden"
              style={{ border: "2px solid var(--brown-warm)" }}
            >
              <div
                className="px-4 py-2.5"
                style={{ background: "var(--brown)", color: "#fff" }}
              >
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  📍 Serving {data.name}, CA
                </span>
              </div>
              <div style={{ background: "var(--bg-muted)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  title={`Map — ${data.name}, CA gate and garage door service`}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Business card below map */}
              <div
                className="px-4 py-3 flex items-center justify-between gap-3"
                style={{ background: "var(--bg-card)", borderTop: "1px solid var(--line)" }}
              >
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--heading)", lineHeight: 1.2 }}>
                    Real Gate &amp; Garage Door
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "var(--stone)", marginTop: "0.2rem" }}>
                    ★★★★★ 5-Star Rated · Bonded &amp; Insured
                  </p>
                </div>
                <a
                  href={BUSINESS.phoneHref}
                  style={{ fontSize: "0.78rem", color: "var(--brown-warm)", fontWeight: 700, textDecoration: "none", flexShrink: 0 }}
                >
                  {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
