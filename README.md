# Programiz Online Compiler (Prank Edition)

A high-fidelity single-page clone of the **Programiz Online Compiler** built with vanilla HTML, CSS, and JavaScript.

> **The Prank**: No matter what code you write or what language you select, clicking **Run ▶** (or pressing `Ctrl + Enter`) simulates an execution for ~800ms with a "Running..." indicator, and then reveals the prank walking hand image in the Output panel!

---

## 🚀 Features

- **Programiz Aesthetic**: Clean, modern light theme with 1px light-gray borders, accurate tab bar, brand header, and responsive layout.
- **13 Programming Languages**:
  1. Python (`main.py`)
  2. R (`main.r`)
  3. SQL (`main.sql`)
  4. HTML (`index.html`)
  5. Java (`Main.java`)
  6. Kotlin (`main.kt`)
  7. C (`main.c`)
  8. C++ (`main.cpp`)
  9. C# (`Program.cs`)
  10. JavaScript (`script.js`)
  11. TypeScript (`main.ts`)
  12. Go (`main.go`)
  13. Rust (`main.rs`)
- **CodeMirror 5 Editor**: Full syntax highlighting for each language, line numbers, monospace font (`Fira Code`), and fully editable code buffer.
- **Prank Execution Simulation**:
  - Shows "Running..." for ~800ms upon clicking **Run** or pressing `Ctrl + Enter`.
  - Fades in `output.png` at the top of the output panel, scaled to fit panel width (max-height 80%).
  - Never evaluates code or leaks syntax errors.
  - Replays cleanly on repeated clicks.
- **Draggable Divider**: Resize the Editor and Output panels smoothly with mouse or touch.
- **Responsive Layout**: Adapts automatically on screens under 768px (e.g. mobile ~400px) by stacking panels vertically.
- **Customizable Brand**: Change `const BRAND_NAME = "Programiz";` at the top of `script.js` to change the logo brand name instantly.

---

## 💻 How to Open the App Locally

### Method 1: Direct File Open (Zero Install)
Simply double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Method 2: Local HTTP Server (Recommended)
You can serve the directory using `npx serve` or Python:

```bash
# Using npx (Node.js)
npx serve .

# OR using Python
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## 🌐 How to Deploy

Because this project is built entirely with static vanilla HTML/CSS/JS (no build steps, no backend), it can be deployed for free in seconds!

### Deploying to GitHub Pages
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a repository on [GitHub](https://github.com) and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub, go to your repository **Settings** -> **Pages**.
4. Under **Build and deployment** -> **Source**, select `Deploy from a branch`.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Your compiler prank will be live at `https://<your-username>.github.io/<repo-name>/`!

### Deploying to Netlify
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `stitch_programiz_online_compiler_clone` folder into the Netlify drop zone.
3. Your site is deployed immediately with a live URL.

### Deploying to Vercel
1. Run `npx vercel` in the project directory.
2. Follow the prompts to deploy instantly.

---

## 📁 Project Structure

```
stitch_programiz_online_compiler_clone/
├── index.html       # Single-page HTML structure & CDN references
├── style.css        # Clean Programiz-styled theme, split layout, & animations
├── script.js        # Editor initialization, language configs, & prank logic
├── output.png       # The surprise prank image displayed upon clicking Run
└── README.md        # Documentation and deployment instructions
```
