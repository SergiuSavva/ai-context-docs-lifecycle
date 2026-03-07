# Quick Start

Get AI context for your project. Choose your setup level:

## Recommended First Command

From your project root:

```bash
npx @acdl/cli init
```

This installs methodology skills/templates directly into your project (for example `.agents/skills/...` and optional `.cursor/rules/feature-workflow.mdc`).

---

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
| Language | [Your language] |
| Framework | [Your framework] |

## Commands

```bash
npm run dev     # Dev server
npm run build   # Production build
npm run test    # Run tests
```

## Structure

```
[your source directory]/
├── [area 1]/      # [description]
├── [area 2]/      # [description]
└── [area 3]/      # [description]
```

## Conventions

- [Convention 1]
- [Convention 2]

## Context Loading

| Task | Read |
|------|------|
| [relevant task] | @docs/[relevant-doc].md |

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

Create reference docs that match your project. See [Module 1 templates](modules/01-project-context/README.md#choose-your-template) for the catalog. A simple project might only need `docs/scripts.md`.

### Step 3: Done!

AI agents will read AGENTS.md automatically and load docs/ on-demand.

---

## Option 2: Full (with Skills)

Want on-demand coding patterns? Use **Module 1 Full tier**.

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

See the [Skills section in Module 1](modules/01-project-context/README.md#skills-on-demand-instruction-packages) for the SKILL.md format.

---

## Option 3: AI-Assisted Setup (Plan Mode First)

Tell your AI assistant:

```
Apply the AI Context Docs Lifecycle methodology to this project.
load skill `acdl`

Start in plan mode only and output:
1. AGENTS.md with project context
2. docs/ with reference documentation
3. .agents/skills/ for tech stack patterns (if needed)
4. Commands list with verified/inferred status + source
5. Assumptions and open questions

Wait for my approval before apply mode.
My tech stack: [YOUR TECH STACK]
```

If your tool cannot load skills by name, replace `load skill \`acdl\`` with:
`.agents/skills/acdl/SKILL.md`

If you are not using the CLI, replace that local path with:
`https://raw.githubusercontent.com/SergiuSavva/ai-context-docs-lifecycle/main/content/modules/01-project-context/skills/acdl/SKILL.md`

The AI will:

1. Analyze your project without writing files first
2. Propose a safe, reviewable plan
3. Generate approved files in apply mode

---

## What You Get

### Module 1: Project Context

```
project/
├── AGENTS.md          # Always loaded (~80 lines)
└── docs/              # On-demand reference (only docs your project needs)
    ├── {relevant docs}.md
    └── decisions/
```

### Modules 1 + 2

```
project/
├── AGENTS.md              # Discovery: Always loaded
├── .agents/skills/        # Activation: On-demand skills
│   ├── {skill}/SKILL.md
│   └── {skill}/SKILL.md
├── docs/                  # Activation: Reference docs (project-specific)
│   ├── {relevant docs}.md
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
- [Skills Catalog](guides/skills-catalog.md) — Available skills and when to use them

---

## Alternative: Manual Download

If your AI can't access URLs, download templates from:

**GitHub**: [github.com/SergiuSavva/ai-context-docs-lifecycle/content/modules/](https://github.com/SergiuSavva/ai-context-docs-lifecycle/tree/main/content/modules/)

Then paste the relevant templates into your project.
