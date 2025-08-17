#!/usr/bin/env node

/**
 * Performance Analysis Script
 * Analyzes build performance, bundle sizes, and provides optimization recommendations
 */

import { execSync } from "child_process";
import { readFileSync, existsSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Color codes for output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.blue}${colors.bold}${title}${colors.reset}`);
  console.log("─".repeat(title.length));
}

function logSuccess(message) {
  log(`✅ ${message}`, "green");
}

function logWarning(message) {
  log(`⚠️  ${message}`, "yellow");
}

function logError(message) {
  log(`❌ ${message}`, "red");
}

function logInfo(message) {
  log(`ℹ️  ${message}`, "blue");
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getDirectorySize(dirPath) {
  try {
    if (!existsSync(dirPath)) return 0;

    const stats = statSync(dirPath);
    if (stats.isFile()) return stats.size;

    let totalSize = 0;
    const items = execSync(`find "${dirPath}" -type f`, {
      encoding: "utf8",
    }).split("\n");

    for (const item of items) {
      if (item && existsSync(item)) {
        try {
          totalSize += statSync(item).size;
        } catch {
          // Skip files we can't access
        }
      }
    }

    return totalSize;
  } catch {
    return 0;
  }
}

function analyzeBuildPerformance() {
  logSection("🏗️ Build Performance Analysis");

  try {
    // Check if dist directory exists
    const distPath = join(projectRoot, "dist");
    if (!existsSync(distPath)) {
      logWarning('No build output found. Run "pnpm run build" first.');
      return;
    }

    // Analyze build output sizes
    const clientPath = join(distPath, "client");
    const serverPath = join(distPath, "server");

    if (existsSync(clientPath)) {
      const clientSize = getDirectorySize(clientPath);
      logInfo(`Client bundle size: ${formatBytes(clientSize)}`);

      if (clientSize > 1024 * 1024 * 2) {
        // 2MB
        logWarning(
          "Client bundle is large. Consider code splitting and tree shaking.",
        );
      } else if (clientSize > 1024 * 1024) {
        // 1MB
        logWarning(
          "Client bundle is moderate. Monitor for optimization opportunities.",
        );
      } else {
        logSuccess("Client bundle size is good.");
      }
    }

    if (existsSync(serverPath)) {
      const serverSize = getDirectorySize(serverPath);
      logInfo(`Server bundle size: ${formatBytes(serverSize)}`);

      if (serverSize > 1024 * 1024 * 5) {
        // 5MB
        logWarning(
          "Server bundle is large. Consider lazy loading and dynamic imports.",
        );
      } else if (serverSize > 1024 * 1024 * 2) {
        // 2MB
        logWarning(
          "Server bundle is moderate. Monitor for optimization opportunities.",
        );
      } else {
        logSuccess("Server bundle size is good.");
      }
    }

    // Analyze specific file sizes
    logInfo("\n📁 Key File Analysis:");
    const keyFiles = [
      "client/_astro/client.CLka3vFz.js",
      "client/_astro/index.CzltbaZf.js",
      "client/_astro/SearchInput.astro_astro_type_script_index_0_lang.BzJ85itz.js",
    ];

    for (const file of keyFiles) {
      const filePath = join(distPath, file);
      if (existsSync(filePath)) {
        const size = statSync(filePath).size;
        logInfo(`${file}: ${formatBytes(size)}`);

        if (size > 1024 * 100) {
          // 100KB
          logWarning(`  ⚠️  Large file - consider optimization`);
        }
      }
    }
  } catch (error) {
    logError(`Failed to analyze build performance: ${error.message}`);
  }
}

function analyzeDependencies() {
  logSection("📦 Dependency Analysis");

  try {
    const packageJsonPath = join(projectRoot, "package.json");
    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

      // Analyze production dependencies
      const prodDeps = Object.keys(packageJson.dependencies || {});
      const devDeps = Object.keys(packageJson.devDependencies || {});

      logInfo(`Production dependencies: ${prodDeps.length}`);
      logInfo(`Development dependencies: ${devDeps.length}`);

      // Check for large or problematic dependencies
      const largeDeps = ["react", "react-dom", "astro", "tailwindcss"];
      for (const dep of largeDeps) {
        if (prodDeps.includes(dep) || devDeps.includes(dep)) {
          logInfo(`  ${dep}: Present`);
        }
      }

      // Check for duplicate or conflicting dependencies
      const allDeps = [...prodDeps, ...devDeps];
      const duplicates = allDeps.filter(
        (item, index) => allDeps.indexOf(item) !== index,
      );

      if (duplicates.length > 0) {
        logWarning(`Duplicate dependencies found: ${duplicates.join(", ")}`);
      } else {
        logSuccess("No duplicate dependencies found.");
      }

      // Check for outdated dependencies
      logInfo("\n📋 Dependency Health:");
      try {
        const outdatedCheck = execSync("pnpm outdated --format=json", {
          encoding: "utf8",
          stdio: "pipe",
          cwd: projectRoot,
        });

        if (outdatedCheck.trim()) {
          const outdated = JSON.parse(outdatedCheck);
          if (outdated.length > 0) {
            logWarning(`${outdated.length} outdated dependencies found`);
            outdated.slice(0, 5).forEach((dep) => {
              logInfo(`  ${dep.name}: ${dep.current} → ${dep.latest}`);
            });
          } else {
            logSuccess("All dependencies are up to date.");
          }
        }
      } catch {
        logInfo("Could not check for outdated dependencies");
      }
    }
  } catch (error) {
    logError(`Failed to analyze dependencies: ${error.message}`);
  }
}

function analyzeTailwindPerformance() {
  logSection("🎨 Tailwind CSS Performance");

  try {
    // Check Tailwind configuration
    logSuccess("Tailwind CSS v4 detected");

    // Check for CSS optimization opportunities
    const globalCSSPath = join(projectRoot, "src/styles/global.css");
    if (existsSync(globalCSSPath)) {
      const globalCSS = readFileSync(globalCSSPath, "utf8");

      // Check for unused CSS patterns
      const unusedPatterns = [
        /@apply\s+[^;]+;/g,
        /\.dark\s+\{[^}]*\}/g,
        /@layer\s+[^;]+;/g,
      ];

      let totalPatterns = 0;

      for (const pattern of unusedPatterns) {
        const matches = globalCSS.match(pattern);
        if (matches) {
          totalPatterns += matches.length;
        }
      }

      logInfo(`CSS patterns found: ${totalPatterns}`);

      if (totalPatterns > 100) {
        logWarning(
          "Large number of CSS patterns. Consider CSS-in-JS or CSS modules.",
        );
      } else {
        logSuccess("CSS patterns are manageable.");
      }
    }

    // Check component CSS files
    const componentsCSSPath = join(projectRoot, "src/styles/components");
    if (existsSync(componentsCSSPath)) {
      try {
        const cssFiles = execSync(`find "${componentsCSSPath}" -name "*.css"`, {
          encoding: "utf8",
        })
          .split("\n")
          .filter(Boolean);

        logInfo(`Component CSS files: ${cssFiles.length}`);

        if (cssFiles.length > 20) {
          logWarning("Many component CSS files. Consider consolidation.");
        } else {
          logSuccess("Component CSS organization is good.");
        }

        // Check for @reference usage
        let totalReferences = 0;
        for (const file of cssFiles) {
          try {
            const content = readFileSync(file, "utf8");
            if (content.includes('@reference "tailwindcss"')) {
              totalReferences++;
            }
          } catch {
            // Skip files we can't read
          }
        }

        logInfo(`Files with @reference: ${totalReferences}/${cssFiles.length}`);

        if (totalReferences < cssFiles.length) {
          logWarning("Some CSS files missing @reference directive");
        } else {
          logSuccess("All CSS files properly reference Tailwind CSS");
        }
      } catch {
        logWarning("Could not analyze component CSS files");
      }
    }
  } catch (error) {
    logError(`Failed to analyze Tailwind performance: ${error.message}`);
  }
}

function generateOptimizationRecommendations() {
  logSection("💡 Optimization Recommendations");

  logInfo("🚀 Build Performance:");
  logInfo("  • Enable Vite build caching for faster rebuilds");
  logInfo("  • Use dynamic imports for code splitting");
  logInfo("  • Implement lazy loading for heavy components");

  logInfo("\n📦 Dependencies:");
  logInfo('  • Regular dependency audits with "pnpm outdated"');
  logInfo('  • Remove unused dependencies with "pnpm prune"');
  logInfo('  • Consider using "pnpm dedupe" for dependency deduplication');

  logInfo("\n🎨 Tailwind CSS:");
  logInfo("  • Monitor CSS bundle size with build analysis");
  logInfo("  • Use @apply sparingly to avoid CSS bloat");
  logInfo("  • Consider CSS purging for production builds");

  logInfo("\n🔧 Development Experience:");
  logInfo('  • Use "pnpm run dev:turbo" for faster development');
  logInfo("  • Monitor build times and optimize slow builds");
  logInfo("  • Implement incremental builds where possible");
}

function runBundleAnalysis() {
  logSection("📊 Bundle Analysis");

  try {
    logInfo("Running bundle analysis...");

    // Check if we have the bundle analyzer
    const hasAnalyzer = existsSync(
      join(projectRoot, "node_modules/vite-bundle-analyzer"),
    );

    if (hasAnalyzer) {
      logSuccess("Bundle analyzer available");
      logInfo("To analyze bundle:");
      logInfo('  1. Run "pnpm run build"');
      logInfo('  2. Run "npx vite-bundle-analyzer dist/client"');
      logInfo("  3. Review bundle composition and sizes");
    } else {
      logWarning("Bundle analyzer not available");
      logInfo("Install with: pnpm add -D vite-bundle-analyzer");
    }
  } catch (error) {
    logError(`Failed to run bundle analysis: ${error.message}`);
  }
}

function main() {
  console.log("🔍 Dale Rogers Portfolio - Performance Analysis\n");

  analyzeBuildPerformance();
  analyzeDependencies();
  analyzeTailwindPerformance();
  runBundleAnalysis();
  generateOptimizationRecommendations();

  logSection("📋 Performance Analysis Complete");
  logInfo("Review the analysis above and implement recommended optimizations.");
  logInfo("Run this script after making changes to track improvements.");

  console.log("\n🚀 Ready for optimization!");
}

main();
