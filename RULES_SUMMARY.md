# Cursor Rules Summary - Phase 1 Improvements

**Status**: Active (January 2025)
**Purpose**: Enforce Phase 1 aesthetic improvements and standards

## Overview

The `.cursor/rules/` directory now contains comprehensive rules to ensure all development follows the Phase 1 aesthetic improvements. These rules are **automatically enforced** during development.

---

## New Rules Created

### 1. **aesthetic-standards.mdc** ⭐ **PRIMARY RULE**

**Purpose**: Enforces all Phase 1 aesthetic standards

**Covers**:

- ✅ Service Design Leader color palette
- ✅ Theme token usage (no hardcoded colors)
- ✅ Unified animation system
- ✅ No inline styles
- ✅ Component stylesheet pattern

**When Applied**: Always (all `.astro`, `.ts`, `.tsx`, `.css` files)

**Key Requirements**:

- NEVER use hardcoded colors (e.g., `#FFFFFF`)
- ALWAYS use theme tokens (e.g., `var(--color-primary-contrast)`)
- NEVER create duplicate keyframes
- ALWAYS use unified animation system
- NO inline `style` attributes

**Reference**: `.cursor/rules/aesthetic-standards.mdc`

---

### 2. **content-voice.mdc** ⭐ **CONTENT RULE**

**Purpose**: Enforces content voice and tone standards

**Covers**:

- ✅ First-person professional voice
- ✅ Active voice requirements
- ✅ Australian English standards
- ✅ Vocabulary guidelines
- ✅ Content type patterns

**When Applied**: Always (all `.md`, `.mdx`, `.astro` content files)

**Key Requirements**:

- ALWAYS use first person ("I help..." not "Dale helps...")
- ALWAYS use active voice (80%+ target)
- ALWAYS use Australian English (organise, colour, centre)
- NO buzzwords or jargon without purpose
- FOLLOW content type guidelines

**Reference**: `.cursor/rules/content-voice.mdc`

---

### 3. **phase-1-improvements.mdc** ⭐ **MASTER RULE**

**Purpose**: Master rule tying all Phase 1 improvements together

**Covers**:

- ✅ Quick reference for all standards
- ✅ Pre-commit checklist
- ✅ Common violations and fixes
- ✅ Links to all documentation
- ✅ Auto-verification commands

**When Applied**: Always (all files)

**Key Features**:

- Complete pre-commit checklist
- Auto-verification bash commands
- Common violation examples with fixes
- Links to all related rules and docs

**Reference**: `.cursor/rules/phase-1-improvements.mdc`

---

### 4. **theme-system.mdc** (Updated)

**Purpose**: Theme system and color standards (UPDATED for Phase 1)

**Changes**:

- ✅ Updated to Service Design Leader palette
- ✅ Added animation system requirements
- ✅ Added references to implementation docs
- ✅ Updated examples to match new palette

**When Applied**: Always (styling-related files)

**Reference**: `.cursor/rules/theme-system.mdc`

---

### 5. **documentation.mdc** (Updated)

**Purpose**: Documentation standards (UPDATED with Phase 1 docs)

**Changes**:

- ✅ Added Phase 1 documentation section
- ✅ Links to all new documentation
- ✅ Navigation by role and task
- ✅ Quick reference guides

**When Applied**: When specified (documentation files)

**Reference**: `.cursor/rules/documentation.mdc`

---

## How Rules Are Enforced

### Automatic Enforcement

Cursor AI will **automatically**:

1. ✅ Check code against rules during development
2. ✅ Suggest fixes for violations
3. ✅ Warn about non-compliant patterns
4. ✅ Provide links to relevant documentation

### What Gets Checked

**Colors & Styling**:

- Hardcoded color values (`#FFFFFF`, `#0F2851`)
- Inline `style` attributes
- Missing component stylesheets
- Duplicate animation keyframes

**Content**:

- Third-person references to Dale
- American English spelling
- Passive voice patterns
- Buzzwords and jargon

**Structure**:

- Component organization
- Import statements
- Dark mode support
- TypeScript types

### Manual Verification

Run these before committing:

```bash
# Check for hardcoded colors
grep -r "#[0-9A-F]\{6\}" src/styles/components/ --color=always

# Check for inline styles
grep -r 'style=' src/components/ --color=always

# Check for third-person content
grep -r "Dale Rogers" src/content/ --color=always

# Check for American English
grep -r "ize\|ization\|behavior\|color[^-]" src/content/ --color=always
```

---

## Rule Priority Levels

### CRITICAL (Always Applied)

- **phase-1-improvements.mdc** - Master rule
- **aesthetic-standards.mdc** - Visual standards
- **content-voice.mdc** - Voice standards
- **theme-system.mdc** - Theme standards

### HIGH (Context Applied)

- **component-organization.mdc** - Component structure
- **development-standards.mdc** - Dev standards
- **documentation.mdc** - Documentation

### MEDIUM (Specific Contexts)

- **accessibility.mdc** - Accessibility
- **performance.mdc** - Performance
- Other existing rules

---

## Pre-Commit Checklist

Use this checklist before every commit:

### Colors & Styling

- [ ] No hardcoded colors (no `#` in CSS)
- [ ] All colors use `var(--color-*)` tokens
- [ ] No inline `style` attributes
- [ ] Component has stylesheet in `src/styles/components/`
- [ ] Dark mode styles included (`:root[data-theme="dark"]`)

### Animations

- [ ] No duplicate keyframe definitions
- [ ] Using unified animation system
- [ ] `prefers-reduced-motion` respected

### Content

- [ ] First-person voice ("I" not "Dale")
- [ ] Active voice (80%+)
- [ ] Australian English spelling
- [ ] No unnecessary buzzwords

### General

- [ ] TypeScript types updated
- [ ] Documentation updated
- [ ] Tests pass
- [ ] Linter errors fixed

---

## Documentation Quick Reference

### By Use Case

**"I'm writing content"**:

1. `.cursor/rules/content-voice.mdc`
2. `docs/CONTENT_VOICE_GUIDELINES.md`
3. `IMPROVEMENTS_SUMMARY.md`

**"I'm styling components"**:

1. `.cursor/rules/aesthetic-standards.mdc`
2. `docs/COLOR_PALETTE_OPTIONS.md`
3. `src/styles/theme/colors.ts`

**"I'm implementing animations"**:

1. `.cursor/rules/aesthetic-standards.mdc`
2. `docs/AESTHETIC_IMPROVEMENTS_IMPLEMENTATION.md#4-unified-animation-system`
3. `src/styles/animations.css`

**"I'm onboarding"**:

1. `.cursor/rules/phase-1-improvements.mdc`
2. `IMPROVEMENTS_SUMMARY.md`
3. `docs/INDEX.md`

### By Topic

| Topic             | Rule File                    | Documentation                                   |
| ----------------- | ---------------------------- | ----------------------------------------------- |
| **Colors**        | `aesthetic-standards.mdc`    | `docs/COLOR_PALETTE_OPTIONS.md`                 |
| **Content Voice** | `content-voice.mdc`          | `docs/CONTENT_VOICE_GUIDELINES.md`              |
| **Animations**    | `aesthetic-standards.mdc`    | `docs/AESTHETIC_IMPROVEMENTS_IMPLEMENTATION.md` |
| **Hero Design**   | N/A (future)                 | `docs/HERO_REDESIGN.md`                         |
| **Components**    | `component-organization.mdc` | `docs/COMPONENTS.md`                            |
| **Theme System**  | `theme-system.mdc`           | `docs/THEME_PROFESSIONAL.md`                    |

---

## Common Rule Violations

### 1. Hardcoded Color

❌ **Violation**:

```css
.my-element {
  color: #ffffff;
  background: #0f2851;
}
```

✅ **Fix**:

```css
.my-element {
  color: var(--color-primary-contrast);
  background: var(--color-primary-main);
}
```

**Rule**: `aesthetic-standards.mdc`

---

### 2. Inline Style

❌ **Violation**:

```astro
<Heading style="color: var(--color-text-primary);">Title</Heading>
```

✅ **Fix**:

```astro
<Heading class="hero-headline">Title</Heading>
```

```css
/* src/styles/components/hero.css */
.hero-headline {
  color: var(--color-text-primary);
}
```

**Rule**: `aesthetic-standards.mdc`

---

### 3. Third-Person Content

❌ **Violation**:

```markdown
Dale Rogers is a service designer who specializes in behavior change.
```

✅ **Fix**:

```markdown
I'm a service designer who specialises in behaviour change.
```

**Rule**: `content-voice.mdc`

---

### 4. Duplicate Animation

❌ **Violation**:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

✅ **Fix**:

```html
<!-- Use utility class -->
<div class="animate-fade-in-up">Content</div>
```

**Rule**: `aesthetic-standards.mdc`

---

## Rule Files Location

All rule files are in: `.cursor/rules/`

### New/Updated Rules (Phase 1)

- `aesthetic-standards.mdc` ⭐ NEW
- `content-voice.mdc` ⭐ NEW
- `phase-1-improvements.mdc` ⭐ NEW
- `theme-system.mdc` (UPDATED)
- `documentation.mdc` (UPDATED)

### Existing Rules (Unchanged)

- `component-organization.mdc`
- `development-standards.mdc`
- `accessibility.mdc`
- `performance.mdc`
- ... (and others)

---

## Testing Rule Compliance

### Automated Checks

Cursor AI will automatically check during development.

### Manual Testing

```bash
# Full audit
./.cursor/rules/phase-1-improvements.mdc  # Contains verification commands

# Quick checks
grep -r "#[0-9A-F]\{6\}" src/styles/  # Hardcoded colors
grep -r 'style=' src/components/       # Inline styles
grep -r "Dale Rogers" src/content/     # Third-person
```

### Pre-Commit Hook

Consider adding to `.husky/pre-commit` or `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Phase 1 compliance checks

echo "🎨 Checking for hardcoded colors..."
if grep -r "#[0-9A-F]\{6\}" src/styles/components/ --quiet; then
  echo "❌ Found hardcoded colors. Use theme tokens."
  exit 1
fi

echo "✨ Checking for inline styles..."
if grep -r 'style=' src/components/ --quiet; then
  echo "❌ Found inline styles. Use CSS classes."
  exit 1
fi

echo "✅ Phase 1 checks passed!"
```

---

## Getting Help

### Can't find a rule?

Check: `.cursor/rules/` directory or `RULES_SUMMARY.md` (this file)

### Don't understand a violation?

Check: `.cursor/rules/phase-1-improvements.mdc` - Common violations section

### Need documentation?

Check: `docs/INDEX.md` - Complete documentation index

### Rule seems wrong?

- Review: Implementation documentation
- Discuss: With team
- Update: Rule file if needed

---

## Rule Maintenance

### When to Update Rules

Update rules when:

- ✅ Phase standards change
- ✅ New patterns emerge
- ✅ Documentation updates
- ✅ Team feedback

### How to Update Rules

1. Edit rule file in `.cursor/rules/`
2. Update version number
3. Update documentation references
4. Test with sample violations
5. Commit changes

### Rule Versioning

- **Version 1.0**: Initial Phase 1 rules (January 2025)
- **Version 2.0**: (Future) Phase 2 additions
- **Version 3.0**: (Future) Phase 3 additions

---

## Summary

✅ **5 rules** created/updated for Phase 1
✅ **3 primary rules** (aesthetic-standards, content-voice, phase-1-improvements)
✅ **Automatic enforcement** via Cursor AI
✅ **Manual verification** commands available
✅ **Complete documentation** cross-referenced

**Your development environment now enforces Phase 1 aesthetic improvements automatically.** 🎉

---

**All rules are in**: `.cursor/rules/`
**All documentation is in**: `docs/` (see `docs/INDEX.md`)
**Quick start**: Read `IMPROVEMENTS_SUMMARY.md`
**Master rule**: `.cursor/rules/phase-1-improvements.mdc`

**Status**: ✅ ACTIVE and ENFORCED
