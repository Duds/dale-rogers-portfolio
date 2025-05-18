import { test, expect } from "@playwright/test";

test("PageHeader component renders heading", async ({ page }) => {
  await page.goto("/");
  // Adjust heading text as needed
  const heading = await page.getByRole("heading", {
    name: /about|work|articles/i,
  });
  await expect(heading).toBeVisible();
});
