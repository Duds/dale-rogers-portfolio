const shadows = require("./src/plugins/shadows.js");

export default {
  content: ["./src/**/*.{astro,js,jsx,ts,tsx,vue,svelte,mdx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#000000", // Example value, adjust as needed
        purple: "#8b5cf6", // Example value, adjust as needed
        orange: "#f97316", // Example value, adjust as needed
        green: "#22c55e", // Example value, adjust as needed
        ghost: "#f9fafb", // Example value, adjust as needed
        bg: "#ffffff", // Custom background token for bg-bg utility
        "black-hover": "#222", // Example value, adjust as needed
        "purple-hover": "#6d28d9", // Example value, adjust as needed
        "orange-hover": "#ea580c", // Example value, adjust as needed
        "green-hover": "#15803d", // Example value, adjust as needed
        "ghost-hover": "#f3f4f6", // Example value, adjust as needed
        // Dark mode equivalents (for use with dark: prefix)
        "black-hover-dark": "#111",
        "purple-hover-dark": "#5b21b6",
        "orange-hover-dark": "#c2410c",
        "green-hover-dark": "#166534",
        "ghost-hover-dark": "#374151",
        // Base dark mode tokens
        "black-dark": "#18181b", // Example value, adjust as needed
        "purple-dark": "#7c3aed",
        "orange-dark": "#f59e42",
        "green-dark": "#22c55e",
        "ghost-dark": "#1e293b",
      },
    },
  },
  plugins: [shadows],
};
