# Getting Started

> **Pick the modules you need.** New to ACDL? Start with [Quick Start →](../quick-start.md) for the minimum setup, then return here to choose which modules to add.

---

## Recommended First Command

From your project root:

```bash
npx @acdl/cli init
```

This installs methodology skills/templates directly into your project (for example `.agents/skills/...` and optional `.cursor/rules/feature-workflow.mdc`).

---

## Quick Decision: Which Modules?

### Just Starting?

**Start with Module 1 — Standard tier.**

The minimum useful setup for a side project:

```
your-project/
├── AGENTS.md              # AI context (~80 lines) — always loaded
└── docs/                  # Reference docs — only the ones your project needs
    └── scripts.md         # Start here: runnable commands
```

- **Basic tier** = `AGENTS.md` only — fast start, minimum viable context
- **Standard tier** = `AGENTS.md` + `docs/` — adds durable reference knowledge
- **Full tier** = add `.agents/skills/` — for deep patterns you keep re-explaining

For a solo side project, Standard tier is the right default. Add skills only when the AI keeps getting your specific stack patterns wrong.

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
load skill `acdl`

Start in plan mode only. Output:
1) Project type (single app or monorepo)
2) Files to create/update
3) Commands with verified/inferred status + source
4) Assumptions and open questions

Wait for my approval before apply mode.
```

If your tool cannot load skills by name, replace `load skill \`acdl\`` with:
`.agents/skills/acdl/SKILL.md`

If you are not using the CLI, replace that local path with:
`https://raw.githubusercontent.com/SergiuSavva/ai-context-docs-lifecycle/main/content/modules/01-project-context/skills/acdl/SKILL.md`

---

## Recommended Combinations

### Starter

```
Module 1 — Standard tier (AGENTS.md + docs/)
```

Best for: Personal projects, prototypes, side projects

### Production

```
Module 1 — Full tier (AGENTS.md + docs/ + .agents/skills/)
```

Best for: Production apps with specific tech stack patterns

### Team

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
