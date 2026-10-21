import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You — Real Gate & Garage Door",
  description: "Your request has been received. We'll call you back within 30 minutes.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-base)", minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container-max max-w-xl text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} style={{ color: "var(--brown-warm)" }} />
        </div>

        <h1 style={{ marginBottom: "1rem", fontSize: "2.25rem", lineHeight: 1.15 }}>
          Request Received!
        </h1>

        <p style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2rem" }}>
          We&apos;ll call you back within <strong>30 minutes</strong> during business hours
          (Sun–Fri, 7 AM–10 PM). If this is urgent, call us directly and we&apos;ll pick up now.
        </p>

        <div
          className="rounded-[var(--radius-lg)] p-6 mb-8"
          style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
        >
          <p className="font-semibold mb-2" style={{ color: "var(--text-dark)" }}>
            Need help right now?
          </p>
          <a
            href={BUSINESS.phoneHref}
            className="btn-primary"
            style={{ fontSize: "1.1rem", padding: "0.875rem 2rem" }}
          >
            <Phone size={18} /> Call {BUSINESS.phone}
          </a>
          <p style={{ color: "var(--stone)", fontSize: "0.8rem", marginTop: "0.75rem" }}>
            Emergency line answered 24/7
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            Back to Home <ArrowRight size={15} />
          </Link>
          <Link href="/services" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            View All Services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
