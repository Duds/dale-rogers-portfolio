# Test info

- Name: Pagination component renders controls
- Location: /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/pagination.spec.ts:3:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('link', { name: /previous/i })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('link', { name: /previous/i })

    at /home/dale-rogers/dev/personal/dale-rogers-portfolio/tests/ui/pagination.spec.ts:8:22
```

# Page snapshot

```yaml
- checkbox "Use dark theme"
- text: Use dark theme
- banner:
    - heading "CSSError" [level=2]
    - heading "An error occurred." [level=1]
- text: "[postcss] It looks like you're trying to use"
- code: tailwindcss
- text: directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install
- code: "@tailwindcss/postcss"
- text: and update your PostCSS configuration.
- heading "components/ClientRouter.astro:16" [level=2]
- button "Open in editor"
- code: '--- type Fallback = ''none'' | ''animate'' | ''swap''; export interface Props { fallback?: Fallback; /** @deprecated handleForms is enabled by default in Astro 4.0 * * Set `data-astro-reload` on your form to opt-out of the default behavior. */ handleForms?: boolean; } const { fallback = ''animate'' } = Astro.props; --- <style is:global> /* Route announcer */ .astro-route-announcer { position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px; } </style> <meta name="astro-view-transitions-enabled" content="true" /> <meta name="astro-view-transitions-fallback" content={fallback} /> <script> import type { Options } from ''astro:transitions/client''; import { supportsViewTransitions, navigate } from ''astro:transitions/client''; // NOTE: import from `astro/virtual-modules/prefetch.js` as `astro:prefetch` requires the `prefetch` config to be enabled // @ts-ignore import { init } from ''astro/virtual-modules/prefetch.js''; type Fallback = ''none'' | ''animate'' | ''swap''; let lastClickedElementLeavingWindow: EventTarget | null = null; function getFallback(): Fallback { const el = document.querySelector(''[name="astro-view-transitions-fallback"]''); if (el) { return el.getAttribute(''content'') as Fallback; } return ''animate''; } function isReloadEl(el: HTMLElement | SVGAElement): boolean { return el.dataset.astroReload !== undefined; } const leavesWindow = (ev: MouseEvent) => (ev.button && ev.button !== 0) || // left clicks only ev.metaKey || // new tab (mac) ev.ctrlKey || // new tab (windows) ev.altKey || // download ev.shiftKey; // new window if (supportsViewTransitions || getFallback() !== ''none'') { if (import.meta.env.DEV && window.matchMedia(''(prefers-reduced-motion)'').matches) { console.warn( `[transitions]: all view transition animations, including fallback animation, are disabled as this device has the prefer-reduced-motion setting enabled.`, ); } document.addEventListener(''click'', (ev) => { let link = ev.target; lastClickedElementLeavingWindow = leavesWindow(ev) ? link : null; if (ev.composed) { link = ev.composedPath()[0]; } if (link instanceof Element) { link = link.closest(''a, area''); } if ( !(link instanceof HTMLAnchorElement) && !(link instanceof SVGAElement) && !(link instanceof HTMLAreaElement) ) return; // This check verifies that the click is happening on an anchor // that is going to another page within the same origin. Basically it determines // same-origin navigation, but omits special key combos for new tabs, etc. const linkTarget = link instanceof HTMLElement ? link.target : link.target.baseVal; const href = link instanceof HTMLElement ? link.href : link.href.baseVal; const origin = new URL(href, location.href).origin; if ( isReloadEl(link) || link.hasAttribute(''download'') || !link.href || (linkTarget && linkTarget !== ''_self'') || origin !== location.origin || lastClickedElementLeavingWindow || ev.defaultPrevented ) { // No page transitions in these cases, // Let the browser standard action handle this return; } ev.preventDefault(); navigate(href, { history: link.dataset.astroHistory === ''replace'' ? ''replace'' : ''auto'', sourceElement: link, }); }); document.addEventListener(''submit'', (ev) => { let el = ev.target as HTMLElement; const submitter = ev.submitter; const clickedWithKeys = submitter && submitter === lastClickedElementLeavingWindow; lastClickedElementLeavingWindow = null; if (el.tagName !== ''FORM'' || ev.defaultPrevented || isReloadEl(el) || clickedWithKeys) { return; } const form = el as HTMLFormElement; const formData = new FormData(form, submitter); // form.action and form.method can point to an <input name="action"> or <input name="method"> // in which case should fallback to the form attribute const formAction = typeof form.action === ''string'' ? form.action : form.getAttribute(''action''); const formMethod = typeof form.method === ''string'' ? form.method : form.getAttribute(''method''); // Use the form action, if defined, otherwise fallback to current path. let action = submitter?.getAttribute(''formaction'') ?? formAction ?? location.pathname; // Use the form method, if defined, otherwise fallback to "get" const method = submitter?.getAttribute(''formmethod'') ?? formMethod ?? ''get''; // the "dialog" method is a special keyword used within <dialog> elements // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-method if (method === ''dialog'' || location.origin !== new URL(action, location.href).origin) { // No page transitions in these cases, // Let the browser standard action handle this return; } const options: Options = { sourceElement: submitter ?? form }; if (method === ''get'') { const params = new URLSearchParams(formData as any); const url = new URL(action); url.search = params.toString(); action = url.toString(); } else { options.formData = formData; } ev.preventDefault(); navigate(action, options); }); // @ts-expect-error injected by vite-plugin-transitions for treeshaking if (!__PREFETCH_DISABLED__) { init({ prefetchAll: true }); } } </script>'
- heading "Stack Trace" [level=2]
- text: "Error: [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration. at We (/home/dale-rogers/dev/personal/dale-rogers-portfolio/node_modules/tailwindcss/dist/lib.js:35:2121) at LazyResult.runOnRoot (/home/dale-rogers/dev/personal/dale-rogers-portfolio/node_modules/postcss/lib/lazy-result.js:361:16) at LazyResult.runAsync (/home/dale-rogers/dev/personal/dale-rogers-portfolio/node_modules/postcss/lib/lazy-result.js:290:26) at LazyResult.async (/home/dale-rogers/dev/personal/dale-rogers-portfolio/node_modules/postcss/lib/lazy-result.js:192:30) at LazyResult.then (/home/dale-rogers/dev/personal/dale-rogers-portfolio/node_modules/postcss/lib/lazy-result.js:436:17)"
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test("Pagination component renders controls", async ({ page }) => {
   4 |   // Adjust route to a paginated page if needed
   5 |   await page.goto("/");
   6 |   const prev = await page.getByRole("link", { name: /previous/i });
   7 |   const next = await page.getByRole("link", { name: /next/i });
>  8 |   await expect(prev).toBeVisible();
     |                      ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   9 |   await expect(next).toBeVisible();
  10 | });
  11 |
```
