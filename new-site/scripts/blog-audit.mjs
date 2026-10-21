/* throwaway: verify lib/blog-data.ts against the no-DIY rule, word counts, and post count */
import { readFileSync } from "node:fs";

const src = readFileSync("lib/blog-data.ts", "utf8").replace(/\r\n/g, "\n");

// crude but effective: extract each post object's slug + content string
const postBlocks = [...src.matchAll(/slug: "([^"]+)",[\s\S]*?content: `([\s\S]*?)`,\n {2}\}/g)];

console.log(`posts found: ${postBlocks.length}\n`);

const FORBIDDEN = [
  [/\bunplug\b|\bdisconnect the (opener|operator)\b|\bmanual release\b|\brelease cord\b|\bemergency release\b|\bpull the (red )?cord\b|\bdisengage\b|\bbypass\b/i, "manual release / disengage / bypass"],
  [/\breset the (breaker|opener|board|limit)\b|\bre-?learn\b|\bre-?program (the|your) remote\b|\badjustment screw\b|\blimit switch adjustment\b|\bconsult your (opener )?manual\b/i, "reset/re-learn/adjustment procedure"],
  [/\blubricat|\bwhite lithium\|b\bsocket wrench\b|\btighten (the|all|every)\b|\btension test\b|\bwinding tools?\b/i, "lubrication/tightening/tension instruction"],
  [/\bstep \d[:.]|\bstep-by-step\b/i, "numbered step-by-step procedure"],
  [/\btry this first\b|\btry these first\b|safe to (check|try) right now/i, "'try this first' framing"],
  [/youtube|manufacturer'?s? manual|repair video/i, "link/reference to manuals or repair videos"],
];

let flagged = 0;
for (const [whole, slug, content] of postBlocks) {
  const words = content.trim().split(/\s+/).length;
  const hasDollar = /\$[0-9]/.test(content);
  const hasDisclaimer = /pricingDisclaimer:/.test(whole);
  const dollarNote = hasDollar ? (hasDisclaimer ? " [$ + disclaimer OK]" : " [$ WITHOUT DISCLAIMER!]") : "";
  console.log(`${slug.padEnd(40)} ${words} words${dollarNote}`);
  for (const [re, label] of FORBIDDEN) {
    const m = content.match(re);
    if (m) {
      flagged++;
      console.log(`   FLAG (${label}): "...${content.slice(Math.max(0, m.index - 40), m.index + 60)}..."`);
    }
  }
}
console.log(flagged ? `\n${flagged} forbidden-pattern hits` : "\nno forbidden patterns found");
