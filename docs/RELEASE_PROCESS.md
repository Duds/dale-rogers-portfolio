# Automated Release Process

This portfolio now uses **semantic-release** for automated version management based on conventional commit messages.

## 🚀 How It Works

### **Automatic Version Incrementation**
- **Patch** (`0.0.2` → `0.0.3`): Bug fixes, documentation updates, style changes
- **Minor** (`0.0.2` → `0.1.0`): New features, backward compatible changes
- **Major** (`0.0.2` → `1.0.0`): Breaking changes

### **Conventional Commit Types**
```bash
feat:     New feature (minor version bump)
fix:      Bug fix (patch version bump)
docs:     Documentation changes (patch version bump)
style:    Code style changes (patch version bump)
refactor: Code refactoring (patch version bump)
perf:     Performance improvements (patch version bump)
test:     Adding tests (patch version bump)
chore:    Maintenance tasks (patch version bump)
ci:       CI/CD changes (patch version bump)
build:    Build system changes (patch version bump)
```

### **Breaking Changes**
To trigger a major version bump, include `BREAKING CHANGE:` in your commit message:
```bash
git commit -m "feat: redesign navigation system

BREAKING CHANGE: Navigation component API has changed. 
Update all navigation imports to use new syntax."
```

## 🔧 Release Workflow

### **1. Development Process**
```bash
# Make changes and commit using conventional format
git add .
git commit -m "feat: add new portfolio section"
git push origin feature-branch

# Create pull request to main
# Merge when ready
```

### **2. Automatic Release**
When code is merged to `main`:
1. **GitHub Actions** automatically runs semantic-release
2. **Version analysis** determines next version based on commits
3. **Package.json** is updated with new version
4. **Version sync script** updates all component files
5. **Git tag** is created for the new version
6. **GitHub release** is created with changelog
7. **CHANGELOG.md** is automatically updated

### **3. Version Sync**
The system automatically updates version numbers in:
- `package.json` (primary source)
- `src/layouts/BaseLayout.astro`
- `src/components/ui/VersionBadge.astro`

## 📋 Manual Commands

### **Check Current Version**
```bash
pnpm run version:sync
```

### **Dry Run Release**
```bash
pnpm run release:dry-run
```

### **Manual Release** (if needed)
```bash
pnpm run release
```

## 🎯 Best Practices

### **Commit Message Format**
```bash
type(scope): description

[optional body]

[optional footer(s)]
```

### **Examples**
```bash
# Feature
git commit -m "feat: add dark mode toggle"

# Bug fix
git commit -m "fix: resolve navigation menu overlap"

# Documentation
git commit -m "docs: update deployment guide"

# Breaking change
git commit -m "feat: redesign component API

BREAKING CHANGE: Component props structure has changed"
```

### **Branch Strategy**
- **`main`**: Production releases only
- **`preview`**: Preview deployments
- **`feature/*`**: Feature development
- **`hotfix/*`**: Emergency fixes

## 🔍 Release History

### **View Releases**
- **GitHub**: Check the Releases tab in your repository
- **Local**: `git tag -l` to see all version tags
- **Changelog**: `CHANGELOG.md` is automatically maintained

### **Release Notes**
Each release includes:
- **Version number** and release date
- **Automated changelog** based on commit messages
- **Build assets** (if configured)
- **GitHub labels** for tracking

## 🚨 Troubleshooting

### **Common Issues**

#### **Version Not Syncing**
```bash
# Run manual sync
pnpm run version:sync

# Check file permissions
ls -la scripts/sync-version.js
```

#### **Release Not Triggering**
- Ensure you're on `main` branch
- Check GitHub Actions permissions
- Verify conventional commit format

#### **Build Failures**
```bash
# Check semantic-release configuration
pnpm run release:dry-run

# Verify dependencies
pnpm install
```

### **Manual Override**
If automatic release fails:
```bash
# Manual version bump
npm version patch  # or minor/major
pnpm run version:sync
git push --tags
```

## 📚 Configuration Files

### **`.releaserc.json`**
- Release rules and plugin configuration
- Branch restrictions and asset handling
- Commit message parsing rules

### **`.github/workflows/release.yml`**
- Automated release workflow
- Triggers on main branch pushes
- Build and release process

### **`scripts/sync-version.js`**
- Version synchronization across files
- Automatic updates for all components
- Error handling and logging

## 🎉 Benefits

### **Before (Manual)**
- ❌ Multiple files to update manually
- ❌ Risk of version inconsistencies
- ❌ Manual changelog maintenance
- ❌ Easy to forget version updates

### **After (Automated)**
- ✅ **Automatic version increments** based on commit types
- ✅ **Consistent versioning** across all files
- ✅ **Automated changelog generation**
- ✅ **GitHub releases** with assets
- ✅ **Zero manual version management**
- ✅ **Conventional commit enforcement**

## 🚀 Getting Started

1. **Use conventional commits** for all changes
2. **Push to main branch** to trigger releases
3. **Monitor GitHub Actions** for release progress
4. **Check version badge** in footer for current version
5. **Review CHANGELOG.md** for release history

The system is now fully automated - just commit with conventional messages and let semantic-release handle the rest! 🎯
