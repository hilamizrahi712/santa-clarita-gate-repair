import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle, ArrowRight, Clock, Shield, Star, AlertCircle } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { BUSINESS, SCV_CITIES, AV_CITIES, ALL_CITIES, ORG_ID } from "@/lib/constants";
import { CITIES, PRIORITY_CITY_SLUGS } from "@/lib/cities-data";

// Services that compete most directly with the city pages for "gate repair <city>";
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
import InlineLinks from "@/components/InlineLinks";
import BrandsGrid from "@/components/BrandsGrid";
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
  const ogImage = { url: IMAGES.og, width: 1200, height: 630 };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url, images: [ogImage] },
    twitter: { card: "summary_large_image", images: [ogImage.url] },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => service.relatedSlugs.includes(s.slug));
  const heroImg = IMAGES.services[slug] ?? IMAGES.serviceFallback;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    provider: { "@id": ORG_ID },
    areaServed: ALL_CITIES.map((c) => ({ "@type": "City", name: `${c.name}, CA` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title}: related services`,
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
          alt={IMAGE_ALT[heroImg] ?? service.heroH1}
          fill
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.25) 100%)" }}
        />
        {service.isEmergency && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
            <span
              className="font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-[var(--radius)]"
              style={{ background: "#B03025", color: "#fff" }}
            >
              24/7 Emergency Service
            </span>
          </div>
        )}
        <div className="relative z-10 container-max pb-12 pt-32">
          <div className="max-w-2xl">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.88)" }}>
              {service.isEmergency ? "Emergency Response" : service.isInstallation ? "Installation" : "Repair Service"}
            </span>
            <h1 style={{ color: "var(--text-warm)", marginBottom: "0.75rem" }}>
              {service.heroH1}
            </h1>
            <p style={{ color: "rgba(238,241,239,0.82)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
              {service.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={BUSINESS.phoneHref} className="btn-gold">
                <Phone size={16} /> Call {BUSINESS.phone}
              </a>
              <TextUsCTA className="btn-ghost" />
              <Link href="/contact" className="btn-ghost">
                Request a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TIMING & AVAILABILITY BOX */}
      <div style={{ background: "var(--brown)", padding: "0.85rem 1rem" }}>
        <div className="container-max text-center">
          <p className="font-semibold" style={{ color: "var(--text-warm)", fontSize: "0.95rem" }}>
            {service.isEmergency ? "24/7 emergency dispatch · Call now" : "Free on-site quote · Call or text a photo"}
          </p>
          <p className="text-sm font-medium mt-1.5" style={{ color: "rgba(255,255,255,0.85)" }}>
            Technicians covering the Santa Clarita Valley and the Antelope Valley, Castaic to Pearblossom.
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

              {/* Installation by setting: high desert, ranch, HOA, hillside */}
              {service.settings?.map((st) => (
                <div key={st.heading}>
                  <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>{st.heading}</h2>
                  {st.body.split("\n\n").map((para, i) => (
                    <p key={i} className="leading-relaxed mb-4" style={{ color: "var(--text-mid)", fontSize: "1rem" }}>
                      {para}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-2">
                    {st.citySlugs.map((citySlug) => {
                      const c = CITIES.find((city) => city.slug === citySlug);
                      if (!c) return null;
                      return (
                        <Link
                          key={c.slug}
                          href={`/areas/${c.slug}`}
                          className="px-3 py-1 rounded-[var(--radius)] text-sm"
                          style={{ background: "var(--bg-muted)", color: "var(--text-mid)", border: "1px solid var(--line)", textDecoration: "none" }}
                        >
                          {c.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Symptoms */}
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <h2 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
                  Is Your {service.isInstallation ? "Property" : "Gate or Door"} Doing This?
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
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", border: "1px solid var(--line-strong)" }}>
                <Image src={heroImg} alt={IMAGE_ALT[heroImg] ?? service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>

              {/* Features */}
              <div>
                <h2 style={{ marginBottom: "1.25rem", fontSize: "1.75rem" }}>
                  {service.title}: What We Fix
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
                        style={{ fontSize: "0.95rem", color: "var(--heading)" }}
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
                <h2 style={{ marginBottom: "1.25rem", fontSize: "1.75rem" }}>From Your Call to a Working {service.slug.includes("garage") ? "Door" : "Gate"}</h2>
                <ol className="space-y-4">
                  {service.howItWorks.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-[var(--radius)] font-bold flex items-center justify-center text-sm"
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
                  {service.title} Questions from SCV Homeowners
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

              {/* Related Services */}
              {related.length > 0 && (
                <div>
                  <h2 style={{ marginBottom: "1rem", fontSize: "1.75rem" }}>You May Also Need</h2>
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
                          style={{ fontSize: "0.95rem", color: "var(--heading)" }}
                        >
                          {r.title}
                        </h3>
                        <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
                          {r.heroSubtitle}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-sm font-semibold"
                          style={{ color: "var(--brown-warm)" }}
                        >
                          View service <ArrowRight size={12} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Areas */}
              <div>
                <h2 style={{ marginBottom: "0.75rem", fontSize: "1.75rem" }}>Where We Send Technicians</h2>
                {[
                  { label: "Santa Clarita Valley", cities: SCV_CITIES },
                  { label: "Antelope Valley", cities: AV_CITIES },
                ].map((region) => (
                <div key={region.label} className="mb-4">
                <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                  {service.title} in the {region.label}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {region.cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/areas/${c.slug}`}
                      className="px-3 py-1 rounded-[var(--radius)] text-sm transition-colors"
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
                ))}
              </div>

              {/* Gate Repair By City: priority cities, signals the city page for "gate repair <city>" */}
              {GATE_CITY_SIGNAL_SLUGS.includes(slug) && (
                <div>
                  <h2 style={{ marginBottom: "0.75rem", fontSize: "1.5rem" }}>Local Gate Repair Pages</h2>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                    See how we handle gates in the communities that call us most:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITY_CITY_SLUGS.map((citySlug) => {
                      const c = CITIES.find((city) => city.slug === citySlug);
                      if (!c) return null;
                      return (
                        <Link
                          key={c.slug}
                          href={`/areas/${c.slug}`}
                          className="px-3 py-1 rounded-[var(--radius)] text-sm transition-colors"
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
              {/* Call/text CTA box */}
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
                    Talk to a Local Tech
                  </p>
                  <p style={{ color: "rgba(238,241,239,0.65)", fontSize: "0.82rem", marginBottom: "1rem" }}>
                    Call or text and we set your visit while you are on the line.
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
                      { Icon: Clock, label: "Sun to Fri 7AM to 10PM" },
                      { Icon: Star, label: "24/7 emergency dispatch" },
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
      <BrandsGrid />
    </>
  );
}
