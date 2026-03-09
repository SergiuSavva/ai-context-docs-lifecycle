---
name: spec-writing
description: How to write quality spec content — problem framing, acceptance criteria, and scoping. Use when drafting spec.md sections or reviewing spec quality. For the overall workflow and task execution, use feature-workflow instead.
---

# Spec Writing

> **References:** Spec files → @specs/[feature-name]/spec.md | Tasks → @specs/[feature-name]/tasks.md

## Spec Structure

Every spec lives in `specs/[feature-name]/` and requires two files:

| File | Purpose |
|------|---------|
| `spec.md` | What to build — problem, solution, acceptance criteria |
| `tasks.md` | How to build it — phased checklist with progress tracking |

Optional files added as needed: `research.md`, `design.md`, `plan.md`, `user-stories.md`.

---

## Required Sections in spec.md

| Section | Content |
|---------|---------|
| **Problem** | 1-2 sentences: what's broken or missing, why it matters now |
| **Solution** | 1-2 sentences: how we'll solve it |
| **Acceptance Criteria** | Numbered AC-01, AC-02, etc. — testable conditions |
| **Scope** | In Scope / Out of Scope |
| **Technical Approach** | Brief approach (expand in design.md if complex) |
| **Dependencies** | External/internal dependencies |
| **Risks** | Risk + Mitigation table |
| **Related Docs** | Links to other spec files |
| **Status** | Draft / Approved / Implementing / Complete |

---

## Problem/Solution Framing

```markdown
<!-- ✅ Good: specific, explains "why now" -->
## Problem
Users must manually copy 5+ config files when starting a new service,
leading to inconsistent setups and missing environment variables.

## Solution
Add a `scaffold` command that generates service boilerplate from a
shared template with validated environment configuration.

<!-- ❌ Bad: vague, no urgency -->
## Problem
Things could be better.

## Solution
We will improve the system.
```

**Rules**: State the problem before the solution. Include "why now" context. Keep each to 1-2 sentences.

---

## Acceptance Criteria

Format: `AC-XX: [Specific, testable condition]`

```markdown
<!-- ✅ Good: specific, verifiable -->
- [ ] AC-01: `scaffold` creates `docker-compose.yml` with all required service ports from template
- [ ] AC-02: `scaffold --validate` checks `.env` against `.env.example` and reports missing keys
- [ ] AC-03: Running `scaffold` in an existing service directory warns and exits without mutation

<!-- ❌ Bad: vague, untestable -->
- [ ] AC-01: The system works correctly
- [ ] AC-02: Performance is acceptable
- [ ] AC-03: Users are happy
```

**Rules**:
- Each AC must be independently verifiable
- Use specific values, file names, behaviors — not adjectives
- Number sequentially (AC-01, AC-02, ...)
- Check off during implementation to track completeness

---

## Scoping Discipline

```markdown
## Scope

### In Scope
- `scaffold` command with template rendering
- Environment validation against `.env.example`
- Docker Compose generation from service manifest

### Out of Scope
- Runtime service orchestration
- Auto-installing host dependencies
- Cloud-specific deployment configuration
```

**Rules**:
- In Scope = what we ARE building (be explicit)
- Out of Scope = what we are NOT building (prevents scope creep)
- If something feels borderline, put it in Out of Scope with a note

---

## From Spec to Tasks

After spec.md is written, create tasks.md. Each task should trace back to at least one acceptance criterion.

| Spec Section | Drives |
|-------------|--------|
| Acceptance Criteria | What tasks must achieve |
| Scope (In Scope) | Task coverage — nothing outside scope |
| Technical Approach | How tasks are structured |
| Dependencies | Task ordering and blockers |

For task formatting (T-XX numbering, markers, phases, progress tracking), use `load skill feature-workflow`.

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|--------------|-------------|-----|
| Vague criteria ("works correctly") | Can't verify completion | Use specific, testable conditions |
| Missing risks section | Surprises during implementation | Always list at least one risk |
| No Out of Scope | Scope creep during implementation | Explicitly state what's excluded |
| Solution before problem | Skips understanding the "why" | Always write Problem first |
| Monolithic spec (10+ ACs) | Too large to implement cleanly | Split into multiple features |

---

## When NOT to Use This Skill

- **Bug fixes** — Quick Flow, no spec needed
- **Pure research** — create only research.md, spec comes after
- **Brainstorming** — discuss with user first, spec formalizes the decision

---

## Quick Checklist

- [ ] Problem explains what's broken and why it matters now
- [ ] Solution describes the approach in 1-2 sentences
- [ ] Every AC is specific and independently verifiable
- [ ] Scope has both In Scope and Out of Scope sections
- [ ] Risks table has at least one entry with mitigation
- [ ] Every AC traces to at least one planned task
- [ ] Status field is set (Draft → Approved → Implementing → Complete)

## Related Docs

- Spec files: @specs/[feature-name]/spec.md
- Task files: @specs/[feature-name]/tasks.md
- load skill `feature-workflow`
- load skill `feature-workflow`
