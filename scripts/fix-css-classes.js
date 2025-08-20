#!/usr/bin/env node

/**
 * Fix CSS Classes Script
 *
 * This script fixes the invalid Tailwind classes that were created
 * by the migration script, replacing them with proper CSS variables.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Mapping of invalid classes to proper CSS variable replacements
const CLASS_FIXES = {
  // Text color classes
  "text-text-primary": "color: var(--color-text-primary);",
  "text-text-secondary": "color: var(--color-text-secondary);",
  "text-text-tertiary": "color: var(--color-text-tertiary);",
  "text-text-muted": "color: var(--color-text-muted);",
  "text-text-disabled": "color: var(--color-text-disabled);",
  "text-text-inverse": "color: var(--color-text-inverse);",

  // Background color classes
  "bg-text-primary": "background-color: var(--color-text-primary);",
  "bg-text-secondary": "background-color: var(--color-text-secondary);",
  "bg-text-tertiary": "background-color: var(--color-text-tertiary);",
  "bg-text-muted": "background-color: var(--color-text-muted);",
  "bg-text-disabled": "background-color: var(--color-text-disabled);",
  "bg-text-inverse": "background-color: var(--color-text-inverse);",

  // Border color classes
  "border-border-primary": "border-color: var(--color-border-primary);",
  "border-border-secondary": "border-color: var(--color-border-secondary);",
  "border-border-tertiary": "border-color: var(--color-border-tertiary);",
  "border-border-focus": "border-color: var(--color-border-focus);",
  "border-border-error": "border-color: var(--color-border-error);",

  // Background classes
  "bg-background-primary": "background-color: var(--color-background-primary);",
  "bg-background-secondary":
    "background-color: var(--color-background-secondary);",
  "bg-background-tertiary":
    "background-color: var(--color-background-tertiary);",
  "bg-background-elevated":
    "background-color: var(--color-background-elevated);",
  "bg-background-overlay": "background-color: var(--color-background-overlay);",

  // Brand classes
  "bg-brand-highlight": "background-color: var(--color-brand-highlight);",
  "bg-brand-emphasis": "background-color: var(--color-brand-emphasis);",
  "bg-brand-subtle": "background-color: var(--color-brand-subtle);",
  "text-brand-highlight": "color: var(--color-brand-highlight);",
  "text-brand-emphasis": "color: var(--color-brand-emphasis);",
  "text-brand-subtle": "color: var(--color-brand-subtle);",
  "border-brand-highlight": "border-color: var(--color-brand-highlight);",
  "border-brand-emphasis": "border-color: var(--color-brand-emphasis);",
  "border-brand-subtle": "border-color: var(--color-brand-subtle);",

  // Accent classes
  "bg-accent-main": "background-color: var(--color-accent-main);",
  "bg-accent-light": "background-color: var(--color-accent-light);",
  "bg-accent-dark": "background-color: var(--color-accent-dark);",
  "text-accent-main": "color: var(--color-accent-main);",
  "text-accent-light": "color: var(--color-accent-light);",
  "text-accent-dark": "color: var(--color-accent-dark);",
  "border-accent-main": "border-color: var(--color-accent-main);",
  "border-accent-light": "border-color: var(--color-accent-light);",
  "border-accent-dark": "border-color: var(--color-accent-dark);",

  // State classes
  "bg-state-success": "background-color: var(--color-state-success);",
  "bg-state-warning": "background-color: var(--color-state-warning);",
  "bg-state-error": "background-color: var(--color-state-error);",
  "bg-state-info": "background-color: var(--color-state-info);",
  "text-state-success": "color: var(--color-state-success);",
  "text-state-warning": "color: var(--color-state-warning);",
  "text-state-error": "color: var(--color-state-error);",
  "text-state-info": "color: var(--color-state-info);",
  "border-state-success": "border-color: var(--color-state-success);",
  "border-state-warning": "border-color: var(--color-state-warning);",
  "border-state-error": "border-color: var(--color-state-error);",
  "border-state-info": "border-color: var(--color-state-info);",

  // Interactive classes
  "bg-interactive-hover": "background-color: var(--color-interactive-hover);",
  "bg-interactive-active": "background-color: var(--color-interactive-active);",
  "bg-interactive-selected":
    "background-color: var(--color-interactive-selected);",
  "bg-interactive-focus": "background-color: var(--color-interactive-focus);",

  // Shadow classes
  "shadow-shadow-light": "box-shadow: var(--shadow-light);",
  "shadow-shadow-medium": "box-shadow: var(--shadow-medium);",
  "shadow-shadow-heavy": "box-shadow: var(--shadow-heavy);",
  "shadow-shadow-colored": "box-shadow: var(--shadow-colored);",

  // Hover states
  "hover:bg-text-primary": "hover:background-color: var(--color-text-primary);",
  "hover:bg-text-secondary":
    "hover:background-color: var(--color-text-secondary);",
  "hover:bg-text-tertiary":
    "hover:background-color: var(--color-text-tertiary);",
  "hover:bg-text-muted": "hover:background-color: var(--color-text-muted);",
  "hover:bg-text-disabled":
    "hover:background-color: var(--color-text-disabled);",
  "hover:bg-text-inverse": "hover:background-color: var(--color-text-inverse);",

  "hover:text-text-primary": "hover:color: var(--color-text-primary);",
  "hover:text-text-secondary": "hover:color: var(--color-text-secondary);",
  "hover:text-text-tertiary": "hover:color: var(--color-text-tertiary);",
  "hover:text-text-muted": "hover:color: var(--color-text-muted);",
  "hover:text-text-disabled": "hover:color: var(--color-text-disabled);",
  "hover:text-text-inverse": "hover:color: var(--color-text-inverse);",

  // Focus states
  "focus:ring-text-primary": "focus:ring-color: var(--color-text-primary);",
  "focus:ring-text-secondary": "focus:ring-color: var(--color-text-secondary);",
  "focus:ring-text-tertiary": "focus:ring-color: var(--color-text-tertiary);",
  "focus:ring-text-muted": "focus:ring-color: var(--color-text-muted);",
  "focus:ring-text-disabled": "focus:ring-color: var(--color-text-disabled);",
  "focus:ring-text-inverse": "focus:ring-color: var(--color-text-inverse);",

  "focus:ring-border-primary": "focus:ring-color: var(--color-border-primary);",
  "focus:ring-border-secondary":
    "focus:ring-color: var(--color-border-secondary);",
  "focus:ring-border-tertiary":
    "focus:ring-color: var(--color-border-tertiary);",
  "focus:ring-border-focus": "focus:ring-color: var(--color-border-focus);",
  "focus:ring-border-error": "focus:ring-color: var(--color-border-error);",

  "focus:ring-brand-highlight":
    "focus:ring-color: var(--color-brand-highlight);",
  "focus:ring-brand-emphasis": "focus:ring-color: var(--color-brand-emphasis);",
  "focus:ring-brand-subtle": "focus:ring-color: var(--color-brand-subtle);",

  "focus:ring-accent-main": "focus:ring-color: var(--color-accent-main);",
  "focus:ring-accent-light": "focus:ring-color: var(--color-accent-light);",
  "focus:ring-accent-dark": "focus:ring-color: var(--color-accent-dark);",

  "focus:ring-state-success": "focus:ring-color: var(--color-state-success);",
  "focus:ring-state-warning": "focus:ring-color: var(--color-state-warning);",
  "focus:ring-state-error": "focus:ring-color: var(--color-state-error);",
  "focus:ring-state-info": "focus:ring-color: var(--color-state-info);",
};

function findCSSFiles(directory) {
  const files = [];

  function scanDir(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !item.startsWith(".") &&
        item !== "node_modules"
      ) {
        scanDir(fullPath);
      } else if (stat.isFile() && item.endsWith(".css")) {
        files.push(fullPath);
      }
    }
  }

  scanDir(directory);
  return files;
}

function fixCSSFile(filePath) {
  console.log(`Fixing: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");
  let hasChanges = false;

  // Fix invalid classes
  for (const [invalidClass, replacement] of Object.entries(CLASS_FIXES)) {
    if (content.includes(invalidClass)) {
      // Replace in @apply rules
      content = content.replace(
        new RegExp(`@apply[^;]*${invalidClass}[^;]*;`, "g"),
        (match) => {
          const newMatch = match.replace(invalidClass, "");
          return newMatch + "\n  " + replacement;
        }
      );

      // Replace standalone classes
      content = content.replace(new RegExp(`\\b${invalidClass}\\b`, "g"), "");

      hasChanges = true;
      console.log(`  Fixed: ${invalidClass} → ${replacement}`);
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  ✅ Updated: ${filePath}`);
  } else {
    console.log(`  ⏭️  No fixes needed: ${filePath}`);
  }

  return hasChanges;
}

function main() {
  console.log("🔧 CSS Class Fix Script");
  console.log("========================\n");

  const stylesDir = path.join(process.cwd(), "src", "styles");

  if (!fs.existsSync(stylesDir)) {
    console.error(
      "❌ src/styles directory not found. Run this script from the project root."
    );
    process.exit(1);
  }

  console.log("🔍 Scanning for CSS files to fix...\n");

  const cssFiles = findCSSFiles(stylesDir);
  console.log(`Found ${cssFiles.length} CSS files to check:\n`);

  let totalFixes = 0;

  for (const file of cssFiles) {
    const hasFixes = fixCSSFile(file);
    if (hasFixes) totalFixes++;
    console.log(""); // Add spacing between files
  }

  console.log("🎉 CSS Fix Complete!");
  console.log(`📊 Total files fixed: ${totalFixes}/${cssFiles.length}`);

  if (totalFixes > 0) {
    console.log("\n📝 Next steps:");
    console.log("1. Try building the project again");
    console.log("2. Check for any remaining invalid classes");
    console.log("3. Test components in both light and dark themes");
  }

  console.log("\n✨ Happy coding!");
}

// Run the script
main();
