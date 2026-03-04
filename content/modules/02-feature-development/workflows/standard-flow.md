# Standard Flow (Features)

> **For features** - minimum docs: `spec.md` + `tasks.md`

---

## When to Use

Any feature that isn't a bug fix:

| Trigger | Example |
|---------|---------|
| New component | "Add search filter to user list" |
| New endpoint | "Create GET /api/users/:id endpoint" |
| UI enhancement | "Add loading spinner to submit button" |
| Feature toggle | "Add dark mode toggle" |
| Small feature | "Add 'mark all as complete' to todo list" |

**Rule**: If it's not a bug fix, create `spec.md` + `tasks.md`.

---

## Four Phases

```
Research (optional) → Plan (required) → Implement (required) → Verify (required)
```

For simple features, skip Research and go straight to Plan.

---

## Phase 1: Plan

Create minimum required docs:

### spec.md

```
specs/[feature-name]/spec.md
```

Must include:
- Problem statement
- Solution summary
- Acceptance criteria
- Scope (in/out)

### tasks.md

```
specs/[feature-name]/tasks.md
```

Must include:
- Task breakdown by category
- Progress tracking

### Optional Docs

Add if needed:
- `design.md` - architecture decisions
- `plan.md` - complex dependencies
- `user-stories.md` - test scenarios

**Validate with user before implementing.**

---

## Phase 2: Implement

### AI Agent Rules

```
1. ONE task [~] at a time (per wave, if using waves)
2. Update tasks.md after EACH task
3. Calculate progress: (completed + skipped) / total * 100
4. When blocked: Mark [B], ask for guidance
5. When done: Proceed to Verify phase
```

### Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

**Sequential (default)**: One `[~]` at a time across all tasks.

**Parallel (opt-in)**: When tasks are grouped into waves (see `tasks.md`), one `[~]` at a time per wave. Independent tasks within a wave can run in parallel. All tasks in Wave N must complete before Wave N+1 starts.

### Context Loading Order

```
1. AGENTS.md                   → Project context
2. specs/[feature]/spec.md     → Requirements
3. specs/[feature]/tasks.md    → Current status
4. Relevant skills             → Coding patterns (on-demand)
5. @docs/ references           → System knowledge (on-demand)
```

---

## Phase 3: Verify (Definition of Done)

When all tasks are `[x]` or `[S]`, create the verification checklist. This checklist **is** the Definition of Done — a single artifact that gates closeout.

### Create verify-checklist.md

```
specs/[feature-name]/verify-checklist.md
```

The checklist covers:

1. **Task Completion** — all tasks `[x]`/`[S]`, progress = 100%
2. **Acceptance Criteria** — each AC verified with concrete evidence
3. **Scope Check** — in-scope delivered, no out-of-scope creep
4. **Quality** — no linter errors, tests pass
5. **Knowledge Persistence** — affected reference docs updated, ADR created if needed
6. **Human Approval** — user signs off

Present the completed checklist to the user. Do not proceed to closeout until all checks pass and the user approves.

```
Verification complete.

**Acceptance Criteria**: All pass / Issues found
**Scope**: Clean / Creep detected
**Doc Freshness**: Up to date / Updates needed

**Next steps**: Please review. After approval, I will close out.
```

---

## After Approval (Closeout)

1. **Delete spec folder**: `specs/[feature-name]/`
2. **Create ADR** (only if significant decision was made)
3. **Update AGENTS.md** (if new patterns added)

---

## Git Workflow (Recommended)

These are recommendations, not mandates:

- **Branch per feature**: Create `feat/<spec-name>` or `fix/<spec-name>` from your main branch
- **Commit per task or wave**: Commit after each completed task or wave, not one giant commit at the end
- **Meaningful messages**: Use `type(scope): description` format (e.g., `feat(search): add filter component`)
- **Spec in branch**: Include `specs/` folder in the branch; remove during closeout
- **On closeout**: Squash-merge or merge with history — your choice

---

## When to Add More Docs

If during planning you discover:

- Need to evaluate options → add `research.md`
- Architecture decisions needed → add `design.md`
- Complex dependencies → add `plan.md`
- User-facing test scenarios → add `user-stories.md`

---

## File Structure

```
specs/
└── [feature-name]/
    ├── spec.md              # Required
    ├── tasks.md             # Required
    ├── verify-checklist.md  # Created during Verify phase
    ├── design.md            # Optional
    ├── plan.md              # Optional
    └── user-stories.md      # Optional
```
