# Quick Flow (Bug Fixes)

> **For bug fixes, typos, config changes** - no spec needed.

---

## When to Use

| Trigger | Example |
|---------|---------|
| Bug fix | "Fix null pointer in login function" |
| Typo | "Fix typo in error message" |
| Config change | "Update environment variable" |
| Single-file edit | "Add missing import" |
| Minor refactor | "Rename variable for clarity" |

**Rule**: If it's a fix with obvious solution, use Quick Flow.

---

## Process

```
1. Understand the issue
2. Fix code
3. Verify fix works
4. Commit with descriptive message
5. Done
```

**No spec needed. No tasks.md needed. No ADR needed.**

---

## AI Agent Instructions

### Verify This is Quick Flow

```
Before starting, confirm:
- [ ] Single issue to fix
- [ ] Solution is obvious
- [ ] No design decisions required
- [ ] No new patterns introduced

If ANY are false → Use Plan phase with spec.md + tasks.md
```

### Implementation

```
1. Read the issue/request
2. Locate the affected code
3. Make the fix
4. Run tests if they exist
5. Verify no linter errors
```

### Commit Message

```
fix: <what was fixed>

or

chore: <what was changed>

Examples:
fix: handle null user in getProfile function
chore: update API base URL in config
fix: correct spelling in error message
```

---

## Definition of Done

- [ ] Code works as expected
- [ ] No linter errors
- [ ] Commit message describes what changed

---

## When to Escalate

If during implementation you discover:

- More files need changes than expected
- A design decision is required
- New patterns need to be established

**Action**: Stop, create `specs/[name]/spec.md` + `tasks.md`, continue with Plan phase.

---

## Examples

### Bug Fix

```
Issue: "Login fails when username contains special characters"

1. Find: src/auth/login.ts
2. Fix: Escape special characters before validation
3. Test: Verify login works with "user@name"
4. Commit: "fix: escape special characters in username validation"
```

### Config Change

```
Issue: "Update API timeout from 5s to 10s"

1. Find: src/config/api.ts
2. Change: API_TIMEOUT = 10000
3. Verify: No tests affected
4. Commit: "chore: increase API timeout to 10s"
```
