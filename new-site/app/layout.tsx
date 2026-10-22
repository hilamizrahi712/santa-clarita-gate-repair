import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ConversionTracking from "@/components/ConversionTracking";
import { IMAGES } from "@/lib/images";
import { BUSINESS, ALL_CITIES, ORG_ID, GA4_ID } from "@/lib/constants";
import { BRANDS } from "@/lib/brands-data";
import { SERVICES } from "@/lib/services-data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Set NEXT_PUBLIC_GSC_VERIFICATION in Cloudflare Pages → Settings → Environment Variables.
// GA4 defaults to the existing property in lib/constants.ts; NEXT_PUBLIC_GA_ID overrides it.
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID || GA4_ID;
const gaEnabled = !!gaId && !gaId.startsWith("G-XXX");
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

// City-center pin for Santa Clarita (service-area business, no street address).
const GEO_LAT = 34.3917;
const GEO_LNG = -118.5426;

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.domain),
  title: {
    default: `Gate & Garage Door Repair in Santa Clarita | ${BUSINESS.name}`,
    template: "%s",
  },
  description:
    `Driveway gate, gate opener and garage door repair across the Santa Clarita and Antelope Valleys. 24/7 emergency dispatch and free on-site quotes. Call ${BUSINESS.phone}.`,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BUSINESS.name,
    url: "/",
    images: [{ url: IMAGES.og, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Santa Clarita",
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
  alternateName: BUSINESS.shortName,
  description: "Gate, gate operator and garage door repair for homes and businesses in the Santa Clarita Valley and Antelope Valley, with 24/7 emergency dispatch.",
  url: BUSINESS.domain,
  telephone: BUSINESS.phone,
  ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
  image: `${BUSINESS.domain}${IMAGES.og}`,
  address: {
    "@type": "PostalAddress",
    // Service-area business: no street address, city/region only.
    addressLocality: "Santa Clarita",
    addressRegion: "CA",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: GEO_LAT, longitude: GEO_LNG },
  areaServed: ALL_CITIES.map((c) => ({ "@type": "City", name: `${c.name}, CA` })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Gate & Garage Door Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${BUSINESS.domain}/services/${s.slug}` },
    })),
  },
  // No review / aggregateRating markup (site rule: no reviews or ratings anywhere).
  knowsAbout: [
    ...BRANDS.map((b) => b.name),
    "Automatic gate operators",
    "Garage door springs",
    "Access control systems",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "22:00",
  },
  // TODO(client): sameAs profile URLs (Google Business Profile, Yelp, Facebook) once they exist.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
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
