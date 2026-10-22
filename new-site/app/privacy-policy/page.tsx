import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.name}`,
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-padding">
      <div className="container-max max-w-3xl">
        <h1 className="text-primary mb-6">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: October 21, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <p>
            This website is run by {BUSINESS.name} (&ldquo;we&rdquo; or &ldquo;us&rdquo;). This page describes what information reaches us through the site, what we do with it, and which outside services handle it along the way.
          </p>

          <h2 className="text-primary">What You Send Us</h2>
          <p>When you fill in the request form, you give us your name and phone number, and optionally your address and a description of the problem with your gate or garage door. If you call or text, we receive your phone number and whatever you tell us or send us, such as photos.</p>

          <h2 className="text-primary">What We Do With It</h2>
          <p>Your details are used to call you back, quote and schedule the work, and follow up about a job we did for you. Nobody buys or rents this information from us, and we do not pass it to anyone for advertising. The only outside parties that see it are the service providers below, and only so the site and the form can work.</p>

          <h2 className="text-primary">Outside Services</h2>
          <p>Three providers help run this site. Each gets only the data listed next to its name.</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Formspree</strong> (form delivery): what you type into the request form is passed through Formspree, which forwards it to our office. It does not track how you browse the site. See{" "}
              <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent">
                Formspree&apos;s privacy policy
              </a>.
            </li>
            <li>
              <strong>Google Analytics 4</strong> (site statistics): counts of which pages are visited, roughly from where and on what kind of device, plus clicks on our call and text buttons. Google offers a browser add-on to opt out. See{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent">
                Google&apos;s privacy policy
              </a>.
            </li>
            <li>
              <strong>Cloudflare Pages</strong> (hosting): the site is delivered through Cloudflare, which sees routine connection data like your IP address in order to serve the pages. See{" "}
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-accent">
                Cloudflare&apos;s privacy policy
              </a>.
            </li>
          </ul>

          <h2 className="text-primary">Contact</h2>
          <p>
            Questions about this page? Call or text <a href={BUSINESS.phoneHref} className="text-accent">{BUSINESS.phone}</a>
            {BUSINESS.email && (
              <>
                {" "}or email <a href={`mailto:${BUSINESS.email}`} className="text-accent">{BUSINESS.email}</a>
              </>
            )}
            .
          </p>
        </div>
      </div>
    </section>
  );
}
