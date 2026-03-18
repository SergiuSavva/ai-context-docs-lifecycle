# Spec: {{Feature Name}}

> **Template**: Copy to `specs/{{feature-name}}/spec.md`
> Replace all `{{bracketed}}` placeholders.

---

## Problem

{{1-2 sentences: What problem does this solve? Why is it needed now?}}

---

## Solution

{{1-2 sentences: How will we solve it?}}

---

## Acceptance Criteria

- [ ] AC-01: {{Specific, testable criterion}}
- [ ] AC-02: {{Specific, testable criterion}}
- [ ] AC-03: {{Specific, testable criterion}}

---

## Scope

### In Scope

- {{What we ARE building}}

### Out of Scope

- {{What we're NOT building}}

---

## Technical Approach

{{Brief approach - expand in design.md if complex}}

- {{Key technology/pattern}}
- {{Implementation approach}}

---

## Implementation Phases

> Plan implementation from core (no dependencies) to dependent (builds on prior phases).
> Each phase is validated before the next begins.

### Phase 1: {{Core / Foundation}}
**Goal**: {{What this phase establishes}}
**Covers**: AC-01, AC-02
**Validates**: {{How to confirm this phase works — e.g., tests pass, manual check, output matches}}

### Phase 2: {{Dependent Feature}}
**Goal**: {{What this phase adds on top of Phase 1}}
**Covers**: AC-03
**Depends on**: Phase 1
**Validates**: {{How to confirm this phase works}}

{{Add more phases as needed. Keep phases small — 2-4 ACs max per phase.}}

---

## Dependencies

- {{External: API, service, library}}
- {{Internal: Other feature, existing code}}

---

## Risks

| Risk | Mitigation |
|------|------------|
| {{Risk}} | {{How to mitigate}} |

---

## Related Docs

- [tasks.md](./tasks.md) - Implementation checklist
- [verify-checklist.md](./verify-checklist.md) - Verification against acceptance criteria
- [design.md](./design.md) - Architecture (if needed)
- [plan.md](./plan.md) - Sequence & dependencies (if needed)
- [research.md](./research.md) - Options evaluated (if needed)
- [user-stories.md](./user-stories.md) - Test scenarios (if needed)

---

*Status: Draft | Approved | Implementing | Complete*
