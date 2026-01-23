# ADR-001: Implementation Flow

> Three phases, minimal required docs, AI decides what else is needed.

## Context

The original approach used file count as a heuristic (< 5 files = Standard, > 5 files = Complex). This doesn't reflect actual complexity.

## Decision

1. **Three phases**: Research → Plan → Implement
2. **Minimum docs**: `spec.md` + `tasks.md` for any feature (bug fixes need nothing)
3. **Optional docs**: Added as needed based on feature complexity
4. **AI decides**: Which optional docs to create based on the specific feature

---

## Three Phases

```
Research → Plan → Implement
    ↓         ↓        ↓
(validate) (validate) (validate)
```

Validation is a checkpoint **within each phase**, not a separate phase.

### Phase 1: Research

Explore unknowns, gather information.

- Understand what exists in the codebase
- Explore options if multiple approaches possible
- Clarify requirements with user if needed
- **Validate**: Confirm understanding before moving to Plan

**Skip when**: Approach is obvious, pattern exists.

### Phase 2: Plan

Define what to build and how.

- Write spec with acceptance criteria
- Design architecture if needed
- Define dependencies and sequence
- Break down into tasks
- **Validate**: Confirm plan with user before implementing

**Always do**: At minimum create `spec.md` + `tasks.md`.

### Phase 3: Implement

Execute step by step.

- Work in dependency order
- Update `tasks.md` after each step
- Surface blockers early
- **Validate**: Verify each task meets acceptance criteria

**After**: Create ADR if significant decision was made, then delete spec folder.

---

## Document Catalog

### Minimum Required (for any feature)

| Document | Purpose |
|----------|---------|
| `spec.md` | What to build, acceptance criteria |
| `tasks.md` | Execution checklist, progress tracking |

### Optional (add as needed)

| Document | Purpose | Add When |
|----------|---------|----------|
| `research.md` | Options explored, findings, recommendation | Evaluating libraries, unfamiliar domain, multiple approaches |
| `design.md` | Architecture, APIs, data models | New architecture, API contracts, data model changes |
| `plan.md` | Sequence, dependencies, risks | Complex dependencies, phased rollout, risk areas |
| `user-stories.md` | Test scenarios (Given/When/Then) | User-facing feature, need clear test criteria |

### Decision Records (permanent)

| Document | Purpose | Add When |
|----------|---------|----------|
| `NNN-[name].md` | Record decisions and rationale | Significant technical choice others should understand |

---

## By Complexity

| Situation | Docs Needed |
|-----------|-------------|
| **Bug fix** | None - just fix it |
| **Simple feature** | `spec.md` + `tasks.md` |
| **Medium feature** | `spec.md` + `tasks.md` + (`design.md` or `plan.md`) |
| **Complex feature** | All: `research.md`, `spec.md`, `design.md`, `plan.md`, `user-stories.md`, `tasks.md` |

---

## Folder Structure

```
project/
├── specs/                        # EPHEMERAL - delete after feature done
│   └── add-oauth/
│       ├── spec.md               # Always (for features)
│       ├── tasks.md              # Always (for features)
│       ├── research.md           # Optional
│       ├── design.md             # Optional
│       ├── plan.md               # Optional
│       └── user-stories.md       # Optional
│
├── decisions/                    # PERMANENT - never delete
│   ├── 001-implementation-flow.md
│   └── ...
│
└── AGENTS.md                     # EVERGREEN - update or delete
```

---

## AI Agent Decision Process

```
Is this a bug fix?
├─ YES → Just fix it, no docs needed
└─ NO → Continue

RESEARCH PHASE (optional):
Do I need to explore options?
├─ YES → Create research.md, validate with user
└─ NO → Continue

PLAN PHASE (required):
1. Create spec.md (what to build, acceptance criteria)
2. Create tasks.md (execution checklist)

Do I need architecture decisions?
├─ YES → Create design.md
└─ NO → Continue

Are there complex dependencies?
├─ YES → Create plan.md
└─ NO → Continue

Are there user-facing test scenarios?
├─ YES → Create user-stories.md
└─ NO → Continue

Validate plan with user before implementing.

IMPLEMENT PHASE:
1. Work through tasks.md in dependency order
2. Update progress after each task
3. Validate against acceptance criteria

AFTER IMPLEMENTATION:
Did I make a significant decision?
├─ YES → Create ADR in decisions/
└─ NO → Done

Delete specs/ folder.
```

---

## Examples

### Bug Fix: Typo in error message

**Docs**: None
**Process**: Find → Fix → Done

### Simple Feature: Add logout button

**Docs**: `spec.md`, `tasks.md`
**Process**: Plan → Implement → Delete specs/

### Medium Feature: Add search filter

**Docs**: `spec.md`, `tasks.md`, `design.md`
**Process**: Plan (with design) → Implement → Delete specs/

### Complex Feature: Add OAuth integration

**Docs**: `research.md`, `spec.md`, `design.md`, `plan.md`, `user-stories.md`, `tasks.md`
**After**: Create `decisions/002-oauth-strategy.md`
**Process**: Research → Plan → Implement → ADR → Delete specs/

---

## Implementation Order Principles

When implementing, respect dependencies:

1. **Contracts before implementation** - Define interfaces/types first
2. **Dependencies before dependents** - Build what others need first
3. **Data before logic** - Migrations/models before services
4. **Core before edge cases** - Happy path, then error handling
5. **Tests alongside** - Don't defer all testing to the end

---

## Principle: Framework, Not Prescription

**The methodology provides structure. The AI agent decides specifics.**

| Methodology Provides | AI Agent Decides |
|---------------------|------------------|
| Three phases | Which optional docs to create |
| Minimum required docs | Level of detail needed |
| Document catalog with purposes | Task granularity |
| Dependency principles | Implementation sequence |

### Why This Works

1. **Context varies** - A startup MVP needs less ceremony than enterprise software
2. **Projects differ** - Some have existing patterns, others are greenfield
3. **Features vary** - A typo fix ≠ OAuth integration
4. **AI adapts** - The agent observes what exists and adjusts

---

## Status

**Accepted**

## See Also

- Module 3: Feature Development
- FEEDBACK-AI-REVIEW.md - Original critique
