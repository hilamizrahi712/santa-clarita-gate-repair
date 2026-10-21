import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle, ArrowRight, Clock, Shield, Star, AlertCircle } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";
import { BUSINESS, SCV_CITIES, ORG_ID } from "@/lib/constants";
import { CITIES, PRIORITY_CITY_SLUGS } from "@/lib/cities-data";

// Services that compete most directly with the city pages for "gate repair <city>" —
// these get a "Gate repair by city" block pointing search signal at the priority cities.
const GATE_CITY_SIGNAL_SLUGS = [
  "gate-repair",
  "emergency-gate-repair",
  "commercial-gate-repair",
  "automatic-gate-repair",
  "electric-gate-repair",
  "gate-motor-replacement",
];
import ContactForm from "@/components/ContactForm";
import ArchImage from "@/components/ArchImage";
import InlineLinks from "@/components/InlineLinks";
import BrandsMarquee from "@/components/BrandsMarquee";
import TextUsCTA from "@/components/TextUsCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const url = `/services/${slug}`;
  const ogImage = { url: "/images/og/og-default.jpg", width: 1200, height: 630 };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url, images: [ogImage] },
    twitter: { card: "summary_large_image", images: [ogImage.url] },
  };
}

// Map service slugs to real uploaded images — each service gets a unique photo
const SERVICE_IMAGES: Record<string, string> = {
  "gate-repair":                  "/images/services/iron-gate-1.webp",
  "automatic-gate-repair":        "/images/services/gate-motor.webp",
  "driveway-gate-repair":         "/images/gallery/driveway-swing-gate-spanish-villa.webp",
  "electric-gate-repair":         "/images/gallery/modern-black-slat-gate.webp",
  "gate-opener-repair":           "/images/gallery/slat-swing-gate-opener.webp",
  "gate-motor-replacement":       "/images/services/swing-motor.webp",
  "iron-gate-repair":             "/images/services/estate-gate.webp",
  "commercial-gate-repair":       "/images/gallery/iron-gate-community-entrance.webp",
  "emergency-gate-repair":        "/images/services/gate-motor.webp",
  "gate-installation":            "/images/brands/all-o-matic/all-o-matic-2.webp",
  "garage-door-repair":           "/images/services/white-garage.webp",
  "garage-door-spring-repair":    "/images/services/walnut-garage.webp",
  "garage-door-opener-repair":    "/images/services/garage-door-repair.webp",
  "garage-door-cable-repair":     "/images/gallery/commercial-1.webp",
  "garage-door-panel-repair":     "/images/services/garage-door-repair.webp",
  "emergency-garage-door-repair": "/images/services/whatsapp-photo-1.webp",
  "commercial-garage-door":       "/images/services/commercial-3.webp",
  "garage-door-installation":     "/images/gallery/outside-1.webp",
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => service.relatedSlugs.includes(s.slug));
  const heroImg = SERVICE_IMAGES[slug] ?? "/images/gallery/gate-1.webp";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Los Angeles County, CA" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} — Related Services`,
      itemListElement: related.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: `${BUSINESS.domain}/services/${s.slug}`,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.domain },
      { "@type": "ListItem", position: 2, name: service.title, item: `${BUSINESS.domain}/services/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: "50vh" }}>
        <Image
          src={heroImg}
          alt={service.heroH1}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(11,28,46,0.96) 0%, rgba(11,28,46,0.6) 55%, rgba(11,28,46,0.25) 100%)" }}
        />
        {service.isEmergency && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
            <span
              className="font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: "#B03025", color: "#fff" }}
            >
              24/7 Emergency Service
            </span>
          </div>
        )}
        <div className="relative z-10 container-max pb-12 pt-32">
          <div className="max-w-2xl">
            <span className="eyebrow" style={{ color: "rgba(196,133,90,0.9)" }}>
              {service.isEmergency ? "Emergency Response" : service.isInstallation ? "Installation" : "Repair Service"}
            </span>
            <h1 style={{ color: "var(--text-warm)", marginBottom: "0.75rem" }}>
              {service.heroH1}
            </h1>
            <p style={{ color: "rgba(237,234,228,0.82)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
              {service.heroSubtitle}
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
        </div>
      </section>

      {/* TIMING & AVAILABILITY BOX */}
      <div style={{ background: "var(--brown)", padding: "0.85rem 1rem" }}>
        <div className="container-max text-center">
          <p className="font-semibold" style={{ color: "var(--text-warm)", fontSize: "0.95rem" }}>
            {service.isInstallation ? "Free on-site quote" : "Fixed same-day · Free on-site estimate"}
          </p>
          <p className="text-sm font-medium mt-1.5" style={{ color: "rgba(255,255,255,0.85)" }}>
            On-site service across greater Los Angeles, Ventura County, Orange County and the Central Valley.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main Column */}
            <div className="lg:col-span-2 space-y-10">

              {/* Intro */}
              <div>
                {service.intro.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed mb-4" style={{ color: "var(--text-mid)", fontSize: "1.02rem" }}>
                    <InlineLinks text={para} />
                  </p>
                ))}
              </div>

              {/* Symptoms */}
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <h2 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
                  Sound <em>Familiar?</em>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {service.symptoms.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--brown-warm)" }} />
                      <span style={{ color: "var(--text-mid)", fontSize: "0.92rem" }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo */}
              <ArchImage
                src={heroImg}
                alt={`${service.title} in Los Angeles`}
                aspect="4/5"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />

              {/* Features */}
              <div>
                <h2 style={{ marginBottom: "1.25rem", fontSize: "1.75rem" }}>
                  What We Do for {service.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.features.map((f, i) => (
                    <div key={f.title} className="card" style={{ borderTop: "3px solid var(--brown)" }}>
                      <p
                        className="font-heading font-bold mb-3"
                        style={{ fontSize: "1.5rem", color: "var(--brown-warm)", lineHeight: 1 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3
                        className="font-heading font-semibold mb-1"
                        style={{ fontSize: "0.95rem", color: "var(--navy)" }}
                      >
                        {f.title}
                      </h3>
                      <p style={{ color: "var(--text-soft)", fontSize: "0.875rem" }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h2 style={{ marginBottom: "1.25rem", fontSize: "1.75rem" }}>How It Works</h2>
                <ol className="space-y-4">
                  {service.howItWorks.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm"
                        style={{ background: "var(--brown)", color: "var(--text-warm)" }}
                      >
                        {i + 1}
                      </span>
                      <p className="pt-1" style={{ color: "var(--text-mid)" }}>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQ */}
              <div>
                <h2 style={{ marginBottom: "1.25rem", fontSize: "1.75rem" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
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

              {/* Related Services */}
              {related.length > 0 && (
                <div>
                  <h2 style={{ marginBottom: "1rem", fontSize: "1.75rem" }}>Related Services</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/services/${r.slug}`}
                        className="card transition-all hover:shadow-md"
                        style={{ textDecoration: "none" }}
                      >
                        <h3
                          className="font-heading font-semibold mb-1"
                          style={{ fontSize: "0.95rem", color: "var(--navy)" }}
                        >
                          {r.title}
                        </h3>
                        <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
                          {r.heroSubtitle}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-sm font-semibold"
                          style={{ color: "var(--brown)" }}
                        >
                          Learn more <ArrowRight size={12} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Areas */}
              <div>
                <h2 style={{ marginBottom: "0.75rem", fontSize: "1.75rem" }}>Service Areas</h2>
                <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                  We provide {service.title.toLowerCase()} across greater Los Angeles:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SCV_CITIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/areas/${c.slug}`}
                      className="px-3 py-1 rounded-full text-sm transition-colors"
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

              {/* Gate Repair By City — priority cities, signals the city page for "gate repair <city>" */}
              {GATE_CITY_SIGNAL_SLUGS.includes(slug) && (
                <div>
                  <h2 style={{ marginBottom: "0.75rem", fontSize: "1.5rem" }}>Gate Repair by City</h2>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                    We cover all of greater Los Angeles. Here's more on gate repair in the areas we serve most:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITY_CITY_SLUGS.map((citySlug) => {
                      const c = CITIES.find((city) => city.slug === citySlug);
                      if (!c) return null;
                      return (
                        <Link
                          key={c.slug}
                          href={`/areas/${c.slug}`}
                          className="px-3 py-1 rounded-full text-sm transition-colors"
                          style={{
                            background: "var(--bg-muted)",
                            color: "var(--text-mid)",
                            border: "1px solid var(--line)",
                            textDecoration: "none",
                          }}
                        >
                          Gate repair in {c.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:self-start" style={{ top: "7rem" }}>
              {/* Same-Day CTA box */}
              <div
                className="rounded-[var(--radius-lg)] overflow-hidden"
                style={{ border: "1px solid var(--line)" }}
              >
                <div
                  className="p-5 text-center"
                  style={{ background: "var(--navy)" }}
                >
                  <p
                    className="font-heading font-bold mb-1"
                    style={{ fontSize: "1.1rem", color: "var(--text-warm)" }}
                  >
                    Same-Day Service
                  </p>
                  <p style={{ color: "rgba(237,234,228,0.65)", fontSize: "0.82rem", marginBottom: "1rem" }}>
                    Call now — we confirm your appointment immediately.
                  </p>
                  <a href={BUSINESS.phoneHref} className="btn-gold w-full justify-center">
                    <Phone size={16} /> {BUSINESS.phone}
                  </a>
                  <TextUsCTA className="btn-secondary w-full justify-center mt-2" label="Text Us a Photo" />
                </div>
                <div
                  className="p-4"
                  style={{ background: "var(--bg-card)", borderTop: "1px solid var(--line)" }}
                >
                  <div className="space-y-2.5">
                    {[
                      { Icon: Shield, label: "Bonded & Insured" },
                      { Icon: Clock, label: "Sun–Fri, 24/7 for Emergencies" },
                      { Icon: Star, label: "Upfront Pricing — No Surprises" },
                    ].map(({ Icon, label }) => (
                      <div key={label} className="flex items-center gap-2">
                        <Icon size={14} className="flex-shrink-0" style={{ color: "var(--brown-light)" }} />
                        <span style={{ fontSize: "0.82rem", color: "var(--text-mid)" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS WE SERVICE */}
      <BrandsMarquee />
    </>
  );
}
