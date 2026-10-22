import Image from "next/image";
import Link from "next/link";
import { BRANDS } from "@/lib/brands-data";

// Static logo grid: 2 per row on mobile, 4 on desktop, each tile links to its brand page.
export default function BrandsGrid() {
  return (
    <section className="section-padding section--muted">
      <div className="container-max">
        <div className="mb-10">
          <span className="eyebrow">Brands</span>
          <h2>Openers and operators we work on</h2>
          <p style={{ color: "var(--text-soft)", marginTop: "0.5rem" }}>
            Gate operators, garage door openers and entry systems found across Santa Clarita &amp; Antelope Valley.
          </p>
        </div>
        <ul className="line-grid grid-cols-2 lg:grid-cols-4">
          {BRANDS.filter((b) => b.logo).map((brand) => (
            <li key={brand.slug} className="brand-tile">
              <Link href={`/brands/${brand.slug}`} aria-label={`${brand.name} repair`}>
                <Image src={brand.logo} alt={`${brand.name} logo`} width={280} height={160} unoptimized />
              </Link>
            </li>
          ))}
          {/* 12th tile keeps the 4- and 2-column rows full */}
          <li className="brand-tile brand-tile--all">
            <Link href="/brands">All brands →</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
