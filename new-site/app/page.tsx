import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquareText, CheckCircle, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import BrandsMarquee from "@/components/BrandsMarquee";
import RevealWrapper from "@/components/RevealWrapper";
import DiagnosticWidget from "@/components/DiagnosticWidget";
import ServiceGridReveal from "@/components/ServiceGridReveal";
import ArchImage from "@/components/ArchImage";
import IronDivider from "@/components/IronDivider";
import SectionRule from "@/components/SectionRule";
import { BUSINESS, SCV_CITIES, ORG_ID } from "@/lib/constants";
import { CITIES, PRIORITY_CITY_SLUGS } from "@/lib/cities-data";

export const metadata: Metadata = {
  title: "Automatic Gate Repair & Garage Door Repair | Same-Day Service",
  description:
    "Expert gate repair and garage door repair in Los Angeles, CA. Same-day service, 24/7 emergency, free estimates. Gates are our #1 specialty. Call (818) 915-5715.",
  alternates: { canonical: "/" },
};

const gatePrimary = [
  { href: "/services/gate-repair", name: "Gate Repair", desc: "Fast, honest diagnosis. No upselling. Fixed the first time.", img: "/images/gallery/gate-1.webp", caption: "Black steel vertical-picket swing gate with automatic operator" },
  { href: "/services/gate-installation", name: "New Installation", desc: "New gate systems, fully installed and programmed.", img: "/images/brands/all-o-matic/all-o-matic-2.webp", caption: "Black horizontal-slat sliding gate with All-O-Matic operator installed" },
  { href: "/services/emergency-gate-repair", name: "Emergency Gate Repair", desc: "Stuck open or shut? We're there in 1–2 hours.", img: "/images/services/swing-motor.webp", caption: "Swing gate operator arm installed on a black steel picket gate" },
  { href: "/services/gate-opener-repair", name: "Gate Opener Repair", desc: "LiftMaster, Viking, DoorKing, All-O-Matic, and more.", img: "/images/gallery/outside-1.webp", caption: "Two-tone aluminum and wood-panel swing gate with keypad entry" },
];

const gateRest = [
  { href: "/services/automatic-gate-repair", name: "Automatic Gate Repair", desc: "Every make, every brand. Motor, controller, sensors.", img: "/images/services/gate-motor.webp", caption: "Wood-and-steel horizontal-slat sliding gate with operator housing" },
  { href: "/services/driveway-gate-repair", name: "Driveway Gate Repair", desc: "Sliding, swing, and ornamental. Same-day response.", img: "/images/gallery/gate-5.webp", caption: "Bronze ornamental double swing gate with dual arm operators" },
  { href: "/services/electric-gate-repair", name: "Electric Gate Repair", desc: "Wiring, boards, remotes. We trace the fault and fix it.", img: "/images/gallery/gate-4.webp", caption: "Black wrought iron double swing gate with a decorative medallion" },
  { href: "/services/iron-gate-repair", name: "Iron Gate Repair", desc: "Structural, hinges, welds, finishes — fully restored.", img: "/images/gallery/gate-3.webp", caption: "Bronze double swing driveway gate with a geometric ring panel design" },
];

const garagePrimary = [
  { href: "/services/garage-door-repair", name: "Garage Door Repair", desc: "Complete repair for all door problems.", img: "/images/services/garage-door-repair.webp", caption: "Charcoal flush-panel steel garage door mid-service" },
  { href: "/services/garage-door-spring-repair", name: "Spring Repair", desc: "Torsion & extension — same-day replacement.", img: "/images/services/walnut-garage.webp", caption: "Walnut wood-grain carriage-style garage doors with iron hinge straps" },
];

const garageRest = [
  { href: "/services/garage-door-opener-repair", name: "Opener Repair", desc: "LiftMaster, Genie, Chamberlain & all brands.", img: "/images/services/garage-door-repair.webp", caption: "Charcoal flush-panel steel garage door mid-service" },
  { href: "/services/garage-door-cable-repair", name: "Cable Repair", desc: "Snapped or frayed cables replaced same day.", img: "/images/services/white-garage.webp", caption: "White carriage-style raised-panel garage doors with window inserts" },
  { href: "/services/garage-door-panel-repair", name: "Panel Repair", desc: "Dented or damaged panels replaced same day.", img: "/images/services/wood-garage.webp", caption: "Wood carriage-style garage door with glass panes under a stone facade" },
  { href: "/services/garage-door-installation", name: "Door Installation", desc: "New doors, fully installed and balanced.", img: "/images/services/wood-garage.webp", caption: "Wood carriage-style garage door with glass panes under a stone facade" },
];

const storyChecklist = [
  "Honest diagnosis — no upselling, ever",
  "All work backed by a written warranty",
  "We work on every brand and model",
  "Real humans answer — no phone trees",
];

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Gate Repair & Garage Door Repair",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "AdministrativeArea", name: "Los Angeles County, CA" },
};

const homepageFaqs = [
  {
    q: "How fast can you respond to a gate repair call?",
    a: "Same day in most cases. Our service vans run our coverage area daily, so a technician is usually on-site within 2 hours of your call, often faster. For overnight emergencies, we dispatch 24/7.",
  },
  {
    q: "Do you repair all brands of automatic gate openers?",
    a: "Yes. We service LiftMaster, Eagle Access Control, All-O-Matic, Elite, Ramset, DoorKing, Linear, Viking, Chamberlain, Genie and DoorBird, plus most other commercial and residential operators. Our vans carry common boards, motors and sensors so most repairs are completed in one visit.",
  },
  {
    q: "Do you handle HOA gate projects?",
    a: "Yes. We provide the elevation drawings, material specs and color documentation that HOA design review requires. We've worked with communities across our service area and know the common approval requirements.",
  },
  {
    q: "Do you handle both gates and garage doors?",
    a: "Yes, and gates are our primary specialty. The same technician can diagnose an automatic gate operator and a garage door opener on the same visit, which matters on properties where both run off related access control.",
  },
  {
    q: "What happens on the first visit?",
    a: "The technician arrives stocked, pinpoints the exact fault — motor, control board, safety sensor, track, spring or structural — and gives you a firm price before touching anything. Most repairs are completed the same visit, and we run full cycle tests before leaving.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We are a California licensed contractor, fully bonded, and carry both General Liability and Workers' Compensation coverage.",
  },
  {
    q: "Do you work on weekends and at night?",
    a: "Our regular hours are Sunday through Friday, 7 AM to 10 PM — we're closed Saturdays for routine appointments. For gate or garage door emergencies, we dispatch 24/7, every day of the week including Saturday.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh" }} data-cta-location="hero">
        <Image
          src="/images/hero/hero-thin-gate.webp"
          alt="Gate and garage door repair Los Angeles CA"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        {/* Scrim — bottom-heavy so content is readable, top shows the photo */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(12,30,53,0.93) 0%, rgba(12,30,53,0.6) 45%, rgba(12,30,53,0.45) 75%, rgba(12,30,53,0.45) 100%)",
          }}
        />
        {/* Content */}
        <div
          className="relative z-10 container-max flex items-center"
          style={{ minHeight: "92vh", paddingTop: "7rem", paddingBottom: "3rem" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center w-full">
            {/* Copy */}
            <div className="max-w-2xl">
              <span
                className="eyebrow"
                style={{ color: "rgba(196,133,90,0.9)" }}
              >
                Open Now — 24/7 Emergency Service
              </span>
              <h1 style={{ color: "var(--text-warm)", lineHeight: 1.0, marginBottom: "1.25rem" }}>
                Gate or garage door stuck?
                <br />
                <em style={{ color: "#C9A84C", fontStyle: "italic" }}>We&apos;ll fix it today.</em>
              </h1>
              <p
                className="mb-8"
                style={{ color: "rgba(237,234,228,0.8)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "560px" }}
              >
                Certified gate and garage door repair and installation. Technician on-site in
                under 2 hours, any brand, any gate or door type, same-day service guaranteed.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href={BUSINESS.phoneHref} className="btn-gold text-base">
                  <Phone size={18} />
                  Call {BUSINESS.phone}
                </a>
                <a href={BUSINESS.smsHref} className="btn-ghost text-base">
                  <MessageSquareText size={18} />
                  Text us a photo
                </a>
              </div>
              {/* Trust chips */}
              <div
                className="flex flex-wrap gap-x-8 gap-y-2 pt-6 text-sm"
                style={{
                  borderTop: "1px solid rgba(237,234,228,0.2)",
                  color: "rgba(237,234,228,0.7)",
                }}
              >
                <span>CA Licensed &amp; Bonded</span>
                <span>&lt;2hr Response</span>
                <span>24/7 Emergency</span>
                <span>Serving LA &amp; Southern California</span>
                <span>✦ Free Estimates</span>
              </div>
            </div>

            {/* Compact form — desktop only, mirrors hero on mobile below */}
            <div className="hidden lg:block">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>

      <IronDivider />

      {/* ── MOBILE FORM — directly below hero ── */}
      <div className="lg:hidden" style={{ background: "var(--bg-muted)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <ContactForm compact />
        </div>
      </div>

      {/* ── THIN TRUST BAR ── */}
      <div style={{ background: "var(--navy)", padding: "0.65rem 1rem" }}>
        <div className="container-max">
          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold"
            style={{ color: "#fff", letterSpacing: "0.02em" }}
          >
            <span>Bonded &amp; Insured</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Same-Day Service</span>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max">
            <div className="mb-12 text-center">
              <span className="eyebrow">How It Works</span>
              <h2>
                Three Steps.{" "}
                <em>No Surprises.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Call or Text Us",
                  desc: "Tell us what's going on. We give you a confirmed arrival window — a real time, not an all-day wait.",
                },
                {
                  title: "On-Site Diagnosis",
                  desc: "Your technician inspects the gate or door and hands you a firm, written price before any work starts.",
                },
                {
                  title: "Fixed & Cycle-Tested",
                  desc: "Most repairs finish in one visit. We run the gate or door through several full cycles before we leave.",
                },
              ].map((step, i) => (
                <div key={step.title} className="text-center">
                  <div
                    className="mx-auto mb-4 flex items-center justify-center rounded-full font-heading font-bold"
                    style={{ width: 56, height: 56, background: "var(--brown)", color: "var(--text-warm)", fontSize: "1.4rem" }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-heading font-semibold mb-2" style={{ fontSize: "1.1rem", color: "var(--navy)" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── GATE SERVICES (60%) ── */}
      <RevealWrapper>
        <section className="section-padding section--muted">
          <div className="container-max">
            <div className="mb-12">
              <span className="eyebrow">What We Do</span>
              <h2 style={{ marginBottom: "0.5rem" }}>
                Precision Repairs.{" "}
                <em>Every Single Time.</em>
              </h2>
              <p style={{ color: "var(--stone)", maxWidth: 520, marginTop: "0.5rem" }}>
                Gates are our #1 specialty — all types, all brands, same-day service.
              </p>
            </div>

            {/* Gate section label */}
            <p
              className="font-heading font-semibold mb-5"
              style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--stone)" }}
            >
              Gate Services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <ServiceGridReveal
                primary={gatePrimary.map((s, i) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex flex-col transition-all duration-200 overflow-hidden"
                    style={{
                      textDecoration: "none",
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                    }}
                    data-delay={String((i % 4) + 1)}
                  >
                    <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
                      <Image
                        src={s.img}
                        alt={s.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <h3
                        className="font-heading font-semibold"
                        style={{ fontSize: "1rem", color: "var(--navy)" }}
                      >
                        {s.name}
                      </h3>
                      <p style={{ color: "var(--stone)", fontSize: "0.72rem", fontStyle: "italic" }}>{s.caption}</p>
                      <p style={{ color: "var(--text-soft)", fontSize: "0.88rem", flexGrow: 1 }}>{s.desc}</p>
                      <span
                        className="inline-flex items-center gap-1 font-semibold text-sm mt-1"
                        style={{ color: "var(--brown)" }}
                      >
                        Learn More <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
                rest={gateRest.map((s, i) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex flex-col transition-all duration-200 overflow-hidden"
                    style={{
                      textDecoration: "none",
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                    }}
                    data-delay={String((i % 4) + 1)}
                  >
                    <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
                      <Image
                        src={s.img}
                        alt={s.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <h3
                        className="font-heading font-semibold"
                        style={{ fontSize: "1rem", color: "var(--navy)" }}
                      >
                        {s.name}
                      </h3>
                      <p style={{ color: "var(--stone)", fontSize: "0.72rem", fontStyle: "italic" }}>{s.caption}</p>
                      <p style={{ color: "var(--text-soft)", fontSize: "0.88rem", flexGrow: 1 }}>{s.desc}</p>
                      <span
                        className="inline-flex items-center gap-1 font-semibold text-sm mt-1"
                        style={{ color: "var(--brown)" }}
                      >
                        Learn More <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              />
            </div>
            {/* Garage Door section */}
            <p
              className="font-heading font-semibold mb-5"
              style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--stone)" }}
            >
              Garage Door Services
            </p>
            <p className="mb-5" style={{ color: "var(--text-mid)" }}>
              Door stuck open, broken spring or car trapped inside? We offer 24/7{" "}
              <Link href="/services/emergency-garage-door-repair" style={{ color: "var(--brown)", textDecoration: "underline" }}>
                emergency garage door repair
              </Link>{" "}
              across Los Angeles and the San Fernando Valley.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
              <ServiceGridReveal
                mobileOnly
                primary={garagePrimary.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex flex-col overflow-hidden transition-all duration-200"
                    style={{
                      textDecoration: "none",
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
                      <Image
                        src={s.img}
                        alt={s.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3
                        className="font-heading font-semibold"
                        style={{ fontSize: "0.88rem", color: "var(--navy)" }}
                      >
                        {s.name}
                      </h3>
                      <p style={{ color: "var(--text-soft)", fontSize: "0.78rem", marginTop: "0.2rem" }}>{s.desc}</p>
                    </div>
                  </Link>
                ))}
                rest={garageRest.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex flex-col overflow-hidden transition-all duration-200"
                    style={{
                      textDecoration: "none",
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
                      <Image
                        src={s.img}
                        alt={s.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3
                        className="font-heading font-semibold"
                        style={{ fontSize: "0.88rem", color: "var(--navy)" }}
                      >
                        {s.name}
                      </h3>
                      <p style={{ color: "var(--text-soft)", fontSize: "0.78rem", marginTop: "0.2rem" }}>{s.desc}</p>
                    </div>
                  </Link>
                ))}
              />
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── BRAND MARQUEE ── */}
      <BrandsMarquee />

      {/* ── DIAGNOSTIC WIDGET ── */}
      <DiagnosticWidget />

      {/* ── CTA STRIP ── */}
      <div style={{ background: "var(--brown)", padding: "1.75rem 0" }}>
        <div className="container-max flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="font-heading font-bold" style={{ fontSize: "1.15rem", color: "var(--text-warm)" }}>
            Gate stuck? Call now — {BUSINESS.phone}
          </p>
          <a href={BUSINESS.phoneHref} className="btn-gold">
            <Phone size={16} /> Call Now
          </a>
        </div>
      </div>

      {/* ── BUSINESS STORY ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* Copy */}
              <div>
                <span className="eyebrow">Our Story</span>
                <h2 style={{ marginBottom: "1.5rem" }}>
                  LA-Rooted.{" "}
                  <em>Driven by Trust.</em>
                </h2>
                <p style={{ color: "var(--text-mid)", lineHeight: 1.85, fontSize: "1.05rem" }}>
                  We didn&apos;t build Real Gate &amp; Garage Door on advertising — we built it on
                  neighbors telling neighbors. Every call, every repair, we treat like it&apos;s our
                  own home. That&apos;s why we&apos;re rated 5.0 on Google, from the Valley to the
                  coast.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 mt-6 font-semibold"
                  style={{ color: "var(--brown)" }}
                >
                  Our Story <ArrowRight size={16} />
                </Link>
              </div>
              {/* Photo + Checklist */}
              <div className="flex flex-col gap-6">
                <ArchImage
                  src="/images/story/building.webp"
                  alt="Real Gate & Garage Door team at work"
                  aspect="4/5"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="rounded-[var(--radius-lg)] p-8"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
                >
                  <ul className="space-y-4">
                    {storyChecklist.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: "var(--brown-light)" }}
                        />
                        <span style={{ color: "var(--text-mid)", fontSize: "0.97rem" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── CREDENTIALS ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--navy)" }}>
          <div className="container-max">
            <div className="mb-10">
              <span className="eyebrow" style={{ color: "rgba(196,133,90,0.9)" }}>Credentials</span>
              <h2 style={{ color: "var(--text-warm)" }}>
                Licensed, insured, and{" "}
                <em style={{ color: "#C9A84C" }}>fully bonded.</em>
              </h2>
            </div>
            <div
              className="rounded-[var(--radius-lg)] divide-y"
              style={{ background: "rgba(237,234,228,0.04)", border: "1px solid rgba(237,234,228,0.14)" }}
            >
              {[
                { label: "License", value: "CA Licensed Contractor" },
                { label: "Insurance", value: "Fully bonded & insured — General Liability + Workers' Comp" },
                { label: "Response Time", value: "< 2 hours average on-site, 24 / 7 / 365 including holidays" },
                { label: "Gate Types", value: "Sliding, swing, cantilever, wrought iron, steel, wood, ornamental" },
                { label: "Door Types", value: "Sectional, roll-up, carriage, insulated steel, wood, glass panel" },
                { label: "Service Area", value: SCV_CITIES.map((c) => c.name).join(" · ") },
              ].map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-6 py-4"
                  style={{ borderColor: "rgba(237,234,228,0.14)" }}
                >
                  <p
                    className="font-heading font-semibold text-xs uppercase"
                    style={{ letterSpacing: "0.1em", color: "var(--brown-warm)" }}
                  >
                    {row.label}
                  </p>
                  <p style={{ color: "rgba(237,234,228,0.85)", fontSize: "0.95rem" }}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── GATE REPAIR NEAR YOU ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max text-center">
            <span className="eyebrow">Gate Repair Near You</span>
            <h2 style={{ marginBottom: "1.5rem" }}>
              Gate Repair in{" "}
              <em>Your Neighborhood.</em>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {PRIORITY_CITY_SLUGS.map((slug) => {
                const c = CITIES.find((city) => city.slug === slug);
                if (!c) return null;
                return (
                  <Link
                    key={c.slug}
                    href={`/areas/${c.slug}`}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      color: "var(--text-mid)",
                      textDecoration: "none",
                    }}
                  >
                    Gate repair in {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── SERVICE AREAS ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
          <div className="container-max text-center">
            <span className="eyebrow">Where We Work</span>
            <h2 style={{ marginBottom: "0.75rem" }}>
              Los Angeles &amp;{" "}
              <em>Southern California.</em>
            </h2>
            <SectionRule />
            <p style={{ color: "var(--stone)", maxWidth: 520, margin: "1.25rem auto 2.5rem" }}>
              We serve cities across Los Angeles &amp; Southern California — from Malibu to
              Long Beach, Santa Barbara to Orange County.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SCV_CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/areas/${c.slug}`}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--line)",
                    color: "var(--text-mid)",
                    textDecoration: "none",
                  }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <Link href="/service-areas" className="inline-flex items-center gap-1 mt-6 text-sm font-semibold" style={{ color: "var(--brown)" }}>
              View all {CITIES.length} service areas <ArrowRight size={14} />
            </Link>

            <div
              className="rounded-[var(--radius-lg)] overflow-hidden mt-8 mx-auto"
              style={{ border: "2px solid var(--brown-warm)", maxWidth: 720 }}
            >
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${BUSINESS.name}, Los Angeles, CA`)}&output=embed&z=10`}
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                title={`Map — ${BUSINESS.name} service area`}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── FAQ ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max">
            <div className="mb-10">
              <span className="eyebrow">Common Questions</span>
              <h2>
                Frequently Asked{" "}
                <em>Questions</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {homepageFaqs.map((f, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-lg)] p-5"
                  style={{ border: "1px solid var(--line)", background: "var(--bg-card)" }}
                >
                  <h3
                    className="font-heading font-semibold mb-2"
                    style={{ fontSize: "1rem", color: "var(--navy)" }}
                  >
                    {f.q}
                  </h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.7 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── CONTACT FORM ── */}
      <section className="section-padding section--muted" id="contact">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <RevealWrapper>
              <span className="eyebrow">Free Estimates, No Pressure</span>
              <h2 style={{ marginBottom: "1.25rem" }}>
                Get Your Free Estimate <em>Today</em>
              </h2>
              <p style={{ color: "var(--text-soft)", marginBottom: "1.75rem" }}>
                Tell us what&apos;s going on and we&apos;ll call you back within 30 minutes during
                business hours.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Same-day appointments available",
                  "Upfront quote before any work starts",
                  "No pressure, no upselling",
                  "Bonded & Insured",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3" style={{ color: "var(--text-mid)" }}>
                    <CheckCircle size={17} className="flex-shrink-0" style={{ color: "var(--success)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className="rounded-[var(--radius-lg)] p-5"
                style={{ background: "var(--navy)" }}
              >
                <p className="font-semibold text-lg mb-1" style={{ color: "var(--text-warm)" }}>
                  Emergency? Call Now:
                </p>
                <a
                  href={BUSINESS.phoneHref}
                  className="text-2xl font-bold font-heading transition-colors"
                  style={{ color: "var(--brown-warm)" }}
                >
                  {BUSINESS.phone}
                </a>
                <p style={{ color: "rgba(237,234,228,0.6)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  Live answer 24/7 for emergencies
                </p>
                <a href={BUSINESS.smsHref} className="btn-ghost text-sm">
                  <MessageSquareText size={16} />
                  Text us a photo
                </a>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              <ContactForm />
            </RevealWrapper>
          </div>
        </div>
      </section>
    </>
  );
}
