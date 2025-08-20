import type { BaseProps } from "../../lib/utils.js";

export interface ButtonProps extends BaseProps {
  /** Visual style variant of the button */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button text content */
  children: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  class: className,
  ...props
}: ButtonProps) {
  const baseClasses = [
    "btn-base",
    `btn-${variant}`,
    `btn-${size}`,
    disabled && "btn-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button class={baseClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
