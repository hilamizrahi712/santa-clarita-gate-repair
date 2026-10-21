import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, MessageSquareText, Calendar, Clock, ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-data";
import { BUSINESS, ORG_ID } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";
import DiagnosticWidget from "@/components/DiagnosticWidget";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const url = `/tips/${slug}`;
  const ogImage = { url: "/images/og/og-default.jpg", width: 1200, height: 630 };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: post.metaTitle, description: post.metaDescription, type: "article", url, images: [ogImage] },
    twitter: { card: "summary_large_image", images: [ogImage.url] },
  };
}

function formatMonthYear(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function parseInline(text: string): React.ReactNode {
  // Split on **bold** and [label](href), keeping the delimiters.
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((tok, i) => {
    const bold = tok.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i} style={{ fontWeight: 700 }}>{bold[1]}</strong>;
    const link = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <Link key={i} href={href} className="tips-link">{label}</Link>
      ) : (
        <a key={i} href={href} className="tips-link" target="_blank" rel="noopener noreferrer">{label}</a>
      );
    }
    return tok;
  });
}

function renderContent(content: string) {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-heading font-bold mt-10 mb-4"
          style={{ color: "var(--heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
        >
          {parseInline(block.replace("## ", ""))}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="font-heading font-semibold mt-7 mb-3"
          style={{ color: "var(--text-dark)", fontSize: "1.2rem" }}
        >
          {parseInline(block.replace("### ", ""))}
        </h3>
      );
    }
    if (block.startsWith("| ")) {
      const rows = block.split("\n").filter((r) => !r.match(/^\|[-\s|]+\|$/));
      return (
        <div key={i} className="overflow-x-auto my-5">
          <table
            className="w-full text-sm border-collapse"
            style={{ borderColor: "var(--line)" }}
          >
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split("|").filter((c) => c.trim() !== "");
                const Tag = ri === 0 ? "th" : "td";
                return (
                  <tr
                    key={ri}
                    style={{
                      background: ri === 0 ? "var(--bg-muted)" : ri % 2 === 0 ? "var(--bg-card)" : "transparent",
                    }}
                  >
                    {cells.map((cell, ci) => (
                      <Tag
                        key={ci}
                        className="px-3 py-2 text-left"
                        style={{ border: "1px solid var(--line)", color: "var(--text-mid)" }}
                      >
                        {cell.trim()}
                      </Tag>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    if (block.match(/^✅|^❌/)) {
      const items = block.split("\n").filter(Boolean);
      return (
        <ul key={i} className="space-y-2 my-4">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-2" style={{ color: "var(--text-mid)" }}>
              <span className="text-base mt-0.5">{item.startsWith("✅") ? "✅" : "❌"}</span>
              <span>{parseInline(item.replace(/^[✅❌]\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (block.startsWith("---")) {
      return <hr key={i} className="my-8" style={{ borderColor: "var(--line)" }} />;
    }
    return (
      <p key={i} className="leading-relaxed mb-4" style={{ color: "var(--text-mid)" }}>
        {parseInline(block)}
      </p>
    );
  });
}

export default async function TipsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.updatedAt ?? post.publishDate,
    publisher: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
  };

  // Article schema only — deliberately no Offer/PriceSpecification. Any $ figures in
  // this content are general market ranges, not our quotes, and schema shouldn't
  // imply otherwise.
  const faqSchema = post.faq && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header */}
      <section className="py-12" style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--line)" }}>
        <div className="container-max max-w-4xl">
          <Link
            href="/tips"
            className="inline-flex items-center gap-2 text-sm mb-5 transition-colors"
            style={{ color: "var(--stone)" }}
          >
            <ArrowLeft size={14} /> Back to Tips
          </Link>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: post.category === "gate" ? "var(--navy)" : "var(--brown)",
                color: "var(--text-warm)",
              }}
            >
              {post.category === "gate" ? "Gate Tips" : "Garage Door Tips"}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--stone-light)" }}>
              <Calendar size={11} /> {post.publishDate}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--stone-light)" }}>
              <Clock size={11} /> {post.readTime}
            </span>
          </div>
          <h1
            style={{ color: "var(--heading)", marginBottom: "0.5rem" }}
          >
            {post.title}
          </h1>
          {post.updatedAt && (
            <p className="text-xs" style={{ color: "var(--stone-light)", marginBottom: "0.75rem" }}>
              Last updated: {formatMonthYear(post.updatedAt)}
            </p>
          )}
          <p style={{ color: "var(--text-soft)", fontSize: "1.05rem" }}>{post.excerpt}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: "var(--bg-base)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <article className="lg:col-span-2 max-w-none">
              {post.pricingDisclaimer && (
                <div
                  className="rounded-[var(--radius-lg)] px-5 py-4 mb-8"
                  style={{ background: "rgba(77,184,122,0.12)", border: "1px solid rgba(77,184,122,0.4)" }}
                >
                  <p className="font-semibold text-sm" style={{ color: "var(--heading)" }}>
                    {post.pricingDisclaimer}
                  </p>
                </div>
              )}
              {renderContent(post.content)}

              {/* FAQ */}
              {post.faq && post.faq.length > 0 && (
                <div className="mt-10">
                  <h2
                    className="font-heading font-bold mt-2 mb-4"
                    style={{ color: "var(--heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {post.faq.map((f, i) => (
                      <div
                        key={i}
                        className="rounded-[var(--radius-lg)] p-5"
                        style={{ border: "1px solid var(--line)", background: "var(--bg-card)" }}
                      >
                        <h3
                          className="font-heading font-semibold mb-2"
                          style={{ fontSize: "1rem", color: "var(--heading)" }}
                        >
                          {f.q}
                        </h3>
                        <p style={{ color: "var(--text-soft)", fontSize: "0.92rem" }}>{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* In-content CTA */}
              <div
                className="rounded-[var(--radius-lg)] p-6 mt-10"
                style={{ background: "var(--navy)" }}
                data-cta-location="article_cta"
              >
                <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "var(--text-warm)" }}>
                  Need Professional Help?
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgba(216,234,208,0.7)" }}>
                  Real Gate &amp; Garage Door provides same-day service.
                  Bonded, insured, upfront pricing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={BUSINESS.phoneHref} className="btn-gold">
                    <Phone size={16} /> Call {BUSINESS.phone}
                  </a>
                  <a href={BUSINESS.smsHref} className="btn-ghost">
                    <MessageSquareText size={16} /> Text us a photo — free diagnosis
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <div className="space-y-6">
              <ContactForm />
              <div className="card">
                <h3
                  className="font-heading font-semibold mb-4"
                  style={{ fontSize: "1rem", color: "var(--heading)" }}
                >
                  More Tips
                </h3>
                <div className="space-y-3">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/tips/${p.slug}`}
                      className="block text-sm leading-snug transition-colors"
                      style={{ color: "var(--text-soft)" }}
                    >
                      → {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic widget — same Formspree flow as the homepage, context-set heading */}
      <DiagnosticWidget
        eyebrow="Free Diagnosis"
        heading={
          <>
            Not Sure What&apos;s Wrong With Your{" "}
            <em>{post.category === "gate" ? "Gate" : "Garage Door"}</em>?
          </>
        }
        subheading={`Answer 4 quick questions about your ${
          post.category === "gate" ? "gate" : "garage door"
        } and get an expert read on what's likely failing — and what it takes to fix.`}
      />
    </>
  );
}
