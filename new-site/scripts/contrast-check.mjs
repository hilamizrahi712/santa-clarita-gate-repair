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
  navy: "#0e3321", green: "#1a5c3a", greenHover: "#217048", burgundy: "#8B2235", sage: "#4db87a",
  heading: "#d8ead0", mid: "#c2d6c8", soft: "#9fb5a8", stone: "#8ca496", stoneLight: "#7f988a",
  rose: "#d95070", white: "#ffffff", error: "#f87171", nearBlack: "#1a1a1a",
};
const ink = hex(C.heading);

// [label, foreground, background, large?]  foreground may be [hex, alpha] for translucent cream text.
const darkBgs = ["base", "deep", "muted", "card"];
const pairs = [
  ...darkBgs.flatMap((bg) => ["heading", "mid", "soft", "stone", "stoneLight", "rose", "sage", "error"].map((fg) => [`${fg} on ${bg}`, C[fg], C[bg]])),
  ...["heading", "mid", "soft", "stone", "sage", "error"].map((fg) => [`${fg} on navy`, C[fg], C.navy]),
  ["rose h2 em on navy (large)", C.rose, C.navy, true],
  ["white on green (btn-primary)", C.white, C.green],
  ["white on green hover", C.white, C.greenHover],
  ["white on burgundy (emergency bar, submit, sticky)", C.white, C.burgundy],
  ["heading on burgundy (footer CTA)", C.heading, C.burgundy],
  ["deep on sage (btn-gold)", C.deep, C.sage],
  ["#1a1a1a on sage (city trust bar)", C.nearBlack, C.sage],
  ["heading on navy (form, blocks)", C.heading, C.navy],
  ["footer cta-sub 0.92 on burgundy", [C.heading, 0.92], C.burgundy],
  ...[0.6, 0.65, 0.7, 0.72, 0.75].flatMap((a) => [
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
