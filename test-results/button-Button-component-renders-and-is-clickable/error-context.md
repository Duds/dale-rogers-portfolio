# Test info

- Name: Button component renders and is clickable
- Location: /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/button.spec.ts:3:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('button', { name: /click me|explore my values|get in touch/i })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('button', { name: /click me|explore my values|get in touch/i })

    at /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/button.spec.ts:8:24
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test("Button component renders and is clickable", async ({ page }) => {
   4 |   await page.goto("/"); // Adjust if Button is on a different route
   5 |   const button = await page.getByRole("button", {
   6 |     name: /click me|explore my values|get in touch/i,
   7 |   });
>  8 |   await expect(button).toBeVisible();
     |                        ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   9 |   await button.click();
  10 |   // Optionally, assert navigation or side effect
  11 | });
  12 |
```
