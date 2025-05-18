import { test, expect } from "@playwright/test";

test("TagList component renders tags as links", async ({ page }) => {
  await page.goto("/");
  // Adjust tag names as needed
  const tag = await page.getByRole("link", {
    name: /design|accessibility|ux/i,
  });
  await expect(tag).toBeVisible();
});
