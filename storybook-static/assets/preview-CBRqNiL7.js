import { R as e } from "./index-Dv7uYCMj.js";
import "./_commonjsHelpers-CqkleIqs.js";
const i = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: !0,
      sort: "requiredFirst",
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#111827" },
        { name: "primary-black", value: "#10100F" },
        { name: "primary-purple", value: "#AF8ABF" },
      ],
    },
    layout: "centered",
    docs: { toc: !0, source: { state: "open" } },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "667px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1200px", height: "800px" },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: !0 },
          { id: "heading-order", enabled: !0 },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: !0,
      },
    },
    viewport: {
      description: "Viewport size for responsive testing",
      defaultValue: "desktop",
      toolbar: {
        title: "Viewport",
        icon: "mobile",
        items: ["mobile", "tablet", "desktop"],
      },
    },
  },
  decorators: [
    (t, o) => {
      const a = o.globals.theme;
      return e.createElement(
        "div",
        { className: a === "dark" ? "dark" : "" },
        e.createElement(t),
      );
    },
  ],
};
export { i as default };
