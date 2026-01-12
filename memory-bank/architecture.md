# Architecture — Trust the Fortune?

## Status

**Updated:** 2025-01-12 — Technical architecture finalized, ready for implementation

---

## System Overview

Single-page browser application running entirely client-side. No backend, no accounts, no build complexity.

**Tech Stack:** Vanilla JavaScript + Vite + localStorage

---

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    index.html (Single Page)                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    CSS Layer                         │    │
│  │  • Minimal centered layout (max-width: 600px)        │    │
│  │  • Mobile-first responsive design                    │    │
│  │  • Thai font support (Google Fonts: Sarabun/Kanit)  │    │
│  │  • Fade animations for state transitions             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              UI Controller (ui-controller.js)        │    │
│  │  • DOM element references                            │    │
│  │  • renderFortune(fortune)                            │    │
│  │  • renderReveal(data)                                │    │
│  │  • updateTrustDisplay(score)                         │    │
│  │  • showRequestButton()                               │    │
│  │  • showResponseButtons()                             │    │
│  └───────────────────────────┬─────────────────────────┘    │
│                              │                              │
│  ┌───────────────────────────┴─────────────────────────┐    │
│  │              Main Controller (app.js)                │    │
│  │  • Initialize app on DOMContentLoaded               │    │
│  │  • Event listeners (request, responses)              │    │
│  │  • Coordinate: State ↔ Engine ↔ UI                   │    │
│  └───────────────────────────┬─────────────────────────┘    │
│                              │                              │
│  ┌───────────────────────────┴─────────────────────────┐    │
│  │              Game State (game-state.js)              │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ State Object:                                │    │    │
│  │  │  • trustScore: number (0-100, default 50)    │    │    │
│  │  │  • responseHistory: array (last 10)          │    │    │
│  │  │  • themeAffinity: object {tag: count}        │    │    │
│  │  │  • totalPlays: number                         │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │  • load() from localStorage                         │    │
│  │  • save() to localStorage                           │    │
│  │  • reset() for testing                              │    │
│  │  • updateTrustScore(fortune, response)              │    │
│  └───────────────────────────┬─────────────────────────┘    │
│                              │                              │
│  ┌───────────────────────────┴─────────────────────────┐    │
│  │            Fortune Engine (fortune-engine.js)        │    │
│  │  • decideMode(state) → 'random' | 'tailored'        │    │
│  │  • generateFortune(state) → fortune object          │    │
│  │  • selectRandom() → random fortune                  │    │
│  │  • selectTailored(state) → matched fortune          │    │
│  │  • getRevealMessage(fortune, response) → string     │    │
│  └───────────────────────────┬─────────────────────────┘    │
│                              │                              │
│  ┌───────────────────────────┴─────────────────────────┐    │
│  │              Fortune Data (fortunes.json)            │    │
│  │  [                                                     │    │
│  │    {                                                 │    │
│  │      "id": "f001",                                  │    │
│  │      "text": "บางครั้งคุณสงสัยตัวเอง...",         │    │
│  │      "tags": ["self-doubt", "introspection"]        │    │
│  │    },                                                │    │
│  │    ... (20-30 fortunes)                              │    │
│  │  ]                                                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         localStorage (Persistence Layer)             │    │
│  │  Key: 'trustFortuneState'                            │    │
│  │  Value: JSON.stringify(state object)                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
mordoo/
├── index.html              # Single page, entry point
├── style.css               # All styling
├── app.js                  # Main controller, event wiring
├── fortune-engine.js       # Fortune generation logic
├── game-state.js           # State management & persistence
├── ui-controller.js        # DOM manipulation & rendering
├── fortunes.json           # Fortune content pool (Thai)
├── package.json            # npm config (vite dev server)
├── dist/                   # Production build (vite output)
└── memory-bank/            # Project documentation
```

---

## Data Structures

### Fortune Object
```javascript
{
  id: "f001",
  text: "บางครั้งคุณสงสัยตัวเองมากกว่าที่คนเขาใจ",
  tags: ["self-doubt", "introspection"],
  mode: "random" | "tailored"  // Added by engine
}
```

### State Object
```javascript
{
  trustScore: 50,           // 0-100, default 50
  responseHistory: [        // Last 10 responses
    { fortuneId, response, mode, timestamp }
  ],
  themeAffinity: {          // Track "yes" patterns
    "self-doubt": 3,
    "ambition": 1,
    "relationships": 0,
    // ...
  },
  totalPlays: 0             // Total rounds played
}
```

### Response Type
```javascript
const RESPONSE = {
  YES: "yes",     // ใช่เราเลย
  NO: "no"        // ไม่ใช่เรา
}
```

---

## Complete Data Flow

### 1. Application Initialization
```
DOMContentLoaded
  → game-state.load()
  → ui-controller.updateTrustDisplay(state.trustScore)
  → ui-controller.showRequestButton()
```

### 2. Player Requests Fortune
```
Click "ดูดวง" button
  → fortune-engine.generateFortune(state)
  → fortune-engine.decideMode(state)
      → First 3 plays: always random
      → After 3 plays: 40% random, 60% tailored
  → Select fortune (random or tailored)
  → ui-controller.renderFortune(fortune)
  → ui-controller.showResponseButtons()
```

### 3. Player Responds
```
Click "ใช่เราเลย" or "ไม่ใช่เรา"
  → game-state.updateTrustScore(fortune, response)
  → game-state.updateThemeAffinity(fortune, response)
  → game-state.save()
  → fortune-engine.getRevealMessage(fortune, response)
  → ui-controller.renderReveal({
      mode: fortune.mode,
      message: revealMessage,
      scoreChange: delta
    })
  → ui-controller.showRequestButton()
```

### 4. Persistence
```
After every response:
  → game-state.save()
  → localStorage.setItem('trustFortuneState', JSON.stringify(state))

On page load:
  → localStorage.getItem('trustFortuneState')
  → JSON.parse() or initialize defaults
```

---

## Core Mechanics

### Fortune Mode Decision
```javascript
function decideMode(state) {
  if (state.totalPlays < 3) {
    return 'random';  // Build baseline first
  }
  return Math.random() < 0.4 ? 'random' : 'tailored';
}
```

### Trust Score Calculation
```javascript
function updateTrustScore(fortune, response, currentScore) {
  const isTailored = fortune.mode === 'tailored';
  const isYes = response === 'yes';

  if (isTailored && isYes) return clamp(currentScore + 10);
  if (isTailored && !isYes) return clamp(currentScore - 5);
  if (!isTailored && isYes) return clamp(currentScore - 5);
  if (!isTailored && !isYes) return clamp(currentScore + 2);

  function clamp(score) {
    return Math.max(0, Math.min(100, score));
  }
}
```

### Tailored Fortune Selection
```javascript
function selectTailored(state) {
  // Get themes player says "yes" to most often
  const topThemes = Object.entries(state.themeAffinity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([theme]) => theme);

  // Find fortunes matching top themes
  const matching = fortunes.filter(f =>
    f.tags.some(tag => topThemes.includes(tag))
  );

  // Random from matches (or fallback to random)
  return matching.length > 0
    ? matching[Math.floor(Math.random() * matching.length)]
    : selectRandom();
}
```

---

## Reveal Messages (Thai)

| Scenario | Message |
|----------|---------|
| Tailored + Yes | "ระบบกำลังเรียนรู้คุณ" |
| Tailored + No | "แม้แต่ระบบก็ยังไม่รู้จักคุณหมด" |
| Random + Yes | "คุณอยากเชื่อว่านี่ใช่" |
| Random + No | "คุณไม่หลงกลง่ายๆ" |

---

## Key Design Decisions (Finalized)

| Decision | Choice | Why |
|----------|--------|-----|
| **Backend** | None | Maximum simplicity, no hosting complexity |
| **State Management** | Single global object | Small scale, no need for complex store |
| **Persistence** | localStorage | No accounts, works across sessions, private |
| **Routing** | State-based visibility | No pages, just show/hide elements |
| **Styling** | Plain CSS | Framework overhead not justified for minimal UI |
| **Fonts** | Google Fonts (Sarabun) | Excellent Thai language support, CDN |
| **Build Tool** | Vite | Fast dev server, optimized production build |
| **Module System** | ES modules | Modern JS, native browser support |
| **Fortune Format** | JSON file | Easy to edit, can be loaded dynamically |

---

## UI State Machine

```
┌─────────────┐
│   INITIAL   │  Show request button, trust score
└──────┬──────┘
       │
       │ [Click "ดูดวง"]
       ▼
┌─────────────┐
│   LOADING   │  Brief fake delay (500ms)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  FORTUNE    │  Show fortune, response buttons
└──────┬──────┘
       │
       │ [Click "ใช่เราเลย" or "ไม่ใช่เรา"]
       ▼
┌─────────────┐
│   REVEAL    │  Show mode, message, score change
└──────┬──────┘
       │
       │ [Auto-transition or click]
       ▼
┌─────────────┐
│   INITIAL   │  Back to start, loop repeats
└─────────────┘
```

---

## Performance Considerations

- **Bundle size:** <50KB (no dependencies, minimal assets)
- **Load time:** <2 seconds on 3G (single HTML, one font)
- **Runtime:** No heavy computation, all operations are O(n) or O(1)
- **Storage:** localStorage limit is 5MB, we use <1KB
- **Network:** Only initial load, no API calls

---

## Security & Privacy

- **No data collection:** All data stays in browser
- **No tracking:** No analytics, no cookies
- **LocalStorage only:** Data never leaves user's device
- **Clearable:** User can clear data via browser settings
- **No authentication:** No accounts, no passwords

---

## Testing Strategy

### Unit-Level (Manual)
- Fortune generation (test mode distribution)
- Trust score calculation (test all 4 scenarios)
- State persistence (reload verification)
- Theme affinity tracking

### Integration-Level
- Complete game loop (10+ rounds)
- State transitions (all UI states)
- Edge cases (first play, reset, extreme scores)

### Browser Testing
- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS + iOS)
- Mobile Chrome (Android)

### Success Criteria
- Loop completes in under 60 seconds
- No console errors
- State persists across reloads
- Thai text renders correctly
- Trust score behaves as expected

---

## Future Considerations (Post-MVP)

**Do NOT implement in MVP:**

- Multiple fortune categories or themes player can select
- Birthday input for zodiac-based fortunes (adds complexity)
- Share buttons (let sharing be organic)
- Undo/redo responses (breaks the "live with your choice" tension)
- Multiple languages (keep Thai-focused for authenticity)
- Admin panel or content CMS (edit JSON directly)
- Analytics or dashboards (violates privacy principle)

**If game resonates:**

- More fortunes (scale content, not features)
- Subtle visual variety (keep core loop intact)
- Seasonal or event-based fortunes (same mechanism)
- A/B testing reveal messages (optimize for impact)

**Always protect:**

- The core feeling of "amused suspicion"
- The simplicity of the loop
- The honesty about being dishonest
- The playful, non-smug tone
