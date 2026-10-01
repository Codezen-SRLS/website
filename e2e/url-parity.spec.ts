import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { AUDIT_REDIRECTS } from "../src/lib/redirects";

// Every URL codezen.tech has ever published (the Gatsby site's sitemap plus every audit
// page since) must keep resolving, as a page or as a redirect in src/lib/redirects.ts.
// Append new URLs here as audits are added; never remove one.
const PUBLISHED_URLS = readFileSync("e2e/fixtures/published-urls.txt", "utf8").split("\n").filter(Boolean);

test.describe.configure({ mode: "parallel" });

test("every published URL still resolves", async ({ request }, info) => {
  test.skip(info.project.name !== "desktop", "URL checks don't depend on the viewport");
  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  for (const url of PUBLISHED_URLS) {
    const res = await request.get(url);
    expect(res.status(), url).toBe(200);
    const target = AUDIT_REDIRECTS[url];
    if (target) {
      // Renamed audit: the old URL is a redirect page to a page that exists
      expect(await res.text(), url).toContain(`url=${target}`);
      expect((await request.get(target)).status(), target).toBe(200);
      if (target.startsWith("/audits/")) expect(sitemap, target).toContain(`<loc>https://www.codezen.tech${target}</loc>`);
    } else {
      expect(sitemap, url).toContain(`<loc>https://www.codezen.tech${url}</loc>`);
    }
  }
});
