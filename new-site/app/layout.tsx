import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ConversionTracking from "@/components/ConversionTracking";
import { BUSINESS, ALL_CITIES, ORG_ID } from "@/lib/constants";
import { BRANDS } from "@/lib/brands-data";
import { SERVICES } from "@/lib/services-data";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Set NEXT_PUBLIC_GSC_VERIFICATION / NEXT_PUBLIC_GA_ID in Cloudflare Pages → Settings →
// Environment Variables. See .env.example / README for details.
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gaEnabled = !!gaId && !gaId.startsWith("G-XXX");
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

// Tarzana pin — matches BUSINESS address below. Confirm against the Google Business Profile pin.
const GEO_LAT = 34.1747;
const GEO_LNG = -118.5539;

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.domain),
  title: {
    default: "Automatic Gate Repair & Garage Door Repair | Same-Day Service",
    // Passthrough — every page title already includes "| Real Gate & Garage Door"
    template: "%s",
  },
  description:
    "Expert gate repair and garage door repair in Los Angeles, CA. Same-day service, 24/7 emergency, free estimates. Call (818) 915-5715.",
  keywords: ["gate repair Los Angeles", "garage door repair Los Angeles", "gate repair near me"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BUSINESS.name,
    url: "/",
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Tarzana",
    "geo.position": `${GEO_LAT};${GEO_LNG}`,
    ICBM: `${GEO_LAT}, ${GEO_LNG}`,
  },
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": ORG_ID,
  name: BUSINESS.name,
  description: "Expert gate and garage door repair, installation, and 24/7 emergency service across greater Los Angeles, CA",
  url: BUSINESS.domain,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  image: `${BUSINESS.domain}/images/og/og-default.jpg`,
  logo: `${BUSINESS.domain}/images/logos/logo-name-white-square.webp`,
  address: {
    "@type": "PostalAddress",
    // Service-area business — GBP has the street address hidden. City/region/postal only.
    addressLocality: "Tarzana",
    addressRegion: "CA",
    postalCode: "91356",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: GEO_LAT, longitude: GEO_LNG },
  areaServed: ALL_CITIES.map((c) => ({ "@type": "City", name: c.name })),
  // Core San Fernando Valley coverage radius around the Tarzana pin — areaServed above
  // already carries the full 52-city list; this just gives the field built for breadth.
  serviceArea: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: GEO_LAT, longitude: GEO_LNG }, geoRadius: "40000" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Gate & Garage Door Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${BUSINESS.domain}/services/${s.slug}` },
    })),
  },
  // No review / aggregateRating markup: Google treats reviews on your own LocalBusiness
  // as self-serving and ineligible, and our reviews are copied from Google anyway.
  knowsAbout: [
    ...BRANDS.map((b) => b.name),
    "Automatic gate operators",
    "Torsion springs",
    "Access control systems",
    "UL 325 compliance",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
    opens: "07:00",
    closes: "22:00",
  },
  priceRange: "$$",
  sameAs: [
    // TODO(client): Google Business Profile URL
    // TODO(client): Yelp business page URL
    // TODO(client): Bing Places business page URL
    // TODO(client): Apple Business Connect listing URL
    // TODO(client): BBB profile URL
    // TODO(client): Facebook Page URL
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {gaEnabled && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
        {clarityId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarityId}");`,
            }}
          />
        )}
      </head>
      <body className="flex flex-col min-h-screen pb-14 lg:pb-0">
        <ConversionTracking />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
