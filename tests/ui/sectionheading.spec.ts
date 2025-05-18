import { test, expect } from "@playwright/test";

test("SectionHeading component renders heading", async ({ page }) => {
  await page.goto("/");
  // Adjust heading text as needed
  const heading = await page.getByRole("heading", {
    name: /services|case studies|my values/i,
  });
  await expect(heading).toBeVisible();
});
