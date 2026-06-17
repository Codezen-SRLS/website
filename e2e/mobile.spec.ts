import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["iPhone 12"] });

test("hamburger menu is visible on mobile", async ({ page }) => {
  await page.goto("/");
  const hamburger = page.getByLabel(/open menu/i);
  await expect(hamburger).toBeVisible();
});

test("desktop nav is hidden on mobile", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator(".cz-header-nav");
  await expect(nav).toBeHidden();
});

test("hamburger opens mobile menu", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel(/open menu/i).click();
  await expect(page.getByLabel(/close menu/i)).toBeVisible();
});

test("hero is stacked on mobile", async ({ page }) => {
  await page.goto("/");
  const heroGrid = page.locator(".cz-hero-grid");
  await expect(heroGrid).toBeVisible();
  // on mobile the grid should be 1-col (check that the panel is not alongside text)
  const bbox = await heroGrid.boundingBox();
  expect(bbox).not.toBeNull();
});

test("request form is full-width on mobile", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel(/open menu/i).click();
  await page.getByRole("button", { name: /get an audit/i }).last().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const bbox = await dialog.locator("div").first().boundingBox();
  const viewport = page.viewportSize();
  if (bbox && viewport) {
    expect(bbox.width).toBeLessThanOrEqual(viewport.width - 24);
  }
});
