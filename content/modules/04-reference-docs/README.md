# Module 4: Reference Docs

> **Evergreen documentation structure** - always current, never stale.

---

## The Problem

Documentation rots. Within weeks of writing, docs become:
- Outdated (code changed, docs didn't)
- Misleading (worse than no docs)
- Ignored (developers stop trusting them)

**The solution**: Every doc is either current or deleted. No stale docs allowed.

---

## What This Module Does

Provides templates and rules for maintaining documentation that AI agents and humans can rely on. Documents are either **current** or **deleted** - no stale docs allowed.

## When to Use

- Want structured, navigable documentation
- Need AI to understand your codebase beyond code
- Want documentation that stays accurate
- Have a team that needs shared knowledge

## What You Get

```
your-project/
├── AGENTS.md                    # AI context (quick reference)
├── docs/
│   ├── INDEX.md                # Navigation hub for humans
│   ├── features/               # How code works
│   │   └── <feature>/
│   │       └── README.md
│   └── decisions/              # Why we decided (ADRs)
│       └── NNN-<decision>.md
└── .cursor/rules/
    └── reference-freshness.mdc  # Freshness enforcement rule
```

---

## The Three Document Types

| Type | Location | Purpose | Lifecycle |
|------|----------|---------|-----------|
| **AGENTS.md** | Root | Quick AI context | Evergreen (always current) |
| **Feature READMEs** | docs/features/ | How features work | Evergreen (update or delete) |
| **ADRs** | docs/decisions/ | Why decisions were made | Permanent (never change) |

---

## Core Principle: Update or Delete

**Stale documentation is worse than no documentation.**

Every reference doc must be:
- **Current**: Reflects actual system state
- **Useful**: Provides value to readers
- **Maintained**: Updated when code changes

If a doc is not current, either **update it** or **delete it**.

---

## AGENTS.md

The primary context file for AI agents. Should be readable in < 2 minutes.

### Core Sections

1. **Overview** - What this does (1-2 sentences)
2. **Tech Stack** - Technologies and versions (table)
3. **Commands** - Install, dev, test, build
4. **Structure** - File organization (tree)
5. **Context Loading** - References to detailed docs
6. **Boundaries** - Always / Ask First / Never rules

### Update Triggers

| Event | Update Section |
|-------|----------------|
| New tech added | Tech Stack |
| File structure changed | Structure |
| New context sources | Context Loading |
| New boundary rules | Boundaries |
| Complex Flow complete | Feature map (if present) |

See: [Module 1 AGENTS.md Templates](../01-quick-start/templates/)

---

## Feature READMEs

Document how features work for both humans and AI.

### Structure

```markdown
# Feature: [Name]

## Overview
[What this feature does]

## How It Works
[Brief explanation, diagrams if helpful]

## Code Touchpoints
[List of main files]

## Usage
[Code examples if applicable]

## Related
[Links to ADRs, other features]
```

### Update Triggers

| Event | Action |
|-------|--------|
| Feature implemented | Create README |
| Behavior changed | Update "How It Works" |
| Files moved/renamed | Update "Code Touchpoints" |
| Feature deprecated | Add deprecation notice or delete |

See: [`templates/feature-readme.md`](./templates/feature-readme.md)

---

## docs/INDEX.md

Navigation hub for human developers.

### Structure

```markdown
# Documentation Index

## Quick Links
- [AGENTS.md](../AGENTS.md) - AI context
- [Getting Started](./guides/getting-started.md)

## Features
- [Auth](./features/auth/) - Authentication system
- [Bookings](./features/bookings/) - Booking management

## Decisions
- [ADR-001](./decisions/001-database-choice.md) - Database choice
- [ADR-002](./decisions/002-auth-provider.md) - Auth provider
```

See: [`templates/docs-index.md`](./templates/docs-index.md)

---

## Diagrams

Use Mermaid for all diagrams (docs as code).

### Common Patterns

See: [`diagrams.md`](./diagrams.md)

- Flowcharts for processes
- Sequence diagrams for interactions
- Entity diagrams for data models

---

## Freshness Rules

See: [`freshness.md`](./freshness.md)

Key rules:
1. AGENTS.md is always current (source of truth)
2. Feature READMEs updated when features change
3. ADRs are immutable (never update, only supersede)
4. Delete docs that are no longer accurate

---

## Cursor Rule

Copy [`templates/.cursor/rules/reference-freshness.mdc`](./templates/.cursor/rules/reference-freshness.mdc) to enforce freshness during AI workflows.

---

## Prerequisites

- [Module 1: Quick Start](../01-quick-start/) - Basic AGENTS.md
- [Module 3: Feature Development](../03-feature-development/) - For ADR creation

## What's Next?

- [Module 5: Project Planning](../05-project-planning/) - Backlog and roadmap management
