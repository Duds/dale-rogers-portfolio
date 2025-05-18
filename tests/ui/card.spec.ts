import { test, expect } from "@playwright/test";

test("Card component renders in Case Studies section", async ({ page }) => {
  await page.goto("/");
  // Look for a card title from Case Studies
  const card = await page.getByRole("link", { name: /case study/i });
  await expect(card).toBeVisible();
});
