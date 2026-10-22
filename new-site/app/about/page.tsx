import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle } from "lucide-react";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { BUSINESS } from "@/lib/constants";
import TextUsCTA from "@/components/TextUsCTA";

export const metadata: Metadata = {
  title: `About ${BUSINESS.name} | Gates & Garage Doors in SCV and the AV`,
  description:
    "Local gate and garage door repair for the Santa Clarita and Antelope Valleys: driveway, ranch and community gates first, garage doors too. Bonded and insured.",
  alternates: { canonical: "/about" },
};

const principles = [
  { num: "01", title: "Fix what failed", desc: "We look for the part that actually quit and replace that. A new operator or door is only on the table when repair no longer makes sense, and we tell you why." },
  { num: "02", title: "Written quote first", desc: "The technician explains what is wrong at your gate or garage and writes up the work. Nothing starts until you approve it." },
  { num: "03", title: "Same-day when we can", desc: "A gate stuck open or a car stuck in the garage cannot wait for next week. Most calls in our area get a same-day visit." },
  { num: "04", title: "Local conditions in mind", desc: "Desert wind, hillside driveways, HOA rules and long ranch drives all change what a good repair looks like. We plan for the property in front of us." },
];

const commitments = [
  "Gates are our main work, garage doors too",
  "A technician answers, not a call center",
  "Repairs on current and discontinued models",
  "Common parts carried on the truck",
  "HOA and property manager friendly",
  "Bonded & Insured",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 section--dark">
        <div className="container-max max-w-2xl">
          <span className="eyebrow">About Us</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            Gate Repair for the Two Valleys
          </h1>
          <p style={{ color: "rgba(238,241,239,0.75)", fontSize: "1.05rem" }}>
            {BUSINESS.name} repairs driveway, ranch and community gates and the garage doors behind
            them, from Castaic and Stevenson Ranch out to Lancaster and Pearblossom.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <span className="eyebrow">What We Do</span>
              <h2 style={{ marginBottom: "1.5rem" }}>
                Gates First. Garage Doors Too.
              </h2>
              <div style={{ color: "var(--text-mid)", lineHeight: 1.85, fontSize: "1.02rem" }}>
                <p style={{ marginBottom: "1.25rem" }}>
                  Most of our calls are gates: a slide gate in Palmdale grinding on a sandy track, a
                  community entry in Valencia stuck open, a wide ranch gate in Agua Dulce whose solar
                  batteries have given up. The same trucks also handle garage doors, so a broken spring or
                  a dead opener can be fixed on the same visit.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  The Santa Clarita Valley and the Antelope Valley are very different places to own a
                  gate. Planned communities come with HOA rules, canyon lots come with steep driveways,
                  and the high desert brings heat, wind and grit that wear out operators and doors faster
                  than in the city. We work in these conditions every day and plan repairs around them.
                </p>
                <p>
                  When you call, you reach someone who knows gates. We ask what the gate or door is doing,
                  which brand it is if you know, and get a technician out with the parts that are most
                  likely to be needed.
                </p>
              </div>
            </div>

            <div
              className="rounded-[var(--radius-lg)] p-8"
              style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
            >
              <p className="font-heading font-bold mb-6" style={{ fontSize: "1.05rem", color: "var(--heading)" }}>
                What you can count on
              </p>
              <ul className="space-y-4">
                {commitments.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--brown-light)" }} />
                    <span style={{ color: "var(--text-mid)", fontSize: "0.95rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo */}
          <div
            className="rounded-[var(--radius-lg)] overflow-hidden mb-20"
            style={{ aspectRatio: "16/6", position: "relative" }}
          >
            <Image src={IMAGES.about} alt={IMAGE_ALT[IMAGES.about]} fill className="object-cover" />
          </div>

          {/* Principles */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="eyebrow">How We Work</span>
              <h2>Four Things We Do on Every Call</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map((v) => (
                <div key={v.title} className="card" style={{ borderTop: "3px solid var(--brown)" }}>
                  <p
                    className="font-heading font-bold mb-3"
                    style={{ fontSize: "2rem", color: "var(--brown-warm)", lineHeight: 1, letterSpacing: "-0.04em" }}
                  >
                    {v.num}
                  </p>
                  <h3 className="font-heading font-semibold mb-2" style={{ fontSize: "1.05rem", color: "var(--heading)" }}>
                    {v.title}
                  </h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="section--dark rounded-[var(--radius-lg)] p-10 text-center" style={{ background: "var(--navy)" }}>
            <span className="eyebrow" style={{ color: "var(--sage)" }}>Talk to a Technician</span>
            <h2 style={{ color: "var(--text-warm)", marginBottom: "1rem", fontSize: "1.9rem", lineHeight: 1.2 }}>
              Gate or Garage Door Giving You Trouble?
            </h2>
            <p
              style={{
                color: "rgba(238,241,239,0.72)",
                maxWidth: 520,
                margin: "1.25rem auto 2rem",
                fontSize: "0.97rem",
                lineHeight: 1.75,
              }}
            >
              Call or text a photo of the gate, operator or door. We will tell you what we think is going
              on and set up a visit with a free on-site quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={BUSINESS.phoneHref} className="btn-gold" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
                <Phone size={18} /> Call {BUSINESS.phone}
              </a>
              <TextUsCTA className="btn-secondary" />
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
