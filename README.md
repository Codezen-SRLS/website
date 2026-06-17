# Codezen Website

Marketing site for [Codezen](https://www.codezen.tech) — smart contract security audits and blockchain consulting. Built with Gatsby 5, styled with the Prism design system (dark-first, frosted glass, iridescent cyan accent). Deployed to GitHub Pages via CI.

## Stack

- **Framework** — Gatsby 5 (static site generation, GraphQL data layer)
- **Styling** — Custom CSS design system (`src/styles/tokens.css` + `src/styles/global.css`), no Bootstrap
- **Data** — `audit-history.json` sourced from a git submodule via `gatsby-transformer-json`
- **Analytics** — Microsoft Clarity (`@microsoft/clarity`), Google Analytics 4
- **Contact form** — EmailJS
- **Tests** — Jest + React Testing Library (unit), Playwright (E2E scaffolding)
- **Deploy** — GitHub Pages via `peaceiris/actions-gh-pages`

## Local setup

### 1. Clone with submodules

```bash
git clone --recurse-submodules git@github.com:Codezen-SRLS/website.git
cd website
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .example.env .env
```

| Variable | Description | Where to get it |
|---|---|---|
| `GATSBY_CLARITY_ID` | Microsoft Clarity project ID | [Clarity dashboard](https://clarity.microsoft.com) > Settings > Overview |
| `GA_TRACKING_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`) | GA4 > Admin > Data Streams |
| `GATSBY_EMAILJS_SERVICE_ID` | EmailJS service ID | [EmailJS dashboard](https://dashboard.emailjs.com) > Email Services |
| `GATSBY_EMAILJS_TEMPLATE_ID` | EmailJS template ID | EmailJS dashboard > Email Templates |
| `GATSBY_EMAILJS_PUBLIC_KEY` | EmailJS public key | EmailJS dashboard > Account > General |

### 4. Run the dev server

```bash
npm run develop
```

Site available at `http://localhost:8000`.

## Commands

| Command | Description |
|---|---|
| `npm run develop` | Start local dev server with hot reload |
| `npm run build` | Production build to `./public` |
| `npm run serve` | Serve the production build locally |
| `npm run clean` | Clear Gatsby cache and `./public` |
| `npm test` | Run Jest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |

## CI / CD

The GitHub Actions workflow (`.github/workflows/node.js.yml`) has two jobs:

- **`test`** — runs on every push and every pull request. Checks out source only (no submodules needed — tests use mocks), installs deps, and runs `npm test --ci`.
- **`deploy`** — runs only after a merge to `main`, and only if `test` passes. Checks out the repo including submodules, builds the Gatsby site, and publishes `./public` to GitHub Pages with the custom domain `www.codezen.tech`.

### Required GitHub secrets

Go to **Settings > Secrets and variables > Actions** and add:

| Secret | Description |
|---|---|
| `PAT` | Personal Access Token with `repo` scope — used to check out the private `sharedData` submodule during deploy |
| `CLARITY_ID` | Microsoft Clarity project ID (mapped to `GATSBY_CLARITY_ID` in the build) |
| `GA_TRACKING_ID` | Google Analytics 4 measurement ID |
| `GATSBY_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `GATSBY_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `GATSBY_EMAILJS_PUBLIC_KEY` | EmailJS public key |

`GITHUB_TOKEN` is provided automatically by GitHub Actions and does not need to be added manually.

## Project structure

```
src/
  assets/          # Brand SVGs (logos, icons, chain marks), fonts
  components/      # React components (Hero, Services, Work, Team, ...)
  context/         # FormContext — controls the contact modal
  images/          # Static images (founder photo, logo)
  pages/           # index.js, portfolio.js
  styles/          # tokens.css (design tokens), global.css (utilities, base)
  __tests__/       # Jest unit tests
  __mocks__/       # Mocks for Gatsby, gatsby-plugin-image, EmailJS
e2e/               # Playwright E2E tests
```

## Submodule (audit data)

Audit history and project images live in a separate private repository linked as a git submodule at `src/sharedData`. Gatsby sources JSON and images from there at build time. To update to the latest data:

```bash
git submodule update --remote
git add src/sharedData
git commit -m "chore: update sharedData"
```
