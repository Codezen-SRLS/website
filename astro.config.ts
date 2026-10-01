// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { auditLastmod } from "./src/lib/sitemapDates";
import { AUDIT_REDIRECTS } from "./src/lib/redirects";

const site = "https://www.codezen.tech";

export default defineConfig({
  site,
  // Same URLs as the Gatsby site: every page is a directory with a trailing slash
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  // Old audit URLs keep working after renames in audit-history.json
  redirects: AUDIT_REDIRECTS,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        const lastmod = auditLastmod(item.url.replace(site, ""));
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  vite: {
    // CI secrets keep their Gatsby-era names (GA_TRACKING_ID, GATSBY_*), see .github/workflows/node.js.yml
    envPrefix: ["PUBLIC_", "GATSBY_", "GA_"],
  },
});
