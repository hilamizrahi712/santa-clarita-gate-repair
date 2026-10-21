import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BRANDS, type BrandData } from "@/lib/brands-data";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gate & Garage Door Brands We Service | Real Gate & Garage Door",
  description:
    "We repair and service all major gate operator and garage door brands — LiftMaster, Viking, Genie, DoorKing, Chamberlain, and more. Insured technicians across greater Los Angeles.",
  alternates: { canonical: "/brands" },
};

const CATEGORIES = [
  {
    key: "gate",
    label: "Gate Operators",
    description: "Brands specializing in driveway and commercial gate automation.",
  },
  {
    key: "both",
    label: "Gate & Garage Door",
    description: "Brands offering full solutions for both gates and garage doors.",
  },
  {
    key: "garage-door",
    label: "Garage Door Openers",
    description: "Leading manufacturers of residential and commercial garage door openers.",
  },
  {
    key: "access-control",
    label: "Access Control Systems",
    description: "Intercoms, telephone entry, and integrated access control brands.",
  },
] as const;

function BrandCard({ brand }: { brand: BrandData }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="card flex flex-col gap-4 transition-all duration-200 hover:shadow-md"
      style={{ textDecoration: "none" }}
    >
      <div
        className="flex items-center justify-center rounded-[var(--radius)]"
        style={{ height: 80, background: "var(--bg-muted)", padding: "1rem" }}
      >
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={160}
          height={56}
          style={{ objectFit: "contain", maxHeight: 56, width: "auto" }}
          unoptimized
        />
      </div>
      <div>
        <h3
          className="font-heading font-bold"
          style={{ fontSize: "1.1rem", color: "var(--navy)", marginBottom: "0.3rem" }}
        >
          {brand.name}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-soft)", lineHeight: 1.5 }}>
          {brand.tagline}
        </p>
      </div>
      <span
        style={{
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "var(--brown-warm)",
          marginTop: "auto",
        }}
      >
        View Services →
      </span>
    </Link>
  );
}

export default function BrandsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 section--dark">
        <div className="container-max max-w-2xl">
          <span className="eyebrow">Brands We Service</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            Every Major Brand. <em>Expert Repair.</em>
          </h1>
          <p style={{ color: "rgba(237,234,228,0.75)", fontSize: "1.05rem" }}>
            Our technicians bring hands-on experience with every leading gate operator and
            garage door manufacturer, and carry the common parts for one-visit repairs.
            Click any brand to see specific services, models, and what our customers should know.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/gate-operator-models" style={{ color: "#C9A84C", textDecoration: "underline", fontWeight: 600 }}>
              Look up your gate opener model
            </Link>
          </p>
        </div>
      </section>

      {/* Brand Grid by Category */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="flex flex-col gap-16">
            {CATEGORIES.map((cat) => {
              const brands = BRANDS.filter((b) => b.type === cat.key);
              if (brands.length === 0) return null;
              return (
                <div key={cat.key}>
                  {/* Category heading */}
                  <div className="mb-7">
                    <h2
                      className="font-heading font-bold"
                      style={{ fontSize: "1.5rem", color: "var(--navy)", marginBottom: "0.35rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                    >
                      {cat.label}
                    </h2>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", paddingLeft: "1rem" }}>
                      {cat.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {brands.map((brand) => (
                      <BrandCard key={brand.slug} brand={brand} />
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
            Not Sure Which Brand You Have?
          </h2>
          <p style={{ color: "rgba(237,234,228,0.7)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            That&apos;s fine — we&apos;ll identify your system on arrival. Call us and describe
            what&apos;s happening, and we&apos;ll send the right technician.
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
