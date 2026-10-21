import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Real Gate & Garage Door",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-3xl">
        <h1 className="text-primary mb-6">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: August 19, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <p>
            {BUSINESS.name} (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates this website. This Privacy Policy explains how we collect, use, and protect your information when you use our website or contact us for service.
          </p>

          <h2 className="text-primary">Information We Collect</h2>
          <p>We collect information you provide directly, including your name, phone number, email address, service address, and description of your service need when you submit our contact form.</p>

          <h2 className="text-primary">How We Use Your Information</h2>
          <p>We use your information solely to respond to your service inquiry, schedule appointments, and follow up on completed service. We do not sell or rent your personal information, and we do not share it for marketing purposes. We do share it with the third-party service providers listed below, solely to operate this website and respond to your inquiries.</p>

          <h2 className="text-primary">Third-Party Services</h2>
          <p>We use a small number of third-party services to run this website and respond to inquiries. Each one only receives the data described below, and only for the stated purpose.</p>
          <p>We also use analytics and session-behavior tools to understand how visitors navigate and interact with the site so we can improve our service.</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Formspree</strong> (form processing) — When you submit our contact form or diagnostic tool, your name, phone number, and any property address or service details you provide are sent to Formspree, which delivers that submission to us as an email/notification. Formspree does not receive your browsing activity. See{" "}
              <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent">
                Formspree&apos;s privacy policy
              </a>.
            </li>
            <li>
              <strong>Google Analytics 4</strong> (analytics) — Aggregated, anonymized data about how visitors use our website (pages viewed, general location, device type) so we can understand site traffic. You can opt out via Google&apos;s browser add-on. See{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent">
                Google&apos;s privacy policy
              </a>.
            </li>
            <li>
              <strong>Cloudflare Pages</strong> (hosting &amp; CDN) — This website is hosted and served through Cloudflare, which processes standard technical data (such as IP address) as part of normal web hosting and content delivery. See{" "}
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-accent">
                Cloudflare&apos;s privacy policy
              </a>.
            </li>
          </ul>

          <h2 className="text-primary">Contact</h2>
          <p>Questions about this policy? Contact us at <a href={`mailto:${BUSINESS.email}`} className="text-accent">{BUSINESS.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
