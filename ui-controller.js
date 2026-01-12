// Trust the Fortune? - UI Controller
// Handles DOM manipulation and rendering

// DOM element references
const elements = {
  trustFill: null,
  trustValue: null,
  roundCounter: null,
  loading: null,
  fortuneContainer: null,
  fortuneText: null,
  responseButtons: null,
  btnYes: null,
  btnNo: null,
  revealContainer: null,
  revealMode: null,
  revealMessage: null,
  scoreChange: null,
  btnRequest: null,
  endContainer: null
};

/**
 * Initialize DOM element references
 */
export function initUI() {
  elements.trustFill = document.getElementById('trustFill');
  elements.trustValue = document.getElementById('trustValue');
  elements.roundCounter = document.getElementById('roundCounter');
  elements.loading = document.getElementById('loading');
  elements.fortuneContainer = document.getElementById('fortuneContainer');
  elements.fortuneText = document.getElementById('fortuneText');
  elements.responseButtons = document.getElementById('responseButtons');
  elements.btnYes = document.getElementById('btnYes');
  elements.btnNo = document.getElementById('btnNo');
  elements.revealContainer = document.getElementById('revealContainer');
  elements.revealMode = document.getElementById('revealMode');
  elements.revealMessage = document.getElementById('revealMessage');
  elements.scoreChange = document.getElementById('scoreChange');
  elements.btnRequest = document.getElementById('btnRequest');
  elements.endContainer = document.getElementById('endContainer');
}

/**
 * Update trust score display
 *
 * @param {number} score - Trust score (0-100)
 */
export function updateTrustDisplay(score) {
  const percentage = Math.round(score);
  elements.trustFill.style.width = percentage + '%';
  elements.trustValue.textContent = percentage + '%';
}

/**
 * Update round counter display
 *
 * @param {number} current - Current round
 * @param {number} max - Maximum rounds
 */
export function updateRoundCounter(current, max) {
  elements.roundCounter.textContent = `รอบที่ ${current}/${max}`;
}

/**
 * Show loading state
 */
export function showLoading() {
  hideAll();
  elements.loading.classList.remove('hidden');
}

/**
 * Render a fortune for the player
 *
 * @param {object} fortune - Fortune object
 */
export function renderFortune(fortune) {
  hideAll();
  elements.fortuneText.textContent = fortune.text;
  elements.fortuneContainer.classList.remove('hidden');
  elements.responseButtons.classList.remove('hidden');
}

/**
 * Render the reveal after player responds
 *
 * @param {object} revealData - Reveal data
 * @param {number} scoreChange - Score change value
 */
export function renderReveal(revealData, scoreChange) {
  hideAll();
  elements.revealMode.textContent = revealData.modeLabel;
  elements.revealMessage.textContent = revealData.message;

  // Update score change display
  elements.scoreChange.textContent = (
    scoreChange > 0 ? `+${scoreChange}%` : `${scoreChange}%`
  );

  // Set score change color
  elements.scoreChange.classList.remove('positive', 'negative', 'neutral');
  if (scoreChange > 0) {
    elements.scoreChange.classList.add('positive');
  } else if (scoreChange < 0) {
    elements.scoreChange.classList.add('negative');
  } else {
    elements.scoreChange.classList.add('neutral');
  }

  elements.revealContainer.classList.remove('hidden');
  elements.btnRequest.classList.remove('hidden');
}

/**
 * Show request button for next round
 */
export function showRequestButton() {
  elements.btnRequest.classList.remove('hidden');
}

/**
 * Show end screen after all rounds complete
 *
 * @param {number} finalScore - Final trust score
 * @param {number} roundsPlayed - Total rounds played
 */
export function showEndScreen(finalScore, roundsPlayed) {
  hideAll();
  elements.endContainer.classList.remove('hidden');

  // Update end screen content
  const finalScoreEl = elements.endContainer.querySelector('.final-score');
  const roundsPlayedEl = elements.endContainer.querySelector('.rounds-played');

  if (finalScoreEl) finalScoreEl.textContent = finalScore + '%';
  if (roundsPlayedEl) roundsPlayedEl.textContent = roundsPlayed;
}

/**
 * Hide all dynamic content elements
 */
function hideAll() {
  elements.loading.classList.add('hidden');
  elements.fortuneContainer.classList.add('hidden');
  elements.responseButtons.classList.add('hidden');
  elements.revealContainer.classList.add('hidden');
  elements.btnRequest.classList.add('hidden');
  elements.endContainer.classList.add('hidden');
}

/**
 * Set up event listeners for interactive elements
 *
 * @param {function} onRequestFortune - Handler for request button
 * @param {function} onYes - Handler for yes button
 * @param {function} onNo - Handler for no button
 */
export function setupEventListeners(onRequestFortune, onYes, onNo) {
  elements.btnRequest.addEventListener('click', onRequestFortune);
  elements.btnYes.addEventListener('click', onYes);
  elements.btnNo.addEventListener('click', onNo);
}
