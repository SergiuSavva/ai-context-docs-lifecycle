# Tasks: Mark All Complete

> **Example**: This shows tasks.md after implementation is complete.

---

## UI Components

- [x] T-01: Create MarkAllCompleteButton component
- [x] T-02: Create ConfirmDialog component
- [x] T-03: Style button with existing design system

## Logic

- [x] T-04: Add markAllComplete function to useTodos hook
- [x] T-05: Implement button visibility logic (show when 2+ incomplete)
- [x] T-06: Implement disabled state (when no incomplete)

## Integration

- [x] T-07: Add button to TodoList component

## Testing

- [x] T-08: Test button visibility logic
- [x] T-09: Test bulk completion
- [x] T-10: Test confirmation dialog flow

---

**Progress**: 10/10 (100%)
**Blocked**: None
**In Progress**: None

---

## Implementation Notes

### T-01 Notes
Created `components/MarkAllCompleteButton.tsx` with props for `onMarkAll` and `disabled`.

### T-02 Notes
Created reusable `components/ConfirmDialog.tsx` - can be used for other confirmations.

### T-04 Notes
Added to existing `useTodos` hook:
```typescript
const markAllComplete = () => {
  setTodos(todos.map(t => ({ ...t, completed: true })));
};
```

### T-07 Notes
Placed button between header and todo list, conditionally rendered based on incomplete count.

---

## Files Created/Modified

**Created**:
- `src/components/MarkAllCompleteButton.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/tests/MarkAllComplete.test.tsx`

**Modified**:
- `src/hooks/useTodos.ts`
- `src/components/TodoList.tsx`
