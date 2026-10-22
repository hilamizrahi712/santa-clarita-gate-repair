// next/image loader for the static export: photos have pre-built 640 / 1024 / 1600 widths
// (scripts/convert-images.mjs). Anything else (logos, og) is served as-is.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/images/photos/")) return src;
  if (width >= 1600) return src;
  return src.replace(/\.webp$/, `-${width <= 640 ? 640 : 1024}.webp`);
}
