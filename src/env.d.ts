/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "astro:content" {
  interface Render {
    ".mdx": Promise<{
      Content: import("astro").MarkdownInstance<{}>["Content"];
      headings: import("astro").MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module "astro:components" {
  export const Code: (props: {
    code: string;
    lang?: string;
    theme?: string;
    wrap?: boolean;
  }) => any;
}

// Declare module for .astro components to fix TypeScript errors
declare module "*.astro" {
  const component: (props: any) => any;
  export default component;
}

// Ensure TypeScript recognizes the global Astro object
declare namespace App {
  interface Locals {
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
}
