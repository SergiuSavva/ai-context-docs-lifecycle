---
name: debug-workflow
description: Systematic debugging — reproduce, hypothesize, investigate, fix, verify. Use when diagnosing bugs, unexpected behavior, test failures, or production issues.
---

# Debug Workflow

## Decision Tree

```
Is the bug reproducible?
├─ YES → Standard Debug Flow (below)
└─ NO  → Gather more symptoms first (logs, user reports, error context)

Is the root cause already known?
├─ YES → Skip to Fix → Verify
└─ NO  → Full investigation (all six phases)
```

---

## Six Phases

| Phase | Purpose | Output |
|-------|---------|--------|
| **Gather** | Collect symptoms and context | Symptom summary |
| **Reproduce** | Create minimal reproduction | Reliable repro steps |
| **Hypothesize** | Form ranked theories | Hypothesis table |
| **Investigate** | Test hypotheses systematically | Confirmed root cause |
| **Fix** | Implement minimal fix | Code change |
| **Verify** | Confirm fix, check regressions | Test evidence |

---

## Gather

Collect everything before touching code:

- **Error messages** — read completely, including stack traces and error codes
- **Recent changes** — `git log --oneline -10`, recent deploys, config changes
- **Timeline** — when did it start? What changed around that time?
- **Scope** — who/what is affected? All users or specific conditions?
- **Environment** — does it happen locally, staging, production? All browsers?

---

## Reproduce

Create the shortest path to trigger the bug:

1. Write down exact steps (input, action, expected vs actual result)
2. Eliminate variables — fewest steps, simplest environment
3. If possible, write a failing test (this becomes your verification)
4. If not reproducible: add targeted logging and wait for next occurrence

A bug you can't reproduce is a bug you can't confidently fix.

---

## Hypothesize

List 2-3 possible causes, ranked by likelihood:

| # | Hypothesis | Evidence to Confirm/Refute | Likelihood |
|---|-----------|---------------------------|------------|
| 1 | {{most likely cause}} | {{what to check}} | High |
| 2 | {{alternative cause}} | {{what to check}} | Medium |
| 3 | {{edge case}} | {{what to check}} | Low |

Start with the most likely. If you can't form hypotheses, you need more information — go back to Gather.

---

## Investigate

Test one hypothesis at a time:

1. Add logging, breakpoints, or assertions to confirm or refute
2. **Change one thing at a time** — never multiple variables simultaneously
3. If confirmed → proceed to Fix
4. If refuted → cross it off, move to next hypothesis
5. If all refuted → return to Gather with new information, form new hypotheses

---

## Fix

- Fix the **root cause**, not the symptom
- Keep the fix **minimal** — resist the urge to refactor surrounding code
- If the fix requires significant refactoring, create a separate spec for the cleanup
- Commit with: `fix(scope): description of what was broken and why`

---

## Verify

- [ ] Original reproduction steps no longer trigger the bug
- [ ] Failing test now passes (if written in Reproduce phase)
- [ ] Existing test suite passes (no regressions)
- [ ] Edge cases around the fix are tested

---

## Knowledge Persistence

For recurring or tricky bugs, record what you learned:

| Bug Type | Where to Record |
|----------|-----------------|
| Environment/config gotcha | AGENTS.md Boundaries section or `docs/scripts.md` |
| Architecture flaw | ADR in `docs/decisions/` explaining the fix |
| Common mistake others might hit | AGENTS.md Boundaries (Never section) |
| Complex debugging session | Comment in spec or tasks file for future reference |

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|--------------|-------------|-----|
| Fix symptoms instead of root cause | Bug returns in different form | Trace to the underlying cause |
| Change multiple things at once | Can't tell which change fixed it | One change per investigation cycle |
| Skip reproduction | No confidence the fix works | Always reproduce before fixing |
| Skip regression check | Fix breaks something else | Run full test suite after fix |
| Refactor during debugging | Muddies the fix, harder to review | Separate the fix from cleanup |
| Assume you know the cause | Miss the real issue | Form hypotheses, test systematically |

---

## When NOT to Use

- **Known simple fix** (typo, wrong value, missing import) — use Quick Flow (`load skill feature-workflow`): Find → Fix → Commit → Done
- **Performance investigation** — different methodology (profile, measure, optimize)
- **Feature request disguised as bug** — create a spec instead
- **Build/config errors** — read the error message, fix the config

---

## Quick Checklist

- [ ] Symptoms gathered (error messages, logs, timeline, scope)
- [ ] Minimal reproduction steps documented
- [ ] Hypotheses formed and ranked
- [ ] Root cause identified (not just symptom)
- [ ] Fix is minimal and targeted
- [ ] Reproduction steps no longer trigger bug
- [ ] Existing tests pass (no regressions)
- [ ] Knowledge recorded if bug was tricky or recurring

---

## Related Docs

- load skill `feature-workflow` (for bug fixes that escalate to features)
- load skill `testing` (for writing regression tests)
