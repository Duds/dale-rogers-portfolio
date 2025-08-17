import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import config from "../../tailwind.config.ts";
import { globSync } from "glob";

async function lintFile(filePath: string) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const css = fs.readFileSync(absolutePath, "utf-8");
  try {
    await postcss([tailwindcss(config), autoprefixer]).process(css, {
      from: absolutePath,
    });
    console.log(`✅ ${filePath} no errors`);
  } catch (err: any) {
    console.error(`❌ ${filePath} errors:`);
    console.error(err.message || err);
    process.exitCode = 1;
  }
}

// Lint style blocks in Astro components
async function lintAstroFile(filePath: string) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath, "utf-8");
  const styleRegex = /<style[\s\S]*?>([\s\S]*?)<\/style>/g;
  let match: RegExpExecArray | null;
  let blockIndex = 1;
  while ((match = styleRegex.exec(content))) {
    const cssBlock = match[1]!;
    try {
      await postcss([tailwindcss(config), autoprefixer]).process(cssBlock, {
        from: absolutePath,
      });
      console.log(`✅ ${filePath} [style block ${blockIndex}] no errors`);
    } catch (err: any) {
      console.error(`❌ ${filePath} [style block ${blockIndex}] errors:`);
      console.error(err.message || err);
      process.exitCode = 1;
    }
    blockIndex++;
  }
}

async function main() {
  // Lint all CSS files under src/styles (excluding base.css which is imported via global.css)
  const allCssFiles = globSync("src/styles/**/*.css");
  const cssFiles = allCssFiles.filter(
    (file) => path.basename(file) !== "base.css",
  );
  for (const file of cssFiles) {
    await lintFile(file);
  }
  // Lint <style> blocks in Astro components
  const astroFiles = globSync("src/components/**/*.astro");
  for (const file of astroFiles) {
    await lintAstroFile(file);
  }
}

main();
