import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const generatedCssPath = path.join(__dirname, "../styles/generated-tokens.css");

describe("Design Token CSS Variable Generation", () => {
  it("should generate the CSS variables file", () => {
    expect(fs.existsSync(generatedCssPath)).toBe(true);
  });

  it("should contain a color variable", () => {
    const css = fs.readFileSync(generatedCssPath, "utf-8");
    expect(css).toMatch(/--color-accent-main:/);
  });

  it("should contain a shadow variable", () => {
    const css = fs.readFileSync(generatedCssPath, "utf-8");
    expect(css).toMatch(/--shadow-lg:/);
  });

  it("should contain a spacing variable", () => {
    const css = fs.readFileSync(generatedCssPath, "utf-8");
    expect(css).toMatch(/--space-2:/);
  });

  it("should contain a font size variable", () => {
    const css = fs.readFileSync(generatedCssPath, "utf-8");
    expect(css).toMatch(/--text-xs:/);
  });

  it("should contain a radius variable", () => {
    const css = fs.readFileSync(generatedCssPath, "utf-8");
    expect(css).toMatch(/--radius-lg:/);
  });

  it("should contain a transition duration variable", () => {
    const css = fs.readFileSync(generatedCssPath, "utf-8");
    expect(css).toMatch(/--transition-fast:/);
  });

  it("should contain a z-index variable", () => {
    const css = fs.readFileSync(generatedCssPath, "utf-8");
    expect(css).toMatch(/--z-dropdown:/);
  });
});
