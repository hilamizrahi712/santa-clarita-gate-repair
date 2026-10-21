"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRANDS } from "@/lib/brands-data";

export default function BrandsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nudge = (dir: -1 | 1) => {
    pausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    offsetRef.current = Math.max(0, offsetRef.current + dir * 144);
    if (halfRef.current > 0 && offsetRef.current >= halfRef.current) {
      offsetRef.current = offsetRef.current % halfRef.current;
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
    pauseTimerRef.current = setTimeout(() => { pausedRef.current = false; }, 2500);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const getHalf = () => { halfRef.current = track.scrollWidth / 2; };

    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current += 0.5;
        if (halfRef.current > 0 && offsetRef.current >= halfRef.current) {
          offsetRef.current = 0;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => { getHalf(); rafRef.current = requestAnimationFrame(tick); };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    window.addEventListener("resize", getHalf, { passive: true });

    const onTouchStart = (e: TouchEvent) => e.preventDefault();
    track.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      window.removeEventListener("resize", getHalf);
      track.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  const items = [...BRANDS, ...BRANDS];

  const arrowBtn: React.CSSProperties = {
    background: "var(--bg-card)",
    border: "1px solid var(--line)",
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--navy)",
    flexShrink: 0,
  };

  return (
    <section className="brands-bar">
      <div className="brands-head">
        <span className="eyebrow">Brands We Service</span>
        <h2>Every Major Manufacturer. <em>Every Model.</em></h2>
        <p>We work on them all — from LiftMaster to Viking, Genie to DoorKing.</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0 1.5rem" }}>
        <button onClick={() => nudge(-1)} aria-label="Previous brands" style={arrowBtn}>
          <ChevronLeft size={18} />
        </button>
        <div className="brands-marquee-wrap" style={{ flex: 1 }} aria-hidden="true">
          <div className="brands-marquee-track" ref={trackRef}>
            {items.map((brand, i) => (
              <div
                key={i}
                style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Link href={`/brands/${brand.slug}`} tabIndex={-1} style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={44}
                    style={{ objectFit: "contain", height: 44, width: "auto", maxWidth: 120 }}
                    unoptimized
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => nudge(1)} aria-label="Next brands" style={arrowBtn}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <Link href="/brands/liftmaster" className="btn-secondary" style={{ display: "inline-flex" }}>
          View All Brands We Service
        </Link>
      </div>
    </section>
  );
}
