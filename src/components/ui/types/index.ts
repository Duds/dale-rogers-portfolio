export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  class?: string;
}

export interface CardProps {
  title?: string;
  description?: string;
  href?: string;
  class?: string;
}

export interface IconProps {
  name: string;
  size?: number;
  class?: string;
}

export interface ThemeToggleProps {
  class?: string;
}
