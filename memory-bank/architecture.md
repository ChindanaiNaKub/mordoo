# Architecture — Trust the Fortune?

## Status

*Conceptual. Will be refined during technical planning and implementation.*

---

## High-Level System Structure

```
┌─────────────────────────────────────────────────────┐
│                    Browser                           │
│  ┌───────────────────────────────────────────────┐  │
│  │              Frontend Application              │  │
│  │                                               │  │
│  │  ┌─────────────┐    ┌─────────────────────┐  │  │
│  │  │     UI      │◄───│   State Manager     │  │  │
│  │  │   Layer     │    │                     │  │  │
│  │  └─────────────┘    └─────────────────────┘  │  │
│  │         ▲                     │               │  │
│  │         │                     ▼               │  │
│  │  ┌─────────────┐    ┌─────────────────────┐  │  │
│  │  │   Display   │    │   Game Engine       │  │  │
│  │  │   Logic     │◄───│                     │  │  │
│  │  └─────────────┘    └─────────────────────┘  │  │
│  │                           │                   │  │
│  │                           ▼                   │  │
│  │                    ┌─────────────┐            │  │
│  │                    │  Fortune    │            │  │
│  │                    │  Generator  │            │  │
│  │                    └─────────────┘            │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │         Local Storage (Persistence)          │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## Major Components

### UI Layer
**Responsibility:** Display fortunes, capture player input, show reveals

Shows:
- Fortune display area
- Response buttons ("ใช่เราเลย" / "ไม่ใช่เรา")
- Trust score indicator
- Reveal information (random vs. tailored)

### State Manager
**Responsibility:** Track game state, persist between sessions

Manages:
- Current fortune
- Player response history
- Trust score
- Fortune generation mode (random/tailored)

### Game Engine
**Responsibility:** Core game logic

Handles:
- Fortune selection algorithm
- Response processing
- Trust score calculation
- Reveal logic

### Fortune Generator
**Responsibility:** Create and select fortune content

Contains:
- Pool of fortune strings (Thai language)
- Random selection logic
- Tailored selection logic based on player patterns

### Persistence Layer
**Responsibility:** Save and load player data

Uses browser localStorage for:
- Trust score
- Response history
- Session continuity

---

## Data Flow

1. Player requests fortune → UI triggers Engine
2. Engine requests fortune from Generator
3. Generator returns fortune (mode tracked)
4. Engine passes to UI for display
5. Player responds → UI sends to Engine
6. Engine updates State, calculates new trust
7. Engine triggers Reveal → UI displays outcome
8. State persists to localStorage

---

## Key Design Decisions

*To be documented as architecture is implemented.*

- **No backend** — All logic runs client-side for simplicity
- **Local persistence** — No accounts, no server required
- **Single-page** — No navigation, just state transitions
