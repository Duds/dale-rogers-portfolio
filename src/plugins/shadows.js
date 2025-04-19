const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    ".shadow-soft": {
      "@apply transition-shadow duration-200 ease-in-out": {},
      "box-shadow": "var(--tw-shadow)",
      "--tw-shadow": theme("boxShadow.soft"),
    },
    ".dark .shadow-soft": {
      "--tw-shadow": theme("boxShadow.soft-dark"),
    },
    ".shadow-soft-hover": {
      "@apply shadow-soft transition-all duration-200 ease-in-out": {},
    },
    ".shadow-soft-hover:hover": {
      "@apply translate-y-[-2px]": {},
      "--tw-shadow": theme("boxShadow.soft-hover"),
    },
    ".dark .shadow-soft-hover:hover": {
      "--tw-shadow": theme("boxShadow.soft-hover-dark"),
    },
    "@media (prefers-reduced-motion: reduce)": {
      ".shadow-soft, .shadow-soft-hover": {
        "@apply transition-none transform-none": {},
      },
    },
  });
});
