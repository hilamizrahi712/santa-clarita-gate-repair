import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquareText, Clock } from "lucide-react";
import { BUSINESS, SCV_CITIES, AV_CITIES } from "@/lib/constants";

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

const areaGroups = [
  { name: "Santa Clarita Valley", cities: SCV_CITIES },
  { name: "Antelope Valley", cities: AV_CITIES },
];

export default function Footer() {
  return (
    <footer className="footer-dark" data-cta-location="footer">
      {/* CTA Strip */}
      <div className="footer-cta-strip">
        <div className="container-max flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="footer-cta-title">Gate stuck or door off track?</p>
            <p className="footer-cta-sub">Call or text {BUSINESS.shortName}. Free on-site quote, 24/7 emergency dispatch.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={BUSINESS.phoneHref} className="btn-gold">
              <Phone size={18} />
              Call {BUSINESS.phone}
            </a>
            <a href={BUSINESS.smsHref} className="btn-ghost">
              <MessageSquareText size={18} />
              Text Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container-max py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Business Column */}
        <div>
          <p className="footer-col-brand">{BUSINESS.name}</p>
          <p className="footer-tagline">{BUSINESS.tagline}</p>
          <div className="space-y-2 footer-contact">
            <a href={BUSINESS.phoneHref} className="footer-link flex items-center gap-2">
              <Phone size={13} /> {BUSINESS.phone}
            </a>
            <a href={BUSINESS.smsHref} className="footer-link flex items-center gap-2">
              <MessageSquareText size={13} /> Text {BUSINESS.phone}
            </a>
            {BUSINESS.email && (
              <a href={`mailto:${BUSINESS.email}`} className="footer-link flex items-center gap-2">
                <Mail size={13} /> {BUSINESS.email}
              </a>
            )}
            <div className="footer-link flex items-start gap-2">
              <MapPin size={13} className="mt-1 flex-shrink-0" />
              <span>{BUSINESS.address}</span>
            </div>
            <div className="footer-link flex items-start gap-2" style={{ lineHeight: 1.6 }}>
              <Clock size={13} className="mt-1 flex-shrink-0" />
              <span>{BUSINESS.hours}</span>
            </div>
          </div>
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

        {/* Service Areas: all 20 cities */}
        <div>
          {areaGroups.map((g) => (
            <div key={g.name} className="mb-5">
              <p className="footer-col-heading">{g.name}</p>
              <ul className="space-y-2 columns-2">
                {g.cities.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/areas/${c.slug}`} className="footer-link text-sm">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Plain-HTML navigation fallback — resolves even if client JS never loads */}
      <nav
        aria-label="Site"
        className="footer-top-areas"
        style={{ borderTop: "1px solid rgba(216,234,208,0.1)" }}
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
          <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="footer-link">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
