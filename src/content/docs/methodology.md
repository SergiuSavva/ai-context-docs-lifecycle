---
title: Methodology
description: The complete AI-First Development methodology explained
head: []
---

A lightweight, spec-driven approach for AI-assisted software development.

## Core Philosophy

```
Minimalist: Only what's needed, nothing more
Flexible:   Adapt to your project, not the other way around
Reliable:   Proven patterns from established methodologies
Robust:     Works for solo devs and teams alike
```

---

## The Three Pillars

| Pillar | Purpose | Location | Lifecycle |
|--------|---------|----------|-----------|
| **SPECS** | What to build | `docs/specs/` | Ephemeral (archive when done) |
| **RULES** | How to build | `.cursor/rules/` | Stable (rarely changes) |
| **REFERENCE** | What exists | `AGENTS.md`, `docs/` | Evergreen (always current) |

### 📋 SPECS — What to Build

Write PRD-lite specs BEFORE building. Define acceptance criteria like TDD for AI.

**Location:** `docs/specs/` (with optional phase subfolders)

**Contents:**
- Problem statement (1-2 sentences)
- Success metrics
- Scope (in/out)
- Key user stories
- Technical approach (if non-obvious)
- Risks → Mitigations

**Lifecycle:** Create → Implement → Archive to `docs/specs/_archive/`

### 📜 RULES — How to Build

Encode your patterns in rule files. AI follows them automatically in every session.

**Location:** `.cursor/rules/` (or equivalent for your tool)

**Contents:**
- Coding conventions
- Architecture patterns
- Testing strategies
- State management approaches

**Lifecycle:** Update only when patterns change

### 📚 REFERENCE — What Exists

AGENTS.md gives instant context. Feature docs capture architecture. ADRs preserve decisions.

**Location:** Root `AGENTS.md` + `docs/features/` + `docs/decisions/`

**Contents:**
- Quick start commands
- Tech stack overview
- File organization
- Key patterns
- Feature documentation
- Architecture decisions

**Lifecycle:** Update continuously as system evolves

---

## The Development Cycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    HUMAN-AI DEVELOPMENT CYCLE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. SPEC                          2. BUILD                      │
│   ┌──────────────────┐             ┌──────────────────┐         │
│   │ Human writes:    │             │ AI executes:     │         │
│   │ • PRD-lite       │ ─────────►  │ • Reads context  │         │
│   │ • User stories   │             │ • Follows rules  │         │
│   │ • Acceptance     │             │ • Writes code    │         │
│   │   criteria       │             │ • Runs tests     │         │
│   └──────────────────┘             └────────┬─────────┘         │
│                                             │                    │
│   4. MAINTAIN                      3. REVIEW                     │
│   ┌──────────────────┐             ┌────────▼─────────┐         │
│   │ Both update:     │             │ Human reviews:   │         │
│   │ • Rules (if new  │ ◄───────────│ • Code quality   │         │
│   │   patterns)      │             │ • Meets criteria │         │
│   │ • Reference docs │             │ • Approve/reject │         │
│   │ • ADRs           │             │                  │         │
│   └──────────────────┘             └──────────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Principles

### 1. Documentation is Infrastructure

Not optional. Not nice-to-have. It's the memory AI agents lack.

### 2. Spec First, Code Second

Define acceptance criteria BEFORE building. TDD for AI.

### 3. Rules Over Prompts

Encode patterns once in rules. Every session follows automatically.

### 4. Update or Delete

Stale docs are worse than no docs. Keep current or remove.

### 5. Human Accountability

AI builds. Human reviews. Human is responsible.

### 6. Minimize Ceremony

Only document what provides value. Skip everything else.

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad | What to Do Instead |
|--------------|--------------|---------------------|
| **Heavyweight PRDs** | Too much upfront work, quickly stale | PRD-lite: problem, scope, stories |
| **Documentation after** | Always deprioritized, never done | Spec first, doc during, update after |
| **Rules for everything** | Cognitive overload for AI | Only essential, stable patterns |
| **Implicit decisions** | Lost context over time | ADRs for significant choices |
| **Vibe coding production** | Inconsistent, unmaintainable | Specs + rules for production code |

---

## Methodology Inspirations

This framework draws from proven methodologies:

| Methodology | What We Borrow |
|-------------|----------------|
| **Docs-as-Code** | Version control, plain text, reviews |
| **TDD/BDD** | Acceptance criteria before code |
| **ADRs** | Capture WHY, not just what |
| **Lean/XP** | Minimal rules, eliminate waste |
| **Agile Modeling** | Just enough docs, evolve with code |
| **FDD** | Feature-driven documentation structure |

---

## Document Lifecycles

| Lifecycle | Meaning | Examples |
|-----------|---------|----------|
| **Ephemeral** | Temporary — archive when done | PRD-lite specs |
| **Stable** | Rarely changes — update only when patterns change | Cursor rules |
| **Evergreen** | Always current — update continuously | AGENTS.md, feature docs |

---

## When to Use What

| Situation | Document | Location |
|-----------|----------|----------|
| Starting a new feature | PRD-lite + user stories | `docs/specs/` + `docs/features/` |
| Making a tech decision | ADR | `docs/decisions/` |
| Establishing a pattern | Rule file | `.cursor/rules/` |
| Tracking implementation | Tasks | `docs/features/*/tasks.md` |
| Providing AI context | AGENTS.md | Root + feature dirs |
| Onboarding developers | INDEX.md | `docs/INDEX.md` |

---

## Quick Reference

### Starting a Feature

1. Write PRD-lite spec (problem, scope, stories)
2. Create feature folder with README + stories + tasks
3. Point AI at spec, let it build
4. Review, iterate, approve

### Establishing Patterns

1. Notice a pattern emerging
2. Create/update `.cursor/rules/*.mdc`
3. AI follows automatically from now on

### Making Decisions

1. Facing a significant choice?
2. Write ADR with context + alternatives
3. Record decision + consequences
4. AI respects decision going forward

### Keeping Docs Current

1. AI updates docs as it builds
2. Human reviews doc changes in PR
3. Archive completed specs
4. Delete stale docs

---

## Tool Support

| Tool | Type | How It Helps |
|------|------|--------------|
| **Cursor** | IDE + Rules | Auto-loads context, follows rules |
| **Claude Code** | CLI Agent | Autonomous task execution |
| **GitHub Copilot** | Suggestions | Inline assistance |
| **Any AI** | LLM | Reads your docs, provides context |

The methodology is **tool-agnostic**. Your docs work regardless of which AI tool you use.
