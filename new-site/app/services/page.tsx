import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SERVICES, type ServiceData } from "@/lib/services-data";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gate & Garage Door Services | Real Gate & Garage Door",
  description:
    "Every gate and garage door service we offer across greater Los Angeles — repair, opener and spring service, iron gate work, installation, and 24/7 emergency response. Call (818) 915-5715.",
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
    description: "Repair and service for driveway, sliding, swing, iron, and commercial gates and their operators.",
  },
  {
    key: "garage" as const,
    label: "Garage Door Services",
    description: "Springs, cables, openers, panels, and emergency service for residential and commercial doors.",
  },
  {
    key: "install" as const,
    label: "Installation",
    description: "New gate and garage door systems, sized and fitted to your property.",
  },
];

function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card flex flex-col gap-3 transition-all duration-200 hover:shadow-md"
      style={{ textDecoration: "none" }}
    >
      <h3
        className="font-heading font-bold"
        style={{ fontSize: "1.05rem", color: "var(--heading)" }}
      >
        {service.title}
      </h3>
      <p style={{ fontSize: "0.88rem", color: "var(--text-soft)", lineHeight: 1.55, flexGrow: 1 }}>
        {service.heroSubtitle}
      </p>
      <span
        style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--brown-warm)", marginTop: "auto" }}
      >
        {service.isInstallation ? "See installation details →" : "See repair details →"}
      </span>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 section--dark">
        <div className="container-max max-w-2xl">
          <span className="eyebrow">What We Do</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            Gate &amp; Garage Door <em>Services</em>
          </h1>
          <p style={{ color: "rgba(216,234,208,0.75)", fontSize: "1.05rem" }}>
            On-site repair and installation across greater Los Angeles, Ventura County, Orange
            County and the Central Valley. Most repairs are completed the same day, in a single visit.
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service) => (
                      <ServiceCard key={service.slug} service={service} />
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
            Not Sure What You Need?
          </h2>
          <p style={{ color: "rgba(216,234,208,0.7)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Describe what your gate or garage door is doing and we&apos;ll tell you what it takes to fix it —
            with the price before any work starts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn-gold">
              <Phone size={16} /> Call {BUSINESS.phone}
            </a>
            <Link href="/contact" className="btn-secondary">
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
