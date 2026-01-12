// Trust the Fortune? - Game State Management
// Handles state persistence and trust score calculation

const STORAGE_KEY = 'trustFortuneState';

// Default state for new players
const defaultState = {
  trustScore: 50,
  responseHistory: [],
  themeAffinity: {},
  totalPlays: 0
};

/**
 * Load state from localStorage or return defaults
 */
export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultState, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.warn('Failed to load state:', error);
  }
  return { ...defaultState };
}

/**
 * Save state to localStorage
 */
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save state:', error);
  }
}

/**
 * Reset state to defaults (for testing)
 */
export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultState };
}

/**
 * Calculate trust score change based on fortune mode and player response
 *
 * Scoring rules:
 * - Tailored + Yes: +10% (system was right)
 * - Tailored + No: -5% (system was wrong)
 * - Random + Yes: -5% (player sees patterns in randomness)
 * - Random + No: +2% (player correctly doubts)
 *
 * @param {string} mode - 'random' or 'tailored'
 * @param {string} response - 'yes' or 'no'
 * @param {number} currentScore - Current trust score (0-100)
 * @returns {number} New trust score (0-100)
 */
export function calculateTrustChange(mode, response, currentScore) {
  const isTailored = mode === 'tailored';
  const isYes = response === 'yes';

  let change;
  if (isTailored && isYes) {
    change = 10;
  } else if (isTailored && !isYes) {
    change = -5;
  } else if (!isTailored && isYes) {
    change = -5;
  } else {
    change = 2;
  }

  // Clamp to 0-100 range
  const newScore = currentScore + change;
  return Math.max(0, Math.min(100, newScore));
}

/**
 * Update theme affinity based on player response
 * Only tracks "yes" responses to build profile
 *
 * @param {object} state - Current state
 * @param {object} fortune - Fortune object with tags
 * @param {string} response - 'yes' or 'no'
 * @returns {object} Updated theme affinity
 */
export function updateThemeAffinity(state, fortune, response) {
  const newAffinity = { ...state.themeAffinity };

  if (response === 'yes' && fortune.tags) {
    fortune.tags.forEach(tag => {
      newAffinity[tag] = (newAffinity[tag] || 0) + 1;
    });
  }

  return newAffinity;
}

/**
 * Record a response and update state
 *
 * @param {object} state - Current state
 * @param {object} fortune - Fortune that was shown
 * @param {string} response - 'yes' or 'no'
 * @returns {object} Updated state
 */
export function recordResponse(state, fortune, response) {
  const newTrustScore = calculateTrustChange(
    fortune.mode,
    response,
    state.trustScore
  );

  const newThemeAffinity = updateThemeAffinity(state, fortune, response);

  const responseRecord = {
    fortuneId: fortune.id,
    response,
    mode: fortune.mode,
    timestamp: Date.now()
  };

  // Keep only last 10 responses
  const newHistory = [
    responseRecord,
    ...state.responseHistory
  ].slice(0, 10);

  return {
    ...state,
    trustScore: newTrustScore,
    responseHistory: newHistory,
    themeAffinity: newThemeAffinity,
    totalPlays: state.totalPlays + 1
  };
}
