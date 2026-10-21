"use client";

import Link from "next/link";
import { Phone, MessageSquareText, ClipboardList } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function StickyMobileCTA() {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-cta-location="sticky_mobile"
    >
      <a
        href={BUSINESS.phoneHref}
        className="flex flex-col items-center justify-center py-3 gap-1"
        style={{ background: "var(--green)", color: "#ffffff" }}
      >
        <Phone size={20} />
        <span className="text-xs font-semibold">Call Now</span>
      </a>
      <a
        href={BUSINESS.smsHref}
        className="flex flex-col items-center justify-center py-3 gap-1"
        style={{ background: "var(--brown)", color: "#ffffff" }}
      >
        <MessageSquareText size={20} />
        <span className="text-xs font-semibold">Text Us</span>
      </a>
      <Link
        href="/contact"
        className="flex flex-col items-center justify-center py-3 gap-1"
        style={{ background: "var(--navy)", color: "#ffffff", borderTop: "1px solid var(--navy-mid)" }}
      >
        <ClipboardList size={20} />
        <span className="text-xs font-semibold">Free Quote</span>
      </Link>
    </div>
  );
}
