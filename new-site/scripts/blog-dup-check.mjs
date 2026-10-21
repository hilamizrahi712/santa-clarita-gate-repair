/* throwaway: repeated headings / FAQ q / FAQ a across all blog posts (rule 6) */
import { readFileSync } from "node:fs";
const src = readFileSync("lib/blog-data.ts", "utf8").replace(/\r\n/g, "\n");

const heads = [...src.matchAll(/^#{2,3} (.+)$/gm)].map((m) => m[1].trim());
const hcount = new Map();
for (const h of heads) hcount.set(h, (hcount.get(h) || 0) + 1);
console.log("=== repeated headings ===");
for (const [h, c] of hcount) if (c > 1) console.log(`x${c}  ${h}`);

const qa = [...src.matchAll(/\{ q: "((?:[^"\\]|\\.)*)", a: "((?:[^"\\]|\\.)*)" \}/g)];
const qcount = new Map();
const acount = new Map();
for (const [, q, a] of qa) {
  qcount.set(q, (qcount.get(q) || 0) + 1);
  acount.set(a, (acount.get(a) || 0) + 1);
}
console.log("=== repeated FAQ questions ===");
for (const [q, c] of qcount) if (c > 1) console.log(`x${c}  ${q}`);
console.log("=== repeated FAQ answers ===");
for (const [a, c] of acount) if (c > 1) console.log(`x${c}  ${a.slice(0, 90)}`);
console.log(`total FAQ pairs: ${qa.length}`);
