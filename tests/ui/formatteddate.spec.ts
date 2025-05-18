import { test, expect } from "@playwright/test";

test("FormattedDate component renders a date", async ({ page }) => {
  await page.goto("/");
  // Adjust date text as needed
  const date = await page.getByText(/2024|2023|2022/);
  await expect(date).toBeVisible();
});
