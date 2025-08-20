# Package Manager Migration to pnpm

## Overview

This document records the migration from multiple package managers to exclusive pnpm usage in the Dale Rogers Portfolio project.

## Changes Made

### 1. Lockfile Cleanup

- ✅ Removed `package-lock.json` (npm lockfile)
- ✅ Kept `pnpm-lock.yaml` (pnpm lockfile)
- ✅ Verified no `yarn.lock` exists

### 2. Configuration Files

- ✅ Created `.npmrc` with pnpm enforcement settings
- ✅ Added `packageManager: "pnpm@10.14.0"` to package.json
- ✅ Updated scripts to use pnpm instead of npm
- ✅ Updated Node.js requirement from 18.20.8 to >=20.0.0 (required for Azure dependencies)

### 3. Git Configuration

- ✅ Added `package-lock.json` and `yarn.lock` to `.gitignore`
- ✅ Created pre-commit hook to check package manager compliance

### 4. Enforcement Scripts

- ✅ Created `scripts/check-package-manager.js` validation script
- ✅ Added `pnpm run check-pm` command
- ✅ Script automatically detects unwanted lockfiles

### 5. Documentation Updates

- ✅ Updated README.md with pnpm usage instructions
- ✅ Added package manager section with commands and rationale
- ✅ Updated all npm references to pnpm

### 6. Node.js Version Update

- ✅ Updated `.nvmrc` from 18.20.8 to 20.19.2
- ✅ Updated `package.json` engines.node from "18.20.8" to ">=20.0.0"
- ✅ Resolved Azure identity dependency compatibility issues

## Files Modified

```
.gitignore                    # Added lockfile exclusions
.npmrc                       # Created pnpm enforcement config
package.json                 # Added packageManager field, updated scripts
README.md                    # Updated package manager documentation
scripts/check-package-manager.js  # Created enforcement script
.husky/pre-commit           # Added package manager check
```

## Package Manager Enforcement

### Automatic Checks

- **Pre-commit hook**: Automatically runs `pnpm run check-pm`
- **Manual check**: Run `pnpm run check-pm` anytime
- **Lockfile detection**: Automatically finds npm/yarn lockfiles

### Configuration

```bash
# .npmrc
package-manager=pnpm
engine-strict=true
store-dir=.pnpm-store
shamefully-hoist=false
```

### Scripts

```bash
# Check package manager compliance
pnpm run check-pm

# Generate CSS variables (updated to use pnpm)
pnpm run generate-css-vars

# Development (updated to use pnpm)
pnpm run dev
```

## Benefits of pnpm

1. **Performance**: Faster installation and updates
2. **Efficiency**: Better disk space usage
3. **Reliability**: Strict dependency resolution
4. **Consistency**: Single package manager across team
5. **Security**: Better isolation of dependencies

## Team Guidelines

### Do's

- ✅ Use `pnpm install` for dependency installation
- ✅ Use `pnpm add <package>` for adding packages
- ✅ Use `pnpm run <script>` for running scripts
- ✅ Run `pnpm run check-pm` before committing

### Don'ts

- ❌ Don't use `npm install` or `npm run`
- ❌ Don't use `yarn install` or `yarn run`
- ❌ Don't commit `package-lock.json` or `yarn.lock`
- ❌ Don't bypass package manager checks

## Troubleshooting

### If you accidentally use npm/yarn:

1. Delete any generated lockfiles
2. Run `pnpm install` to restore pnpm-lock.yaml
3. Run `pnpm run check-pm` to verify

### If pnpm install fails:

1. Delete `node_modules/` and `.pnpm-store/`
2. Run `pnpm install` fresh
3. Check for any conflicting global installations

### If scripts fail:

1. Ensure you're using pnpm commands
2. Run `pnpm run check-pm` to verify setup
3. Check that all dependencies are properly installed

## Migration Date

**Completed**: 16 August 2024

## Next Steps

1. **Team Training**: Ensure all team members understand pnpm usage
2. **CI/CD Updates**: Update any CI/CD pipelines to use pnpm
3. **Documentation**: Keep this document updated with any changes
4. **Monitoring**: Regular checks to ensure compliance

## References

- [pnpm Documentation](https://pnpm.io/)
- [Package Manager Best Practices](https://pnpm.io/workspaces)
- [Migration Guide](https://pnpm.io/migration)
