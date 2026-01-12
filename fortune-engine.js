// Trust the Fortune? - Fortune Generation Engine
// Handles random/tailored fortune selection and reveal messages

import fortunes from './fortunes.json' with { type: 'json' };

/**
 * Decide whether to use random or tailored fortune
 *
 * Rules:
 * - First 3 plays: Always random (build baseline)
 * - After 3 plays: 40% random, 60% tailored
 *
 * @param {object} state - Current game state
 * @returns {string} 'random' or 'tailored'
 */
export function decideMode(state) {
  if (state.totalPlays < 3) {
    return 'random';
  }
  return Math.random() < 0.4 ? 'random' : 'tailored';
}

/**
 * Select a completely random fortune
 *
 * @returns {object} Fortune object (without mode)
 */
export function selectRandom() {
  const index = Math.floor(Math.random() * fortunes.length);
  return { ...fortunes[index] };
}

/**
 * Select a fortune tailored to player's patterns
 * Matches themes player says "yes" to most often
 *
 * @param {object} state - Current game state
 * @returns {object} Fortune object (without mode)
 */
export function selectTailored(state) {
  // Get top 2 themes player says "yes" to
  const themeEntries = Object.entries(state.themeAffinity);
  const hasAffinity = themeEntries.length > 0 && themeEntries.some(([_, count]) => count > 0);

  if (!hasAffinity) {
    // No affinity data yet, fall back to random
    return selectRandom();
  }

  // Sort by count and get top 2 themes
  const topThemes = themeEntries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([theme]) => theme);

  // Find fortunes matching top themes
  const matching = fortunes.filter(f =>
    f.tags && f.tags.some(tag => topThemes.includes(tag))
  );

  if (matching.length === 0) {
    // No matches, fall back to random
    return selectRandom();
  }

  // Random from matching fortunes
  const index = Math.floor(Math.random() * matching.length);
  return { ...matching[index] };
}

/**
 * Generate a fortune for the player
 *
 * @param {object} state - Current game state
 * @returns {object} Fortune object with mode added
 */
export function generateFortune(state) {
  const mode = decideMode(state);
  let fortune;

  if (mode === 'random') {
    fortune = selectRandom();
  } else {
    fortune = selectTailored(state);
  }

  // Add mode to fortune object
  return {
    ...fortune,
    mode
  };
}

/**
 * Get reveal message based on fortune mode and player response
 *
 * @param {object} fortune - Fortune object with mode
 * @param {string} response - 'yes' or 'no'
 * @returns {object} Reveal data with mode label and message
 */
export function getRevealMessage(fortune, response) {
  const isTailored = fortune.mode === 'tailored';
  const isYes = response === 'yes';

  let modeLabel;
  let message;

  if (isTailored && isYes) {
    modeLabel = 'BASED ON YOUR ANSWERS';
    message = 'ระบบกำลังเรียนรู้คุณ';
  } else if (isTailored && !isYes) {
    modeLabel = 'BASED ON YOUR ANSWERS';
    message = 'แม้แต่ระบบก็ยังไม่รู้จักคุณหมด';
  } else if (!isTailored && isYes) {
    modeLabel = 'RANDOM';
    message = 'คุณอยากเชื่อว่านี่ใช่';
  } else {
    modeLabel = 'RANDOM';
    message = 'คุณไม่หลงกลง่ายๆ';
  }

  return {
    modeLabel,
    message,
    mode: fortune.mode
  };
}
