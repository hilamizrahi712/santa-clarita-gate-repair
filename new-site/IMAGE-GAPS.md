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
- Filenames name a city per the upgrade prompt's naming pattern; the photos are not verified to be
  from those cities.

## Brand logos

- **Viking, Ramset:** source `* tp.jpeg` files are black artwork on a black background, so they are
  unusable. They are left out of the brands strip.
- **Eagle:** no `eagle tp.jpeg`; `eagle logo.jpeg` has a fake checkerboard "transparent" background
  baked in. Left out.
- **Chamberlain:** dark navy on black. Low contrast on the dark theme; a light or white version
  would be better.
- Logos are trimmed but keep their black JPEG background (no transparency in the sources).

Needed from Hila: garage door job photos, a team or truck photo, and usable Viking/Ramset/Eagle logos.
