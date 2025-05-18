/**
 * validate-tailwind-classes.ts
 *
 * Usage:
 *   1. Generate a CSS file with all possible Tailwind classes using the CLI:
 *      npx tailwindcss -c ../../tailwind.config.ts --content "../**/*.{astro,js,ts,tsx,css}" --output .tmp-tailwind-all.css
 *   2. Run this script:
 *      npx ts-node src/scripts/validate-tailwind-classes.ts
 *
 * This script will:
 *   - Parse all class selectors from .tmp-tailwind-all.css
 *   - Scan your codebase for all class names
 *   - Report any classes in your codebase that are not present in the generated CSS
 *
 * Australian English spelling and conventions
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';

const GENERATED_CSS = path.resolve(__dirname, '../../.tmp-tailwind-all.css');

// File globs to scan for class names
const FILE_GLOBS = [
  '../components/**/*.astro',
  '../components/**/*.tsx',
  '../components/**/*.ts',
  '../components/**/*.js',
  '../components/**/*.css',
  '../layouts/**/*.astro',
  '../layouts/**/*.tsx',
  '../layouts/**/*.ts',
  '../layouts/**/*.js',
  '../layouts/**/*.css',
  '../pages/**/*.astro',
  '../pages/**/*.tsx',
  '../pages/**/*.ts',
  '../pages/**/*.js',
  '../pages/**/*.css',
  '../styles/**/*.css',
  '../styles/**/*.ts',
];

// Regex to match class selectors in CSS (e.g., .bg-primary, .text-heading)
const CSS_CLASS_REGEX = /\.([a-zA-Z0-9\-_:]+)/g;
// Regex to match class names in class="..." or className="..." or @apply ...;
const CLASS_REGEX = /(?:class(?:Name)?\s*=\s*"([^"]+)"|@apply\s+([^;]+);)/g;

// Helper to extract class selectors from generated CSS
function extractCssClasses(css: string): Set<string> {
  const classes = new Set<string>();
  let match;
  while ((match = CSS_CLASS_REGEX.exec(css))) {
    classes.add(match[1]);
  }
  return classes;
}

// Helper to extract class names from a string
function extractClasses(content: string): string[] {
  const classes: string[] = [];
  let match;
  while ((match = CLASS_REGEX.exec(content))) {
    const classList = match[1] || match[2];
    if (classList) {
      classes.push(...classList.split(/\s+/));
    }
  }
  return classes;
}

// Helper to recursively get all files matching globs
function getAllFiles(): string[] {
  return FILE_GLOBS.flatMap((pattern) => glob.sync(path.join(__dirname, pattern), { absolute: true }));
}

function main() {
  if (!fs.existsSync(GENERATED_CSS)) {
    console.error('❌ .tmp-tailwind-all.css not found. Please generate it with the Tailwind CLI first.');
    process.exit(1);
  }

  const css = fs.readFileSync(GENERATED_CSS, 'utf8');
  const validClasses = extractCssClasses(css);
  const files = getAllFiles();
  const invalid: Record<string, { file: string; line: number }[]> = {};

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
      const classes = extractClasses(line);
      for (const cls of classes) {
        // Ignore empty, dynamic, or template classes
        if (!cls || cls.includes('{') || cls.includes('}') || cls.includes('[')) continue;
        // Remove trailing colons (e.g., hover:, dark:)
        const base = cls.replace(/^(hover:|dark:|focus:|active:|disabled:|group-hover:|aria-\w+:)*/, '');
        if (!validClasses.has(cls) && !validClasses.has(base)) {
          if (!invalid[cls]) invalid[cls] = [];
          invalid[cls].push({ file, line: idx + 1 });
        }
      }
    });
  }

  // Output report
  if (Object.keys(invalid).length === 0) {
    console.log('✅ No invalid Tailwind classes found.');
  } else {
    console.log('❌ Invalid Tailwind classes detected:');
    for (const [cls, occurrences] of Object.entries(invalid)) {
      console.log(`  - ${cls}`);
      occurrences.forEach(({ file, line }) => {
        console.log(`      at ${file}:${line}`);
      });
    }
    process.exit(1);
  }
}

main();
