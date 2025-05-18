import { test, expect } from "@playwright/test";

test("Pagination component renders controls", async ({ page }) => {
  // Adjust route to a paginated page if needed
  await page.goto("/");
  const prev = await page.getByRole("link", { name: /previous/i });
  const next = await page.getByRole("link", { name: /next/i });
  await expect(prev).toBeVisible();
  await expect(next).toBeVisible();
});
