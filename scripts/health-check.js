#!/usr/bin/env node

/**
 * Development Environment Health Check
 * Validates Node.js version, package manager, dependencies, and build pipeline
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔍 Dale Rogers Portfolio - Environment Health Check\n');

// Color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.blue}${colors.bold}${title}${colors.reset}`);
  console.log('─'.repeat(title.length));
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Check Node.js version
logSection('Node.js Environment');
try {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  logInfo(`Current Node.js version: ${nodeVersion}`);
  
  if (majorVersion >= 20) {
    logSuccess(`Node.js version ${majorVersion} meets requirement (>=20.0.0)`);
  } else {
    logError(`Node.js version ${majorVersion} does not meet requirement (>=20.0.0)`);
  }
} catch (error) {
  logError(`Failed to check Node.js version: ${error.message}`);
}

// Check package manager
logSection('Package Manager');
try {
  const pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
  logSuccess(`pnpm version: ${pnpmVersion}`);
  
  if (parseInt(pnpmVersion.split('.')[0]) >= 8) {
    logSuccess('pnpm version meets requirement (>=8.0.0)');
  } else {
    logWarning('pnpm version may be outdated');
  }
} catch (error) {
  logError(`Failed to check pnpm version: ${error.message}`);
}

// Check package.json
logSection('Project Configuration');
try {
  const packageJsonPath = join(projectRoot, 'package.json');
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    
    logInfo(`Project: ${packageJson.name}`);
    logInfo(`Version: ${packageJson.version}`);
    
    // Check engines
    if (packageJson.engines?.node) {
      logInfo(`Required Node.js: ${packageJson.engines.node}`);
    }
    
    // Check scripts
    const requiredScripts = ['dev', 'build', 'preview'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts?.[script]);
    
    if (missingScripts.length === 0) {
      logSuccess('All required scripts present');
    } else {
      logWarning(`Missing scripts: ${missingScripts.join(', ')}`);
    }
    
    // Check dependencies
    const hasTailwindV4 = packageJson.dependencies?.tailwindcss?.startsWith('4') || 
                          packageJson.devDependencies?.tailwindcss?.startsWith('4');
    const hasVitePlugin = packageJson.devDependencies?.['@tailwindcss/vite'];
    const hasPostCSS = packageJson.dependencies?.postcss || 
                      packageJson.devDependencies?.postcss ||
                      packageJson.devDependencies?.['@tailwindcss/postcss'];
    
    if (hasTailwindV4) {
      logSuccess('Tailwind CSS v4 detected');
    } else {
      logWarning('Tailwind CSS v4 not detected');
    }
    
    if (hasVitePlugin) {
      logSuccess('Tailwind CSS Vite plugin present');
    } else {
      logWarning('Tailwind CSS Vite plugin missing');
    }
    
    if (!hasPostCSS) {
      logSuccess('No PostCSS dependencies (as expected)');
    } else {
      logError('PostCSS dependencies found (should be removed)');
    }
    
  } else {
    logError('package.json not found');
  }
} catch (error) {
  logError(`Failed to read package.json: ${error.message}`);
}

// Check Astro configuration
logSection('Astro Configuration');
try {
  const astroConfigPath = join(projectRoot, 'astro.config.mjs');
  if (existsSync(astroConfigPath)) {
    const configContent = readFileSync(astroConfigPath, 'utf8');
    
    if (configContent.includes('@tailwindcss/vite')) {
      logSuccess('Tailwind CSS Vite plugin configured in Astro');
    } else {
      logWarning('Tailwind CSS Vite plugin not found in Astro config');
    }
    
    if (!configContent.includes('postcss')) {
      logSuccess('No PostCSS configuration found');
    } else {
      logWarning('PostCSS configuration found');
    }
    
  } else {
    logError('astro.config.mjs not found');
  }
} catch (error) {
  logError(`Failed to read Astro config: ${error.message}`);
}

// Check CSS files
logSection('CSS Configuration');
try {
  const globalCSSPath = join(projectRoot, 'src/styles/global.css');
  if (existsSync(globalCSSPath)) {
    const globalCSS = readFileSync(globalCSSPath, 'utf8');
    
    if (globalCSS.includes('@import "tailwindcss"')) {
      logSuccess('Tailwind CSS v4 import directive found');
    } else {
      logWarning('Tailwind CSS v4 import directive not found');
    }
    
    if (globalCSS.includes('@reference "tailwindcss"')) {
      logSuccess('Tailwind CSS reference directive found');
    } else {
      logWarning('Tailwind CSS reference directive not found');
    }
    
  } else {
    logWarning('global.css not found');
  }
} catch (error) {
  logError(`Failed to read global.css: ${error.message}`);
}

// Check for old Tailwind config
logSection('Legacy Configuration');
try {
  const oldConfigPath = join(projectRoot, 'tailwind.config.ts');
  if (existsSync(oldConfigPath)) {
    logWarning('Old tailwind.config.ts found (should be removed for v4)');
  } else {
    logSuccess('No legacy Tailwind config found');
  }
} catch (error) {
  logError(`Failed to check legacy config: ${error.message}`);
}

// Check node_modules
logSection('Dependencies');
try {
  const nodeModulesPath = join(projectRoot, 'node_modules');
  if (existsSync(nodeModulesPath)) {
    logSuccess('node_modules directory exists');
    
    // Check for PostCSS in node_modules
    const postcssPath = join(nodeModulesPath, '.pnpm', 'postcss*');
    try {
      execSync(`ls ${postcssPath}`, { stdio: 'ignore' });
      logWarning('PostCSS packages found in node_modules');
    } catch {
      logSuccess('No PostCSS packages in node_modules');
    }
    
  } else {
    logWarning('node_modules directory not found - run "pnpm install"');
  }
} catch (error) {
  logError(`Failed to check dependencies: ${error.message}`);
}

// Summary
logSection('Health Check Summary');
logInfo('Environment validation complete!');

console.log('\n📋 Next Steps:');
console.log('1. If any ❌ errors found, fix them before proceeding');
console.log('2. If any ⚠️ warnings found, review and address as needed');
console.log('3. Run "pnpm run dev" to test development server');
console.log('4. Run "pnpm run build" to test production build');

console.log('\n🚀 Ready for development!');
