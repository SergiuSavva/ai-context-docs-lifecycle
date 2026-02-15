# Module 3: Feature Development

> **Structured workflows for building features** - three phases, AI decides which docs are needed.

---

## The Problem

Without structure, AI builds features chaotically:
- No clear starting point or validation checkpoints
- Progress invisible (is it 20% done or 80%?)
- Decisions made and forgotten
- No way to resume after interruption

**The solution**: A three-phase workflow with task tracking and user validation.

---

## What This Module Does

Provides a three-phase workflow for AI agents: **Research → Plan → Implement**. The AI decides which documents to create based on feature complexity.

## When to Use

- Building any feature (simple or complex)
- Want structured task tracking
- Need clear handoffs between AI and human review
- Want decisions documented for future reference

---

## Three Phases

```
Research → Plan → Implement
(optional)  (required)  (required)
```

Each phase includes validation checkpoints with the user.

| Phase | Purpose | When |
|-------|---------|------|
| **Research** | Explore unknowns, evaluate options | Multiple approaches possible |
| **Plan** | Define what to build, break into tasks | Always (for features) |
| **Implement** | Execute step by step | Always |

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
| `research.md` | Options explored, recommendation | Evaluating libraries, unfamiliar domain |
| `design.md` | Architecture, APIs, data models | System design needed |
| `plan.md` | Sequence, dependencies, risks | Complex dependencies |
| `user-stories.md` | Test scenarios (Given/When/Then) | User-facing feature |

### Decision Records (permanent)

| Document | Purpose | Add When |
|----------|---------|----------|
| ADR | Record decisions and rationale | Significant technical choice |

---

## Folder Structure

```
project/
├── specs/                        # EPHEMERAL - delete after feature done
│   └── [feature-name]/
│       ├── spec.md               # Required
│       ├── tasks.md              # Required
│       ├── research.md           # Optional
│       ├── design.md             # Optional
│       ├── plan.md               # Optional
│       └── user-stories.md       # Optional
│
├── docs/                         # PERMANENT - never delete
│   └── decisions/
│       └── NNN-[decision].md
│
└── AGENTS.md                     # EVERGREEN - update or delete
```

---

## Decision Tree

```
Is this a bug fix?
├─ YES → Just fix it (no docs needed)
└─ NO → Create spec.md + tasks.md

    Do I need to evaluate options?
    ├─ YES → Add research.md (Research phase)
    └─ NO → Continue

    Do I need architecture decisions?
    ├─ YES → Add design.md
    └─ NO → Continue

    Are there complex dependencies?
    ├─ YES → Add plan.md
    └─ NO → Continue

    Validate with user → Implement
```

---

## Quick Flow (Bug Fixes)

**For**: Bug fixes, typos, config changes

**Process**: Find → Fix → Commit → Done

**No docs needed.**

See: [`workflows/quick-flow.md`](./workflows/quick-flow.md)

---

## Standard Flow (Features)

**For**: Any feature that isn't a bug fix

**Process**:
1. Create `spec.md` + `tasks.md`
2. Add optional docs if needed
3. Validate with user
4. Implement with task tracking
5. Delete spec folder

**Templates**:
- [`templates/spec.md`](./templates/spec.md)
- [`templates/tasks.md`](./templates/tasks.md)

See: [`workflows/standard-flow.md`](./workflows/standard-flow.md)

---

## Complex Flow (Research Required)

**For**: Features requiring research or evaluation

**Process**:
1. Research phase with `research.md`
2. Plan phase with all docs
3. Validate with user
4. Implement with task tracking
5. Create ADR for key decisions
6. Delete spec folder

**Templates**:
- [`templates/research.md`](./templates/research.md)
- [`templates/spec.md`](./templates/spec.md)
- [`templates/design.md`](./templates/design.md)
- [`templates/plan.md`](./templates/plan.md)
- [`templates/user-stories.md`](./templates/user-stories.md)
- [`templates/tasks.md`](./templates/tasks.md)

See: [`workflows/complex-flow.md`](./workflows/complex-flow.md)

---

## Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress (only ONE at a time) |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

**Progress**: `(completed + skipped) / total * 100`

---

## Examples

- [`examples/simple-todo/`](./examples/simple-todo/README.md) - Simple feature walkthrough
- [`examples/complex-auth/`](./examples/complex-auth/README.md) - Complex feature walkthrough

---

## Principle: AI Decides

The methodology provides structure. The AI agent decides specifics:

| Methodology Provides | AI Agent Decides |
|---------------------|------------------|
| Three phases | Which optional docs to create |
| Document catalog | Level of detail needed |
| Task markers | Task granularity |

---

## Doc Freshness Rule

After implementation, update any `docs/` files affected by the change:

| When | Update |
|------|--------|
| New table added | `docs/data-model.md` |
| New API endpoint / Server Action | `docs/api.md` |
| Architecture change | `docs/architecture.md` + create ADR |
| Auth flow change | `docs/auth.md` |

This keeps Module 1's reference layer fresh. Docs update in the same PR as the code change.

---

## AGENTS.md Integration

Add feature specs to your Context Loading section:

```markdown
## Context Loading

| Task | Read First |
|------|------------|
| Current feature | @specs/[feature]/spec.md |
| Task status | @specs/[feature]/tasks.md |
```

---

## Workflow as a Skill or Rule

You can set up the feature workflow in two ways:

**Option A: Cursor Rule** (Cursor-specific, auto-loads on `specs/**`):

```bash
cp templates/.cursor/rules/feature-workflow.mdc .cursor/rules/
```

**Option B: Agent Skill** (portable, works with any AI agent):

Create `.agents/skills/feature-workflow/SKILL.md` with the three-phase workflow, task markers, and spec templates. See [Module 2: Skills](../02-skills/README.md) for the SKILL.md format.

---

## Prerequisites

- [Module 1: Project Context](../01-project-context/README.md) — AGENTS.md + docs/ for project context

## What's Next?

- [Module 4: Project Planning](../04-project-planning/README.md) — Multi-feature management and roadmaps
