---
title: Feature Documentation
description: README, user stories, and tasks for comprehensive feature context
head: []
---

## Purpose

Feature documentation provides comprehensive context for a feature — what it does, who it's for, and implementation progress.

**Location:** `docs/features/[feature-name]/`

**Lifecycle:** Evolves with the feature

---

## Structure

```
docs/features/[feature-name]/
├── README.md           # Overview and architecture
├── user-stories.md     # User stories + acceptance criteria
└── tasks.md            # Implementation checklist
```

---

## README.md

````markdown
# Feature: [Feature Name]

> One-line description

## Overview

[2-3 sentences about what this feature does and why it exists]

## Goals

- [Primary goal]
- [Secondary goal]

## Non-Goals

- [Explicitly not doing this]
- [Also not doing this]

## Architecture

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| [Component 1] | `src/...` | [What it does] |
| [Component 2] | `src/...` | [What it does] |

### Data Flow

```
[User Action] → [Component] → [Service] → [Database]
                    ↓
              [Response] → [UI Update]
```

## Key Files

- `src/components/FeatureName/` - UI components
- `src/services/featureName.ts` - Business logic
- `src/hooks/useFeatureName.ts` - React hook

## Dependencies

- [External package] - [Why needed]
- [API endpoint] - [What it provides]

## Related

- Spec: `docs/specs/feature-name.md`
- ADR: `docs/decisions/ADR-XXX.md`
- Parent feature: [Link if applicable]
````

---

## user-stories.md

````markdown
# [Feature Name] - User Stories

## Overview

| Story | Priority | Status |
|-------|----------|--------|
| [Story 1 title] | High | ✅ Done |
| [Story 2 title] | High | 🔄 In Progress |
| [Story 3 title] | Medium | ⏳ Not Started |

---

## Story 1: [Title]

**As a** [user type]  
**I want** [action]  
**So that** [benefit]

### Acceptance Criteria

- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

### Notes

[Any additional context, edge cases, or decisions]

---

## Story 2: [Title]

**As a** [user type]  
**I want** [action]  
**So that** [benefit]

### Acceptance Criteria

- [ ] Given [context], when [action], then [result]

---

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| [Edge case 1] | [What should happen] |
| [Edge case 2] | [What should happen] |
````

---

## tasks.md

````markdown
# [Feature Name] - Tasks

## Progress

| Phase | Tasks | Done | Progress |
|-------|-------|------|----------|
| Setup | 3 | 3 | 100% |
| Core | 5 | 2 | 40% |
| Polish | 4 | 0 | 0% |
| **Total** | **12** | **5** | **42%** |

---

## Phase 1: Setup

- [x] Create feature folder structure
- [x] Set up base components
- [x] Add types/interfaces

## Phase 2: Core Implementation

- [x] Implement [core function 1]
- [x] Implement [core function 2]
- [ ] Implement [core function 3]
- [ ] Add API integration
- [ ] Write unit tests

## Phase 3: Polish

- [ ] Add loading states
- [ ] Add error handling
- [ ] Improve accessibility
- [ ] Performance optimization

---

## Blocked

| Task | Blocked By | Status |
|------|------------|--------|
| [Task] | [Blocker] | [Waiting/Resolved] |

## Notes

- [Decision made during implementation]
- [Thing discovered that affects scope]
````

---

## Tips

1. **README first** — Create even if minimal, expand later
2. **Stories drive tasks** — Each story should have related tasks
3. **Update during work** — Check off tasks as you complete them
4. **Link to code** — Include file paths so AI can find implementations

---

## Copy Path

Create at: `/docs/features/feature-name/`
