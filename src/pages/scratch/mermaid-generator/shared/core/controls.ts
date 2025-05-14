// controls.ts - Shared controls functionality
import type { MermaidControlsProps } from "../types/index.js";

// Initialize the controls
export function setupControls(): void {
  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeControls);
  } else {
    initializeControls();
  }
}

function initializeControls(): void {
  // All control functionality is handled by the editor and preview modules
  // This module exists for future extensibility and to maintain the component structure
  console.log("Controls initialized");
}

// Add TypeScript declarations for global functions
declare global {
  interface Window {
    loadExample: () => void;
    clearDiagram: () => void;
    saveTemplate: () => void;
    saveTemplateAs: () => void;
    exportSvg: () => void;
    exportPng: () => void;
  }
}
