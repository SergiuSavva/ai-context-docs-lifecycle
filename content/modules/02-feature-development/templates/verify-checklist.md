# Verify: [Feature Name]

> **Template**: Copy to `specs/[feature-name]/verify-checklist.md`
> Run after all tasks are complete, before closeout.

---

## Acceptance Criteria

Cross-reference each AC from `spec.md`:

| AC | Criterion | Status | Evidence |
|----|-----------|--------|----------|
| AC-01 | [Copy from spec.md] | Pass / Fail / Partial | [How verified — test output, manual check, screenshot] |
| AC-02 | [Copy from spec.md] | Pass / Fail / Partial | [How verified] |
| AC-03 | [Copy from spec.md] | Pass / Fail / Partial | [How verified] |

---

## Scope Check

### In-Scope Delivery

- [ ] All in-scope items from `spec.md` are implemented
- [ ] No in-scope items were silently dropped

### Out-of-Scope Creep

- [ ] No out-of-scope items were added without approval

---

## Quality Checks

- [ ] No linter errors introduced
- [ ] Tests pass (if applicable)
- [ ] No hardcoded secrets, tokens, or credentials

---

## Doc Freshness

Check if implementation changed any of these areas. Update affected docs in the same PR:

| Area Changed? | Doc to Update | Updated? |
|---------------|---------------|----------|
| Data schema / model | `docs/data-model.md` | Yes / No / N/A |
| API surface | `docs/api.md` | Yes / No / N/A |
| Auth flow | `docs/auth.md` | Yes / No / N/A |
| Architecture / structure | `docs/architecture.md` | Yes / No / N/A |
| AGENTS.md (new patterns) | `AGENTS.md` | Yes / No / N/A |

Only check docs that exist in the project. Mark N/A for docs that don't apply.

---

## Decision Record

- [ ] Were significant technical decisions made during implementation?
  - YES → Create ADR in `docs/decisions/NNN-[decision].md`
  - NO → No ADR needed

---

## Summary

| Check | Result |
|-------|--------|
| Acceptance Criteria | All Pass / Issues Found |
| Scope | Clean / Creep Detected |
| Quality | Pass / Issues Found |
| Doc Freshness | Up to Date / Updates Needed |
| ADR | Created / Not Needed |

**Overall**: Ready for closeout / Issues to resolve

---

## AI Agent Rules

1. Fill this checklist after all tasks in `tasks.md` are `[x]` or `[S]`
2. For each AC, provide concrete evidence (test command output, file path, behavior observed)
3. If any check fails, note the issue and recommend a fix before closeout
4. Present the completed checklist to the user for final approval
