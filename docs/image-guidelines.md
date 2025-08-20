# Image Guidelines & Visual Consistency Guide

## Overview
This document provides guidelines for selecting, implementing, and maintaining consistent imagery across the Dale Rogers Portfolio website.

## Image Selection Principles

### 1. **Contextual Relevance**
- Images must directly relate to the content they accompany
- Avoid generic stock photos that don't add value
- Consider the Australian business context where relevant

### 2. **Professional Quality**
- Use high-resolution images (minimum 1200px width)
- Ensure good lighting and composition
- Avoid overly staged or artificial-looking photos
- Prefer natural, authentic business environments

### 3. **Visual Consistency**
- Maintain consistent color temperature and mood
- Use similar composition styles across related content
- Ensure images work well in both light and dark themes

## Image Categories & Guidelines

### **Case Studies**
- **Technology/Software**: Modern office environments, digital interfaces, collaboration spaces
- **Government**: Professional meeting rooms, government buildings, document processes
- **Healthcare**: Medical facilities, patient care environments, healthcare technology
- **Education**: University campuses, learning environments, student collaboration
- **Mining/Resources**: Industrial operations, project management, safety systems

### **Services**
- **Strategy**: Business planning, strategic thinking, collaboration
- **Design**: Creative processes, design thinking, user experience
- **Research**: Data analysis, user research, testing environments
- **Implementation**: Technology deployment, system integration, change management

### **General Business**
- **Collaboration**: Team meetings, workshops, co-working spaces
- **Innovation**: Creative spaces, brainstorming, technology labs
- **Professional**: Business meetings, presentations, corporate environments

## Technical Specifications

### **Image Dimensions**
- **Hero Images**: 2070px × 1200px (16:9 ratio)
- **Cover Images**: 2070px × 1200px (16:9 ratio)
- **Thumbnails**: 800px × 600px (4:3 ratio)
- **Profile Images**: 800px × 800px (1:1 ratio)

### **File Format & Quality**
- **Format**: JPEG for photos, PNG for graphics with transparency
- **Quality**: 80-85% JPEG compression for optimal file size
- **File Size**: Maximum 500KB for web optimization

### **Unsplash Parameters**
```
https://images.unsplash.com/photo-[ID]?q=80&w=2070&auto=format&fit=crop
```

## Accessibility Requirements

### **Alt Text Guidelines**
- **Descriptive**: Explain what the image shows and its context
- **Contextual**: Include why the image is relevant to the content
- **Concise**: Keep under 125 characters when possible
- **Meaningful**: Avoid generic descriptions like "image" or "photo"

### **Alt Text Examples**
✅ **Good**: "Modern university campus with contemporary architecture, representing digital transformation and innovation in higher education"

❌ **Poor**: "University building" or "Campus photo"

### **Color & Contrast**
- Ensure images have sufficient contrast for accessibility
- Test images in both light and dark themes
- Avoid images that rely solely on color to convey information

## Implementation Standards

### **Component Usage**
```astro
<img
  src="https://images.unsplash.com/photo-[ID]?q=80&w=2070&auto=format&fit=crop"
  alt="Descriptive alt text explaining the image content and context"
  class="object-cover w-full h-full"
  width="800"
  height="600"
/>
```

### **Advanced Image Components**
For optimal performance and user experience, use these specialized components:

#### **LazyImage Component**
```astro
<LazyImage
  src="https://images.unsplash.com/photo-[ID]?q=80&w=2070&auto=format&fit=crop"
  alt="Descriptive alt text"
  width="800"
  height="600"
  priority={false}
  placeholder="custom-placeholder.svg"
/>
```

#### **OptimizedImage Component**
```astro
<OptimizedImage
  src="https://images.unsplash.com/photo-[ID]?q=80&w=2070&auto=format&fit=crop"
  alt="Descriptive alt text"
  width="800"
  height="600"
  priority={true}
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={80}
/>
```

#### **ImageCache Component**
```astro
<ImageCache
  src="https://images.unsplash.com/photo-[ID]?q=80&w=2070&auto=format&fit=crop"
  alt="Descriptive alt text"
  width="800"
  height="600"
  priority={false}
  cacheStrategy="cache-first"
/>
```

### **Content Frontmatter**
```yaml
coverImage: "https://images.unsplash.com/photo-[ID]?q=80&w=2070&auto=format&fit=crop"
image:
  src: "https://images.unsplash.com/photo-[ID]?q=80&w=2070&auto=format&fit=crop"
  alt: "Descriptive alt text"
```

## Performance Optimization

### **Lazy Loading**
- **Above the fold**: Use `priority={true}` for hero images and critical content
- **Below the fold**: Use `priority={false}` for images that appear after scrolling
- **Intersection Observer**: Automatically loads images when they come into view
- **Placeholder images**: Shows blurred placeholders while loading

### **WebP Support**
- **Automatic format detection**: Serves WebP to supported browsers
- **Fallback support**: JPEG fallback for older browsers
- **Responsive images**: Multiple sizes for different screen densities
- **Quality optimization**: Configurable compression levels

### **Image Caching**
- **Service Worker**: Offline caching and background updates
- **Cache strategies**: 
  - `cache-first`: Fast loading for static images
  - `network-first`: Always fresh for dynamic content
  - `stale-while-revalidate`: Fast loading with background updates
- **Automatic cleanup**: Removes old cached images to manage storage

### **Performance Monitoring**
- **Loading metrics**: Track image load times and performance
- **Cache hit rates**: Monitor cache effectiveness
- **User experience**: Measure perceived performance improvements

## Quality Assurance & Auditing

### **Automated Image Audits**
Run comprehensive image audits to ensure compliance:

```bash
# Full accessibility and performance audit
pnpm run audit:images

# Audit with automatic fixes (where possible)
pnpm run audit:images:fix
```

### **Audit Coverage**
The audit system checks for:

#### **Accessibility Compliance**
- ✅ Alt text presence and quality
- ✅ Alt text length (10-125 characters)
- ✅ Contextual relevance
- ✅ Screen reader compatibility

#### **Performance Optimization**
- ✅ Unsplash parameter optimization
- ✅ Image dimensions and quality
- ✅ Loading strategies
- ✅ Caching implementation

#### **Technical Standards**
- ✅ Image format consistency
- ✅ URL parameter standardization
- ✅ Component usage patterns
- ✅ Error handling

### **Audit Reports**
Detailed reports include:
- **Summary statistics**: Total images, compliance rates, issue counts
- **Issue details**: File locations, specific problems, recommended fixes
- **Priority levels**: High, medium, and low priority recommendations
- **Action items**: Specific steps to resolve each issue

### **Continuous Monitoring**
- **Pre-commit hooks**: Automatic audits before code commits
- **CI/CD integration**: Automated testing in deployment pipelines
- **Regular reviews**: Scheduled audits for ongoing maintenance
- **Performance tracking**: Monitor improvements over time

## Image Library Management

### **Current Image Inventory**
- **Antarctic**: `photo-1558618666-fcd25c85cd64` - Extreme environments
- **University**: `photo-1606761568499-6d2451b23c66` - Higher education
- **Travel**: `photo-1575429198097-0414ec08e8cd` - Journey mapping
- **Business**: `photo-1554224155-6726b3ff858f` - Professional meetings
- **Manufacturing**: `photo-1563013544-824ae1b704d3` - Quality control
- **Mining**: `photo-1581092160562-40aa08e78837` - Industrial operations
- **Airport**: `photo-1488085061387-422e29b40080` - Security/verification
- **Healthcare**: `photo-1576091160399-112ba8d25d1f` - Medical services
- **E-commerce**: `photo-1556742049-0cfed4f6a45d` - Digital commerce
- **Government**: `photo-1512758017271-d7b84c2113f1` - Public services

### **Image Reuse Guidelines**
- **Avoid**: Using the same image for multiple unrelated services
- **Prefer**: Unique images for each service/case study
- **Acceptable**: Similar images for related content (e.g., different healthcare contexts)

### **Performance Tracking**
- **Cache hit rates**: Monitor how often images are served from cache
- **Load times**: Track image loading performance across different devices
- **User metrics**: Measure impact on Core Web Vitals and user experience
- **Storage usage**: Monitor cache storage and cleanup effectiveness

## Quality Assurance Checklist

### **Before Implementation**
- [ ] Image is contextually relevant to content
- [ ] Alt text is descriptive and meaningful
- [ ] Image meets technical specifications
- [ ] Image works in both light and dark themes
- [ ] Image is not duplicated elsewhere inappropriately
- [ ] Appropriate component is selected (LazyImage, OptimizedImage, ImageCache)
- [ ] Priority loading is configured correctly

### **After Implementation**
- [ ] Image loads correctly on all devices
- [ ] Alt text is properly displayed by screen readers
- [ ] Image maintains quality across different screen sizes
- [ ] Image contributes to overall visual consistency
- [ ] Lazy loading works as expected
- [ ] WebP format is served to supported browsers
- [ ] Caching strategy is effective
- [ ] Performance metrics meet targets

### **Ongoing Maintenance**
- [ ] Regular accessibility audits (monthly)
- [ ] Performance monitoring (weekly)
- [ ] Cache cleanup and optimization (quarterly)
- [ ] Image quality reviews (quarterly)
- [ ] User experience feedback collection (ongoing)
- [ ] Technology updates and improvements (as needed)

## Future Considerations

### **Image Updates**
- Review image relevance annually
- Update images when content changes significantly
- Consider seasonal or contextual image variations
- Monitor for new high-quality alternatives

### **Performance Optimization**
- Monitor image loading performance
- Implement advanced lazy loading strategies
- Evaluate new image formats (AVIF, JPEG XL)
- Optimize caching strategies based on usage patterns

### **Accessibility Improvements**
- Regular alt text audits
- User testing with screen readers
- Continuous improvement based on accessibility feedback
- Integration with automated accessibility testing tools

### **Advanced Features**
- **AI-powered alt text generation**: Automated alt text suggestions
- **Smart image compression**: Dynamic quality adjustment based on device
- **Predictive loading**: Preload images based on user behavior
- **Analytics integration**: Track image performance and user engagement

---

*Last updated: [Current Date]*
*Maintained by: Development Team*
