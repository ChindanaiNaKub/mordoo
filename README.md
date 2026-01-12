# Trust the Fortune? (ดูดวง)

A browser-based fortune-telling game that creates "amused suspicion" — players laugh, feel exposed, then question themselves.

**Live Demo:** https://chindanainaKub.github.io/mordoo/

## What is this?

"Trust the Fortune?" presents as a mystical fortune-telling toy, but it's actually a mirror for self-belief patterns. The system confidently lies; you decide what to believe.

### The Core Loop

1. **Request** — Click "ดูดวง" to get a fortune
2. **Present** — System displays a fortune (random or tailored to your patterns)
3. **Respond** — Answer "ใช่เราเลย" (That's me) or "ไม่ใช่เรา" (Not me)
4. **Reveal** — System shows whether it was random or based on your answers
5. **Adjust** — Trust score updates based on pattern accuracy
6. **Repeat** — Play 5 rounds total

After 5 rounds, you'll see your final trust score and a reflection question:
> "คุณเชื่อสิ่งที่อยากเชื่อ ใช่ไหม?" (Do you believe what you want to believe?)

## How It Works

### Fortune Generation

- **First 3 rounds:** Always random (builds baseline)
- **After 3 rounds:** 40% random, 60% tailored to your response patterns
- Tailored fortunes match themes you've affirmed before (self-doubt, ambition, relationships, etc.)

### Trust Score

The trust score measures how well the system "knows" you, not your gullibility:

| Fortune Type | Response | Score Change |
|--------------|----------|--------------|
| Tailored | "ใช่เราเลย" | +10% (system was right) |
| Tailored | "ไม่ใช่เรา" | -5% (system was wrong) |
| Random | "ใช่เราเลย" | -5% (seeing patterns in randomness) |
| Random | "ไม่ใช่เรา" | +2% (correctly skeptical) |

**Range:** 0% to 100% (starts at 50%)

### Technical Details

- **No backend** — Everything runs in the browser
- **localStorage** — Your responses persist across sessions
- **Barnum-style fortunes** — Statements that feel personal but apply broadly
- **Vanilla JavaScript** — No frameworks, minimal overhead

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
mordoo/
├── index.html           # Single-page app entry
├── style.css           # Mystical visual theme
├── app.js              # Main controller
├── fortune-engine.js   # Fortune generation logic
├── game-state.js       # State management & persistence
├── ui-controller.js    # DOM manipulation
├── fortunes.json       # Fortune content pool (25 Thai fortunes)
├── vite.config.js      # Vite build configuration
└── memory-bank/        # Design documents and project context
```

### Tech Stack

- **Runtime:** Vanilla JavaScript (ES6+)
- **Build Tool:** Vite 7.x
- **Styling:** Plain CSS
- **Persistence:** localStorage API
- **Fonts:** Google Fonts (Sarabun for Thai language support)
- **Deployment:** GitHub Pages

## Deployment

The site is automatically deployed to GitHub Pages from the `gh-pages` branch.

To deploy manually:

```bash
# Build the project
npm run build

# The dist/ folder contains the built files
# Deploy dist/ contents to gh-pages branch
```

## Design Philosophy

**What this is:**
- A clever mirror, not a complex system
- A playful experiment in belief patterns
- Minimal and intuitive (no tutorial needed)
- Complete in seconds, not minutes

**What this is not:**
- A real fortune-telling system (it confidently lies)
- A complex RPG with progression
- A data collection tool (everything stays in your browser)
- A platform for features or gamification

## Credits

Created as an experimental browser game exploring the psychology of belief and self-perception patterns.

**Target Audience:** Thai speakers interested in introspection and playful psychological experiments.

## License

MIT License — feel free to fork and experiment.
