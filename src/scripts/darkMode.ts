/**
 * Central dark mode utility for theme management
 * Australian English spelling and conventions
 * @module darkMode
 */

const THEME_KEY = "theme";

type Theme = "light" | "dark";

/**
 * Get the current theme from localStorage or system preference
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Set the theme and update <html> data-theme attribute and class
 */
export function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  // Set data-theme attribute for CSS custom properties
  document.documentElement.setAttribute("data-theme", theme);
  // Also set class for Tailwind compatibility
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Toggle the theme between light and dark
 */
export function toggleTheme() {
  const current = getTheme();
  const next: Theme = current === "dark" ? "light" : "dark";
  setTheme(next);
}

/**
 * Initialise theme on page load
 * - Applies theme from localStorage or system
 * - Sets up system preference listener
 */
export function initTheme() {
  setTheme(getTheme());
  // Listen for system preference changes if no manual override
  if (typeof window !== "undefined") {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? "dark" : "light");
        }
      });
  }
}
