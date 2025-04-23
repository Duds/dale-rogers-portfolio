import type { HTMLAttributes } from "astro/types";

export interface BaseProps
  extends Omit<HTMLAttributes<"a"> & HTMLAttributes<"button">, "class"> {
  class?: string;
}

export interface ButtonProps extends BaseProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface CardProps extends BaseProps {
  title?: string;
  clickable?: boolean;
  href?: string;
}

export interface TagListProps extends BaseProps {
  tags: string[];
  currentTag?: string;
}

export interface IconProps {
  name: string;
  size?: number;
  class?: string;
}

export interface ThemeToggleProps {
  class?: string;
}
