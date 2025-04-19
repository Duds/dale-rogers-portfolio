/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        "soft-dark":
          "0 4px 6px -1px rgba(255, 255, 255, 0.05), 0 2px 4px -1px rgba(255, 255, 255, 0.03)",
        "soft-hover":
          "0 6px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
        "soft-hover-dark":
          "0 6px 8px -2px rgba(255, 255, 255, 0.05), 0 4px 6px -2px rgba(255, 255, 255, 0.03)",
      },
    },
  },
  plugins: [require("./src/plugins/shadows.js")],
};
