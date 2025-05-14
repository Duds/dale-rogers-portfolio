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

// Create the editor interface - simple version
function createBasicInterface() {
  console.log("Creating interface");
  const app = document.getElementById("app");
  if (!app) {
    console.error("App element not found");
    return;
  }

  // Create a simple interface for testing
  app.innerHTML = `
    <div style="padding: 20px; font-family: 'Poppins', sans-serif;">
      <h1 style="color: #00796B;">Mermaid Diagram Generator</h1>
      <p>Simple version for testing</p>

      <div style="display: grid; gap: 20px; grid-template-columns: 1fr 1fr; margin-top: 20px;">
        <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px;">
          <h2 style="margin-top: 0;">Input</h2>
          <textarea id="mermaid-input" style="width: 100%; height: 200px; padding: 8px; font-family: monospace;">graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    B -- No --> D[End]</textarea>
          <div style="margin-top: 10px;">
            <button onclick="renderDiagram()" style="background: #00796B; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px;">Render</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px;">
          <h2 style="margin-top: 0;">Output</h2>
          <div id="mermaid-output" style="min-height: 200px;"></div>
        </div>
      </div>
    </div>
  `;

  // Auto-render on load
  setTimeout(renderDiagram, 500);
}

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
    output.innerHTML = "<p>Please enter Mermaid syntax</p>";
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
          output.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
        });
    } else {
      throw new Error("Mermaid library not loaded");
    }
  } catch (error) {
    output.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
  }
}

// Initialize the application
function initializeApp() {
  console.log("Initializing app");
  try {
    initializeMermaid();
    createBasicInterface();
    console.log("App initialized successfully");
  } catch (error) {
    console.error("Error initializing app:", error);
    document.getElementById("app").innerHTML = `
      <div style="color: red; padding: 20px;">
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

// For debugging
console.log("Script loaded completely");
