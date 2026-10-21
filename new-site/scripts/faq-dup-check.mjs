/* throwaway: measure templated duplication in lib/cities-data.ts
   usage: node scripts/faq-dup-check.mjs [--list] */
import { readFileSync } from "node:fs";

const FILE = process.argv.find((a) => a.endsWith(".ts")) || "lib/cities-data.ts";
const src = readFileSync(FILE, "utf8").replace(/\r\n/g, "\n");

const names = [...src.matchAll(/^ {4}name: "([^"]+)",$/gm)].map((m) => m[1]);
const uniqNames = [...new Set(names)];
if (uniqNames.length < 50) throw new Error(`only found ${uniqNames.length} city names`);

const cityTokens = [];
for (const n of uniqNames) {
  cityTokens.push(n);
  cityTokens.push(n + "'s");
  cityTokens.push(n.replace(/ /g, "-").toLowerCase());
}
cityTokens.sort((a, b) => b.length - a.length);

function normalize(s) {
  let out = s;
  for (const t of cityTokens) out = out.split(t).join("{CITY}");
  return out.replace(/\s+/g, " ").trim();
}

function tally(label, strings, listFlag) {
  const counts = new Map();
  for (const s of strings) {
    const k = normalize(s);
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const repeated = [...counts.entries()].filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]);
  const instances = repeated.reduce((n, [, c]) => n + c, 0);
  console.log(
    `${label}: ${strings.length} strings | ${counts.size} unique | ${repeated.length} distinct templated strings | ${instances} templated instances`
  );
  if (listFlag) for (const [k, c] of repeated) console.log(`  x${c}  ${k.slice(0, 130)}`);
  return repeated.length;
}

const qa = [...src.matchAll(/\b[qa]:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1].replace(/\\"/g, '"'));
const hero = [...src.matchAll(/^ {4}heroSubtitle: "((?:[^"\\]|\\.)*)",$/gm)].map((m) => m[1].replace(/\\"/g, '"'));
const why = [...src.matchAll(/desc: "((?:[^"\\]|\\.)*)" \}/g)].map((m) => m[1].replace(/\\"/g, '"'));

const list = process.argv.includes("--list");
console.log(`cities: ${uniqNames.length}\n`);
tally("FAQ q/a", qa, list);
tally("heroSubtitle", hero, list);
tally("whyUs desc", why, list);
