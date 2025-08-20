import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: "requiredFirst",
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#111827",
        },
        {
          name: "primary-black",
          value: "#10100F",
        },
        {
          name: "primary-purple",
          value: "#AF8ABF",
        },
      ],
    },
    layout: "centered",
    docs: {
      toc: true,
      source: {
        state: "open",
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1200px",
            height: "800px",
          },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
          {
            id: "heading-order",
            enabled: true,
          },
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
        dynamicTitle: true,
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
    (Story, context) => {
      const theme = context.globals.theme;
      return React.createElement(
        "div",
        {
          className: theme === "dark" ? "dark" : "",
        },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
