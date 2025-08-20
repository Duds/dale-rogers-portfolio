#!/bin/bash

# Quick Deployment Test Script
# Fast iteration testing for deployment issues

set -e

echo "⚡ Quick Deployment Test"
echo "========================"
echo "Fast testing for common deployment issues"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

# Quick tests
print_info "Running quick deployment tests..."

# Test 1: Build
print_info "1. Testing build process..."
if pnpm run build; then
    print_success "Build passed"
else
    print_error "Build failed"
    exit 1
fi

# Test 2: Production package.json creation
print_info "2. Testing production package.json creation..."
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

# Test 3: Dependency installation
print_info "3. Testing dependency installation..."
if pnpm install --prod --no-frozen-lockfile; then
    print_success "Dependencies installed"
else
    print_error "Dependency installation failed"
    cd ..
    exit 1
fi

cd ..

print_success "🎉 Quick deployment test passed!"
echo ""
echo "🚀 Ready to test in staging!"
echo ""
echo "Next steps:"
echo "1. git add . && git commit -m 'test: deployment fixes'"
echo "2. git push origin staging"
echo "3. Monitor GitHub Actions"
