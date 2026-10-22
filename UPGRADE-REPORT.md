# Upgrade report: Santa Clarita Gate Repair

Branch `upgrade-real-architecture`. New site in `new-site/` (Next.js static export to `new-site/out/`).
The old static site files at the repo root are untouched and remain the live site until the switch.

## Pages built (72 HTML files in `out/`)

| Type | Count |
|---|---|
| Services (`/services/*`) | 18 |
| Cities (`/areas/*`, the 20 brief cities only) | 20 |
| Brands (`/brands/*`) | 11 |
| Tips (`/tips/*`) | 5 |
| Home, about, contact, services, brands, service-areas, tips, gate-operator-models, privacy policy, thank-you, 404 | 12 |
| `/blog/*` copies of the 5 tips + `/blog` index (exported, but 301 to `/tips/*` via `_redirects`) | 6 |

No reviews, pricing or gallery pages.

## Checks (Phase 7)

- `npm run build`: passes, `out/` generated.
- `node scripts/dup-check.mjs`: 0 sentences, 0 paragraphs flagged. Whitelisted on purpose:
  the "{Brand} gate repair in {City}" link lists (cities from the 20 in `lib/constants.ts`) and the
  hours line "Sunday to Friday, 7 AM to 10 PM". The brand page heading "{Brand} Gate Repair by City"
  was reworded to "{Brand} Service Calls Across Our 20 Cities".
- `node scripts/out-grep.mjs` (new): 0 hits for `$`+digit, BFT, review, testimonial, Real Gate,
  realgaterepair, 915-5715, the old placeholder 555-0123, TODO, and REAL's cities that are not in
  the brief. The `$`+digit check skips Next.js inline script data (72 files had `$1`-style RSC ids)
  but still checks JSON-LD.
- `_redirects`: all 7 old URLs from the brief, with and without `.html`, point at pages that exist in `out/`.

## Analytics and forms

- GA4 `G-RR82654PGL` (existing property) from `lib/constants.ts`; `NEXT_PUBLIC_GA_ID` can override it.
- Events kept with the live site's names so existing conversions continue: `call_click`, `sms_click`,
  `lead_form_submit`. (UPGRADE-PROMPT lists `phone_call` / `generate_lead`; renaming would split
  history from the old site, so it was not done.)
- Formspree `mdavyrrl`. IndexNow key `a2a83c52046d794b2196eb4c84044838` (this site's own, not REAL's);
  submit with `npm run indexnow` after going live.

## Preview mode

Build with `NEXT_PUBLIC_NOINDEX=1` for a preview deploy: every page gets
`<meta name="robots" content="noindex, nofollow">` and `robots.txt` disallows all.
Leave it unset for production. GA still loads on previews, so preview visits land in the live
property unless `NEXT_PUBLIC_GA_ID` is set to something else there.

## Open TODOs

- **Email** (`TODO(pending)` in `lib/constants.ts`): hidden on contact page and JSON-LD until set.
- **sameAs** profile URLs (Google Business Profile, Yelp, Facebook) in the LocalBusiness JSON-LD.

## Image gaps (details in `new-site/IMAGE-GAPS.md`)

- No garage door photos: garage door pages reuse gate photos.
- Only 7 photos, rotated across 20 city pages.
- Viking, Ramset, Eagle logos unusable; Chamberlain logo low contrast on dark.

## For Hila to decide

1. Business email.
2. Garage door job photos, a team/truck photo, usable Viking/Ramset/Eagle logos.
3. On go-live: switch the live phone from 818-915-5715 to (661) 519-1599 (happens by deploying this
   site), set Cloudflare Pages build to `new-site/`, leave `NEXT_PUBLIC_NOINDEX` unset, then run
   `npm run indexnow` and resubmit the sitemap in Search Console.
4. Whether to keep the old GA event names (recommended) or rename to `phone_call` / `generate_lead`.
