import { uiColours } from "../styles/theme/colors.ts";
import { shadows } from "../styles/theme/shadows.ts";
import { spacing } from "../styles/theme/spacing.ts";
import { fontSize } from "../styles/theme/typography.ts";
import { radius } from "../styles/theme/radius.ts";
import { transitionDurationTokens } from "../styles/theme/transitions.ts";
import { zIndex } from "../styles/theme/zIndex.ts";
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
  path.join(__dirname, "../styles/generated-tokens.css"),
  css.trim() + "\n"
);

console.log("Generated CSS variables for theme tokens!");
