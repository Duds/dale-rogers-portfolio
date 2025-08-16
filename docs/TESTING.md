# Testing Infrastructure

## Overview

This project uses a comprehensive testing strategy with multiple tools:

- **Vitest**: Unit and integration testing for React components
- **Playwright**: End-to-end testing for user flows
- **Storybook**: Component development and visual testing
- **Testing Library**: React component testing utilities

## Test Structure

```
tests/
├── setup/vitest.setup.ts    # Global test configuration
├── utils/test-helpers.tsx   # Common test utilities
├── ui/                      # UI component tests
├── e2e/                     # End-to-end tests
└── layout/                  # Layout component tests
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test Button.test.tsx

# Run without watching
pnpm test --run

# Generate coverage report
pnpm test:coverage
```

## Test Examples

### Component Testing

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });
});
```

### User Interaction Testing

```typescript
import userEvent from "@testing-library/user-event";

it("calls onClick when clicked", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);
  await user.click(screen.getByRole("button"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Test Utilities

### Mocking

```typescript
import { mockFetch, mockLocalStorage } from "../utils/test-helpers";

// Mock API calls
mockFetch({ data: "test" });

// Mock browser APIs
mockLocalStorage();
```

### Test Data

```typescript
import { testData } from "../utils/test-helpers";

const user = testData.users.create({ name: "John Doe" });
```

## Coverage Requirements

- **Minimum Coverage**: 85% for branches, functions, lines, and statements
- **Quality Gate**: All tests must pass before merging
- **Accessibility**: All components must have accessibility tests

## Storybook

```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm storybook:build
```

## Best Practices

1. **Test Behavior, Not Implementation**
2. **Use Descriptive Test Names**
3. **Mock External Dependencies**
4. **Test Accessibility Features**
5. **Keep Tests Fast and Reliable**

## Troubleshooting

- **JSX Issues**: Ensure `.tsx` extension and proper Vitest config
- **Import Errors**: Check relative paths and file extensions
- **Async Failures**: Use proper async/await patterns
- **Mock Issues**: Verify mock setup and cleanup

---

_This testing infrastructure ensures code quality and prevents regressions._
