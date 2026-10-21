/* Duplicate-content check against REAL (see UPGRADE-PROMPT.md).
 * Compares visible text in this site's out/**\/*.html with REAL's out/**\/*.html and flags:
 *   - any sentence of 8+ words that appears on both sites
 *   - any paragraph whose 5-word shingles overlap REAL's by more than 40%
 * Exits 1 if anything is flagged.
 *
 * usage (from new-site/, after `npm run build`):
 *   node scripts/dup-check.mjs [path/to/REAL]          default: ../../real-gate-garage-door
 * REAL's existing out/ is used if present; otherwise REAL is copied to a temp folder and built
 * there (never inside REAL). Pass --rebuild-real to force a fresh build of REAL's current code.
 */
import { readFileSync, readdirSync, existsSync, cpSync, mkdtempSync } from "node:fs";
import { join, relative, resolve, basename } from "node:path";
import { tmpdir } from "node:os";
import { execSync } from "node:child_process";
import assert from "node:assert/strict";

const args = process.argv.slice(2);
const REAL = resolve(args.find((a) => !a.startsWith("--")) ?? "../../real-gate-garage-door");
const OURS = resolve("out");

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((d) => d.isFile() && d.name.endsWith(".html"))
    .map((d) => join(d.parentPath, d.name));
}

// Visible body text, one string per block-level element.
export function paragraphs(html) {
  const body = html.replace(/[\s\S]*?<body[^>]*>/i, "");
  return body
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/?(p|li|h[1-6]|div|section|article|header|footer|nav|td|th|dt|dd|blockquote|summary|br|tr|ul|ol|main|aside|figcaption|button|a)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .split("\n").map((s) => s.replace(/\s+/g, " ").trim()).filter(Boolean);
}

const words = (s) => s.toLowerCase().replace(/[’']/g, "'").match(/[a-z0-9']+/g) ?? [];
export const sentences = (p) => p.split(/(?<=[.!?])\s+/).filter((s) => words(s).length >= 8);
export function shingles(p) {
  const w = words(p);
  const out = new Set();
  for (let i = 0; i + 5 <= w.length; i++) out.add(w.slice(i, i + 5).join(" "));
  return out;
}

// Self-check of the text helpers.
assert.deepEqual(
  paragraphs("<head><title>x</title></head><body><p>Hello <b>big</b> world.</p><script>var a=1</script><li>Two</li></body>"),
  ["Hello big world.", "Two"],
);
assert.equal(sentences("Short one. This sentence right here has at least eight words in it.").length, 1);
assert.equal(shingles("a b c d e f").size, 2);

function realOut() {
  if (!args.includes("--rebuild-real") && existsSync(join(REAL, "out"))) return join(REAL, "out");
  const tmp = mkdtempSync(join(tmpdir(), "real-build-"));
  const skip = new Set([".git", "node_modules", ".next", "out"]);
  cpSync(REAL, tmp, { recursive: true, filter: (src) => !skip.has(basename(src)) });
  console.log(`building REAL in ${tmp} ...`);
  execSync("npm ci && npx next build", { cwd: tmp, stdio: "inherit" });
  return join(tmp, "out");
}

if (!existsSync(OURS)) { console.error("no out/ here: run `npm run build` first"); process.exit(2); }
const REAL_OUT = realOut();

const realSentences = new Set();
const realShingles = new Set();
for (const f of htmlFiles(REAL_OUT)) {
  for (const p of paragraphs(readFileSync(f, "utf8"))) {
    for (const s of sentences(p)) realSentences.add(words(s).join(" "));
    for (const sh of shingles(p)) realShingles.add(sh);
  }
}

const flaggedSentences = new Map(); // normalized sentence -> { text, files }
const flaggedParas = new Map();
for (const f of htmlFiles(OURS)) {
  const page = relative(OURS, f);
  for (const p of paragraphs(readFileSync(f, "utf8"))) {
    for (const s of sentences(p)) {
      const key = words(s).join(" ");
      if (!realSentences.has(key)) continue;
      if (!flaggedSentences.has(key)) flaggedSentences.set(key, { text: s, files: [] });
      flaggedSentences.get(key).files.push(page);
    }
    const sh = shingles(p);
    if (sh.size < 3) continue; // under 7 words: too short to judge
    let hit = 0;
    for (const x of sh) if (realShingles.has(x)) hit++;
    const ratio = hit / sh.size;
    if (ratio > 0.4) {
      if (!flaggedParas.has(p)) flaggedParas.set(p, { ratio, files: [] });
      flaggedParas.get(p).files.push(page);
    }
  }
}

const where = (files) => files.slice(0, 3).join(", ") + (files.length > 3 ? ` (+${files.length - 3} more)` : "");
console.log(`REAL: ${REAL_OUT}\nours: ${OURS}\n`);
console.log(`=== sentences (8+ words) also on REAL: ${flaggedSentences.size}`);
for (const { text, files } of flaggedSentences.values()) console.log(`- "${text}"\n    in ${where(files)}`);
console.log(`\n=== paragraphs with >40% 5-word shingle overlap: ${flaggedParas.size}`);
for (const [p, { ratio, files }] of flaggedParas) console.log(`- ${Math.round(ratio * 100)}%  "${p.slice(0, 160)}${p.length > 160 ? "…" : ""}"\n    in ${where(files)}`);

process.exit(flaggedSentences.size || flaggedParas.size ? 1 : 0);
