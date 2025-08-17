# Test info

- Name: Icon component renders an SVG
- Location: /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/icon.spec.ts:3:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('svg').first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('svg').first()

    at /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/icon.spec.ts:7:29
```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test";
  2 |
  3 | test("Icon component renders an SVG", async ({ page }) => {
  4 |   await page.goto("/");
  5 |   // Adjust selector as needed for an SVG icon
  6 |   const svg = await page.locator("svg");
> 7 |   await expect(svg.first()).toBeVisible();
    |                             ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  8 | });
  9 |
```
