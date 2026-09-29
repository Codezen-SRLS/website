import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

// Every URL of the Gatsby site (snapshot of its sitemap) must still resolve:
// GitHub Pages cannot redirect, so a changed URL would be a broken link.
const V1_URLS = readFileSync("e2e/fixtures/v1-urls.txt", "utf8").split("\n").filter(Boolean);

test.describe.configure({ mode: "parallel" });

test("all v1 URLs return 200 and are in the new sitemap", async ({ request }, info) => {
  test.skip(info.project.name !== "desktop", "URL checks don't depend on the viewport");
  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  for (const url of V1_URLS) {
    const res = await request.get(url);
    expect(res.status(), url).toBe(200);
    expect(sitemap, url).toContain(`<loc>https://www.codezen.tech${url}</loc>`);
  }
});
