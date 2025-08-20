import { colors, darkColors } from "../styles/theme/colors.ts";
import { shadows } from "../styles/theme/shadows.ts";
import { spacing } from "../styles/theme/spacing.ts";
import { fontSize } from "../styles/theme/typography.ts";
import { radius } from "../styles/theme/radius.ts";
import { transitions } from "../styles/theme/transitions.ts";
import { zIndex } from "../styles/theme/zIndex.ts";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function cssVarsFromObject(
  obj: Record<string, string | number | Record<string, string>>,
  prefix: string,
  dashCaseKeys = false,
) {
  const vars: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string" || typeof value === "number") {
      const varName = dashCaseKeys ? key : toKebabCase(key);
      vars.push(`  --${prefix}-${varName}: ${value};`);
    } else if (typeof value === "object") {
      // Handle nested objects like grey scale
      Object.entries(value).forEach(([subKey, subValue]) => {
        const varName = `${key}-${subKey}`;
        vars.push(`  --${prefix}-${varName}: ${subValue};`);
      });
    }
  });

  return vars.join("\n");
}

const css = `
:root {
${cssVarsFromObject(colors, "color")}
${cssVarsFromObject(shadows, "shadow", true)}
${cssVarsFromObject(spacing, "space", true)}
${cssVarsFromObject(fontSize, "text", true)}
${cssVarsFromObject(radius, "radius", true)}
${cssVarsFromObject(transitions, "transition", true)}
${cssVarsFromObject(zIndex, "z", true)}
}

/* Dark theme overrides using TypeScript theme tokens */
:root[data-theme="dark"] {
${cssVarsFromObject(darkColors, "color")}
}
`;

fs.writeFileSync(
  path.join(__dirname, "../styles/generated-tokens.css"),
  css.trim() + "\n",
);

console.log("Generated CSS variables for simplified theme tokens!");
