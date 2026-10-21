import { BRAND_MODELS, modelVariants, normalizeModel } from "@/lib/brand-models";

// Server-rendered model table: every model with its other common spellings in plain
// text, so search engines and AI assistants match "SL150", "SL-150" and "SL 150" alike.
export default function ModelList({ slug, brandName, headingLevel = "h3" }: { slug: string; brandName: string; headingLevel?: "h3" | "h4" }) {
  const data = BRAND_MODELS[slug];
  if (!data) return null;
  const H = headingLevel;

  return (
    <div className="flex flex-col gap-6">
      {data.note && (
        <p style={{ color: "var(--text-mid)", fontSize: "0.92rem", lineHeight: 1.7 }}>{data.note}</p>
      )}
      {data.groups.map((g) => (
        <div key={g.title}>
          <H className="font-heading font-semibold" style={{ fontSize: "1rem", color: "var(--navy)", marginBottom: "0.6rem" }}>
            {g.title.toLowerCase().includes(brandName.toLowerCase())
              ? g.title
              : `${brandName} ${g.title.charAt(0).toLowerCase()}${g.title.slice(1)}`}
          </H>
          <ul className="flex flex-col" style={{ borderTop: "1px solid var(--line)" }}>
            {g.models.map((m) => {
              const variants = modelVariants(m, data.numberPrefixes);
              // "Ram 3000" and "Eagle 1000" already carry the brand.
              const carriesBrand = normalizeModel(m.name).startsWith(normalizeModel(brandName).slice(0, 3));
              return (
                <li key={m.name} className="py-2.5" style={{ borderBottom: "1px solid var(--line)" }}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-semibold" style={{ color: "var(--navy)", fontSize: "0.95rem" }}>
                      {carriesBrand ? m.name : `${brandName} ${m.name}`}
                    </span>
                    <span style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>
                      {m.kind}
                      {m.era === "older" ? " · repair or replace with a current model" : ""}
                    </span>
                  </div>
                  {variants.length > 0 && (
                    <p style={{ color: "var(--text-soft)", fontSize: "0.78rem", marginTop: "0.15rem" }}>
                      Also written as: {variants.join(", ")}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <p style={{ color: "var(--text-soft)", fontSize: "0.82rem" }}>
        {brandName} is also searched as: {data.brandAliases.join(", ")}.
      </p>
    </div>
  );
}
