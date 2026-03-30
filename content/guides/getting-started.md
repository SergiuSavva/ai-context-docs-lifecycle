# Getting Started

> **Pick the modules you need.** New to ACDL? Start with [Quick Start ->](../quick-start.md) for the minimum setup, then return here to choose which modules to add.

---

## Recommended First Command

From your project root:

```bash
npx @acdl/cli init
```

This installs methodology skills/templates directly into your project (`.agents/skills/...`).

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

[Go to Module 1: Foundation ->](../modules/01-foundation/README.md)

---

### Building Features?

**The feature workflow is included in Module 2 (Dev Workflow).**

```bash
# What you get:
your-project/
├── AGENTS.md
├── .agents/skills/          # On-demand instruction packages (optional)
├── specs/                   # Feature specifications (ephemeral)
└── docs/
```

Tell your AI: `load skill feature`

[Go to Module 2: Dev Workflow ->](../modules/02-dev-workflow/README.md)

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

[Go to Module 3: Project Planning ->](../modules/03-project-planning/README.md)

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
`https://raw.githubusercontent.com/SergiuSavva/ai-context-docs-lifecycle/main/content/modules/01-foundation/skills/acdl/SKILL.md`

---

## Recommended Combinations

### Starter

```
Module 1 — Standard tier (AGENTS.md + docs/)
```

Best for: Personal projects, prototypes, side projects

### Production

```
Modules 1-2 — Full tier (AGENTS.md + docs/ + .agents/skills/ + feature workflow)
```

Best for: Production apps with specific tech stack patterns

### Enterprise

```
All modules (1-3)
```

Best for: Products with roadmaps, multiple teams

---

## Module Overview

| # | Module | Purpose |
|---|--------|---------|
| 1 | [Foundation](../modules/01-foundation/README.md) | AGENTS.md bootstrap + reference doc templates |
| 2 | [Dev Workflow](../modules/02-dev-workflow/README.md) | Feature workflow + stack pattern skills |
| 3 | [Project Planning](../modules/03-project-planning/README.md) | Multi-feature management (optional) |

---

## Next Steps

- [New Project Setup](./new-project.md) — Starting from scratch
- [Existing Project Setup](./existing-project.md) — Adding to existing code
