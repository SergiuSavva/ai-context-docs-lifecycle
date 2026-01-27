# Getting Started

> **Pick the modules you need** - Start minimal, add complexity as needed.

---

## Quick Decision: Which Modules?

### Just Starting?

**Start with Module 1 only.**

```bash
# What you get:
your-project/
└── AGENTS.md    # AI context file
```

[Go to Module 1: Core Init →](../modules/01-quick-start/README.md)

---

### Building Features?

**Add Module 3 for feature workflows.**

```bash
# What you get:
your-project/
├── AGENTS.md
├── docs/specs/           # Feature specifications
└── .cursor/rules/
    └── feature-workflow.mdc
```

[Go to Module 3: Feature Development →](../modules/03-feature-development/README.md)

---

### Want Consistent Code?

**Add Module 2 for coding standards.**

```bash
# What you get:
your-project/
├── AGENTS.md
└── .cursor/rules/
    ├── code-style.mdc
    └── doc-style.mdc
```

[Go to Module 2: Coding Standards →](../modules/02-coding-standards/README.md)

---

### Need Full Documentation?

**Add Module 4 for reference docs.**

```bash
# What you get:
your-project/
├── AGENTS.md              # Enhanced
├── docs/
│   ├── INDEX.md
│   ├── features/
│   └── decisions/
└── .cursor/rules/
    └── reference-freshness.mdc
```

[Go to Module 4: Reference Docs →](../modules/04-reference-docs/README.md)

---

### Managing Multiple Features?

**Add Module 5 for project planning.**

```bash
# What you get:
your-project/
└── docs/
    ├── PROJECT-PRD.md
    ├── BACKLOG.md
    ├── ROADMAP.md
    └── TASKS.md
```

[Go to Module 5: Project Planning →](../modules/05-project-planning/README.md)

---

## Recommended Combinations

### Solo Developer (Minimal)

```
Module 1 (Core Init) + Module 3 (Feature Development)
```

Best for: Personal projects, prototypes, small apps

### Solo Developer (Full)

```
Modules 1 + 2 + 3 + 4
```

Best for: Production apps, open source projects

### Team Project

```
All modules (1-5)
```

Best for: Team projects, products with roadmaps

---

## Module Overview

| # | Module | Purpose |
|---|--------|---------|
| 1 | [Core Init](../modules/01-quick-start/README.md) | Comprehensive AI context |
| 2 | [Coding Standards](../modules/02-coding-standards/README.md) | Code & doc style |
| 3 | [Feature Development](../modules/03-feature-development/README.md) | Build workflows |
| 4 | [Reference Docs](../modules/04-reference-docs/README.md) | Documentation |
| 5 | [Project Planning](../modules/05-project-planning/README.md) | Multi-feature mgmt |

---

## Next Steps

- [New Project Setup](./new-project.md) - Starting from scratch
- [Existing Project Setup](./existing-project.md) - Adding to existing code
