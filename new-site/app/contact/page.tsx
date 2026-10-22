import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";
import TextUsCTA from "@/components/TextUsCTA";

export const metadata: Metadata = {
  title: `Contact ${BUSINESS.name} | Free On-Site Quote`,
  description: `Call or text ${BUSINESS.phone} for gate and garage door repair in the Santa Clarita and Antelope Valleys, or send the form for a free on-site quote.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 section--dark">
        <div className="container-max max-w-2xl">
          <span className="eyebrow">Get in Touch</span>
          <h1 style={{ color: "#ffffff", marginBottom: "0.75rem" }}>
            Call, Text or <em>Send the Form</em>
          </h1>
          <p style={{ color: "rgba(216,234,208,0.75)", fontSize: "1.05rem" }}>
            Tell us what the gate or garage door is doing. A photo of the operator or its sticker helps us bring the right parts.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-base)" }} data-cta-location="contact_page">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem" }}>Reach a Technician</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-[var(--radius)]"
                    style={{ width: 48, height: 48, background: "var(--brown)" }}
                  >
                    <Phone size={20} style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text-dark)", marginBottom: "0.2rem" }}>
                      Call or Text
                    </p>
                    <a
                      href={BUSINESS.phoneHref}
                      className="font-bold"
                      style={{ fontSize: "1.5rem", color: "var(--brown-warm)", textDecoration: "none" }}
                    >
                      {BUSINESS.phone}
                    </a>
                    <p style={{ fontSize: "0.82rem", color: "var(--stone)", marginTop: "0.2rem" }}>
                      Emergency line answered 24/7
                    </p>
                    <TextUsCTA className="btn-secondary text-sm mt-2" />
                  </div>
                </div>

                {/* Email: hidden until the business email is decided (TODO(pending) in lib/constants.ts) */}
                {BUSINESS.email && (
                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-[var(--radius)]"
                    style={{ width: 48, height: 48, background: "var(--navy)" }}
                  >
                    <Mail size={20} style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text-dark)", marginBottom: "0.2rem" }}>
                      Email
                    </p>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      style={{ color: "var(--heading)", textDecoration: "none" }}
                    >
                      {BUSINESS.email}
                    </a>
                    <p style={{ fontSize: "0.82rem", color: "var(--stone)", marginTop: "0.2rem" }}>
                      For non-urgent questions and paperwork
                    </p>
                  </div>
                </div>
                )}

                {/* Location */}
                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-[var(--radius)]"
                    style={{ width: 48, height: 48, background: "var(--bg-muted)", border: "1px solid var(--line)" }}
                  >
                    <MapPin size={20} style={{ color: "var(--stone)" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text-dark)", marginBottom: "0.2rem" }}>
                      Service Area
                    </p>
                    <p style={{ color: "var(--text-mid)" }}>Santa Clarita Valley and Antelope Valley</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--stone)", marginTop: "0.2rem" }}>
                      Technicians come to your property, Castaic to Pearblossom
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-[var(--radius)]"
                    style={{ width: 48, height: 48, background: "rgba(26,107,56,0.12)" }}
                  >
                    <Clock size={20} style={{ color: "var(--success)" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text-dark)", marginBottom: "0.2rem" }}>
                      Hours
                    </p>
                    <div style={{ color: "var(--text-mid)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                      <p>Sunday to Friday, 7 AM to 10 PM</p>
                      <p>Saturday: Closed</p>
                      <p style={{ color: "var(--error)", fontWeight: 600 }}>Emergency line: 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency CTA */}
              <div
                className="rounded-[var(--radius-lg)] p-5 mt-8"
                style={{ background: "rgba(176,48,37,0.08)", border: "1px solid rgba(176,48,37,0.2)" }}
              >
                <p className="font-bold mb-1" style={{ color: "var(--error)" }}>
                  Gate or Garage Door Emergency?
                </p>
                <p style={{ color: "var(--text-mid)", fontSize: "0.88rem", marginBottom: "1rem" }}>
                  Gate stuck open overnight, or a car trapped behind a garage door that will not lift?
                  Call the emergency line and we send a technician out.
                </p>
                <a
                  href={BUSINESS.phoneHref}
                  className="btn-primary"
                  style={{ background: "var(--error)" }}
                >
                  <Phone size={16} /> Emergency: {BUSINESS.phone}
                </a>
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
