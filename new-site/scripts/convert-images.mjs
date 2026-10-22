// Converts this site's own photos (SITE-BRIEF.md "Photos") to WebP in public/images/.
// sharp drops EXIF/GPS by default (no withMetadata call). Run: node scripts/convert-images.mjs
// Each photo gets 640 / 1024 / 1600 widths (name-640.webp, name-1024.webp, name.webp = 1600) for
// srcset (lib/image-loader.ts), each compressed to under MAX_BYTES.
// Brand logos are REAL's files copied by slug (IMAGE-GAPS.md), not generated here.
import sharp from "sharp";
import assert from "node:assert/strict";
import { mkdirSync, statSync } from "node:fs";

const SRC = "../my images scv/";
const PHOTOS = {
  "black and wood outside.jpeg": "wood-steel-sliding-gate",
  "black frame woodn gate motor.jpeg": "wood-slat-slide-gate-operator",
  "black iron gate.jpeg": "black-steel-slide-gate",
  "bronze gate.jpeg": "bronze-slat-slide-gate",
  "commercial gate.jpeg": "commercial-iron-slide-gate",
  "iron gate 1.jpeg": "hillside-slat-slide-gate",
  "iron gold gate.jpeg": "ornate-iron-swing-gate",
};
// Keep in sync with lib/image-loader.ts and next.config.ts deviceSizes.
const WIDTHS = [640, 1024, 1600];
const MAX_BYTES = 150 * 1024;

mkdirSync("public/images/photos", { recursive: true });
mkdirSync("public/images/og", { recursive: true });

for (const [src, name] of Object.entries(PHOTOS)) {
  for (const w of WIDTHS) {
    const out = `public/images/photos/${name}${w === 1600 ? "" : `-${w}`}.webp`;
    // Step quality down until the file fits the budget.
    for (let q = 78; ; q -= 6) {
      await sharp(SRC + src).resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toFile(out);
      if (statSync(out).size < MAX_BYTES) break;
      assert(q > 40, `${out} still over budget at quality ${q}`);
    }
    console.log(out, Math.round(statSync(out).size / 1024) + "KB");
  }
}
await sharp(SRC + "bronze gate.jpeg").resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80 })
  .toFile("public/images/og/og-default.jpg");
