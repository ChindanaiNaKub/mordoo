# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**"Trust the Fortune?"** is an experimental browser game that presents as a fortune-telling toy but is actually a mirror for self-belief patterns.

The project is in early concept phase (design documents only, no codebase yet).

### Core Feeling
Amused suspicion — the player laughs, feels exposed, then questions themselves.

### Core Loop (MVP)
1. Player requests a fortune (optional birthday input)
2. System presents a fortune (random or biased by past answers)
3. Player answers: "ใช่เราเลย" / "ไม่ใช่เรา" (Thai: "That's me" / "Not me")
4. System reveals whether fortune was random or tailored
5. Trust score adjusts
6. Loop repeats

---

## Working Rules for This Project

### Before Writing Code
**Always enter PLAN MODE first.** Before any implementation:
- Restate the core feeling in your own words
- Outline the MVP loop
- Identify what must exist vs. what must not
- Propose a minimal implementation approach
- Only proceed once the plan protects the vibe

### Creative Constraints
- **Simplicity over features** — Question every addition
- **Feeling over mechanics** — Player reaction matters more than system depth
- **Psychology over progression** — This is a mirror, not an RPG
- **Honesty about being dishonest** — The game confidently lies

### What to Protect
The game should feel:
- Playful, not preachy
- Clever, not smug
- Minimal, not empty

### Technical Principles
- Assume MVP scale only (one-page browser app)
- No tutorial required — intuitive interaction
- Complete loop in seconds, not minutes
- All logic explainable in simple terms
- Avoid over-engineering at all costs

---

## Development Commands

*No build system configured yet. This is a greenfield project.*

---

## Memory-Bank System

This project uses a structured memory system in `memory-bank/` for long-term project context:

- **game-design-document.md** — Core feeling, fantasy, target players, player experience
- **tech-stack.md** — Technology decisions and rationale
- **implementation-plan.md** — Development phases and step-by-step build plan
- **architecture.md** — System structure, components, data flow (UI Layer, State Manager, Game Engine, Fortune Generator, Persistence)
- **progress.md** — Development log tracking decisions and milestones

**Before planning or coding:** Always read the relevant memory-bank files to understand current state and prior decisions.

**After major decisions:** Update the memory-bank to maintain project continuity.

---

## Language Context

This game targets Thai-speaking players. The UI will include Thai text responses like "ใช่เราเลย" (That's me) and "ไม่ใช่เรา" (Not me). Shareable phrases like "ลองเล่นดิ มันแปลกๆ" (Try it, it's weird) are part of the intended social dynamic.
