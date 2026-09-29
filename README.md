# codezen.tech

Website of Codezen, smart contract and blockchain security audits. Built with [Astro](https://astro.build) as a fully static site (no client framework) using the Codezen "Prism" design system, and deployed to GitHub Pages.

## Develop

```sh
git submodule update --init   # audit data: src/sharedData (Codezen-SRLS/audit-history)
npm install
npm run dev                   # http://localhost:4321
```

Requires Node 22 (`.nvmrc`). Copy `.example.env` to `.env` for analytics and the request form; the variable names match the CI secrets.

## Structure

- `src/pages/`: home, portfolio, privacy policy, 404, `audits/[slug]` (one page per audit), plus agent/SEO endpoints: `robots.txt`, `llms.txt`, `llms-full.txt`, `audits.json`, `audits/<slug>.md`, `og/**.png`
- `src/lib/`: audit data and URLs (`audits.ts`, `auditPaths.ts`), stats computed from the audit history (`stats.ts`), portfolio search, analytics consent, schema.org builders (`seo.ts`), OG image rendering
- `src/components/`: layout pieces; `home/` holds the home page sections, `ui/` the design-system primitives (Button, Card, Badge, Eyebrow, SectionHeading, ServiceCard, Stat, SeverityBars)
- `src/scripts/`: page-wide client behaviour (menu, cookie banner, request form), bundled into one script by `src/layouts/Base.astro`
- `src/styles/tokens.css`: design tokens from the Codezen Design System (claude.ai/design)

Audit URLs are resolved exactly as on the previous Gatsby site: an explicit `slug` in `audit-history.json`, else the slugified title, with the report date appended on collisions. `e2e/fixtures/v1-urls.txt` lists every URL of the old site; the e2e suite fails if any stops resolving.

## Test

```sh
npm test           # unit tests (Vitest)
npm run test:e2e   # Playwright: builds with dummy IDs, desktop + iPhone + Pixel + iPad
```

The e2e suite intercepts Google Analytics, Clarity and EmailJS, and asserts consent behaviour and the exact EmailJS template parameters.

## Deploy

Pushing to `main` runs unit tests, then builds, runs the e2e suite and publishes `dist/` to GitHub Pages (`www.codezen.tech`).
