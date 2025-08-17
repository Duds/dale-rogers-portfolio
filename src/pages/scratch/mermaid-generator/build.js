#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  // Project structure
  directories: {
    components: path.join(__dirname, "components"),
    shared: path.join(__dirname, "shared"),
    types: path.join(__dirname, "shared/types"),
    utils: path.join(__dirname, "shared/utils"),
    core: path.join(__dirname, "shared/core"),
    standalone: {
      root: path.join(__dirname, "standalone"),
      scripts: path.join(__dirname, "standalone/scripts"),
      styles: path.join(__dirname, "standalone/styles"),
      assets: path.join(__dirname, "standalone/assets"),
    },
  },
  // Files to copy for standalone version
  standaloneFiles: {
    scripts: ["main.js"],
    styles: ["_main.css"],
    assets: ["_favicon.svg"],
  },
};

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Initialize project structure
function initProjectStructure() {
  console.log("Initializing project structure...");

  // Create directories
  Object.values(config.directories).forEach((dir) => {
    if (typeof dir === "string") {
      ensureDirectoryExists(dir);
    } else {
      Object.values(dir).forEach((subdir) => ensureDirectoryExists(subdir));
    }
  });

  console.log("Project structure initialized successfully.");
}

// Generate standalone version
function generateStandaloneVersion() {
  console.log("Generating standalone version...");

  // Copy shared core files (now TypeScript)
  const coreFiles = fs
    .readdirSync(config.directories.core)
    .filter((file) => file.endsWith(".ts"));

  coreFiles.forEach((file) => {
    const source = path.join(config.directories.core, file);
    // Convert .ts to .js for standalone version
    const target = path.join(
      config.directories.standalone.scripts,
      file.replace(".ts", ".js"),
    );
    fs.copyFileSync(source, target);
    console.log(`Copied core file: ${file} -> ${path.basename(target)}`);
  });

  // Generate minified Tailwind CSS
  try {
    execSync(
      "npx tailwindcss -i ./src/pages/scratch/mermaid-generator/styles/input.css -o ./src/pages/scratch/mermaid-generator/standalone/styles/_main.css --minify",
      { stdio: "inherit" },
    );
    console.log("Generated minified Tailwind CSS");
  } catch (error) {
    console.error("Error generating Tailwind CSS:", error);
    process.exit(1);
  }

  // Create standalone index.html
  const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mermaid Generator</title>
  <link href="styles/_main.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script src="scripts/main.js" defer></script>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <div class="container mx-auto p-4">
    <div class="grid gap-8 md:grid-cols-2">
      <div class="mermaid-editor">
        <!-- Editor content will be injected by main.js -->
      </div>
      <div class="mermaid-preview">
        <!-- Preview content will be injected by main.js -->
      </div>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(
    path.join(config.directories.standalone.root, "index.html"),
    standaloneHtml,
  );
  console.log("Created standalone index.html");

  console.log("Standalone version generated successfully.");
}

// Create zip archive of standalone version
function createStandaloneZip() {
  console.log("Creating standalone zip archive...");
  try {
    const zipName = "mermaid-generator-standalone.zip";
    execSync(
      `cd ${config.directories.standalone.root} && zip -r ../${zipName} .`,
      { stdio: "inherit" },
    );
    console.log(`Created ${zipName}`);
  } catch (error) {
    console.error("Error creating zip archive:", error);
    process.exit(1);
  }
}

// Main build function
async function build() {
  try {
    // Initialize project structure
    initProjectStructure();

    // Parse command line arguments
    const args = process.argv.slice(2);
    const shouldGenerateStandalone = args.includes("--standalone");
    const shouldCreateZip = args.includes("--zip");

    if (shouldGenerateStandalone) {
      generateStandaloneVersion();
      if (shouldCreateZip) {
        createStandaloneZip();
      }
    }

    console.log("Build completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

// Run build
build();
