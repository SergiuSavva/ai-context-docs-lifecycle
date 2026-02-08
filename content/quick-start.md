# Quick Start

Get AI context for your project. Choose your setup level:

## Option 1: Minimal

Just need AI context? Use **Module 1** only.

### Step 1: Create AGENTS.md

Create `AGENTS.md` at your project root (~80 lines):

```markdown
# [Project Name]

> [One-line description]

## Stack

| Tech | Version |
|------|---------|
| Framework | [Your framework] |
| Language | [Your language] |
| Database | [Your database] |

## Commands

```bash
npm run dev     # Dev server
npm run build   # Production build
npm run test    # Run tests
```

## Structure

```
src/
├── app/           # Routes/pages
├── features/      # Feature modules
└── shared/        # Shared utilities
```

## Conventions

- [Convention 1]
- [Convention 2]

## Context Loading

| Task | Read |
|------|------|
| Architecture | @docs/architecture.md |
| Database | @docs/data-model.md |

## Boundaries

### Always
- [Rule 1]

### Never
- [Anti-pattern 1]
```

### Step 2: Add Reference Docs

```bash
mkdir -p docs/decisions
```

Create `docs/architecture.md` with your system overview.

### Step 3: Done!

AI agents will read AGENTS.md automatically and load docs/ on-demand.

---

## Option 2: Standard (with Skills)

Want on-demand coding patterns? Add **Modules 1 + 2**.

### Step 1: Add AGENTS.md + docs/ (see above)

### Step 2: Add Skills

```bash
mkdir -p .agents/skills
```

Create `SKILL.md` files for your tech stack domains:

| Skill | Covers |
|-------|--------|
| `database/SKILL.md` | ORM patterns, migrations, queries |
| `testing/SKILL.md` | Test strategy, which tool for what |
| `ui-components/SKILL.md` | Component library, theming |

See [Module 2](modules/02-skills/README.md) for the SKILL.md format.

---

## Option 3: AI-Assisted Setup

Tell your AI assistant:

```
Apply the AI Context Docs Lifecycle methodology to this project.

Read the guide at:
https://github.com/SergiuSavva/ai-context-docs-lifecycle/content/guides/getting-started.md

Set up:
1. AGENTS.md with project context
2. docs/ with reference documentation
3. .agents/skills/ for tech stack patterns

My tech stack is: [YOUR TECH STACK]
```

The AI will:

1. Analyze your project
2. Create appropriate structure
3. Fill in project-specific details

---

## What You Get

### Module 1: Project Context

```
project/
├── AGENTS.md          # Always loaded (~80 lines)
└── docs/              # On-demand reference
    ├── architecture.md
    ├── data-model.md
    ├── api.md
    └── decisions/
```

### Modules 1 + 2 + 3

```
project/
├── AGENTS.md              # Layer 1: Always loaded
├── .agents/skills/        # Layer 2: On-demand skills
│   ├── database/SKILL.md
│   └── testing/SKILL.md
├── docs/                  # Layer 3: Reference docs
│   ├── architecture.md
│   └── decisions/
└── specs/                 # Feature work (ephemeral)
```

---

## Three Workflow Tracks

Once set up, use these workflows for building features:

| Flow | Use For | Templates |
|------|---------|-----------|
| **Quick** | Bug fixes, config changes | None |
| **Standard** | Features | spec.md + tasks.md |
| **Complex** | Research needed | All templates + ADR |

---

## Next Steps

- [View all modules](modules/README.md) — Browse templates and examples
- [New project guide](guides/new-project.md) — Detailed setup walkthrough
- [Existing project guide](guides/existing-project.md) — Add to existing code
- [Demo example](modules/01-project-context/examples/demo-taskflow/README.md) — See it all in action

---

## Alternative: Manual Download

If your AI can't access URLs, download templates from:

**GitHub**: [github.com/SergiuSavva/ai-context-docs-lifecycle/content/modules/](https://github.com/SergiuSavva/ai-context-docs-lifecycle/tree/main/content/modules/)

Then paste the relevant templates into your project.
