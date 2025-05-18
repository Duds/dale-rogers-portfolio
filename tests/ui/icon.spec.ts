import { test, expect } from "@playwright/test";

test("Icon component renders an SVG", async ({ page }) => {
  await page.goto("/");
  // Adjust selector as needed for an SVG icon
  const svg = await page.locator("svg");
  await expect(svg.first()).toBeVisible();
});
