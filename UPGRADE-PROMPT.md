# Upgrade this site to the Real Gate (REAL) architecture

You are working inside ONE site folder. Read `SITE-BRIEF.md` in this folder first. Everything
site-specific (name, phone, domain, cities, colors, form, analytics, old URLs) comes from that brief.
This prompt is shared by several sites that are being upgraded in parallel, so never touch any folder
other than the one you were opened in, except reading REAL.

**Source architecture:** `C:\Users\הילה מזרחי\Desktop\real-gate-garage-door` (REAL).
REAL is read-only. Never edit it, never copy its images, logo, brand copy, phone or Formspree form.
Copy its *code and structure* only.

Work phase by phase. After each phase: `git add -A && git commit`, print a short summary, and STOP
so Hila can run `/clear` and paste the next status line. Never push and never deploy unless Hila says so.

---

## Non-negotiable rules (every site)

- Goal of every page: the visitor calls or texts and books a technician.
- No DIY content anywhere: no troubleshooting steps, no manual release, no reset/adjustment procedures.
- No prices anywhere: copy, FAQs, blog, JSON-LD. Use "free on-site quote" wording. No pricing page.
- Never mention BFT.
- No reviews, testimonials, ratings, review counts or `aggregateRating`/`review` schema. No reviews page.
- No galleries. Hero/section images only, from THIS site's own photo folder (listed in the brief),
  converted to WebP, metadata stripped, paths centralized in `lib/images.ts`.
- No unverifiable claims: no "years in business", "#1", "certified/authorized dealer", "award-winning",
  "licensed" unless the brief says so. Do not invent license numbers.
- Residential homeowners first, commercial second.
- Phone, SMS, email, domain, Formspree URL and GA4 ID live ONLY in `lib/constants.ts`. Never hardcode
  them anywhere else (including services/blog data files: use a template token or import).
- Business name exactly as written in the brief.
- Cities: ONLY the 20 cities in the brief. No other city pages, no other city names in copy except
  in the "nearby areas" lines the brief allows.

## Duplicate-content rule (critical)

Several sites are being built from the same code at the same time. Google must see each one as its
own business. Therefore:

- Every sentence of visible copy is written fresh for this site. Do not paraphrase REAL line by line.
- Change structure as well as wording: different homepage section order (use the layout variant in
  the brief), different headings, different FAQ questions, different blog topics.
- Before the final phase, run `node scripts/dup-check.mjs` (create it in Phase 1, see below) against
  REAL and fix every flagged paragraph.

---

## Phase 1: Set up `new-site/` from REAL

1. If this folder is not a git repo, `git init` and commit the current files as "Snapshot of old site".
2. Create branch `upgrade-real-architecture`. All work happens on this branch.
3. Copy REAL's code into `./new-site/` excluding: `.git`, `node_modules`, `.next`, `out`, `public/images`,
   any photo folders, `public/*.txt` IndexNow key files.
4. Keep the old static site files where they are (they are the live site until Hila switches).
5. In `new-site/`, delete: `app/reviews`, `app/pricing`, any gallery components/pages, any testimonial
   components and data, review JSON-LD in `app/layout.tsx`.
6. Empty REAL's content but keep the shapes: `lib/services-data.ts`, `lib/cities-data.ts`,
   `lib/brands-data.ts`, `lib/blog-data.ts`, `lib/city-regions.ts`, `public/llms.txt` keep their
   TypeScript types and one stub entry each marked `// TODO(content)`.
7. Write `lib/constants.ts` from the brief.
8. Create `scripts/dup-check.mjs`: extract visible text from `new-site/out/**/*.html` and from REAL's
   `out/**/*.html` (build REAL into a temp folder if needed, never inside REAL), split into sentences,
   and list any sentence of 8+ words that appears in both, plus any paragraph with >40% 5-word
   shingle overlap. Exit non-zero if anything is flagged.
9. `npm install` and `npm run build` must pass (stubs are fine).

Commit: "Phase 1: REAL architecture scaffold".

## Phase 2: Brand and design

1. Apply name, colors, fonts and logo from the brief. Keep the token approach in `app/globals.css`.
2. Header/footer: name, phone (click to call), SMS button, hours from the brief.
3. LocalBusiness JSON-LD in `app/layout.tsx`: this business only, `areaServed` = the 20 cities,
   no street address unless the brief gives one, no ratings.
4. Homepage layout follows the brief's layout variant.
5. Check contrast (WCAG AA) for text on every color pair you use.

Commit: "Phase 2: brand and design".

## Phase 3: Images

1. Take photos ONLY from the folder(s) named in the brief. Convert to WebP (max 1600px wide, quality
   ~78), strip EXIF/GPS, give descriptive filenames (`iron-driveway-gate-{city}.webp`).
2. Brand logos for the brands strip may come from this site's own folder only.
3. Map every image slot in `lib/images.ts`. If a slot has no suitable photo, reuse another of this
   site's photos and list the gap in `IMAGE-GAPS.md` (do not pull from other sites).

Commit: "Phase 3: images".

## Phase 4: Content

Write all content fresh for this site, following REAL's page *types* and SEO patterns:

- Services: same service slugs as REAL (gates first, then garage doors). Each page: what we fix, why
  call us, the cities we cover (from the brief), FAQ (no prices, no DIY), strong call/text CTAs.
- Cities: one page per city in the brief at `/areas/{slug}`. Each page must be genuinely local:
  neighborhoods, typical home and gate styles, terrain or weather that affects gates, nearby cities
  (from the brief only). Follow REAL's newest city page pattern (gates + garage doors + service links).
- Brands: same brand slugs as REAL except anything the brief excludes. Model names must come from
  REAL's verified model data only; never invent model numbers.
- Blog/tips: at most 6 posts to start, topics chosen for this area, no DIY, no prices.
- About, contact, privacy policy, thank-you pages rewritten for this business.
- `public/llms.txt` for this business only.
- `next-sitemap.config.js` / sitemap: this domain only.

Commit after each group (services, cities, brands, rest).

## Phase 5: Redirects from the old site

The live site has old URLs that Google already knows. Using the "Old URLs" table in the brief, create
`new-site/public/_redirects` (Cloudflare Pages format) with a 301 for each old URL, both with and
without `.html`. Old pages for cities that are no longer in this site's list redirect to `/` (or to
the closest service page). Keep REAL's existing redirect rules only if they apply here.

Commit: "Phase 5: redirects".

## Phase 6: Analytics and forms

1. GA4 with the measurement ID from the brief (if the brief says "keep existing ID", use exactly that ID
   so history is kept). Keep REAL's events: `phone_call`, `sms_click`, `generate_lead`.
2. Contact form posts to the Formspree URL in the brief.
3. IndexNow: generate a NEW key for this domain (never reuse REAL's), keep the submit script.

Commit: "Phase 6: analytics and forms".

## Phase 7: Verify

1. `npm run build` passes, `out/` generated.
2. `node scripts/dup-check.mjs` passes.
3. Grep `out/` for: `$` followed by a digit, `BFT`, `review`, `testimonial`, `Real Gate`, `realgaterepair`,
   REAL's phone `915-5715`, `TODO`, any city not in the brief. All must be zero (except TODO for the
   items the brief marks as pending).
4. Every old URL in the brief resolves through `_redirects`.
5. Write `UPGRADE-REPORT.md`: pages built, open TODOs, image gaps, anything Hila must decide.

Commit: "Phase 7: verified". Then STOP. Do not deploy.
