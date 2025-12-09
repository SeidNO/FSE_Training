export const state = {
    currentCourseId: null, // Null means dashboard
    currentLang: 'no',
    userName: "",
    courseProgress: {} // { "fse": 5, "first_aid": 0 }
};

export function saveState() {
    const data = {
        courseId: state.currentCourseId,
        lang: state.currentLang,
        name: state.userName,
        progress: state.courseProgress
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
