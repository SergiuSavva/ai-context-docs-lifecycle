# Getting Started

> **Pick the modules you need** - Start minimal, add complexity as needed.

---

## Quick Decision: Which Modules?

### Just Starting?

**Start with Module 1 only.**

```bash
# What you get:
your-project/
├── AGENTS.md    # AI context file (~80 lines)
└── docs/        # Reference docs (architecture, data model, API, auth)
```

[Go to Module 1: Project Context →](../modules/01-project-context/README.md)

---

### Need Deep Coding Patterns?

**Add Module 2 for on-demand skills.**

```bash
# What you get:
your-project/
├── AGENTS.md
├── .agents/skills/          # On-demand instruction packages
│   ├── database/SKILL.md
│   ├── testing/SKILL.md
│   └── ui-components/SKILL.md
└── docs/
```

[Go to Module 2: Skills →](../modules/02-skills/README.md)

---

### Building Features?

**Add Module 3 for feature workflows.**

```bash
# What you get:
your-project/
├── AGENTS.md
├── .agents/skills/
├── specs/           # Feature specifications (ephemeral)
└── docs/
```

[Go to Module 3: Feature Development →](../modules/03-feature-development/README.md)

---

### Managing Multiple Features?

**Add Module 4 for project planning.**

```bash
# What you get:
your-project/
├── AGENTS.md
├── PROJECT-PRD.md   # Project vision
├── BACKLOG.md       # Feature priorities
├── ROADMAP.md       # Phase planning
├── TASKS.md         # Global progress
├── .agents/skills/
├── specs/
└── docs/
```

[Go to Module 4: Project Planning →](../modules/04-project-planning/README.md)

---

## AI-Assisted Bootstrap (Plan Mode First)

Use a two-pass flow for safer setup:

1. **Plan mode** - analyze and propose files, commands, and assumptions (no writes)
2. **Apply mode** - generate approved files from templates

Use this prompt:

```text
Bootstrap this project with AI Context Docs Lifecycle.

Follow:
https://raw.githubusercontent.com/SergiuSavva/ai-context-docs-lifecycle/main/content/modules/01-project-context/bootstrap-workflow.md

Start in plan mode only. Output:
1) Project type (single app or monorepo)
2) Files to create/update
3) Commands with verified/inferred status + source
4) Assumptions and open questions

Wait for my approval before apply mode.
```

---

## Recommended Combinations

### Solo Developer (Minimal)

```
Module 1 (Project Context)
```

Best for: Personal projects, prototypes, small apps

### Solo Developer (Standard)

```
Modules 1 + 2 (Project Context + Skills)
```

Best for: Production apps with specific tech stack patterns

### Team Project

```
Modules 1 + 2 + 3 (Project Context + Skills + Feature Dev)
```

Best for: Team projects building multiple features

### Enterprise

```
All modules (1 + 2 + 3 + 4)
```

Best for: Products with roadmaps, multiple teams

---

## Module Overview

| # | Module | Purpose |
|---|--------|---------|
| 1 | [Project Context](../modules/01-project-context/README.md) | AGENTS.md + docs/ (always-loaded context + reference) |
| 2 | [Skills](../modules/02-skills/README.md) | On-demand instruction packages (.agents/skills/) |
| 3 | [Feature Development](../modules/03-feature-development/README.md) | Workflows for building features (specs/) |
| 4 | [Project Planning](../modules/04-project-planning/README.md) | Multi-feature management (optional) |

---

## Next Steps

- [New Project Setup](./new-project.md) — Starting from scratch
- [Existing Project Setup](./existing-project.md) — Adding to existing code
