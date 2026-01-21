# Example: Mark All Complete (Standard Flow)

> **Walkthrough** of the Standard Flow using a real feature example.

---

## Scenario

You're building a todo app and want to add a "Mark all as complete" button that lets users complete all todos at once.

**Why Standard Flow?**
- Not a bug fix (not Quick Flow)
- Doesn't require research (not Complex Flow)
- Changes < 5 files
- Clear scope

---

## Step 1: Create Feature Spec

Create `docs/specs/mark-all-complete/feature-spec.md`:

See: [`feature-spec.md`](./feature-spec.md)

**Key elements**:
- Clear problem statement
- Specific acceptance criteria
- Explicit scope boundaries

---

## Step 2: Create Tasks

Create `docs/specs/mark-all-complete/tasks.md`:

See: [`tasks.md`](./tasks.md)

**Key elements**:
- Tasks grouped by category
- Each task is actionable
- Progress tracking at bottom

---

## Step 3: AI Implements

AI reads the spec and tasks, then works through each task:

### Task T-01: Add button component

```tsx
// components/MarkAllCompleteButton.tsx
export function MarkAllCompleteButton({ onMarkAll, disabled }) {
  return (
    <button 
      onClick={onMarkAll}
      disabled={disabled}
      className="btn btn-secondary"
    >
      Mark all as complete
    </button>
  );
}
```

AI updates tasks.md:
```markdown
- [x] T-01: Add button component to TodoList
- [~] T-02: Add confirmation dialog (IN PROGRESS)
```

### Task T-02: Add confirmation dialog

```tsx
// components/ConfirmDialog.tsx
export function ConfirmDialog({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
```

AI updates tasks.md and continues...

---

## Step 4: AI Signals Completion

When all tasks are done, AI outputs:

```
Ready for review. Implementation complete.

**DoD Checklist**:
- [x] All tasks completed (7/7)
- [x] Acceptance criteria verified
- [ ] Human review needed

**Acceptance Criteria Status**:
- AC-01: ✓ Button visible when 2+ incomplete todos
- AC-02: ✓ Clicking marks all as complete
- AC-03: ✓ Confirmation dialog shown
- AC-04: ✓ Button disabled when no incomplete todos

**Next steps**: Please review and provide feedback.
```

---

## Step 5: Human Reviews

Human tests the feature:
- Verifies button appears correctly
- Tests the confirmation dialog
- Checks edge cases

**If changes needed**: AI iterates and updates tasks

**If approved**: Move to cleanup

---

## Step 6: Archive Spec

After approval:

1. Delete spec folder: `docs/specs/mark-all-complete/`
   - OR move to `docs/specs/_archive/mark-all-complete/`

2. No ADR needed (no significant decisions made)

3. Update Feature README if this is a major feature

---

## Files Changed

```
src/
├── components/
│   ├── MarkAllCompleteButton.tsx  # NEW
│   ├── ConfirmDialog.tsx          # NEW
│   └── TodoList.tsx               # MODIFIED
├── hooks/
│   └── useTodos.ts                # MODIFIED (added markAllComplete)
└── tests/
    └── MarkAllComplete.test.tsx   # NEW
```

---

## Time Spent

- Spec creation: ~15 minutes
- Implementation: ~2 hours
- Review + iteration: ~30 minutes
- **Total**: ~3 hours

---

## Lessons

1. **Spec prevents scope creep** - "Undo" was explicitly out of scope
2. **Task tracking shows progress** - Human can see exactly where AI is
3. **Acceptance criteria are testable** - Easy to verify completion
4. **No ADR needed** - Simple feature, no significant decisions
