# SITE BRIEF: Santa Clarita Gate Repair

Read together with `UPGRADE-PROMPT.md`. This site is LIVE and already has Google Analytics and
Search Console history. Do not change anything in the old static files on `main`. Work only on the
upgrade branch.

## Business

| Field | Value |
|---|---|
| Name (exact) | **Santa Clarita Gate Repair** |
| Short name (mobile header) | SCV Gate Repair |
| Region | Santa Clarita Valley and Antelope Valley |
| Phone | **(661) 519-1599** / `tel:+16615191599` / `sms:+16615191599` |
| Domain | `https://santaclaritagaterepair.com` (current live domain, keep it) |
| Email | `TODO(pending)` (e.g. office@santaclaritagaterepair.com) |
| Hours | Sun to Fri 7AM to 10PM, closed Saturdays for routine appointments, 24/7 emergency dispatch |
| Formspree | `https://formspree.io/f/mdavyrrl` (this site's existing form) |
| GA4 | **keep existing ID `G-RR82654PGL`** (property already has history and conversion events) |
| Street address | none (service area business) |

## Positioning

Newer master-planned communities (Valencia, Stevenson Ranch), HOA gates, hillside and canyon homes,
horse properties and ranches in Agua Dulce and Acton, high desert heat and wind in Palmdale and
Lancaster that wear out operators and springs. Tone: local, fast, practical.

## Design

Keep this site's existing identity:

- Background `#080d0a`, deep `#050805`, raised `#0d1610`, card `#101a13`,
  bottle green `#1a5c3a`, sage text green `#4db87a`, deep green `#0e3321`,
  burgundy `#8B2235`, light burgundy text `#d95070`.
- Fonts: keep the current site's fonts (read them from `css/styles.css`).
- Logo: use the existing logo if one exists in `assets/`; otherwise a plain text wordmark. No invented logos.
- **Layout variant C:** split hero (text + phone number very large on the left, photo on the right)
  with an "Emergency? Call now" bar on top; then services first (gates, then garage doors); then
  "Why SCV homeowners call us"; then areas; then brands; then FAQ; then CTA. Dark theme.

## Photos (only these)

`my images scv/` and `assets/gallery/` in this folder. Brand logos: the `* tp.jpeg` files in
`my images scv/` and `assets/brands/`.

## Cities (exactly 20)

Santa Clarita, Valencia, Saugus, Newhall, Canyon Country, Stevenson Ranch, Castaic, Val Verde,
Agua Dulce, Acton, Palmdale, Lancaster, Quartz Hill, Littlerock, Leona Valley, Lake Hughes,
Lake Elizabeth, Green Valley, Sun Village, Pearblossom

## Old URLs (301 redirects)

Redirect each with and without `.html`.

| Old | New |
|---|---|
| /index.html | / |
| /santa-clarita-gate-repair.html | /areas/santa-clarita |
| /valencia-gate-repair.html | /areas/valencia |
| /newhall-gate-repair.html | /areas/newhall |
| /castaic-gate-repair.html | /areas/castaic |
| /saugus-gate-repair.html | /areas/saugus |
| /canyon-country-gate-repair.html | /areas/canyon-country |

## Notes

- The live site currently shows REAL's phone 818-915-5715. Hila decided to switch to the 661 number
  only when the upgraded site goes live. Do not edit the live files.
- The old site also had a placeholder (661) 555-0123. It must not appear.
