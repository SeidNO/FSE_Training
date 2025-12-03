import { loadState } from './state.js';
import { init } from './ui.js';

// Load saved state before initializing UI
loadState();
init();
