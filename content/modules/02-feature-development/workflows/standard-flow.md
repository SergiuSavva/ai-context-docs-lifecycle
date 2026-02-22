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

## Three Phases

```
Research (optional) → Plan (required) → Implement (required)
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
1. ONE task [~] at a time
2. Update tasks.md after EACH task
3. Calculate progress: (completed + skipped) / total * 100
4. When blocked: Mark [B], ask for guidance
5. When done: Signal "Ready for review"
```

### Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress (only ONE) |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

### Context Loading Order

```
1. AGENTS.md                   → Project context
2. specs/[feature]/spec.md     → Requirements
3. specs/[feature]/tasks.md    → Current status
4. Relevant skills             → Coding patterns (on-demand)
5. @docs/ references           → System knowledge (on-demand)
```

---

## Completion

When all tasks are done:

```
Ready for review. Implementation complete.

**DoD Checklist**:
- [x] All tasks completed (X/Y)
- [x] Acceptance criteria verified
- [ ] Human review needed

**Acceptance Criteria Status**:
- AC-01: ✓ Implemented
- AC-02: ✓ Implemented

**Next steps**: Please review and provide feedback.
```

---

## After Approval

1. **Delete spec folder**: `specs/[feature-name]/`
2. **Create ADR** (only if significant decision was made)
3. **Update AGENTS.md** (if new patterns added)

---

## Definition of Done

### Auto-Verifiable

- [ ] All tasks `[x]` or `[S]`
- [ ] No linter errors
- [ ] Progress = 100%

### Manual Verification

- [ ] Acceptance criteria verified
- [ ] Code quality acceptable

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
    ├── spec.md        # Required
    ├── tasks.md       # Required
    ├── design.md      # Optional
    ├── plan.md        # Optional
    └── user-stories.md # Optional
```
