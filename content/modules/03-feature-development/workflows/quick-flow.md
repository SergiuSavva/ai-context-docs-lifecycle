# Quick Flow

> **For bug fixes, typos, config changes, and single-file edits.**

---

## When to Use

| Trigger | Example |
|---------|---------|
| Bug fix | "Fix null pointer in login function" |
| Typo | "Fix typo in error message" |
| Config change | "Update environment variable" |
| Single-file edit | "Add missing import" |
| Minor refactor | "Rename variable for clarity" |

**Rule of thumb**: If it touches 1-2 files and requires no design decisions, use Quick Flow.

---

## Process

```
1. Understand the issue
2. Fix code
3. Verify fix works
4. Commit with descriptive message
5. Done ✅
```

**No spec needed. No ADR needed. No task tracking needed.**

---

## AI Agent Instructions

### Before Starting

```markdown
AI MUST verify this is Quick Flow:
- [ ] Single issue to fix
- [ ] 1-2 files affected
- [ ] No design decisions required
- [ ] No new patterns introduced

If ANY of these are false → Use Standard or Complex Flow instead.
```

### During Implementation

```markdown
1. Read the issue/request
2. Locate the affected code
3. Make the fix
4. Run tests if they exist
5. Verify no linter errors
```

### Completion

```markdown
Commit message format:

fix: <what was fixed>

or

chore: <what was changed>

Example:
fix: handle null user in getProfile function
chore: update API base URL in config
```

---

## Definition of Done

- [ ] Code works as expected
- [ ] No linter errors
- [ ] Commit message describes what changed and why
- [ ] Reference docs updated IF behavior changed (rare)

---

## When to Escalate to Standard Flow

Escalate if during implementation you discover:

- More than 2 files need changes
- A design decision is required
- New patterns need to be established
- The fix scope is larger than expected

**Action**: Stop, create a feature spec, switch to Standard Flow.

---

## Examples

### Bug Fix

```markdown
Issue: "Login fails when username contains special characters"

1. Find: src/auth/login.ts
2. Fix: Escape special characters before validation
3. Test: Verify login works with "user@name"
4. Commit: "fix: escape special characters in username validation"
```

### Config Change

```markdown
Issue: "Update API timeout from 5s to 10s"

1. Find: src/config/api.ts
2. Change: API_TIMEOUT = 10000
3. Verify: No tests affected
4. Commit: "chore: increase API timeout to 10s"
```

### Typo Fix

```markdown
Issue: "Error message says 'recieved' instead of 'received'"

1. Find: src/components/ErrorDisplay.tsx
2. Fix: "recieved" → "received"
3. Commit: "fix: correct spelling in error message"
```
