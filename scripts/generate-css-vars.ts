import { uiColours } from "../src/styles/theme/colors";
import { shadows } from "../src/styles/theme/shadows";
import { spacing } from "../src/styles/theme/spacing";
import { fontSize } from "../src/styles/theme/typography";
import { radius } from "../src/styles/theme/radius";
import { transitionDurationTokens } from "../src/styles/theme/transitions";
import { zIndex } from "../src/styles/theme/zIndex";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function cssVarsFromObject(
  obj: Record<string, string | number>,
  prefix: string,
  dashCaseKeys = false
) {
  return Object.entries(obj)
    .map(([key, value]) =>
      dashCaseKeys
        ? `  --${prefix}-${key}: ${value};`
        : `  --${prefix}-${toKebabCase(key)}: ${value};`
    )
    .join("\n");
}

const css = `
:root {
${cssVarsFromObject(uiColours, "color")}
${cssVarsFromObject(shadows, "shadow", true)}
${cssVarsFromObject(spacing, "space", true)}
${cssVarsFromObject(fontSize, "text", true)}
${cssVarsFromObject(radius, "radius", true)}
${cssVarsFromObject(transitionDurationTokens, "transition", true)}
${cssVarsFromObject(zIndex, "z", true)}
}
`;

fs.writeFileSync(
  path.join(__dirname, "../src/styles/generated-tokens.css"),
  css.trim() + "\n"
);

console.log("Generated CSS variables for theme tokens!");
