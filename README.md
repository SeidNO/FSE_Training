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
*   **Recertification Logic**:
    *   **Expiration Check**: Automatically flags certificates older than 12 months as "Expired".
    *   **Course Reset**: Resets progress for expired courses, requiring the user to retake them to ensure compliance.
*   **State Persistence**: Automatically saves progress (current slide, language, name, completion dates) to `localStorage`, allowing users to resume where they left off.

> [!IMPORTANT]
> **Privacy & Data Storage Warning**:
> This application runs entirely in your browser ("client-side").
> *   All progress and certificates are saved **LOCALLY** on the specific computer and browser you are using.
> *   Nothing is sent to a central server.
> *   **Consequence:** If you wipe your browser cache, switch computers, or use "Incognito/Private" mode, your progress and certificates will be **LOST**.
> *   **Action:** Always download and save your PDF certificate immediately upon completion.
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

### Guides

#### Student Guide

> [!CAUTION]
> **CRITICAL: Your Progress is Saved LOCALLY**
> This training app does **NOT** save your progress to a central server. Everything is stored in your specific browser on this specific computer.
> *   **Do not switch computers** mid-course.
> *   **Do not use "Incognito" or "Private" windows**, as progress is lost when you close them.
> *   **Do not clear your browser history/cache** while taking the course.
> *   **ALWAYS download your PDF certificate immediately** after finishing. If you lose the PDF, you may have to retake the entire course.

1.  **Start:** Enter your full name on the welcome screen. This name will appear on your certificate.
2.  **Navigate:** Use "Neste" (Next) to move through slides. Read all safety information carefully.
3.  **Quiz:** At the end, you must pass a multiple-choice exam (80% score required).
4.  **Certificate:** Upon passing, your certificate is generated.
    *   Click "Last ned PDF" (Download PDF) to save/print it.
    *   **Important:** Send this PDF to your HR/Safety manager for archiving.
    *   **Retake:** If you wish to review the course again, click the "Retake Course" / "Ta kurset på nytt" button on the certificate screen.
5.  **Full Course (Reference):** You can download a PDF of the entire course content (without quiz answers) for your reference using the "Last ned PDF" button in the top bar.
    *   **Password:** `FSE2025`

#### Admin / Instructor Guide
*   **Full Course (Master Copy):** Instructors can download the course content *with correct answers highlighted* for training purposes.
    *   Click "Last ned PDF" in the top bar.
    *   **Password:** `Seid2025`
*   **Import Course (Hidden Feature):**
    *   Click the "Import" button in the top right corner.
    *   Paste a valid JavaScript/JSON course object (see structure below).
    *   Click "Import & Run". The course will be saved to your local browser storage.

#### Developer / Content Creator Guide
*   **Adding New Courses:**
    *   Open `data/content.js`.
    *   (See `data/sample_content.js` for a template).
    *   Add a new entry to the `courses` object with a unique ID (e.g., `"fire_safety"`).
    *   Follow the existing JSON structure.

### Course Content Generation (AI Assisted)
You can use Gemini (or other LLMs) to rapidly generate course modules. Copy and paste the prompt below to get valid JSON code.

**Prompt for Gemini:**
> "I need to add a new course module to my FSE Training App. Please generate a JavaScript object entry for a course with the ID `[COURSE_ID]` and title `[COURSE_TITLE]`.
>
> **Important:** The output should be a single object entry where the key is the course ID (e.g., `"[COURSE_ID]": { ... }`).
>
> Here is the expected structure (example):
> ```javascript
> "sample_course_id": {
>     id: "sample_course_id",
>     revision: "2025-01-01",
>     title: {
>         no: "Eksempelkurs",
>         en: "Sample Course"
>     },
>     content: {
>         no: [
>             {
>                 title: "Introduksjon",
>                 html: `
>                 <h1>Velkommen</h1>
>                 <p>Dette er et <strong>eksempelkurs</strong> for å vise strukturen.</p>
>                 <div class="highlight-box">
>                     <strong>Info:</strong> Dette er en informasjonsboks.
>                 </div>
>             `
>             },
>             {
>                 title: "Advarsler",
>                 html: `
>                 <h2>Sikkerhet</h2>
>                 <div class="warning-box">
>                     <strong>Advarsel:</strong> Dette er en advarsel.
>                 </div>
>                 <div class="danger-box">
>                     <strong>FARE:</strong> Dette er en faremelding.
>                 </div>
>             `
>             },
>             {
>                 title: "Test",
>                 type: "quiz",
>                 questions: [
>                     {
>                         q: "Er dette et spørsmål?",
>                         options: ["Ja", "Nei", "Kanskje"],
>                         ans: 0
>                     }
>                 ]
>             },
>             {
>                 title: "Fullført",
>                 type: "cert"
>             }
>         ],
>         en: [
>             {
>                 title: "Introduction",
>                 html: `
>                 <h1>Welcome</h1>
>                 <p>This is a <strong>sample course</strong> to demonstrate the structure.</p>
>                 <div class="highlight-box">
>                     <strong>Info:</strong> This is an info box.
>                 </div>
>             `
>             },
>             {
>                 title: "Warnings",
>                 html: `
>                 <h2>Safety</h2>
>                 <div class="warning-box">
>                     <strong>Warning:</strong> This is a warning.
>                 </div>
>                 <div class="danger-box">
>                     <strong>DANGER:</strong> This is a danger message.
>                 </div>
>             `
>             },
>             {
>                 title: "Test",
>                 type: "quiz",
>                 questions: [
>                     {
>                         q: "Is this a question?",
>                         options: ["Yes", "No", "Maybe"],
>                         ans: 0
>                     }
>                 ]
>             },
>             {
>                 title: "Completed",
>                 type: "cert"
>             }
>         ]
>     }
> }
> ```
>
> Subject matter: `[DESCRIBE TOPIC HERE, e.g., Fire Safety in Substations]`
> Include 3-4 slides of theory and a quiz with 3 questions."

## Project Structure

```
FSE_Training/
├── css/
│   └── style.css       # All styles, including print optimizations
├── data/
│   └── content.js      # Course content (text, questions) for NO/EN
│   └── sample_content.js # Reference structure for new courses
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

*   **Admin Tools**: Added logic to import JSON courses directly from the UI.
*   **User Experience**: Added "Retake Course" button and consistent slide headers.
*   **Refactoring**: Codebase split into modular JavaScript files for better maintainability.
*   **Visuals**: Replaced placeholder images with a highly efficient CSS Sprite system (`illustrations.png`).
*   **Certificate**: 
    *   Added Seid logo.
    *   Removed borders for a cleaner look.
    *   Optimized for A4 printing.
    *   Added dynamic document titling for easier PDF saving.
*   **Multi-Course Support**: Refactored architecture to support multiple independent courses (e.g., FSE, First Aid).
*   **Course Dashboard**: New landing page to select available training modules.
*   **Certificate Expiration**: Implemented 12-month validity check.
    *   Courses older than 1 year are marked "Expired" on the dashboard.
    *   Progress is reset to enforce annual retraining (FSE requirement).
*   **Content**: Updated safety instructions to specifically address ModuPower and ESP/Reactor hazards.