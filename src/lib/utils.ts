import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Base props interface for components
export interface BaseProps {
  class?: string;
  [key: string]: string | number | boolean | undefined;
}
