// controls.ts - Shared controls functionality

// Initialize the controls
export function initializeControls() {
  // Implementation here
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
