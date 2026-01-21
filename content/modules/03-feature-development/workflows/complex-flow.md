# Complex Flow

> **For large features, new systems, and architectural changes.**

---

## When to Use

| Trigger | Example |
|---------|---------|
| New system | "Implement authentication system" |
| External API integration | "Integrate Stripe payments" |
| Architecture change | "Migrate from REST to GraphQL" |
| > 5 files affected | "Add multi-tenancy support" |
| Research needed | "Evaluate caching solutions" |
| Breaking change | "Restructure database schema" |

**Rule of thumb**: If you need to research options or it affects > 5 files, use Complex Flow.

---

## Process

```
1. RESEARCH: Gather options, links, diagrams
2. SPEC: Write detailed feature-spec + user stories
3. PLAN: Create task breakdown
4. BUILD: Implement with progress tracking
5. REVIEW: Human reviews at milestones
6. DOCUMENT: Create ADR for key decisions
7. UPDATE: Refresh AGENTS.md and Reference docs
8. ARCHIVE: Move spec to _archive
```

---

## File Structure

```
docs/specs/<feature-name>/
├── research.md        # Options evaluated, links, diagrams
├── feature-spec.md    # Detailed requirements
├── design.md          # Architecture/API design (optional)
├── user-stories.md    # Acceptance criteria (Given/When/Then)
└── tasks.md           # Implementation checklist

docs/decisions/
└── NNN-<decision>.md  # ADR created after completion
```

---

## Phase 1: Research

**Goal**: Understand options before committing to an approach.

### research.md Template

```markdown
# [Feature] Research

## Problem Statement
[What are we trying to solve?]

## Options Evaluated

### Option A: [Name]
- **Pros**: [List]
- **Cons**: [List]
- **Effort**: [Low/Medium/High]

### Option B: [Name]
- **Pros**: [List]
- **Cons**: [List]
- **Effort**: [Low/Medium/High]

## Recommendation
[Which option and why]

## Resources
- [Link to docs]
- [Link to examples]

## Diagrams

```mermaid
[Sequence/flow diagram]
```
```

### AI Instructions for Research

```markdown
AI MUST during research:

1. Document at least 2 alternatives
2. List pros/cons for each
3. Include relevant links
4. Create diagrams if helpful
5. Make a recommendation with rationale
6. ASK USER to approve before proceeding to spec
```

---

## Phase 2: Specification

**Goal**: Define what we're building in detail.

### feature-spec.md Template

```markdown
# Feature: [Name]

## Problem
[What problem does this solve? Why now?]

## Success Metrics
- [Measurable outcome 1]
- [Measurable outcome 2]

## Scope

### In Scope
- [What we ARE building]

### Out of Scope
- [What we're NOT building]

## User Stories
See [user-stories.md](./user-stories.md)

## Technical Approach
- [High-level approach]
- [Key technologies/patterns]

## Risks → Mitigations

| Risk | Mitigation |
|------|------------|
| [Risk 1] | [How to mitigate] |

## Dependencies
- [External dependencies]
- [Internal prerequisites]

## Research
See [research.md](./research.md)
```

### user-stories.md Template

```markdown
# User Stories: [Feature]

## US-01: [Story Title]

**As a** [user type]
**I want to** [action]
**So that** [benefit]

**Acceptance Criteria**:
- [ ] AC-01: [Criterion]
- [ ] AC-02: [Criterion]

**Given** [precondition]
**When** [action]
**Then** [result]

---

## US-02: [Story Title]
...
```

### AI Instructions for Specification

```markdown
AI MUST during specification:

1. Write clear problem statement
2. Define measurable success metrics
3. Set explicit scope boundaries (In/Out)
4. Create user stories with acceptance criteria
5. Identify risks and mitigations
6. ASK USER to approve spec before implementing
```

---

## Phase 3: Implementation

**Goal**: Build with structured task tracking.

### tasks.md Template

```markdown
# Tasks: [Feature]

## Setup (Dependencies)
- [ ] T-01: [Task]
- [ ] T-02: [Task]

## Core Implementation
- [ ] T-03: [Task]
- [ ] T-04: [Task]
- [ ] T-05: [Task]

## Testing
- [ ] T-06: [Task]
- [ ] T-07: [Task]

## Documentation
- [ ] T-08: Update AGENTS.md
- [ ] T-09: Create feature README

---
**Progress**: 0/9 (0%)
**Blocked**: None
**In Progress**: None
```

### AI Instructions for Implementation

```markdown
AI MUST during implementation:

1. ONE task [~] at a time
2. Update tasks.md after EACH task
3. Calculate progress: (completed + skipped) / total
4. When blocked: Mark [B], ask for guidance
5. Signal completion at end of each category
6. Request human review at milestones
```

---

## Phase 4: Documentation

**Goal**: Preserve decisions and update reference docs.

### When to Create ADR

Create an ADR when ANY of these are true:
- Evaluated 2+ alternatives and chose one
- Introduced new architectural pattern
- Made a breaking change
- Chose a third-party library/service

### adr.md Template

```markdown
# ADR-NNN: [Decision Title]

## Status
Accepted

## Context
[What problem required a decision? What constraints existed?]

## Decision
[What did we choose?]

## Rationale
[WHY did we choose this?]

## Consequences

**Positive**:
- [Benefit 1]
- [Benefit 2]

**Negative**:
- [Trade-off 1]

## Alternatives Considered

### [Alternative 1]
- Rejected because: [reason]

### [Alternative 2]
- Rejected because: [reason]
```

### Reference Doc Updates

```markdown
AI MUST after Complex Flow completion:

1. Update AGENTS.md
   - Add new patterns to Key Patterns
   - Update Tech Stack if new tech added
   - Update File Organization if structure changed

2. Create/Update Feature README
   - Document how the feature works
   - List code touchpoints

3. Update docs-index.md
   - Add links to new docs
```

---

## AI Agent Instructions Summary

### Context Loading Order

```markdown
1. AGENTS.md                              → Project context
2. docs/specs/<feature>/research.md       → Research notes
3. docs/specs/<feature>/feature-spec.md   → Requirements
4. docs/specs/<feature>/user-stories.md   → Acceptance criteria
5. docs/specs/<feature>/tasks.md          → Current status
6. .cursor/rules/*.mdc                    → Coding patterns
```

### Signaling Completion

```markdown
When all tasks are [x] or [S]:

"Ready for review. Implementation complete.

**DoD Checklist**:
- [x] All tasks completed (X/Y)
- [x] All acceptance criteria verified
- [x] Tests passing
- [ ] ADR needed: [Yes/No]
- [ ] AGENTS.md updates needed: [List sections]
- [ ] Human review needed

**Key Decisions Made**:
- [Decision 1]: [Brief rationale]

**Next steps**: Please review. After approval, I will create ADR and update reference docs."
```

---

## Definition of Done

### Auto-Verifiable (AI can confirm)

- [ ] All tasks completed `[x]` or skipped `[S]`
- [ ] Progress = 100%
- [ ] No blocked tasks remaining
- [ ] No linter errors

### Manual Verification (Human confirms)

- [ ] All acceptance criteria verified
- [ ] Tests written and passing
- [ ] Code quality acceptable
- [ ] ADR created for key decisions
- [ ] AGENTS.md updated (required)
- [ ] Feature README created/updated

### After Approval

- [ ] Spec archived to `docs/specs/_archive/`

---

## After Completion

1. **Human reviews** implementation
2. **AI creates** ADR if decisions were made
3. **AI updates** AGENTS.md and reference docs
4. **Move spec** to `docs/specs/_archive/<feature>/`
5. **Update** `docs-index.md` with new links
