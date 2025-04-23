# Contributing Guidelines

## Overview

Thank you for considering contributing to the portfolio website! This document outlines the process and standards for contributing to the project.

## Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behaviour to conduct@dalerogers.dev.

## Getting Started

1. **Fork the Repository**

   ```bash
   # Clone your fork
   git clone https://github.com/YOUR-USERNAME/dale-rogers-portfolio.git

   # Add upstream remote
   git remote add upstream https://github.com/Duds/dale-rogers-portfolio.git
   ```

2. **Set Up Development Environment**

   ```bash
   # Install dependencies
   pnpm install

   # Create environment file
   cp .env.example .env

   # Start development server
   pnpm dev
   ```

## Development Process

### 1. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow coding standards
- Write tests
- Update documentation
- Use Australian English

### 3. Commit Changes

```bash
# Stage changes
git add .

# Commit with semantic message
git commit -m "feat: add new feature"
```

### 4. Submit Pull Request

- Push changes to your fork
- Create pull request
- Fill out PR template
- Request review

## Coding Standards

### TypeScript

```typescript
// Use interfaces for object types
interface UserProps {
  name: string;
  email: string;
}

// Use type for unions/intersections
type Theme = "light" | "dark";

// Use proper error handling
try {
  await saveData();
} catch (error) {
  if (error instanceof ValidationError) {
    handleValidationError(error);
  }
  throw error;
}
```

### React/Astro Components

```typescript
// Use functional components
const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="btn btn-primary">
      {children}
    </button>
  );
};

// Use proper prop types
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
```

### CSS/Tailwind

```css
/* Use consistent class naming */
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded;
}

/* Use proper responsive design */
.container {
  @apply px-4 md:px-6 lg:px-8;
}
```

## Testing

### Unit Tests

```typescript
describe("Button", () => {
  it("should render children", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
describe("Form submission", () => {
  it("should submit successfully", async () => {
    const { getByRole } = render(<ContactForm />);
    await userEvent.click(getByRole("button"));
    expect(onSubmit).toHaveBeenCalled();
  });
});
```

## Documentation

### Code Comments

```typescript
/**
 * Component for displaying user profile information
 * @component Profile
 * @param {ProfileProps} props - Component props
 * @returns {JSX.Element} Profile component
 */
```

### Markdown Files

```markdown
# Component Name

## Overview

Brief description of the component

## Props

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| prop | type | Yes/No   | Description |
```

## Pull Request Process

1. **Title Format**

   ```
   feat: add new feature
   fix: resolve issue
   docs: update documentation
   ```

2. **Description Template**

   ```markdown
   ## Changes

   - Added new feature
   - Updated tests
   - Updated documentation

   ## Testing

   - [ ] Unit tests
   - [ ] Integration tests
   - [ ] Manual testing

   ## Screenshots

   [If applicable]
   ```

3. **Review Process**
   - Code review required
   - Tests must pass
   - Documentation updated
   - No linting errors

## Release Process

1. **Version Bump**

   ```bash
   pnpm version patch|minor|major
   ```

2. **Update Changelog**

   ```markdown
   ## [1.0.0] - DD/MM/YYYY

   ### Added

   - New feature

   ### Fixed

   - Bug fix
   ```

3. **Create Release**
   - Tag version
   - Write release notes
   - Publish release

## Community

### Communication Channels

- GitHub Issues
- Discussions
- Email: community@dalerogers.dev

### Getting Help

- Check documentation
- Search existing issues
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## Resources

### Documentation

- [TypeScript](https://www.typescriptlang.org/docs)
- [Astro](https://docs.astro.build)
- [React](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tools

- [VS Code](https://code.visualstudio.com)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Vitest](https://vitest.dev)
