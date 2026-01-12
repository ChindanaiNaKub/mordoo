// Trust the Fortune? - Main Controller
// Wires together all game systems

import {
  loadState,
  saveState,
  recordResponse
} from './game-state.js';
import {
  generateFortune,
  getRevealMessage
} from './fortune-engine.js';
import {
  initUI,
  updateTrustDisplay,
  showLoading,
  renderFortune,
  renderReveal,
  showRequestButton,
  setupEventListeners
} from './ui-controller.js';

// Current game state
let state;
let currentFortune = null;

/**
 * Handle request for new fortune
 */
function handleRequestFortune() {
  showLoading();

  // Brief fake delay for "reading your fortune..."
  setTimeout(() => {
    currentFortune = generateFortune(state);
    renderFortune(currentFortune);
  }, 500);
}

/**
 * Handle player response to fortune
 *
 * @param {string} response - 'yes' or 'no'
 */
function handleResponse(response) {
  // Calculate score change before updating state
  const oldScore = state.trustScore;
  const newState = recordResponse(state, currentFortune, response);
  const scoreChange = newState.trustScore - oldScore;

  // Update state
  state = newState;
  saveState(state);

  // Get reveal message and display
  const revealData = getRevealMessage(currentFortune, response);
  renderReveal(revealData, scoreChange);

  // Update trust display
  updateTrustDisplay(state.trustScore);
}

/**
 * Initialize the game
 */
function init() {
  // Initialize UI
  initUI();

  // Load or create game state
  state = loadState();

  // Display current trust score
  updateTrustDisplay(state.trustScore);

  // Set up event listeners
  setupEventListeners(
    handleRequestFortune,
    () => handleResponse('yes'),
    () => handleResponse('no')
  );

  console.log('🔮 Trust the Fortune? initialized');
  console.log('💾 Trust score:', state.trustScore + '%');
  console.log('🎮 Games played:', state.totalPlays);
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
