# Case Studies Components

This directory contains enhanced components for displaying and managing case studies across the portfolio site, featuring improved typography, information layout, and visual presentation.

## Components

### CaseStudyCard

An enhanced card component for displaying case study previews with sophisticated styling and improved information architecture.

#### Features

- **Enhanced Typography**: Improved font hierarchy, spacing, and readability
- **Better Information Layout**: Structured metadata presentation with visual separation
- **Client Badge Overlay**: Prominent client identification on cover images
- **Interactive Elements**: Smooth hover animations and transitions
- **Responsive Design**: Optimised for all device sizes
- **Accessibility**: Proper semantic structure and ARIA support

#### Usage

```astro
---
import CaseStudyCard from "@/components/features/case-studies/components/CaseStudyCard.astro";
---

<CaseStudyCard
  title="Project Title"
  description="Project description"
  client="Client Name"
  industry="Industry"
  duration="3 months"
  tags={["Design", "Development", "Strategy"]}
  href="/work/project-slug"
  coverImage="/path/to/image.jpg"
/>
```

#### Enhanced Styling

- **Card Design**: Rounded corners (3xl), subtle borders, and enhanced shadows
- **Image Treatment**: 4:3 aspect ratio with smooth hover scaling and overlay effects
- **Typography**: Clear hierarchy with proper font weights and spacing
- **Metadata**: Structured presentation with background cards and proper contrast
- **Tags**: Interactive tag system with hover effects
- **Call-to-Action**: Clear "View Case Study" link with arrow animation

### CaseStudyHero

A dedicated hero component for case study pages providing enhanced visual impact and information hierarchy.

#### Features

- **Hero Layout**: Prominent title and metadata presentation
- **Project Overview**: Structured information cards for key details
- **Visual Hierarchy**: Clear separation of content sections
- **Responsive Design**: Optimised layout for all screen sizes
- **Icon Integration**: Meaningful icons for different information types

#### Usage

```astro
---
import CaseStudyHero from "@/components/features/case-studies/components/CaseStudyHero.astro";
---

<CaseStudyHero
  title="Project Title"
  description="Project description"
  client="Client Name"
  industry="Industry"
  duration="3 months"
  coverImage="/path/to/image.jpg"
  tags={["Design", "Development"]}
  pubDate={new Date()}
  author="Author Name"
/>
```

#### Layout Structure

1. **Title Section**: Large, prominent heading with proper typography
2. **Meta Information**: Date and author with icon indicators
3. **Tags**: Interactive tag display
4. **Overview Grid**: Two-column layout for project details and description
5. **Hero Image**: Large cover image with enhanced styling

### CaseStudyLayout

Enhanced layout component for individual case study pages with improved content presentation and typography.

#### Features

- **Hero Integration**: Uses CaseStudyHero for consistent presentation
- **Content Typography**: Enhanced typography for all content elements
- **Visual Elements**: Improved styling for images, blockquotes, and code blocks
- **Responsive Design**: Optimised for all device sizes
- **Accessibility**: Proper semantic structure and navigation

#### Content Styling

- **Headings**: Clear hierarchy with proper spacing and typography
- **Paragraphs**: Improved readability with proper line height and spacing
- **Lists**: Custom bullet points and enhanced spacing
- **Code Blocks**: Styled code blocks with proper contrast
- **Images**: Enhanced image presentation with shadows and rounded corners
- **Links**: Clear link styling with hover effects

## Enhanced Features

### Typography Improvements

1. **Font Hierarchy**: Clear distinction between heading levels
2. **Spacing**: Consistent spacing using design tokens
3. **Readability**: Improved line height and paragraph spacing
4. **Contrast**: Enhanced contrast for better accessibility

### Information Architecture

1. **Structured Layout**: Logical grouping of related information
2. **Visual Separation**: Clear boundaries between content sections
3. **Metadata Presentation**: Enhanced display of project details
4. **Content Flow**: Improved reading experience

### Visual Enhancements

1. **Card Design**: Modern card-based layout with subtle shadows
2. **Hover Effects**: Smooth animations and transitions
3. **Icon Integration**: Meaningful icons for different content types
4. **Color Usage**: Consistent use of theme tokens

### Responsive Design

1. **Mobile First**: Optimised for mobile devices
2. **Grid Layout**: Responsive grid system for different screen sizes
3. **Typography Scaling**: Appropriate font sizes for all devices
4. **Touch Interactions**: Optimised for touch devices

## Technical Implementation

### CSS Architecture

- **Component-Level Styles**: Dedicated CSS file for case studies
- **Theme Token Usage**: Consistent use of design system tokens
- **Responsive Design**: Mobile-first approach with breakpoint considerations
- **Performance**: Optimised animations and transitions

### Accessibility Features

- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA Support**: Appropriate ARIA attributes where needed
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper content structure for assistive technologies

### Performance Optimisations

- **Lazy Loading**: Images loaded with lazy loading
- **CSS Optimisation**: Efficient CSS with minimal redundancy
- **Animation Performance**: Hardware-accelerated animations
- **Responsive Images**: Appropriate image sizing for different devices

## Usage Examples

### Basic Case Study Card

```astro
<CaseStudyCard
  title="E-commerce Platform Redesign"
  description="Complete redesign of a major e-commerce platform focusing on user experience and conversion optimisation."
  client="Retail Corp"
  industry="E-commerce"
  duration="6 months"
  tags={["UX Design", "UI Design", "Development"]}
  href="/work/ecommerce-redesign"
  coverImage="/images/ecommerce-project.jpg"
/>
```

### Case Study Page Layout

```astro
<CaseStudyLayout caseStudy={caseStudy}>
  <h2>Project Background</h2>
  <p>Detailed project description...</p>

  <h3>Design Process</h3>
  <p>Design methodology and approach...</p>

  <h3>Results</h3>
  <ul>
    <li>Increased conversion rate by 25%</li>
    <li>Improved user satisfaction scores</li>
    <li>Reduced cart abandonment by 15%</li>
  </ul>
</CaseStudyLayout>
```

## Future Enhancements

1. **Interactive Elements**: Enhanced animations and micro-interactions
2. **Content Types**: Support for different content formats (video, interactive demos)
3. **Filtering**: Advanced filtering and search capabilities
4. **Analytics**: Integration with analytics for content performance tracking
5. **Social Sharing**: Enhanced social media integration
6. **Related Content**: Intelligent related case study suggestions

## Browser Support

- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: Optimised for iOS Safari and Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Accessibility**: WCAG AA compliance

## Performance Considerations

- **Image Optimisation**: Proper image sizing and compression
- **CSS Efficiency**: Minimal CSS with maximum functionality
- **Animation Performance**: Hardware-accelerated animations
- **Loading Strategy**: Progressive loading for better perceived performance
