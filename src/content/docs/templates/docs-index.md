---
title: Documentation Index
description: INDEX.md and TASKS.md for navigation and progress tracking
head: []
---

## Purpose

Two essential files for documentation navigation and progress tracking.

---

## docs/INDEX.md

Navigation hub for all project documentation.

````markdown
# [Project Name] Documentation

> Central navigation for project documentation

## Quick Links

| Document | Purpose | Update Frequency |
|----------|---------|------------------|
| [TASKS.md](TASKS.md) | Progress tracking | Daily |
| [specs/](specs/) | Feature specifications | Per feature |
| [features/](features/) | Feature documentation | As features evolve |
| [decisions/](decisions/) | Architecture decisions | When decisions made |

## Project Context

| Resource | Location | Purpose |
|----------|----------|---------|
| AI Context | `/AGENTS.md` | Quick context for AI agents |
| AI Rules | `/.cursor/rules/` | Detailed patterns |
| README | `/README.md` | Human-focused overview |

## Documentation Map

```
docs/
├── INDEX.md          ← You are here
├── TASKS.md          # Progress tracking
├── specs/            # PRD-lite specifications
│   ├── [feature].md  # Active specs
│   └── _archive/     # Completed specs
├── features/         # Feature documentation
│   └── [feature]/
│       ├── README.md
│       ├── user-stories.md
│       └── tasks.md
└── decisions/        # Architecture decisions
    └── ADR-XXX.md
```

## For AI Agents

When working on this project:

1. **Start here** for navigation
2. **Check TASKS.md** for current work
3. **Read relevant specs** before building features
4. **Follow rules** in `.cursor/rules/`

## For Humans

| Goal | Where to Look |
|------|---------------|
| Understand the project | `/README.md` |
| See current progress | `docs/TASKS.md` |
| Find feature details | `docs/features/` |
| Understand a decision | `docs/decisions/` |
````

---

## docs/TASKS.md

Global progress tracking.

````markdown
# [Project Name] - Task Index

> Global progress tracking across all features

## Summary

| Feature | Status | Tasks | Done | Progress |
|---------|--------|-------|------|----------|
| [Feature A] | ✅ Done | 8 | 8 | 100% |
| [Feature B] | 🔄 Active | 12 | 7 | 58% |
| [Feature C] | ⏳ Planned | 6 | 0 | 0% |
| **Total** | - | **26** | **15** | **58%** |

## Status Legend

| Symbol | Status | Meaning |
|--------|--------|---------|
| ⏳ | Planned | Not yet started |
| 🔄 | Active | Currently in progress |
| ⏸️ | Paused | Temporarily stopped |
| ✅ | Done | Completed |
| ❌ | Cancelled | Will not be done |

---

## Active Work

### [Feature B] - [Brief Description]

**Status:** 🔄 Active  
**Spec:** [docs/specs/feature-b.md](specs/feature-b.md)  
**Docs:** [docs/features/feature-b/](features/feature-b/)

#### Current Tasks
- [x] Set up component structure
- [x] Implement core logic
- [x] Add API integration
- [ ] **Write tests** ← Current
- [ ] Add error handling
- [ ] Performance optimization

#### Blockers
- None currently

---

## Planned

### [Feature C] - [Brief Description]

**Priority:** High  
**Estimate:** 1 week  
**Dependencies:** Feature B must be complete

---

## Recently Completed

### [Feature A] - [Brief Description]

**Completed:** [Date]  
**Duration:** [X days]

**Archived spec:** [docs/specs/_archive/feature-a.md](specs/_archive/feature-a.md)

---

## Backlog

- [ ] [Enhancement idea 1]
- [ ] [Enhancement idea 2]
- [ ] [Tech debt item]

---

*Last updated: [Date]*
````

---

## Minimal Versions

For quick setup, start minimal:

### Minimal INDEX.md

````markdown
# [Project] Documentation

- [TASKS.md](TASKS.md) - Progress
- [specs/](specs/) - Specifications
- [features/](features/) - Feature docs
- [decisions/](decisions/) - ADRs

For AI: Start with `/AGENTS.md` and `/.cursor/rules/`
````

### Minimal TASKS.md

````markdown
# [Project] Tasks

## Current
- [ ] [Current task]

## Done
- [x] [Completed task]
````

---

## Tips

1. **Update TASKS.md frequently** — It's your source of truth for progress
2. **Keep INDEX.md stable** — Update only when adding new sections
3. **Link everything** — Cross-reference specs, features, and decisions
4. **Archive completed specs** — Don't delete, move to `_archive/`

---

## Copy Paths

- `/docs/INDEX.md`
- `/docs/TASKS.md`
