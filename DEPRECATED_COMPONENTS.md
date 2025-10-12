# Deprecated Components - Springboards Refactor

**Generated**: October 12, 2025
**Status**: Documentation of components replaced in refactor

## Components Marked for Removal

The following components have been replaced by new Springboards-inspired components and can be safely removed after verification that no other pages reference them.

### Homepage Sections (Replaced)

| Old Component                  | Status                        | Replaced By          | Location                        |
| ------------------------------ | ----------------------------- | -------------------- | ------------------------------- |
| `AboutSection.astro`           | ✅ No longer used on homepage | `Philosophy.astro`   | `src/components/sections/home/` |
| `FeaturedServicesSlider.astro` | ✅ No longer used on homepage | `Offerings.astro`    | `src/components/sections/home/` |
| `Services.astro`               | ✅ No longer used on homepage | `Offerings.astro`    | `src/components/sections/home/` |
| `ServicesText.astro`           | ✅ No longer used on homepage | `Offerings.astro`    | `src/components/sections/home/` |
| `MyValues.astro`               | ✅ No longer used on homepage | `Philosophy.astro`   | `src/components/sections/home/` |
| `CaseStudiesBento.astro`       | ✅ No longer used on homepage | `WorkShowcase.astro` | `src/components/sections/home/` |

### UI Components (Potentially Replaced)

| Old Component                    | Status                      | Replaced By                       | Notes                               |
| -------------------------------- | --------------------------- | --------------------------------- | ----------------------------------- |
| `PageHeader.astro`               | ⚠️ Check usage              | `Heading.astro`                   | Still used in some pages            |
| `SectionHeading.astro`           | ✅ Replaced in policy pages | `Heading.astro`                   | Can be removed after full migration |
| `ArticleCard.astro` (features)   | ✅ Replaced in articles     | `CardArticle.astro` (ui)          | New unified card system             |
| `CaseStudyCard.astro` (features) | ⚠️ Check usage              | `CardWork.astro` (ui)             | May still be used in old pages      |
| `CaseStudyHero.astro` (features) | ✅ Replaced in layout       | Inline in `CaseStudyLayout.astro` | Simplified to direct markup         |

### Style Files (Potentially Deprecated)

| Old Style File                            | Status                   | Replaced By          | Notes                    |
| ----------------------------------------- | ------------------------ | -------------------- | ------------------------ |
| `src/styles/components/footer.css`        | ✅ Replaced              | `footer-modern.css`  | Old multi-column footer  |
| `src/styles/components/work-page.css`     | ⚠️ Check if still needed | Inline in components | May have skeleton styles |
| `src/styles/components/articles-page.css` | ⚠️ Check if still needed | Inline in components | May have skeleton styles |

## Removal Process

### Before Removal - Verification Steps

1. **Search for references**:

   ```bash
   grep -r "AboutSection" src/pages/ src/components/ src/layouts/
   grep -r "FeaturedServicesSlider" src/pages/ src/components/ src/layouts/
   grep -r "ServicesText" src/pages/ src/components/ src/layouts/
   ```

2. **Check import statements**:

   ```bash
   grep -r "import.*AboutSection" src/
   grep -r "import.*Services" src/
   grep -r "import.*MyValues" src/
   ```

3. **Verify build still works**:
   ```bash
   pnpm run build
   ```

### Safe to Remove (After Verification)

Once confirmed these components are not imported anywhere:

```bash
# Homepage sections
rm src/components/sections/home/AboutSection.astro
rm src/components/sections/home/FeaturedServicesSlider.astro
rm src/components/sections/home/Services.astro
rm src/components/sections/home/ServicesText.astro
rm src/components/sections/home/MyValues.astro
rm src/components/sections/home/CaseStudiesBento.astro

# Old UI components (after PageHeader migration)
rm src/components/ui/SectionHeading.astro

# Old feature components (after full migration)
rm src/components/features/case-studies/components/CaseStudyHero.astro
# (Keep CaseStudyCard and ArticleCard temporarily)

# Old style files
rm src/styles/components/footer.css
```

### Components to Keep (Still in Use)

| Component             | Reason                     | Action                      |
| --------------------- | -------------------------- | --------------------------- |
| `PartnerLogos.astro`  | Still used on homepage     | Keep, may modernize later   |
| `PageHeader.astro`    | May be used in other pages | Audit usage before removing |
| `CaseStudyCard.astro` | May be used in old pages   | Migrate fully, then remove  |
| `ArticleCard.astro`   | May be used in old pages   | Migrate fully, then remove  |

## Deprecated Styles

### CSS Classes No Longer Used

The following CSS classes from old components are no longer used:

- `.hero` (from old Hero.astro)
- `.hero__grid`
- `.hero__content`
- `.hero__visual`
- `.hero__headline`
- `.hero__headline-primary`
- `.hero__headline-secondary`
- `.hero__description`
- `.hero__actions`

These have been replaced by:

- `.hero-modern`
- `.hero-modern__content`
- `.hero-modern__headline`
- `.hero-modern__subheadline`
- `.hero-modern__actions`

### Style Files to Audit

1. `src/styles/components/hero.css` - Now contains only modern styles
2. `src/styles/components/footer.css` - Replaced by `footer-modern.css`
3. Component-specific styles in `global.css` - Migrated to component files

## Replacement Summary

### What Was Replaced

**8 old homepage components** → **4 new components**

- Better code organization
- Unified styling
- Consistent patterns
- ~50% reduction in component count

**3 different card types scattered across features/** → **3 unified cards in ui/**

- Consistent API
- Shared styling
- Better maintainability

**Manual heading markup** → **Heading & Kicker components**

- Consistent typography
- Easier to update
- Better accessibility

## Next Steps

1. ✅ Verify no references to deprecated components
2. ✅ Complete build test
3. ⏳ Remove deprecated components (after verification)
4. ⏳ Remove deprecated styles
5. ⏳ Update component index/README
6. ⏳ Update documentation

## Notes

- Do NOT remove components until 100% certain they're unused
- Keep old files temporarily for emergency rollback
- Document any components kept for specific use cases
- Update CHANGELOG.md with breaking changes

**Priority**: Medium
**Risk**: Low (old components not breaking anything by existing)
**Action**: Verify, then remove in cleanup phase
