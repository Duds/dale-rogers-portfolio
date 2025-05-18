import { test, expect } from "@playwright/test";

test("Button component renders and is clickable", async ({ page }) => {
  await page.goto("/"); // Adjust if Button is on a different route
  const button = await page.getByRole("button", {
    name: /click me|explore my values|get in touch/i,
  });
  await expect(button).toBeVisible();
  await button.click();
  // Optionally, assert navigation or side effect
});
