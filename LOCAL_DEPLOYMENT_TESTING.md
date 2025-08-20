# Local Deployment Testing Guide

## 🎯 **Why Test Locally First?**

Testing deployment locally before pushing to staging helps you:

- ✅ **Catch issues early** - Fix problems before they reach CI/CD
- ✅ **Faster iteration** - No waiting for GitHub Actions to fail
- ✅ **Debug easily** - Full access to logs and environment
- ✅ **Save time** - Avoid the "one bug at a time" cycle
- ✅ **Confidence** - Know your deployment will work before pushing

## 🚀 **Quick Start Testing**

### **Fast Test (Recommended for Development)**

```bash
# Run quick deployment test (2-3 minutes)
pnpm run deploy:test
```

### **Full Test (Comprehensive Validation)**

```bash
# Run complete deployment simulation (5-10 minutes)
pnpm run deploy:test:full
```

### **Clean Up Test Files**

```bash
# Remove test artifacts
pnpm run deploy:test:clean
```

## 🧪 **What Each Test Covers**

### **Quick Test (`deploy:test`)**

1. ✅ **Build Process** - Verifies Astro build works
2. ✅ **Production Package.json** - Creates and validates production package.json
3. ✅ **Dependency Installation** - Tests production dependency installation
4. ✅ **Lockfile Handling** - Ensures no lockfile mismatch errors

### **Full Test (`deploy:test:full`)**

1. ✅ **Prerequisites Check** - Node.js, pnpm versions
2. ✅ **Quality Checks** - TypeScript, ESLint, Prettier
3. ✅ **Test Suite** - Unit and integration tests
4. ✅ **Build Process** - Complete application build
5. ✅ **Production Package.json** - Full validation
6. ✅ **Dependency Installation** - Complete dependency resolution
7. ✅ **Startup Script** - Azure startup script creation
8. ✅ **Package Creation** - Deployment package creation

## 🔧 **Manual Testing Steps**

If you prefer to test manually or need to debug specific issues:

### **Step 1: Build Test**

```bash
# Test the build process
pnpm run build

# Verify build output
ls -la dist/
ls -la dist/server/
```

### **Step 2: Production Package.json Test**

```bash
cd dist

# Create production package.json
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

  const prodPkg = {
    name: pkg.name,
    type: pkg.type,
    version: pkg.version,
    private: pkg.private,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: { start: 'node server/entry.mjs' }
  };

  fs.writeFileSync('package.json', JSON.stringify(prodPkg, null, 2));
  console.log('✅ Production package.json created');
"

# Verify the file
cat package.json
```

### **Step 3: Dependency Installation Test**

```bash
# Install production dependencies
pnpm install --prod --no-frozen-lockfile

# Verify key dependencies
ls -la node_modules/@astrojs/node/
ls -la node_modules/react/
```

### **Step 4: Startup Script Test**

```bash
# Create startup script
cat > start.sh << 'EOF'
#!/bin/bash
export PORT=8080
export HOST=0.0.0.0
export NODE_ENV=production
cd /home/site/wwwroot
exec node server/entry.mjs
EOF

chmod +x start.sh
cat start.sh
```

## 🚨 **Common Issues and Solutions**

### **Issue 1: Build Fails**

```bash
# Check for TypeScript errors
pnpm run typecheck

# Check for linting issues
pnpm run lint

# Check for formatting issues
pnpm run format:check
```

### **Issue 2: Production Package.json Creation Fails**

```bash
# Verify original package.json is valid
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8')); console.log('✅ Valid JSON')"

# Check for missing dependencies
node -e "const pkg = JSON.parse(require('fs').readFileSync('package.json', 'utf8')); console.log('Dependencies:', Object.keys(pkg.dependencies || {}))"
```

### **Issue 3: Dependency Installation Fails**

```bash
# Check pnpm version
pnpm --version

# Clear pnpm cache
pnpm store prune

# Try with verbose output
pnpm install --prod --no-frozen-lockfile --reporter=append-only
```

### **Issue 4: Missing Server Entry Point**

```bash
# Check build output
ls -la dist/
ls -la dist/server/

# Verify Astro configuration
cat astro.config.mjs
```

## 📊 **Testing Workflow**

### **Development Cycle**

```bash
# 1. Make changes to code
# 2. Test locally
pnpm run deploy:test

# 3. If tests pass, commit and push
git add .
git commit -m "fix: resolve deployment issue"
git push origin staging

# 4. Monitor GitHub Actions
gh run list --workflow="Deploy to Azure" --limit 1
```

### **Debugging Cycle**

```bash
# 1. Test fails locally
pnpm run deploy:test

# 2. Identify the failing step
# 3. Fix the issue
# 4. Test again
pnpm run deploy:test

# 5. Repeat until all tests pass
```

## 🎯 **Success Criteria**

Your deployment is ready for staging when:

1. ✅ **Quick Test Passes** - `pnpm run deploy:test` completes successfully
2. ✅ **Build Output Valid** - `dist/` directory contains expected files
3. ✅ **Production Package.json** - No prepare script, only production dependencies
4. ✅ **Dependencies Install** - All production dependencies resolve correctly
5. ✅ **No Lockfile Errors** - pnpm install completes without lockfile issues

## 🚀 **Next Steps After Local Testing**

Once local tests pass:

1. **Commit Changes**

   ```bash
   git add .
   git commit -m "fix: deployment issues resolved"
   ```

2. **Push to Staging**

   ```bash
   git push origin staging
   ```

3. **Monitor Deployment**

   ```bash
   gh run list --workflow="Deploy to Azure" --limit 1
   ```

4. **Verify Success**
   - Check GitHub Actions logs
   - Verify staging environment is accessible
   - Test health endpoints

## 🔍 **Advanced Testing**

### **Environment Variable Testing**

```bash
# Test with production environment
NODE_ENV=production pnpm run deploy:test

# Test with staging environment
NODE_ENV=staging pnpm run deploy:test
```

### **Dependency Version Testing**

```bash
# Test with specific pnpm version
pnpm --version
# If version mismatch, update or use npx
npx pnpm@10.14.0 run deploy:test
```

### **Clean Environment Testing**

```bash
# Remove all build artifacts and test fresh
rm -rf dist/ test-deployment/ test-deployment.zip
pnpm run deploy:test
```

## 📚 **Troubleshooting Resources**

- **Build Issues**: Check `astro.config.mjs` and `package.json`
- **Dependency Issues**: Check `pnpm-lock.yaml` and Node.js version
- **Script Issues**: Check file permissions and shebang lines
- **Environment Issues**: Check Node.js and pnpm versions

## 🎉 **Benefits of Local Testing**

- **Faster Development** - No waiting for CI/CD failures
- **Better Debugging** - Full access to environment and logs
- **Confidence** - Know your deployment will work
- **Efficiency** - Fix multiple issues in one session
- **Learning** - Understand the deployment process better

---

**Start Testing Now:**

```bash
# Quick test (recommended)
pnpm run deploy:test

# Full test (comprehensive)
pnpm run deploy:test:full
```

Happy testing! 🚀
