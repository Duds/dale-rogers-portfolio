#!/usr/bin/env node

/**
 * Theme Color Migration Script
 *
 * This script helps migrate components from the old color system
 * (purple, neutral, emerald, amber) to the new semantic system.
 *
 * Usage: node scripts/migrate-theme-colors.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Color mapping from old to new system
const COLOR_MAPPINGS = {
  // Specific color names to semantic names
  "purple-600": "brand-highlight",
  "purple-700": "brand-emphasis",
  "purple-400": "brand-subtle",
  "purple-500": "brand-highlight",

  "neutral-900": "text-primary",
  "neutral-800": "text-primary",
  "neutral-700": "text-secondary",
  "neutral-600": "text-secondary",
  "neutral-500": "text-tertiary",
  "neutral-400": "text-muted",
  "neutral-300": "text-disabled",
  "neutral-200": "border-primary",
  "neutral-100": "background-tertiary",
  "neutral-50": "background-tertiary",

  "emerald-600": "accent-main",
  "emerald-700": "accent-dark",
  "emerald-500": "accent-main",
  "emerald-400": "accent-light",

  "amber-600": "state-warning",
  "amber-500": "state-warning",
  "amber-400": "state-warning",

  // Background colors
  "bg-purple-600": "bg-brand-highlight",
  "bg-purple-700": "bg-brand-emphasis",
  "bg-neutral-900": "bg-background-primary",
  "bg-neutral-800": "bg-background-secondary",
  "bg-neutral-700": "bg-background-tertiary",
  "bg-emerald-600": "bg-accent-main",
  "bg-emerald-700": "bg-accent-dark",
  "bg-amber-600": "bg-state-warning",

  // Text colors
  "text-purple-600": "text-brand-highlight",
  "text-purple-700": "text-brand-emphasis",
  "text-neutral-900": "text-primary",
  "text-neutral-800": "text-primary",
  "text-neutral-700": "text-secondary",
  "text-neutral-600": "text-secondary",
  "text-neutral-500": "text-tertiary",
  "text-neutral-400": "text-muted",
  "text-emerald-600": "text-accent-main",
  "text-amber-600": "text-state-warning",

  // Border colors
  "border-purple-600": "border-brand-highlight",
  "border-neutral-200": "border-primary",
  "border-neutral-300": "border-secondary",
  "border-neutral-700": "border-primary",
  "border-emerald-600": "border-accent-main",
  "border-amber-600": "border-state-warning",

  // Hover states
  "hover:bg-purple-700": "hover:bg-brand-emphasis",
  "hover:bg-neutral-800": "hover:bg-background-secondary",
  "hover:bg-emerald-700": "hover:bg-accent-dark",
  "hover:bg-amber-700": "hover:bg-state-warning",

  "hover:text-purple-700": "hover:text-brand-emphasis",
  "hover:text-neutral-800": "hover:text-primary",
  "hover:text-emerald-700": "hover:text-accent-dark",
  "hover:text-amber-700": "hover:text-state-warning",

  // Focus states
  "focus:ring-purple-600": "focus:ring-brand-highlight",
  "focus:ring-neutral-600": "focus:ring-border-focus",
  "focus:ring-emerald-600": "focus:ring-accent-main",
  "focus:ring-amber-600": "focus:ring-state-warning",
};

// Component variant mappings
const VARIANT_MAPPINGS = {
  'variant: "purple"': 'variant: "primary"',
  'variant: "neutral"': 'variant: "secondary"',
  'variant: "emerald"': 'variant: "accent"',
  'variant: "amber"': 'variant: "brand"',

  'variant: "purple" | "neutral" | "emerald" | "amber"':
    'variant: "primary" | "secondary" | "accent" | "brand"',
};

// CSS class mappings for component variants
const CSS_VARIANT_MAPPINGS = {
  ".services-card--purple": ".services-card--brand",
  ".services-card--neutral": ".services-card--secondary",
  ".services-card--emerald": ".services-card--accent",
  ".services-card--amber": ".services-card--primary",

  ".card--purple": ".card--brand",
  ".card--neutral": ".card--secondary",
  ".card--emerald": ".card--accent",
  ".card--amber": ".card--primary",
};

function findFiles(directory, extensions = [".astro", ".tsx", ".ts", ".css"]) {
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
      } else if (
        stat.isFile() &&
        extensions.some((ext) => item.endsWith(ext))
      ) {
        files.push(fullPath);
      }
    }
  }

  scanDir(directory);
  return files;
}

function migrateFile(filePath) {
  console.log(`Migrating: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");
  let hasChanges = false;

  // Apply color mappings
  for (const [oldColor, newColor] of Object.entries(COLOR_MAPPINGS)) {
    if (content.includes(oldColor)) {
      content = content.replace(new RegExp(oldColor, "g"), newColor);
      hasChanges = true;
      console.log(`  Replaced: ${oldColor} → ${newColor}`);
    }
  }

  // Apply variant mappings
  for (const [oldVariant, newVariant] of Object.entries(VARIANT_MAPPINGS)) {
    if (content.includes(oldVariant)) {
      content = content.replace(new RegExp(oldVariant, "g"), newVariant);
      hasChanges = true;
      console.log(`  Replaced: ${oldVariant} → ${newVariant}`);
    }
  }

  // Apply CSS variant mappings
  for (const [oldCSS, newCSS] of Object.entries(CSS_VARIANT_MAPPINGS)) {
    if (content.includes(oldCSS)) {
      content = content.replace(new RegExp(oldCSS, "g"), newCSS);
      hasChanges = true;
      console.log(`  Replaced: ${oldCSS} → ${newCSS}`);
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  ✅ Updated: ${filePath}`);
  } else {
    console.log(`  ⏭️  No changes needed: ${filePath}`);
  }

  return hasChanges;
}

function main() {
  console.log("🎨 Theme Color Migration Script");
  console.log("================================\n");

  const srcDir = path.join(process.cwd(), "src");
  const componentsDir = path.join(srcDir, "components");
  const stylesDir = path.join(srcDir, "styles");

  if (!fs.existsSync(srcDir)) {
    console.error(
      "❌ src directory not found. Run this script from the project root."
    );
    process.exit(1);
  }

  console.log("🔍 Scanning for files to migrate...\n");

  // Find all relevant files
  const componentFiles = findFiles(componentsDir);
  const styleFiles = findFiles(stylesDir);
  const allFiles = [...componentFiles, ...styleFiles];

  console.log(`Found ${allFiles.length} files to check:\n`);

  let totalChanges = 0;

  // Migrate each file
  for (const file of allFiles) {
    const hasChanges = migrateFile(file);
    if (hasChanges) totalChanges++;
    console.log(""); // Add spacing between files
  }

  console.log("🎉 Migration Complete!");
  console.log(`📊 Total files updated: ${totalChanges}/${allFiles.length}`);

  if (totalChanges > 0) {
    console.log("\n📝 Next steps:");
    console.log("1. Review the changes made");
    console.log("2. Test components in both light and dark themes");
    console.log("3. Update any remaining hardcoded color references");
    console.log("4. Run tests to ensure everything works correctly");
    console.log("5. Commit your changes with a descriptive message");
  }

  console.log("\n✨ Happy coding!");
}

// Run the migration
main();
