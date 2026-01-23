# Plan: [Feature Name]

> **Template**: Copy to `specs/[feature-name]/plan.md`
> Use when there are complex dependencies, phased rollout, or significant risks.

---

## Implementation Phases

### Phase 1: [Name] (e.g., Setup/Foundation)

**Goal**: [What this phase accomplishes]

**Tasks**:
- T-01: [Task]
- T-02: [Task]

**Depends on**: Nothing (starting point)

---

### Phase 2: [Name] (e.g., Core Implementation)

**Goal**: [What this phase accomplishes]

**Tasks**:
- T-03: [Task]
- T-04: [Task]

**Depends on**: Phase 1

---

### Phase 3: [Name] (e.g., Integration)

**Goal**: [What this phase accomplishes]

**Tasks**:
- T-05: [Task]
- T-06: [Task]

**Depends on**: Phase 1, Phase 2

---

## Dependency Graph

```
Phase 1 (Setup)
    │
    ▼
Phase 2 (Core)
    │
    ▼
Phase 3 (Integration)
    │
    ▼
Phase 4 (Testing)
```

Or for parallel work:

```
        Phase 1 (Setup)
           │
     ┌─────┴─────┐
     ▼           ▼
Phase 2A      Phase 2B
(Backend)    (Frontend)
     │           │
     └─────┬─────┘
           ▼
     Phase 3 (Integration)
```

---

## Critical Path

The minimum sequence that must complete:

1. [Step 1] - blocks everything
2. [Step 2] - blocks integration
3. [Step 3] - blocks deployment

---

## Risk Areas

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Action] | [Who] |
| [Risk 2] | High/Med/Low | High/Med/Low | [Action] | [Who] |

---

## Checkpoints

| Checkpoint | Criteria | When |
|------------|----------|------|
| Phase 1 complete | [What must be true] | After T-02 |
| Ready for integration | [What must be true] | After Phase 2 |
| Ready for review | [What must be true] | After all phases |

---

## Rollback Plan

If implementation fails:

1. [Step to revert]
2. [Step to restore]
3. [Communication needed]

---

## Related Docs

- [spec.md](./spec.md) - What we're building
- [design.md](./design.md) - Architecture decisions
- [tasks.md](./tasks.md) - Detailed task tracking

---

*Status: Draft | Approved*
