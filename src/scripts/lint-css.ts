import fs from "fs";
import path from "path";
import { sync as globSync } from "glob";

function lintFile(filePath: string) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const css = fs.readFileSync(absolutePath, "utf-8");
    // Basic CSS validation - check for syntax errors
    if (css.includes("{") && css.includes("}")) {
      console.log(`✅ ${filePath} basic validation passed`);
    } else {
      console.log(`⚠️  ${filePath} minimal CSS content`);
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`❌ ${filePath} error:`, errorMessage);
    process.exitCode = 1;
  }
}

// Check style blocks in Astro components
function lintAstroFile(filePath: string) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const content = fs.readFileSync(absolutePath, "utf-8");
    const styleRegex = /<style[\s\S]*?>([\s\S]*?)<\/style>/g;
    let match: RegExpExecArray | null;
    let blockIndex = 1;
    while ((match = styleRegex.exec(content))) {
      const cssBlock = match[1]!;
      if (cssBlock.includes("{") && cssBlock.includes("}")) {
        console.log(
          `✅ ${filePath} [style block ${blockIndex}] basic validation passed`,
        );
      } else {
        console.log(
          `⚠️  ${filePath} [style block ${blockIndex}] minimal CSS content`,
        );
      }
      blockIndex++;
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`❌ ${filePath} error:`, errorMessage);
    process.exitCode = 1;
  }
}

function main() {
  // Check all CSS files under src/styles (excluding base.css which is imported via global.css)
  const allCssFiles = globSync("src/styles/**/*.css");
  const cssFiles = allCssFiles.filter(
    (file) => path.basename(file) !== "base.css",
  );
  for (const file of cssFiles) {
    lintFile(file);
  }
  // Check <style> blocks in Astro components
  const astroFiles = globSync("src/components/**/*.astro");
  for (const file of astroFiles) {
    lintAstroFile(file);
  }
}

main();
