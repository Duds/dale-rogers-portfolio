# Commit System Documentation

## Overview

This project uses a comprehensive commit system to ensure consistent, meaningful commit messages and maintain high code quality standards.

## Components

### 1. commitlint

- **Purpose**: Validates commit messages against conventional commit standards
- **Configuration**: `commitlint.config.cjs`
- **Hook**: `.husky/commit-msg`

### 2. commitizen

- **Purpose**: Interactive commit message creation
- **Configuration**: `package.json` config section
- **Command**: `pnpm run commit` or `npx cz`

### 3. Husky

- **Purpose**: Git hooks management
- **Hooks**:
  - `pre-commit`: Runs lint-staged and other checks
  - `commit-msg`: Validates commit messages

## Commit Message Format

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies, etc.
- **ci**: CI/CD changes
- **build**: Build system changes
- **revert**: Revert previous commits

### Examples

```bash
# Feature
feat: add user authentication system

# Bug fix
fix: resolve navigation menu display issue

# Documentation
docs: update API documentation

# Style changes
style: format code according to prettier rules

# Refactoring
refactor: simplify user validation logic

# Performance
perf: optimize database queries

# Testing
test: add unit tests for user service

# Maintenance
chore: update dependencies to latest versions

# CI/CD
ci: add automated testing pipeline

# Build
build: configure webpack optimization

# Revert
revert: revert "feat: add user authentication system"
```

## Usage

### Interactive Commit (Recommended)

Use commitizen for guided commit creation:

```bash
# Stage your changes
git add .

# Create commit interactively
pnpm run commit
# or
npx cz
```

The interactive process will guide you through:

1. Selecting commit type
2. Adding scope (optional)
3. Writing description
4. Adding body (optional)
5. Adding footer (optional)

### Manual Commit

If you prefer manual commits, ensure they follow the conventional format:

```bash
git commit -m "feat: add new user dashboard"
```

### Validation

All commit messages are automatically validated by commitlint:

- Invalid messages will be rejected
- The commit-msg hook runs on every commit
- Error messages provide guidance on fixing issues

## Configuration Files

### commitlint.config.cjs

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "ci",
        "build",
        "revert",
      ],
    ],
    "type-case": [2, "always", "lowercase"],
    "type-empty": [2, "never"],
    "subject-case": [2, "always", "lowercase"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 72],
  },
};
```

### package.json

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "scripts": {
    "commit": "git-cz",
    "commit:lint": "commitlint --edit"
  }
}
```

## Git Hooks

### Pre-commit Hook

Runs before every commit:

1. Package manager validation
2. lint-staged (ESLint + Prettier)
3. Theme token validation

### Commit-msg Hook

Runs after commit message is written:

1. Validates commit message format
2. Ensures conventional commit standards
3. Rejects invalid messages

## Troubleshooting

### Common Issues

1. **Invalid commit message rejected**
   - Ensure message follows conventional format
   - Use `pnpm run commit` for guided creation

2. **Pre-commit hook fails**
   - Fix linting errors first
   - Run `pnpm run lint:fix` to auto-fix issues
   - Ensure all tests pass

3. **commitizen not working**
   - Ensure files are staged: `git add .`
   - Check commitizen configuration in package.json

### Bypassing Hooks (Not Recommended)

In emergency situations, you can bypass hooks:

```bash
git commit --no-verify -m "emergency fix"
```

**Warning**: This bypasses all quality checks and should be avoided.

## Best Practices

1. **Use descriptive commit messages**
   - Explain what and why, not how
   - Use imperative mood ("add" not "added")

2. **Keep commits atomic**
   - One logical change per commit
   - Avoid mixing unrelated changes

3. **Use appropriate types**
   - Choose the most specific type
   - Use "feat" for new features, "fix" for bug fixes

4. **Include scope when relevant**
   - `feat(auth): add user login`
   - `fix(ui): resolve button alignment`

5. **Write meaningful descriptions**
   - Be concise but descriptive
   - Avoid generic messages like "update code"

## Integration with CI/CD

The commit system integrates with CI/CD pipelines:

- Commit messages are validated
- Conventional commits enable automated changelog generation
- Semantic versioning can be automated based on commit types

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [commitlint Documentation](https://commitlint.js.org/)
- [commitizen Documentation](https://github.com/commitizen/cz-cli)
- [Husky Documentation](https://typicode.github.io/husky/)
