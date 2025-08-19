import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
      default: "bg-primary text-white hover:bg-primary/90 shadow-button hover:shadow-button-hover",
      destructive:
        "bg-error text-white hover:bg-error/90 shadow-button hover:shadow-button-hover",
      outline:
        "border border-grey-300 bg-white text-grey-900 hover:bg-grey-50 hover:border-grey-400 shadow-button hover:shadow-button-hover",
      secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-button hover:shadow-button-hover",
      ghost: "text-grey-700 hover:bg-grey-100 hover:text-grey-900",
      link: "text-secondary underline-offset-4 hover:underline",
    };

    const sizeClasses = {
      default: "h-10 px-6 py-3",
      sm: "h-9 rounded-md px-4",
      lg: "h-11 rounded-lg px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
