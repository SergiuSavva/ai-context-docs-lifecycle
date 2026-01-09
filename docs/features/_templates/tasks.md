# Tasks: [Feature Name]

## Summary

| Phase | Tasks | Done | Progress |
|-------|-------|------|----------|
| Setup | 3 | 0 | 0% |
| Core | 5 | 0 | 0% |
| Polish | 2 | 0 | 0% |
| **Total** | **10** | **0** | **0%** |

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]` | Not started |
| `[~]` | In progress |
| `[x]` | Complete |
| `[!]` | Blocked |

---

## Phase 1: Setup

### Foundation tasks

- [ ] **FEAT-001**: Create feature directory structure
  - Priority: P0
  - Files: `features/[feature]/`
  - Depends: None
  - Estimate: 1h

- [ ] **FEAT-002**: Set up types and interfaces
  - Priority: P0
  - Files: `features/[feature]/types.ts`
  - Depends: FEAT-001
  - Estimate: 2h

- [ ] **FEAT-003**: Create API client/hooks
  - Priority: P0
  - Files: `features/[feature]/hooks/`
  - Depends: FEAT-002
  - Estimate: 3h

---

## Phase 2: Core Implementation

### Main functionality

- [ ] **FEAT-004**: Implement main component
  - Priority: P0
  - Files: `features/[feature]/components/MainComponent.tsx`
  - Depends: FEAT-003
  - User Story: US-001
  - Estimate: 4h

- [ ] **FEAT-005**: Implement list/grid view
  - Priority: P0
  - Files: `features/[feature]/components/ListView.tsx`
  - Depends: FEAT-004
  - User Story: US-001
  - Estimate: 3h

- [ ] **FEAT-006**: Implement detail view
  - Priority: P1
  - Files: `features/[feature]/components/DetailView.tsx`
  - Depends: FEAT-004
  - User Story: US-002
  - Estimate: 4h

- [ ] **FEAT-007**: Implement form/create flow
  - Priority: P1
  - Files: `features/[feature]/components/CreateForm.tsx`
  - Depends: FEAT-004
  - User Story: US-003
  - Estimate: 5h

- [ ] **FEAT-008**: Add page routes
  - Priority: P0
  - Files: `app/[feature]/page.tsx`, `app/[feature]/[id]/page.tsx`
  - Depends: FEAT-005, FEAT-006
  - Estimate: 2h

---

## Phase 3: Polish

### UX improvements

- [ ] **FEAT-009**: Add loading states
  - Priority: P2
  - Files: All components
  - Depends: Phase 2
  - Estimate: 2h

- [ ] **FEAT-010**: Add error handling
  - Priority: P2
  - Files: All components
  - Depends: Phase 2
  - Estimate: 2h

---

## Blocked Tasks

| Task | Blocked By | Notes |
|------|------------|-------|
| - | - | - |

---

## Completed Tasks

| Task | Completed | Notes |
|------|-----------|-------|
| - | - | - |

---

## Notes

### Technical Decisions
- [Decision 1]
- [Decision 2]

### Known Issues
- [Issue 1]

### Future Considerations
- [Future task that's out of scope]

---

## Related Documents

- [Feature README](./README.md)
- [User Stories](./user-stories.md)
- [Global Tasks](../../TASKS.md)

---

*Last updated: [Date]*
