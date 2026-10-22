/* WCAG AA contrast check for the text/background pairs the design uses (Phase 2).
 * usage: node scripts/contrast-check.mjs     exits 1 if any pair fails.
 * Normal text needs 4.5:1, large text (headings, 24px+ or 18.66px+ bold) needs 3:1.
 * Translucent colors are blended over their background first. Keep in sync with app/globals.css. */
import assert from "node:assert/strict";

const hex = (h) => h.replace("#", "").match(/\w\w/g).map((x) => parseInt(x, 16));
const blend = ([r, g, b], a, bg) => [r, g, b].map((c, i) => c * a + bg[i] * (1 - a));
const lum = (rgb) => {
  const [r, g, b] = rgb.map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (fg, bg) => {
  const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};
assert.equal(ratio(hex("#000000"), hex("#ffffff")).toFixed(0), "21");

const C = {
  base: "#080d0a", deep: "#050805", muted: "#0d1610", card: "#101a13",
  navy: "#15191b", navyMid: "#262c2f", red: "#C8102E", redHover: "#a50d26", redText: "#FF5A5A",
  heading: "#eef1ef", mid: "#cad0cd", soft: "#a7afab", stone: "#959d99", stoneLight: "#8a928e",
  white: "#ffffff", error: "#f87171", ink: "#111111",
};
const ink = hex(C.heading);

// [label, foreground, background, large?]  foreground may be [hex, alpha] for translucent cream text.
const darkBgs = ["base", "deep", "muted", "card", "navy"];
const pairs = [
  ...darkBgs.flatMap((bg) => ["heading", "mid", "soft", "stone", "stoneLight", "redText", "error"].map((fg) => [`${fg} on ${bg}`, C[fg], C[bg]])),
  ["white on red (btn-primary, top bar, submit, sticky, trust bar)", C.white, C.red],
  ["white on red hover", C.white, C.redHover],
  ["white on navyMid (sticky CTA border cells)", C.white, C.navy],
  ["ink on white (logo tiles fallback text)", C.ink, C.white],
  ["red on white (brand name hover)", C.red, C.white],
  ...[0.6, 0.65, 0.7, 0.72, 0.75, 0.78, 0.92].flatMap((a) => [
    [`cream ${a} on deep (footer)`, [C.heading, a], C.deep],
    [`cream ${a} on navy`, [C.heading, a], C.navy],
  ]),
];

let failed = 0;
for (const [label, fg, bgHex, large] of pairs) {
  const bg = hex(bgHex);
  const f = Array.isArray(fg) ? blend(ink, fg[1], bg) : hex(fg);
  const r = ratio(f, bg);
  const need = large ? 3 : 4.5;
  const ok = r >= need;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${r.toFixed(2).padStart(5)}:1 (need ${need})  ${label}`);
}
console.log(failed ? `\n${failed} pair(s) fail AA` : "\nall pairs pass AA");
process.exit(failed ? 1 : 0);
