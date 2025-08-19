import type { HTMLAttributes } from "astro/types";

export interface BaseProps
  extends Omit<HTMLAttributes<"a"> & HTMLAttributes<"button">, "class"> {
  class?: string;
}

export interface ButtonProps extends BaseProps {
  href?: string;
  /**
   * Visual style variant of the button. Options: 'primary', 'secondary', 'accent', 'grey', 'ghost'.
   * @default 'primary'
   * @example <Button variant="secondary">Secondary Button</Button>
   */
  variant?: "primary" | "secondary" | "accent" | "grey" | "ghost";
  /**
   * Optional colour for ghost variant. Options: 'primary', 'secondary', 'accent', 'grey'.
   * Only applies when variant is 'ghost'.
   * @default 'primary'
   * @example <Button variant="ghost" ghostColour="secondary">Ghost Secondary</Button>
   */
  ghostColour?: "primary" | "secondary" | "accent" | "grey";
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
