# AI Context Docs Lifecycle

> **A document lifecycle methodology for AI-assisted software development**

---

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
| **SPECS** | Input for AI to build from | **Ephemeral** — converted to ADR, then archived | `docs/specs/` |
| **REFERENCE** | Context AI reads to understand the system | **Evergreen** — always current or deleted | `docs/` + `AGENTS.md` |
| **RULES** | Control lifecycle flow + enforce patterns | **Stable** — updated when workflow changes | `.cursor/rules/` |

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│   📋 SPECS                 📜 RULES                   📚 REFERENCE             │
│   (What to build)          (Control flow)             (What exists)            │
│                                                                                │
│   docs/specs/              .cursor/rules/             AGENTS.md                │
│   ├── [phase]/             ├── 00-index.mdc           docs/                    │
│   │   └── feature.md       ├── doc-lifecycle.mdc      ├── features/            │
│   └── _archive/            ├── coding-patterns.mdc    ├── decisions/           │
│                            └── testing-strategy.mdc   └── INDEX.md             │
│                                                                                │
│   Created → Built →        Enforces when docs         Updated after each       │
│   ADR → Archived           move through stages        feature completion       │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

---

## Methodology Inspirations

This framework draws from proven methodologies, taking only what works:

### From Docs-as-Code
| Principle | How We Apply It |
|-----------|-----------------|
| Version control | All docs in Git alongside code |
| Plain text markup | Markdown everywhere |
| Review process | Docs reviewed in PRs |
| Automation | AI updates docs as it builds |

### From Lightweight Methodologies (XP, FDD)
| Principle | How We Apply It |
|-----------|-----------------|
| Minimal rules | Only essential docs, no ceremony |
| Iterative | Specs → Build → Update → Repeat |
| Customer focus | User stories drive features |
| Simplicity | PRD-lite over heavyweight PRDs |

### From Test-Driven Development (TDD)
| Principle | How We Apply It |
|-----------|-----------------|
| Tests first | Acceptance criteria before code |
| Clear requirements | Given/When/Then format |
| Verification | Checkboxes track completion |

### From Architecture Decision Records (ADRs)
| Principle | How We Apply It |
|-----------|-----------------|
| Capture decisions | `docs/decisions/` folder |
| Document WHY | Context + Rationale sections |
| Track alternatives | What was considered and rejected |
| Status tracking | Proposed → Accepted → Deprecated |

### From Agile Modeling
| Principle | How We Apply It |
|-----------|-----------------|
| Just enough | Document only what AI needs |
| Evolve with code | Update docs as system changes |
| Multiple models | Specs, stories, tasks, ADRs |
| Simplify | Tables and bullets over prose |

---

## Document Types

### 1. AGENTS.md (Context File)
**Purpose:** Quick AI context at every level  
**Location:** Root + feature directories  
**Update:** When architecture/patterns change

```markdown
# [Project/Feature] - AI Agent Instructions

## Quick Start
[Essential commands]

## Tech Stack / Key Files
[What to know]

## Patterns
[How things are done here]

## Need Help?
[Links to detailed docs]
```

### 2. Spec Package (docs/specs/)
**Purpose:** Research + requirements BEFORE building
**Lifecycle:** Ephemeral — Created → Implemented → Archived (valuable parts → REFERENCE)
**Inspired by:** Lean methodology - eliminate waste

A spec is not just a single file — it's a **spec package** containing everything needed to understand and build a feature.

**Spec package structure:**
```
docs/specs/<feature>/
├── prd.md              # PRD-lite: problem, scope, stories, diagrams (Mermaid)
├── research.md         # Research notes, API refs, external links
├── user-stories.md     # Detailed acceptance criteria
└── tasks.md            # Implementation checklist
```

**Diagrams:** Use Mermaid (docs-as-code). Embed directly in markdown files — no separate image files.

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

**Folder organization options:**
- Flat: `docs/specs/<feature>/` (default)
- Phased: `docs/specs/phase-1/<feature>/` (for phased projects)
- Release-based: `docs/specs/v1.0/<feature>/` (for versioned products)

**PRD-lite template:**
```markdown
# Feature: [Name]

## Problem (1-2 sentences)
## Success Metrics
## Scope (In/Out)
## Key User Stories
## Technical Approach (if non-obvious)
## Risks → Mitigations
## Research
[Links to diagrams, API docs, and research materials in this spec package]
```

**What happens to research after completion:**
- Valuable diagrams/flows → Move to REFERENCE docs (copy Mermaid blocks)
- API documentation links → Keep in REFERENCE if still relevant
- Temporary research → Archive with spec or delete

### 3. Feature Documentation (docs/features/)
**Purpose:** Comprehensive feature context  
**Lifecycle:** Evolves with the feature  
**Inspired by:** Feature-Driven Development (FDD)

```
docs/features/<feature>/
├── README.md       # Overview, goals, code locations
├── user-stories.md # User stories + acceptance criteria
└── tasks.md        # Implementation checklist
```

### 4. Architecture Decision Records (docs/decisions/)
**Purpose:** Capture WHY, not just what  
**Lifecycle:** Permanent record  
**Inspired by:** ADR methodology (adr.github.io)

```markdown
# ADR-XXX: [Decision]

## Status: Proposed | Accepted | Deprecated
## Context: [Problem requiring decision]
## Decision: [What we chose]
## Consequences: [Positive/Negative]
## Alternatives Considered: [What was rejected + why]
```

### 5. AI Rules (.cursor/rules/)
**Purpose:** Control document lifecycle + enforce coding patterns
**Lifecycle:** Stable — updated only when workflow or patterns change
**Format:** MDC files (Markdown for Cursor) with YAML frontmatter

Rules serve two purposes:
1. **Workflow Control** — Enforce lifecycle transitions (when to update docs, create ADRs, archive specs)
2. **Coding Patterns** — Enforce consistent code style and architecture

> **What is MDC?** Cursor's rule file format. It's standard Markdown with a YAML header that tells the AI *when* to apply this rule.
>
> **Note:** While examples use Cursor's `.mdc` format, the methodology works with any AI tool. Adapt the rule format to your tool (e.g., `.md` files, `CLAUDE.md`, etc.).

#### Example: Lifecycle Control Rule

```markdown
---
description: Document lifecycle management after feature completion
globs: ["docs/specs/**/*.md"]
alwaysApply: false
---

# Document Lifecycle

## After Feature Completion
1. Extract significant decisions into ADR (`docs/decisions/ADR-XXX.md`)
2. Update relevant REFERENCE docs with new system state
3. Update AGENTS.md if architecture or patterns changed
4. Move spec to `docs/specs/_archive/` or delete if ADR captures everything

## When to Create ADR
- Technology choice made
- Architecture pattern established
- Trade-off decision with alternatives considered
- Breaking change introduced
```

#### Example: Coding Pattern Rule

```markdown
---
description: TypeScript patterns for this project
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---

# TypeScript Conventions

## Patterns
- Use type inference where obvious
- Prefer interfaces over types for objects
- Use strict null checks
```

### 6. Task Tracking (docs/TASKS.md)
**Purpose:** Global progress visibility  
**Update:** Daily / per task  
**Inspired by:** Kanban simplicity

```markdown
| Feature | Status | Tasks | Done | Progress |
|---------|--------|-------|------|----------|
| Auth    | ✅ Done | 10   | 10   | 100%     |
```

---

## Lifecycle Stages

Each document type flows through specific stages. Rules enforce these transitions.

### Stage 1: RESEARCH + SPEC (Human)

**Trigger:** New feature, change, or fix needed

| Action | Owner | Output |
|--------|-------|--------|
| Research the problem | Human/AI | `docs/specs/<feature>/research.md` |
| Gather external docs, API refs | Human | Links in research.md |
| Create diagrams (Mermaid) | Human/AI | Embedded in prd.md |
| Write PRD-lite from template | Human | `docs/specs/<feature>/prd.md` |
| Define acceptance criteria | Human | User stories with Given/When/Then |
| Set scope boundaries | Human | In/Out of scope section |
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
| Move valuable diagrams to REFERENCE | Human | Copy Mermaid blocks to docs |
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

### 6. Minimize Ceremony
Only document what provides value. The lifecycle should feel natural, not bureaucratic.

---

## Anti-Patterns (What We Avoid)

| Anti-Pattern | Why It's Bad | What to Do Instead |
|--------------|--------------|---------------------|
| **Heavyweight PRDs** | Too much upfront work, quickly stale | PRD-lite: problem, scope, stories |
| **Documentation after** | Always deprioritized, never done | Spec first, doc during, update after |
| **Rules for everything** | Cognitive overload for AI | Only essential, stable patterns |
| **Implicit decisions** | Lost context over time | ADRs for significant choices |
| **Vibe coding production** | Inconsistent, unmaintainable | Specs + rules for production code |

---

## When to Use What

| Situation | Document | Location |
|-----------|----------|----------|
| Researching a feature | Spec package with research | `docs/specs/<feature>/research.md` |
| Starting a new feature | PRD-lite + user stories + tasks | `docs/specs/<feature>/` |
| Making a tech decision | ADR | `docs/decisions/` |
| Establishing a pattern | Rule file | `.cursor/rules/` |
| Tracking implementation | Tasks | `docs/specs/<feature>/tasks.md` |
| Providing AI context | AGENTS.md | Root + feature dirs |
| Preserving diagrams/docs | Reference docs | `docs/` |
| Onboarding developers | INDEX.md | `docs/INDEX.md` |

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

RULES UPDATES:
├── New pattern emerges during build
├── Create/update rule file
└── AI follows automatically going forward
```

---

## Tool Support

This methodology is **tool-agnostic**. The workflow works with any AI coding assistant.

### Current Implementation (POC)

**Cursor** is the proof-of-concept implementation:
- `.cursor/rules/*.mdc` — Rule files with YAML frontmatter
- Auto-loads context from project files
- Rules trigger based on file patterns (globs)

### Adapting to Other Tools

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

### Small Project Structure

```
project/
├── AGENTS.md                 # Project context + feature map
├── docs/
│   ├── specs/               # Active specs
│   ├── features/            # Feature docs
│   └── decisions/           # ADRs
├── .cursor/rules/           # Project rules
└── src/
```

**AGENTS.md contains:** Quick start, tech stack, feature map, patterns.

### Monorepo Structure

```
monorepo/
├── AGENTS.md                 # Monorepo overview + app index
├── docs/
│   ├── decisions/           # Shared/cross-app ADRs
│   └── architecture.md      # System-wide architecture
├── .cursor/rules/           # Shared rules (all apps inherit)
│
├── apps/
│   ├── web/
│   │   ├── AGENTS.md        # Web app context + feature map
│   │   ├── docs/
│   │   │   ├── specs/
│   │   │   ├── features/
│   │   │   └── decisions/   # App-specific ADRs
│   │   └── .cursor/rules/   # App-specific rules (optional)
│   │
│   ├── api/
│   │   ├── AGENTS.md
│   │   ├── docs/
│   │   └── ...
│   │
│   └── mobile/
│       ├── AGENTS.md
│       ├── docs/
│       └── ...
│
└── packages/
    ├── shared-ui/
    │   ├── AGENTS.md        # Package context
    │   └── docs/
    └── core/
        ├── AGENTS.md
        └── docs/
```

### AGENTS.md at Each Level

| Scope | AGENTS.md Contains |
|-------|-------------------|
| **Monorepo root** | App index, shared patterns, cross-app architecture |
| **App** | App-specific context, feature map, tech stack |
| **Package** | Package API, usage patterns, dependencies |

### Root AGENTS.md (Monorepo)

```markdown
# Monorepo - AI Agent Instructions

## Apps

| App | Purpose | Docs |
|-----|---------|------|
| web | Customer portal | `apps/web/AGENTS.md` |
| api | REST API | `apps/api/AGENTS.md` |
| mobile | iOS/Android | `apps/mobile/AGENTS.md` |

## Shared Packages

| Package | Purpose |
|---------|---------|
| shared-ui | Design system components |
| core | Business logic, types |

## Cross-App Patterns
- All apps use `packages/core` for business logic
- API contracts defined in `packages/api-types`
- See `docs/architecture.md` for system overview

## Working on a Specific App?
Navigate to that app's `AGENTS.md` for detailed context.
```

### App-Level AGENTS.md

```markdown
# Web App - AI Agent Instructions

## Quick Start
pnpm dev          # Start dev server
pnpm test         # Run tests

## Tech Stack
- Next.js 14, TypeScript, Tailwind
- Uses `@repo/shared-ui` for components
- Uses `@repo/core` for business logic

## Feature Map

| Feature | Status | Docs |
|---------|--------|------|
| Auth | Done | `docs/features/auth/` |
| Dashboard | Active | `docs/specs/dashboard/` |

## App-Specific Patterns
[Patterns unique to this app]
```

### Rule Inheritance

Rules cascade from root to specific:

```
monorepo/.cursor/rules/          # Shared rules (all apps)
├── 00-doc-lifecycle.mdc
├── 01-typescript.mdc
└── 02-testing.mdc

apps/web/.cursor/rules/          # Web-specific (extends shared)
└── 00-nextjs.mdc

apps/api/.cursor/rules/          # API-specific
└── 00-express.mdc
```

AI tools read rules from most specific scope first, then inherit shared rules.

---

## Philosophy

```
Minimalist: Only what's needed, nothing more
Flexible:   Adapt to your project, not the other way around
Reliable:   Proven patterns from established methodologies
Portable:   Works across AI tools with minimal adaptation
```

---

*This methodology evolves. Update it when you learn what works better.*
