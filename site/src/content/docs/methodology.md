---
title: Methodology
description: A document lifecycle system for AI-assisted software development
head: []
---

A document lifecycle system for AI-assisted software development.

## The Problem

AI coding assistants have no memory. Every session starts fresh. Without structured context:
- AI produces generic, inconsistent code
- You re-explain your project constantly
- Documentation becomes stale and ignored
- Decisions get lost, repeated, or contradicted

**The solution isn't better AI — it's better document management.**

---

## Core Concept: Document Lifecycle

This methodology is a **document lifecycle system**. Documents flow through defined stages, get transformed, and either stay current or get archived. Rules control this flow.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DOCUMENT LIFECYCLE FLOW                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐           │
│   │ RESEARCH │ ───► │  BUILD   │ ───► │   ADR    │ ───► │ ARCHIVE  │           │
│   │  + SPEC  │      │ Implement│      │ Extract  │      │  Spec    │           │
│   └──────────┘      └────┬─────┘      └──────────┘      └──────────┘           │
│        │                 │                                    │                 │
│        │                 │ ◄──────────────┐                   │                 │
│        │                 ▼                │                   ▼                 │
│        │           ┌──────────┐     ┌─────┴────┐        ┌──────────┐           │
│        │           │  REVIEW  │ ──► │ ITERATE  │        │REFERENCE │           │
│        │           │  Human   │     │  (loop)  │        │  Update  │           │
│        │           └──────────┘     └──────────┘        └──────────┘           │
│        │                 ▲                              (research +            │
│        └─────────────────┘                               knowledge             │
│          (context for build)                             preserved)            │
│                                                                                 │
│   ═══════════════════════════════════════════════════════════════════════════   │
│                          RULES (Control Layer)                                  │
│            Enforce lifecycle transitions + best practices                       │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## The Three Pillars

| Pillar | Role in Lifecycle | Lifecycle Type | Location |
|--------|-------------------|----------------|----------|
| **SPECS** | Research + requirements for AI to build from | **Ephemeral** — converted to ADR, then archived | `docs/specs/` |
| **REFERENCE** | Context AI reads to understand the system | **Evergreen** — always current or deleted | `docs/` + `AGENTS.md` |
| **RULES** | Control lifecycle flow + enforce patterns | **Stable** — updated when workflow changes | `.cursor/rules/` |

---

## Spec Package

A spec is not just a single file — it's a **spec package** containing everything needed to understand and build a feature.

```
docs/specs/<feature>/
├── prd.md              # PRD-lite: problem, scope, stories, diagrams (Mermaid)
├── research.md         # Research notes, API refs, external links
├── user-stories.md     # Detailed acceptance criteria
└── tasks.md            # Implementation checklist
```

**Diagrams:** Use Mermaid (docs-as-code). Embed directly in markdown — no separate image files.

```markdown
## Data Flow

​```mermaid
sequenceDiagram
    User->>+API: POST /login
    API->>+OAuth: Redirect
    OAuth-->>-API: Token
    API-->>-User: Session
​```
```

**For simple features:** A single `<feature>.md` file is enough.

---

## Lifecycle Stages

### Stage 1: RESEARCH + SPEC (Human)

**Trigger:** New feature, change, or fix needed

| Action | Owner | Output |
|--------|-------|--------|
| Research the problem | Human/AI | `docs/specs/<feature>/research.md` |
| Gather external docs, API refs | Human | Links in research.md |
| Create diagrams (Mermaid) | Human/AI | Embedded in prd.md |
| Write PRD-lite from template | Human | `docs/specs/<feature>/prd.md` |
| Define acceptance criteria | Human | User stories with Given/When/Then |
| Create initial task list | Human/AI | `docs/specs/<feature>/tasks.md` |

### Stage 2: BUILD (AI)

**Trigger:** Spec package approved and ready for implementation

| Action | Owner | Output |
|--------|-------|--------|
| Read REFERENCE for context | AI | Understanding of system |
| Read SPEC package (prd + research) | AI | Understanding of requirements |
| Follow RULES for patterns | AI | Consistent code |
| Implement feature | AI | Code + tests |
| Update task progress | AI | Tasks marked complete |

### Stage 3: REVIEW + ITERATE (Human ↔ AI)

**Trigger:** AI signals task/feature complete

| Action | Owner | Output |
|--------|-------|--------|
| Verify acceptance criteria | Human | Pass / Fail |
| Check code quality | Human | Feedback |
| Request changes if needed | Human | Feedback for AI |
| **Iterate** (loop back to BUILD) | AI | Fixed code |
| Approve when criteria met | Human | Ready for completion |

> **Iteration loop:** BUILD → REVIEW → feedback → BUILD → REVIEW... until approved. This is the normal flow, not an exception.

### Stage 4: COMPLETE (Both)

**Trigger:** Feature approved and merged

| Action | Owner | Output |
|--------|-------|--------|
| Extract decisions to ADR | Human/AI | `docs/decisions/ADR-XXX.md` |
| Update REFERENCE docs | AI | Current system state |
| Move valuable diagrams/flows to REFERENCE | Human | Copy Mermaid blocks to docs |
| Archive or delete spec package | Human | `docs/specs/_archive/` |
| Update AGENTS.md if needed | AI | Current context |

---

## The Development Cycle

```
┌──────────────────────────────────────────────────────────────────────┐
│                      HUMAN-AI DEVELOPMENT CYCLE                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   1. RESEARCH + SPEC                   2. BUILD                      │
│   ┌────────────────────┐               ┌────────────────────┐        │
│   │ Human prepares:    │               │ AI executes:       │        │
│   │ • Research         │               │ • Reads REFERENCE  │        │
│   │ • Diagrams         │ ───────────►  │ • Reads SPEC pkg   │        │
│   │ • PRD-lite         │               │ • Follows RULES    │        │
│   │ • User stories     │               │ • Writes code      │        │
│   │ • Tasks            │               │ • Updates tasks    │        │
│   └────────────────────┘               └──────────┬─────────┘        │
│                                                   │                  │
│   4. COMPLETE                          3. REVIEW  ▼                  │
│   ┌────────────────────┐               ┌────────────────────┐        │
│   │ Lifecycle actions: │               │ Human reviews:     │        │
│   │ • Spec → ADR       │ ◄──────────── │ • Code quality     │        │
│   │ • Research → REF   │   (approved)  │ • Meets criteria   │        │
│   │ • Archive spec     │               │ • Approve/reject   │        │
│   │ • Update AGENTS.md │               │         │          │        │
│   └────────────────────┘               └─────────┼──────────┘        │
│                                                  │                   │
│                              ┌───────────────────┘                   │
│                              │ (rejected)                            │
│                              ▼                                       │
│                        ┌───────────┐                                 │
│                        │  ITERATE  │ ──────► back to BUILD           │
│                        │  (loop)   │                                 │
│                        └───────────┘                                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Rules: Workflow + Patterns

Rules serve two purposes:

1. **Workflow Control** — Enforce lifecycle transitions (when to update docs, create ADRs, archive specs)
2. **Coding Patterns** — Enforce consistent code style and architecture

### Example: Lifecycle Control Rule

```markdown
---
description: Document lifecycle management after feature completion
globs: ["docs/specs/**/*.md"]
---

# Document Lifecycle

## After Feature Completion
1. Extract significant decisions into ADR
2. Move valuable research to REFERENCE
3. Update AGENTS.md if patterns changed
4. Archive or delete spec package
```

---

## Principles

### 1. Documents Have Lifecycles
Specs are born, implemented, transformed into ADRs, and archived. Reference docs stay current or get deleted. Nothing stays stale.

### 2. Rules Control the Flow
AI rules aren't just for code patterns—they enforce when documents move through lifecycle stages.

### 3. Spec First, Code Second
Define acceptance criteria BEFORE building. The spec is the contract.

### 4. Update or Delete
Stale docs are worse than no docs. Every document is either current or gone.

### 5. Human Owns the Lifecycle
AI builds and updates. Human triggers transitions and approves changes.

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad | What to Do Instead |
|--------------|--------------|---------------------|
| **Heavyweight PRDs** | Too much upfront work, quickly stale | PRD-lite: problem, scope, stories |
| **Documentation after** | Always deprioritized, never done | Spec first, doc during, update after |
| **Rules for everything** | Cognitive overload for AI | Only essential, stable patterns |
| **Implicit decisions** | Lost context over time | ADRs for significant choices |
| **Stale specs** | Confusion, contradictions | Archive or delete when done |

---

## Quick Reference: Lifecycle Actions

```
RESEARCH + SPEC:
├── Research the problem (gather docs, API refs, examples)
├── Create diagrams if needed (sequence, flow, architecture)
├── Write PRD-lite (problem, scope, stories)
├── Define acceptance criteria (Given/When/Then)
├── Create task list
└── Approve spec package for implementation

BUILD:
├── AI reads REFERENCE for system context
├── AI reads SPEC package (prd + research + tasks)
├── AI follows RULES for patterns
├── AI implements code + tests
└── AI updates task progress

REVIEW + ITERATE:
├── Human verifies acceptance criteria
├── Human checks code quality
├── If rejected → AI iterates → back to BUILD
└── If approved → proceed to COMPLETE

COMPLETE:
├── Extract decisions → ADR (if significant)
├── Move valuable diagrams → REFERENCE (copy Mermaid blocks)
├── Update REFERENCE docs (AI)
├── Archive or delete spec package
└── Update AGENTS.md if patterns changed
```

---

## Tool Support

This methodology is **tool-agnostic**. The workflow works with any AI coding assistant.

**Cursor** is the current proof-of-concept implementation.

| Tool | Rule Location | Context File |
|------|---------------|--------------|
| **Cursor** | `.cursor/rules/*.mdc` | Auto-detected |
| **Claude Code** | `CLAUDE.md` | `CLAUDE.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Same file |
| **Windsurf** | `.windsurfrules` | Same file |
| **Other AI** | Any `.md` files | `AGENTS.md` |

The document types (SPECS, REFERENCE, ADRs) and lifecycle flow remain the same. Only the rule file format changes.

---

## Scaling: Small Projects to Monorepos

The methodology uses a **fractal structure** — the same pattern repeats at every level.

### The Fractal Principle

```
<scope>/
├── AGENTS.md           # Context for this scope
├── docs/
│   ├── specs/          # What we're building
│   ├── features/       # What exists
│   └── decisions/      # Why we decided
└── .cursor/rules/      # How we build (optional per-scope)
```

This pattern applies at every level: monorepo root, app, package, or feature.

### Small Project

```
project/
├── AGENTS.md                 # Project context + feature map
├── docs/
│   ├── specs/
│   ├── features/
│   └── decisions/
├── .cursor/rules/
└── src/
```

### Monorepo

```
monorepo/
├── AGENTS.md                 # Monorepo overview + app index
├── docs/
│   ├── decisions/           # Shared ADRs
│   └── architecture.md
├── .cursor/rules/           # Shared rules
│
├── apps/
│   ├── web/
│   │   ├── AGENTS.md        # App context + feature map
│   │   ├── docs/
│   │   └── .cursor/rules/   # App-specific rules
│   ├── api/
│   │   ├── AGENTS.md
│   │   └── docs/
│   └── mobile/
│       ├── AGENTS.md
│       └── docs/
│
└── packages/
    ├── shared-ui/
    │   ├── AGENTS.md
    │   └── docs/
    └── core/
        └── AGENTS.md
```

### AGENTS.md at Each Level

| Scope | Contains |
|-------|----------|
| **Monorepo root** | App index, shared patterns, cross-app architecture |
| **App** | App context, feature map, tech stack |
| **Package** | Package API, usage patterns |

### Rule Inheritance

Rules cascade from root to specific:

```
monorepo/.cursor/rules/      # Shared (all apps inherit)
apps/web/.cursor/rules/      # Web-specific (extends shared)
apps/api/.cursor/rules/      # API-specific
```

AI reads from most specific scope first, then inherits shared rules.
