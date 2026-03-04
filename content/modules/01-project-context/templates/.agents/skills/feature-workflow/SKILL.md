---
name: feature-workflow
description: Feature workflow — Research, Plan, Implement, Verify with task tracking, parallel execution, and validation checkpoints. Use when building features, executing tasks, or managing implementation progress.
---

# Feature Workflow

> **References:** Implementation flow → @docs/decisions/001-implementation-flow.md

## Four Phases

```
Research → Plan → Implement → Verify
(optional)  (required)  (required)  (required)
```

| Phase | Purpose | When |
|-------|---------|------|
| **Research** | Explore unknowns, evaluate options | Multiple approaches possible |
| **Plan** | Define what to build, break into tasks | Always (for features) |
| **Implement** | Execute step by step | Always |
| **Verify** | Confirm implementation matches spec | Always (after tasks complete) |

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
| `[~]` | In Progress |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

**Progress formula**: `(completed + skipped) / total * 100`

### Sequential vs Parallel

- **Sequential (default)**: One `[~]` at a time across all tasks
- **Parallel (opt-in)**: Tasks grouped into waves (`### Wave N` headers). One `[~]` per wave. All tasks in Wave N must complete before Wave N+1 starts.

---

## During Implementation

1. **One `[~]` at a time** (sequential) or **one `[~]` per wave** (parallel)
2. **Update tasks.md after EACH task** — track progress continuously
3. **Commit after each task or wave** — not one giant commit at the end
4. **Calculate progress** after each update
5. **When blocked** — mark `[B]` with reason, ask user for help

---

## Verify Phase

When all tasks are `[x]` or `[S]`, create `verify-checklist.md`:

1. Cross-reference each acceptance criterion with concrete evidence
2. Check scope (nothing missed, no creep)
3. Verify affected reference docs are updated
4. Check if ADR is needed

Present the completed checklist to the user for approval.

```
Verification complete.

**Progress**: X/Y tasks (100%)
**Acceptance Criteria**: All pass / Issues found
**Doc Freshness**: Up to date / Updates needed

**Next steps**: Please review. After approval, I will close out.
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

## Git Workflow (Recommended)

- **Branch per feature**: `feat/<spec-name>` or `fix/<spec-name>`
- **Commit per task or wave**: Not one giant commit at the end
- **Message format**: `type(scope): description`
- **Spec in branch**: Include `specs/` folder; remove during closeout

---

## After Approval (Closeout)

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
- [ ] One `[~]` at a time (or per wave if parallel)
- [ ] tasks.md updated after each completed task
- [ ] User validated spec before implementation started
- [ ] verify-checklist.md completed after all tasks done
- [ ] Docs updated if code changed data model, API, or architecture
- [ ] Spec folder deleted after feature approved

## Related Docs

- Spec template: @specs/[feature]/spec.md
- Task template: @specs/[feature]/tasks.md
- Decision records: @docs/decisions/
- load skill `spec-writing`
