export const colors = {
  primary: {
    light: "#A78BFA", // light purple
    DEFAULT: "#8B5CF6", // main purple
    dark: "#7C3AED", // dark purple
  },
  secondary: {
    green: "#10B981", // primary green
    orange: "#F97316", // primary orange
    black: "#111111", // strong black
  },
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    background: "#F9FAFB",
    cardPurple: "#F3F0FF",
    cardGreen: "#ECFDF5",
    cardOrange: "#FFF7ED",
    cardBlack: "#111111",
  },
  grey: {
    50: "hsl(210, 20%, 98%)",
    100: "hsl(220, 14%, 96%)",
    200: "hsl(220, 13%, 91%)",
    300: "hsl(216, 12%, 84%)",
    400: "hsl(218, 11%, 65%)",
    500: "hsl(220, 9%, 46%)",
    600: "hsl(215, 14%, 34%)",
    700: "hsl(217, 19%, 27%)",
    800: "hsl(215, 28%, 17%)",
    900: "hsl(221, 39%, 11%)",
    950: "hsl(224, 71%, 4%)",
  },
  success: {
    light: "#BBF7D0", // soft green
    DEFAULT: "#22C55E", // main green
    dark: "#16A34A", // dark green
  },
  warning: {
    light: "#FEF9C3", // soft yellow
    DEFAULT: "#EAB308", // main yellow
    dark: "#CA8A04", // dark yellow
  },
  error: {
    light: "#FECACA", // soft red
    DEFAULT: "#EF4444", // main red
    dark: "#DC2626", // dark red
  },
} as const;

export type ColorToken = keyof typeof colors;
