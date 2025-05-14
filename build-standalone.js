/**
 * Build Standalone Mermaid Generator
 *
 * This script builds the standalone version of the Mermaid Generator
 * by copying the necessary files to the dist directory.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const SOURCE_DIR = path.join(__dirname, "src/pages/scratch/mermaid-generator");
const STANDALONE_DIR = path.join(SOURCE_DIR, "standalone");
const BUILD_DIR = path.join(
  __dirname,
  "dist/scratch/mermaid-generator/standalone"
);

// Ensure build directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy directory recursively
function copyDir(src, dest) {
  ensureDirectoryExists(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main build process
async function build() {
  try {
    console.log("Building standalone Mermaid Generator...");

    // Ensure build directory exists
    ensureDirectoryExists(BUILD_DIR);

    // Copy standalone directory
    console.log("Copying standalone files...");
    copyDir(STANDALONE_DIR, BUILD_DIR);

    console.log("Standalone build complete!");
    console.log(`Files are available in ${BUILD_DIR}`);
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

// Run the build
build();
