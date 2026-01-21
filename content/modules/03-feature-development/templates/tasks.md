# Tasks: [Feature Name]

> **Template**: Copy to `docs/specs/<feature-name>/tasks.md`
> Replace all `[bracketed]` placeholders.

---

## Task Markers

| Marker | Status | Counts Toward Progress |
|--------|--------|------------------------|
| `[ ]` | Pending | No |
| `[~]` | In Progress (only ONE) | No |
| `[x]` | Completed | Yes |
| `[B]` | Blocked (include reason) | No |
| `[S]` | Skipped (include reason) | Yes |

---

## Setup

- [ ] T-01: [Setup task 1]
- [ ] T-02: [Setup task 2]

## Core Implementation

- [ ] T-03: [Implementation task 1]
- [ ] T-04: [Implementation task 2]
- [ ] T-05: [Implementation task 3]

## Testing

- [ ] T-06: [Write unit tests]
- [ ] T-07: [Write integration tests]

## Documentation

- [ ] T-08: [Update AGENTS.md if new patterns]
- [ ] T-09: [Update feature README]

---

**Progress**: 0/9 (0%)
**Blocked**: None
**In Progress**: None

---

## Notes

[Add notes as implementation progresses]

---

## AI Agent Rules

1. Only ONE task `[~]` at a time
2. Update this file after completing each task
3. Recalculate progress: `(completed + skipped) / total * 100`
4. When blocked: Mark `[B]` with reason, ask for guidance
5. When done: Signal "Ready for review" with DoD checklist
