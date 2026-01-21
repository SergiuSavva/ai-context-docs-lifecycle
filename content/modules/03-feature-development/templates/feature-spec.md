# Feature: [Name]

> **Template**: Copy to `docs/specs/<feature-name>/feature-spec.md`
> Replace all `[bracketed]` placeholders.

---

## Problem

[1-2 sentences: What problem does this solve? Why is it needed now?]

---

## Solution

[1-2 sentences: How will we solve it?]

---

## Success Metrics

- [Measurable outcome 1]
- [Measurable outcome 2]

---

## Scope

### In Scope

- [What we ARE building]
- [Feature 1]
- [Feature 2]

### Out of Scope

- [What we're NOT building]
- [Deferred feature 1]
- [Deferred feature 2]

---

## Acceptance Criteria

- [ ] AC-01: [Specific, testable criterion]
- [ ] AC-02: [Specific, testable criterion]
- [ ] AC-03: [Specific, testable criterion]
- [ ] AC-04: [Specific, testable criterion]

---

## Functional Requirements (Optional - EARS Format)

> **EARS** (Easy Approach to Requirements Syntax) creates testable requirements.
> Use this section for complex features needing rigorous requirements. Delete if not needed.

| Pattern | Template | Use When |
|---------|----------|----------|
| **Ubiquitous** | The system shall [action] | Always-on behavior |
| **Event-Driven** | When [event], the system shall [action] | Response to triggers |
| **State-Driven** | While [state], the system shall [action] | Behavior during a state |
| **Optional** | Where [feature enabled], the system shall [action] | Configurable features |
| **Unwanted** | If [condition], then the system shall [action] | Error handling |

**Example requirements:**

| ID | Requirement |
|----|-------------|
| FR-01 | The system shall display search results within 500ms. |
| FR-02 | When user clicks "Save", the system shall persist data and show confirmation. |
| FR-03 | While offline, the system shall queue changes for sync. |
| FR-04 | If validation fails, then the system shall highlight invalid fields. |

---

## Technical Approach

[For Standard Flow: Brief approach]
[For Complex Flow: Link to research.md]

- [Key technology/pattern]
- [Implementation approach]

---

## Risks → Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Low/Med/High | Low/Med/High | [How to mitigate] |
| [Risk 2] | Low/Med/High | Low/Med/High | [How to mitigate] |

---

## Dependencies

- [External: API, service, etc.]
- [Internal: Other feature, data, etc.]

---

## User Stories

[For Standard Flow: Skip or include inline]
[For Complex Flow: See [user-stories.md](./user-stories.md)]

---

## Research

[For Standard Flow: Skip]
[For Complex Flow: See [research.md](./research.md)]

---

## Tasks

See [tasks.md](./tasks.md)

---

*Created: [Date]*
*Status: Draft | Approved | Implementing | Complete*
