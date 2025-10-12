# Content Voice Maintenance Guidelines

**Version**: 1.0
**Date**: 12 January 2025
**Status**: Active
**Scope**: All content (articles, pages, components, meta descriptions)

---

## Purpose

This document provides practical guidelines for maintaining consistent Australian English, active voice, and professional tone across all portfolio content. These standards ensure Dale Rogers' authentic voice remains consistent as the portfolio evolves.

---

## Quick Reference Checklist

Before publishing ANY content:

- [ ] Australian English spelling (100%)
- [ ] Active voice (80%+)
- [ ] First-person where appropriate
- [ ] No corporate buzzwords
- [ ] Professional, confident tone
- [ ] No inline styles (use CSS classes)

---

## 1. Australian English Spelling

### Always Use

| ✅ Australian | ❌ American  |
| ------------- | ------------ |
| organisation  | organization |
| specialise    | specialize   |
| realise       | realize      |
| centre        | center       |
| behaviour     | behavior     |
| colour        | color        |
| recognise     | recognize    |
| analyse       | analyze      |
| optimise      | optimize     |
| labour        | labor        |
| favour        | favor        |

### Quick Test

```bash
# Check for American spelling
grep -r "ize\|ization" src/content/ src/pages/
grep -r "organization" src/content/ src/pages/
grep -r "behavior" src/content/ src/pages/
```

---

## 2. Active Voice

### Prefer Active Voice

**❌ Passive**: "Service design is being used by organisations..."
**✅ Active**: "Organisations use service design..."

**❌ Passive**: "The project was delivered by our team..."
**✅ Active**: "Our team delivered the project..."

**❌ Passive**: "Skills are obtained through training..."
**✅ Active**: "You obtain skills through training..."

### How to Identify Passive Voice

Look for these patterns:

- "is/was/were + [verb]ing"
- "is/was/were + [past participle]"
- "by [person/thing]" (agent)

### Quick Test

```bash
# Search for passive voice indicators
grep -r "is being\|was being\|are being" src/content/
grep -r "is used by\|was used by" src/content/
grep -r "are obtained\|were obtained" src/content/
```

---

## 3. Buzzwords to Avoid

### Forbidden Words

| ❌ Avoid        | ✅ Use Instead |
| --------------- | -------------- |
| leverage        | use            |
| utilize         | use            |
| revolutionize   | transform      |
| synergize       | collaborate    |
| holistic        | complete       |
| paradigm        | approach       |
| next-generation | modern         |
| cutting-edge    | advanced       |
| game-changing   | transformative |

### Quick Test

```bash
# Check for buzzwords
grep -ri "leverage\|utilizing\|revolutioniz" src/content/
grep -ri "synerg\|paradigm\|cutting-edge" src/content/
```

---

## 4. First-Person Voice

### When to Use First-Person

✅ **Use "I"**:

- About sections
- Personal philosophy
- Work experience
- Project descriptions

✅ **Use "We"**:

- Team collaboration
- Client work
- Co-created solutions

❌ **Never Third-Person**:

- "Dale Rogers is..." → "I'm..."
- "He specializes in..." → "I specialise in..."

### Exception

Third-person acceptable ONLY in:

- Meta descriptions for SEO
- Author bios on external platforms
- Client testimonials

---

## 5. Professional Tone

### Confident Without Arrogance

**❌ Too Tentative**:

> I've had the opportunity to work with some organisations...

**❌ Too Arrogant**:

> As one of Australia's leading service designers...

**✅ Confident & Direct**:

> I've worked with government and enterprise organisations for over a decade...

### Practical Over Academic

**❌ Too Academic**:

> Service design employs ethnographic methodologies and systems thinking paradigms...

**✅ Practical & Clear**:

> Service design combines user research, systems thinking, and strategic design...

---

## 6. Style Standards

### No Inline Styles

**❌ Forbidden**:

```astro
<div style="color: var(--color-text-primary);">Content</div>
<p style="background-color: var(--color-background-secondary);">Text</p>
```

**✅ Correct**:

```astro
<div class="text-text-primary">Content</div>
<p class="bg-background-secondary">Text</p>
```

### Use Theme Tokens

**❌ Hardcoded**:

```css
color: #0f2851;
background: #ffffff;
```

**✅ Theme Tokens**:

```css
color: var(--color-primary-main);
background: var(--color-background-primary);
```

---

## 7. Content Types

### Articles & Blog Posts

**Required**:

- Title in sentence case
- Meta description (140-160 characters)
- Reading time estimate
- Featured image with alt text
- Tags (3-5 relevant)

**Voice**:

- First-person perspective
- Conversational yet professional
- Active voice (80%+)
- Practical insights

**Example Meta Description**:

```markdown
description: "I explore how organisations can use service design to transform digital services and create better user experiences across government and enterprise sectors."
```

### Case Studies

**Structure**:

1. **Challenge** - What the client faced
2. **Approach** - How I tackled it
3. **Outcome** - What was achieved
4. **Insights** - What I learned

**Voice**:

- "I" for personal contributions
- "We" for team collaboration
- Results-oriented
- Evidence-based

### Service Pages

**Structure**:

1. **What It Is** - Clear definition
2. **When You Need It** - Problem/opportunity
3. **How It Works** - Process overview
4. **What You Get** - Deliverables/outcomes

**Voice**:

- Address reader as "you"
- Focus on benefits
- Use concrete examples

### Static Pages

**About/Values**:

- First-person throughout
- Authentic and personal
- Professional tone

**Contact**:

- Direct and welcoming
- Clear calls-to-action
- Professional availability

---

## 8. Component Text

### Button Labels

**✅ Good**:

- "Get in touch"
- "Start a conversation"
- "View case study"
- "Read more"

**❌ Avoid**:

- "Click here"
- "Submit"
- "Learn more" (overused)

### Form Labels

**✅ Clear & Direct**:

- "Your name"
- "Email address"
- "Tell me about your project"

**❌ Avoid**:

- "Name field"
- "Enter email"
- "Message textarea"

### Navigation

**✅ Concise**:

- "Work"
- "Articles"
- "Services"
- "About"
- "Contact"

---

## 9. Meta Descriptions & SEO

### Guidelines

**Length**: 140-160 characters
**Voice**: Can use third-person for SEO
**Australian English**: Always
**Keywords**: Natural integration

### Templates

**Homepage**:

```
Dale Rogers is a service designer based in Canberra, Australia, helping organisations transform digital services through strategic design and user research.
```

**Article**:

```
[Brief summary in first-person]. Practical insights on [topic] from [years] of experience in service design and digital transformation.
```

**Service**:

```
[Service name] services to help Australian organisations [benefit]. Expert service design support for government, education, and enterprise sectors.
```

### Quick Test

```bash
# Check meta description length
grep -r 'description:' src/content/ | awk -F'"' '{print $2}' | awk 'length($0)>160'
```

---

## 10. Quarterly Audit Process

### Every 3 Months

**Week 1: Content Audit**

- [ ] Check new content for voice consistency
- [ ] Search for American spelling
- [ ] Review passive voice usage
- [ ] Check for buzzwords

**Week 2: Component Review**

- [ ] Review button labels
- [ ] Check form text
- [ ] Verify navigation clarity
- [ ] Update error messages

**Week 3: SEO Check**

- [ ] Review meta descriptions
- [ ] Check page titles
- [ ] Verify alt text
- [ ] Update sitemap

**Week 4: Documentation**

- [ ] Update guidelines if needed
- [ ] Document common issues
- [ ] Share findings with team
- [ ] Update Cursor rules

---

## 11. Automated Tools

### Pre-Commit Checks

The project uses automated checks:

1. **Prettier** - Formatting
2. **ESLint** - Code quality
3. **Custom Checks** - Theme tokens

### Manual Checks

```bash
# Australian English
find src -type f -name "*.mdx" -o -name "*.astro" | xargs grep -l "organization"

# Buzzwords
find src -type f -name "*.mdx" -o -name "*.astro" | xargs grep -li "leverage\|utilize"

# Inline styles
find src -type f -name "*.astro" | xargs grep -l 'style='

# Passive voice (common patterns)
find src -type f -name "*.mdx" | xargs grep -l "is being\|are being"
```

### Conversion Script

Use the automated conversion script:

```bash
# Located at: scripts/convert-to-australian-english.sh
./scripts/convert-to-australian-english.sh

# Review changes
git diff src/content/

# Commit if satisfied
git add src/content && git commit -m "fix(content): apply Australian English"
```

---

## 12. Common Mistakes & Fixes

### Mistake 1: American Spelling

**Before**:

> Organizations must optimize their digital services to realize value.

**After**:

> Organisations must optimise their digital services to realise value.

### Mistake 2: Passive Voice

**Before**:

> The service was designed by our team to meet user needs.

**After**:

> Our team designed the service to meet user needs.

### Mistake 3: Buzzwords

**Before**:

> Leveraging cutting-edge methodologies to revolutionize service delivery.

**After**:

> Using proven methods to transform service delivery.

### Mistake 4: Third-Person

**Before**:

> Dale Rogers is a service designer who specializes in digital transformation.

**After**:

> I'm a service designer who specialises in digital transformation.

### Mistake 5: Inline Styles

**Before**:

```astro
<div style="color: var(--color-text-primary);">Content</div>
```

**After**:

```astro
<div class="text-text-primary">Content</div>
```

---

## 13. Resources

### Documentation

- **Content Voice Guidelines**: `docs/CONTENT_VOICE_GUIDELINES.md` (18 pages)
- **Implementation Summary**: `CONTENT_VOICE_IMPLEMENTATION_SUMMARY.md`
- **Complete Report**: `CONTENT_VOICE_COMPLETE.md`

### Cursor Rules

- **Content Voice**: `.cursor/rules/content-voice.mdc`
- **Aesthetic Standards**: `.cursor/rules/aesthetic-standards.mdc`
- **Phase 1 Master**: `.cursor/rules/phase-1-improvements.mdc`

### Tools

- **Conversion Script**: `scripts/convert-to-australian-english.sh`
- **Health Check**: `pnpm run dev:health`
- **Type Check**: `pnpm run type-check`
- **Lint**: `pnpm run lint`

---

## 14. Approval Process

### For New Content

1. **Self-Review**: Use checklist above
2. **Automated Check**: Run linters
3. **Manual Review**: Check voice consistency
4. **Commit**: Use semantic commit message

### For Major Changes

1. **Draft**: Write content
2. **Self-Review**: Apply checklist
3. **Automated**: Run all checks
4. **Team Review**: Get feedback
5. **Revise**: Address comments
6. **Publish**: Deploy to production

---

## 15. Contact & Questions

### For Content Questions

**Primary Contact**: Dale Rogers
**Documentation**: This guideline + linked docs
**Tools**: Cursor rules + automation scripts

### For Technical Questions

**Code Issues**: Check `.cursor/rules/`
**Build Issues**: Run `pnpm run dev:health`
**Style Issues**: Check `docs/AESTHETIC_IMPROVEMENTS_IMPLEMENTATION.md`

---

## Version History

| Version | Date            | Changes                       |
| ------- | --------------- | ----------------------------- |
| 1.0     | 12 January 2025 | Initial release after Phase 2 |

---

## Next Review

**Due**: April 2025 (Q2 2025)
**Reviewer**: Dale Rogers
**Focus**: Effectiveness of guidelines, new issues identified

---

**Document**: CONTENT_VOICE_MAINTENANCE_GUIDELINES.md
**Owner**: Dale Rogers
**Status**: Active
**Last Updated**: 12 January 2025
