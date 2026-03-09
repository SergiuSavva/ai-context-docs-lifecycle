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

## Setup

- [ ] T-01: {{Setup task 1}}
- [ ] T-02: {{Setup task 2}}

## Core Implementation

- [ ] T-03: {{Implementation task 1}}
- [ ] T-04: {{Implementation task 2}}
- [ ] T-05: {{Implementation task 3}}

## Testing

- [ ] T-06: {{Write unit tests}}
- [ ] T-07: {{Write integration tests}}

## Documentation

- [ ] T-08: {{Update AGENTS.md if new patterns}}
- [ ] T-09: {{Update feature README}}

---

**Progress**: 0/9 (0%)
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
4. When blocked: Mark `[B]` with reason, ask for guidance
5. When all tasks done: Proceed to Verify phase (`verify-checklist.md`)

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
