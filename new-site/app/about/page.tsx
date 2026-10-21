import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import SectionRule from "@/components/SectionRule";
import ArchImage from "@/components/ArchImage";

export const metadata: Metadata = {
  title: "About Us — Real Gate & Garage Door",
  description:
    "TODO(content)",
  alternates: { canonical: "/about" },
};

const values = [
  { num: "01", title: "Repair First, Always", desc: "We default to repair over replacement. If repair is the right call, that's what we recommend — even if a new unit would mean more revenue for us." },
  { num: "02", title: "Upfront Pricing", desc: "You see the price before we start. The quote you approve is the price you pay. No surprises at the invoice stage." },
  { num: "03", title: "Same-Day Response", desc: "We know a broken gate or garage door disrupts your day. We staff our trucks to reach most calls the same day — because waiting isn't a solution." },
  { num: "04", title: "Community-First", desc: "We serve the neighborhoods we live in. These are our streets and our neighbors' driveways — we treat every call like someone in our own community asking for help." },
];

const credentials = [
  "Fully Bonded",
  "General Liability Insurance",
  "Workers Compensation",
  "5-Star Customer Rated",
  "Background-Checked Technicians",
];

const storyChecklist = [
  "Same-day response — because your time matters",
  "Family-owned and locally rooted since day one",
  "We work on every brand and model — no exceptions",
  "Honest diagnosis — no upselling, ever",
  "All work backed by a written warranty",
  "Trusted by homeowners across 25+ cities in LA",
  "Real humans answer — no phone trees, no hold music",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 section--dark">
        <div className="container-max max-w-2xl">
          <span className="eyebrow">Who We Are</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            About Real Gate &amp; <em>Garage Door</em>
          </h1>
          <p style={{ color: "rgba(237,234,228,0.75)", fontSize: "1.05rem" }}>
            Local gate and garage door specialists —{" "}
            {/* TODO(content) */}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 style={{ marginBottom: "1.5rem" }}>
                Built on Trust.{" "}
                <em>Driven by People.</em>
              </h2>
              <div style={{ color: "var(--text-mid)", lineHeight: 1.85, fontSize: "1.02rem" }}>
                <p style={{ marginBottom: "1.25rem" }}>
                  This business was built on a simple idea: be the kind of company you&apos;d
                  actually want to show up when something breaks at your home. Not a voice
                  mail. Not a three-day wait. Someone who picks up, comes out, and fixes it
                  right the first time.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  We started with garage doors — but customers kept asking about their gates.
                  So we went deep on gates. Most companies treat gate repair as a side service.
                  For us, it&apos;s where we&apos;ve built our sharpest expertise, because that&apos;s where
                  homeowners need the most help.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  When someone calls us, they&apos;re rarely calm. Their car is stuck, they&apos;re
                  already late, or they&apos;re worried about security overnight. We remember that
                  behind every service call is a real person in a stressful moment — and our
                  job is to resolve that moment quickly and honestly.
                </p>
                <p>
                  The neighborhoods we serve are where we live too. Every five-star review
                  we&apos;ve earned came from someone who trusted us — and then told a neighbor.
                </p>
              </div>
            </div>

            {/* Checklist card */}
            <div
              className="rounded-[var(--radius-lg)] p-8"
              style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
            >
              <p
                className="font-heading font-bold mb-6"
                style={{ fontSize: "1.05rem", color: "var(--navy)" }}
              >
                What sets us apart
              </p>
              <ul className="space-y-4">
                {storyChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "var(--brown-light)" }}
                    />
                    <span style={{ color: "var(--text-mid)", fontSize: "0.95rem" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo */}
          <div
            className="rounded-[var(--radius-lg)] overflow-hidden mb-14"
            style={{ aspectRatio: "16/6", position: "relative" }}
          >
            <Image
              src="/images/story/building.webp"
              alt="Real Gate and Garage Door team at work"
              fill
              className="object-cover"
            />
          </div>

          {/* Team quote */}
          <div
            className="rounded-[var(--radius-lg)] p-8 mb-20"
            style={{ background: "var(--navy)", borderLeft: "4px solid var(--brown-warm)" }}
          >
            <blockquote
              style={{
                color: "rgba(237,234,228,0.9)",
                fontSize: "1.08rem",
                lineHeight: 1.85,
                fontStyle: "italic",
                margin: 0,
              }}
            >
              &ldquo;Most people who call us are having a rough morning. Their car is trapped,
              they&apos;re already running late, or something stopped working the night before
              and they didn&apos;t sleep well because of it. We&apos;ve heard every version of that
              call — and we&apos;ve learned that what people need isn&apos;t a sales pitch.
              They need someone who picks up, shows up, and actually fixes the problem.
              That&apos;s the whole job.&rdquo;
            </blockquote>
            <p
              style={{
                color: "var(--brown-warm)",
                marginTop: "1.25rem",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              — The Real Gate &amp; Garage Door Team
            </p>
          </div>

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="eyebrow">Our Values</span>
              <h2>What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="card" style={{ borderTop: "3px solid var(--brown)" }}>
                  <p
                    className="font-heading font-bold mb-3"
                    style={{ fontSize: "2rem", color: "var(--brown-warm)", lineHeight: 1, letterSpacing: "-0.04em" }}
                  >
                    {v.num}
                  </p>
                  <h3
                    className="font-heading font-semibold mb-2"
                    style={{ fontSize: "1.05rem", color: "var(--navy)" }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div
            className="rounded-[var(--radius-lg)] p-8 mb-14"
            style={{ background: "var(--bg-muted)", border: "1px solid var(--line)" }}
          >
            <h2 className="text-center mb-8" style={{ fontSize: "1.6rem" }}>
              Our Credentials
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {credentials.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} className="flex-shrink-0" style={{ color: "var(--success)" }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--text-mid)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emotionally resonant CTA */}
          <div
            className="section--dark rounded-[var(--radius-lg)] p-10 text-center"
            style={{ background: "var(--navy)" }}
          >
            <span className="eyebrow" style={{ color: "var(--brown-warm)" }}>
              We&apos;re Ready Right Now
            </span>
            <h2
              style={{
                color: "var(--text-warm)",
                marginBottom: "1rem",
                fontSize: "1.9rem",
                lineHeight: 1.2,
              }}
            >
              Stuck Outside? Car Trapped?
              <br />
              <em>Call. We Answer.</em>
            </h2>
            <SectionRule />
            <p
              style={{
                color: "rgba(237,234,228,0.72)",
                maxWidth: 520,
                margin: "1.25rem auto 2rem",
                fontSize: "0.97rem",
                lineHeight: 1.75,
              }}
            >
              A broken gate or garage door doesn&apos;t just inconvenience you — it can trap
              your car, delay your whole day, or leave your home unsecured overnight.
              We know you need this fixed now, not in three days. Call us and we&apos;ll
              have a technician to you within hours — most days, the same morning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={BUSINESS.phoneHref}
                className="btn-gold"
                style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
              >
                <Phone size={18} /> Call {BUSINESS.phone} — We Answer
              </a>
              <Link href="/contact" className="btn-secondary">
                Request a Same-Day Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
