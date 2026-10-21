declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Fire a GA4 event if GA is configured. No-op when window.gtag is absent, so
 * every call site behaves identically whether or not NEXT_PUBLIC_GA_ID is set.
 */
export function gtagEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
