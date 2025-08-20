import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps {
  title?: string;
  clickable?: boolean;
  href?: string;
  class?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  clickable = false,
  href,
  class: className,
  children,
}) => {
  const baseClasses = "border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm";
  const clickableClasses = clickable ? "cursor-pointer hover:shadow-md transition-shadow" : "";
  const combinedClasses = cn(baseClasses, clickableClasses, className);

  if (href) {
    return (
      <a href={href} className={combinedClasses} style={{ backgroundColor: 'var(--color-background-secondary)' }}>
        {title && <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>}
        {children}
      </a>
    );
  }

  return (
    <div className={combinedClasses} style={{ backgroundColor: 'var(--color-background-secondary)' }}>
              {title && <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>}
      {children}
    </div>
  );
};

export { Card };
