import { BUSINESS, SCV_CITIES, AV_CITIES } from "@/lib/constants";
import { SERVICES } from "@/lib/services-data";
import { BRANDS } from "@/lib/brands-data";

export const dynamic = "force-static";

// Built to out/llms.txt at export time, so phone and hours come from lib/constants.ts.
export async function GET() {
  const d = BUSINESS.domain;
  const list = (items: { name: string; url: string }[]) => items.map((i) => `- [${i.name}](${i.url})`).join("\n");
  const body = `# ${BUSINESS.name}

> Gate and garage door repair and installation for homes, HOAs and businesses in the Santa Clarita Valley and the Antelope Valley, California. Driveway, ranch and community gates are the main work; garage doors, springs and openers too. Bonded and insured. Free on-site quotes; no prices are published.

## Services
${list(SERVICES.map((s) => ({ name: s.title, url: `${d}/services/${s.slug}` })))}

## Service Areas
### Santa Clarita Valley
${list(SCV_CITIES.map((c) => ({ name: c.name, url: `${d}/areas/${c.slug}` })))}
### Antelope Valley
${list(AV_CITIES.map((c) => ({ name: c.name, url: `${d}/areas/${c.slug}` })))}

## Brands Serviced
${list(BRANDS.map((b) => ({ name: b.name, url: `${d}/brands/${b.slug}` })))}
- [Gate operator model lookup](${d}/gate-operator-models)

## Contact
- Phone and text: ${BUSINESS.phone}
- Hours: ${BUSINESS.hours}
- Website: ${d}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
