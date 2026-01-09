# Feature Documentation

## Overview

This directory contains comprehensive feature documentation. Each feature has its own folder with standardized documentation.

---

## Directory Structure

```
docs/features/
├── README.md                  # This file
├── _templates/               # 📋 Documentation templates
│   ├── feature-readme.md    # README template
│   ├── user-stories.md      # User stories template
│   └── tasks.md             # Tasks template
│
├── [feature-1]/              # Feature documentation
│   ├── README.md            # Overview + code touchpoints
│   ├── user-stories.md      # User stories + acceptance criteria
│   └── tasks.md             # Implementation checklist
│
└── [feature-2]/              # Another feature
    └── ...
```

---

## Feature Index

| Feature | Status | Progress | Description |
|---------|--------|----------|-------------|
| [feature-1](./feature-1/) | ⏳ Planned | 0% | [Description] |
| [feature-2](./feature-2/) | ⏳ Planned | 0% | [Description] |

---

## Feature Documentation Structure

Each feature folder contains:

| File | Required | Purpose |
|------|----------|---------|
| `README.md` | ✅ | Overview, goals, code locations |
| `user-stories.md` | ✅ | User stories + acceptance criteria |
| `tasks.md` | ✅ | Implementation checklist |
| `test-scenarios.feature` | ⚪ | Gherkin test scenarios |
| `changelog.md` | ⚪ | Behavior changes (after release) |

---

## Creating a New Feature

1. Create folder: `docs/features/[feature-name]/`
2. Copy templates from `_templates/`
3. Fill in feature details
4. Add to feature index above
5. Add tasks to `docs/TASKS.md`

---

## User Story Format

```markdown
### US-XXX: [Story Title]

**As a** [actor]
**I want** [goal]
**So that** [benefit]

#### Acceptance Criteria
- [ ] Given [context], when [action], then [result]
```

---

## Prioritization

| Priority | Label | Meaning |
|----------|-------|---------|
| P0 | 🔴 Critical | MVP blocker |
| P1 | 🟠 High | Important for launch |
| P2 | 🟡 Medium | Nice to have |
| P3 | 🟢 Low | Future consideration |

---

## Related Documents

- [Global Tasks](../TASKS.md) - All tasks across features
- [Documentation Guide](../../.cursor/rules/documentation.mdc) - Templates & guidelines

---

*Template from [AI-First Dev Kit](https://github.com/YOUR_USERNAME/ai-first-dev-kit)*
