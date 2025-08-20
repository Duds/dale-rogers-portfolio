#!/usr/bin/env tsx

import { promises as fs } from "fs";
import path from "path";
import { sync as globSync } from "glob";

(async () => {
  const patterns = ["src/**/*.astro", "src/**/*.mdc"];
  // Entry type for grouping violations
  type EntryType = "css-var" | "arbitrary" | "both";
  interface Entry {
    file: string;
    line: number;
    text: string;
    type: EntryType;
  }
  const entries: Entry[] = [];

  for (const pattern of patterns) {
    const files = globSync(pattern, {
      ignore: ["**/node_modules/**", "**/.cursor/**"],
    });
    for (const file of files) {
      const content = await fs.readFile(file, "utf-8");
      const lines = content.split(/\r?\n/);
      let inStyleBlock = false;
      lines.forEach((line, idx) => {
        const raw = line;
        // Toggle style block detection
        if (/^\s*<style/.test(raw)) {
          inStyleBlock = true;
        }
        if (inStyleBlock) {
          if (/^\s*<\/style>/.test(raw)) {
            inStyleBlock = false;
          }
          return; // skip CSS inside style tags
        }
        const trimmed = raw.trim();
        const hasVar = trimmed.includes("var(--");
        // Arbitrary Tailwind bracket usage only when containing var(--…)
        const hasArb = /\[var\(--[^\]]+\)\]/.test(trimmed);
        if (hasVar || hasArb) {
          const type: EntryType =
            hasVar && hasArb ? "both" : hasVar ? "css-var" : "arbitrary";
          entries.push({ file, line: idx + 1, text: trimmed, type });
        }
      });
    }
  }

  // Summarise counts by violation type
  const counts: Record<EntryType, number> = {
    "css-var": 0,
    arbitrary: 0,
    both: 0,
  };
  entries.forEach((e) => (counts[e.type] = (counts[e.type] || 0) + 1));
  // Group entries by violation type
  const groupEntries: Record<EntryType, Entry[]> = {
    "css-var": entries.filter((e) => e.type === "css-var"),
    arbitrary: entries.filter((e) => e.type === "arbitrary"),
    both: entries.filter((e) => e.type === "both"),
  };
  // Generate grouped HTML sections
  const groupSections = (["css-var", "arbitrary", "both"] as EntryType[])
    .map((type) => {
      const label =
        type === "css-var"
          ? "CSS Var Usage"
          : type === "arbitrary"
            ? "Arbitrary Property Usage"
            : "Both Types";
      const rows =
        groupEntries[type]
          .map(
            (e) => `
    <tr>
      <td>${e.file}</td>
      <td>${e.line}</td>
      <td>${e.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
    </tr>`,
          )
          .join("") || '<tr><td colspan="3">No entries</td></tr>';
      return `
  <h2>${label} (${counts[type]})</h2>
  <table>
    <thead><tr><th>File</th><th>Line</th><th>Snippet</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
    })
    .join("");

  const reportHtml = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <title>CSS Token Usage Report</title>
  <style>
    body { font-family: sans-serif; padding: 1rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; }
    th { background: #f0f0f0; }
  </style>
</head>
<body>
  <h1>CSS Token Usage Report</h1>
  <p>Generated on ${new Date().toLocaleString("en-AU")}.</p>
  <p>Total issues: ${entries.length}</p>
  <ul>
    <li>CSS var usages: ${counts["css-var"]}</li>
    <li>Arbitrary property usages: ${counts["arbitrary"]}</li>
    <li>Both types: ${counts["both"]}</li>
  </ul>
  ${groupSections}
</body>
</html>`;

  const outDir = path.dirname("reports/css-token-usage.html");
  await fs.mkdir(outDir, { recursive: true });
  const htmlPath = "reports/css-token-usage.html";
  const jsonPath = "reports/css-token-usage.json";
  await fs.writeFile(htmlPath, reportHtml, "utf-8");
  // Write JSON with grouped summary and detailed entries
  const report = {
    generatedOn: new Date().toISOString(),
    total: entries.length,
    counts,
    entries,
  };
  await fs.writeFile(jsonPath, JSON.stringify(report, null, 2), "utf-8");
  console.log(
    `Reports written to ${htmlPath} and ${jsonPath} (${entries.length} issues found)`,
  );
  if (entries.length > 0) {
    console.error(`${entries.length} issues found, failing CI.`);
    process.exit(1);
  }
})();
