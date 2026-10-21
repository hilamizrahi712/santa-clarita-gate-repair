import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { BRANDS } from "@/lib/brands-data";
import { BRAND_MODELS, finderEntries, modelVariants, shortBrandName } from "@/lib/brand-models";
import { BUSINESS, ORG_ID } from "@/lib/constants";
import ModelFinder from "@/components/ModelFinder";
import ModelList from "@/components/ModelList";
import TextUsCTA from "@/components/TextUsCTA";

const TITLE = "Gate Opener Models We Repair & Replace | Los Angeles";
const DESCRIPTION =
  "Every gate motor model we repair and replace in Los Angeles: LiftMaster LA400, All-O-Matic SL-150, Viking K-2, Elite SL3000, Ramset, DoorKing 9050, Eagle and Linear, current and older. Call (818) 915-5715.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/gate-operator-models" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/gate-operator-models", images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }] },
};

// Gate motor brands first (that's where the jobs are), then intercom and garage.
const ORDER = ["liftmaster", "all-o-matic", "viking", "elite", "ramset", "doorking", "eagle", "linear", "doorbird", "chamberlain", "genie"];

export default function GateOperatorModelsPage() {
  const brands = ORDER.map((slug) => BRANDS.find((b) => b.slug === slug)).filter((b): b is (typeof BRANDS)[number] => Boolean(b && BRAND_MODELS[b.slug]));
  const entries = finderEntries(brands.map((b) => ({ slug: b.slug, name: shortBrandName(b.name) })));

  // Each brand's models as a DefinedTermSet: name plus every alternate spelling.
  const schema = {
    "@context": "https://schema.org",
    "@graph": brands.map((b) => {
      const data = BRAND_MODELS[b.slug];
      return {
        "@type": "DefinedTermSet",
        name: `${shortBrandName(b.name)} models serviced by Real Gate & Garage Door`,
        url: `${BUSINESS.domain}/brands/${b.slug}`,
        publisher: { "@id": ORG_ID },
        hasDefinedTerm: data.groups.flatMap((g) =>
          g.models.map((m) => ({
            "@type": "DefinedTerm",
            name: `${shortBrandName(b.name)} ${m.name}`,
            alternateName: modelVariants(m, data.numberPrefixes),
            description: m.kind,
          })),
        ),
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="py-20 section--dark">
        <div className="container-max max-w-3xl">
          <span className="eyebrow">Gate Motor Models</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            Gate Opener Models We Repair &amp; Replace in <em>Los Angeles</em>
          </h1>
          <p style={{ color: "rgba(216,234,208,0.8)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
            Find the model on the sticker of your gate motor. We repair and replace LiftMaster, All-O-Matic, Viking,
            Elite, Ramset, DoorKing, Eagle and Linear gate operators for homeowners across Los Angeles and the San
            Fernando Valley, including older and discontinued models going back 20 years and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={BUSINESS.phoneHref} className="btn-gold">
              <Phone size={16} /> Call {BUSINESS.phone}
            </a>
            <TextUsCTA className="btn-ghost" />
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max max-w-3xl flex flex-col gap-12">
          <ModelFinder entries={entries} />

          <nav aria-label="Brands on this page">
            <p className="font-semibold" style={{ color: "var(--heading)", marginBottom: "0.5rem" }}>Jump to a brand</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <a key={b.slug} href={`#${b.slug}`} className="card" style={{ padding: "0.35rem 0.8rem", fontSize: "0.88rem" }}>
                  {shortBrandName(b.name)}
                </a>
              ))}
            </div>
          </nav>

          {brands.map((b) => (
            <div key={b.slug} id={b.slug} style={{ scrollMarginTop: "6rem" }}>
              <h2
                className="font-heading font-bold"
                style={{ fontSize: "1.4rem", color: "var(--heading)", marginBottom: "1rem", borderLeft: "4px solid var(--brown)", paddingLeft: "0.75rem" }}
              >
                {shortBrandName(b.name)} models
              </h2>
              <ModelList slug={b.slug} brandName={shortBrandName(b.name)} />
              <p style={{ marginTop: "1rem" }}>
                <Link href={`/brands/${b.slug}`} style={{ color: "var(--brown-warm)", textDecoration: "underline", fontWeight: 600 }}>
                  {shortBrandName(b.name)} repair and replacement
                </Link>
              </p>
            </div>
          ))}

          <div className="rounded-[var(--radius-lg)] p-6" style={{ background: "var(--navy)" }}>
            <h2 className="font-heading font-bold" style={{ fontSize: "1.2rem", color: "var(--text-warm)", marginBottom: "0.5rem" }}>
              Can&apos;t find your model?
            </h2>
            <p style={{ color: "rgba(216,234,208,0.8)", marginBottom: "1rem" }}>
              Text us a photo of the sticker on your gate motor. We&apos;ll tell you whether it&apos;s worth repairing or
              time to replace it, and see our{" "}
              <Link href="/services/gate-motor-replacement" style={{ color: "#4db87a", textDecoration: "underline" }}>
                gate motor replacement
              </Link>{" "}
              service for how a replacement works.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={BUSINESS.phoneHref} className="btn-gold">
                <Phone size={16} /> Call {BUSINESS.phone}
              </a>
              <TextUsCTA className="btn-ghost" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
