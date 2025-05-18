import { test, expect } from "@playwright/test";

test("ThemeToggle component renders and can be toggled", async ({ page }) => {
  await page.goto("/");
  const toggle = await page.getByRole("button", { name: /theme|toggle/i });
  await expect(toggle).toBeVisible();
  await toggle.click();
  // Optionally, check for theme change
});
