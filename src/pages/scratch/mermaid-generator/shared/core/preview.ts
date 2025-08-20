// preview.ts - Shared preview functionality

// Declare mermaid global
declare const mermaid: {
  run: (options: {
    nodes: HTMLElement[];
    suppressErrors: boolean;
  }) => Promise<void>;
  initialize: (config: { theme: string; securityLevel: string }) => void;
};

interface PreviewState {
  zoom: number;
  minZoom: number;
  maxZoom: number;
}

// Initialize the preview
export function setupPreview(): void {
  const state: PreviewState = {
    zoom: 100,
    minZoom: 50,
    maxZoom: 200,
  };

  const zoomSlider = document.querySelector(
    ".zoom-slider",
  ) as HTMLInputElement | null;
  const zoomValue = document.querySelector(".zoom-value") as HTMLElement | null;
  const output = document.getElementById(
    "mermaid-output",
  ) as HTMLElement | null;
  const input = document.getElementById(
    "mermaid-input",
  ) as HTMLTextAreaElement | null;

  if (!zoomSlider || !zoomValue || !output || !input) {
    console.error("Required preview elements not found");
    return;
  }

  // Set up zoom controls
  zoomSlider.addEventListener("input", () => {
    const newZoom = parseInt(zoomSlider.value, 10);
    state.zoom = newZoom;
    zoomValue.textContent = `${newZoom}%`;
    output.style.transform = `scale(${newZoom / 100})`;
    output.style.transformOrigin = "center top";
  });

  // Set up zoom buttons
  window.zoomIn = (): void => {
    const newZoom = Math.min(state.zoom + 10, state.maxZoom);
    zoomSlider.value = String(newZoom);
    zoomSlider.dispatchEvent(new Event("input"));
  };

  window.zoomOut = (): void => {
    const newZoom = Math.max(state.zoom - 10, state.minZoom);
    zoomSlider.value = String(newZoom);
    zoomSlider.dispatchEvent(new Event("input"));
  };

  // Set up Mermaid preview
  const updatePreview = async () => {
    const content = input.value.trim();
    if (!content) {
      output.innerHTML =
        '<div class="text-grey-400">Enter Mermaid syntax to see the diagram</div>';
      return;
    }

    try {
      // Clear previous content
      output.innerHTML = content;

      // Initialize Mermaid if not already initialized
      if (typeof mermaid === "undefined") {
        console.error("Mermaid library not loaded");
        output.innerHTML =
          '<div class="text-red-500">Error: Mermaid library not loaded</div>';
        return;
      }

      // Render the diagram
      await mermaid.run({
        nodes: [output],
        suppressErrors: false,
      });
    } catch (error) {
      console.error("Mermaid rendering error:", error);
      output.innerHTML = `<div class="text-red-500">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
    }
  };

  // Set up auto-update if enabled
  const autoUpdateCheckbox = document.getElementById(
    "auto-update",
  ) as HTMLInputElement | null;
  if (autoUpdateCheckbox) {
    autoUpdateCheckbox.addEventListener("change", () => {
      if (autoUpdateCheckbox.checked) {
        input.addEventListener("input", updatePreview);
      } else {
        input.removeEventListener("input", updatePreview);
      }
    });

    // Initial update if auto-update is enabled
    if (autoUpdateCheckbox.checked) {
      input.addEventListener("input", updatePreview);
    }
  }

  // Initial preview update
  updatePreview();
}

// Add TypeScript declarations for global functions
declare global {
  interface Window {
    zoomIn: () => void;
    zoomOut: () => void;
    mermaid: {
      run: (options: {
        nodes: HTMLElement[];
        suppressErrors: boolean;
      }) => Promise<void>;
    };
  }
}
