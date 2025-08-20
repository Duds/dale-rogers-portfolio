# Test info

- Name: Card component renders in Case Studies section
- Location: /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/card.spec.ts:3:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('link', { name: /case study/i })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('link', { name: /case study/i })

    at /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/card.spec.ts:7:22
```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test";
  2 |
  3 | test("Card component renders in Case Studies section", async ({ page }) => {
  4 |   await page.goto("/");
  5 |   // Look for a card title from Case Studies
  6 |   const card = await page.getByRole("link", { name: /case study/i });
> 7 |   await expect(card).toBeVisible();
    |                      ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  8 | });
  9 |
```
