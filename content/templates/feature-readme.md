<!-- site:
title: Feature Documentation Template
description: Documentation structure for feature folders
purpose: Feature docs provide living documentation for each feature, including goals, code locations, and implementation status. Unlike specs (which are archived after completion), feature docs stay updated throughout the project lifecycle.
updateWhen: Code locations change, implementation progresses, or feature scope evolves.
wrapInCodeBlock: false
-->

# Feature: [Feature Name]

> **TEMPLATE**: Copy this file to `/docs/features/<feature-name>/README.md`.
> Replace all `[bracketed]` placeholders with your feature's values.
> See `../examples/feature-readme.md` for a filled-in example.

---

## Metadata (Optional)

| Field | Value |
|-------|-------|
| **Slug** | [feature-slug] |
| **Status** | Not Started / In Progress / Complete |
| **Last Updated** | [YYYY-MM-DD] |
| **Tags** | [tag1], [tag2] |

---

## Overview

[Description of what this feature does and why it exists. 2-3 sentences.]

---

## Goals

- [ ] [Goal 1]
- [ ] [Goal 2]
- [ ] [Goal 3]

---

## User Impact

**Who benefits:** [User type or segment]

**How they benefit:**
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

---

## Scope

### In Scope
- [Item 1]
- [Item 2]
- [Item 3]

### Out of Scope
- [Item 1]
- [Item 2]

---

## Code Touchpoints

### Frontend

| Type | Location |
|------|----------|
| Routes | `[path/to/route.tsx]` |
| Components | `[path/to/component.tsx]` |
| Hooks | `[path/to/hook.ts]` |

### Backend

| Type | Location |
|------|----------|
| API Routes | `[path/to/api/route.ts]` |
| Database | `[table name]` |
| Services | `[path/to/service.ts]` |

---

## Dependencies

### Requires
- [Dependency 1]
- [Dependency 2]

### Enables
- [Future feature 1]
- [Future feature 2]

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| [Decision 1] | [Rationale] |
| [Decision 2] | [Rationale] |

---

## Success Metrics

- [ ] [Metric 1]
- [ ] [Metric 2]
- [ ] [Metric 3]

---

## Related Documents

- [User Stories](./user-stories.md)
- [Tasks](./tasks.md)
- [PRD-lite](/docs/specs/[feature].md)
