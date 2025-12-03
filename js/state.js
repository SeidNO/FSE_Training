export const state = {
    currentSlide: 0,
    currentLang: 'no',
    userName: ""
};

export function saveState() {
    const data = {
        slide: state.currentSlide,
        lang: state.currentLang,
        name: state.userName
    };
    localStorage.setItem('fse_training_state', JSON.stringify(data));
}

export function loadState() {
    const saved = localStorage.getItem('fse_training_state');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.slide !== undefined) state.currentSlide = data.slide;
            if (data.lang) state.currentLang = data.lang;
            if (data.name) state.userName = data.name;
        } catch (e) {
            console.error("Could not load saved state", e);
        }
    }
}

export function resetState() {
    localStorage.removeItem('fse_training_state');
    location.reload();
}
