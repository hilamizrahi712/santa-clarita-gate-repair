import { BUSINESS } from "@/lib/constants";

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  heroH1: string;
  heroSubtitle: string;
  heroImg: string;
  intro: string;
  features: { icon: string; title: string; desc: string }[];
  howItWorks: string[];
  symptoms: string[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  isInstallation: boolean;
  isEmergency?: boolean;
}

export const SERVICES: ServiceData[] = [
  // TODO(content): same service slugs as REAL, gates first, then garage doors.
  {
    slug: "gate-repair",
    title: "Gate Repair",
    metaTitle: `Gate Repair | ${BUSINESS.name}`,
    metaDescription: "TODO(content)",
    primaryKeyword: "gate repair santa clarita",
    heroH1: "TODO(content)",
    heroSubtitle: "TODO(content)",
    heroImg: "",
    intro: "TODO(content)",
    features: [],
    howItWorks: [],
    symptoms: [],
    faqs: [],
    relatedSlugs: [],
    isInstallation: false,
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getGateServices(): ServiceData[] {
  return SERVICES.filter((s) =>
    ["gate-repair", "automatic-gate-repair", "driveway-gate-repair", "electric-gate-repair", "gate-opener-repair", "gate-motor-replacement", "iron-gate-repair", "commercial-gate-repair", "gate-installation"].includes(s.slug)
  );
}

export function getGarageDoorServices(): ServiceData[] {
  return SERVICES.filter((s) =>
    ["garage-door-repair", "garage-door-spring-repair", "garage-door-opener-repair", "garage-door-cable-repair", "garage-door-panel-repair", "emergency-garage-door-repair", "commercial-garage-door", "garage-door-installation"].includes(s.slug)
  );
}
