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
  const baseClasses = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm";
  const clickableClasses = clickable ? "cursor-pointer hover:shadow-md transition-shadow" : "";
  const combinedClasses = cn(baseClasses, clickableClasses, className);

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>}
        {children}
      </a>
    );
  }

  return (
    <div className={combinedClasses}>
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export { Card };
