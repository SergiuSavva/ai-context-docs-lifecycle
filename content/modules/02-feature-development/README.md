# Module 2: Feature Development

> **Structured workflows for building features** - four phases, AI decides which docs are needed.

---

## The Problem

Without structure, AI builds features chaotically:
- No clear starting point or validation checkpoints
- Progress invisible (is it 20% done or 80%?)
- Decisions made and forgotten
- No way to resume after interruption

**The solution**: A structured workflow with task tracking, verification, and user validation.

---

## What This Module Does

Provides a structured workflow for AI agents: **Research → Plan → Implement → Verify**. The AI decides which documents to create based on feature complexity.

## When to Use

- Building any feature (simple or complex)
- Want structured task tracking
- Need clear handoffs between AI and human review
- Want decisions documented for future reference

---

## Four Phases

```
Research → Plan → Implement → Verify
(optional)  (required)  (required)  (required)
```

Each phase includes validation checkpoints with the user.

| Phase | Purpose | When |
|-------|---------|------|
| **Research** | Explore unknowns, evaluate options | Multiple approaches possible |
| **Plan** | Define what to build, break into tasks | Always (for features) |
| **Implement** | Execute step by step | Always |
| **Verify** | Confirm implementation matches spec | Always (after tasks complete) |

---

## Document Catalog

### Minimum Required (for any feature)

| Document | Purpose |
|----------|---------|
| `spec.md` | What to build, acceptance criteria |
| `tasks.md` | Execution checklist, progress tracking |

### Verification (created during Verify phase)

| Document | Purpose |
|----------|---------|
| `verify-checklist.md` | Cross-references acceptance criteria against implementation |

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
│       ├── verify-checklist.md   # Created during Verify phase
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
5. Verify against acceptance criteria
6. Delete spec folder

**Templates**:
- [`spec.md`](./skills/feature-workflow/templates/spec.md)
- [`tasks.md`](./skills/feature-workflow/templates/tasks.md)

See: [`workflows/standard-flow.md`](./workflows/standard-flow.md)

---

## Complex Flow (Research Required)

**For**: Features requiring research or evaluation

**Process**:
1. Research phase with `research.md`
2. Plan phase with all docs
3. Validate with user
4. Implement with task tracking
5. Verify against acceptance criteria
6. Create ADR for key decisions
7. Delete spec folder

**Templates** (in `.agents/skills/feature-workflow/templates/`):
- [`research.md`](./skills/feature-workflow/templates/research.md)
- [`spec.md`](./skills/feature-workflow/templates/spec.md)
- [`design.md`](./skills/feature-workflow/templates/design.md)
- [`plan.md`](./skills/feature-workflow/templates/plan.md)
- [`user-stories.md`](./skills/feature-workflow/templates/user-stories.md)
- [`tasks.md`](./skills/feature-workflow/templates/tasks.md)
- [`verify-checklist.md`](./skills/feature-workflow/templates/verify-checklist.md)

See: [`workflows/complex-flow.md`](./workflows/complex-flow.md)

---

## Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

**Progress**: `(completed + skipped) / total * 100`

**Sequential (default)**: One `[~]` at a time. **Parallel (opt-in)**: Group tasks into waves for concurrent execution — one `[~]` per wave.

---

## Examples

- [`examples/simple-todo/`](./examples/simple-todo/README.md) - Simple feature walkthrough
- [`examples/complex-auth/`](./examples/complex-auth/README.md) - Complex feature walkthrough

---

## Principle: AI Decides

The methodology provides structure. The AI agent decides specifics:

| Methodology Provides | AI Agent Decides |
|---------------------|------------------|
| Four phases | Which optional docs to create |
| Document catalog | Level of detail needed |
| Task markers + wave grouping | Task granularity and parallelism |
| Verification checklist | Level of evidence per criterion |

---

## Doc Freshness Rule

After implementation, update any `docs/` files affected by the change (only applicable for docs that exist in the project):

| When | Update (if doc exists) |
|------|------------------------|
| Data schema/model change | `docs/data-model.md` |
| API/action surface change | `docs/api.md` |
| Architecture change | `docs/architecture.md` + create ADR |
| Auth flow change | `docs/auth.md` |

Not every project has every doc. Update only the docs your project maintains. This keeps Module 1's reference layer fresh. Docs update in the same PR as the code change.

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

## Skills (Feature Development)

This module provides three self-contained skills that teach AI agents how to execute the feature workflow. Each skill carries its own templates.

| Skill | Purpose |
|-------|---------|
| `workflow-guide` | **Start here if unsure.** Inspects project state, recommends next action, routes to other skills |
| `feature-workflow` | Four-phase workflow (Research → Plan → Implement → Verify), task markers, parallel waves, git workflow, verification. Includes all 8 spec templates. |
| `spec-writing` | Spec and task authoring — problem framing, acceptance criteria, scoping, task breakdown |

### Setup

**CLI (recommended):**

```bash
npx @acdl/cli init  # select Module 2 in the prompt
```

**Manual (portable):**

```bash
cp -r skills/feature-workflow .agents/skills/
cp -r skills/spec-writing .agents/skills/
cp -r skills/workflow-guide .agents/skills/
```

The `feature-workflow` skill includes a `cursor-bridge.mdc` file. The CLI installs it to `.cursor/rules/feature-workflow.mdc` automatically.

---

## Prerequisites

- [Module 1: Project Context](../01-project-context/README.md) — AGENTS.md + docs/ for project context

## What's Next?

- [Module 3: Project Planning](../03-project-planning/README.md) — Multi-feature management and roadmaps
