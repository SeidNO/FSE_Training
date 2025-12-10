import { courses } from '../data/content.js';
import { state, saveState, resetState, getCurrentSlideIndex, setCurrentSlideIndex, checkRevisions, checkExpirations, completeCourseRevision } from './state.js';

export function init() {
    // Bind global functions
    window.setLang = setLang;
    window.changeSlide = changeSlide;
    window.updateName = updateName;
    window.resetCourse = resetState;
    window.renderFullCourse = renderFullCourse;
    window.loadCourse = loadCourse;
    window.goToDashboard = goToDashboard;
    window.openAdminPanel = openAdminPanel;
    window.importCourse = importCourse;
    window.setFilter = setFilter;

    // Load imported courses from persistence
    loadImportedCourses();

    // Check for revisions and reset progress if needed
    checkRevisions(courses);

    // Check for expirations (12 months) and reset progress
    // We don't alert anymore, we show it in the dashboard
    checkExpirations(courses);

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

    // Update PDF/Summary Button Text
    const pdfBtn = document.getElementById('btn-pdf');
    if (pdfBtn) {
        pdfBtn.innerText = state.currentLang === 'no' ? 'Kurssammendrag' : 'Course Summary';
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
    `;

    // 1. Extract Unique Tags
    const allTags = new Map();
    Object.values(courses).forEach(c => {
        if (c.tags && Array.isArray(c.tags)) {
            c.tags.forEach(t => {
                // Support both old string tags (legacy safety) and new object tags
                if (typeof t === 'object' && t.en && t.no) {
                    allTags.set(t.en, t);
                } else if (typeof t === 'string') {
                    // Fallback if someone forgot to update a course
                    allTags.set(t, { en: t, no: t });
                }
            });
        }
    });

    // Sort tags by current language for display
    const uniqueTags = Array.from(allTags.values()).sort((a, b) => {
        return a[lang].localeCompare(b[lang]);
    });

    // 2. Render Filter Buttons
    if (uniqueTags.length > 0) {
        // Initialize filter state if not set
        if (!state.currentFilter) state.currentFilter = 'all';

        html += `<div class="filter-bar" style="margin-bottom: 30px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">`;

        // 'All' Button
        const allActive = state.currentFilter === 'all';
        html += `<button onclick="setFilter('all')" class="btn-filter ${allActive ? 'active' : ''}" style="
            padding: 8px 16px; 
            border: 1px solid #ccc; 
            border-radius: 20px; 
            background: ${allActive ? '#0056b3' : '#fff'}; 
            color: ${allActive ? '#fff' : '#333'}; 
            cursor: pointer;
            transition: all 0.2s;
        ">${lang === 'no' ? 'Alle' : 'All'}</button>`;

        // Tag Buttons
        uniqueTags.forEach(tag => {
            // We use the English value as the persistent ID for the filter
            const isActive = state.currentFilter === tag.en;
            html += `<button onclick="setFilter('${tag.en}')" class="btn-filter ${isActive ? 'active' : ''}" style="
                padding: 8px 16px; 
                border: 1px solid #ccc; 
                border-radius: 20px; 
                background: ${isActive ? '#0056b3' : '#fff'}; 
                color: ${isActive ? '#fff' : '#333'}; 
                cursor: pointer;
                transition: all 0.2s;
            ">${tag[lang]}</button>`;
        });

        html += `</div>`;
    }

    html += `<div class="course-grid" style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">`;

    Object.values(courses).forEach(course => {
        // FILTER LOGIC
        if (state.currentFilter !== 'all') {
            if (!course.tags) return; // No tags = hide when filtering

            // Check if any of the course's tags match the selected filter (by EN key)
            const hasTag = course.tags.some(t => {
                if (typeof t === 'object') return t.en === state.currentFilter;
                return t === state.currentFilter; // Legacy string support
            });

            if (!hasTag) return;
        }

        const title = typeof course.title === 'object' ? course.title[lang] : course.title;
        const modules = course.content[lang].filter(m => m.type !== 'cert').length;

        // Check progress
        const current = state.courseProgress[course.id] || 0;
        const total = course.content[lang].length;
        const isComplete = current >= total - 1;

        // Check for new revision
        // If we have a stored revision, and it's different from current, AND we aren't currently effectively complete (which would be handled by resetState logic anyway, but UI needs to know)
        // Actually, checkRevisions runs on init. So if there was a mismatch, progress is already 0.
        // We just need to know if we *previously* completed an older revision.
        const storedRev = state.completedRevisions[course.id];
        const isNewRevision = storedRev && storedRev !== course.revision;

        // Check for Expiration
        let isExpired = false;
        const oneYearMs = 365 * 24 * 60 * 60 * 1000;
        if (state.completionDates && state.completionDates[course.id]) {
            const date = new Date(state.completionDates[course.id]);
            if ((new Date() - date) > oneYearMs) {
                isExpired = true;
            }
        }

        html += `
            <div class="course-card" onclick="loadCourse('${course.id}')" style="
                background: white; 
                padding: 20px; 
                border-radius: 8px; 
                box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
                cursor: pointer; 
                transition: transform 0.2s; 
                text-align: left; 
                border-left: 5px solid ${isComplete ? '#4CAF50' : (isExpired ? '#d9534f' : (isNewRevision ? '#FFC107' : '#0056b3'))};
                position: relative;
            " onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="position: absolute; top: 10px; right: 10px; display: flex; flex-direction: column; gap: 5px; align-items: flex-end;">
                    ${isNewRevision ? `<span style="background: #FFC107; color: #000; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold;">New Revision</span>` : ''}
                    ${isExpired ? `<span style="background: #d9534f; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold;">${lang === 'no' ? 'Utløpt' : 'Expired'}</span>` : ''}
                </div>
                <h3 style="margin-top: 0; color: #333; padding-right: 70px;">${title}</h3>
                
                 <div style="margin-bottom: 10px;">
                    ${course.tags ? course.tags.map(t => {
            const label = (typeof t === 'object') ? t[lang] : t;
            return `<span style="
                        display: inline-block; 
                        background: #eef; 
                        color: #55a; 
                        padding: 2px 8px; 
                        border-radius: 10px; 
                        font-size: 0.75rem; 
                        margin-right: 5px;
                    ">${label}</span>`;
        }).join('') : ''}
                </div>
                
                <p style="color: #666; font-size: 0.9rem;">
                    Revision: ${course.revision}
                    ${storedRev && storedRev !== course.revision ? `<br><span style="font-size: 0.8rem; color: #eebb00;">(Prev: ${storedRev})</span>` : ''}
                </p>
                <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold; color: ${isComplete ? 'green' : (isExpired ? '#d9534f' : (isNewRevision ? '#e6a800' : '#0056b3'))}">
                        ${isComplete ? (lang === 'no' ? 'Fullført' : 'Completed') : (isExpired ? (lang === 'no' ? 'Forny nå' : 'Renew now') : (isNewRevision ? (lang === 'no' ? 'Oppdatering' : 'Update') : (lang === 'no' ? 'Start' : 'Start')))}
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

// Global function (attached to window in init usually, but good to export)
export function setFilter(filter) {
    state.currentFilter = filter;
    // We don't save filter state to localStorage as it's a temporary UI state found often in session.
    // If user wants persistence, add filter to state.js defaults. 
    // For now, let's just re-render.
    renderDashboard();
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
    // Mark as completed revision
    completeCourseRevision(state.currentCourseId, activeCourse.revision);

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

    // Add buttons container at the top
    const btnContainer = document.createElement('div');
    btnContainer.className = 'no-print';
    btnContainer.style.marginBottom = '20px';
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'center';
    btnContainer.style.gap = '20px';

    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-primary';
    printBtn.innerText = state.currentLang === 'no' ? 'Last ned PDF / Skriv ut' : 'Download PDF / Print';
    printBtn.onclick = () => window.print();

    // Back to Course (Resume)
    const backBtn = document.createElement('button');
    backBtn.className = 'btn btn-secondary';
    backBtn.innerText = state.currentLang === 'no' ? 'Tilbake til kurset' : 'Back to Course';
    backBtn.onclick = () => {
        // Just re-render the current slide
        document.getElementById('btn-menu').style.display = 'inline-block';
        renderSlide();
    };

    // Back to Dashboard
    const menuBtn = document.createElement('button');
    menuBtn.className = 'btn btn-secondary';
    menuBtn.innerText = state.currentLang === 'no' ? 'Tilbake til meny' : 'Back to Menu';
    menuBtn.onclick = () => window.goToDashboard();

    btnContainer.appendChild(printBtn);
    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(menuBtn);

    contentArea.insertBefore(btnContainer, contentArea.firstChild);
}

export function openAdminPanel() {
    showPasswordModal((password) => {
        // Simple password check - ideally should be robust or server-side, but client-side app limitation
        if (password === "Seid2025") {
            showAdminModal();
        } else {
            alert(state.currentLang === 'no' ? "Feil passord." : "Incorrect password.");
        }
    });
}

function showAdminModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.maxWidth = '700px';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '15px';

    const title = document.createElement('h3');
    title.innerText = "Admin Interface";
    title.style.margin = '0';
    title.style.color = '#333';

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => document.body.removeChild(overlay);

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Controls Container
    const controls = document.createElement('div');
    controls.style.marginBottom = '15px';
    controls.style.display = 'flex';
    controls.style.gap = '10px';
    controls.style.alignItems = 'center';

    const label = document.createElement('label');
    label.innerText = "Select Course to Edit/Export:";

    const select = document.createElement('select');
    select.style.padding = '5px';
    select.style.flexGrow = '1';

    // Default option
    const defOpt = document.createElement('option');
    defOpt.value = "";
    defOpt.innerText = "-- New / Paste JSON --";
    select.appendChild(defOpt);

    // Populate with existing courses
    Object.values(courses).forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        const t = typeof c.title === 'object' ? c.title.en : c.title;
        opt.innerText = `${t} (${c.id})`;
        select.appendChild(opt);
    });

    controls.appendChild(label);
    controls.appendChild(select);

    const statusMsg = document.createElement('span');
    statusMsg.innerText = " Valid JSON";
    statusMsg.style.color = 'green';
    statusMsg.style.fontSize = '0.8rem';
    statusMsg.style.marginLeft = '10px';
    statusMsg.style.display = 'none'; // hidden by default until typing/loading
    controls.appendChild(statusMsg);

    const helpText = document.createElement('p');
    helpText.innerText = "Edit course JSON below. 'Save' updates the course (reloads app). 'Copy' puts JSON in clipboard.";
    helpText.style.fontSize = '0.85rem';
    helpText.style.color = '#666';
    helpText.style.marginBottom = '10px';

    const textarea = document.createElement('textarea');
    textarea.placeholder = "Paste JS/JSON object here...";
    textarea.style.width = '100%';
    textarea.style.height = '400px';
    textarea.style.fontFamily = 'monospace';
    textarea.style.fontSize = '0.9rem';
    textarea.style.marginBottom = '20px';
    textarea.style.padding = '10px';
    textarea.style.border = '1px solid #ccc';
    textarea.style.borderRadius = '4px';

    // JSON Validation Logic
    const validateJSON = (showSuccess = true) => {
        const val = textarea.value.trim();
        if (!val) {
            textarea.style.borderColor = '#ccc';
            statusMsg.style.display = 'none';
            return;
        }
        try {
            // Try lenient parsing first (new Function) to match import logic
            const wrapper = new Function("return " + val);
            wrapper();
            // If success
            textarea.style.borderColor = 'green';
            if (showSuccess) {
                statusMsg.innerText = "✓ Valid JS Object";
                statusMsg.style.color = 'green';
                statusMsg.style.display = 'inline';
            }
        } catch (e) {
            textarea.style.borderColor = 'red';
            statusMsg.innerText = "⚠ Invalid Syntax";
            statusMsg.style.color = 'red';
            statusMsg.style.display = 'inline';
        }
    };

    textarea.addEventListener('input', () => validateJSON(true));

    // Auto-fill logic
    select.onchange = () => {
        if (select.value && courses[select.value]) {
            const c = courses[select.value];
            textarea.value = JSON.stringify(c, null, 4);
            validateJSON(false); // Validate but maybe don't shout success immediately
        } else {
            textarea.value = "";
            validateJSON(true);
        }
    };

    const btnContainer = document.createElement('div');
    btnContainer.className = 'modal-buttons';

    const formatBtn = document.createElement('button');
    formatBtn.className = 'btn btn-secondary';
    formatBtn.innerText = "Format";
    formatBtn.onclick = () => {
        if (!textarea.value) return;
        try {
            // We need to parse strictly to stringify strictly, but input might be loose JS
            // So we use our loose parser, then stringify
            const wrapper = new Function("return " + textarea.value);
            const obj = wrapper();
            textarea.value = JSON.stringify(obj, null, 4);
            validateJSON(true);
        } catch (e) {
            alert("Cannot format invalid JSON/JS.");
        }
    };

    const dlBtn = document.createElement('button');
    dlBtn.className = 'btn btn-secondary';
    dlBtn.innerText = "Download JSON";
    dlBtn.onclick = () => {
        if (!textarea.value) return;
        try {
            const wrapper = new Function("return " + textarea.value);
            const obj = wrapper();
            const jsonStr = JSON.stringify(obj, null, 4);
            const blob = new Blob([jsonStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;

            // Generate Sane Filename
            let safeTitle = "course_export";
            if (obj.title) {
                const t = typeof obj.title === 'object' ? (obj.title.en || Object.values(obj.title)[0]) : obj.title;
                safeTitle = t.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            }
            const date = new Date().toISOString().split('T')[0];
            a.download = `${safeTitle}_${date}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            alert("Cannot download invalid JSON.");
        }
    };

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-secondary';
    copyBtn.innerText = "Copy JSON";
    copyBtn.onclick = () => {
        if (!textarea.value) return;
        navigator.clipboard.writeText(textarea.value).then(() => {
            const originalUserText = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            setTimeout(() => copyBtn.innerText = originalUserText, 2000);
        });
    };

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.innerText = "Save / Import";

    const runImport = () => {
        const text = textarea.value;
        if (!text.trim()) return;
        importCourse(text);
        document.body.removeChild(overlay);
    };

    saveBtn.onclick = runImport;

    btnContainer.appendChild(formatBtn);
    btnContainer.appendChild(copyBtn);
    btnContainer.appendChild(dlBtn);
    btnContainer.appendChild(saveBtn);

    content.appendChild(header);
    content.appendChild(controls);
    content.appendChild(helpText);
    content.appendChild(textarea);
    content.appendChild(btnContainer);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    select.focus();
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
            // Always overwrite to allow updates to existing courses
            courses[id] = course;
        }
    } catch (e) {
        console.error("Failed to load imported courses", e);
    }
}
