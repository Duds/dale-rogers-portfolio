// Remove Astro content collection code
// let message = "Attempting to fetch content...";
// try {
//   const entries = await getCollection("scratch");
//   message = `Test successful: ${entries.length} 'scratch' entries found.`;
//   console.log(message);
// } catch (e) {
//   message = `Test error: ${e.message}`;
//   console.error(e);
// }

// Create content test element
// const contentTest = document.createElement("div");
// contentTest.className = "content-test";

// const heading = document.createElement("h1");
// heading.textContent = "Content Collection Test";
// contentTest.appendChild(heading);

// const messagePara = document.createElement("p");
// messagePara.textContent = message;
// contentTest.appendChild(messagePara);

// const infoPara = document.createElement("p");
// infoPara.textContent =
//   "Check the server console for more details if there was an error.";
// contentTest.appendChild(infoPara);

// document.body.appendChild(contentTest);

// Standalone Mermaid Generator
console.log("Mermaid Generator script loading");

// Global state
const state = {
  zoom: 100,
  minZoom: 50,
  maxZoom: 200,
};

// Initialize Mermaid
function initializeMermaid() {
  console.log("Initializing Mermaid");
  try {
    // Initialize Mermaid
    if (typeof mermaid !== "undefined") {
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
      });
      console.log("Mermaid initialized successfully");
    } else {
      console.error("Mermaid library not loaded");
    }
  } catch (error) {
    console.error("Error initializing Mermaid:", error);
  }
}

// Create the editor interface - enhanced version with all features
function createFullInterface() {
  console.log("Creating enhanced interface");
  const app = document.getElementById("app");
  if (!app) {
    console.error("App element not found");
    return;
  }

  // Create a full-featured interface
  app.innerHTML = `
    <div class="container">
      <h1 class="main-title">Mermaid Diagram Generator</h1>
      <p class="description">Create diagrams and flowcharts using Mermaid syntax</p>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="mermaid-editor">
          <div class="input-section">
            <div class="section-title">Mermaid Syntax</div>
            <textarea id="mermaid-input" class="mermaid-input" placeholder="Enter your Mermaid syntax here...">graph TD
  A[Start] --> B{Is it?}
  B -- Yes --> C[OK]
  B -- No --> D[End]</textarea>

            <div class="mermaid-controls">
              <div class="control-group">
                <button onclick="renderDiagram()" class="control-button primary">Render</button>
                <button onclick="clearDiagram()" class="control-button secondary">Clear</button>
                <button onclick="loadExample()" class="control-button secondary">Example</button>
              </div>

              <div class="control-group">
                <label class="control-label">
                  <input type="checkbox" id="auto-update" checked>
                  Auto Update
                </label>
              </div>

              <div class="control-group">
                <button onclick="saveTemplate()" class="control-button primary">Save Template</button>
                <button onclick="saveTemplateAs()" class="control-button secondary">Save HTML</button>
              </div>

              <div class="control-group">
                <button onclick="exportSvg()" class="control-button primary">Export SVG</button>
                <button onclick="exportPng()" class="control-button secondary">Export PNG</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mermaid-preview">
          <div class="section-title">Preview</div>
          <div class="mermaid-container">
            <div class="mermaid-wrapper">
              <div id="mermaid-output"></div>
            </div>
            <div class="zoom-controls">
              <button onclick="zoomOut()" title="Zoom Out" class="zoom-button">
                <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"></path></svg>
              </button>
              <input
                type="range"
                class="zoom-slider"
                min="50"
                max="200"
                value="100"
                step="10"
              />
              <span class="zoom-value">100%</span>
              <button onclick="zoomIn()" title="Zoom In" class="zoom-button">
                <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize zoom controls
  setupZoomControls();

  // Set up auto-update toggle
  setupAutoUpdate();

  // Auto-render on load
  setTimeout(renderDiagram, 500);
}

// Setup zoom controls
function setupZoomControls() {
  const zoomSlider = document.querySelector(".zoom-slider");
  const zoomValue = document.querySelector(".zoom-value");
  const output = document.getElementById("mermaid-output");

  if (!zoomSlider || !zoomValue || !output) {
    console.error("Zoom elements not found");
    return;
  }

  // Set up zoom slider
  zoomSlider.addEventListener("input", function () {
    const newZoom = parseInt(this.value, 10);
    state.zoom = newZoom;
    zoomValue.textContent = `${newZoom}%`;
    output.style.transform = `scale(${newZoom / 100})`;
    output.style.transformOrigin = "center top";
  });
}

// Set up auto-update
function setupAutoUpdate() {
  const autoUpdateCheckbox = document.getElementById("auto-update");
  const textarea = document.getElementById("mermaid-input");

  if (!autoUpdateCheckbox || !textarea) {
    console.error("Auto-update elements not found");
    return;
  }

  // Set up input handling with auto-update
  textarea.addEventListener("input", function () {
    if (autoUpdateCheckbox.checked) {
      renderDiagram();
    }
  });

  // Set up auto-update toggle
  autoUpdateCheckbox.addEventListener("change", function () {
    if (this.checked) {
      renderDiagram();
    }
  });
}

// Zoom in function - commented out due to unused
// function zoomIn() {
//   const zoomSlider = document.querySelector(".zoom-slider");
//   if (!zoomSlider) return;

//   const newZoom = Math.min(state.zoom + 10, state.maxZoom);
//   zoomSlider.value = String(newZoom);
//   zoomSlider.dispatchEvent(new Event("input"));
// }

// Zoom out function - commented out due to unused
// function zoomOut() {
//   const zoomSlider = document.querySelector(".zoom-slider");
//   if (!zoomSlider) return;

//   const newZoom = Math.max(state.zoom - 10, state.minZoom);
//   zoomSlider.value = String(newZoom);
//   zoomSlider.dispatchEvent(new Event("input"));
// }

// Load example function - commented out due to unused
// function loadExample() {
//   const textarea = document.getElementById("mermaid-input");
//   if (!textarea) return;

//   const example = `graph TD
//     A[Start] --> B{Is it?}
//     B -- Yes --> C[OK]
//     B -- No --> D[End]`;

//   textarea.value = example;
//   renderDiagram();
// }

// Clear diagram function - commented out due to unused
// function clearDiagram() {
//   const textarea = document.getElementById("mermaid-input");
//   if (!textarea) return;

//   textarea.value = "";
//   renderDiagram();
// }

// Save template function - commented out due to unused
// function saveTemplate() {
//   const textarea = document.getElementById("mermaid-input");
//   if (!textarea) return;

//   const content = textarea.value;
//   if (!content) {
//     alert("Please enter some Mermaid syntax first");
//     return;
//   }

//   const blob = new Blob([content], { type: "text/plain" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "mermaid-template.txt";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

// Save template as HTML function - commented out due to unused
// function saveTemplateAs() {
//   const textarea = document.getElementById("mermaid-input");
//   if (!textarea) return;

//   const content = textarea.value;
//   if (!content) {
//     alert("Please enter some Mermaid syntax first");
//     return;
//   }

//   const html = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Mermaid Diagram</title>
//     <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
//     <style>
//         body { margin: 0; padding: 20px; }
//         .mermaid { display: flex; justify-content: center; }
//     </style>
// </head>
// <body>
//     <div class="mermaid">
// ${content}
//     </div>
//     <script>
//         mermaid.initialize({
//             startOnLoad: true,
//             theme: 'default',
//             securityLevel: 'loose'
//         });
//     </script>
// </body>
// </html>`;

//   const blob = new Blob([html], { type: "text/html" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "mermaid-diagram.html";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

// Export SVG function - commented out due to unused
// function exportSvg() {
//   const output = document.getElementById("mermaid-output");
//   if (!output) return;

//   const svg = output.querySelector("svg");
//   if (!svg) {
//     alert("Please generate a diagram first");
//     return;
//   }

//   const svgData = new XMLSerializer().serializeToString(svg);
//   const blob = new Blob([svgData], { type: "image/svg+xml" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "mermaid-diagram.svg";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

// Export PNG function - commented out due to unused
// function exportPng() {
//   const output = document.getElementById("mermaid-output");
//   if (!output) return;

//   const svg = output.querySelector("svg");
//   if (!svg) return;

//   const svgData = new XMLSerializer().serializeToString(svg);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   const img = new Image();

//   img.onload = function () {
//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);
//     const pngUrl = canvas.toDataURL("image/png");
//     const a = document.createElement("a");
//     a.href = pngUrl;
//     a.download = "mermaid-diagram.png";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   img.src =
//     "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
// }

// Render diagram function
function renderDiagram() {
  console.log("Rendering diagram");
  const input = document.getElementById("mermaid-input");
  const output = document.getElementById("mermaid-output");

  if (!input || !output) {
    console.error("Input or output element not found");
    return;
  }

  const content = input.value.trim();
  if (!content) {
    output.innerHTML =
      "<p class='text-grey-400'>Enter Mermaid syntax to see the diagram</p>";
    return;
  }

  try {
    output.innerHTML = content;
    if (typeof mermaid !== "undefined") {
      mermaid
        .render("mermaid-diagram", content)
        .then(function (result) {
          output.innerHTML = result.svg;
        })
        .catch(function (error) {
          output.innerHTML = `<div class="text-red-500">Error: ${error.message}</div>`;
        });
    } else {
      throw new Error("Mermaid library not loaded");
    }
  } catch (error) {
    output.innerHTML = `<div class="text-red-500">Error: ${error.message}</div>`;
  }
}

// Initialize the application
function initializeApp() {
  console.log("Initializing app");
  try {
    initializeMermaid();
    createFullInterface();
    console.log("App initialized successfully");
  } catch (error) {
    console.error("Error initializing app:", error);
    document.getElementById("app").innerHTML = `
      <div class="error-container">
        <h1>Error Initializing App</h1>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// When document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
    initializeApp();
  });
} else {
  console.log("Document already loaded");
  initializeApp();
}

// Communication with parent frame if in iframe
try {
  // Check if we're in an iframe
  if (window.parent !== window) {
    // Send resize message to parent
    function sendResizeMessage() {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: "resize", height }, "*");
    }
    // Send initial resize
    window.addEventListener("load", sendResizeMessage);
    // Send resize on content change
    const observer = new MutationObserver(sendResizeMessage);
    observer.observe(document.body, { subtree: true, childList: true });
  }
} catch {
  // Ignore cross-origin errors
  console.log("Cross-origin communication not available");
}

// For debugging
console.log("Script loaded completely");
