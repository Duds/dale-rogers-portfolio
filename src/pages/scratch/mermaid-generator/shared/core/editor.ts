// editor.ts - Shared editor functionality
import { EditorState } from "../types";

// Initialize the editor
export function setupEditor(): void {
  const textarea = document.getElementById(
    "mermaid-input"
  ) as HTMLTextAreaElement | null;
  const autoUpdateCheckbox = document.getElementById(
    "auto-update"
  ) as HTMLInputElement | null;

  if (!textarea || !autoUpdateCheckbox) {
    console.error("Required elements not found");
    return;
  }

  // Set up input handling
  textarea.addEventListener("input", () => {
    if (autoUpdateCheckbox.checked) {
      handleInput();
    }
  });

  // Set up auto-update toggle
  autoUpdateCheckbox.addEventListener("change", () => {
    if (autoUpdateCheckbox.checked) {
      handleInput();
    }
  });

  // Set up example loading
  window.loadExample = (): void => {
    const example = `graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    B -- No --> D[End]`;
    textarea.value = example;
    handleInput();
  };

  // Set up clear functionality
  window.clearDiagram = (): void => {
    textarea.value = "";
    handleInput();
  };

  // Set up save template functionality
  window.saveTemplate = (): void => {
    const content = textarea.value;
    if (!content) {
      alert("Please enter some Mermaid syntax first");
      return;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mermaid-template.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Set up save template as functionality
  window.saveTemplateAs = (): void => {
    const content = textarea.value;
    if (!content) {
      alert("Please enter some Mermaid syntax first");
      return;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mermaid Diagram</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"><\/script>
    <style>
        body { margin: 0; padding: 20px; }
        .mermaid { display: flex; justify-content: center; }
    </style>
</head>
<body>
    <div class="mermaid">
${content}
    </div>
    <script>
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose'
        });
    <\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mermaid-diagram.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Set up export functionality
  window.exportSvg = (): void => {
    const output = document.getElementById("mermaid-output");
    if (!output) return;

    const svg = output.querySelector("svg");
    if (!svg) {
      alert("Please generate a diagram first");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mermaid-diagram.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  window.exportPng = (): void => {
    const output = document.getElementById("mermaid-output");
    if (!output) return;

    const svg = output.querySelector("svg");
    if (!svg) {
      alert("Please generate a diagram first");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "mermaid-diagram.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };
}

// Handle input changes
export function handleInput(): void {
  const textarea = document.getElementById(
    "mermaid-input"
  ) as HTMLTextAreaElement | null;
  const output = document.getElementById(
    "mermaid-output"
  ) as HTMLElement | null;

  if (!textarea || !output) {
    console.error("Required elements not found");
    return;
  }

  const content = textarea.value.trim();
  if (!content) {
    output.innerHTML =
      '<div class="text-gray-400">Enter Mermaid syntax to see the diagram</div>';
    return;
  }

  try {
    output.innerHTML = content;
    // @ts-ignore - mermaid is loaded via CDN
    mermaid.init(undefined, output);
  } catch (error) {
    output.innerHTML = `<div class="text-red-500">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
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
