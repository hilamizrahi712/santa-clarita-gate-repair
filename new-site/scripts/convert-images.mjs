// Converts this site's own photos (SITE-BRIEF.md "Photos") to WebP in public/images/.
// sharp drops EXIF/GPS by default (no withMetadata call). Run: node scripts/convert-images.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "../my images scv/";
const PHOTOS = {
  "black and wood outside.jpeg": "wood-steel-sliding-gate-valencia",
  "black frame woodn gate motor.jpeg": "wood-slat-slide-gate-operator-saugus",
  "black iron gate.jpeg": "black-steel-slide-gate-stevenson-ranch",
  "bronze gate.jpeg": "bronze-slat-slide-gate-canyon-country",
  "commercial gate.jpeg": "commercial-iron-slide-gate-santa-clarita",
  "iron gate 1.jpeg": "hillside-slat-slide-gate-agua-dulce",
  "iron gold gate.jpeg": "ornate-iron-swing-gate-castaic",
};
// Viking and Ramset sources are black art on black, unusable (see IMAGE-GAPS.md).
const LOGOS = {
  "allomatic tp.jpeg": "all-o-matic",
  "chamberlin tp.jpeg": "chamberlain",
  "doorbird tp.jpeg": "doorbird",
  "doorking tp.jpeg": "doorking",
  "elite tp.jpeg": "elite",
  "genie tp.jpeg": "genie",
  "lift master tp.jpeg": "liftmaster",
  "linear tp.jpeg": "linear",
};

mkdirSync("public/images/photos", { recursive: true });
mkdirSync("public/images/logos", { recursive: true });
mkdirSync("public/images/og", { recursive: true });

for (const [src, name] of Object.entries(PHOTOS)) {
  await sharp(SRC + src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 })
    .toFile(`public/images/photos/${name}.webp`);
}
// Logo files are wide padded canvases on a flat background; trim to the mark itself.
for (const [src, name] of Object.entries(LOGOS)) {
  await sharp(SRC + src).trim({ threshold: 30 }).resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 85 }).toFile(`public/images/logos/${name}.webp`);
}
await sharp(SRC + "bronze gate.jpeg").resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80 })
  .toFile("public/images/og/og-default.jpg");
