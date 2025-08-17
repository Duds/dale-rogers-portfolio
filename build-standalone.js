/**
 * Build Standalone Mermaid Generator
 *
 * This script builds the standalone version of the Mermaid Generator
 * by copying the necessary files to the dist directory and ensuring
 * they are compatible with file:// protocol (full portability).
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
  "dist/scratch/mermaid-generator/standalone",
);

// Ensure build directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Transform JS file to be portable (remove ES module syntax)
function transformJsForPortability(filePath) {
  console.log(`Transforming for portability: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");

  // Remove multi-line commented out code blocks (typically removed Astro code)
  content = content.replace(
    /\/\/\s*let message.*?document\.body\.appendChild\(contentTest\);/s,
    "",
  );

  // Remove import/export statements
  content = content.replace(
    /import\s+.*?from\s+['"].*?['"]/g,
    "// Import removed for portability",
  );
  content = content.replace(/export\s+/g, "// export removed: ");

  // Replace arrow functions with regular functions for older browser compatibility
  content = content.replace(
    /const\s+(\w+)\s*=\s*\(\s*([^)]*)\s*\)\s*=>\s*{/g,
    "function $1($2) {",
  );
  content = content.replace(/\(\s*([^)]*)\s*\)\s*=>\s*{/g, "function($1) {");

  // Replace inline arrow functions that return expressions
  content = content.replace(
    /\(\s*([^)]*)\s*\)\s*=>\s*([^{].*?)(?=[\n,;)])/g,
    "function($1) { return $2; }",
  );

  // Replace async/await with promises if needed (simplified)
  content = content.replace(/async\s+function/g, "function");

  // Replace let/const with var for older browsers
  content = content.replace(/\bconst\s+/g, "var ");
  content = content.replace(/\blet\s+/g, "var ");

  // Replace template literals with string concatenation
  content = content.replace(
    /`([^`]*?)\${([^}]*)}\s*([^`]*?)`/g,
    function (match, before, expr, after) {
      // Simple cases only - for complex template literals, this would need to be enhanced
      return '"' + before + '" + (' + expr + ') + "' + after + '"';
    },
  );

  // Add portability comment and version info
  const buildDate = new Date().toISOString();
  content = `/*
 * Portable version - auto-generated on ${buildDate}
 * This file has been transformed to work with file:// protocol
 * and older browsers. Do not edit directly.
 */\n${content}`;

  fs.writeFileSync(filePath, content);
}

// Copy file with optional transformation
function copyFileWithTransform(src, dest, transform = null) {
  fs.copyFileSync(src, dest);
  if (transform) {
    transform(dest);
  }
}

// Copy directory recursively with transformations
function copyDir(src, dest) {
  ensureDirectoryExists(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    // Skip backup files starting with underscore
    if (entry.name.startsWith("_")) {
      console.log(`Skipping backup file: ${entry.name}`);
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Apply transformations based on file type
      if (entry.name.endsWith(".js")) {
        copyFileWithTransform(srcPath, destPath, transformJsForPortability);
      } else if (entry.name === "index.html") {
        copyFileWithTransform(srcPath, destPath, (filePath) => {
          // Ensure script tags don't have type="module"
          let content = fs.readFileSync(filePath, "utf8");
          content = content.replace(/type="module"/g, "");
          // Add build time comment
          const buildTime = new Date().toISOString();
          content = content.replace(
            "</head>",
            `  <!-- Built for file:// compatibility on ${buildTime} -->\n</head>`,
          );
          fs.writeFileSync(filePath, content);
        });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Main build process
async function build() {
  try {
    console.log("Building standalone Mermaid Generator...");

    // Ensure build directory exists
    ensureDirectoryExists(BUILD_DIR);

    // Copy standalone directory with transformations
    console.log("Copying and transforming standalone files...");
    copyDir(STANDALONE_DIR, BUILD_DIR);

    // Create a README file in the build directory
    const readmeContent = `# Standalone Mermaid Generator

This is a portable version of the Mermaid Generator, built on ${new Date().toLocaleDateString("en-AU")}.

## Features
- Open directly from the file system (file:// protocol compatible)
- No server required
- Works in all modern browsers

## Usage
1. Open index.html in any browser
2. Enter your Mermaid syntax
3. Click "Render" to generate the diagram

## Credits
Built with Mermaid.js - https://mermaid.js.org/
`;
    fs.writeFileSync(path.join(BUILD_DIR, "README.md"), readmeContent);

    console.log("Standalone build complete!");
    console.log(`Files are available in ${BUILD_DIR}`);
    console.log(
      "You can open index.html directly with any browser (file:// protocol compatible)",
    );
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

// Run the build
build();
