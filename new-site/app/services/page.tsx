import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SERVICES, type ServiceData } from "@/lib/services-data";
import { BUSINESS } from "@/lib/constants";
import TextUsCTA from "@/components/TextUsCTA";

export const metadata: Metadata = {
  title: `Gate & Garage Door Services | ${BUSINESS.name}`,
  description: `Gate repair, gate operators, iron work, garage door springs, openers and installs across the Santa Clarita and Antelope Valleys. Free on-site quote. Call or text ${BUSINESS.phone}.`,
  alternates: { canonical: "/services" },
};

function groupOf(s: ServiceData): "gate" | "garage" | "install" {
  if (s.isInstallation) return "install";
  return s.slug.includes("garage-door") ? "garage" : "gate";
}

const GROUPS = [
  {
    key: "gate" as const,
    label: "Gate Services",
    description: "Slide, swing, iron, HOA and ranch gates, plus the operators, sensors and keypads that run them.",
  },
  {
    key: "garage" as const,
    label: "Garage Door Services",
    description: "Broken springs, snapped cables, worn openers and dented panels on home and business doors.",
  },
  {
    key: "install" as const,
    label: "Installation",
    description: "New driveway gates, operators and garage doors planned around your property.",
  },
];

function ServiceRow({ service, n }: { service: ServiceData; n: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="spec-row">
      <span className="spec-num">{String(n).padStart(2, "0")}</span>
      <span>
        <span className="spec-name">{service.title}</span>
        <span className="spec-desc">{service.heroSubtitle}</span>
      </span>
      <span className="spec-arrow text-sm font-semibold">{service.isInstallation ? "Install →" : "Repair →"}</span>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 section--dark">
        <div className="container-max max-w-2xl">
          <span className="eyebrow">Gates First, Then Garage Doors</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            Everything We Fix in the SCV and AV
          </h1>
          <p style={{ color: "rgba(238,241,239,0.75)", fontSize: "1.05rem" }}>
            Local technicians for homes first and businesses second, from Valencia and Saugus out to
            Palmdale and Lancaster. Call or text a photo and we take it from there.
          </p>
        </div>
      </section>

      {/* Service grid by group */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="flex flex-col gap-16">
            {GROUPS.map((group) => {
              const services = SERVICES.filter((s) => groupOf(s) === group.key);
              if (services.length === 0) return null;
              return (
                <div key={group.key}>
                  <div className="mb-7">
                    <h2
                      className="font-heading font-bold"
                      style={{ fontSize: "1.5rem", color: "var(--heading)", marginBottom: "0.35rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                    >
                      {group.label}
                    </h2>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", paddingLeft: "1rem" }}>
                      {group.description}
                    </p>
                  </div>
                  <div className="spec-list">
                    {services.map((service, i) => (
                      <ServiceRow key={service.slug} service={service} n={i + 1} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section--dark">
        <div className="container-max max-w-2xl text-center">
          <h2 style={{ color: "var(--text-warm)", marginBottom: "0.75rem" }}>
            Can&apos;t Tell What Broke?
          </h2>
          <p style={{ color: "rgba(238,241,239,0.7)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            That is our job. Call or text a photo of the gate or door and a technician will find the
            cause on site and give you a free quote before any work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn-gold">
              <Phone size={16} /> Call {BUSINESS.phone}
            </a>
            <TextUsCTA className="btn-secondary" />
            <Link href="/contact" className="btn-secondary">
              Request a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
