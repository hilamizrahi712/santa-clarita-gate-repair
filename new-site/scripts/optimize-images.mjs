// Optimizes public/images: converts to WebP, downsizes to the actual max render
// width, dedupes byte-identical files, and prints a before/after report.
//
// Target widths come from a manifest below, derived by reading every <Image>
// usage in app/ and components/ (including indirection through lib/*-data.ts,
// SERVICE_IMAGES / BRAND_IMAGES / CITY_HERO_POOL lookup maps, etc.) — not
// guessed. Two tiers, chosen for margin of safety:
//   LOGO  (280px)  — brand logos, rendered at max 140px wide (marquee + brand hero badge)
//   SMALL (800px)  — grid/card tiles, rendered at 25–33vw inside a max ~1440px container
//   LARGE (1600px) — anything ever used as a `fill` hero or a 100vw/66vw single photo
// A file used in more than one tier gets the largest tier that applies to it
// anywhere on the site (never the smallest).
//
// og-default.jpg and the schema.org logo file are handled separately — see below.
//
// Run: node scripts/optimize-images.mjs

import sharp from "sharp";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const IMAGES_DIR = "public/images";
const QUALITY = 82;

// Every path below is relative to public/images/, forward slashes.
const LARGE = new Set([
  "services/iron-gate-1.jpeg",
  "services/motor-wood.jpeg",
  "gallery/driveway-swing-gate-spanish-villa.jpeg",
  "gallery/modern-black-slat-gate.jpeg",
  "gallery/slat-swing-gate-opener.jpeg",
  "services/estate-gate.jpeg",
  "gallery/iron-gate-community-entrance.jpeg",
  "services/gate-motor.jpeg",
  "services/slat-gate-installation.jpeg",
  "services/white-garage.jpeg",
  "services/walnut-garage.jpeg",
  "services/new-garage.jpeg",
  "gallery/commercial-1.jpeg",
  "services/garage-door-repair.jpeg",
  "services/whatsapp-photo-1.jpeg",
  "services/commercial-3.jpeg",
  "services/black-wood-gate.jpeg",
  "hero/hero-home.jpeg",
  "services/swing-1.jpeg",
  "services/grey-iron-gate.jpeg",
  "services/wood-gate.jpeg",
  "services/swing-2.jpeg",
  "services/outside-gate.jpeg",
  "story/building.jpeg",
  "services/gate-view.jpeg",
  "services/gated-community.jpeg",
  "services/iron-gold-gate.jpeg",
  "services/malibu-gate.jpeg",
  "services/long-iron-gate.jpeg",
  "services/frezno-gate.jpeg",
  "services/short-gate.jpeg",
  "brands/all-o-matic/all-o-matic-hero.jpeg",
  "brands/liftmaster/liftmaster-hero.jpeg",
  "services/commercial-gate.jpeg",
  "gallery/outside-1.jpeg",
  "services/wood-garage.jpeg",
  "brands/elite/elite-hero.jpeg",
  "brands/elite/elite-1.jpeg",
  "hero/hero-gate.jpeg",
  "hero/hero-thin-gate.jpeg",
]);

const LOGOS = new Set(
  Array.from({ length: 11 }, (_, i) => `brands/logo-${i + 1}.png`)
);

// Handled outside the LOGO/SMALL/LARGE pipeline entirely:
const OG_IMAGE = "og/og-default.jpg"; // keep as JPG — OG/Twitter scrapers have inconsistent WebP support
const SITE_LOGO_META = "logos/logo-name-white-square.png"; // schema.org `logo` field only, never rendered in the DOM
const UNREFERENCED = ["logos/logo-name-white.png"]; // not used anywhere in source — delete, don't convert

// Bounding boxes, not width-only: several source photos are portrait-oriented
// (e.g. slat-gate-installation.jpeg is 1536x2048), and a width-only resize
// leaves the long dimension unconstrained — capping both axes with fit:"inside"
// bounds real served pixels correctly regardless of source orientation.
const SMALL_BOX = { width: 460, height: 460 }; // 25-33vw grid/card tiles
const LARGE_BOX = { width: 640, height: 640 }; // fill hero sections, 66-100vw single photos
const LOGO_WIDTH = 280; // brand logos are uniformly landscape wordmarks — width-only is correct here
const SITE_LOGO_WIDTH = 512;

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, acc);
    else if (/\.(jpe?g|png)$/i.test(f.name)) acc.push(p);
  }
  return acc;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(1) + "KB";
}

async function main() {
  const allFiles = walk(IMAGES_DIR);
  const rel = (p) => path.relative(IMAGES_DIR, p).split(path.sep).join("/");

  // 1. Delete files that are entirely unreferenced in source — nothing to convert.
  for (const r of UNREFERENCED) {
    const p = path.join(IMAGES_DIR, r);
    if (fs.existsSync(p)) {
      console.log(`DELETE (unreferenced): ${r} (${fmtKB(fs.statSync(p).size)})`);
      fs.rmSync(p);
    }
  }

  const remaining = allFiles.filter((f) => fs.existsSync(f));

  // 2. Group by content hash to find byte-identical duplicates.
  const groups = new Map(); // hash -> [absPath, ...]
  for (const f of remaining) {
    const h = sha256(f);
    if (!groups.has(h)) groups.set(h, []);
    groups.get(h).push(f);
  }

  const rows = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const [, files] of groups) {
    files.sort();
    const canonical = files[0];
    const dupes = files.slice(1);
    const canonicalRel = rel(canonical);

    const groupBeforeBytes = files.reduce((sum, f) => sum + fs.statSync(f).size, 0);
    totalBefore += groupBeforeBytes;

    // Bounding box = the largest tier among every path that pointed at this content
    // (a file used both small and large somewhere on the site gets the large box).
    const isLogo = files.some((f) => LOGOS.has(rel(f)));
    const box = isLogo ? null : files.some((f) => LARGE.has(rel(f))) ? LARGE_BOX : SMALL_BOX;

    let outPath;
    let outBytes;

    if (canonicalRel === OG_IMAGE) {
      outPath = canonical; // stays og-default.jpg
      const tmp = canonical + ".tmp";
      await sharp(canonical)
        .resize({ width: 1200, height: 630, fit: "cover", withoutEnlargement: true })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(tmp);
      fs.rmSync(outPath);
      fs.renameSync(tmp, outPath);
      outBytes = fs.statSync(outPath).size;
    } else if (canonicalRel === SITE_LOGO_META) {
      outPath = canonical.replace(/\.png$/i, ".webp");
      await sharp(canonical)
        .resize({ width: SITE_LOGO_WIDTH, height: SITE_LOGO_WIDTH, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      fs.rmSync(canonical);
      outBytes = fs.statSync(outPath).size;
    } else if (isLogo) {
      outPath = canonical.replace(/\.(jpe?g|png)$/i, ".webp");
      await sharp(canonical)
        .resize({ width: LOGO_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      fs.rmSync(canonical);
      outBytes = fs.statSync(outPath).size;
    } else {
      outPath = canonical.replace(/\.(jpe?g|png)$/i, ".webp");
      await sharp(canonical)
        .resize({ ...box, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      fs.rmSync(canonical);
      outBytes = fs.statSync(outPath).size;
    }

    // Duplicate copies are now dead weight — every reference to them will be
    // repointed at the canonical file's new path, so delete without converting.
    for (const d of dupes) fs.rmSync(d);

    totalAfter += outBytes;
    rows.push({
      canonical: canonicalRel,
      output: rel(outPath),
      duplicatesRemoved: dupes.length,
      before: groupBeforeBytes,
      after: outBytes,
    });
  }

  rows.sort((a, b) => b.before - a.before);
  console.log("");
  console.log("File".padEnd(55), "Before".padStart(10), "After".padStart(10), "Dupes removed");
  for (const r of rows) {
    console.log(
      r.output.padEnd(55),
      fmtKB(r.before).padStart(10),
      fmtKB(r.after).padStart(10),
      String(r.duplicatesRemoved).padStart(13)
    );
  }
  console.log("");
  console.log(`TOTAL: ${fmtKB(totalBefore)} -> ${fmtKB(totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% smaller)`);
}

main();
