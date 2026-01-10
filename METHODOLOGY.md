# AI-First Development Methodology

> **A lightweight, spec-driven approach for AI-assisted software development**

---

## Core Philosophy

```
Minimalist: Only what's needed, nothing more
Flexible:   Adapt to your project, not the other way around
Reliable:   Proven patterns from established methodologies
Robust:     Works for solo devs and teams alike
```

---

## The Three Pillars

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   📋 SPECS              📜 RULES              📚 REFERENCE           │
│   (What to build)       (How to build)        (What exists)          │
│                                                                      │
│   docs/                 .cursor/rules/        docs/                  │
│   ├── specs/            ├── 00-index.mdc            ├── features/    │
│   │   ├── [phase]/      ├── project-architecture.mdc├── decisions/   │
│   │   └── _archive/     ├── coding-patterns.mdc     └── INDEX.md     │
│   └── features/         ├── testing-strategy.mdc    AGENTS.md        │
│       └── */            └── state-management.mdc                     │
│           ├── README                                                 │
│           ├── stories                                                │
│           └── tasks                                                  │
│                                                                      │
│   Lifecycle:            Lifecycle:            Lifecycle:             │
│   EPHEMERAL             STABLE                EVERGREEN              │
│   (temporary - archive  (rarely changes -     (always current -      │
│    when complete)        update when patterns  update continuously)   │
│                          change)                                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
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

### 2. PRD-lite Specs (docs/specs/)
**Purpose:** Define features BEFORE building  
**Lifecycle:** Ephemeral — Created → Implemented → Archived  
**Inspired by:** Lean methodology - eliminate waste

> **What is PRD-lite?** A minimal Product Requirements Document (PRD) containing only what's needed: problem statement, scope, and user stories. Unlike heavyweight PRDs that become stale, PRD-lite specs are quick to write and archive when done.

**Folder organization options:**
- Flat: `docs/specs/<feature>.md` (for simple projects)
- Phased: `docs/specs/phase-1/`, `docs/specs/phase-2/` (for phased projects)
- Release-based: `docs/specs/v1.0/`, `docs/specs/v2.0/` (for versioned products)

```markdown
# Feature: [Name]

## Problem (1-2 sentences)
## Success Metrics
## Scope (In/Out)
## Key User Stories
## Technical Approach (if non-obvious)
## Risks → Mitigations
```

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
**Purpose:** Encode patterns AI must follow  
**Lifecycle:** Stable — updated only when patterns change  
**Format:** MDC files (Markdown for Cursor) with YAML frontmatter

> **What is MDC?** Cursor's rule file format. It's standard Markdown with a YAML header that tells the AI *when* to apply this rule:
> ```yaml
> ---
> description: When this rule applies
> globs: ["**/*.ts"]  # File patterns that trigger this rule
> ---
> ```
> 
> **Note:** While examples use Cursor's `.mdc` format, the methodology works with any AI tool. Adapt the rule format to your tool (e.g., `.md` files, `CLAUDE.md`, etc.).

```markdown
---
description: [When this rule applies]
globs: [File patterns to trigger]
alwaysApply: false
---

# Rule Name

## Conventions
[Your patterns here]
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

## Principles (What We Believe)

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
| Starting a new feature | PRD-lite + user stories | `docs/specs/` + `docs/features/` |
| Making a tech decision | ADR | `docs/decisions/` |
| Establishing a pattern | Rule file | `.cursor/rules/` |
| Tracking implementation | Tasks | `docs/features/*/tasks.md` |
| Providing AI context | AGENTS.md | Root + feature dirs |
| Onboarding developers | INDEX.md | `docs/INDEX.md` |

---

## Quick Reference

```
STARTING A FEATURE:
1. Write PRD-lite spec (problem, scope, stories)
2. Create feature folder with README + stories + tasks
3. Point AI at spec, let it build
4. Review, iterate, approve

ESTABLISHING PATTERNS:
1. Notice a pattern emerging
2. Create/update .cursor/rules/*.mdc
3. AI follows automatically from now on

MAKING DECISIONS:
1. Facing a significant choice?
2. Write ADR with context + alternatives
3. Record decision + consequences
4. AI respects decision going forward

KEEPING DOCS CURRENT:
1. AI updates docs as it builds
2. Human reviews doc changes in PR
3. Archive completed specs
4. Delete stale docs
```

---

## Tools That Support This

| Tool | Type | How It Helps |
|------|------|--------------|
| **Cursor** | IDE + Rules | Auto-loads context, follows rules |
| **Claude Code** | CLI Agent | Autonomous task execution |
| **Kiro (AWS)** | IDE | Built-in spec-driven workflow |
| **GitHub Copilot** | Suggestions | Inline assistance |
| **Any AI** | LLM | Reads your docs, provides context |

The methodology is **tool-agnostic**. Your docs work regardless of which AI tool you use.

---

*This methodology evolves. Update it when you learn what works better.*
