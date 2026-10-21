"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const gateLinks = [
  { href: "/services/gate-repair", label: "Gate Repair" },
  { href: "/services/automatic-gate-repair", label: "Automatic Gate Repair" },
  { href: "/services/driveway-gate-repair", label: "Driveway Gate Repair" },
  { href: "/services/electric-gate-repair", label: "Electric Gate Repair" },
  { href: "/services/gate-opener-repair", label: "Gate Opener Repair" },
  { href: "/services/gate-motor-replacement", label: "Gate Motor Replacement" },
  { href: "/services/iron-gate-repair", label: "Iron Gate Repair" },
  { href: "/services/commercial-gate-repair", label: "Commercial Gate Repair" },
  { href: "/services/emergency-gate-repair", label: "Emergency Gate Repair" },
];

const garageDoorLinks = [
  { href: "/services/garage-door-repair", label: "Garage Door Repair" },
  { href: "/services/garage-door-spring-repair", label: "Spring Repair" },
  { href: "/services/garage-door-opener-repair", label: "Opener Repair" },
  { href: "/services/garage-door-cable-repair", label: "Cable Repair" },
  { href: "/services/garage-door-panel-repair", label: "Panel Repair" },
  { href: "/services/emergency-garage-door-repair", label: "Emergency Service" },
  { href: "/services/commercial-garage-door", label: "Commercial Doors" },
];

const brandLinks = [
  { href: "/brands/liftmaster", label: "LiftMaster" },
  { href: "/brands/all-o-matic", label: "All-O-Matic" },
  { href: "/brands/elite", label: "Elite" },
  { href: "/brands/ramset", label: "Ramset" },
  { href: "/brands/doorking", label: "DoorKing" },
  { href: "/brands/viking", label: "Viking" },
  { href: "/brands/genie", label: "Genie" },
  { href: "/brands/chamberlain", label: "Chamberlain" },
  { href: "/brands/linear", label: "Linear" },
  { href: "/brands/eagle", label: "Eagle" },
  { href: "/brands/doorbird", label: "DoorBird" },
];

const areaLinks = [
  { href: "/areas/woodland-hills", label: "Woodland Hills" },
  { href: "/areas/sherman-oaks", label: "Sherman Oaks" },
  { href: "/areas/encino", label: "Encino" },
  { href: "/areas/calabasas", label: "Calabasas" },
  { href: "/areas/burbank", label: "Burbank" },
  { href: "/areas/glendale", label: "Glendale" },
  { href: "/service-areas", label: "All Service Areas →" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const headerBg = "shadow-sm";
  const linkColor = "text-[var(--text-dark)]";

  return (
    <div className="sticky top-0 z-40" data-cta-location="header">
      {/* Emergency Banner — part of the same sticky unit as the header, so they scroll together instead of unsticking independently */}
      <div className="bg-red-700 text-white text-center py-2 px-4 text-sm font-semibold">
        🚨 Emergency Repair Available 24/7 — Gates &amp; Garage Doors —{" "}
        <a href={BUSINESS.phoneHref} className="underline hover:no-underline">
          {BUSINESS.phone}
        </a>
      </div>

      {/* Main Header */}
      <header
        className={headerBg}
        style={{ height: "var(--nav-h)", background: "#F5F5F5" }}
      >
        <div className="container-max flex items-center justify-between h-full gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <span
              className="font-heading font-extrabold text-xl leading-tight block"
              style={{ color: "var(--navy)" }}
            >
              Real Gate &amp;
              <span style={{ color: "var(--brown-warm)" }}> Garage Door</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-6 text-sm font-semibold ${linkColor}`}>
            {/* Gate Services */}
            <div className="relative group">
              <Link href="/services" className="flex items-center gap-1 py-2 hover:opacity-70 transition-opacity">
                Gate Services <ChevronDown size={14} />
              </Link>
              <div
                className="absolute top-full left-0 rounded-[var(--radius-lg)] py-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50"
                style={{ background: "var(--bg-card)", boxShadow: "0 8px 32px rgba(11,28,46,0.14)", border: "1px solid var(--line)" }}
              >
                {gateLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--text-mid)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--brown)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-mid)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Garage Door */}
            <div className="relative group">
              <Link href="/services/garage-door-repair" className="flex items-center gap-1 py-2 hover:opacity-70 transition-opacity">
                Garage Door <ChevronDown size={14} />
              </Link>
              <div
                className="absolute top-full left-0 rounded-[var(--radius-lg)] py-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50"
                style={{ background: "var(--bg-card)", boxShadow: "0 8px 32px rgba(11,28,46,0.14)", border: "1px solid var(--line)" }}
              >
                {garageDoorLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--text-mid)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--brown)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-mid)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Areas */}
            <div className="relative group">
              <Link href="/service-areas" className="flex items-center gap-1 py-2 hover:opacity-70 transition-opacity">
                Areas <ChevronDown size={14} />
              </Link>
              <div
                className="absolute top-full left-0 rounded-[var(--radius-lg)] py-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50"
                style={{ background: "var(--bg-card)", boxShadow: "0 8px 32px rgba(11,28,46,0.14)", border: "1px solid var(--line)" }}
              >
                {areaLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--text-mid)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--brown)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-mid)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="relative group">
              <Link href="/brands" className="flex items-center gap-1 py-2 hover:opacity-70 transition-opacity">
                Brands <ChevronDown size={14} />
              </Link>
              <div
                className="absolute top-full left-0 rounded-[var(--radius-lg)] py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50"
                style={{ background: "var(--bg-card)", boxShadow: "0 8px 32px rgba(11,28,46,0.14)", border: "1px solid var(--line)" }}
              >
                {brandLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--text-mid)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--brown)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-mid)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/tips" className="hover:opacity-70 transition-opacity py-2">Tips</Link>
            <Link href="/about" className="hover:opacity-70 transition-opacity py-2">About</Link>
            <Link href="/contact" className="hover:opacity-70 transition-opacity py-2">Contact</Link>
          </nav>

          {/* Phone CTA */}
          <div className="hidden lg:flex items-center">
            <a href={BUSINESS.phoneHref} className="btn-primary text-sm">
              <Phone size={15} />
              {BUSINESS.phone}
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              aria-label="Call us"
              style={{ color: "var(--navy)" }}
            >
              <Phone size={22} />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ color: "var(--text-dark)" }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t pb-4 max-h-screen overflow-y-auto"
            style={{ background: "var(--bg-card)", borderColor: "var(--line)" }}
          >
            <div className="container-max py-3">
              <a href={BUSINESS.phoneHref} className="btn-primary w-full text-center mb-4 mt-1 justify-center">
                <Phone size={16} />
                Call {BUSINESS.phone}
              </a>

              <button
                className="w-full flex items-center justify-between py-3 border-b font-semibold text-sm"
                style={{ borderColor: "var(--line)", color: "var(--text-dark)" }}
                onClick={() => toggleDropdown("mob-gate")}
              >
                Gate Services <ChevronDown size={16} className={openDropdown === "mob-gate" ? "rotate-180" : ""} />
              </button>
              {openDropdown === "mob-gate" && (
                <div className="pl-4 pb-2">
                  {gateLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block py-2 text-sm"
                      style={{ color: "var(--text-soft)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                className="w-full flex items-center justify-between py-3 border-b font-semibold text-sm"
                style={{ borderColor: "var(--line)", color: "var(--text-dark)" }}
                onClick={() => toggleDropdown("mob-garage")}
              >
                Garage Door Services <ChevronDown size={16} className={openDropdown === "mob-garage" ? "rotate-180" : ""} />
              </button>
              {openDropdown === "mob-garage" && (
                <div className="pl-4 pb-2">
                  {garageDoorLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block py-2 text-sm"
                      style={{ color: "var(--text-soft)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                className="w-full flex items-center justify-between py-3 border-b font-semibold text-sm"
                style={{ borderColor: "var(--line)", color: "var(--text-dark)" }}
                onClick={() => toggleDropdown("mob-areas")}
              >
                Service Areas <ChevronDown size={16} className={openDropdown === "mob-areas" ? "rotate-180" : ""} />
              </button>
              {openDropdown === "mob-areas" && (
                <div className="pl-4 pb-2">
                  {areaLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block py-2 text-sm"
                      style={{ color: "var(--text-soft)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                className="w-full flex items-center justify-between py-3 border-b font-semibold text-sm"
                style={{ borderColor: "var(--line)", color: "var(--text-dark)" }}
                onClick={() => toggleDropdown("mob-brands")}
              >
                Brands <ChevronDown size={16} className={openDropdown === "mob-brands" ? "rotate-180" : ""} />
              </button>
              {openDropdown === "mob-brands" && (
                <div className="pl-4 pb-2">
                  {brandLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block py-2 text-sm"
                      style={{ color: "var(--text-soft)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}

              {[
                { href: "/tips", label: "Tips" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block py-3 border-b font-semibold text-sm"
                  style={{ borderColor: "var(--line)", color: "var(--text-dark)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
