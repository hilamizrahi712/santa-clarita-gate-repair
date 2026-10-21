"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gtagEvent } from "@/lib/gtag";

/**
 * One delegated click listener for the whole document. Any click that lands on
 * (or inside) a tel:/sms: link fires a GA4 conversion event — no need to wire up
 * the ~38 individual links.
 */
export default function ConversionTracking() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const link = e.target.closest("a");
      const href = link?.getAttribute("href") ?? "";
      const event = href.startsWith("tel:")
        ? "call_click"
        : href.startsWith("sms:")
          ? "sms_click"
          : null;
      if (!event) return;
      const location =
        link!.closest("[data-cta-location]")?.getAttribute("data-cta-location") ?? "other";
      gtagEvent(event, { page: pathname, location });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
