#!/usr/bin/env node

/**
 * Package Manager Enforcement Script
 * Ensures only pnpm is used for this project
 */

import fs from "fs";
import path from "path";

// Check for unwanted lockfiles
const unwantedLockfiles = ["package-lock.json", "yarn.lock"];
const foundUnwanted = [];

unwantedLockfiles.forEach((lockfile) => {
  if (fs.existsSync(lockfile)) {
    foundUnwanted.push(lockfile);
  }
});

if (foundUnwanted.length > 0) {
  console.error("❌ Found unwanted lockfiles:");
  foundUnwanted.forEach((file) => console.error(`   - ${file}`));
  console.error("\nThis project uses pnpm only. Please:");
  console.error("1. Delete the unwanted lockfiles");
  console.error('2. Run "pnpm install" to restore pnpm-lock.yaml');
  console.error("3. Use only pnpm commands (pnpm install, pnpm add, etc.)");
  process.exit(1);
}

// Check if pnpm-lock.yaml exists
if (!fs.existsSync("pnpm-lock.yaml")) {
  console.error("❌ pnpm-lock.yaml not found!");
  console.error('Please run "pnpm install" to generate the lockfile.');
  process.exit(1);
}

console.log("✅ Package manager check passed - pnpm is properly configured!");
console.log("📦 Use pnpm commands: pnpm install, pnpm add, pnpm run dev, etc.");
