# Lessons Learned

## Project Setup & Configuration

- When using npm as the preferred package manager, removing alternative lockfiles (like `pnpm-lock.yaml`) prevents VS Code warnings
- Setting `"npm.packageManager": "npm"` in `.vscode/settings.json` explicitly tells VS Code which package manager to use

## Astro Specifics

- Content collection names in `getCollection()` calls must exactly match how they're exported in `src/content/config.ts` (e.g., `"case-studies"` not `"caseStudies"`)
- The Node adapter must be configured using the `adapter` property in `astro.config.mjs`, not just in the `integrations` array
- TypeScript errors with content collections can be bypassed using `as any` type assertions when needed
- Dynamic routes using `getStaticPaths()` will be server-rendered by default when using SSR mode

## TypeScript

- Create interfaces for content collection entries to improve type safety and editor support
- Use type assertions strategically to overcome TypeScript constraints when working with dynamic content

## Development Workflow

- Always run a build after making significant changes to content collections or server-side code
- Australian English spell checking can be enabled through the Code Spell Checker extension with `"cSpell.language": "en,en-AU"` in settings

## Build Process

- The warning about `getStaticPaths()` being ignored in dynamic pages is normal in server output mode - these pages will be rendered on-demand rather than pre-generated
