---
title: PRD-lite Template
description: Lightweight feature specification with problem, scope, and user stories
head: []
---

## Purpose

PRD-lite is a minimal Product Requirements Document. Unlike heavyweight PRDs that become stale, PRD-lite specs are quick to write and archive when done.

**Lifecycle:** Create → Implement → Archive to `docs/specs/_archive/`

---

## Template

````markdown
# Feature: [Feature Name]

> One-line summary of what this feature does

## Problem

[1-2 sentences describing the problem this solves]

**Current state:** [What happens now without this feature]

**Desired state:** [What should happen after implementation]

## Success Metrics

- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

## Scope

### In Scope
- [What this feature WILL do]
- [Another thing it will do]

### Out of Scope
- [What this feature will NOT do]
- [Explicitly excluded functionality]

## User Stories

### Story 1: [User Action]
**As a** [user type]  
**I want** [action]  
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

### Story 2: [Another Action]
**As a** [user type]  
**I want** [action]  
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Given [context], when [action], then [result]

## Technical Approach

[Skip if obvious. Include if there's a non-obvious implementation strategy]

### Key Decisions
- [Decision 1 and why]
- [Decision 2 and why]

### Dependencies
- [External service/library needed]
- [Another dependency]

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk 1] | [High/Med/Low] | [How to address] |
| [Risk 2] | [High/Med/Low] | [How to address] |

## Timeline

| Phase | Estimate |
|-------|----------|
| [Phase 1] | [X days] |
| [Phase 2] | [X days] |

---

*Spec Author: [Name]*  
*Created: [Date]*  
*Status: Draft | In Progress | Complete*
````

---

## Folder Organization

Choose one approach:

```
# Flat (simple projects)
docs/specs/
├── user-auth.md
├── dashboard.md
└── _archive/
    └── onboarding.md    # Completed

# Phased (milestone-based)
docs/specs/
├── phase-1/
│   └── user-auth.md
├── phase-2/
│   └── dashboard.md
└── _archive/

# Release-based (versioned products)
docs/specs/
├── v1.0/
│   └── core-features.md
├── v2.0/
│   └── new-features.md
└── _archive/
```

---

## Example: Real Feature

````markdown
# Feature: Search with Filters

> Enable users to search products with category and price filters

## Problem

Users can only browse products by category. They can't search for specific items or filter by price, leading to frustration when looking for specific products.

**Current state:** Browse-only, no search capability

**Desired state:** Full-text search with category and price range filters

## Success Metrics

- [ ] Search returns results in < 500ms
- [ ] 80% of searches return relevant results (top 3)
- [ ] Filter usage > 30% of searches

## Scope

### In Scope
- Full-text product search
- Category filter (multi-select)
- Price range filter (min/max)
- Sort by relevance, price, date

### Out of Scope
- Saved searches
- Search history
- Advanced filters (color, size, etc.)

## User Stories

### Story 1: Basic Search
**As a** shopper  
**I want** to search for products by name  
**So that** I can quickly find what I'm looking for

**Acceptance Criteria:**
- [ ] Given I'm on any page, when I type in search bar, then I see matching products
- [ ] Given no results match, when I search, then I see "No results" message
- [ ] Given results exist, when I search, then results appear in < 500ms

## Technical Approach

Use Elasticsearch for search indexing. Products indexed on create/update via async job.

### Key Decisions
- Elasticsearch over Postgres full-text (better relevance scoring)
- Async indexing (don't block product saves)

---

*Spec Author: Jane Smith*  
*Created: 2025-01-10*  
*Status: In Progress*
````

---

## Tips

1. **Start small** — You can expand as you learn more
2. **Be specific** — Vague acceptance criteria lead to vague code
3. **Skip what's obvious** — Don't document known patterns
4. **Archive, don't delete** — Keep history in `_archive/`

---

## Copy Path

Create specs at: `/docs/specs/feature-name.md`
