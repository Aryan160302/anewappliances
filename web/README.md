# Anew Appliances — product catalogue site

A static catalogue for the Anew Appliances induction cooktop and electric kettle
ranges. Every product image and specification is derived from the source
collateral in `../data`, not typed in by hand.

## Deployment

Pushed to `main` on [github.com/Aryan160302/anewappliances](https://github.com/Aryan160302/anewappliances),
which Vercel builds automatically. The project's Root Directory is `web`, since
the Next.js app is a subdirectory of the repo.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
```

`next.config.ts` sets `output: "export"`, so `npm run build` produces a plain
HTML/CSS/JS bundle in `out/` that any static host will serve — GitHub Pages,
Netlify, S3, or `npx serve out` locally. There is no server and no database.

## Where the content comes from

| Source in `../data`             | Feeds                                        |
| ------------------------------- | -------------------------------------------- |
| `Anew Appliances Catalogue.pdf` | The six induction cooktops (pages 2–7)       |
| `Water Kettle Catalogue.pptx`   | The six electric kettles (slides 2–8)        |
| `logo.png` (brand sheet)        | The gold "A" monogram                        |
| `PHOTO-2026-07-20-18-16-52.jpg` | The company address; fallback logo source    |

Only the company address and `info@` mailbox from the business cards are
published. The individual staff names, mobile numbers and personal emails
printed on those cards are deliberately left off the site.

> **Not in this repository.** The two business-card images (`logo.png` and
> `PHOTO-*.jpg`) are gitignored because they carry those personal details and
> this repo is public. The site does not need them — the monogram is already
> committed at `public/brand/logo.png` and the icons are generated. You only
> need the originals locally if you want to re-derive the logo from scratch.

Specifications live in `src/data/products.ts`, company details in
`src/data/company.ts`. Both are plain TypeScript — edit them to change the site's
copy. Every spec value there appears verbatim in one of the source files; where a
figure is absent from the source it is deliberately absent here too.

## Regenerating images

```bash
python3 scripts/extract_assets.py
```

Requires Pillow and poppler (`brew install poppler`). The script pulls the
embedded JPEGs out of the PDF, the media out of the PPTX zip, crops the monogram
out of the brand sheet, and writes optimised WebP into `public/products/<slug>/`
at two sizes — `hero.webp` (1200px) and `hero-card.webp` (600px). Product photos
are never upscaled; several catalogue images are only ~535px wide.

Two things to know before editing the mapping tables in that script:

- The PDF reuses one photograph per model **pair**, so A4 and A4–5KVA (and the
  A8 and M3 pairs) legitimately share an image.
- PPTX slides 7 and 8 both reference `image14`/`image15`. Those stainless shots
  belong to SSJ1508; SSJ1517 has a PP plastic outer body and uses `image16`
  only. Verify any new mapping visually rather than trusting slide order.

## Before going live

- Point `metadataBase` in `src/app/layout.tsx`, `BASE_URL` in
  `src/app/sitemap.ts` and the sitemap URL in `src/app/robots.ts` at the real
  domain.
- Enquiry buttons are `mailto:` links to the address in `company.ts`. Swap them
  for a hosted form only if you add a backend — nothing here needs one today.
