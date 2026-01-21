# Documentation Structure

> **Where docs live and what they contain.**

---

## Overview

```
your-project/
├── AGENTS.md                    # AI context (ROOT)
│
├── docs/
│   ├── INDEX.md                # Human navigation
│   │
│   ├── features/               # How code works (evergreen)
│   │   ├── auth/
│   │   │   └── README.md
│   │   └── bookings/
│   │       └── README.md
│   │
│   ├── decisions/              # Why we decided (permanent)
│   │   ├── 001-database.md
│   │   └── 002-auth-provider.md
│   │
│   └── specs/                  # Active work (ephemeral)
│       ├── <feature>/
│       │   ├── feature-spec.md
│       │   └── tasks.md
│       └── _archive/           # Completed specs
│
└── .cursor/rules/              # AI rules
    └── reference-freshness.mdc
```

---

## Document Types

### AGENTS.md (Root)

**Purpose**: Quick context for AI agents
**Location**: Project root
**Audience**: AI agents (primary), developers (secondary)
**Lifecycle**: Evergreen - always current

**Contains**:
- Quick start commands
- Tech stack overview
- File organization
- Key patterns
- Common gotchas

---

### docs/INDEX.md

**Purpose**: Navigation hub for humans
**Location**: docs/INDEX.md
**Audience**: Human developers
**Lifecycle**: Evergreen - update when docs change

**Contains**:
- Quick links to important docs
- Feature documentation index
- Decision record index
- Getting started links

---

### docs/features/<feature>/README.md

**Purpose**: Document how a feature works
**Location**: docs/features/<feature-name>/README.md
**Audience**: Developers (human and AI)
**Lifecycle**: Evergreen - update or delete

**Contains**:
- Feature overview
- How it works (with diagrams)
- Code touchpoints (file locations)
- Usage examples
- Related ADRs and features

---

### docs/decisions/<NNN>-<title>.md (ADR)

**Purpose**: Record why decisions were made
**Location**: docs/decisions/NNN-slug.md
**Audience**: Future developers
**Lifecycle**: Permanent - never modify

**Contains**:
- Context (problem and constraints)
- Decision (what we chose)
- Rationale (why)
- Consequences (trade-offs)
- Alternatives considered

---

### docs/specs/<feature>/ (Active Work)

**Purpose**: Plan and track feature development
**Location**: docs/specs/<feature-name>/
**Audience**: AI agents during development
**Lifecycle**: Ephemeral - delete after completion

**Contains**:
- feature-spec.md - Requirements
- tasks.md - Implementation checklist
- research.md - Research notes (Complex Flow)
- user-stories.md - Acceptance criteria (Complex Flow)

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|------------|---------|
| Feature folder | kebab-case | `user-auth/`, `space-booking/` |
| Feature README | README.md | `docs/features/auth/README.md` |
| ADR | NNN-kebab-case.md | `001-database-choice.md` |
| Spec folder | kebab-case | `oauth-authentication/` |

### ADR Numbering

- Start at 001
- Increment sequentially
- Never reuse numbers
- Gaps are OK (deleted drafts)

---

## When to Create What

| Scenario | Document |
|----------|----------|
| Starting a new feature | `docs/specs/<feature>/feature-spec.md` |
| Feature complete | `docs/features/<feature>/README.md` |
| Made a significant decision | `docs/decisions/NNN-<title>.md` |
| New pattern established | Update `AGENTS.md` Key Patterns |
| File structure changed | Update `AGENTS.md` File Organization |

---

## Cross-Linking

Use relative links between docs:

```markdown
<!-- In Feature README -->
Related: [ADR-015](../../decisions/015-auth-provider.md)

<!-- In ADR -->
Implementation: [Auth Feature](../features/auth/README.md)

<!-- In AGENTS.md -->
See: `docs/features/auth/` for auth patterns
```

---

## Archive Structure

Completed specs can be archived:

```
docs/specs/_archive/
├── oauth-auth/           # Completed feature
│   ├── feature-spec.md
│   ├── research.md
│   ├── user-stories.md
│   └── tasks.md
└── space-booking/        # Another completed feature
    └── ...
```

Or simply deleted (ADR captures the important decisions).
