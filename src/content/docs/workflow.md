---
title: Development Workflow
description: Day-to-day prompts for building features with AI assistance
head: []
---

After [initial setup](/quick-start/), use these prompts to build features consistently.

---

## Before Building a Feature

Paste this before starting any new feature:

```
I want to build [feature name].

1. Create a PRD-lite spec in docs/specs/[feature].md with:
   - Problem statement (1-2 sentences)
   - Success criteria (measurable)
   - Scope: what's in, what's out
   - Key user stories

2. Create feature docs at docs/features/[feature]/README.md

3. Add tasks to docs/TASKS.md under "In Progress"

4. Then implement following the spec
```

### What This Creates

| File | Purpose |
|------|---------|
| `docs/specs/[feature].md` | Definition of done — archive when complete |
| `docs/features/[feature]/README.md` | Living documentation — update as you build |
| `docs/TASKS.md` entry | Progress tracking |

---

## While Building

Your AI automatically:
- Reads `AGENTS.md` for project context
- Follows `.cursor/rules/` patterns
- Updates docs as code changes

### If AI Forgets Context

```
Read AGENTS.md and .cursor/rules/ before continuing.
```

### If You Discover a New Pattern

```
I noticed we're using [pattern] consistently.
Add this to .cursor/rules/[appropriate-rule].mdc
```

---

## After Completing a Feature

Paste this when a feature is done:

```
Feature [name] is complete.

1. Mark tasks complete in docs/TASKS.md
2. Move spec to docs/specs/_archive/[feature].md
3. Update AGENTS.md if:
   - New commands were added
   - Architecture changed
   - Key patterns emerged
4. Update .cursor/rules/ if new patterns should be followed
```

---

## Making Architecture Decisions

When facing a significant technical choice:

```
I need to decide [decision topic].

Create an ADR at docs/decisions/ADR-[number]-[topic].md with:
- Context: Why this decision is needed
- Options: What alternatives exist
- Decision: What we chose and why
- Consequences: Trade-offs accepted
```

### ADR Numbering

```
docs/decisions/
├── ADR-001-database-choice.md
├── ADR-002-auth-strategy.md
└── ADR-003-api-versioning.md
```

---

## Quick Reference

| Situation | Action |
|-----------|--------|
| Starting a feature | Create spec → Create feature docs → Add to TASKS |
| Pattern emerging | Add to `.cursor/rules/` |
| Making a decision | Write ADR |
| Feature complete | Archive spec → Update AGENTS.md |
| Context lost | Re-read AGENTS.md and rules |

---

## Prompt Templates

### Full Feature Kickoff

```
New feature: [Feature Name]

1. Read the methodology at AGENTS.md
2. Create PRD-lite spec at docs/specs/[feature].md
3. Create docs/features/[feature]/README.md with architecture overview
4. Add implementation tasks to docs/TASKS.md
5. Begin implementation, updating docs as you go
```

### Quick Bug Fix

```
Fix: [Bug description]

1. Add to docs/TASKS.md under current sprint
2. Implement the fix
3. Update any affected documentation
4. Mark complete in TASKS.md
```

### Refactoring Session

```
Refactor: [What and why]

1. Document current state in docs/features/[area]/README.md
2. Create ADR if this changes architecture
3. Implement refactoring
4. Update AGENTS.md if patterns changed
```
