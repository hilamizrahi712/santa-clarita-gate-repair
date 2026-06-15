# Santa Clarita Gate Repair — Website

Premium multi-page static site, gates-first, with its own emerald-and-bronze identity (distinct from the Conejo Valley site). No build step — host the folder anywhere (Cloudflare Pages, Netlify, Vercel).

```
index.html                          — homepage / hub
santa-clarita-gate-repair.html      — city landing page (citywide)
valencia-gate-repair.html           — city landing page
newhall-gate-repair.html            — city landing page
castaic-gate-repair.html            — city landing page
saugus-gate-repair.html             — city landing page
canyon-country-gate-repair.html     — city landing page
sitemap.xml                         — all 7 URLs
robots.txt                          — allows crawling, points to sitemap
css/styles.css                      — all styling (emerald + bronze; colors in :root)
js/main.js                          — nav, scroll animations, Formspree-ready form
assets/brands/                      — drop brand logo images here (optional)
assets/gallery/                     — drop your own gate/project photos here
```

## Placeholders to replace before launch

| Find | Replace with |
|---|---|
| `661-555-0000` | Real display phone number |
| `6615550000` | Real phone digits (used in every `tel:` link) |
| `+1-661-555-0000` | Real phone in schema format |
| `santaclaritagaterepair.com` | Your real domain (canonical, OG, Twitter, schema, sitemap, robots) |

The homepage has a CONFIG comment block at the top listing these. After find/replace, also update `sitemap.xml` and `robots.txt` to the real domain.

## Connecting the lead form (Formspree)

The form is built to connect with **zero JS changes**. When you have your Formspree endpoint, add it to each `<form id="leadForm">` tag:

```html
<form ... id="leadForm" action="https://formspree.io/f/XXXXXXXX" method="POST" novalidate>
```

With an `action` present, `js/main.js` automatically POSTs via `fetch` (no page reload) and shows the success/error panels. With no `action` (current state), it just validates and shows the friendly success message. Each page already has a hidden `_subject` and a `city` field so leads are labelled by page, plus a `_gotcha` honeypot for spam. Note: the very first Formspree submission triggers a one-time confirmation email to the form owner.

## Images

All photos are **verified Unsplash placeholders** (each HTTP-200 checked and confirmed to show a gate). Search `images.unsplash.com` in any HTML file to find them. Swap in your own photos when ready, keeping the `alt` text pattern (what + where) for local SEO. The homepage "Our Work" gallery has one **clearly-labeled placeholder tile** for a real sliding-gate photo. Update the `og:image` / `twitter:image` / schema `image` URLs to your own hosted photos too.

## Brand logos

The "Brands We Install & Service" section shows brand names in elegant bronze type. To use real logos, drop image files in `assets/brands/` and replace a tile's `<span>Name</span>` with `<img src="assets/brands/liftmaster.png" alt="" class="brand__logo">` — the `.brand__logo` class applies the white-monochrome + brighten-on-hover treatment. (See the comment in `index.html` above the brand grid.)

## SEO notes

- Homepage is the hub (brand + links to every city). Each city page is a keyword-targeted local landing page with its own title, meta description, single H1, unique body copy (real neighborhoods/geography per city — not templated), FAQ accordion, and JSON-LD (`LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList`).
- Clean URLs: Cloudflare Pages serves `foo.html` at `/foo`, so city pages live at e.g. `/valencia-gate-repair`. All internal links and the sitemap use the clean form.
- **No `aggregateRating`/star ratings** are in the schema by design — add one only when you have genuine reviews, and make it visible on the page at the same time (Google requires both).
