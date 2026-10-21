import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { BUSINESS, ALL_CITIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service Areas — LA & SoCal Cities | Real Gate & Garage Door",
  description:
    `Real Gate & Garage Door serves ${ALL_CITIES.length}+ cities across Los Angeles & Southern California. Same-day gate and garage door repair near you. Call (818) 915-5715.`,
  alternates: { canonical: "/service-areas" },
};

const REGIONS: { name: string; slugs: string[] }[] = [
  {
    name: "San Fernando Valley",
    slugs: ["woodland-hills", "sherman-oaks", "encino", "calabasas", "tarzana", "chatsworth", "van-nuys", "reseda", "northridge", "north-hollywood", "studio-city", "burbank", "glendale", "canoga-park"],
  },
  {
    name: "Greater LA",
    slugs: ["los-angeles", "beverly-hills", "west-hollywood", "santa-monica", "culver-city", "silver-lake", "los-feliz", "eagle-rock", "hollywood", "bel-air", "malibu", "pasadena", "alhambra", "hacienda-heights", "glendora"],
  },
  {
    name: "Beaches & South Bay",
    slugs: ["manhattan-beach", "redondo-beach", "torrance", "huntington-beach", "newport-beach", "long-beach", "orange", "fullerton", "anaheim", "irvine", "orange-county"],
  },
  {
    name: "North LA County",
    slugs: ["santa-clarita", "palmdale", "lancaster"],
  },
  {
    name: "Central Coast & Beyond",
    slugs: ["thousand-oaks", "simi-valley", "santa-barbara", "ventura", "oxnard", "camarillo", "fresno", "bakersfield", "ventura-county"],
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 section--dark">
        <div className="container-max max-w-2xl">
          <span className="eyebrow">Where We Work</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            Gate & Garage Door Repair — <em>Service Areas</em>
          </h1>
          <p style={{ color: "rgba(237,234,228,0.75)", fontSize: "1.05rem" }}>
            We serve cities across Los Angeles &amp; Southern California —
            from Malibu to Long Beach, Santa Barbara to Orange County.
          </p>
        </div>
      </section>

      {/* Photo strip — visual proof of work across the region */}
      {/* TODO: An interactive Google Maps embed showing coverage radius could replace this section */}
      <section style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--line)" }}>
        <div className="grid grid-cols-4" style={{ height: 200 }}>
          {[
            { src: "/images/gallery/gate-2.webp", alt: "Gate repair service Los Angeles" },
            { src: "/images/services/whatsapp-photo-2.webp", alt: "Gate and garage door service Los Angeles" },
            { src: "/images/services/commercial-2.webp", alt: "Commercial garage door service near you" },
            { src: "/images/services/frezno-gate.webp", alt: "Custom iron gate installation" },
          ].map((photo, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden", height: 200 }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="25vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(11,28,46,0.15)" }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">

          {REGIONS.map((region) => {
            const cities = region.slugs
              .map((slug) => ALL_CITIES.find((c) => c.slug === slug))
              .filter((c): c is { name: string; slug: string } => Boolean(c));
            return (
              <div key={region.name} className="mb-14">
                <div className="flex items-center gap-3 mb-8">
                  <h2 style={{ fontSize: "1.4rem", color: "var(--navy)" }}>{region.name}</h2>
                  <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/areas/${c.slug}`}
                      className="card flex items-center gap-3 transition-all duration-200 hover:shadow-md"
                      style={{ textDecoration: "none" }}
                    >
                      <MapPin size={18} className="flex-shrink-0" style={{ color: "var(--brown-light)" }} />
                      <div>
                        <p
                          className="font-heading font-semibold"
                          style={{ color: "var(--navy)", fontSize: "0.95rem" }}
                        >
                          {c.name}
                        </p>
                        <p style={{ color: "var(--stone)", fontSize: "0.78rem" }}>
                          Gate &amp; Garage Door Repair · {c.name}, CA
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Not in list CTA */}
          <div
            className="rounded-[var(--radius-lg)] p-8 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
          >
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy)", marginBottom: "0.75rem" }}>
              Don&apos;t See Your City?
            </h2>
            <p style={{ color: "var(--text-soft)", maxWidth: 520, margin: "0 auto 1.75rem", fontSize: "0.95rem" }}>
              We may still be able to reach you. Our coverage extends throughout Los Angeles
              &amp; Southern California — call us and we&apos;ll let you know.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={BUSINESS.phoneHref} className="btn-primary">
                <Phone size={16} /> Call {BUSINESS.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
