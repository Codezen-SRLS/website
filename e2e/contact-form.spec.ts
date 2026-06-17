import { test, expect } from "@playwright/test";

test("audit form opens from header CTA", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /get an audit/i }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText(/let's secure your project/i)).toBeVisible();
});

test("form has name and email fields", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /get an audit/i }).first().click();
  await expect(page.locator("#rf-name")).toBeVisible();
  await expect(page.locator("#rf-email")).toBeVisible();
});

test("form closes on Esc key", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /get an audit/i }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("form closes on backdrop click", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /get an audit/i }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  // Click outside the modal card (the overlay)
  await page.mouse.click(10, 10);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
