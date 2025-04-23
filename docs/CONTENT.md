# Content Standards

This document outlines the standards and best practices for creating and managing content in the Dale Rogers Portfolio project.

## Content Types

### 1. Case Studies

Case studies are detailed examinations of professional projects and are stored in `src/content/work/`.

```markdown
---
title: "Project Title"
description: "Brief project overview"
pubDate: "23/03/2024"
coverImage: "@/assets/images/case-studies/project-name.jpg"
tags: ["Service Design", "UX Research", "Digital Transformation"]
client: "Client Name"
duration: "6 months"
role: "Lead Service Designer"
status: "completed"
---

## Overview

Brief introduction to the project and its context.

## Challenge

Description of the problem or opportunity addressed.

## Approach

Methodology and steps taken to address the challenge.

## Outcomes

Results and impact of the project.

## Key Learnings

Insights and lessons learned from the project.
```

### 2. Articles

Articles are thought leadership pieces and industry insights stored in `src/content/think/`.

```markdown
---
title: "Article Title"
description: "Brief article overview"
pubDate: "23/03/2024"
coverImage: "@/assets/images/articles/article-name.jpg"
tags: ["Digital Strategy", "Innovation", "Leadership"]
status: "published"
---

## Introduction

Opening paragraph introducing the topic.

## Main Content

Article body with supporting points and evidence.

## Conclusion

Summary and key takeaways.
```

### 3. Scratch Posts

Scratch posts are technical experiments and coding explorations stored in `src/content/scratch/`.

```markdown
---
title: "Experiment Title"
description: "Brief experiment overview"
pubDate: "23/03/2024"
coverImage: "@/assets/images/scratch/experiment-name.jpg"
tags: ["TypeScript", "React", "Performance"]
status: "in-progress"
githubUrl: "https://github.com/username/repo"
liveUrl: "https://demo.example.com"
---

## Purpose

Explanation of what the experiment aims to achieve.

## Implementation

Technical details and code examples.

## Results

Outcomes and findings from the experiment.

## Next Steps

Planned improvements or future explorations.
```

## Content Guidelines

### 1. Writing Style

- Use Australian English spelling and grammar
- Write in a professional, clear tone
- Use active voice
- Keep paragraphs concise (3-4 sentences)
- Use proper heading hierarchy

### 2. Formatting

- Use Markdown for content structure
- Include proper frontmatter metadata
- Follow consistent date format (DD/MM/YYYY)
- Use relative paths for internal links
- Optimise images before inclusion

### 3. Images

- Store in appropriate assets directory
- Use descriptive filenames
- Provide alt text for accessibility
- Optimise for web performance
- Maintain consistent aspect ratios

### 4. Metadata

- Include all required frontmatter fields
- Use consistent tag naming
- Provide accurate descriptions
- Set appropriate status values
- Include relevant dates

## Content Creation Workflow

1. **Planning**

   - Identify content type
   - Define target audience
   - Outline key messages
   - Gather supporting materials

2. **Creation**

   - Write content in Markdown
   - Add required metadata
   - Include optimised images
   - Review for accuracy

3. **Review**

   - Check spelling and grammar
   - Verify metadata completeness
   - Test image loading
   - Validate links

4. **Publication**
   - Set appropriate status
   - Add to content collection
   - Update related content
   - Test rendering

## Best Practices

1. **Content Organisation**

   - Use consistent file naming
   - Maintain proper directory structure
   - Group related content
   - Update content collections

2. **SEO Optimisation**

   - Write descriptive titles
   - Include meta descriptions
   - Use appropriate tags
   - Implement proper heading structure

3. **Accessibility**

   - Provide alt text for images
   - Use semantic markup
   - Maintain proper contrast
   - Include descriptive links

4. **Version Control**
   - Commit content changes separately
   - Write clear commit messages
   - Review changes before pushing
   - Maintain content history

## Content Status Values

- `draft`: Initial content creation
- `in-progress`: Active development
- `review`: Ready for review
- `published`: Live content
- `archived`: Historical content
- `abandoned`: Discontinued content

## Resources

- [Markdown Guide](https://www.markdownguide.org)
- [Australian Style Manual](https://stylemanual.gov.au)
- [Content Collections](https://docs.astro.build/en/guides/content-collections)
- [Image Optimisation](https://docs.astro.build/en/guides/images)
