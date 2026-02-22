---
name: feature-workflow
description: Three-phase feature workflow — Research, Plan, Implement with task tracking and validation checkpoints. Use when building features, executing tasks, or managing implementation progress.
---

# Feature Workflow

> **References:** Implementation flow → @docs/decisions/001-implementation-flow.md

## Three Phases

```
Research → Plan → Implement
(optional)  (required)  (required)
```

| Phase | Purpose | When |
|-------|---------|------|
| **Research** | Explore unknowns, evaluate options | Multiple approaches possible |
| **Plan** | Define what to build, break into tasks | Always (for features) |
| **Implement** | Execute step by step | Always |

Each phase ends with a **user validation checkpoint** before proceeding.

---

## Decision Tree

```
Is this a bug fix?
├─ YES → Quick Flow: Find → Fix → Commit → Done (no docs)
└─ NO → Create specs/[feature]/spec.md + tasks.md

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

## Before Starting

```
1. Does specs/[feature]/spec.md exist?
   ├─ YES → Read it
   └─ NO → Create it, validate with user

2. Does specs/[feature]/tasks.md exist?
   ├─ YES → Find first non-complete task
   └─ NO → Create it from spec

3. Is there a task marked [~]?
   ├─ YES → Continue that task
   └─ NO → Mark next pending [~]
```

---

## Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress (only ONE at a time) |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

**Progress formula**: `(completed + skipped) / total * 100`

---

## During Implementation

1. **ONE task `[~]` at a time** — never mark multiple in progress
2. **Update tasks.md after EACH task** — track progress continuously
3. **Calculate progress** after each update
4. **When blocked** — mark `[B]` with reason, ask user for help

---

## Completion Signal

When all tasks are done, output:

```
Ready for review. Implementation complete.

**Progress**: X/Y tasks (100%)
**Acceptance Criteria**: All verified

**Next steps**: Please review.
```

---

## Doc Freshness Rule

After implementation, update any `docs/` files affected by the change (only applicable for docs that exist in the project):

| Change | Update (if doc exists) |
|--------|------------------------|
| Data schema/model change | `docs/data-model.md` |
| API/action surface change | `docs/api.md` |
| Architecture change | `docs/architecture.md` + create ADR |
| Auth flow change | `docs/auth.md` |

Not every project has every doc. Update only the docs your project maintains. Update docs in the same PR as the code change.

---

## After Approval

1. Create ADR in `docs/decisions/` (if significant decision was made)
2. Update AGENTS.md (if new patterns emerged)
3. Delete `specs/[feature]/` folder (specs are ephemeral)

---

## When NOT to Use

- **Bug fixes, typos, config changes** — use Quick Flow (Find → Fix → Commit)
- **Pure exploration / brainstorming** — no structured workflow needed
- **Single-file changes** that don't need acceptance criteria

---

## Quick Checklist

- [ ] spec.md exists with problem, solution, and acceptance criteria
- [ ] tasks.md exists with phases and T-XX numbered tasks
- [ ] Only ONE task marked `[~]` at any time
- [ ] tasks.md updated after each completed task
- [ ] User validated spec before implementation started
- [ ] Docs updated if code changed data model, API, or architecture
- [ ] Spec folder deleted after feature approved

## Related Docs

- Spec template: @specs/[feature]/spec.md
- Task template: @specs/[feature]/tasks.md
- Decision records: @docs/decisions/
- load skill `spec-writing`
