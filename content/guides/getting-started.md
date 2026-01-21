# Getting Started

> **Pick the modules you need** - Start minimal, add complexity as needed.

---

## Quick Decision: Which Modules?

### Just Starting? (5 minutes)

**Start with Module 1 only.**

```bash
# What you get:
your-project/
└── AGENTS.md    # AI context file
```

[Go to Module 1: Quick Start →](../modules/01-quick-start/)

---

### Building Features? (15 minutes)

**Add Module 3 for feature workflows.**

```bash
# What you get:
your-project/
├── AGENTS.md
├── docs/specs/           # Feature specifications
└── .cursor/rules/
    └── feature-workflow.mdc
```

[Go to Module 3: Feature Development →](../modules/03-feature-development/)

---

### Want Consistent Code? (10 minutes)

**Add Module 2 for coding standards.**

```bash
# What you get:
your-project/
├── AGENTS.md
└── .cursor/rules/
    ├── code-style.mdc
    └── doc-style.mdc
```

[Go to Module 2: Coding Standards →](../modules/02-coding-standards/)

---

### Need Full Documentation? (20 minutes)

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

[Go to Module 4: Reference Docs →](../modules/04-reference-docs/)

---

### Managing Multiple Features? (15 minutes)

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

[Go to Module 5: Project Planning →](../modules/05-project-planning/)

---

## Recommended Combinations

### Solo Developer (Minimal)

```
Module 1 (Quick Start) + Module 3 (Feature Development)
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

| # | Module | Purpose | Time |
|---|--------|---------|------|
| 1 | [Quick Start](../modules/01-quick-start/) | Minimal AI context | 5 min |
| 2 | [Coding Standards](../modules/02-coding-standards/) | Code & doc style | 10 min |
| 3 | [Feature Development](../modules/03-feature-development/) | Build workflows | 15 min |
| 4 | [Reference Docs](../modules/04-reference-docs/) | Documentation | 20 min |
| 5 | [Project Planning](../modules/05-project-planning/) | Multi-feature mgmt | 15 min |

---

## Next Steps

- [New Project Setup](./new-project.md) - Starting from scratch
- [Existing Project Setup](./existing-project.md) - Adding to existing code
