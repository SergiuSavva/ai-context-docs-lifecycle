---
name: feature-workflow
description: Feature workflow — Research, Plan, Implement, Verify with task tracking, parallel execution, and validation checkpoints. Use when building features, executing tasks, or managing implementation progress.
---

# Feature Workflow

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
└─ NO → Create specs/[feature-name]/spec.md + tasks.md

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
1. Does specs/[feature-name]/spec.md exist?
   ├─ YES → Read it
   └─ NO → Create it (load skill `spec-writing`), validate with user

2. Does specs/[feature-name]/tasks.md exist?
   ├─ YES → Find first non-complete task
   └─ NO → Create it from spec (load skill `spec-writing` for traceability)

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

### Task Numbering

Number tasks sequentially with the `T-XX` prefix: `T-01`, `T-02`, etc. Group tasks under phase headings (Setup, Core Implementation, Testing, Documentation). Each task is a single checklist item with its marker and number:

```markdown
- [ ] T-01: Set up database schema
- [ ] T-02: Create API route stubs
```

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

## Verify Phase (Definition of Done)

When all tasks are `[x]` or `[S]`, create `verify-checklist.md`. This checklist **is** the Definition of Done — a single artifact that gates closeout.

The checklist covers:

1. **Task Completion** — all tasks `[x]`/`[S]`, progress = 100%
2. **Acceptance Criteria** — each AC verified with concrete evidence
3. **Scope Check** — in-scope delivered, no out-of-scope creep
4. **Quality** — no linter errors, tests pass
5. **Knowledge Persistence** — affected reference docs updated, ADR created if needed
6. **Human Approval** — user signs off

Do not proceed to closeout until all checks pass and the user approves.

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
3. Delete `specs/[feature-name]/` folder (specs are ephemeral)

---

## When NOT to Use

- **Bug fixes, typos, config changes** — use Quick Flow (Find → Fix → Commit)
- **Pure exploration / brainstorming** — no structured workflow needed
- **Single-file changes** that don't need acceptance criteria

---

## Quick Checklist

- [ ] spec.md exists with problem, solution, and acceptance criteria
- [ ] tasks.md exists with phases and T-XX numbered tasks
- [ ] User validated spec before implementation started
- [ ] One `[~]` at a time (or per wave if parallel)
- [ ] tasks.md updated after each completed task
- [ ] verify-checklist.md completed (this is the Definition of Done)
- [ ] User approved the verify-checklist before closeout
- [ ] Spec folder deleted after feature approved

## Spec Templates

Templates live in `.agents/skills/feature-workflow/templates/`. When creating a new feature spec:

1. Copy `templates/spec.md` → `specs/<feature-name>/spec.md`
2. Copy `templates/tasks.md` → `specs/<feature-name>/tasks.md`
3. Add optional templates as needed: `research.md`, `plan.md`, `design.md`, `adr.md`, `verify-checklist.md`, `user-stories.md`

## Related Docs

- Spec files: @specs/[feature-name]/spec.md
- Task files: @specs/[feature-name]/tasks.md
- Decision records: @docs/decisions/
- load skill `spec-writing`
- load skill `workflow-guide`
