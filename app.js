// Trust the Fortune? - Main Controller
// Wires together all game systems

import {
  loadState,
  saveState,
  resetState,
  recordResponse
} from './game-state.js';
import {
  generateFortune,
  getRevealMessage
} from './fortune-engine.js';
import {
  initUI,
  updateTrustDisplay,
  updateRoundCounter,
  showLoading,
  renderFortune,
  renderReveal,
  showRequestButton,
  showEndScreen,
  setupEventListeners
} from './ui-controller.js';

// Current game state
let state;
let currentFortune = null;
const MAX_ROUNDS = 5;
let currentRound = 1;

/**
 * Handle request for new fortune
 */
function handleRequestFortune() {
  // Check if game is over
  if (currentRound > MAX_ROUNDS) {
    return;
  }

  showLoading();

  // Brief fake delay for "reading your fortune..."
  setTimeout(() => {
    currentFortune = generateFortune(state);
    renderFortune(currentFortune);
    updateRoundCounter(currentRound, MAX_ROUNDS);
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

  // Increment round
  currentRound++;

  // Check if game is over
  if (currentRound > MAX_ROUNDS) {
    // Show end screen instead of request button
    setTimeout(() => {
      showEndScreen(state.trustScore, MAX_ROUNDS);
    }, 3000);
  }
}

/**
 * Initialize the game
 */
function init() {
  // Initialize UI
  initUI();

  // Load or create game state
  state = loadState();

  // Check if player has already completed 5 rounds
  if (state.totalPlays >= MAX_ROUNDS) {
    // Reset for new game
    state = resetState();
    saveState(state);
    currentRound = 1;
  } else {
    // Continue from where they left off
    currentRound = state.totalPlays + 1;
  }

  // Display current trust score
  updateTrustDisplay(state.trustScore);

  // Update round counter
  updateRoundCounter(currentRound, MAX_ROUNDS);

  // Set up event listeners
  setupEventListeners(
    handleRequestFortune,
    () => handleResponse('yes'),
    () => handleResponse('no')
  );

  console.log('🔮 Trust the Fortune? initialized');
  console.log('💾 Trust score:', state.trustScore + '%');
  console.log('🎮 Starting round:', currentRound + '/' + MAX_ROUNDS);
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
