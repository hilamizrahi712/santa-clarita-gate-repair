"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Phone, Search } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { gtagEvent } from "@/lib/gtag";
import TextUsCTA from "@/components/TextUsCTA";
import type { FinderEntry } from "@/lib/brand-models";

interface Props {
  entries: FinderEntry[];
  /** Brand of the current page, so its matches are listed first. */
  currentBrandSlug?: string;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Type a model the way it's written on the sticker, with or without dashes or spaces.
export default function ModelFinder({ entries, currentBrandSlug }: Props) {
  const [query, setQuery] = useState("");
  const q = norm(query);

  const matches = useMemo(() => {
    if (q.length < 2) return [];
    const scored = entries
      .map((e) => {
        let score = 0;
        for (const k of e.keys) {
          if (k === q) score = Math.max(score, 3);
          else if (q.length >= 3 && k.startsWith(q)) score = Math.max(score, 2);
          else if (q.length >= 4 && (k.includes(q) || q.startsWith(k))) score = Math.max(score, 1);
        }
        if (score && e.brandSlug === currentBrandSlug) score += 0.5;
        return { e, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 6).map((x) => x.e);
  }, [q, entries, currentBrandSlug]);

  const searched = q.length >= 2;

  return (
    <div className="rounded-[var(--radius-lg)] p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
      <label htmlFor="model-finder" className="font-heading font-semibold block" style={{ color: "var(--heading)", marginBottom: "0.5rem" }}>
        Find your model
      </label>
      <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
        Type the model from the sticker on your gate motor, with or without dashes (SL-150 or SL150).
      </p>
      <div className="flex items-center gap-2 rounded-[var(--radius)] px-3" style={{ border: "1px solid var(--line)", background: "var(--bg-base)" }}>
        <Search size={16} style={{ color: "var(--text-soft)", flexShrink: 0 }} />
        <input
          id="model-finder"
          type="text"
          inputMode="text"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => {
            if (q.length >= 2) gtagEvent("model_search", { query: query.trim(), matches: matches.length });
          }}
          placeholder="e.g. LA400, SL150, K-2, 9050"
          className="w-full py-2.5 bg-transparent outline-none"
          style={{ fontSize: "1rem", color: "var(--heading)" }}
        />
      </div>

      {searched && (
        <div className="mt-4" aria-live="polite">
          {matches.length > 0 ? (
            <ul className="space-y-2">
              {matches.map((m) => (
                <li key={`${m.brandSlug}-${m.name}`} className="flex flex-wrap items-baseline gap-x-2" style={{ fontSize: "0.92rem" }}>
                  <span className="font-semibold" style={{ color: "var(--heading)" }}>
                    Yes, we repair and replace the{" "}
                    <Link href={`/brands/${m.brandSlug}`} style={{ color: "var(--brown-warm)", textDecoration: "underline" }}>
                      {m.brand}
                    </Link>{" "}
                    {m.name}
                  </span>
                  <span style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>{m.kind}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "var(--text-mid)", fontSize: "0.92rem" }}>
              Not on our list? We work on most older and discontinued gate motors too. Text us a photo of the sticker and we&apos;ll tell you.
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-4">
            <a href={BUSINESS.phoneHref} className="btn-primary">
              <Phone size={15} /> Call {BUSINESS.phone}
            </a>
            <TextUsCTA className="btn-secondary" size={15} />
          </div>
        </div>
      )}
    </div>
  );
}
