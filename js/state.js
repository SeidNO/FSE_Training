export const state = {
    currentCourseId: null, // Null means dashboard
    currentLang: 'no',
    userName: "",
    courseProgress: {}, // { "fse": 5, "first_aid": 0 }
    completedRevisions: {}, // { "fse": "2025-01-01" }
    completionDates: {} // { "fse": "2025-12-01T10:00:00.000Z" } - ISO Date strings
};

export function saveState() {
    const data = {
        courseId: state.currentCourseId,
        lang: state.currentLang,
        name: state.userName,
        progress: state.courseProgress,
        revisions: state.completedRevisions,
        dates: state.completionDates
    };
    localStorage.setItem('fse_training_state_v2', JSON.stringify(data));
}

export function loadState() {
    const saved = localStorage.getItem('fse_training_state_v2');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.courseId) state.currentCourseId = data.courseId;
            if (data.lang) state.currentLang = data.lang;
            if (data.name) state.userName = data.name;
            if (data.progress) state.courseProgress = data.progress;
            if (data.revisions) state.completedRevisions = data.revisions;
            if (data.dates) state.completionDates = data.dates;
        } catch (e) {
            console.error("Could not load saved state", e);
        }
    } else {
        // Migration attempt from v1
        const oldSaved = localStorage.getItem('fse_training_state');
        if (oldSaved) {
            try {
                const oldData = JSON.parse(oldSaved);
                if (oldData.name) state.userName = oldData.name;
                if (oldData.lang) state.currentLang = oldData.lang;
                if (oldData.slide !== undefined) {
                    state.courseProgress['fse'] = oldData.slide; // Migrate old progress to FSE
                }
            } catch (e) { }
        }
    }
}

export function resetState() {
    localStorage.removeItem('fse_training_state_v2');
    localStorage.removeItem('fse_training_state');
    location.reload();
}

// Check for revision updates and reset progress if needed
export function checkRevisions(courses) {
    if (!courses) return;
    Object.values(courses).forEach(c => {
        // If we have a stored revision for this course
        if (state.completedRevisions[c.id]) {
            const storedRev = state.completedRevisions[c.id];
            // And it differs from the current course revision
            if (storedRev !== c.revision) {
                // Reset progress
                state.courseProgress[c.id] = 0;
            }
        }
    });
    saveState();
}

export function checkExpirations(courses) {
    const expiredList = [];
    const now = new Date();
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;

    Object.values(courses).forEach(c => {
        const dateStr = state.completionDates[c.id];
        if (dateStr) {
            const date = new Date(dateStr);
            const diff = now - date; // Diff in ms
            // Check if older than 12 months (approx 365 days)
            if (diff > oneYearMs) {
                // Expired
                state.courseProgress[c.id] = 0;
                // Remove the completion date and revision so it looks like a fresh start? 
                // Alternatively, just reset progress. 
                // If we don't clear the completion date, it will "expire" again next time we check. 
                // That's actually fine, it enforces the reset.
                // However, we probably want to render "Expired" in UI or something?
                // For now, let's keep the date but return it in the list for the UI to warn.
                expiredList.push({
                    id: c.id,
                    title: c.title,
                    date: dateStr
                });
            }
        }
    });

    if (expiredList.length > 0) {
        saveState();
    }

    return expiredList;
}

// Mark a course revision as complete
export function completeCourseRevision(courseId, revisionId) {
    state.completedRevisions[courseId] = revisionId;
    state.completionDates[courseId] = new Date().toISOString();
    saveState();
}

// Helper to get current slide safely
export function getCurrentSlideIndex() {
    if (!state.currentCourseId) return 0;
    return state.courseProgress[state.currentCourseId] || 0;
}

// Helper to set current slide safely
export function setCurrentSlideIndex(index) {
    if (!state.currentCourseId) return;
    state.courseProgress[state.currentCourseId] = index;
    saveState();
}
