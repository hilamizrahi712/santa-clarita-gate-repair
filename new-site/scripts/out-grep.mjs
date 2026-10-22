/* Phase 7 forbidden-string check over the built site (see UPGRADE-PROMPT.md).
 * Scans out/**\/*.html plus out/**\/*.txt|xml (llms.txt, robots.txt, sitemaps); skips Next.js RSC
 * payload .txt files (they start with "<n>:" and repeat the HTML).
 * usage (from new-site/, after `npm run build`): node scripts/out-grep.mjs
 * Exits 1 on any hit.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import assert from "node:assert/strict";

const OUT = "out";
const ours = readFileSync("lib/constants.ts", "utf8");
const realConstants = readFileSync("../../real-gate-garage-door/lib/constants.ts", "utf8");
const cityNames = (src) => [...src.matchAll(/name: "([^"]+)", slug:/g)].map((m) => m[1]);
const ourCities = new Set(cityNames(ours));
const foreignCities = cityNames(realConstants).filter((c) => !ourCities.has(c));

// Next.js inline script data (self.__next_f.push ...) carries hashes/ids like "$1", "$L2"; JSON-LD is kept.
export const stripNextScripts = (html) => html.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, " ");
// The brief marks only the business email as pending.
export const allowedTodo = (line) => /email/i.test(line);

assert.equal(stripNextScripts('<script>self.__next_f.push([1,"$1a"])</script><script type="application/ld+json">{"p":"$9"}</script>'), ' <script type="application/ld+json">{"p":"$9"}</script>');
assert.ok(allowedTodo('email: "", // TODO(pending): business email'));
assert.ok(!allowedTodo("TODO(content)"));

const CHECKS = [
  { label: "$ + digit", re: /\$\d/, strip: true },
  { label: "BFT", re: /\bBFT\b/ },
  { label: "review", re: /review/i },
  { label: "testimonial", re: /testimonial/i },
  { label: "Real Gate", re: /Real Gate/i },
  { label: "realgaterepair", re: /realgaterepair/i },
  { label: "REAL phone", re: /915[-. ]?5715/ },
  { label: "old placeholder phone", re: /555[-. ]?0123/ },
  { label: "TODO", re: /TODO/, allow: allowedTodo },
  { label: "city not in brief", re: new RegExp(`\\b(${foreignCities.join("|")})\\b`) },
];

const files = readdirSync(OUT, { withFileTypes: true, recursive: true })
  .filter((d) => d.isFile())
  .map((d) => join(d.parentPath, d.name))
  .filter((f) => f.endsWith(".html") || (/\.(txt|xml)$/.test(f) && !/^\d+:/.test(readFileSync(f, "utf8"))));

let hits = 0;
for (const f of files) {
  const raw = readFileSync(f, "utf8");
  const stripped = stripNextScripts(raw);
  for (const { label, re, strip, allow } of CHECKS) {
    const lines = (strip ? stripped : raw).split(/\n|(?<=>)/);
    for (const line of lines) {
      const m = line.match(re);
      if (!m || allow?.(line)) continue;
      hits++;
      console.log(`${label.padEnd(22)} ${relative(OUT, f)}: …${line.slice(Math.max(0, m.index - 50), m.index + 50)}…`);
    }
  }
}
console.log(`\n${files.length} files scanned, ${hits} hits`);
process.exit(hits ? 1 : 0);
