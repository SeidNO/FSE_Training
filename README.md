# Seid AS - FSE & Safety Training Application

A web-based interactive training module designed for Seid AS employees. This application covers the **FSE (Safety regulations related to work on and operation of electrical installations)** requirements, with a specific focus on High Voltage SMPS (Switch Mode Power Supplies), DC-Link safety, and ModuPower/ESP operations.

## Features

*   **Bilingual Support**: Full support for Norwegian (NO) and English (EN), toggleable at any time.
*   **Interactive Slides**: Step-by-step training content with custom illustrations.
*   **Quiz Module**: Validates understanding before allowing course completion.
*   **Certificate Generation**:
    *   Generates a personalized certificate upon passing the quiz.
    *   **Print-Optimized**: Formatted perfectly for A4 paper (CSS `@media print`).
    *   **Custom Filename**: Automatically suggests `FSE_Certificate_[Name]_[Date]` when saving as PDF.
*   **State Persistence**: Automatically saves progress (current slide, language, name) to `localStorage`, allowing users to resume where they left off.
*   **Responsive Design**: Works on desktop and tablets.

## Tech Stack

*   **HTML5**: Semantic structure.
*   **CSS3**: Custom styling with CSS Variables, Flexbox, and CSS Sprites for efficient image loading.
*   **JavaScript (ES6+)**: Modular architecture using ES Modules (`import`/`export`).
    *   `js/main.js`: Entry point.
    *   `js/state.js`: State management and persistence.
    *   `js/ui.js`: UI rendering and event handling.
    *   `data/content.js`: Centralized content repository.

## Installation & Usage

Because this project uses **ES Modules**, it requires a local web server to run (browsers block `file://` imports for security reasons).

### 1. Prerequisites
*   A modern web browser (Chrome, Edge, Firefox).
*   Python (for a simple local server) OR VS Code with "Live Server" extension.

### 2. Running the Application

**Option A: Using Python (Recommended)**
1.  Open a terminal/command prompt in the project folder.
2.  Run:
    ```bash
    python -m http.server
    ```
3.  Open your browser and go to `http://localhost:8000`.

**Option B: Using VS Code Live Server**
1.  Open the project in VS Code.
2.  Right-click `index.html` and select "Open with Live Server".

### Guides

#### Student Guide
1.  **Start:** Enter your full name on the welcome screen. This name will appear on your certificate.
2.  **Navigate:** Use "Neste" (Next) to move through slides. Read all safety information carefully.
3.  **Quiz:** At the end, you must pass a multiple-choice exam (80% score required).
4.  **Certificate:** Upon passing, your certificate is generated.
    *   Click "Last ned PDF" (Download PDF) to save/print it.
    *   **Important:** Send this PDF to your HR/Safety manager for archiving.
5.  **Full Course (Reference):** You can download a PDF of the entire course content (without quiz answers) for your reference using the "Last ned PDF" button in the top bar.
    *   **Password:** `FSE2025`

#### Admin / Instructor Guide
*   **Full Course (Master Copy):** Instructors can download the course content *with correct answers highlighted* for training purposes.
    *   Click "Last ned PDF" in the top bar.
    *   **Password:** `Seid2025`

## Project Structure

```
FSE_Training/
├── css/
│   └── style.css       # All styles, including print optimizations
├── data/
│   └── content.js      # Course content (text, questions) for NO/EN
├── images/
│   ├── illustrations.png # CSS Sprite sheet for slides
│   └── Seid_logo.png     # Company logo
├── js/
│   ├── main.js         # App initialization
│   ├── state.js        # State management (localStorage)
│   └── ui.js           # DOM manipulation and rendering logic
├── index.html          # Main entry point
├── favicon.ico         # Browser tab icon
└── README.md           # This file
```

## Recent Updates

*   **Refactoring**: Codebase split into modular JavaScript files for better maintainability.
*   **Visuals**: Replaced placeholder images with a highly efficient CSS Sprite system (`illustrations.png`).
*   **Certificate**: 
    *   Added Seid logo.
    *   Removed borders for a cleaner look.
    *   Optimized for A4 printing.
    *   Added dynamic document titling for easier PDF saving.
*   **Content**: Updated safety instructions to specifically address ModuPower and ESP/Reactor hazards.