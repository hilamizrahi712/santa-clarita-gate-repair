import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BRANDS, type BrandData } from "@/lib/brands-data";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Gate Operator & Opener Brands We Repair | ${BUSINESS.name}`,
  description:
    "LiftMaster, All-O-Matic, Elite, Viking, Ramset, DoorKing, Eagle, Linear, Genie, Chamberlain and DoorBird repair across the Santa Clarita and Antelope Valleys. Free on-site quote.",
  alternates: { canonical: "/brands" },
};

const CATEGORIES = [
  {
    key: "gate",
    label: "Gate Operators",
    description: "Makers of the motors that open driveway, ranch and community gates.",
  },
  {
    key: "both",
    label: "Gate & Garage Door",
    description: "Makers whose equipment runs both the gate out front and the door in the garage.",
  },
  {
    key: "garage-door",
    label: "Garage Door Openers",
    description: "Openers that lift the garage door on most homes in our area.",
  },
  {
    key: "access-control",
    label: "Access Control Systems",
    description: "Callboxes, video stations and keypads that decide who gets through the gate.",
  },
] as const;

function BrandCard({ brand }: { brand: BrandData }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="flex flex-col gap-4 p-5 transition-colors duration-200 hover:bg-[var(--bg-muted)]"
      style={{ textDecoration: "none" }}
    >
      <div
        className="flex items-center justify-center"
        style={{ height: 80, background: "#ffffff", padding: "1rem" }}
      >
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={160}
            height={56}
            style={{ objectFit: "contain", maxHeight: 56, width: "auto" }}
            unoptimized
          />
        ) : (
          <span className="font-heading font-bold" style={{ color: "#111111" }}>{brand.name}</span>
        )}
      </div>
      <div>
        <h3
          className="font-heading font-bold"
          style={{ fontSize: "1.1rem", color: "var(--heading)", marginBottom: "0.3rem" }}
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
            The Brands on Your Gate and Garage
          </h1>
          <p style={{ color: "rgba(238,241,239,0.75)", fontSize: "1.05rem" }}>
            Pick the name printed on your operator or opener to see the models we work on, current
            and discontinued, and the problems that usually bring SCV and AV homeowners to call us.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/gate-operator-models" style={{ color: "var(--sage)", textDecoration: "underline", fontWeight: 600 }}>
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
                      style={{ fontSize: "1.5rem", color: "var(--heading)", marginBottom: "0.35rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
                    >
                      {cat.label}
                    </h2>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", paddingLeft: "1rem" }}>
                      {cat.description}
                    </p>
                  </div>
                  <div className="line-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <p style={{ color: "rgba(238,241,239,0.7)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Text us a photo of the operator or the sticker on it. We will tell you the make and
            model and send a technician with the right parts.
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
