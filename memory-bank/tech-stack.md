# Tech Stack — Trust the Fortune?

## Status

**Updated:** 2025-01-12 — Tech stack finalized

---

## Platform Target

Web browser — single-page application

Runs in any modern browser with no installation required.

---

## Final Technology Choices

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend Framework** | Vanilla JavaScript | ES6+ |
| **Build Tool** | Vite | Latest |
| **Styling** | Plain CSS | CSS3 |
| **State Management** | Custom (no library) | - |
| **Persistence** | localStorage API | - |
| **Fonts** | Google Fonts (Sarabun) | - |
| **Deployment** | Static hosting | Any |

---

## Decision Rationale

### Vanilla JavaScript (No Framework)

**Why:**
- Fastest to prototype and iterate
- Zero dependency overhead
- No build complexity for simple state
- Easier to understand and modify
- Forces simplicity

**Trade-offs:**
- Manual DOM manipulation (acceptable for minimal UI)
- No reactive state (not needed for this scope)

**Rejected:**
- React/Vue/Svelte — Overkill for single-page, minimal UI
- jQuery — Unnecessary abstraction layer

### Vite (Build Tool)

**Why:**
- Instant dev server with hot reload
- Optimized production builds
- Modern ES module support
- Simple configuration
- Fast development experience

**Trade-offs:**
- Additional npm dependency (minimal impact)
- Build step required (acceptable for optimized output)

**Rejected:**
- Webpack — Overly complex for this use case
- No build tool — Loss of dev server and optimization

### Plain CSS (No Framework)

**Why:**
- Sufficient for minimal, centered layout
- No learning curve
- Smaller bundle size
- Direct browser support

**Trade-offs:**
- No utility classes (not needed for this scope)
- Manual responsive design (simple enough)

**Rejected:**
- Tailwind — Larger bundle, unnecessary for simple design
- Bootstrap — Too opinionated, adds bulk
- CSS-in-JS — Adds complexity without benefit

### localStorage (Persistence)

**Why:**
- No backend required
- Data stays private (client-side only)
- Works across sessions
- Simple API
- No authentication needed

**Trade-offs:**
- Limited to single device
- Data lost if browser cache cleared
- 5MB storage limit (we use <1KB)

**Rejected:**
- Backend/database — Adds hosting complexity
- Cookies — Not appropriate for this use case
- IndexedDB — Overkill for small data

### Google Fonts - Sarabun (Typography)

**Why:**
- Excellent Thai language support
- Clean, modern design
- CDN delivery (fast)
- Free and open-source
- Multiple weights available

**Alternatives Considered:**
- Kanit — Also good, slightly more modern
- Prompt — Good but less formal
- System fonts — Insufficient Thai support

---

## File Structure

```
mordoo/
├── index.html              # Single page app entry
├── style.css               # All styles
├── app.js                  # Main controller
├── fortune-engine.js       # Fortune generation logic
├── game-state.js           # State management
├── ui-controller.js        # DOM manipulation
├── fortunes.json           # Fortune content (Thai)
├── package.json            # npm config
├── vite.config.js          # Vite configuration (optional)
└── dist/                   # Production build output
```

---

## Browser Compatibility

**Target Browsers:**
- Chrome/Edge 90+ (Chromium)
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android

**Features Used:**
- ES6 modules (import/export)
- async/await
- localStorage API
- CSS Grid/Flexbox
- CSS Custom Properties

**No Polyfills Needed** — All features supported in modern browsers

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial Load | <2 seconds (3G) |
| Bundle Size | <50KB (gzipped) |
| Time to Interactive | <1 second |
| Runtime Memory | <10MB |

---

## Development Environment

### Setup Commands

```bash
# Initialize project
npm init -y

# Install Vite
npm install -D vite

# Add dev script to package.json
# "dev": "vite"
# "build": "vite build"

# Start dev server
npm run dev

# Production build
npm run build
```

### Dev Server

- URL: `http://localhost:5173`
- Hot reload: Enabled
- Port: Auto-assigned by Vite

---

## Deployment Options

**Recommended (Any of these work):**

1. **Netlify Drop** — Drag and drop `dist/` folder
2. **Vercel** — Connect repo or deploy folder
3. **GitHub Pages** — Push to gh-pages branch
4. **Cloudflare Pages** — Connect repo
5. **Any static hosting** — All serve HTML/CSS/JS

**No backend required** — Pure static site

---

## Dependencies

### Production
- None (zero runtime dependencies)

### Development
- `vite` — Dev server and build tool

---

## Security Considerations

- **No external API calls** — No network requests after initial load
- **No user input processing** — No XSS risk vectors
- **No data transmission** — All data stays client-side
- **No third-party scripts** — No tracking or analytics

---

## Future Scalability

**If the project grows, consider:**

- TypeScript for type safety
- Framework (React/Vue) if UI complexity increases
- Backend if multiplayer or cloud sync is needed
- CDN for asset optimization
- Analytics (privacy-preserving) for usage insights

**For MVP:** Current stack is optimal
