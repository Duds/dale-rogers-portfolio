#!/usr/bin/env node
// remove-custom-apply.js
// Node.js script to dry-run removal of custom utility classes from @apply in component CSS files
// Outputs JSON and HTML reports

const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "src/styles/components");
const GLOBAL_CSS = path.join(__dirname, "src/styles/global.css");
const REPORT_JSON = path.join(__dirname, "remove-custom-apply-report.json");
const REPORT_HTML = path.join(__dirname, "remove-custom-apply-report.html");

// 1. Hardcoded list of custom utility classes
const customClasses = [
  "shadow-hover",
  "text-balance",
  "spinning-logo",
  "animate-spin-slow",
  "border-primary",
  "border-primary-dark",
  "bg-nav-bg",
  "bg-nav-bg-dark",
  "bg-nav-bg-mobile",
  "bg-nav-bg-mobile-dark",
  "font-heading",
  "text-nav-text",
  "text-nav-text-dark",
  "hover:text-nav-text-hover",
  "hover:text-nav-text-hover-dark",
];

// 2. Find all CSS files in components dir
function getComponentCssFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".css"))
    .map((f) => path.join(dir, f));
}

// 3. Parse @apply rules and remove custom classes (in-place)
function processCssFile(filePath, customClasses) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  const report = [];
  const applyRegex = /(@apply\s+)([^;]+);/g;
  let changed = false;

  let selector = null;
  let selectorLine = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Track selector (very basic: assumes .selector { ... })
    if (/^[\s]*\.[a-zA-Z0-9\-]+/.test(line)) {
      selector = line.trim().split(" ")[0];
      selectorLine = i + 1;
    }
    let m;
    applyRegex.lastIndex = 0;
    if ((m = applyRegex.exec(line))) {
      const applyClasses = m[2].split(/\s+/);
      const removed = applyClasses.filter((cls) =>
        customClasses.includes(cls.replace(/^\\/, "")),
      );
      const kept = applyClasses.filter(
        (cls) => !customClasses.includes(cls.replace(/^\\/, "")),
      );
      if (removed.length > 0) {
        report.push({
          file: filePath,
          selector: selector || "(unknown)",
          selectorLine: selectorLine || i + 1,
          line: i + 1,
          original: m[0],
          removed,
          kept,
        });
        changed = true;
        // Replace the @apply line with only the kept classes
        if (kept.length > 0) {
          lines[i] = line.replace(m[0], `@apply ${kept.join(" ")};`);
        } else {
          // Remove the line if no classes left
          lines[i] = "";
        }
      }
    }
  }
  if (changed) {
    // Backup original file
    fs.copyFileSync(filePath, filePath + ".bak");
    // Write updated file
    fs.writeFileSync(filePath, lines.join("\n"));
  }
  return report;
}

// 4. Main
function main() {
  console.log("Using hardcoded custom utility classes:", customClasses);

  const files = getComponentCssFiles(COMPONENTS_DIR);
  let allReports = [];
  for (const file of files) {
    const report = processCssFile(file, customClasses);
    if (report.length > 0) {
      allReports = allReports.concat(report);
    }
  }

  // Write JSON report
  const summary = {
    totalFiles: files.length,
    filesWithChanges: Array.from(new Set(allReports.map((r) => r.file))),
    totalApplyRules: allReports.length,
    customClasses,
    allRemovedClasses: Array.from(
      new Set(allReports.flatMap((r) => r.removed)),
    ),
  };
  const jsonReport = { summary, details: allReports };
  fs.writeFileSync(REPORT_JSON, JSON.stringify(jsonReport, null, 2));
  console.log("JSON report written to", REPORT_JSON);

  // Write HTML report
  let html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Remove Custom @apply Report</title><style>body{font-family:sans-serif;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ccc;padding:4px;}th{background:#f3f3f3;}tr:nth-child(even){background:#fafafa;}</style></head><body>`;
  html += `<h1>Remove Custom @apply Report</h1>`;
  html += `<h2>Summary</h2><ul>`;
  html += `<li>Total CSS files scanned: ${summary.totalFiles}</li>`;
  html += `<li>Files with changes: ${summary.filesWithChanges.length}</li>`;
  html += `<li>Total @apply rules with custom classes: ${summary.totalApplyRules}</li>`;
  html += `<li>Custom classes used: <code>${summary.customClasses.join(", ")}</code></li>`;
  html += `<li>All removed classes: <code>${summary.allRemovedClasses.join(", ")}</code></li>`;
  html += `</ul>`;
  html += `<h2>Details</h2><table><tr><th>File</th><th>Selector</th><th>Line</th><th>Original @apply</th><th>Removed Classes</th><th>Kept Classes</th></tr>`;
  for (const r of allReports) {
    html += `<tr><td>${path.relative(process.cwd(), r.file)}</td><td>${r.selector}</td><td>${r.line}</td><td><code>${r.original}</code></td><td><code>${r.removed.join(", ")}</code></td><td><code>${r.kept.join(", ")}</code></td></tr>`;
  }
  html += `</table></body></html>`;
  fs.writeFileSync(REPORT_HTML, html);
  console.log("HTML report written to", REPORT_HTML);

  console.log("Dry run complete. No files were modified.");
}

main();
