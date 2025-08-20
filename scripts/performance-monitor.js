#!/usr/bin/env node

/**
 * Performance Monitoring Script
 * Tracks bundle sizes, build times, and alerts when budgets are exceeded
 */

import { execSync } from "child_process";
import { readFileSync, existsSync, statSync, writeFileSync } from "fs";
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

function logMetric(label, value, unit, status = "info") {
  const color =
    status === "good"
      ? "green"
      : status === "warning"
        ? "yellow"
        : status === "error"
          ? "red"
          : "blue";
  log(`${label}: ${value}${unit}`, color);
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Performance budgets
const PERFORMANCE_BUDGETS = {
  clientBundle: {
    warning: 5 * 1024 * 1024, // 5MB
    error: 10 * 1024 * 1024, // 10MB
    target: 3 * 1024 * 1024, // 3MB
  },
  serverBundle: {
    warning: 8 * 1024 * 1024, // 8MB
    error: 15 * 1024 * 1024, // 15MB
    target: 5 * 1024 * 1024, // 5MB
  },
  buildTime: {
    warning: 30, // 30 seconds
    error: 60, // 60 seconds
    target: 20, // 20 seconds
  },
  individualFile: {
    warning: 200 * 1024, // 200KB
    error: 500 * 1024, // 500KB
    target: 100 * 1024, // 100KB
  },
};

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
  } catch (error) {
    return 0;
  }
}

function assessPerformance(metric, value, budget) {
  if (value <= budget.target) {
    return { status: "good", message: "Within target" };
  } else if (value <= budget.warning) {
    return { status: "warning", message: "Approaching limit" };
  } else if (value <= budget.error) {
    return { status: "error", message: "Exceeds warning threshold" };
  } else {
    return { status: "error", message: "Exceeds error threshold" };
  }
}

function measureBuildTime() {
  const startTime = Date.now();

  try {
    logInfo("Building project to measure performance...");
    execSync("pnpm run build", {
      stdio: "pipe",
      cwd: projectRoot,
    });

    const endTime = Date.now();
    const buildTime = (endTime - startTime) / 1000; // Convert to seconds

    return buildTime;
  } catch (error) {
    logError(`Build failed: ${error.message}`);
    return null;
  }
}

function analyzeBundlePerformance() {
  logSection("📊 Bundle Performance Analysis");

  const distPath = join(projectRoot, "dist");
  if (!existsSync(distPath)) {
    logWarning("No build output found. Run build first.");
    return null;
  }

  const clientPath = join(distPath, "client");
  const serverPath = join(distPath, "server");

  const results = {
    client: { size: 0, status: "unknown" },
    server: { size: 0, status: "unknown" },
    files: [],
    timestamp: new Date().toISOString(),
  };

  // Analyze client bundle
  if (existsSync(clientPath)) {
    const clientSize = getDirectorySize(clientPath);
    const clientAssessment = assessPerformance(
      "clientBundle",
      clientSize,
      PERFORMANCE_BUDGETS.clientBundle,
    );

    results.client = {
      size: clientSize,
      sizeFormatted: formatBytes(clientSize),
      status: clientAssessment.status,
      message: clientAssessment.message,
    };

    logInfo("Client Bundle:");
    logMetric(
      "  Size",
      results.client.sizeFormatted,
      "",
      clientAssessment.status,
    );
    logInfo(`  Status: ${clientAssessment.message}`);

    // Analyze individual files
    try {
      const clientFiles = execSync(
        `find "${clientPath}" -type f -name "*.js"`,
        { encoding: "utf8" },
      )
        .split("\n")
        .filter(Boolean);

      for (const file of clientFiles) {
        const fileSize = statSync(file).size;
        const fileName = file.replace(clientPath + "/", "");
        const fileAssessment = assessPerformance(
          "individualFile",
          fileSize,
          PERFORMANCE_BUDGETS.individualFile,
        );

        results.files.push({
          name: fileName,
          size: fileSize,
          sizeFormatted: formatBytes(fileSize),
          status: fileAssessment.status,
        });

        if (fileAssessment.status !== "good") {
          logWarning(
            `  ${fileName}: ${formatBytes(fileSize)} - ${fileAssessment.message}`,
          );
        }
      }
    } catch (error) {
      logWarning("Could not analyze individual client files");
    }
  }

  // Analyze server bundle
  if (existsSync(serverPath)) {
    const serverSize = getDirectorySize(serverPath);
    const serverAssessment = assessPerformance(
      "serverBundle",
      serverSize,
      PERFORMANCE_BUDGETS.serverBundle,
    );

    results.server = {
      size: serverSize,
      sizeFormatted: formatBytes(serverSize),
      status: serverAssessment.status,
      message: serverAssessment.message,
    };

    logInfo("Server Bundle:");
    logMetric(
      "  Size",
      results.server.sizeFormatted,
      "",
      serverAssessment.status,
    );
    logInfo(`  Status: ${serverAssessment.message}`);
  }

  return results;
}

function generatePerformanceReport(bundleResults, buildTime) {
  logSection("📋 Performance Report");

  const report = {
    timestamp: new Date().toISOString(),
    buildTime: buildTime,
    bundleAnalysis: bundleResults,
    summary: {
      overallStatus: "good",
      issues: [],
      recommendations: [],
    },
  };

  // Assess overall status
  const statuses = [
    bundleResults?.client?.status,
    bundleResults?.server?.status,
    buildTime
      ? assessPerformance("buildTime", buildTime, PERFORMANCE_BUDGETS.buildTime)
          .status
      : "good",
  ].filter(Boolean);

  if (statuses.includes("error")) {
    report.summary.overallStatus = "error";
  } else if (statuses.includes("warning")) {
    report.summary.overallStatus = "warning";
  }

  // Generate recommendations
  if (bundleResults?.client?.status !== "good") {
    report.summary.recommendations.push("Optimize client bundle size");
  }

  if (bundleResults?.server?.status !== "good") {
    report.summary.recommendations.push("Optimize server bundle size");
  }

  if (buildTime && buildTime > PERFORMANCE_BUDGETS.buildTime.target) {
    report.summary.recommendations.push("Optimize build process");
  }

  // Check for large individual files
  const largeFiles =
    bundleResults?.files?.filter((f) => f.status !== "good") || [];
  if (largeFiles.length > 0) {
    report.summary.recommendations.push(
      `Optimize ${largeFiles.length} large files`,
    );
  }

  // Display summary
  logInfo("Overall Status:");
  const statusColor =
    report.summary.overallStatus === "good"
      ? "green"
      : report.summary.overallStatus === "warning"
        ? "yellow"
        : "red";
  log(`  ${report.summary.overallStatus.toUpperCase()}`, statusColor);

  if (report.summary.recommendations.length > 0) {
    logInfo("\nRecommendations:");
    report.summary.recommendations.forEach((rec) => {
      logInfo(`  • ${rec}`);
    });
  }

  return report;
}

function savePerformanceHistory(report) {
  const historyPath = join(projectRoot, "performance-history.json");
  let history = [];

  try {
    if (existsSync(historyPath)) {
      history = JSON.parse(readFileSync(historyPath, "utf8"));
    }
  } catch (error) {
    logWarning("Could not read existing performance history");
  }

  // Keep only last 30 entries
  history = history.slice(-29);
  history.push(report);

  try {
    writeFileSync(historyPath, JSON.stringify(history, null, 2));
    logSuccess("Performance history saved");
  } catch (error) {
    logError(`Failed to save performance history: ${error.message}`);
  }
}

function showPerformanceTrends() {
  const historyPath = join(projectRoot, "performance-history.json");

  if (!existsSync(historyPath)) {
    logInfo("No performance history available");
    return;
  }

  try {
    const history = JSON.parse(readFileSync(historyPath, "utf8"));

    if (history.length < 2) {
      logInfo("Insufficient history for trend analysis");
      return;
    }

    logSection("📈 Performance Trends");

    const latest = history[history.length - 1];
    const previous = history[history.length - 2];

    // Client bundle trend
    if (latest.bundleAnalysis?.client && previous.bundleAnalysis?.client) {
      const current = latest.bundleAnalysis.client.size;
      const prev = previous.bundleAnalysis.client.size;
      const change = current - prev;
      const changePercent = ((change / prev) * 100).toFixed(1);

      logInfo("Client Bundle Trend:");
      if (change > 0) {
        logWarning(`  Increased by ${formatBytes(change)} (${changePercent}%)`);
      } else if (change < 0) {
        logSuccess(
          `  Decreased by ${formatBytes(Math.abs(change))} (${Math.abs(changePercent)}%)`,
        );
      } else {
        logInfo("  No change");
      }
    }

    // Build time trend
    if (latest.buildTime && previous.buildTime) {
      const change = latest.buildTime - previous.buildTime;
      const changePercent = ((change / previous.buildTime) * 100).toFixed(1);

      logInfo("Build Time Trend:");
      if (change > 0) {
        logWarning(`  Increased by ${change.toFixed(1)}s (${changePercent}%)`);
      } else if (change < 0) {
        logSuccess(
          `  Decreased by ${Math.abs(change).toFixed(1)}s (${Math.abs(changePercent)}%)`,
        );
      } else {
        logInfo("  No change");
      }
    }
  } catch (error) {
    logError(`Failed to analyze trends: ${error.message}`);
  }
}

async function main() {
  console.log("📊 Dale Rogers Portfolio - Performance Monitor\n");

  logSection("🚀 Measuring Build Performance");

  const buildTime = measureBuildTime();

  if (buildTime !== null) {
    const buildAssessment = assessPerformance(
      "buildTime",
      buildTime,
      PERFORMANCE_BUDGETS.buildTime,
    );

    logInfo("Build Performance:");
    logMetric("  Time", buildTime.toFixed(1), "s", buildAssessment.status);
    logInfo(`  Status: ${buildAssessment.message}`);
  }

  logSection("📦 Analyzing Bundle Performance");

  const bundleResults = analyzeBundlePerformance();

  if (bundleResults) {
    logSection("📋 Generating Performance Report");

    const report = generatePerformanceReport(bundleResults, buildTime);

    // Save to history
    savePerformanceHistory(report);

    // Show trends
    showPerformanceTrends();

    logSection("💡 Next Steps");

    if (report.summary.overallStatus === "good") {
      logSuccess("Performance is within acceptable ranges");
      logInfo("Continue monitoring and optimizing incrementally");
    } else {
      logWarning("Performance issues detected");
      logInfo("Address recommendations above before next deployment");
    }

    logInfo("\n📊 Monitoring:");
    logInfo("  • Run this script after each build");
    logInfo("  • Review performance-history.json for trends");
    logInfo("  • Set up CI/CD alerts for budget violations");
  } else {
    logError("Could not complete performance analysis");
  }

  console.log("\n📊 Performance monitoring complete!");
}

main().catch(console.error);
