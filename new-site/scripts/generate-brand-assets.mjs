/*
 * Regenerates the site's brand assets from the source logo + hero photo.
 * Run from the repo root:  node scripts/generate-brand-assets.mjs
 *
 * Produces:
 *   app/icon.png       512x512  (Next.js App Router icon)
 *   app/apple-icon.png 180x180  (apple-touch-icon)
 *   app/favicon.ico    32x32    (PNG payload wrapped in an ICO container)
 *   public/images/og/og-default.jpg  1200x630 JPEG q82, < 200KB
 *
 * Note on background: the source logo is navy + copper text on white. Navy text
 * on a navy background is invisible, so the icons keep a white background and the
 * OG image sets the logo on a white rounded card. sharp has no text API — the OG
 * text is an SVG string passed through .composite().
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync, statSync } from "node:fs";

const LOGO = "public/images/logos/logo-name-white-square.webp";
const HERO = "public/images/hero/hero-thin-gate.webp";
const NAVY = "#0C1E35"; // rgb(12,30,53) — matches the site hero scrim

/** Wrap a 32x32 PNG in a single-image ICO container (PNG-in-ICO, Vista+). */
function pngToIco(png, size) {
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(1, 2); // type: icon
  dir.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset (6 + 16)
  return Buffer.concat([dir, entry, png]);
}

async function icons() {
  await sharp(LOGO)
    .resize(512, 512, { fit: "cover" })
    .flatten({ background: "#ffffff" })
    .png()
    .toFile("app/icon.png");

  await sharp(LOGO)
    .resize(180, 180, { fit: "cover" })
    .flatten({ background: "#ffffff" }) // iOS ignores alpha; white keeps navy text legible
    .png()
    .toFile("app/apple-icon.png");

  const fav = await sharp(LOGO)
    .resize(32, 32, { fit: "cover" })
    .flatten({ background: "#ffffff" })
    .ensureAlpha() // Next.js/Turbopack ICO decoder rejects non-RGBA PNG payloads
    .png()
    .toBuffer();
  writeFileSync("app/favicon.ico", pngToIco(fav, 32));
}

async function og() {
  const W = 1200;
  const H = 630;

  const bg = await sharp(HERO).resize(W, H, { fit: "cover", position: "attention" }).toBuffer();
  const logo = await sharp(LOGO).resize(236, 236, { fit: "cover" }).png().toBuffer();

  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" fill="rgba(12,30,53,0.78)"/>
      <rect x="56" y="177" width="276" height="276" rx="28" fill="#FFFFFF"/>
      <text x="360" y="300" font-family="Segoe UI, Arial, Helvetica, sans-serif"
            font-size="60" font-weight="700" fill="#EDEAE4">Gate &amp; Garage Door Repair</text>
      <rect x="362" y="330" width="96" height="6" rx="3" fill="#C9A84C"/>
      <text x="360" y="392" font-family="Segoe UI, Arial, Helvetica, sans-serif"
            font-size="34" font-weight="600" fill="#C9A84C">Los Angeles, CA  ·  (818) 915-5715</text>
    </svg>`
  );

  const out = await sharp(bg)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logo, top: 197, left: 76 },
    ])
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer();

  mkdirSync("public/images/og", { recursive: true });
  writeFileSync("public/images/og/og-default.jpg", out);
  if (out.length > 200 * 1024) throw new Error(`og-default.jpg is ${out.length} bytes, over the 200KB budget`);
}

const meta = async (p) => {
  const { width, height, format } = await sharp(p).metadata();
  return `${p}  ${width}x${height} ${format}  ${(statSync(p).size / 1024).toFixed(1)} KB`;
};

await icons();
await og();
console.log(await meta("app/icon.png"));
console.log(await meta("app/apple-icon.png"));
console.log(`app/favicon.ico  32x32 ico  ${(statSync("app/favicon.ico").size / 1024).toFixed(1)} KB`);
console.log(await meta("public/images/og/og-default.jpg"));
