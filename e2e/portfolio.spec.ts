import { test, expect } from "@playwright/test";

test("portfolio page loads with audit cards", async ({ page }) => {
  await page.goto("/portfolio");
  const cards = page.locator(".cz-work-card");
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBe(12);
});

test("load more button appears and loads more cards", async ({ page }) => {
  await page.goto("/portfolio");
  const loadMore = page.getByRole("button", { name: /load more/i });
  await expect(loadMore).toBeVisible();
  await loadMore.click();
  const cards = page.locator(".cz-work-card");
  expect(await cards.count()).toBeGreaterThan(12);
});

test("portfolio page heading is visible", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByText(/blockchain/i).first()).toBeVisible();
});
