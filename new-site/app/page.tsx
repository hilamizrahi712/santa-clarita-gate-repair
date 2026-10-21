import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquareText, ArrowRight, Clock, ClipboardCheck, Home, Siren } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import BrandsMarquee from "@/components/BrandsMarquee";
import RevealWrapper from "@/components/RevealWrapper";
import { BUSINESS, SCV_CITIES, AV_CITIES, ALL_CITIES, ORG_ID } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: `Gate Repair Santa Clarita & Antelope Valley | ${BUSINESS.name}`,
  description: `Driveway gate, gate opener and garage door repair in Santa Clarita, Valencia, Palmdale, Lancaster and nearby. 24/7 emergency dispatch, free on-site quote. Call or text ${BUSINESS.phone}.`,
  alternates: { canonical: "/" },
};

// Layout variant C (SITE-BRIEF.md): split hero → services (gates, then garage doors) →
// why SCV homeowners call us → areas → brands → FAQ → CTA.

const gateServices = [
  { href: "/services/gate-repair", name: "Gate Repair", desc: "Swing or slide, steel or wood: a gate that drags, sticks or won't latch." },
  { href: "/services/gate-opener-repair", name: "Gate Opener Repair", desc: "Operators that hum, click, stop halfway or ignore the remote." },
  { href: "/services/automatic-gate-repair", name: "Automatic Gate Repair", desc: "Control boards, safety sensors, loops and limit problems on powered gates." },
  { href: "/services/driveway-gate-repair", name: "Driveway Gate Repair", desc: "Long driveway leaves on sloped lots, bent frames and worn rollers." },
  { href: "/services/electric-gate-repair", name: "Electric Gate Repair", desc: "Dead keypads, intercoms, wiring runs and power faults out at the gate." },
  { href: "/services/gate-motor-replacement", name: "Gate Motor Replacement", desc: "When an operator is past saving, we fit a new one sized to your gate." },
  { href: "/services/iron-gate-repair", name: "Iron Gate Repair", desc: "Broken welds, sagging hinges and rusted posts on ornamental iron." },
  { href: "/services/commercial-gate-repair", name: "Commercial & HOA Gates", desc: "Community entries, business lots and shared gates that see heavy use." },
  { href: "/services/emergency-gate-repair", name: "Emergency Gate Repair", desc: "Stuck open overnight or shut with a car inside: call any hour." },
];

const garageServices = [
  { href: "/services/garage-door-repair", name: "Garage Door Repair", desc: "Doors that jam, shake, sit crooked or won't close all the way." },
  { href: "/services/garage-door-spring-repair", name: "Spring Repair", desc: "A loud bang and a door that won't lift usually means a broken spring." },
  { href: "/services/garage-door-opener-repair", name: "Opener Repair", desc: "Openers that grind, reverse, or stopped answering the wall button." },
  { href: "/services/garage-door-cable-repair", name: "Cable Repair", desc: "Frayed or snapped lift cables and doors hanging off one side." },
  { href: "/services/garage-door-panel-repair", name: "Panel Repair", desc: "Dented or cracked sections swapped so the door runs true again." },
  { href: "/services/emergency-garage-door-repair", name: "Emergency Garage Door", desc: "Car stuck inside or the house left open: we dispatch around the clock." },
];

const reasons = [
  {
    title: "Community and HOA gates",
    desc: "The master-planned neighborhoods in Valencia and Stevenson Ranch run on shared entry gates. We work with residents and HOA managers so a broken community gate gets looked at quickly.",
  },
  {
    title: "Hillside and canyon driveways",
    desc: "Steep approaches and long runs from the street are hard on gate leaves and operators. We set up and repair gates so they move cleanly on a grade, not just on a flat lot.",
  },
  {
    title: "Ranch and horse-property gates",
    desc: "Out in Agua Dulce and Acton, gates are wider, heavier and often far from the house. We repair the operators, hinges and power runs that keep those properties closed.",
  },
  {
    title: "High desert heat and wind",
    desc: "Summer heat and steady wind in Palmdale and Lancaster wear out operators, springs and gate hardware faster. We know what fails out there and carry parts for it.",
  },
];

const homepageFaqs = [
  {
    q: "Do you come out to Lancaster and Palmdale, or only Santa Clarita?",
    a: `Both valleys. We cover twenty communities, from Stevenson Ranch and Castaic over to Lancaster, Palmdale and Pearblossom. Call ${BUSINESS.phone} with your address and we will tell you when a technician can be there.`,
  },
  {
    q: "How is the price of a repair decided?",
    a: "Every job starts with a free on-site quote. The technician looks at your gate or door, tells you what failed, and gives you the price before any work begins. You decide whether to go ahead.",
  },
  {
    q: "Can you handle the entry gate for our HOA?",
    a: "Yes. We work on community and shared gates and can coordinate with the board or the management company, so residents are not left waiting on a gate that is stuck open.",
  },
  {
    q: "Our gate is stuck open late at night. Will anyone come?",
    a: "Yes. Emergency dispatch runs 24/7, Saturdays included. After hours, a phone call is faster than a text, so call and tell us what the gate is doing.",
  },
  {
    q: "Do you fix garage doors too, or only gates?",
    a: "Both. Gates are the bigger part of our work, but the same visit can cover a garage door spring, cable or opener if the house needs it.",
  },
  {
    q: "Can I text you a photo before anyone comes out?",
    a: `Please do. A photo of the gate, the operator or the label on the opener, sent to ${BUSINESS.phone}, helps the technician bring the right parts on the first trip.`,
  },
];

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Gate Repair & Garage Door Repair",
  provider: { "@id": ORG_ID },
  areaServed: ALL_CITIES.map((c) => ({ "@type": "City", name: `${c.name}, CA` })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function ServiceCard({ href, name, desc }: { href: string; name: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 p-5 transition-colors duration-200 hover:border-[var(--sage)]"
      style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)", borderRadius: "var(--radius-lg)", textDecoration: "none" }}
    >
      <h3 className="font-heading font-semibold" style={{ fontSize: "1.05rem", color: "var(--heading)" }}>{name}</h3>
      <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6, flexGrow: 1 }}>{desc}</p>
      <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color: "var(--sage)" }}>
        Details <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── SPLIT HERO: copy + very large phone left, photo right ── */}
      <section className="section-padding" style={{ background: "var(--bg-dark)" }} data-cta-location="hero">
        <div className="container-max grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow" style={{ color: "var(--sage)" }}>Santa Clarita &amp; Antelope Valley</span>
            <h1 style={{ marginBottom: "1.25rem", lineHeight: 1.05, fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)" }}>
              Gate won&apos;t open? Garage door stuck? <em>We come to you.</em>
            </h1>
            <p style={{ color: "var(--text-mid)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 560, marginBottom: "1.75rem" }}>
              Local repair for driveway gates, gate openers and garage doors, from Valencia
              cul-de-sacs to ranch gates in Acton and Agua Dulce. Call or text, tell us what it is
              doing, and we will get a technician headed your way.
            </p>

            <p className="font-semibold uppercase" style={{ color: "var(--text-soft)", fontSize: "0.8rem", letterSpacing: "0.14em", marginBottom: "0.35rem" }}>
              Call or text
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="font-heading font-bold block hover:underline"
              style={{ color: "var(--heading)", fontSize: "clamp(2.4rem, 6.5vw, 4.25rem)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}
            >
              {BUSINESS.phone}
            </a>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href={BUSINESS.phoneHref} className="btn-primary text-base">
                <Phone size={18} /> Call Now
              </a>
              <a href={BUSINESS.smsHref} className="btn-secondary text-base">
                <MessageSquareText size={18} /> Text a Photo
              </a>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm" style={{ color: "var(--text-mid)" }}>
              <li className="flex items-center gap-2"><Siren size={15} style={{ color: "var(--brown-warm)" }} /> 24/7 emergency dispatch</li>
              <li className="flex items-center gap-2"><ClipboardCheck size={15} style={{ color: "var(--sage)" }} /> Free on-site quote</li>
              <li className="flex items-center gap-2"><Home size={15} style={{ color: "var(--sage)" }} /> Homes first, businesses too</li>
              <li className="flex items-center gap-2"><Clock size={15} style={{ color: "var(--sage)" }} /> Sun to Fri, 7AM to 10PM</li>
            </ul>
          </div>

          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", borderRadius: "var(--radius-lg)", border: "1px solid var(--line-strong)" }}>
            <Image
              src={IMAGES.homeHero}
              alt="Automatic driveway gate repaired by Santa Clarita Gate Repair"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES: gates first, then garage doors ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max">
            <div className="mb-10">
              <span className="eyebrow">Services</span>
              <h2>Gates first. <em>Garage doors too.</em></h2>
            </div>

            <h3 className="font-heading font-semibold mb-4" style={{ fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--stone)" }}>
              Gates and gate operators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {gateServices.map((s) => <ServiceCard key={s.href} {...s} />)}
            </div>

            <h3 className="font-heading font-semibold mb-4" style={{ fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--stone)" }}>
              Garage doors and openers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {garageServices.map((s) => <ServiceCard key={s.href} {...s} />)}
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── WHY SCV HOMEOWNERS CALL US ── */}
      <RevealWrapper>
        <section className="section-padding section--muted">
          <div className="container-max grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-center">
            <div className="relative w-full overflow-hidden order-last lg:order-first" style={{ aspectRatio: "4/3", borderRadius: "var(--radius-lg)", border: "1px solid var(--line-strong)" }}>
              <Image
                src={IMAGES.homeWhy}
                alt="Gate operator serviced on a Santa Clarita Valley driveway"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div>
              <span className="eyebrow">Local work</span>
              <h2 style={{ marginBottom: "1.75rem" }}>Why SCV homeowners <em>call us</em></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {reasons.map((r) => (
                  <div key={r.title} className="pl-4" style={{ borderLeft: "3px solid var(--brown)" }}>
                    <h3 className="font-heading font-semibold mb-1.5" style={{ fontSize: "1.02rem", color: "var(--heading)" }}>{r.title}</h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.65 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── AREAS ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max">
            <div className="mb-10">
              <span className="eyebrow">Service areas</span>
              <h2>Two valleys, <em>twenty communities</em></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Santa Clarita Valley", cities: SCV_CITIES },
                { name: "Antelope Valley", cities: AV_CITIES },
              ].map((g) => (
                <div key={g.name} className="p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)" }}>
                  <h3 className="font-heading font-semibold mb-4" style={{ fontSize: "1.15rem", color: "var(--heading)" }}>{g.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.cities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/areas/${c.slug}`}
                        className="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors hover:border-[var(--sage)]"
                        style={{ border: "1px solid var(--line-strong)", color: "var(--text-mid)", textDecoration: "none" }}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── BRANDS ── */}
      <BrandsMarquee />

      {/* ── FAQ ── */}
      <RevealWrapper>
        <section className="section-padding" style={{ background: "var(--bg-base)" }}>
          <div className="container-max">
            <div className="mb-10">
              <span className="eyebrow">Questions</span>
              <h2>Before you <em>call</em></h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {homepageFaqs.map((f) => (
                <div key={f.q} className="p-5" style={{ border: "1px solid var(--line)", background: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
                  <h3 className="font-heading font-semibold mb-2" style={{ fontSize: "1rem", color: "var(--heading)" }}>{f.q}</h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.7 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ── CTA ── */}
      <section className="section-padding section--dark" id="contact">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="eyebrow">Book a technician</span>
            <h2 style={{ marginBottom: "1.25rem" }}>Tell us what it&apos;s <em>doing</em></h2>
            <p style={{ color: "var(--text-mid)", marginBottom: "1.75rem", maxWidth: 520 }}>
              A gate that hums but won&apos;t move, a door that slammed shut, a keypad that went dark.
              Call or text and we will set up a visit and a free on-site quote.
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="font-heading font-bold block hover:underline"
              style={{ color: "var(--heading)", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}
            >
              {BUSINESS.phone}
            </a>
            <div className="flex flex-wrap gap-3 mb-6">
              <a href={BUSINESS.phoneHref} className="btn-primary">
                <Phone size={16} /> Call Now
              </a>
              <a href={BUSINESS.smsHref} className="btn-secondary">
                <MessageSquareText size={16} /> Text Us
              </a>
            </div>
            <p style={{ color: "var(--text-soft)", fontSize: "0.88rem" }}>{BUSINESS.hours}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
