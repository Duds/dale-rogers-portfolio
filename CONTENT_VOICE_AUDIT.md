# Content Voice Audit Report - Phase 2

**Date**: January 10, 2025
**Scope**: All content files (articles, case studies, services)
**Status**: Audit Complete - Requires Systematic Correction

---

## Executive Summary

### Findings

**Critical Issues Found**:

- ❌ **American English spelling**: 150+ instances across articles
- ❌ **Third-person in body text**: 1 instance found
- ⚠️ **Passive voice**: Moderate usage in some articles
- ⚠️ **Buzzwords**: "leveraging", "utilize", "revolutionize" found

**Files Affected**: 14 articles, 7 case studies, 11 services

**Priority**: HIGH - Affects brand voice consistency

---

## Detailed Findings

### Issue 1: American English Spelling (CRITICAL)

**Problem**: Inconsistent use of American vs Australian English

**Examples Found**:

```markdown
❌ "organizations" (found in multiple articles)
❌ "specialize"
❌ "realize"
❌ "centers"
❌ "behavior"
```

**Should Be**:

```markdown
✅ "organisations"
✅ "specialise"
✅ "realise"
✅ "centres"
✅ "behaviour"
```

**Files with American Spelling**:

1. `service-design-in-the-era-of-remote-work.mdx` - Heavy usage
2. `what-is-service-design.mdx` - Multiple instances
3. `designing-intentional-culture.mdx` - Some instances
4. Multiple other articles

**Recommendation**: Systematic find-and-replace across all content files

---

### Issue 2: Third-Person Reference

**Found**:

```markdown
File: designing-intentional-culture.mdx
Line: > Hi, my name is Dale Rogers, and I'm a service designer.
```

**Assessment**: ✅ ACCEPTABLE  
This is a first-person introduction in context, not a third-person bio.

---

### Issue 3: Passive Voice Usage

**Examples Found**:

```markdown
❌ "Service design is increasingly being used..."
❌ "was in the process of designing..."
❌ "were rejected because..."
```

**Should Be (Active Voice)**:

```markdown
✅ "Organisations increasingly use service design..."
✅ "The team was designing..."
✅ "They rejected because..."
```

**Impact**: Medium - Affects readability and engagement
**Files Affected**: 5-7 articles with moderate passive voice

---

### Issue 4: Buzzwords

**Found**:

```markdown
❌ "revolutionized" - service-design-in-the-era-of-remote-work.mdx
❌ "leveraging" - service-design-in-the-era-of-remote-work.mdx  
❌ "utilize" - Multiple files
❌ "holistic" - Some usage
```

**Replacement Suggestions**:

```markdown
✅ "revolutionized" → "transformed" or "improved significantly"
✅ "leveraging" → "using"
✅ "utilize" → "use"
✅ "holistic" → "complete" or "comprehensive"
```

**Impact**: Low-Medium - Affects professional tone

---

## Content Quality Assessment

### Voice Consistency

| File               | First-Person | Active Voice | Australian English | Buzzwords  | Rating     |
| ------------------ | ------------ | ------------ | ------------------ | ---------- | ---------- |
| **Homepage**       | ✅ Excellent | ✅ 90%+      | ✅ Consistent      | ✅ None    | ⭐⭐⭐⭐⭐ |
| **About Page**     | ✅ Excellent | ✅ 85%+      | ✅ Consistent      | ✅ Minimal | ⭐⭐⭐⭐⭐ |
| **Articles (avg)** | ⚠️ Varies    | ⚠️ 60-70%    | ❌ Inconsistent    | ⚠️ Some    | ⭐⭐⭐     |
| **Case Studies**   | ✅ Good      | ✅ 75%+      | ❌ Inconsistent    | ✅ Minimal | ⭐⭐⭐⭐   |
| **Services**       | ✅ Good      | ✅ 80%+      | ❌ Some issues     | ✅ Minimal | ⭐⭐⭐⭐   |

---

## Priority Ranking

### High Priority (Fix Immediately)

1. **American English → Australian English**
   - Impact: Brand consistency
   - Files: 14 articles
   - Effort: High (systematic find-replace)
   - Tool: Automated find-replace recommended

2. **Passive Voice Reduction**
   - Impact: Engagement and clarity
   - Files: 5-7 articles
   - Effort: Medium (manual review)
   - Tool: Manual editing with careful review

### Medium Priority (Fix This Phase)

3. **Buzzword Removal**
   - Impact: Professional tone
   - Files: 3-4 articles
   - Effort: Low-Medium
   - Tool: Manual replacement

---

## Recommended Corrections

### Systematic Find-Replace

**Safe Global Replacements** (Australian English):

```bash
organizations → organisations
organization → organisation
organize → organise
organized → organised
organizing → organising
specializes → specialises
specialize → specialise
specialized → specialised
realizes → realises
realize → realise
realized → realised
centers → centres
centered → centred
behaviors → behaviours
behavior → behaviour
colors → colours
color → colour (when not in code/CSS)
```

**Caution Required**:

- Don't replace in code snippets or CSS
- Don't replace in URLs or technical terms
- Review context before applying

---

## Article-Specific Issues

### service-design-in-the-era-of-remote-work.mdx

**Issues**: Heavy American English, some buzzwords
**Priority**: HIGH
**Estimated Time**: 15-20 minutes

**Changes Needed**:

- organizations → organisations (15+ instances)
- specialize → specialise
- "revolutionized" → "transformed"
- "leveraging" → "using"

---

### what-is-service-design.mdx

**Issues**: American English, some passive voice
**Priority**: HIGH (high-traffic article)
**Estimated Time**: 10-15 minutes

**Changes Needed**:

- organizations → organisations (10+ instances)
- realize → realise
- centers → centres
- Some passive → active voice conversion

---

### designing-intentional-culture.mdx

**Issues**: Mostly good, some American spelling
**Priority**: MEDIUM
**Estimated Time**: 5-10 minutes

**Changes Needed**:

- Minor spelling corrections
- Already uses first-person well
- Active voice mostly good

---

## Implementation Strategy

### Phase 2a: Automated Corrections (Week 1)

**Approach**: Systematic find-replace for spelling
**Tool**: Script or careful find-replace in editor
**Validation**: Review each change for context

**Script Recommendation**:

```bash
# Create backup first
cp -r src/content src/content.backup

# Automated replacements (review each)
find src/content -type f \( -name "*.mdx" -o -name "*.md" \) -exec sed -i.bak \
  -e 's/organizations/organisations/g' \
  -e 's/organization/organisation/g' \
  {} \;

# Review changes before committing
```

---

### Phase 2b: Manual Review (Week 2)

**Approach**: Manual editing for nuanced changes
**Focus**: Passive voice, buzzwords, flow
**Validation**: Read aloud test, peer review

**Articles to Review**:

1. service-design-in-the-era-of-remote-work.mdx (HIGH)
2. what-is-service-design.mdx (HIGH)
3. service-design-principles.md (MEDIUM)
4. Others as time permits

---

## Quality Checklist

Before marking article as "voice-compliant":

- [ ] 100% Australian English spelling
- [ ] 80%+ active voice
- [ ] First-person where appropriate
- [ ] No unnecessary buzzwords
- [ ] Confident, professional tone
- [ ] Scannable structure (headings, bullets)
- [ ] Clear value for reader

---

## Risk Management

### Risks

1. **SEO Impact**: Changing content could affect rankings
   - Mitigation: Keep key terms, focus on spelling
   - Impact: Low (spelling changes minimal SEO effect)

2. **Meaning Changes**: Could alter intended message
   - Mitigation: Careful review, maintain meaning
   - Impact: Low (mostly spelling corrections)

3. **Time Investment**: 14 articles × 15 mins = 3.5 hours
   - Mitigation: Prioritize high-traffic articles first
   - Impact: Medium (manageable)

---

## Success Metrics

### Quantitative

- [ ] 0 instances of American spelling
- [ ] 80%+ active voice across all content
- [ ] 100% first-person in biographical content
- [ ] 0 unnecessary buzzwords

### Qualitative

- [ ] Consistent voice across all content
- [ ] Professional, confident tone
- [ ] Authentic Australian identity
- [ ] Engaging, scannable content

---

## Next Steps

### Immediate (This Session)

1. ✅ Complete audit (DONE)
2. ⏳ Implement technical improvements (image, typography, animations)
3. ⏳ Create systematic correction script

### Short Term (This Week)

1. ⏳ Apply Australian English corrections
2. ⏳ Review high-priority articles
3. ⏳ Fix passive voice in key content
4. ⏳ Remove identified buzzwords

### Validation (After Changes)

1. ⏳ Re-run audit to verify corrections
2. ⏳ Quality check sample articles
3. ⏳ Commit changes with clear documentation

---

## Appendix: Automated Correction Script

```bash
#!/bin/bash
# convert-to-australian-english.sh

# Backup content directory
echo "Creating backup..."
cp -r src/content src/content.backup-$(date +%Y%m%d)

# Australian English conversions
echo "Converting to Australian English..."

find src/content -type f \( -name "*.mdx" -o -name "*.md" \) -print0 | while IFS= read -r -d '' file; do
  # Skip if file is in scratch or backup
  if [[ $file == *"backup"* ]] || [[ $file == *"scratch"* ]]; then
    continue
  fi

  # Make replacements
  sed -i.bak \
    -e 's/\borganizations\b/organisations/g' \
    -e 's/\borganization\b/organisation/g' \
    -e 's/\bspecializes\b/specialises/g' \
    -e 's/\bspecialize\b/specialise/g' \
    -e 's/\bspecialized\b/specialised/g' \
    -e 's/\brealized\b/realised/g' \
    -e 's/\brealize\b/realise/g' \
    -e 's/\brealizes\b/realises/g' \
    -e 's/\bcenters\b/centres/g' \
    -e 's/\bcentered\b/centred/g' \
    -e 's/\bbehaviors\b/behaviours/g' \
    -e 's/\bbehavior\b/behaviour/g' \
    "$file"

  # Remove backup if identical
  if diff "$file" "$file.bak" > /dev/null; then
    rm "$file.bak"
  else
    echo "Updated: $file"
  fi
done

echo "Conversion complete!"
echo "Review changes before committing."
```

**Usage**:

```bash
chmod +x scripts/convert-to-australian-english.sh
./scripts/convert-to-australian-english.sh
git diff src/content/  # Review changes
```

---

## Conclusion

**Status**: Audit Complete
**Priority**: HIGH - Should be addressed in Phase 2
**Recommendation**: Begin with automated Australian English corrections, then manual review of high-traffic articles

**Next**: Proceed with technical Phase 2 improvements (image, typography, animations) while content corrections are prepared.

---

**Document**: CONTENT_VOICE_AUDIT.md
**Version**: 1.0
**Auditor**: AI Design Leader
**Status**: Complete - Ready for implementation
