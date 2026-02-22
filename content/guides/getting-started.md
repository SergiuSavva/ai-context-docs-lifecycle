# Getting Started

> **Pick the modules you need** - Start minimal, add complexity as needed.

---

## Recommended First Command

From your project root:

```bash
npx @acdl/cli init
```

This initializes `.acdl/` with a local copy of methodology docs and templates.

---

## Quick Decision: Which Modules?

### Just Starting?

**Start with Module 1 (Basic tier).**

```bash
# What you get:
your-project/
├── AGENTS.md    # AI context file (~80 lines)
└── docs/        # Reference docs (only docs your project needs)
```

Add `.agents/skills/` when you need deep coding patterns (Full tier).

[Go to Module 1: Project Context →](../modules/01-project-context/README.md)

---

### Building Features?

**Add Module 2 for feature workflows.**

```bash
# What you get:
your-project/
├── AGENTS.md
├── .agents/skills/          # On-demand instruction packages (optional)
├── specs/                   # Feature specifications (ephemeral)
└── docs/
```

[Go to Module 2: Feature Development →](../modules/02-feature-development/README.md)

---

### Managing Multiple Features?

**Add Module 3 for project planning.**

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

[Go to Module 3: Project Planning →](../modules/03-project-planning/README.md)

---

## AI-Assisted Bootstrap (Plan Mode First)

Use a two-pass flow for safer setup:

1. **Plan mode** - analyze and propose files, commands, and assumptions (no writes)
2. **Apply mode** - generate approved files from templates

Use this prompt:

```text
Bootstrap this project with AI Context Docs Lifecycle.

Follow:
.acdl/content/modules/01-project-context/bootstrap-workflow.md

Start in plan mode only. Output:
1) Project type (single app or monorepo)
2) Files to create/update
3) Commands with verified/inferred status + source
4) Assumptions and open questions

Wait for my approval before apply mode.
```

If you are not using the CLI, replace the workflow path with:
`https://raw.githubusercontent.com/SergiuSavva/ai-context-docs-lifecycle/main/content/modules/01-project-context/bootstrap-workflow.md`

---

## Recommended Combinations

### Solo Developer (Minimal)

```
Module 1 — Basic tier (AGENTS.md + docs/)
```

Best for: Personal projects, prototypes, small apps

### Solo Developer (Standard)

```
Module 1 — Full tier (AGENTS.md + docs/ + .agents/skills/)
```

Best for: Production apps with specific tech stack patterns

### Team Project

```
Modules 1 + 2 (Project Context + Feature Dev)
```

Best for: Team projects building multiple features

### Enterprise

```
All modules (1 + 2 + 3)
```

Best for: Products with roadmaps, multiple teams

---

## Module Overview

| # | Module | Purpose |
|---|--------|---------|
| 1 | [Project Context](../modules/01-project-context/README.md) | AGENTS.md + docs/ + .agents/skills/ |
| 2 | [Feature Development](../modules/02-feature-development/README.md) | Workflows for building features (specs/) |
| 3 | [Project Planning](../modules/03-project-planning/README.md) | Multi-feature management (optional) |

---

## Next Steps

- [New Project Setup](./new-project.md) — Starting from scratch
- [Existing Project Setup](./existing-project.md) — Adding to existing code
