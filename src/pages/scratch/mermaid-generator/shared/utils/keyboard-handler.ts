// Keyboard handler utility for implementing keyboard shortcuts

type KeyHandler = (event: KeyboardEvent) => void;

interface KeyBinding {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: KeyHandler;
  description: string;
}

export class KeyboardHandler {
  private static instance: KeyboardHandler;
  private bindings: Map<string, KeyBinding> = new Map();
  private enabled: boolean = true;

  private constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  static getInstance(): KeyboardHandler {
    if (!KeyboardHandler.instance) {
      KeyboardHandler.instance = new KeyboardHandler();
    }
    return KeyboardHandler.instance;
  }

  private getKeyString(event: KeyboardEvent): string {
    const modifiers = [
      event.ctrlKey ? "ctrl" : "",
      event.shiftKey ? "shift" : "",
      event.altKey ? "alt" : "",
    ].filter(Boolean);
    return [...modifiers, event.key.toLowerCase()].join("+");
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.enabled) return;

    const keyString = this.getKeyString(event);
    const binding = this.bindings.get(keyString);

    if (binding) {
      event.preventDefault();
      binding.handler(event);
    }
  }

  registerBinding(binding: KeyBinding): void {
    const keyString = [
      binding.ctrlKey ? "ctrl" : "",
      binding.shiftKey ? "shift" : "",
      binding.altKey ? "alt" : "",
      binding.key.toLowerCase(),
    ]
      .filter(Boolean)
      .join("+");

    this.bindings.set(keyString, binding);
  }

  unregisterBinding(
    key: string,
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
  ): void {
    const keyString = [
      ctrlKey ? "ctrl" : "",
      shiftKey ? "shift" : "",
      altKey ? "alt" : "",
      key.toLowerCase(),
    ]
      .filter(Boolean)
      .join("+");

    this.bindings.delete(keyString);
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getBindings(): KeyBinding[] {
    return Array.from(this.bindings.values());
  }

  destroy(): void {
    window.removeEventListener("keydown", this.handleKeyDown);
    this.bindings.clear();
  }
}

// Export singleton instance
export const keyboardHandler = KeyboardHandler.getInstance();

// Default keyboard shortcuts for the Mermaid Generator
export const defaultShortcuts: KeyBinding[] = [
  {
    key: "s",
    ctrlKey: true,
    handler: () => {
      // Save diagram
      const event = new CustomEvent("mermaid:save");
      window.dispatchEvent(event);
    },
    description: "Save diagram",
  },
  {
    key: "e",
    ctrlKey: true,
    handler: () => {
      // Export diagram
      const event = new CustomEvent("mermaid:export");
      window.dispatchEvent(event);
    },
    description: "Export diagram",
  },
  {
    key: "+",
    ctrlKey: true,
    handler: () => {
      // Zoom in
      const event = new CustomEvent("mermaid:zoom-in");
      window.dispatchEvent(event);
    },
    description: "Zoom in",
  },
  {
    key: "-",
    ctrlKey: true,
    handler: () => {
      // Zoom out
      const event = new CustomEvent("mermaid:zoom-out");
      window.dispatchEvent(event);
    },
    description: "Zoom out",
  },
  {
    key: "0",
    ctrlKey: true,
    handler: () => {
      // Reset zoom
      const event = new CustomEvent("mermaid:zoom-reset");
      window.dispatchEvent(event);
    },
    description: "Reset zoom",
  },
  {
    key: "c",
    ctrlKey: true,
    handler: () => {
      // Clear diagram
      const event = new CustomEvent("mermaid:clear");
      window.dispatchEvent(event);
    },
    description: "Clear diagram",
  },
];

// Register default shortcuts
defaultShortcuts.forEach((shortcut) =>
  keyboardHandler.registerBinding(shortcut),
);
