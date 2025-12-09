import { courses } from '../data/content.js';
import { state, saveState, resetState, getCurrentSlideIndex, setCurrentSlideIndex } from './state.js';

export function init() {
    // Bind global functions
    window.setLang = setLang;
    window.changeSlide = changeSlide;
    window.updateName = updateName;
    window.resetCourse = resetState;
    window.renderFullCourse = renderFullCourse;
    window.loadCourse = loadCourse;
    window.goToDashboard = goToDashboard;
    window.showImportModal = showImportModal;
    window.importCourse = importCourse;

    // Load imported courses from persistence
    loadImportedCourses();

    // Set initial language UI
    updateLangUI();

    if (!state.currentCourseId) {
        renderDashboard();
    } else {
        // Course active
        document.getElementById('btn-menu').style.display = 'inline-block';
        // Validate if course exists
        if (!courses[state.currentCourseId]) {
            console.error("Course not found:", state.currentCourseId);
            state.currentCourseId = null;
            saveState();
            renderDashboard();
            return;
        }
        renderSlide();
    }
}

export function goToDashboard() {
    state.currentCourseId = null;
    saveState();
    window.location.reload();
}

function updateLangUI() {
    document.getElementById('btn-no').classList.toggle('active', state.currentLang === 'no');
    document.getElementById('btn-no').setAttribute('aria-pressed', state.currentLang === 'no');
    document.getElementById('btn-en').classList.toggle('active', state.currentLang === 'en');
    document.getElementById('btn-en').setAttribute('aria-pressed', state.currentLang === 'en');

    // Update Menu Button Text
    const menuBtn = document.getElementById('btn-menu');
    if (menuBtn) {
        menuBtn.innerHTML = state.currentLang === 'no' ? '&larr; Meny' : '&larr; Menu';
        menuBtn.onclick = goToDashboard;
    }
}

export function setLang(lang, render = true) {
    state.currentLang = lang;
    updateLangUI();

    // Preserve name input if exists
    const nameInput = document.getElementById('inputName');
    if (nameInput) state.userName = nameInput.value;

    saveState();

    if (state.currentCourseId) {
        if (render) renderSlide();
    } else {
        renderDashboard();
    }
}

export function loadCourse(courseId) {
    if (!courses[courseId]) return;
    state.currentCourseId = courseId;
    saveState();
    // Reload to clean state or just re-render
    // Re-rendering is faster but we need to show UI elements
    document.getElementById('btn-menu').style.display = 'inline-block';
    renderSlide();
}

function renderDashboard() {
    const lang = state.currentLang;
    const contentArea = document.getElementById('contentArea');

    // Hide progress bar and footer
    document.querySelector('.progress-container').style.display = 'none';
    document.querySelector('.nav-footer').style.display = 'none';
    document.getElementById('btn-pdf').style.display = 'none';
    document.getElementById('btn-menu').style.display = 'none';

    let html = `
        <div class="dashboard-container" style="max-width: 800px; margin: 0 auto; text-align: center;">
            <h1 style="margin-bottom: 40px;">Seid AS Academy</h1>
            <div class="course-grid" style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
    `;

    Object.values(courses).forEach(course => {
        const title = typeof course.title === 'object' ? course.title[lang] : course.title;
        const modules = course.content[lang].filter(m => m.type !== 'cert').length;

        // Check progress
        const current = state.courseProgress[course.id] || 0;
        const total = course.content[lang].length;
        const isComplete = current >= total - 1;

        html += `
            <div class="course-card" onclick="loadCourse('${course.id}')" style="
                background: white; 
                padding: 20px; 
                border-radius: 8px; 
                box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
                cursor: pointer; 
                transition: transform 0.2s; 
                text-align: left; 
                border-left: 5px solid ${isComplete ? '#4CAF50' : '#0056b3'};
            " onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <h3 style="margin-top: 0; color: #333;">${title}</h3>
                <p style="color: #666; font-size: 0.9rem;">Revision: ${course.revision}</p>
                <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold; color: ${isComplete ? 'green' : '#0056b3'}">
                        ${isComplete ? (lang === 'no' ? 'Fullført' : 'Completed') : (lang === 'no' ? 'Start' : 'Start')}
                    </span>
                    <span style="font-size: 0.8rem; background: #eee; padding: 2px 8px; border-radius: 10px;">
                        ${modules} Moduler
                    </span>
                </div>
            </div>
        `;
    });

    html += `</div></div>`;
    contentArea.innerHTML = html;
}

export function updateName(val) {
    state.userName = val;
    saveState();
}

export function changeSlide(direction) {
    const activeCourse = courses[state.currentCourseId];
    if (!activeCourse) return;

    const currentSlideIndex = getCurrentSlideIndex();
    const slides = activeCourse.content[state.currentLang];

    // Validation: Name required on slide 0
    if (currentSlideIndex === 0 && direction === 1 && state.userName.trim().length < 2) {
        alert(state.currentLang === 'no' ? "Vennligst skriv inn navnet ditt." : "Please enter your name.");
        return;
    }

    // Validation: Quiz must be passed
    const slideData = slides[currentSlideIndex];
    if (slideData.type === 'quiz' && direction === 1) {
        if (!validateQuiz(slideData)) return;
    }

    const newIndex = currentSlideIndex + direction;
    if (newIndex >= 0 && newIndex < slides.length) {
        setCurrentSlideIndex(newIndex);
        renderSlide();
    }
}

function renderSlide() {
    const activeCourse = courses[state.currentCourseId];
    if (!activeCourse) return;

    const currentSlideIndex = getCurrentSlideIndex();
    const slides = activeCourse.content[state.currentLang];
    const data = slides[currentSlideIndex];

    const contentDiv = document.getElementById('contentArea');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progress = document.getElementById('progressBar');
    const pageInd = document.getElementById('pageIndicator');
    const pdfBtn = document.getElementById('btn-pdf');
    const courseTitle = document.getElementById('courseTitle');

    // Show UI elements
    document.querySelector('.progress-container').style.display = 'block';
    document.querySelector('.nav-footer').style.display = 'flex';
    if (pdfBtn) pdfBtn.style.display = 'inline-block';

    // Update Header Title
    if (courseTitle) {
        courseTitle.textContent = typeof activeCourse.title === 'object'
            ? activeCourse.title[state.currentLang]
            : activeCourse.title;
    }

    // Update Progress
    const percent = ((currentSlideIndex) / (slides.length - 1)) * 100;
    progress.style.width = percent + "%";
    document.querySelector('.progress-container').setAttribute('aria-valuenow', Math.round(percent));
    pageInd.innerText = `${currentSlideIndex + 1} / ${slides.length}`;

    // Render Content
    if (data.type === 'quiz') {
        renderQuiz(data);
        nextBtn.innerText = state.currentLang === 'no' ? "Lever & Fullfør" : "Submit & Finish";
    } else if (data.type === 'cert') {
        renderCertificate();
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        pageInd.style.display = 'none';
    } else {
        let contentHtml = data.html;
        // Render sprite image for slides 0-5 ONLY for FSE course
        if (state.currentCourseId === 'fse' && currentSlideIndex <= 5) {
            contentHtml = `<div class="slide-sprite slide-sprite-${currentSlideIndex}"></div>` + contentHtml;
        }

        // Header (New)
        contentHtml = `<div class="slide-header">${data.title}</div>` + contentHtml;

        contentDiv.innerHTML = contentHtml;

        // Dynamic Name Input Injection on Slide 0
        if (currentSlideIndex === 0) {
            // Check if input already exists in content (legacy support)
            if (!document.getElementById('inputName')) {
                const inputLabel = state.currentLang === 'no'
                    ? "<p>Vennligst skriv inn ditt fulle navn slik det skal stå på kursbeviset:</p>"
                    : "<p>Please enter your full name as it should appear on the certificate:</p>";

                const inputHtml = `
                    <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                        ${inputLabel}
                        <input type="text" id="inputName" class="name-input" placeholder="${state.currentLang === 'no' ? 'Ditt fulle navn' : 'Your full name'}" oninput="window.updateName(this.value)">
                    </div>
                `;
                contentDiv.insertAdjacentHTML('beforeend', inputHtml);
            }

            // Restore name value
            const input = document.getElementById('inputName');
            if (input && state.userName) {
                input.value = state.userName;
            }
        }

        nextBtn.innerText = state.currentLang === 'no' ? "Neste" : "Next";
        nextBtn.style.display = 'inline-block';
        prevBtn.style.display = 'inline-block';
        pageInd.style.display = 'inline-block';
    }

    // Disable Prev on start
    prevBtn.disabled = currentSlideIndex === 0;
}

function renderQuiz(data) {
    let html = `<h2>${data.title}</h2>`;
    data.questions.forEach((q, index) => {
        html += `<div class="quiz-question"><p><strong>${index + 1}. ${q.q}</strong></p>`;
        q.options.forEach((opt, oIndex) => {
            html += `
            <label class="quiz-option">
                <input type="radio" name="q${index}" value="${oIndex}"> ${opt}
            </label>
        `;
        });
        html += `</div>`;
    });
    document.getElementById('contentArea').innerHTML = html;
}

function validateQuiz(data) {
    let score = 0;
    let answeredAll = true;

    data.questions.forEach((q, index) => {
        const radios = document.getElementsByName(`q${index}`);
        let val = null;
        for (let radio of radios) {
            if (radio.checked) val = parseInt(radio.value);
        }

        if (val === null) answeredAll = false;
        if (val === q.ans) score++;
    });

    if (!answeredAll) {
        alert(state.currentLang === 'no' ? "Du må svare på alle spørsmålene." : "Please answer all questions.");
        return false;
    }

    const passRate = 0.8; // 80%
    const needed = Math.ceil(data.questions.length * passRate);

    if (score >= needed) {
        return true;
    } else {
        alert(state.currentLang === 'no'
            ? `Du fikk ${score} av ${data.questions.length} riktige. Du må ha minst ${needed}. Prøv igjen.`
            : `You got ${score} out of ${data.questions.length}. You need at least ${needed}. Try again.`);
        return false;
    }
}

function renderCertificate() {
    const activeCourse = courses[state.currentCourseId];
    const date = new Date().toLocaleDateString(state.currentLang === 'no' ? 'no-NO' : 'en-GB');

    // Update document title for print filename
    const safeDate = new Date().toISOString().split('T')[0];
    const safeFileName = state.userName.replace(/[^a-z0-9]/gi, '_');
    const courseTitle = typeof activeCourse.title === 'object' ? activeCourse.title.en : activeCourse.title; // Use EN for filename
    document.title = `${courseTitle.replace(/\s+/g, '_')}_Certificate_${safeFileName}_${safeDate}`;

    // Safe way to handle user name to prevent XSS
    const safeName = document.createElement('div');
    safeName.textContent = state.userName;
    const safeNameStr = safeName.innerHTML;

    // Expose retake function
    window.retakeCourse = function () {
        if (confirm(state.currentLang === 'no' ? "Er du sikker på at du vil ta kurset på nytt?" : "Are you sure you want to retake the course?")) {
            setCurrentSlideIndex(0);
            renderSlide();
        }
    };

    const html = `
    <div id="certificate-view">
        <div class="cert-logo"><img src="images/Seid_logo.png" alt="Seid AS" style="height: 60px; width: auto;"> | ACADEMY</div>
        <div class="cert-title">CERTIFICATE</div>
        <p>${state.currentLang === 'no' ? 'Det bekreftes herved at' : 'This certifies that'}</p>
        <div class="cert-name">${safeNameStr}</div>
        <p>${state.currentLang === 'no' ? 'har fullført og bestått' : 'has completed and passed'}</p>
        <h2>${typeof activeCourse.title === 'object' ? activeCourse.title[state.currentLang] : activeCourse.title}</h2>
        <div class="cert-details">
            <p><strong>Scope:</strong> Seid AS International Operations.</p>
            <p><em>Date: ${date} - Valid for 12 months</em></p>
            <p style="font-size: 0.7rem; color: #999; margin-top: 5px;">Rev. ${activeCourse.revision}</p>
        </div>
        <div class="no-print" style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="color: #d9534f; font-weight: bold; font-size: 0.9rem;">
                ${state.currentLang === 'no'
            ? 'HUSK: Send denne PDF-en til personalansvarlig for arkivering!'
            : 'REMEMBER: Send this PDF to HR for archiving!'}
            </p>
            <button onclick="window.print()" class="btn btn-primary">
                ${state.currentLang === 'no' ? 'Last ned PDF / Skriv ut' : 'Download PDF / Print'}
            </button>
            <button onclick="window.goToDashboard()" class="btn btn-secondary" style="margin-left: 10px;">
                 ${state.currentLang === 'no' ? 'Tilbake til meny' : 'Back to Menu'}
            </button>
             <button onclick="window.retakeCourse()" class="btn btn-secondary" style="margin-left: 10px; border-color: #f0ad4e; color: #f0ad4e;">
                 ${state.currentLang === 'no' ? 'Ta kurset på nytt' : 'Retake Course'}
            </button>
        </div>
    </div>
`;
    document.getElementById('contentArea').innerHTML = html;
    document.querySelector('.progress-container').style.display = 'none';
}

export function renderFullCourse() {
    showPasswordModal((password) => {
        if (password === "Seid2025") {
            // Admin/Teacher: Show answers
            generateFullCourseView(true);
        } else if (password === "FSE2025") {
            // Student: Hide answers
            generateFullCourseView(false);
        } else {
            alert(state.currentLang === 'no' ? "Feil passord." : "Incorrect password.");
        }
    });
}

function showPasswordModal(onSuccess) {
    // Create modal elements
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const title = document.createElement('h3');
    title.className = 'modal-title';
    title.innerText = state.currentLang === 'no' ? "Passordbeskyttet" : "Password Protected";

    const input = document.createElement('input');
    input.type = 'password';
    input.className = 'modal-input';
    input.placeholder = state.currentLang === 'no' ? "Skriv inn passord" : "Enter password";

    const btnContainer = document.createElement('div');
    btnContainer.className = 'modal-buttons';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.innerText = state.currentLang === 'no' ? "Avbryt" : "Cancel";
    cancelBtn.onclick = () => document.body.removeChild(overlay);

    const okBtn = document.createElement('button');
    okBtn.className = 'btn btn-primary';
    okBtn.innerText = "OK";

    // Submit handler
    const submit = () => {
        const val = input.value;
        document.body.removeChild(overlay);
        onSuccess(val);
    };

    okBtn.onclick = submit;
    input.onkeydown = (e) => {
        if (e.key === 'Enter') submit();
    };

    // Assemble
    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(okBtn);
    content.appendChild(title);
    content.appendChild(input);
    content.appendChild(btnContainer);
    overlay.appendChild(content);

    document.body.appendChild(overlay);
    input.focus();
}

function generateFullCourseView(showAnswers) {
    if (!state.currentCourseId) return;
    const activeCourse = courses[state.currentCourseId];
    const allSlides = activeCourse.content[state.currentLang];

    let html = `<div class="full-course-view">`;

    // Add Header for Print
    html += `
        <div class="print-header" style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px;">
            <h1>Seid AS - Academy</h1>
            <h2>${typeof activeCourse.title === 'object' ? activeCourse.title[state.currentLang] : activeCourse.title}</h2>
            <p>Full Course Content - ${new Date().toLocaleDateString()}</p>
            <p style="font-size: 0.8rem; color: #666;">Rev. ${activeCourse.revision}</p>
        </div>
    `;

    allSlides.forEach((slide, index) => {
        if (slide.type === 'cert') return; // Skip certificate in full view

        html += `<div class="slide-print-container" style="page-break-after: always; margin-bottom: 50px; border-bottom: 1px dashed #ccc; padding-bottom: 50px;">`;

        if (slide.type === 'quiz') {
            html += `<h2>${slide.title}</h2>`;
            slide.questions.forEach((q, qIdx) => {
                html += `<div class="quiz-item" style="margin-bottom: 20px;">
                    <p><strong>${qIdx + 1}. ${q.q}</strong></p>
                    <ul>
                        ${q.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === q.ans;
                    const style = (showAnswers && isCorrect) ? 'font-weight:bold; color:green;' : '';
                    const suffix = (showAnswers && isCorrect) ? ' (Correct)' : '';
                    return `<li style="${style}">${opt}${suffix}</li>`;
                }).join('')}
                    </ul>
                 </div>`;
            });
        } else {
            // Add slide number
            html += `<div style="font-size: 0.8rem; color: #666; margin-bottom: 10px;">Slide ${index + 1}</div>`;

            // Add Image if applicable (Slides 0-5) AND FSE course
            if (state.currentCourseId === 'fse' && index <= 5) {
                html += `<div class="slide-sprite slide-sprite-${index}" style="width: 50%; margin: 0 auto 20px auto;"></div>`;
            }
            html += slide.html;
        }

        html += `</div>`;
    });

    html += `</div>`;

    // Hide UI elements
    document.querySelector('.progress-container').style.display = 'none';
    document.querySelector('.nav-footer').style.display = 'none';
    document.getElementById('btn-menu').style.display = 'none';

    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = html;

    // Add print button at the top
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-primary no-print';
    printBtn.innerText = state.currentLang === 'no' ? 'Skriv ut til PDF' : 'Print to PDF';
    printBtn.onclick = () => window.print();
    printBtn.style.marginBottom = '20px';
    printBtn.style.display = 'block';
    printBtn.style.margin = '0 auto 20px auto';

    contentArea.insertBefore(printBtn, contentArea.firstChild);

    // Add Back button in print view
    const backBtn = document.createElement('button');
    backBtn.className = 'btn btn-secondary no-print';
    backBtn.innerText = state.currentLang === 'no' ? 'Tilbake' : 'Back';
    backBtn.onclick = () => window.location.reload();
    backBtn.style.marginBottom = '20px';
    backBtn.style.display = 'block';
}

export function showImportModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.maxWidth = '600px';

    const title = document.createElement('h3');
    title.innerText = "Import Course Data";
    title.style.color = '#333';

    const textarea = document.createElement('textarea');
    textarea.placeholder = "Paste JS/JSON object here (e.g. { id: '...', ... })";
    textarea.style.width = '100%';
    textarea.style.height = '300px';
    textarea.style.fontFamily = 'monospace';
    textarea.style.fontSize = '0.9rem';
    textarea.style.marginBottom = '20px';
    textarea.style.padding = '10px';
    textarea.style.border = '1px solid #ccc';
    textarea.style.borderRadius = '4px';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'modal-buttons';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.innerText = "Cancel";
    cancelBtn.onclick = () => document.body.removeChild(overlay);

    const importBtn = document.createElement('button');
    importBtn.className = 'btn btn-primary';
    importBtn.innerText = "Import & Run";

    const runImport = () => {
        const text = textarea.value;
        if (!text.trim()) return;
        importCourse(text);
        document.body.removeChild(overlay);
    };

    importBtn.onclick = runImport;

    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(importBtn);
    content.appendChild(title);
    content.appendChild(textarea);
    content.appendChild(btnContainer);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    textarea.focus();
}

export function importCourse(input) {
    try {
        let newCourseObj = null;
        // Try parsing assuming it's a key-value pair from the prompt: "id": { ... }
        // We wrap it in braces to make it a valid object: { "id": { ... } }
        try {
            // Using new Function to allow loose JSON (JS object syntax)
            const wrapper = new Function("return {" + input + "}");
            const result = wrapper();
            // Get the first key
            const key = Object.keys(result)[0];
            if (key && result[key].id && result[key].content) {
                newCourseObj = result[key];
            }
        } catch (e) {
            // Failed, try parsing as a direct object: { id: ..., content: ... }
            try {
                const direct = new Function("return " + input);
                const result = direct();
                if (result.id && result.content) {
                    newCourseObj = result;
                }
            } catch (e2) {
                console.error("Parse error", e2);
            }
        }

        if (!newCourseObj) {
            alert("Could not parse course data. Ensure it is a valid JS object with 'id', 'title' and 'content'.");
            return;
        }

        // Add to courses
        courses[newCourseObj.id] = newCourseObj;

        // Save to persistence
        saveImportedCourse(newCourseObj);

        alert(`Course '${newCourseObj.id}' imported successfully!`);

        // Go to dashboard to see it
        goToDashboard();

    } catch (err) {
        alert("Error importing course: " + err.message);
        console.error(err);
    }
}

function saveImportedCourse(courseObj) {
    try {
        let imported = JSON.parse(localStorage.getItem('fse_imported_courses') || '{}');
        imported[courseObj.id] = courseObj;
        localStorage.setItem('fse_imported_courses', JSON.stringify(imported));
    } catch (e) {
        console.error("Failed to save imported course", e);
    }
}

function loadImportedCourses() {
    try {
        const imported = JSON.parse(localStorage.getItem('fse_imported_courses') || '{}');
        for (const [id, course] of Object.entries(imported)) {
            if (!courses[id]) {
                courses[id] = course;
            }
        }
    } catch (e) {
        console.error("Failed to load imported courses", e);
    }
}
