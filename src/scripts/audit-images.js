#!/usr/bin/env node

/**
 * Image Accessibility Audit Script
 *
 * This script audits all images in the project for:
 * - Missing alt text
 * - Alt text quality
 - Image loading performance
 * - Accessibility compliance
 */

import fs from "fs";
import path from "path";
import pkg from "glob";
const { sync } = pkg;

// Configuration
const CONFIG = {
  minAltLength: 10,
  maxAltLength: 125,
  requiredAltKeywords: ["representing", "showing", "depicting"],
  imageExtensions: [".jpg", ".jpeg", ".png", ".webp", ".svg"],
  contentDirectories: ["src/content", "src/pages", "src/components"],
  outputFile: "image-audit-report.json",
};

// Audit results
const auditResults = {
  timestamp: new Date().toISOString(),
  summary: {
    totalImages: 0,
    compliantImages: 0,
    nonCompliantImages: 0,
    missingAltText: 0,
    poorAltText: 0,
    performanceIssues: 0,
  },
  issues: [],
  recommendations: [],
};

/**
 * Check if alt text meets accessibility standards
 */
function validateAltText(altText) {
  const issues = [];

  if (!altText || altText.trim() === "") {
    issues.push("Missing alt text");
    auditResults.summary.missingAltText++;
    return issues;
  }

  const trimmedAlt = altText.trim();

  if (trimmedAlt.length < CONFIG.minAltLength) {
    issues.push(
      `Alt text too short (${trimmedAlt.length} chars, minimum ${CONFIG.minAltLength})`
    );
    auditResults.summary.poorAltText++;
  }

  if (trimmedAlt.length > CONFIG.maxAltLength) {
    issues.push(
      `Alt text too long (${trimmedAlt.length} chars, maximum ${CONFIG.maxAltLength})`
    );
    auditResults.summary.poorAltText++;
  }

  // Check for generic alt text
  const genericPatterns = [
    /^image$/i,
    /^photo$/i,
    /^picture$/i,
    /^img$/i,
    /^graphic$/i,
  ];

  if (genericPatterns.some((pattern) => pattern.test(trimmedAlt))) {
    issues.push("Generic alt text (image, photo, picture, etc.)");
    auditResults.summary.poorAltText++;
  }

  // Check for contextual relevance
  const hasContext = CONFIG.requiredAltKeywords.some((keyword) =>
    trimmedAlt.toLowerCase().includes(keyword)
  );

  if (!hasContext && trimmedAlt.length > 20) {
    issues.push("Alt text lacks contextual relevance");
    auditResults.summary.poorAltText++;
  }

  return issues;
}

/**
 * Check image performance
 */
function validateImagePerformance(imagePath, imageUrl) {
  const issues = [];

  if (imageUrl && imageUrl.includes("unsplash.com")) {
    // Check Unsplash optimization parameters
    if (!imageUrl.includes("q=80")) {
      issues.push("Missing quality parameter (should be q=80)");
    }

    if (!imageUrl.includes("auto=format")) {
      issues.push("Missing auto format parameter");
    }

    if (!imageUrl.includes("fit=crop")) {
      issues.push("Missing fit parameter");
    }
  }

  return issues;
}

/**
 * Audit MDX content files
 */
async function auditMDXFiles() {
  try {
    const mdxFiles = sync("src/**/*.{mdx,md}");

    for (const filePath of mdxFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for coverImage in frontmatter
        if (line.includes("coverImage:")) {
          const imageUrl = line
            .split("coverImage:")[1]
            ?.trim()
            .replace(/['"]/g, "");
          if (imageUrl) {
            auditResults.summary.totalImages++;

            const performanceIssues = validateImagePerformance(
              filePath,
              imageUrl
            );
            if (performanceIssues.length > 0) {
              auditResults.issues.push({
                file: filePath,
                line: i + 1,
                type: "performance",
                imageUrl,
                issues: performanceIssues,
              });
              auditResults.summary.performanceIssues++;
            }
          }
        }

        // Check for image objects with alt text
        if (line.includes("image:")) {
          let altText = "";
          let imageUrl = "";

          // Look for alt text in subsequent lines
          for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
            const nextLine = lines[j];
            if (nextLine.includes("alt:")) {
              altText = nextLine.split("alt:")[1]?.trim().replace(/['"]/g, "");
            }
            if (nextLine.includes("src:")) {
              imageUrl = nextLine.split("src:")[1]?.trim().replace(/['"]/g, "");
            }
          }

          if (imageUrl) {
            auditResults.summary.totalImages++;

            const altIssues = validateAltText(altText);
            const performanceIssues = validateImagePerformance(
              filePath,
              imageUrl
            );

            if (altIssues.length > 0 || performanceIssues.length > 0) {
              auditResults.issues.push({
                file: filePath,
                line: i + 1,
                type: "accessibility",
                imageUrl,
                altText,
                issues: [...altIssues, ...performanceIssues],
              });

              if (altIssues.length > 0) {
                auditResults.summary.nonCompliantImages++;
              }
            } else {
              auditResults.summary.compliantImages++;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error auditing MDX files:", error);
  }
}

/**
 * Audit Astro component files
 */
async function auditAstroFiles() {
  try {
    const astroFiles = sync("src/**/*.astro");

    for (const filePath of astroFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for img tags
        if (line.includes("<img")) {
          auditResults.summary.totalImages++;

          // Extract alt text and src
          const altMatch = line.match(/alt=["']([^"']*)["']/);
          const srcMatch = line.match(/src=["']([^"']*)["']/);

          const altText = altMatch ? altMatch[1] : "";
          const imageUrl = srcMatch ? srcMatch[1] : "";

          if (imageUrl) {
            const altIssues = validateAltText(altText);
            const performanceIssues = validateImagePerformance(
              filePath,
              imageUrl
            );

            if (altIssues.length > 0 || performanceIssues.length > 0) {
              auditResults.issues.push({
                file: filePath,
                line: i + 1,
                type: "accessibility",
                imageUrl,
                altText,
                issues: [...altIssues, ...performanceIssues],
              });

              if (altIssues.length > 0) {
                auditResults.summary.nonCompliantImages++;
              }
            } else {
              auditResults.summary.compliantImages++;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error auditing Astro files:", error);
  }
}

/**
 * Generate recommendations
 */
function generateRecommendations() {
  if (auditResults.summary.missingAltText > 0) {
    auditResults.recommendations.push({
      priority: "high",
      category: "accessibility",
      message: `Add alt text to ${auditResults.summary.missingAltText} images for screen reader accessibility`,
    });
  }

  if (auditResults.summary.poorAltText > 0) {
    auditResults.recommendations.push({
      priority: "medium",
      category: "accessibility",
      message: `Improve alt text quality for ${auditResults.summary.poorAltText} images to meet WCAG standards`,
    });
  }

  if (auditResults.summary.performanceIssues > 0) {
    auditResults.recommendations.push({
      priority: "medium",
      category: "performance",
      message: `Optimize ${auditResults.summary.performanceIssues} images for better loading performance`,
    });
  }

  // General recommendations
  auditResults.recommendations.push({
    priority: "low",
    category: "best-practices",
    message: "Consider implementing lazy loading for images below the fold",
  });

  auditResults.recommendations.push({
    priority: "low",
    category: "best-practices",
    message: "Use WebP format where possible for better compression",
  });
}

/**
 * Generate report
 */
function generateReport() {
  const reportPath = path.join(process.cwd(), CONFIG.outputFile);

  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));

  console.log("\n📊 Image Accessibility Audit Report");
  console.log("=====================================");
  console.log(`📅 Timestamp: ${auditResults.timestamp}`);
  console.log(`📸 Total Images: ${auditResults.summary.totalImages}`);
  console.log(`✅ Compliant: ${auditResults.summary.compliantImages}`);
  console.log(`❌ Non-compliant: ${auditResults.summary.nonCompliantImages}`);
  console.log(`🚫 Missing Alt Text: ${auditResults.summary.missingAltText}`);
  console.log(`⚠️  Poor Alt Text: ${auditResults.summary.poorAltText}`);
  console.log(
    `🐌 Performance Issues: ${auditResults.summary.performanceIssues}`
  );

  if (auditResults.issues.length > 0) {
    console.log("\n🚨 Issues Found:");
    auditResults.issues.forEach((issue) => {
      console.log(`\n${issue.file}:${issue.line}`);
      console.log(`   Type: ${issue.type}`);
      console.log(`   Image: ${issue.imageUrl}`);
      if (issue.altText) console.log(`   Alt: "${issue.altText}"`);
      console.log(`   Issues: ${issue.issues.join(", ")}`);
    });
  }

  if (auditResults.recommendations.length > 0) {
    console.log("\n💡 Recommendations:");
    auditResults.recommendations.forEach((rec) => {
      const priorityIcon =
        rec.priority === "high"
          ? "🔴"
          : rec.priority === "medium"
            ? "🟡"
            : "🟢";
      console.log(`${priorityIcon} ${rec.message}`);
    });
  }

  console.log(`\n📄 Full report saved to: ${CONFIG.outputFile}`);
}

/**
 * Main audit function
 */
async function runAudit() {
  console.log("🔍 Starting image accessibility audit...");

  try {
    await auditMDXFiles();
    await auditAstroFiles();
    generateRecommendations();
    generateReport();

    // Exit with error code if there are critical issues
    if (auditResults.summary.missingAltText > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Audit failed:", error);
    process.exit(1);
  }
}

// Run the audit
runAudit();
