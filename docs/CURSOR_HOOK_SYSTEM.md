# Cursor Hook Branch Management System

This document describes the automated branch management system implemented for the Dale Rogers Portfolio project using Cursor hooks.

## Overview

The hook system provides **safe, automated branch management** with intelligent guard rails that:

- Creates semantic feature branches automatically
- Protects sensitive files and dangerous operations
- Enforces maturity-based change budgets
- Auto-merges successful changes to `develop`

## Architecture

```
.cursor/
├── hooks.json              # Hook configuration
├── hooks/
│   └── solo-guard.py       # Main hook script
├── solo-guard.config.json  # Project-specific settings
└── instructions.md         # Cursor AI instructions
```

## Configuration

### Maturity Levels

| Level     | Max Files | Max Lines | Use Case               |
| --------- | --------- | --------- | ---------------------- |
| Bootstrap | 200       | 20,000    | Initial scaffolding    |
| Normal    | 40        | 4,000     | Day-to-day development |
| Strict    | 12        | 600       | Near release/stability |

### Whitelisted Paths (Write Access)

- `^src/.*` - Source code
- `^docs/.*` - Documentation
- `^tests/.*` - Test files
- `^scripts/.*` - Utility scripts
- `^public/.*` - Static assets
- `^astro.config.mjs$` - Astro configuration
- `^tailwind.config.ts$` - Tailwind configuration
- `^package.json$` - Package configuration
- `^CHANGELOG.md$` - Changelog
- `^README.md$` - Project readme

### Protected Paths (Read/Write Blocked)

- `^\.env.*` - Environment files
- `^\.github/.*` - GitHub workflows and templates
- `.*lock\.(json|yaml)$` - Lock files
- `^\.cursor/.*` - Cursor configuration
- `^node_modules/.*` - Dependencies
- `^dist/.*`, `^build/.*` - Build outputs
- `^storybook-static/.*` - Storybook build
- `^test-results/.*` - Test outputs

## Branch Naming Convention

Branches are automatically created with the format:

```
<type>/<scope>/<slug>__<DDMMYYYY>
```

### Types

- `feat` - New features
- `fix` - Bug fixes
- `refactor` - Code refactoring
- `docs` - Documentation updates
- `test` - Test additions/modifications
- `chore` - Maintenance tasks
- `style` - Code style changes
- `perf` - Performance improvements

### Scopes (Portfolio-Specific)

- `ui` - UI components
- `layout` - Layout components
- `content` - Content management
- `theme` - Theme system
- `docs` - Documentation
- `scripts` - Utility scripts
- `tests` - Test files
- `config` - Configuration files
- `deploy` - Deployment-related

### Examples

- `feat/ui/improve-hero-section__04102025`
- `fix/theme/color-contrast-issues__04102025`
- `docs/readme-update__04102025`
- `refactor/layout/navigation-structure__04102025`

## Workflow

### 1. Starting Work

1. Open new Cursor chat
2. Describe the change you want to make
3. Hook system automatically:
   - Creates semantic feature branch off `develop`
   - Switches to that branch
   - Logs the branch name

### 2. During Development

- **File writes** are validated against whitelist
- **Protected files** are blocked from modification
- **Shell commands** are validated for safety
- **Sensitive content** is redacted from AI context

### 3. Completion

When you click **Stop**:

- System calculates change size (files and lines)
- If within budget: automatically commits and merges to `develop`
- If over budget: leaves changes staged for manual review
- Optionally deletes the feature branch after merge

## Security Features

### Content Redaction

The system automatically redacts sensitive patterns from file content:

- API keys: `API_KEY="[REDACTED]"`
- Secrets: `SECRET="[REDACTED]"`
- Tokens: `gho_[REDACTED]`
- Passwords: `PASSWORD="[REDACTED]"`

### Command Protection

On `main` and `develop` branches, dangerous commands are blocked:

- `git push`
- `git reset --hard`
- `git clean -fd`
- `rm -rf`
- `sudo` commands
- File system formatting commands

## Usage Examples

### Creating a New Component

```bash
# Start chat: "feat: create new Card component with hover effects"
# Result: feat/ui/create-new-card-com__04102025
# System creates branch, allows edits to src/components/ui/
```

### Updating Documentation

```bash
# Start chat: "docs: update README with new deployment instructions"
# Result: docs/docs/update-readme-with__04102025
# System creates branch, allows edits to README.md and docs/
```

### Theme Updates

```bash
# Start chat: "fix: improve color contrast in dark mode"
# Result: fix/theme/improve-color-cont__04102025
# System creates branch, allows edits to theme files
```

## Troubleshooting

### Writes Blocked

If file writes are blocked:

1. Check if the path is in the whitelist
2. Add path to `write_whitelist` in config if needed
3. Restart Cursor to reload configuration

### Changes Over Budget

If changes exceed the maturity budget:

1. Review the change size in the stop message
2. Split the work into smaller, focused tasks
3. Consider temporarily switching to "bootstrap" mode
4. Complete work in multiple chat sessions

### Branch Conflicts

If merge conflicts occur:

1. The system will stop at the conflict state
2. Manually resolve conflicts
3. Commit the resolution
4. Continue on `develop` branch

## Configuration Tuning

### Adjusting Maturity Level

Edit `.cursor/solo-guard.config.json`:

```json
{
  "maturity": "strict" // bootstrap | normal | strict
}
```

### Expanding Whitelist

Add paths to `write_whitelist`:

```json
{
  "write_whitelist": [
    "^src/.*",
    "^new-directory/.*" // Add new paths here
  ]
}
```

### Customizing Branch Names

Modify `branch_naming` section:

```json
{
  "branch_naming": {
    "types": ["feat", "fix", "custom"],
    "scopes": ["ui", "api", "custom-scope"],
    "date_format": "DDMMYYYY"
  }
}
```

## Integration with GitFlow Lite

This system integrates seamlessly with the existing GitFlow Lite workflow:

```
main (production)
├── develop (integration) ← Hook system works here
├── feature/* (auto-created by hooks)
└── hotfix/* (manual for urgent fixes)
```

### Release Process

1. Hook system maintains `develop` branch
2. When ready for release: merge `develop → main`
3. Deploy from `main`
4. Tag releases as needed

## Benefits

1. **Safety**: Prevents accidental damage to critical files
2. **Organization**: Automatic semantic branching
3. **Automation**: Reduces manual git operations
4. **Consistency**: Standardized branch naming and workflow
5. **Flexibility**: Configurable maturity levels and paths
6. **Integration**: Works with existing GitFlow Lite setup

## Future Enhancements

- **Release helper**: Generate release notes from commits
- **Auto-push toggle**: Optional automatic pushing to origin
- **Run logging**: Track all hook executions
- **Advanced redaction**: More sophisticated sensitive data detection
- **Custom validators**: Project-specific validation rules
