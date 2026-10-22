# Image gaps

All images come from this site's own `my images scv/` folder (`assets/gallery/` holds byte-identical
copies of the same 7 photos). Slots are mapped in `lib/images.ts`; regenerate files with
`node scripts/convert-images.mjs`.

## Photos

Only 7 usable photos, all gates. Each is reused across several slots.

- **Garage doors: no photos at all.** All 8 garage door service pages (and the garage door cards on
  city pages) reuse gate photos that show a garage door in the background (bronze slat gate,
  wood-and-steel gate). Real garage door photos (spring, opener, panel, cable jobs) are needed.
- **Brand pages:** no photos of specific operators except the commercial photo (LiftMaster
  operator). Every other brand page shows a generic gate photo.
- **About page:** reuses the commercial gate photo with a technician; no team photo.
- **City pages:** 7 heroes rotate across 20 cities, so cities share photos.
- Photo filenames describe the gate only (no city names); the photos are not tied to a specific city.

## Brand logos

All 11 brand logos are REAL's `public/images/brands/logo-1..11.webp` files, copied under slug names
into `public/images/logos/` (Hila's decision, FIX-LIST.md group 2). They sit on white tiles.

Needed from Hila: garage door job photos and a team or truck photo.
