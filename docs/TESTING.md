# Testing Strategy

## Overview

This document outlines the testing strategy for the portfolio website, ensuring high quality and reliability across all features.

## Testing Levels

### Unit Testing

- Component testing with Vitest
- Utility function testing
- Type checking with TypeScript
- Snapshot testing for UI components

### Integration Testing

- API integration tests
- Component integration tests
- Form submission flows
- Navigation flows

### End-to-End Testing

- User journey testing with Playwright
- Cross-browser testing
- Mobile responsiveness testing
- Performance testing

## Test Organisation

```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── e2e/              # End-to-end tests
└── fixtures/         # Test fixtures
```

## Running Tests

```bash
# Run unit tests
pnpm test:unit

# Run integration tests
pnpm test:integration

# Run e2e tests
pnpm test:e2e

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Testing Standards

### Code Coverage

- Minimum 80% coverage for unit tests
- Critical paths require 100% coverage
- Regular coverage reports generation

### Test Structure

```typescript
describe('ComponentName', () => {
  describe('when condition', () => {
    it('should behave as expected', () => {
      // Arrange
      const props = {...}

      // Act
      const result = ...

      // Assert
      expect(result).toBe(expected)
    })
  })
})
```

### Naming Conventions

- Test files: `*.test.ts` or `*.spec.ts`
- Test descriptions in Australian English
- Clear and descriptive test names

## Continuous Integration

### GitHub Actions

- Automated test runs on pull requests
- Coverage reports generation
- Performance benchmarking
- Accessibility testing

### Quality Gates

- All tests must pass
- Coverage thresholds met
- No TypeScript errors
- No ESLint warnings

## Performance Testing

### Metrics

- Page load time
- Time to interactive
- First contentful paint
- Largest contentful paint
- Cumulative layout shift

### Tools

- Lighthouse CI
- WebPageTest
- Chrome DevTools
- Performance monitoring

## Accessibility Testing

### Standards

- WCAG 2.1 Level AA compliance
- Screen reader testing
- Keyboard navigation
- Colour contrast checking

### Tools

- axe-core
- WAVE
- Screen readers
- Keyboard testing

## Security Testing

### Areas

- Authentication flows
- Input validation
- XSS prevention
- CSRF protection
- API security

### Tools

- OWASP ZAP
- SonarQube
- npm audit
- Snyk

## Test Data Management

### Fixtures

- JSON fixtures
- Mock API responses
- Test images
- Test documents

### Environment Variables

```env
TEST_API_KEY=your_test_api_key
TEST_DATABASE_URL=your_test_db_url
```

## Reporting

### Test Reports

- JUnit XML reports
- Coverage reports
- Performance reports
- Accessibility reports

### Documentation

- Test results in PR comments
- Regular test summary reports
- Performance trending
- Coverage trending

## Maintenance

### Regular Tasks

- Update test dependencies
- Review and update test cases
- Clean up test data
- Update documentation

### Schedule

- Daily: Automated test runs
- Weekly: Coverage review
- Monthly: Performance testing
- Quarterly: Full test suite review

## Best Practices

### Do's

- Write descriptive test names
- Follow AAA pattern
- Keep tests independent
- Use meaningful assertions

### Don'ts

- Skip tests without reason
- Use non-deterministic tests
- Test implementation details
- Duplicate test cases

## Resources

### Documentation

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)

### Tools

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)

## Testing MDX Articles and Embedded Components

All MDX articles that use JSX/MDX components (e.g., CalloutBox, QuoteBlock, ImageWithCaption, Card) must be tested for:

- Correct rendering of all embedded components
- Theming (light/dark mode) and typography consistency
- Accessibility (ARIA roles, keyboard navigation, colour contrast)
- Australian English spelling, date, and currency formats
- Responsive layout and mobile support

### How to Test

1. **Unit Test Rendering**

   - Use your preferred test runner (e.g., Jest, Vitest) with a compatible MDX/JSX renderer (e.g., @astrojs/mdx, @testing-library/react for MDX-to-React).
   - Render the MDX file and check for the presence of all expected components and content.

2. **Accessibility**

   - Use automated tools (e.g., axe-core, pa11y) and manual screen reader checks.
   - Ensure all interactive elements are keyboard accessible.

3. **Theming**

   - Test in both light and dark mode.
   - Check that all components adapt to theme changes and maintain contrast.

4. **Australian Standards**

   - Verify all dates use DD/MM/YYYY format.
   - Check for Australian English spelling and $AUD currency formatting.

5. **Responsive Design**
   - Test on multiple screen sizes.
   - Ensure no content overflows or breaks on mobile.

### Example Test (Vitest + React Testing Library)

```tsx
import { render, screen } from "@testing-library/react";
import Article from "../src/content/articles/considerations-for-trauma-informed-design.mdx";

test("renders all key sections and components", () => {
  render(<Article />);
  expect(
    screen.getByText("Considerations for Trauma-Informed Design"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Why Trauma-Informed Design/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/First Nations-led Service Design/),
  ).toBeInTheDocument();
  // Add more assertions for CalloutBox, Card, etc.
});
```
