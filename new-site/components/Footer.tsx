import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS, SCV_CITIES, AV_CITIES, ALL_CITIES } from "@/lib/constants";

// Highest sitemap-priority cities (see next-sitemap.config.js AREA_TIER_1/2) get the
// weakest internal linking otherwise — this block exists specifically to fix that.
const TOP_SERVICE_AREA_SLUGS = [
  // Tier 1 — every one of these must appear
  "fresno", "bakersfield", "lancaster", "palmdale", "oxnard", "ventura-county", "santa-barbara",
  // Tier 2
  "santa-clarita", "glendora", "hacienda-heights", "torrance", "manhattan-beach", "long-beach", "orange-county",
  // Recognizable anchors to round out the 16
  "los-angeles", "beverly-hills",
];

const gateServiceLinks = [
  { href: "/services/gate-repair", label: "Gate Repair" },
  { href: "/services/automatic-gate-repair", label: "Automatic Gate Repair" },
  { href: "/services/electric-gate-repair", label: "Electric Gate Repair" },
  { href: "/services/gate-opener-repair", label: "Gate Opener Repair" },
  { href: "/services/gate-motor-replacement", label: "Gate Motor Replacement" },
  { href: "/services/iron-gate-repair", label: "Iron Gate Repair" },
  { href: "/services/commercial-gate-repair", label: "Commercial Gate" },
  { href: "/services/gate-installation", label: "Gate Installation" },
];

const garageDoorLinks = [
  { href: "/services/garage-door-repair", label: "Garage Door Repair" },
  { href: "/services/garage-door-spring-repair", label: "Spring Repair" },
  { href: "/services/garage-door-opener-repair", label: "Opener Repair" },
  { href: "/services/garage-door-cable-repair", label: "Cable Repair" },
  { href: "/services/garage-door-panel-repair", label: "Panel Repair" },
  { href: "/services/emergency-garage-door-repair", label: "Emergency Service" },
  { href: "/services/commercial-garage-door", label: "Commercial Doors" },
  { href: "/services/garage-door-installation", label: "Door Installation" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/tips", label: "Tips" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer-dark" data-cta-location="footer">
      {/* CTA Strip */}
      <div className="footer-cta-strip">
        <div className="container-max flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="footer-cta-title">Ready for Same-Day Service?</p>
            <p className="footer-cta-sub">Gates · Garage Doors · 24/7 Emergency · Free Estimates</p>
          </div>
          <a href={BUSINESS.phoneHref} className="btn-gold">
            <Phone size={18} />
            Call {BUSINESS.phone}
          </a>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container-max py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div>
          <p className="footer-col-brand">{BUSINESS.name}</p>
          <p className="footer-tagline">{BUSINESS.tagline}</p>
          <div className="space-y-2 footer-contact">
            <a href={BUSINESS.phoneHref} className="footer-link flex items-center gap-2">
              <Phone size={13} /> {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="footer-link flex items-center gap-2">
              <Mail size={13} /> {BUSINESS.email}
            </a>
            <div className="footer-link flex items-start gap-2">
              <MapPin size={13} className="mt-0.5 flex-shrink-0" />
              <span>{BUSINESS.address}</span>
            </div>
          </div>
          <p className="footer-tagline mt-4" style={{ lineHeight: 1.65 }}>
            Hours: Sun–Fri 7 AM–10 PM<br />
            Saturday: Closed · Emergency: 24/7
          </p>
          <p className="footer-tagline mt-2">Bonded &amp; Insured</p>
        </div>

        {/* Gate Services */}
        <div>
          <p className="footer-col-heading">Gate Services</p>
          <ul className="space-y-2.5">
            {gateServiceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link text-sm">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Garage Door + Company */}
        <div>
          <p className="footer-col-heading">Garage Door Services</p>
          <ul className="space-y-2.5 mb-6">
            {garageDoorLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link text-sm">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="footer-col-heading">Company</p>
          <ul className="space-y-2.5">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link text-sm">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <p className="footer-col-heading">Service Areas</p>
          <ul className="space-y-2 columns-2">
            {SCV_CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/areas/${c.slug}`} className="footer-link text-sm">{c.name}</Link>
              </li>
            ))}
          </ul>
          <Link href="/service-areas" className="footer-more-link">
            + {AV_CITIES.length} more cities →
          </Link>
        </div>
      </div>

      {/* Top Service Areas — extra internal links for the highest-priority, least-linked city pages */}
      <div className="footer-top-areas" style={{ borderTop: "1px solid rgba(237,234,228,0.1)" }}>
        <div className="container-max py-8">
          <p className="footer-col-heading mb-3">Top Service Areas</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {TOP_SERVICE_AREA_SLUGS.map((slug, i) => {
              const c = ALL_CITIES.find((city) => city.slug === slug);
              if (!c) return null;
              return (
                <span key={slug} className="flex items-center">
                  <Link href={`/areas/${slug}`} className="footer-link text-sm">{c.name}</Link>
                  {i < TOP_SERVICE_AREA_SLUGS.length - 1 && (
                    <span className="ml-4" style={{ opacity: 0.25 }}>·</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Plain-HTML navigation fallback — resolves even if client JS never loads */}
      <nav
        aria-label="Site"
        className="footer-top-areas"
        style={{ borderTop: "1px solid rgba(237,234,228,0.1)" }}
      >
        <div className="container-max py-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="/services" className="footer-link">Services</a>
          <a href="/service-areas" className="footer-link">Service Areas</a>
          <a href="/brands" className="footer-link">Brands</a>
          <a href="/gate-operator-models" className="footer-link">Gate Opener Models</a>
          <a href="/tips" className="footer-link">Tips</a>
        </div>
      </nav>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. · Bonded &amp; Insured</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="footer-link">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
