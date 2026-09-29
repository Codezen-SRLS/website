import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { isMobile } from "./helpers";

test.beforeEach(async ({ page }) => {
  // Hide the consent banner for layout tests
  await page.addInitScript(() => localStorage.setItem("cz-analytics-consent", "denied"));
});

test("home renders the redesign with one h1 and live stats", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Every line in.");
  await expect(page.getByText("Completed audits")).toBeAttached();
  for (const chain of ["Ethereum", "Solana", "Cosmos", "Polkadot", "Bitcoin"]) {
    await expect(page.getByAltText(chain)).toBeVisible();
  }
  for (const id of ["services", "process", "report", "work", "team"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

test("no horizontal scrolling on any page", async ({ page }) => {
  for (const path of ["/", "/portfolio/", "/audits/tellor/", "/privacy-policy/", "/404/"]) {
    await page.goto(path);
    const [scroll, inner] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    expect(scroll, path).toBeLessThanOrEqual(inner);
  }
});

test("hero uses the stacked composition on phones", async ({ page }) => {
  await page.goto("/");
  const narrow = (page.viewportSize()?.width ?? 1440) < 640;
  await expect(page.locator(".rf-narrow")).toBeVisible({ visible: narrow });
  await expect(page.locator(".rf-wide")).toBeVisible({ visible: !narrow });
});

test("navigation reaches the sections", async ({ page }) => {
  await page.goto("/");
  if (isMobile(page)) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: /Process/ }).click();
    await expect(menu).toBeHidden();
  } else {
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Process" }).click();
  }
  await expect(page).toHaveURL(/#process$/);
});

test("portfolio search filters, ranks and syncs ?q=", async ({ page }) => {
  await page.goto("/portfolio/");
  const cards = page.locator(".grid li:not([hidden])");
  await expect(cards).toHaveCount(12);
  await page.getByRole("searchbox", { name: "Search audits" }).fill("tellor");
  await expect(page).toHaveURL(/\?q=tellor/);
  await expect(cards.first()).toContainText("Tellor");
  await page.getByRole("searchbox", { name: "Search audits" }).fill("zzzz-nothing");
  await expect(page.getByText("No audits match “zzzz-nothing”").first()).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).first().click();
  await expect(cards).toHaveCount(12);
  await page.getByRole("button", { name: "Load more audits" }).click();
  await expect(cards).toHaveCount(24);
});

test("portfolio honours a shared ?q= link and the tag chips", async ({ page }) => {
  await page.goto("/portfolio/?q=CosmWasm");
  await expect(page.getByRole("button", { name: "CosmWasm", pressed: true })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("match “CosmWasm”");
});

test("every audit is linked from the portfolio HTML", async ({ request }) => {
  const html = await (await request.get("/portfolio/")).text();
  const v1 = readFileSync("e2e/fixtures/v1-urls.txt", "utf8").split("\n").filter((u) => u.startsWith("/audits/"));
  for (const url of v1) expect(html, url).toContain(`href="${url}"`);
});

test("audit page has report structured data and a markdown twin", async ({ page, request }) => {
  await page.goto("/audits/tellor/");
  await expect(page.locator("h1")).toHaveText("Tellor security audit");
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  const types = ld["@graph"].map((n: { "@type": string | string[] }) => n["@type"]);
  expect(types).toEqual(expect.arrayContaining(["Report", "BreadcrumbList"]));
  const md = await page.locator('link[rel="alternate"][type="text/markdown"]').getAttribute("href");
  const res = await request.get(new URL(md!).pathname);
  expect(res.ok()).toBeTruthy();
  expect(await res.text()).toContain("# Tellor security audit");
});

test("canonical, OG image and robots meta are set", async ({ page, request }) => {
  await page.goto("/audits/tellor/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.codezen.tech/audits/tellor/");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect((await request.get(new URL(og!).pathname)).headers()["content-type"]).toContain("image/png");
  await page.goto("/404/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("agent endpoints are served", async ({ request }) => {
  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toMatch(/^# Codezen/);
  expect(llms).toContain("/audits.json");
  const json = await (await request.get("/audits.json")).json();
  expect(json.count).toBe(json.audits.length);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://www.codezen.tech/sitemap-index.xml");
  expect(robots).toContain("User-agent: ClaudeBot");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every audit card is visible and the home content is readable", async ({ page }) => {
    await page.goto("/portfolio/");
    await expect(page.locator(".grid li:visible")).toHaveCount(await page.locator(".grid li").count());
    await expect(page.getByRole("button", { name: "Load more audits" })).toBeHidden();
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Proven success in blockchain security" })).toBeVisible();
  });
});

test("the cookie banner never covers the end of the page", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("cz-analytics-consent"));
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Cookie consent" });
  await expect(banner).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const legal = page.getByRole("contentinfo").getByRole("link", { name: "Privacy policy" });
  const [legalBox, bannerBox] = [await legal.boundingBox(), await banner.boundingBox()];
  expect(legalBox!.y + legalBox!.height).toBeLessThanOrEqual(bannerBox!.y);
});

test("content stays visible when the site script fails to load", async ({ page }) => {
  await page.route(/\/_astro\/.*\.js$/, (route) => route.abort());
  await page.goto("/");
  for (const name of ["Comprehensive security for decentralized systems", "The expert behind every engagement"]) {
    const heading = page.getByRole("heading", { name });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
    await expect(page.locator("section", { has: heading })).toHaveCSS("opacity", "1");
  }
});
