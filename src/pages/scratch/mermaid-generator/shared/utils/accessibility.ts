// Accessibility utility for implementing ARIA attributes and keyboard navigation

interface AriaAttributes {
  role?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-hidden"?: boolean;
  "aria-live"?: "polite" | "assertive" | "off";
  "aria-atomic"?: boolean;
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
  "aria-busy"?: boolean;
  "aria-current"?:
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false";
  "aria-disabled"?: boolean;
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  "aria-invalid"?: boolean | "grammar" | "false" | "spelling" | "true";
  "aria-pressed"?: boolean | "mixed";
  "aria-selected"?: boolean;
  "aria-sort"?: "ascending" | "descending" | "none" | "other";
  "aria-valuemax"?: number;
  "aria-valuemin"?: number;
  "aria-valuenow"?: number;
  "aria-valuetext"?: string;
  tabindex?: number;
}

export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private announcements: HTMLElement | null = null;

  private constructor() {
    this.createAnnouncementsContainer();
  }

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  private createAnnouncementsContainer(): void {
    this.announcements = document.createElement("div");
    this.announcements.setAttribute("aria-live", "polite");
    this.announcements.setAttribute("aria-atomic", "true");
    this.announcements.setAttribute("class", "sr-only");
    document.body.appendChild(this.announcements);
  }

  // Announce a message to screen readers
  announce(message: string, priority: "polite" | "assertive" = "polite"): void {
    if (!this.announcements) return;

    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.textContent = message;
    this.announcements.appendChild(announcement);

    // Remove the announcement after it's been read
    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }

  // Apply ARIA attributes to an element
  applyAriaAttributes(element: HTMLElement, attributes: AriaAttributes): void {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined) {
        element.setAttribute(key, String(value));
      }
    });
  }

  // Create a focus trap for modal dialogs
  createFocusTrap(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);
    firstFocusable.focus();

    return () => {
      element.removeEventListener("keydown", handleTabKey);
    };
  }

  // Make an element focusable
  makeFocusable(element: HTMLElement, focusable = true): void {
    element.setAttribute("tabindex", focusable ? "0" : "-1");
  }

  // Hide an element from screen readers
  hideFromScreenReaders(element: HTMLElement, hidden = true): void {
    element.setAttribute("aria-hidden", String(hidden));
  }

  // Create a keyboard navigation handler
  createKeyboardNavigation(
    element: HTMLElement,
    options: {
      onEnter?: () => void;
      onSpace?: () => void;
      onEscape?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
    }
  ): () => void {
    const handleKeyDown = (e: KeyboardEvent): void => {
      switch (e.key) {
        case "Enter":
          options.onEnter?.();
          break;
        case " ":
          e.preventDefault();
          options.onSpace?.();
          break;
        case "Escape":
          options.onEscape?.();
          break;
        case "ArrowUp":
          e.preventDefault();
          options.onArrowUp?.();
          break;
        case "ArrowDown":
          e.preventDefault();
          options.onArrowDown?.();
          break;
        case "ArrowLeft":
          e.preventDefault();
          options.onArrowLeft?.();
          break;
        case "ArrowRight":
          e.preventDefault();
          options.onArrowRight?.();
          break;
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }

  // Destroy the accessibility manager
  destroy(): void {
    if (this.announcements) {
      this.announcements.remove();
      this.announcements = null;
    }
  }
}

// Export singleton instance
export const accessibilityManager = AccessibilityManager.getInstance();
