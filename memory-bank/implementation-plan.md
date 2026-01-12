# Implementation Plan — Trust the Fortune?

## Status

**Updated:** 2025-01-12 — Detailed technical plan complete, ready for implementation

---

## Development Phases

### Phase 0: Foundation (1-2 hours)
- Initialize project with Vite + vanilla JavaScript
- Create file structure (index.html, style.css, app.js, etc.)
- Build HTML skeleton with Thai fonts
- Implement basic centered, responsive CSS layout
- Set up dev server and verify "Hello World" runs

### Phase 1: Core Mechanics (2-3 hours)
- Create fortunes.json with 20-30 Thai fortunes (each with tags)
- Implement game-state.js (load, save, trust calculation)
- Implement fortune-engine.js (random/tailored selection)
- Build trust score algorithm (4 scenarios, 0-100 range)
- Test fortune generation and state persistence

### Phase 2: UI Integration (2-3 hours)
- Implement ui-controller.js (render functions)
- Wire app.js main controller (event listeners, game loop)
- Build reveal system (show mode, message, score change)
- Test complete playable loop end-to-end

### Phase 3: Polish & Content (2-3 hours)
- Refine fortune content (20-30 high-quality Thai fortunes)
- Visual polish (typography, animations, mobile testing)
- Add micro-interactions (loading states, transitions)
- Tone check (verify Thai text, playful not smug)

### Phase 4: Testing & Launch (1-2 hours)
- Playtesting (20+ rounds yourself, 1-2 friends)
- Bug fixes and edge case testing
- Production build (vite build)
- Deploy and test live URL

---

## Step-by-Step Build Plan

### Phase 0: Foundation

**Step 0.1: Project Initialization**
- [ ] `npm init -y`
- [ ] `npm install -D vite`
- [ ] Create file structure:
  - index.html
  - style.css
  - app.js
  - fortune-engine.js
  - game-state.js
  - ui-controller.js
  - fortunes.json
- [ ] Add dev script to package.json: `"dev": "vite"`
- [ ] Run `npm run dev` and verify localhost loads

**Step 0.2: HTML Structure**
- [ ] Add Google Fonts (Sarabun or Kanit for Thai)
- [ ] Create DOM elements:
  - Fortune display container
  - Response buttons (ใช่เราเลย / ไม่ใช่เรา)
  - Trust score display
  - Reveal message area
  - "ดูดวง" (Get Fortune) button
  - Loading state container
- [ ] Set semantic HTML structure

**Step 0.3: Basic Styling**
- [ ] Centered layout (max-width 600px)
- [ ] Mobile-first responsive
- [ ] Thai font styling (size, line-height)
- [ ] Button styles (primary, secondary, hover states)
- [ ] Utility classes for hidden/visible states
- [ ] Color scheme (minimal, high contrast)

**Acceptance:** Blank app loads in browser with Thai fonts, centered layout, UI elements visible

---

### Phase 1: Core Mechanics

**Step 1.1: Fortune Data Structure**
- [ ] Create fortunes.json with structure:
  ```json
  {
    "id": "f001",
    "text": "บางครั้งคุณสงสัยตัวเอง...",
    "tags": ["self-doubt", "introspection"]
  }
  ```
- [ ] Write 20-30 fortunes in Thai
- [ ] Tag categories: self-doubt, ambition, relationships, introspection, social
- [ ] Ensure each fortune is: relatable, mysterious, Barnum-style

**Step 1.2: Game State System**
- [ ] Implement state object:
  ```js
  {
    trustScore: 50,
    responseHistory: [],
    themeAffinity: {},
    totalPlays: 0
  }
  ```
- [ ] Implement load() from localStorage
- [ ] Implement save() to localStorage
- [ ] Implement reset() for testing
- [ ] Test persistence (reload, verify data)

**Step 1.3: Fortune Generation**
- [ ] Implement decideMode(state):
  - First 3 plays: always random
  - After 3 plays: 40% random, 60% tailored
- [ ] Implement selectRandom() from pool
- [ ] Implement selectTailored(state) based on themeAffinity
- [ ] Implement generateFortune(state) → returns { id, text, tags, mode }

**Step 1.4: Trust Score Calculation**
- [ ] Implement updateTrustScore(fortune, response):
  - Tailored + Yes: +10%
  - Tailored + No: -5%
  - Random + Yes: -5%
  - Random + No: +2%
- [ ] Clamp to 0-100 range
- [ ] Update themeAffinity based on response

**Acceptance:** Fortune generation works, trust scores calculate, state persists

---

### Phase 2: UI Integration

**Step 2.1: UI Controller**
- [ ] Create DOM element references
- [ ] Implement renderFortune(fortune)
  - Show fortune text with fade-in
  - Hide request button
  - Show response buttons
- [ ] Implement showResponseButtons()
- [ ] Implement renderReveal(data)
  - Show mode (RANDOM/BASED ON ANSWERS)
  - Show reveal message
  - Show trust score change
- [ ] Implement updateTrustDisplay(score)
- [ ] Implement showRequestButton()

**Step 2.2: Game Loop Wiring**
- [ ] Initialize app on DOMContentLoaded
- [ ] Set up event listeners:
  - Request button → generateFortune() → renderFortune()
  - Response buttons → recordResponse() → renderReveal() → showRequestButton()
- [ ] Test complete loop 5 times

**Step 2.3: Reveal System**
- [ ] Implement getRevealMessage(fortune, response) with 4 combinations:
  - Tailored + Yes: "ระบบกำลังเรียนรู้คุณ"
  - Random + Yes: "คุณอยากเชื่อว่านี่ใช่"
  - Tailored + No: "แม้แต่ระบบก็ยังไม่รู้จักคุณหมด"
  - Random + No: "คุณไม่หลงกลง่ายๆ"
- [ ] Display reveal with fortune mode and score change

**Acceptance:** Complete playable loop, all states transition correctly

---

### Phase 3: Polish & Content

**Step 3.1: Fortune Content**
- [ ] Write 20-30 high-quality Thai fortunes
- [ ] Each fortune tagged appropriately
- [ ] Remove weak entries
- [ ] Test readability and emotional impact
- [ ] Verify distribution across 5 categories

**Step 3.2: Visual Polish**
- [ ] Refine typography (Thai font, size, spacing)
- [ ] Add CSS animations (fade in/out, 200-300ms)
- [ ] Button hover/active states
- [ ] Trust score visual (progress bar or simple indicator)
- [ ] Test on mobile (320px to 600px)

**Step 3.3: Micro-Interactions**
- [ ] Fake loading delay (500ms "reading your fortune...")
- [ ] Button press feedback
- [ ] Smooth state transitions
- [ ] Ensure loop completes in under 60 seconds

**Step 3.4: Copy & Tone Check**
- [ ] Verify all Thai text is natural
- [ ] Check reveal messages (playful, not smug)
- [ ] Remove any tutorial/explanation text
- [ ] Test with fresh user (no explanation)

**Acceptance:** Game feels polished, plays smoothly, tone is correct

---

### Phase 4: Testing & Launch

**Step 4.1: Playtesting**
- [ ] Play 20+ rounds
- [ ] Test with 1-2 friends (observe, don't explain)
- [ ] Note confusion points
- [ ] Verify trust score behavior
- [ ] Check reveal impact

**Step 4.2: Bug Fixes**
- [ ] Fix discovered issues
- [ ] Edge case testing (first play, reset, extreme scores)
- [ ] Cross-browser (Chrome, Firefox, Safari)
- [ ] Mobile (iOS Safari, Android Chrome)

**Step 4.3: Production Build**
- [ ] Run `vite build`
- [ ] Test production build locally
- [ ] Verify localStorage works
- [ ] Check bundle size (should be <50KB)

**Step 4.4: Deployment**
- [ ] Choose host (Netlify/Vercel/GitHub Pages)
- [ ] Deploy build
- [ ] Test live URL
- [ ] Share with friends

**Acceptance:** Game live, playable, getting real reactions

---

## Tech Stack (Final Decision)

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | Vanilla JavaScript | Fastest MVP, zero overhead |
| Build Tool | Vite | Dev server + optimized build |
| Styling | Plain CSS | Simple, sufficient for minimal UI |
| Persistence | localStorage | No backend, works across sessions |
| Fonts | Google Fonts (Sarabun/Kanit) | Excellent Thai support |
| Deployment | Static hosting | Netlify/Vercel/GitHub Pages |

---

## File Structure

```
mordoo/
├── index.html              # Single page app
├── style.css               # All styling
├── app.js                  # Main controller
├── fortune-engine.js       # Fortune generation
├── game-state.js           # State & persistence
├── ui-controller.js        # DOM manipulation
├── fortunes.json           # Fortune content (Thai)
├── package.json            # npm config
└── memory-bank/            # Project documentation
```

---

## Notes

- **No code in this document** — Actions and checkpoints only
- Flexible plan: priorities may shift based on what matters for core feeling
- Each phase ends with playable state
- Estimated total time: 8-12 hours for complete MVP
