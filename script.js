/**
 * ==============================================================================
 * PROGRAMIZ ONLINE COMPILER (PRANK EDITION) - SCRIPT.JS
 * ==============================================================================
 * This script powers the single-page clone of the Programiz Online Compiler.
 * 
 * Begineer Guide:
 * 1. BRAND_NAME: Change the variable below to whatever name you prefer!
 * 2. LANGUAGES: Contains configurations for all 13 supported languages.
 * 3. RUN SIMULATION: Whatever code is typed, clicking "Run" will wait ~800ms
 *    showing "Running...", then display output.png in the Output panel.
 * 4. DRAG RESIZE: The divider between editor and output can be dragged with mouse or touch.
 * ==============================================================================
 */

// ==============================================================================
// 1. BRANDING CONFIGURATION (Change this to customize your compiler brand!)
// ==============================================================================
const BRAND_NAME = "Programiz";

// Apply brand name to the page title and the header text on load
document.addEventListener("DOMContentLoaded", () => {
  const brandTitleEl = document.getElementById("brand-title");
  if (brandTitleEl) {
    brandTitleEl.textContent = BRAND_NAME;
  }
  document.title = `${BRAND_NAME} Online Compiler`;
});


// ==============================================================================
// 2. LANGUAGE CONFIGURATIONS & HELLO WORLD TEMPLATES
// ==============================================================================
// Supported languages in the exact required order:
// Python, R, SQL, HTML, Java, Kotlin, C, C++, C#, JavaScript, TypeScript, Go, Rust.
const LANGUAGES = {
  python: {
    name: "Python",
    filename: "main.py",
    mode: "python",
    code: `# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.

def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
`
  },
  r: {
    name: "R",
    filename: "main.r",
    mode: "r",
    code: `# Online R compiler to run R online.
# Write R code in this online editor and run it.

message <- "Hello, World!"
print(message)
`
  },
  sql: {
    name: "SQL",
    filename: "main.sql",
    mode: "text/x-sql",
    code: `-- Online SQL editor to run SQL online.
-- Write SQL queries in this online editor and run it.

SELECT 'Hello, World!' AS message;
`
  },
  html: {
    name: "HTML",
    filename: "index.html",
    mode: "htmlmixed",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
  <style>
    body { font-family: sans-serif; text-align: center; margin-top: 50px; }
    h1 { color: #0056d2; }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to the Online HTML Compiler.</p>
</body>
</html>
`
  },
  java: {
    name: "Java",
    filename: "Main.java",
    mode: "text/x-java",
    code: `// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`
  },
  kotlin: {
    name: "Kotlin",
    filename: "main.kt",
    mode: "text/x-kotlin",
    code: `// Online Kotlin Compiler
// Write Kotlin code in this online editor and run it.

fun main() {
    println("Hello, World!")
}
`
  },
  c: {
    name: "C",
    filename: "main.c",
    mode: "text/x-csrc",
    code: `// Online C compiler to run C program online
#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello, World!\\n");

    return 0;
}
`
  },
  cpp: {
    name: "C++",
    filename: "main.cpp",
    mode: "text/x-c++src",
    code: `// Online C++ compiler to run C++ program online
#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "Hello, World!" << std::endl;

    return 0;
}
`
  },
  csharp: {
    name: "C#",
    filename: "Program.cs",
    mode: "text/x-csharp",
    code: `// Online C# Editor for free
// Write, Edit and Run your C# code using C# Online Compiler

using System;

public class Program {
    public static void Main(string[] args) {
        Console.WriteLine("Hello, World!");
    }
}
`
  },
  javascript: {
    name: "JavaScript",
    filename: "script.js",
    mode: "javascript",
    code: `// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

function main() {
    console.log("Hello, World!");
}

main();
`
  },
  typescript: {
    name: "TypeScript",
    filename: "main.ts",
    mode: "text/typescript",
    code: `// Online TypeScript Editor
// Write, Edit and Run your TypeScript code online

const greeting: string = "Hello, World!";
console.log(greeting);
`
  },
  go: {
    name: "Go",
    filename: "main.go",
    mode: "text/x-go",
    code: `// You can edit this code!
// Click here and start typing.
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
`
  },
  rust: {
    name: "Rust",
    filename: "main.rs",
    mode: "text/x-rustsrc",
    code: `// Online Rust compiler to run Rust program online
fn main() {
    println!("Hello, World!");
}
`
  }
};


// ==============================================================================
// 3. APPLICATION STATE & DOM REFERENCES
// ==============================================================================
let currentLangKey = "python";  // Default starting language
let codeMirrorEditor = null;    // Holds the CodeMirror 5 instance
let runExecutionTimer = null;   // Keeps track of the 800ms prank timeout

// DOM Elements
const tabFilenameEl = document.getElementById("tab-filename");
const runButtonEl = document.getElementById("run-btn");
const outputContentEl = document.getElementById("output-content");
const langButtons = document.querySelectorAll(".lang-btn");
const shareButtonEl = document.getElementById("share-btn");
const moreButtonEl = document.getElementById("more-btn");
const toastNoticeEl = document.getElementById("toast-notice");


// ==============================================================================
// 4. INITIALIZE CODEMIRROR 5 EDITOR
// ==============================================================================
function initEditor() {
  const textarea = document.getElementById("code-editor");

  codeMirrorEditor = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: LANGUAGES[currentLangKey].mode,
    theme: "default",
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    autofocus: true,
    // Add keyboard shortcuts directly in CodeMirror
    extraKeys: {
      "Ctrl-Enter": function() {
        executePrankRun();
      },
      "Cmd-Enter": function() {
        executePrankRun();
      }
    }
  });

  // Load the initial Python code
  codeMirrorEditor.setValue(LANGUAGES[currentLangKey].code);

  // Clear undo history so initial template is the clean starting point
  codeMirrorEditor.clearHistory();
}


// ==============================================================================
// 5. LANGUAGE SWITCHING LOGIC
// ==============================================================================
/**
 * Switches the active compiler language:
 * - Updates the active sidebar button styling
 * - Updates the middle tab's file name
 * - Sets the CodeMirror mode for proper syntax highlighting
 * - Inserts the language's short Hello World template
 * - Clears the Output panel
 */
function switchLanguage(langKey) {
  if (!LANGUAGES[langKey]) return;

  currentLangKey = langKey;
  const langConfig = LANGUAGES[langKey];

  // 1. Update active button in sidebar
  langButtons.forEach(btn => {
    if (btn.getAttribute("data-lang") === langKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 2. Update filename tab
  tabFilenameEl.textContent = langConfig.filename;

  // 3. Update editor mode & starter code
  if (codeMirrorEditor) {
    codeMirrorEditor.setOption("mode", langConfig.mode);
    codeMirrorEditor.setValue(langConfig.code);
    codeMirrorEditor.clearHistory();
    // Refresh to redraw gutter numbers cleanly
    setTimeout(() => codeMirrorEditor.refresh(), 10);
  }

  // 4. Cancel any ongoing run sequence and clear the output panel
  if (runExecutionTimer) {
    clearTimeout(runExecutionTimer);
    runExecutionTimer = null;
  }
  clearOutput();
}

/**
 * Clears the output screen back to initial waiting state
 */
function clearOutput() {
  outputContentEl.innerHTML = `
    <div class="output-placeholder">Press <kbd>Run ▶</kbd> to execute the program.</div>
  `;
}


// ==============================================================================
// 6. PRANK RUN EXECUTION SIMULATION
// ==============================================================================
/**
 * The core prank logic:
 * - Regardless of code content, language, or syntax errors:
 * - Clears the output immediately
 * - Shows "Running..." for ~800 milliseconds
 * - Then fades in output.png centered at the top of the output panel
 * - Clicking Run repeatedly cancels previous timeouts and replays cleanly
 */
function executePrankRun() {
  // If a run is already scheduled, abort it so we replay freshly
  if (runExecutionTimer) {
    clearTimeout(runExecutionTimer);
    runExecutionTimer = null;
  }

  // Step 1: Clear output and show realistic "Running..." indicator
  outputContentEl.innerHTML = `
    <div class="running-banner">
      <span class="running-spinner"></span>
      <span>Running...</span>
    </div>
  `;

  // Step 2: Wait 800ms then display the prank image output.png
  runExecutionTimer = setTimeout(() => {
    // Create image container to ensure perfect centering and scaling
    outputContentEl.innerHTML = `
      <div class="prank-image-container">
        <img 
          src="output.png?t=${Date.now()}" 
          alt="Prank Output" 
          class="prank-output-img" 
        />
      </div>
    `;
    runExecutionTimer = null;
  }, 800);
}


// ==============================================================================
// 7. DRAGGABLE SPLIT DIVIDER (Desktop & Mobile Responsive)
// ==============================================================================
function initSplitDivider() {
  const divider = document.getElementById("drag-splitter");
  const editorPane = document.getElementById("editor-pane");
  const outputPane = document.getElementById("output-pane");
  const workspaceContainer = document.getElementById("workspace-container");

  let isDragging = false;

  // Start dragging on mouse down or touch start
  function onStartDrag(e) {
    isDragging = true;
    divider.classList.add("dragging");
    document.body.style.userSelect = "none";
    document.body.style.pointerEvents = "none";
    divider.style.pointerEvents = "auto";
  }

  // Handle movement
  function onMoveDrag(e) {
    if (!isDragging) return;

    const isMobile = window.innerWidth <= 768;
    const rect = workspaceContainer.getBoundingClientRect();

    if (!isMobile) {
      // Horizontal split (side-by-side)
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (!clientX) return;

      const offsetLeft = clientX - rect.left;
      const totalWidth = rect.width;

      // Minimum widths for both panels to maintain layout integrity
      const minPanelWidth = 240;
      if (offsetLeft >= minPanelWidth && offsetLeft <= (totalWidth - minPanelWidth)) {
        const percentage = (offsetLeft / totalWidth) * 100;
        editorPane.style.width = `${percentage}%`;
        outputPane.style.width = `${100 - percentage}%`;
        
        // Let CodeMirror adapt smoothly to width change
        if (codeMirrorEditor) {
          codeMirrorEditor.refresh();
        }
      }
    } else {
      // Vertical split (stacked vertically on mobile/tablet)
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (!clientY) return;

      const offsetTop = clientY - rect.top;
      const totalHeight = rect.height;

      const minPanelHeight = 140;
      if (offsetTop >= minPanelHeight && offsetTop <= (totalHeight - minPanelHeight)) {
        const percentage = (offsetTop / totalHeight) * 100;
        editorPane.style.height = `${percentage}%`;
        outputPane.style.height = `${100 - percentage}%`;
        editorPane.style.width = "100%";
        outputPane.style.width = "100%";

        if (codeMirrorEditor) {
          codeMirrorEditor.refresh();
        }
      }
    }
  }

  // End dragging
  function onStopDrag() {
    if (!isDragging) return;
    isDragging = false;
    divider.classList.remove("dragging");
    document.body.style.userSelect = "";
    document.body.style.pointerEvents = "";
    divider.style.pointerEvents = "";

    if (codeMirrorEditor) {
      codeMirrorEditor.refresh();
    }
  }

  // Attach event listeners for mouse and touch interactions
  divider.addEventListener("mousedown", onStartDrag);
  window.addEventListener("mousemove", onMoveDrag);
  window.addEventListener("mouseup", onStopDrag);

  divider.addEventListener("touchstart", onStartDrag, { passive: true });
  window.addEventListener("touchmove", onMoveDrag, { passive: true });
  window.addEventListener("touchend", onStopDrag);
}


// ==============================================================================
// 8. TOAST NOTIFICATIONS & UTILITY INTERACTIONS
// ==============================================================================
let toastTimeout = null;

function showToast(message) {
  if (!toastNoticeEl) return;
  toastNoticeEl.textContent = message;
  toastNoticeEl.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastNoticeEl.classList.remove("show");
  }, 2400);
}


// ==============================================================================
// 9. EVENT LISTENERS & SETUP
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize CodeMirror 5
  initEditor();

  // 2. Setup draggable divider
  initSplitDivider();

  // 3. Attach click handlers to language sidebar buttons
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const langKey = btn.getAttribute("data-lang");
      switchLanguage(langKey);
    });
  });

  // 4. Attach Run button handler
  runButtonEl.addEventListener("click", () => {
    executePrankRun();
  });

  // 5. Global keyboard shortcut (Ctrl+Enter or Cmd+Enter)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      executePrankRun();
    }
  });

  // 6. Share button interaction (copies current editor code to clipboard)
  if (shareButtonEl) {
    shareButtonEl.addEventListener("click", async () => {
      if (codeMirrorEditor) {
        try {
          await navigator.clipboard.writeText(codeMirrorEditor.getValue());
          showToast("Code copied to clipboard!");
        } catch (err) {
          showToast("Code ready to share!");
        }
      }
    });
  }

  // 7. More Options button interaction
  if (moreButtonEl) {
    moreButtonEl.addEventListener("click", () => {
      showToast("Options: Clear output by switching languages or re-running.");
    });
  }

  // 8. Window resize handler to refresh CodeMirror layout
  window.addEventListener("resize", () => {
    if (codeMirrorEditor) {
      codeMirrorEditor.refresh();
    }
  });
});
