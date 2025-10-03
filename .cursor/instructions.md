# Cursor Project Instructions - Dale Rogers Portfolio

You are operating in a repository with guard rails enforced by hooks for safe, automated branch management.

## Workflow Overview

- **Each chat session** = one focused task on a semantic feature branch
- **Automatic branching**: Creates `type/scope/description__DDMMYYYY` branches off `develop`
- **Guard rails**: Protects sensitive files and prevents dangerous operations
- **Auto-merge**: Successful runs automatically merge to `develop`

## Always Do

- Propose **small, self-contained edits** that stay within maturity budget
- Keep all edits within **whitelisted paths** (src/, docs/, tests/, scripts/, etc.)
- Prefer **additive changes** over destructive rewrites unless explicitly requested
- If changes will exceed budget, **explicitly propose splitting** into smaller increments
- Write **clear commit titles** using Conventional Commit style
- Use **Australian English** spelling and conventions

## Never Do

- Run **risky shell commands** (git push, reset --hard, destructive file ops) especially on main/develop
- Edit **protected files** (.env\*, CI config, lockfiles, .cursor/, node_modules/, etc.)
- Exceed the **maturity budget** without proposing a split approach
- Make changes outside the **whitelisted paths**

## Portfolio-Specific Guidelines

### Component Development

- Follow the **component organization rules** in `.cursor/rules/`
- Create components in appropriate directories: `ui/`, `layout/`, `features/`, `sections/`
- Use **theme tokens** for all styling (no hardcoded values)
- Include **TypeScript types** and **documentation**
- Add **Playwright E2E tests** for UI components

### Theme System

- Always use **design tokens** from `src/styles/theme/`
- Support both **light and dark modes**
- Follow **Australian standards** for dates, currency, spelling
- Maintain **WCAG AA accessibility** standards

### Content Management

- Use **content collections** for structured content
- Follow **Australian English** conventions
- Maintain **consistent formatting** across all content

## Branch Naming Convention

Branches are automatically created as:

- `feat/ui/improve-hero-section__04102025` (feature in UI scope)
- `fix/theme/color-contrast-issues__04102025` (fix in theme scope)
- `docs/readme-update__04102025` (documentation update)
- `refactor/layout/navigation-structure__04102025` (refactor in layout scope)

## Maturity Levels

- **Bootstrap**: Up to 200 files, 20,000 lines (initial scaffolding)
- **Normal**: Up to 40 files, 4,000 lines (day-to-day development) ← **Current**
- **Strict**: Up to 12 files, 600 lines (near release or stability)

## Completion Summary

When finishing a task, provide:

1. **Files changed** and their purpose
2. **Rationale** for design decisions
3. **Follow-up tasks** or considerations
4. **Testing recommendations**

## Emergency Override

If you need to modify protected files or exceed budgets:

1. **Explicitly state** what needs to be changed and why
2. **Propose** updating the configuration first
3. **Request** manual intervention if needed

---

**Remember**: This is a **portfolio project** showcasing professional development practices. Maintain high code quality, comprehensive documentation, and thoughtful architecture decisions.
