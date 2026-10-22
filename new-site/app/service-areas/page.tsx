import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { BUSINESS, ALL_CITIES, SCV_CITIES, AV_CITIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Service Areas: Santa Clarita & Antelope Valley | ${BUSINESS.name}`,
  description:
    `Gate and garage door repair in ${ALL_CITIES.length} communities across the Santa Clarita and Antelope Valleys, from Castaic and Valencia to Lancaster and Pearblossom.`,
  alternates: { canonical: "/service-areas" },
};

const REGIONS: { name: string; blurb: string; cities: { name: string; slug: string }[] }[] = [
  {
    name: "Santa Clarita Valley",
    blurb: "Planned communities, older tracts, canyon lots and horse country.",
    cities: SCV_CITIES,
  },
  {
    name: "Antelope Valley",
    blurb: "High desert cities, ranch land and the foothill lake communities.",
    cities: AV_CITIES,
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
            {ALL_CITIES.length} Communities, <em>Two Valleys</em>
          </h1>
          <p style={{ color: "rgba(216,234,208,0.75)", fontSize: "1.05rem" }}>
            Our technicians cover the Santa Clarita Valley and the Antelope Valley, from Stevenson Ranch
            and Castaic in the west to Lancaster, Littlerock and Pearblossom in the east.
          </p>
        </div>
      </section>

      {/* Photo strip — visual proof of work across the region */}
      <section style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--line)" }}>
        <div className="grid grid-cols-4" style={{ height: 200 }}>
          {IMAGES.serviceAreasStrip.map((src) => ({ src, alt: IMAGE_ALT[src] })).map((photo, i) => (
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
                style={{ background: "rgba(0,0,0,0.15)" }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">

          {REGIONS.map((region) => {
            const cities = region.cities;
            return (
              <div key={region.name} className="mb-14">
                <div className="flex items-center gap-3 mb-8">
                  <h2 style={{ fontSize: "1.4rem", color: "var(--heading)" }}>{region.name}</h2>
                  <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
                </div>
                <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", marginTop: "-1.25rem", marginBottom: "1.5rem" }}>
                  {region.blurb}
                </p>
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
                          style={{ color: "var(--heading)", fontSize: "0.95rem" }}
                        >
                          {c.name}
                        </p>
                        <p style={{ color: "var(--stone)", fontSize: "0.78rem" }}>
                          Gates and garage doors in {c.name}
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
            <h2 style={{ fontSize: "1.5rem", color: "var(--heading)", marginBottom: "0.75rem" }}>
              Near One of These Communities?
            </h2>
            <p style={{ color: "var(--text-soft)", maxWidth: 520, margin: "0 auto 1.75rem", fontSize: "0.95rem" }}>
              If your property sits between two of the places above, or just outside them, call or text
              and we will tell you straight away whether we can come out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={BUSINESS.phoneHref} className="btn-primary">
                <Phone size={16} /> Call {BUSINESS.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Free On-Site Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
