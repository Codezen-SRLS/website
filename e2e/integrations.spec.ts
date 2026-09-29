import { expect, test } from "@playwright/test";
import { TEST_ENV } from "../playwright.config";
import { isAnalytics, pageViews, trackThirdParty } from "./helpers";

const banner = (page: import("@playwright/test").Page) => page.getByRole("region", { name: "Cookie consent" });

test.describe("analytics consent (GA + Clarity)", () => {
  test("first visit: banner shown, no analytics requests or Clarity code", async ({ page }) => {
    const requests = await trackThirdParty(page);
    const scripts: string[] = [];
    page.on("request", (r) => r.resourceType() === "script" && scripts.push(r.url()));
    await page.goto("/");
    await expect(banner(page)).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(requests).toEqual([]);
    // Only the site bundle loads up front; the Clarity loader and EmailJS stay lazy
    expect(scripts.filter((u) => u.includes("/_astro/"))).toHaveLength(1);
  });

  test("accept: GA and Clarity load and one page view per page", async ({ page }) => {
    const requests = await trackThirdParty(page);
    await page.goto("/");
    await banner(page).getByRole("button", { name: "Accept" }).click();
    await expect(banner(page)).toBeHidden();
    await expect.poll(() => requests.some((u) => u.includes(`gtag/js?id=${TEST_ENV.GA_TRACKING_ID}`))).toBe(true);
    await expect.poll(() => requests.some((u) => u.includes(`clarity.ms/tag/${TEST_ENV.GATSBY_CLARITY_ID}`))).toBe(true);
    expect(await pageViews(page)).toEqual(["/"]);
    expect(await page.evaluate(() => localStorage.getItem("cz-analytics-consent"))).toBe("granted");

    // Next page: analytics load again without asking, exactly one page view
    await page.goto("/portfolio/");
    await expect(banner(page)).toBeHidden();
    expect(await pageViews(page)).toEqual(["/portfolio/"]);
  });

  test("reject after accept: cookies cleared, reload, no further analytics", async ({ page, context }) => {
    const requests = await trackThirdParty(page);
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("cz-analytics-consent", "granted"));
    await page.reload();
    await expect.poll(() => page.evaluate(() => typeof (window as { gtag?: unknown }).gtag)).toBe("function");
    await context.addCookies([
      { name: "_ga", value: "GA1.1.1", url: "http://localhost:4400" },
      { name: "_clck", value: "x", url: "http://localhost:4400" },
    ]);
    // Survives only until the page reloads
    await page.evaluate(() => ((window as { __beforeReject?: boolean }).__beforeReject = true));

    await page.getByRole("button", { name: "Cookie settings" }).click();
    await expect(banner(page)).toBeVisible();
    const reloaded = page.waitForEvent("framenavigated", (f) => f === page.mainFrame());
    await banner(page).getByRole("button", { name: "Reject" }).click();
    await reloaded;
    await page.waitForLoadState("load");
    expect(await page.evaluate(() => (window as { __beforeReject?: boolean }).__beforeReject ?? false)).toBe(false);
    const names = (await context.cookies()).map((c) => c.name);
    expect(names).not.toContain("_ga");
    expect(names).not.toContain("_clck");
    expect(await page.evaluate(() => localStorage.getItem("cz-analytics-consent"))).toBe("denied");
    expect(await page.evaluate(() => typeof (window as { gtag?: unknown }).gtag)).toBe("undefined");
    const before = requests.length;
    await page.waitForLoadState("networkidle");
    expect(requests.length).toBe(before);
  });

  test("denied visitors never load analytics", async ({ page }) => {
    const requests = await trackThirdParty(page);
    await page.addInitScript(() => localStorage.setItem("cz-analytics-consent", "denied"));
    await page.goto("/");
    await expect(banner(page)).toBeHidden();
    await page.waitForLoadState("networkidle");
    expect(requests.filter(isAnalytics)).toEqual([]);
  });
});

test.describe("audit request form (EmailJS)", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("cz-analytics-consent", "denied"));
  });

  const openForm = async (page: import("@playwright/test").Page) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Secure your project" }).click();
    const dialog = page.getByRole("dialog", { name: "Let's secure your project" });
    await expect(dialog).toBeVisible();
    return dialog;
  };

  test("sends the same template params as v1 and shows the thank-you", async ({ page }) => {
    let payload: Record<string, unknown> | undefined;
    await page.route("**/api.emailjs.com/**", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, body: "OK" });
    });
    const dialog = await openForm(page);
    await dialog.getByLabel("Name *").fill("Ada Lovelace");
    await dialog.getByLabel("Email *").fill("ada@example.com");
    await dialog.getByLabel("Project / Protocol").fill("Analytical Engine");
    await dialog.getByLabel("Request Details").fill("Solidity, 2k LOC");
    await dialog.getByRole("button", { name: "Submit your request" }).click();

    await expect(dialog.getByText("Request received")).toBeVisible();
    await expect(dialog).toContainText("Thanks, Ada.");
    expect(payload).toMatchObject({
      service_id: TEST_ENV.GATSBY_EMAILJS_SERVICE_ID,
      template_id: TEST_ENV.GATSBY_EMAILJS_TEMPLATE_ID,
      user_id: TEST_ENV.GATSBY_EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: "Ada Lovelace",
        from_email: "ada@example.com",
        project: "Analytical Engine",
        message: "Solidity, 2k LOC",
      },
    });
  });

  test("required fields block sending", async ({ page }) => {
    let sent = false;
    await page.route("**/api.emailjs.com/**", (route) => ((sent = true), route.fulfill({ status: 200, body: "OK" })));
    const dialog = await openForm(page);
    await dialog.getByRole("button", { name: "Submit your request" }).click();
    await expect(dialog.getByLabel("Name *")).toHaveAttribute("aria-invalid", "");
    expect(sent).toBe(false);
  });

  test("shows an error with the fallback email when sending fails", async ({ page }) => {
    await page.route("**/api.emailjs.com/**", (route) => route.fulfill({ status: 500, body: "fail" }));
    const dialog = await openForm(page);
    await dialog.getByLabel("Name *").fill("Ada");
    await dialog.getByLabel("Email *").fill("ada@example.com");
    await dialog.getByRole("button", { name: "Submit your request" }).click();
    await expect(dialog.getByRole("alert")).toContainText("info@codezen.tech");
  });

  test("Escape closes the dialog", async ({ page }) => {
    const dialog = await openForm(page);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
