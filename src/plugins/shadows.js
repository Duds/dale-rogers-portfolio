import plugin from "tailwindcss/plugin";

export default plugin(function ({ addUtilities, theme }) {
  addUtilities({
    ".shadow-soft": {
      "@apply transition-shadow duration-normal ease-in-out": {},
      "box-shadow": "var(--tw-shadow)",
      "--tw-shadow": theme("boxShadow.soft"),
      transform: "translateZ(0)",
      "will-change": "transform, box-shadow",
    },
    ".dark .shadow-soft": {
      "--tw-shadow": theme("boxShadow.soft-dark"),
    },
    ".shadow-soft-hover": {
      "@apply shadow-soft transition-all duration-normal ease-in-out": {},
      "will-change": "transform, box-shadow",
    },
    ".shadow-soft-hover:hover": {
      "@apply translate-y-[-2px]": {},
      "--tw-shadow": theme("boxShadow.soft-hover"),
      transform: "translateZ(0) translateY(-2px)",
    },
    ".dark .shadow-soft-hover:hover": {
      "--tw-shadow": theme("boxShadow.soft-hover-dark"),
    },
    ".shadow-button": {
      "@apply transition-all duration-normal ease-in-out": {},
      "box-shadow": "var(--tw-shadow)",
      "--tw-shadow": theme("boxShadow.button-hover"),
      transform: "translateZ(0)",
      "will-change": "transform, box-shadow",
    },
    ".shadow-card": {
      "@apply transition-shadow duration-normal ease-in-out": {},
      "box-shadow": "var(--tw-shadow)",
      "--tw-shadow": theme("boxShadow.card"),
      transform: "translateZ(0)",
      "will-change": "transform, box-shadow",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ".shadow-soft, .shadow-soft-hover, .shadow-button, .shadow-card": {
        "@apply transition-none transform-none": {},
        "will-change": "auto",
      },
    },
  });
});
