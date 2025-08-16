#!/usr/bin/env node

/**
 * Development Setup and Workflow Script
 * Provides menu-driven access to common development tasks
 */

import { execSync, spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader() {
  console.log(`${colors.cyan}${colors.bold}`);
  console.log('🚀 Dale Rogers Portfolio - Development Setup');
  console.log('═══════════════════════════════════════════════');
  console.log(`${colors.reset}`);
}

function logMenu() {
  console.log('\n📋 Available Commands:');
  console.log('1. 🔍 Health Check - Validate environment');
  console.log('2. 🧹 Clean Install - Fresh dependency install');
  console.log('3. 🏗️  Build Project - Production build');
  console.log('4. 🚀 Dev Server - Start development server');
  console.log('5. 🧪 Run Tests - Execute test suite');
  console.log('6. 📝 Lint & Fix - Code quality check');
  console.log('7. 🔧 Type Check - TypeScript validation');
  console.log('8. 📚 Storybook - Component development');
  console.log('9. 🎯 Quick Start - Full development workflow');
  console.log('0. 🚪 Exit');
  console.log('');
}

function runCommand(command, description) {
  log(`\n${colors.blue}${colors.bold}${description}${colors.reset}`);
  log(`${colors.cyan}Running: ${command}${colors.reset}\n`);
  
  try {
    execSync(command, { 
      stdio: 'inherit', 
      cwd: projectRoot,
      env: { ...process.env, FORCE_COLOR: '1' }
    });
    log(`${colors.green}✅ ${description} completed successfully!${colors.reset}`);
  } catch (error) {
    log(`${colors.red}❌ ${description} failed: ${error.message}${colors.reset}`);
  }
}

function runInteractiveCommand(command, description) {
  log(`\n${colors.blue}${colors.bold}${description}${colors.reset}`);
  log(`${colors.cyan}Starting: ${command}${colors.reset}`);
  log(`${colors.yellow}Press Ctrl+C to stop${colors.reset}\n`);
  
  const child = spawn(command, [], { 
    stdio: 'inherit', 
    cwd: projectRoot,
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' }
  });
  
  child.on('error', (error) => {
    log(`${colors.red}❌ ${description} failed: ${error.message}${colors.reset}`);
  });
  
  return child;
}

function healthCheck() {
  runCommand('node scripts/health-check.js', 'Environment Health Check');
}

function cleanInstall() {
  log(`\n${colors.yellow}⚠️  This will remove node_modules and reinstall all dependencies${colors.reset}`);
  log(`${colors.cyan}This may take a few minutes...${colors.reset}\n`);
  
  runCommand('rm -rf node_modules pnpm-lock.yaml', 'Clean old dependencies');
  runCommand('pnpm install', 'Install fresh dependencies');
}

function buildProject() {
  runCommand('pnpm run build', 'Production Build');
}

function devServer() {
  const child = runInteractiveCommand('pnpm run dev', 'Development Server');
  return child;
}

function runTests() {
  runCommand('pnpm run test:run', 'Test Suite');
}

function lintAndFix() {
  runCommand('pnpm run lint:fix', 'Lint and Fix Code');
}

function typeCheck() {
  runCommand('pnpm run type-check', 'TypeScript Type Check');
}

function storybook() {
  const child = runInteractiveCommand('pnpm run storybook', 'Storybook Development');
  return child;
}

function quickStart() {
  log(`\n${colors.magenta}${colors.bold}🚀 Quick Start Development Workflow${colors.reset}`);
  log(`${colors.cyan}Running full development setup...${colors.reset}\n`);
  
  // Health check first
  healthCheck();
  
  // Clean install if needed
  log(`\n${colors.yellow}Checking if clean install is needed...${colors.reset}`);
  if (!existsSync(join(projectRoot, 'node_modules'))) {
    log(`${colors.cyan}No node_modules found, running clean install...${colors.reset}`);
    cleanInstall();
  } else {
    log(`${colors.green}Dependencies already installed${colors.reset}`);
  }
  
  // Type check
  typeCheck();
  
  // Lint and fix
  lintAndFix();
  
  // Build test
  buildProject();
  
  log(`\n${colors.green}${colors.bold}🎉 Quick Start Complete!${colors.reset}`);
  log(`${colors.cyan}Your development environment is ready!${colors.reset}`);
  log(`${colors.cyan}Run "pnpm run dev" to start development${colors.reset}`);
}

function showProjectInfo() {
  try {
    const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
    
    log(`\n${colors.cyan}${colors.bold}📦 Project Information${colors.reset}`);
    log(`${colors.cyan}Name: ${packageJson.name}${colors.reset}`);
    log(`${colors.cyan}Version: ${packageJson.version}${colors.reset}`);
    log(`${colors.cyan}Node.js: ${packageJson.engines?.node || 'Not specified'}${colors.reset}`);
    log(`${colors.cyan}Package Manager: pnpm${colors.reset}`);
    
    // Check key dependencies
    const hasTailwindV4 = packageJson.dependencies?.tailwindcss?.startsWith('4') || 
                          packageJson.devDependencies?.tailwindcss?.startsWith('4');
    const hasVitePlugin = packageJson.devDependencies?.['@tailwindcss/vite'];
    
    log(`${colors.cyan}Tailwind CSS: ${hasTailwindV4 ? 'v4 ✅' : 'v3 or earlier'}${colors.reset}`);
    log(`${colors.cyan}Vite Plugin: ${hasVitePlugin ? 'Present ✅' : 'Missing ❌'}${colors.reset}`);
    
  } catch (error) {
    log(`${colors.red}Failed to read project info: ${error.message}${colors.reset}`);
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  }

  let running = true;
  let activeProcess = null;

  while (running) {
    logHeader();
    showProjectInfo();
    logMenu();

    try {
      const answer = await askQuestion(`${colors.cyan}Select an option (0-9): ${colors.reset}`);
      
      // Stop any running process
      if (activeProcess) {
        activeProcess.kill();
        activeProcess = null;
      }

      switch (answer.trim()) {
        case '1':
          healthCheck();
          break;
        case '2':
          cleanInstall();
          break;
        case '3':
          buildProject();
          break;
        case '4':
          activeProcess = devServer();
          break;
        case '5':
          runTests();
          break;
        case '6':
          lintAndFix();
          break;
        case '7':
          typeCheck();
          break;
        case '8':
          activeProcess = storybook();
          break;
        case '9':
          quickStart();
          break;
        case '0':
          running = false;
          break;
        default:
          log(`${colors.red}Invalid option: ${answer}${colors.reset}`);
      }

      if (running && answer !== '4' && answer !== '8') {
        await askQuestion(`${colors.yellow}Press Enter to continue...${colors.reset}`);
      }
    } catch (error) {
      log(`${colors.red}Error: ${error.message}${colors.reset}`);
    }
  }

  if (activeProcess) {
    activeProcess.kill();
  }

  rl.close();
  log(`\n${colors.green}${colors.bold}👋 Goodbye!${colors.reset}`);
}

// Handle process termination
process.on('SIGINT', () => {
  log(`\n${colors.yellow}Received SIGINT, shutting down gracefully...${colors.reset}`);
  process.exit(0);
});

process.on('SIGTERM', () => {
  log(`\n${colors.yellow}Received SIGTERM, shutting down gracefully...${colors.reset}`);
  process.exit(0);
});

main().catch(console.error);
