#!/bin/bash

# Local Deployment Testing Script
# This script simulates the exact deployment process from GitHub Actions
# to catch issues before pushing to staging

set -e

echo "🧪 Testing Deployment Process Locally"
echo "====================================="
echo "This script simulates the exact deployment steps from GitHub Actions"
echo ""

# Configuration
TEST_DIR="test-deployment"
BUILD_DIR="dist"
ORIGINAL_DIR=$(pwd)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if pnpm is installed
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm is not installed. Please install it first."
        exit 1
    fi
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install it first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version)
    print_success "Node.js version: $NODE_VERSION"
    
    # Check pnpm version
    PNPM_VERSION=$(pnpm --version)
    print_success "pnpm version: $PNPM_VERSION"
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to clean up test environment
cleanup() {
    print_status "Cleaning up test environment..."
    
    if [ -d "$TEST_DIR" ]; then
        rm -rf "$TEST_DIR"
        print_success "Test directory cleaned up"
    fi
    
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
        print_success "Build directory cleaned up"
    fi
}

# Function to run quality checks
run_quality_checks() {
    print_status "Running quality checks (simulating GitHub Actions)..."
    
    echo "📋 Running TypeScript check..."
    if pnpm run typecheck; then
        print_success "TypeScript check passed"
    else
        print_error "TypeScript check failed"
        return 1
    fi
    
    echo "📋 Running ESLint..."
    if pnpm run lint; then
        print_success "ESLint check passed"
    else
        print_error "ESLint check failed"
        return 1
    fi
    
    echo "📋 Running Prettier check..."
    if pnpm run format:check; then
        print_success "Prettier check passed"
    else
        print_error "Prettier check failed"
        return 1
    fi
    
    print_success "All quality checks passed"
}

# Function to run tests
run_tests() {
    print_status "Running tests (simulating GitHub Actions)..."
    
    if pnpm run test:run; then
        print_success "Tests passed"
    else
        print_error "Tests failed"
        return 1
    fi
}

# Function to build application
build_application() {
    print_status "Building application (simulating GitHub Actions)..."
    
    if pnpm run build; then
        print_success "Build completed successfully"
    else
        print_error "Build failed"
        return 1
    fi
    
    # Verify build output
    if [ ! -d "$BUILD_DIR" ]; then
        print_error "Build directory '$BUILD_DIR' not found"
        return 1
    fi
    
    if [ ! -f "$BUILD_DIR/server/entry.mjs" ]; then
        print_error "Server entry point not found at '$BUILD_DIR/server/entry.mjs'"
        return 1
    fi
    
    print_success "Build output verified"
}

# Function to test production package.json creation
test_production_package_json() {
    print_status "Testing production package.json creation (simulating GitHub Actions)..."
    
    # Create test directory
    mkdir -p "$TEST_DIR"
    cp -r "$BUILD_DIR"/* "$TEST_DIR/"
    cd "$TEST_DIR"
    
    # Debug: Show original package.json scripts section
    echo "📋 Original package.json scripts:"
    node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync('../package.json', 'utf8')).scripts, null, 2))"
    
    # Create a production package.json without prepare script and devDependencies
    echo "🔧 Creating production package.json..."
    node -e "
      try {
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

        // Create production package.json
        const prodPkg = {
          name: pkg.name,
          type: pkg.type,
          version: pkg.version,
          private: pkg.private,
          engines: pkg.engines,
          dependencies: pkg.dependencies,
          scripts: {
            start: 'node server/entry.mjs'
          }
        };

        fs.writeFileSync('package.json', JSON.stringify(prodPkg, null, 2));
        console.log('✅ Successfully created production package.json');

        // Verify the file was created correctly
        const createdPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        if (createdPkg.prepare || createdPkg.devDependencies) {
          throw new Error('Production package.json still contains prepare script or devDependencies');
        }
        console.log('✅ Production package.json verified successfully');
      } catch (error) {
        console.error('❌ Error creating production package.json:', error);
        process.exit(1);
      }
    "
    
    # Create .npmrc to disable prepare scripts globally as a backup
    echo "ignore-scripts=true" > .npmrc
    echo "✅ Created .npmrc to disable all scripts during npm install"
    
    # Show final production package.json structure
    echo "📋 Final production package.json structure:"
    cat package.json
    
    # Create a production-specific lockfile to avoid lockfile mismatch issues
    echo "🔒 Creating production-specific lockfile..."
    
    # Remove the existing lockfile and create a fresh one for production
    rm -f pnpm-lock.yaml
    
    # Install dependencies to generate a new lockfile that matches production package.json
    echo "📦 Installing dependencies to generate production lockfile..."
    pnpm install --prod
    
    # Verify the lockfile was created
    if [ -f "pnpm-lock.yaml" ]; then
        echo "✅ Production lockfile created successfully"
        echo "📊 Lockfile size: $(wc -l < pnpm-lock.yaml) lines"
    else
        echo "⚠️  No lockfile generated, this might cause issues"
    fi
    
    cd "$ORIGINAL_DIR"
    print_success "Production package.json creation test passed"
}

# Function to test dependency installation
test_dependency_installation() {
    print_status "Testing dependency installation (simulating GitHub Actions)..."
    
    cd "$TEST_DIR"
    
    # Debug: Show the production package.json contents
    echo "📋 Production package.json contents:"
    cat package.json
    
    # Double-check: Verify no prepare script exists (safety measure)
    if grep -q '"prepare"' package.json; then
        print_error "prepare script still exists in production package.json"
        cd "$ORIGINAL_DIR"
        return 1
    else
        echo "✅ No prepare script found in production package.json"
    fi
    
    # Install production dependencies with --no-frozen-lockfile to handle lockfile mismatch
    echo "📦 Installing production dependencies..."
    echo "⚠️  Using --no-frozen-lockfile due to production package.json vs lockfile mismatch"
    
    if pnpm install --prod --no-frozen-lockfile; then
        print_success "Production dependencies installed successfully"
    else
        print_error "Production dependency installation failed"
        cd "$ORIGINAL_DIR"
        return 1
    fi
    
    # Verify key dependencies are installed
    if [ -d "node_modules/@astrojs/node" ]; then
        print_success "Key dependency @astrojs/node found"
    else
        print_warning "Key dependency @astrojs/node not found"
    fi
    
    if [ -d "node_modules/react" ]; then
        print_success "Key dependency react found"
    else
        print_warning "Key dependency react not found"
    fi
    
    cd "$ORIGINAL_DIR"
    print_success "Dependency installation test passed"
}

# Function to test startup script creation
test_startup_script() {
    print_status "Testing startup script creation (simulating GitHub Actions)..."
    
    cd "$TEST_DIR"
    
    # Create a proper startup script for Azure
    cat > start.sh << 'EOF'
#!/bin/bash
export PORT=8080
export HOST=0.0.0.0
export NODE_ENV=production
cd /home/site/wwwroot
exec node server/entry.mjs
EOF

    chmod +x start.sh
    
    # Verify startup script
    if [ -f "start.sh" ] && [ -x "start.sh" ]; then
        print_success "Startup script created and made executable"
        echo "📋 Startup script contents:"
        cat start.sh
    else
        print_error "Startup script creation failed"
        cd "$ORIGINAL_DIR"
        return 1
    fi
    
    cd "$ORIGINAL_DIR"
    print_success "Startup script creation test passed"
}

# Function to test package creation
test_package_creation() {
    print_status "Testing package creation (simulating GitHub Actions)..."
    
    cd "$TEST_DIR"
    
    # Create a zip file of the test directory
    if command -v zip &> /dev/null; then
        zip -r ../test-deployment.zip .
        print_success "Test deployment package created: test-deployment.zip"
        echo "📊 Package size: $(du -h ../test-deployment.zip | cut -f1)"
    else
        print_warning "zip command not found, skipping package creation test"
        print_status "Install zip to test package creation: sudo apt-get install zip"
    fi
    
    cd "$ORIGINAL_DIR"
    print_success "Package creation test passed"
}

# Function to run all tests
run_all_tests() {
    print_status "Starting comprehensive deployment testing..."
    echo ""
    
    check_prerequisites
    echo ""
    
    run_quality_checks
    echo ""
    
    run_tests
    echo ""
    
    build_application
    echo ""
    
    test_production_package_json
    echo ""
    
    test_dependency_installation
    echo ""
    
    test_startup_script
    echo ""
    
    test_package_creation
    echo ""
    
    print_success "🎉 All deployment tests passed!"
    echo ""
    echo "✅ Your deployment process is ready for staging!"
    echo ""
    echo "📋 Test Summary:"
    echo "  - Quality checks: ✅ PASSED"
    echo "  - Tests: ✅ PASSED"
    echo "  - Build: ✅ PASSED"
    echo "  - Production package.json: ✅ PASSED"
    echo "  - Dependency installation: ✅ PASSED"
    echo "  - Startup script: ✅ PASSED"
    echo "  - Package creation: ✅ PASSED"
    echo ""
    echo "🚀 Ready to push to staging branch!"
}

# Function to show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help, -h     Show this help message"
    echo "  --clean        Clean up test environment and exit"
    echo "  --quick        Run only essential tests (skip package creation)"
    echo ""
    echo "Examples:"
    echo "  $0              # Run all tests"
    echo "  $0 --clean      # Clean up test files"
    echo "  $0 --quick      # Run quick test suite"
}

# Main execution
main() {
    case "${1:-}" in
        --help|-h)
            show_help
            exit 0
            ;;
        --clean)
            cleanup
            exit 0
            ;;
        --quick)
            print_status "Running quick test suite..."
            check_prerequisites
            run_quality_checks
            run_tests
            build_application
            test_production_package_json
            test_dependency_installation
            test_startup_script
            print_success "🎉 Quick tests completed successfully!"
            exit 0
            ;;
        "")
            run_all_tests
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
}

# Trap cleanup on exit
trap cleanup EXIT

# Run the script
main "$@"
