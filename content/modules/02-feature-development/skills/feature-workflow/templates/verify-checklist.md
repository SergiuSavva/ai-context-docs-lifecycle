# Verify: {{Feature Name}}

> **Template**: Copy to `specs/{{feature-name}}/verify-checklist.md`
> This checklist is the Definition of Done. Fill it after all tasks are complete, before closeout.

---

## Task Completion

- [ ] All tasks in `tasks.md` are `[x]` or `[S]`
- [ ] No tasks remain `[B]` (blocked)
- [ ] Progress = 100%

---

## Acceptance Criteria

Cross-reference each AC from `spec.md`:

| AC | Criterion | Status | Evidence |
|----|-----------|--------|----------|
| AC-01 | {{Copy from spec.md}} | Pass / Fail / Partial | {{How verified — test output, manual check, screenshot}} |
| AC-02 | {{Copy from spec.md}} | Pass / Fail / Partial | {{How verified}} |
| AC-03 | {{Copy from spec.md}} | Pass / Fail / Partial | {{How verified}} |

---

## Scope Check

### In-Scope Delivery

- [ ] All in-scope items from `spec.md` are implemented
- [ ] No in-scope items were silently dropped

### Out-of-Scope Creep

- [ ] No out-of-scope items were added without approval

---

## Quality

- [ ] No linter errors introduced
- [ ] Tests pass (if applicable)

---

## Stub Detection

Scan new and modified code for incomplete implementations:

### Placeholder Markers
- [ ] No `TODO`, `FIXME`, `HACK`, `XXX`, or `TEMP` comments in new code
- [ ] No placeholder strings: "lorem ipsum", "coming soon", "placeholder", "sample data"

### Empty Implementations
- [ ] No empty function bodies (`return null`, `return {}`, `return []`, `pass`, `raise NotImplementedError`)
- [ ] No functions that only log/print without doing actual work
- [ ] No empty catch/except blocks (swallowed errors)

### Hardcoded Values
- [ ] No hardcoded credentials, API keys, or tokens
- [ ] No magic numbers without named constants
- [ ] No hardcoded URLs/paths that should be configurable

### Wiring Check
- [ ] New functions/components are imported and called somewhere (not just defined)
- [ ] New routes/endpoints are registered in the router
- [ ] New config values are actually read by the application

**Stub scan result**: Clean / {{N}} issues found — {{list issues}}

---

## Knowledge Persistence

These checks ensure project knowledge grows with the feature, not just the code.

### Doc Freshness

Update affected docs in the same PR:

| Area Changed? | Doc to Update | Updated? |
|---------------|---------------|----------|
| Data schema / model | `docs/data-model.md` | Yes / No / N/A |
| API surface | `docs/api.md` | Yes / No / N/A |
| Auth flow | `docs/auth.md` | Yes / No / N/A |
| Architecture / structure | `docs/architecture.md` | Yes / No / N/A |
| New patterns / conventions | `AGENTS.md` | Yes / No / N/A |

Only check docs that exist in the project. Mark N/A for docs that don't apply.

### Decision Record

- [ ] Were significant technical decisions made during implementation?
  - YES → Create ADR in `docs/decisions/NNN-{{decision}}.md`
  - NO → No ADR needed

---

## Definition of Done

| Check | Result |
|-------|--------|
| Task Completion | All `[x]`/`[S]` / Tasks remaining |
| Acceptance Criteria | All Pass / Issues Found |
| Scope | Clean / Creep Detected |
| Quality | Pass / Issues Found |
| Stub Detection | Clean / Issues Found |
| Doc Freshness | Up to Date / Updates Needed |
| Decision Record | Created / Not Needed |

- [ ] **Human review approved**

**Overall**: Ready for closeout / Issues to resolve

---

## AI Agent Rules

1. Fill this checklist after all tasks in `tasks.md` are `[x]` or `[S]`
2. For each AC, provide concrete evidence (test command output, file path, behavior observed)
3. If any check fails, note the issue and recommend a fix before closeout
4. This checklist is the Definition of Done — do not proceed to closeout until all checks pass and the user approves
