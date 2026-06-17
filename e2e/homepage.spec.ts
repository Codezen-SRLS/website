import { test, expect } from "@playwright/test";

test("homepage loads and hero h1 is visible", async ({ page }) => {
  await page.goto("/");
  const h1 = page.locator("h1").first();
  await expect(h1).toBeVisible();
  await expect(h1).toContainText("protocol");
});

test("nav links are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Services").first()).toBeVisible();
  await expect(page.getByText("Process").first()).toBeVisible();
  await expect(page.getByText("Work").first()).toBeVisible();
});

test("stats section shows audit count", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-reveal]").first().scrollIntoViewIfNeeded();
  await expect(page.getByText(/\d+\+ audits/i).first()).toBeVisible();
});

test("chain strip shows ecosystem logos", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByAltText("Ethereum")).toBeVisible();
  await expect(page.getByAltText("Solana")).toBeVisible();
  await expect(page.getByAltText("Cosmos")).toBeVisible();
});
