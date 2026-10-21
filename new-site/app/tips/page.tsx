import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gate & Garage Door Tips | Real Gate & Garage Door",
  description:
    "Expert tips, cost guides, and troubleshooting for gates and garage doors. Real answers from the technicians at Real Gate & Garage Door.",
  alternates: { canonical: "/tips" },
};

export default function TipsIndexPage() {
  const gatePosts = BLOG_POSTS.filter((p) => p.category === "gate");
  const garagePosts = BLOG_POSTS.filter((p) => p.category === "garage-door");

  return (
    <>
      {/* Hero */}
      <section
        className="py-20 section--dark"
        style={{ background: "var(--bg-dark)", color: "var(--text-warm)" }}
      >
        <div className="container-max max-w-2xl">
          <span className="eyebrow">Expert Advice</span>
          <h1 style={{ color: "var(--text-warm)", marginBottom: "1rem" }}>
            Gate &amp; Garage Door <em>Tips</em>
          </h1>
          <p style={{ color: "rgba(237,234,228,0.75)", fontSize: "1.1rem" }}>
            Cost guides, troubleshooting help, and maintenance advice from the technicians
            at {BUSINESS.name}.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          {/* Gate posts */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="font-heading font-bold"
                style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)" }}
              >
                Gate Tips
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {gatePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/tips/${p.slug}`}
                  className="card flex flex-col gap-0 transition-all duration-200 hover:shadow-md overflow-hidden"
                  style={{ textDecoration: "none", padding: 0 }}
                >
                  {p.img && (
                    <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-5" style={{ flexGrow: 1 }}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: "var(--navy)", color: "var(--text-warm)" }}
                      >
                        Gate
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--stone-light)" }}
                      >
                        <Calendar size={11} /> {p.publishDate}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--stone-light)" }}
                      >
                        <Clock size={11} /> {p.readTime}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-bold leading-snug"
                      style={{ fontSize: "1.05rem", color: "var(--navy)" }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", flexGrow: 1 }}>
                      {p.excerpt}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold"
                      style={{ color: "var(--brown)" }}
                    >
                      Read Tip <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Garage Door posts */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span
                className="font-heading font-bold"
                style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)" }}
              >
                Garage Door Tips
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {garagePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/tips/${p.slug}`}
                  className="card flex flex-col gap-0 transition-all duration-200 hover:shadow-md overflow-hidden"
                  style={{ textDecoration: "none", padding: 0 }}
                >
                  {p.img && (
                    <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-5" style={{ flexGrow: 1 }}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: "var(--brown)", color: "var(--text-warm)" }}
                      >
                        Garage Door
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--stone-light)" }}
                      >
                        <Calendar size={11} /> {p.publishDate}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--stone-light)" }}
                      >
                        <Clock size={11} /> {p.readTime}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-bold leading-snug"
                      style={{ fontSize: "1.05rem", color: "var(--navy)" }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", flexGrow: 1 }}>
                      {p.excerpt}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold"
                      style={{ color: "var(--brown)" }}
                    >
                      Read Tip <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
