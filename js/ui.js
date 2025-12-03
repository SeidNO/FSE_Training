import { content } from '../data/content.js';
import { state, saveState, resetState } from './state.js';

export function init() {
    // Bind global functions for HTML onclick attributes
    window.setLang = setLang;
    window.changeSlide = changeSlide;
    window.updateName = updateName;
    window.resetCourse = resetState;

    // Ensure the initial render happens based on loaded state
    // We need to set the active buttons correctly first if state was loaded
    if (state.currentLang !== 'no') {
        // If loaded language is not default, update UI buttons without re-rendering yet
        document.getElementById('btn-no').classList.remove('active');
        document.getElementById('btn-no').setAttribute('aria-pressed', 'false');
        document.getElementById(`btn-${state.currentLang}`).classList.add('active');
        document.getElementById(`btn-${state.currentLang}`).setAttribute('aria-pressed', 'true');
    }

    renderSlide();
}

export function setLang(lang, render = true) {
    state.currentLang = lang;
    document.getElementById('btn-no').classList.remove('active');
    document.getElementById('btn-no').setAttribute('aria-pressed', 'false');

    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-en').setAttribute('aria-pressed', 'false');

    document.getElementById(`btn-${lang}`).classList.add('active');
    document.getElementById(`btn-${lang}`).setAttribute('aria-pressed', 'true');

    // Preserve name input if exists
    const nameInput = document.getElementById('inputName');
    if (nameInput) state.userName = nameInput.value;

    saveState();

    if (render) renderSlide();
}

export function updateName(val) {
    state.userName = val;
    saveState();
}

export function changeSlide(direction) {
    // Validation: Name required on slide 0
    if (state.currentSlide === 0 && direction === 1 && state.userName.trim().length < 2) {
        alert(state.currentLang === 'no' ? "Vennligst skriv inn navnet ditt." : "Please enter your name.");
        return;
    }

    // Validation: Quiz must be passed
    const slideData = content[state.currentLang][state.currentSlide];
    if (slideData.type === 'quiz' && direction === 1) {
        if (!validateQuiz()) return;
    }

    const newIndex = state.currentSlide + direction;
    if (newIndex >= 0 && newIndex < content[state.currentLang].length) {
        state.currentSlide = newIndex;
        saveState();
        renderSlide();
    }
}

function renderSlide() {
    const data = content[state.currentLang][state.currentSlide];
    const contentDiv = document.getElementById('contentArea');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progress = document.getElementById('progressBar');
    const pageInd = document.getElementById('pageIndicator');

    // Update Progress
    const percent = ((state.currentSlide) / (content[state.currentLang].length - 1)) * 100;
    progress.style.width = percent + "%";
    document.querySelector('.progress-container').setAttribute('aria-valuenow', Math.round(percent));
    pageInd.innerText = `${state.currentSlide + 1} / ${content[state.currentLang].length}`;

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
        contentDiv.innerHTML = data.html;
        // Restore name if back on slide 0
        if (state.currentSlide === 0 && state.userName) {
            const input = document.getElementById('inputName');
            if (input) input.value = state.userName;
        }
        nextBtn.innerText = state.currentLang === 'no' ? "Neste" : "Next";
        nextBtn.style.display = 'inline-block';
        prevBtn.style.display = 'inline-block';
        pageInd.style.display = 'inline-block';
    }

    // Disable Prev on start
    prevBtn.disabled = state.currentSlide === 0;
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

function validateQuiz() {
    const data = content[state.currentLang][state.currentSlide];
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
    const date = new Date().toLocaleDateString(state.currentLang === 'no' ? 'no-NO' : 'en-GB');

    // Safe way to handle user name to prevent XSS
    const safeName = document.createElement('div');
    safeName.textContent = state.userName;
    const safeNameStr = safeName.innerHTML;

    const html = `
    <div id="certificate-view">
        <div class="cert-logo">SEID<span>.</span> | ACADEMY</div>
        <div class="cert-title">CERTIFICATE</div>
        <p>${state.currentLang === 'no' ? 'Det bekreftes herved at' : 'This certifies that'}</p>
        <div class="cert-name">${safeNameStr}</div>
        <p>${state.currentLang === 'no' ? 'har fullført og bestått teoretisk' : 'has completed and passed theoretical'}</p>
        <h2>FSE Low Voltage & Safety Course</h2>
        <div class="cert-details">
            <p><strong>Modules Covered:</strong> Roles, Risk Assessment (SJA), Arc Flash/Shock Physics,<br>Work Methods (FSE §14-16) & Acute First Aid Theory.</p>
            <p><strong>Scope:</strong> Seid AS International Operations & SMPS/DC-Link Safety.</p>
            <p><em>Date: ${date} - Valid for 12 months</em></p>
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
            <button onclick="window.resetCourse()" class="btn btn-secondary" style="margin-left: 10px;">
                 ${state.currentLang === 'no' ? 'Start på nytt' : 'Restart'}
            </button>
        </div>
    </div>
`;
    document.getElementById('contentArea').innerHTML = html;
    document.querySelector('.progress-container').style.display = 'none';
}
