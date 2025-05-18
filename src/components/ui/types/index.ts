import type { HTMLAttributes } from "astro/types";

export interface BaseProps
  extends Omit<HTMLAttributes<"a"> & HTMLAttributes<"button">, "class"> {
  class?: string;
}

export interface ButtonProps extends BaseProps {
  href?: string;
  /**
   * Visual style variant of the button. Options: 'black', 'purple', 'orange', 'green', 'ghost'.
   * @default 'black'
   * @example <Button variant="purple">Purple Button</Button>
   */
  variant?: "black" | "purple" | "orange" | "green" | "ghost";
  /**
   * Optional colour for ghost variant. Options: 'black', 'purple', 'orange', 'green'.
   * Only applies when variant is 'ghost'.
   * @default 'black'
   * @example <Button variant="ghost" ghostColour="purple">Ghost Purple</Button>
   */
  ghostColour?: "black" | "purple" | "orange" | "green";
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
