# Tasks: {{Feature Name}}

> **Template**: Copy to `specs/{{feature-name}}/tasks.md`
> Replace all `{{bracketed}}` placeholders.

---

## Task Markers

| Marker | Status | Counts Toward Progress |
|--------|--------|------------------------|
| `[ ]` | Pending | No |
| `[~]` | In Progress | No |
| `[x]` | Completed | Yes |
| `[B]` | Blocked (include reason) | No |
| `[S]` | Skipped (include reason) | Yes |

---

## Phase 1: {{Core / Foundation}}

> **Goal**: {{What this phase establishes — the core that everything else depends on}}
> **Covers**: AC-01, AC-02

- [ ] T-01: {{Core setup / schema / data model}}
- [ ] T-02: {{Core implementation}}
- [ ] T-03: {{Tests for core behavior}}

**Phase 1 Validation**: {{How to confirm — e.g., "unit tests pass", "API returns expected response"}}

---

## Phase 2: {{Dependent Feature}}

> **Goal**: {{What this phase builds on top of Phase 1}}
> **Covers**: AC-03
> **Depends on**: Phase 1 validated

- [ ] T-04: {{Implementation task}}
- [ ] T-05: {{Implementation task}}
- [ ] T-06: {{Tests for this phase}}

**Phase 2 Validation**: {{How to confirm}}

---

## Phase 3: {{Polish / Integration}}

> **Goal**: {{Final integration, edge cases, docs}}
> **Covers**: AC-04 (if applicable)
> **Depends on**: Phase 2 validated

- [ ] T-07: {{Integration tests / edge cases}}
- [ ] T-08: {{Documentation updates}}

**Phase 3 Validation**: {{How to confirm}}

---

**Progress**: 0/8 (0%)
**Current Phase**: Phase 1
**Blocked**: None
**In Progress**: None

---

## Notes

{{Add notes as implementation progresses}}

---

## AI Agent Rules

1. One `[~]` at a time (sequential) or one `[~]` per wave (parallel)
2. Update this file after completing each task
3. Recalculate progress: `(completed + skipped) / total * 100`
4. **Complete all tasks in a phase before running its validation**
5. **Do not start the next phase until validation passes and user confirms**
6. When blocked: Mark `[B]` with reason, ask for guidance
7. When all phases validated: Proceed to Verify phase (`verify-checklist.md`)

---

## Wave Grouping (Optional)

For features with independent subtasks, group tasks into waves for parallel execution. Tasks within a wave are independent and can run concurrently. All tasks in Wave N must complete before Wave N+1 starts.

**When to use waves**: Multiple independent streams (e.g., API + UI + tests), or tasks with clear dependency boundaries.

**Default (no waves)**: Sequential execution — one `[~]` at a time across all tasks.

Example:

```markdown
### Wave 1 (parallel)
- [ ] T-01: Set up database schema
- [ ] T-02: Create API route stubs
- [ ] T-03: Set up component scaffolding

### Wave 2 (depends on Wave 1)
- [ ] T-04: Implement CRUD endpoints
- [ ] T-05: Build form components

### Wave 3 (depends on Wave 2)
- [ ] T-06: Integration tests
- [ ] T-07: Documentation
```
