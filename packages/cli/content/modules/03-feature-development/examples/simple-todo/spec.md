# Spec: Mark All Complete Button

> **Example**: Filled-in spec demonstrating a simple feature.

---

## Problem

Users have no way to complete all todos at once. When they have many completed items, they must click each one individually, which is tedious and time-consuming.

---

## Solution

Add a "Mark all as complete" button above the todo list that completes all pending todos with a single click, after confirmation.

---

## Acceptance Criteria

- [ ] AC-01: Button visible when 2+ incomplete todos exist
- [ ] AC-02: Clicking button marks all todos as complete
- [ ] AC-03: Button shows confirmation dialog before action
- [ ] AC-04: Button is disabled when no incomplete todos

---

## Scope

### In Scope

- "Mark all as complete" button component
- Confirmation dialog before action
- Button visibility logic (show when 2+ incomplete)
- Button disabled state (when no incomplete todos)

### Out of Scope

- Undo functionality (future feature)
- Selective bulk actions (future feature)
- Keyboard shortcuts (future feature)

---

## Technical Approach

- Create new `MarkAllCompleteButton` component
- Create reusable `ConfirmDialog` component
- Add `markAllComplete` function to `useTodos` hook
- Update `TodoList` to include the button

---

## Risks

| Risk | Mitigation |
|------|------------|
| Accidental completion | Confirmation dialog required |
| Performance with many todos | Batch update in single state change |

---

## Dependencies

- None (uses existing todo state management)

---

## Related Docs

- [tasks.md](./tasks.md)

---

*Status: Implementing*
