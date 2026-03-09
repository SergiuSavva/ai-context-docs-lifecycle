# Quick Start

> Start here. Three steps to give AI agents consistent context for your project.

---

## What You're Setting Up

| File / Folder | What It Does |
|---------------|--------------|
| `AGENTS.md` | Always-loaded project summary: stack, commands, structure, boundaries |
| `docs/` | Durable reference docs (only the ones your project needs) |
| `.agents/skills/` | On-demand instructions loaded when the task matches |

**Solo side project?** You need `AGENTS.md` and maybe one doc. Start there. Skills are optional.

---

## Step 1: Install ACDL Assets

```bash
npx @acdl/cli init
```

This installs methodology skills and templates into your project:

- `.agents/skills/acdl/` — bootstrap skill + `AGENTS.md` templates
- `.agents/skills/feature-workflow/` — spec and task templates (Module 2, default)
- optional `.cursor/rules/feature-workflow.mdc` — Cursor bridge

> **Note**: `init` installs assets only. Your AI generates the actual project-specific files in Step 2.

If assets already exist:

```bash
npx @acdl/cli init --force
```

---

## Step 2: Let AI Generate Your Context

Tell your AI assistant:

```text
Bootstrap AGENTS.md for this project.
load skill `acdl`
```

The `acdl` skill will:

1. Detect project type (single app or monorepo)
2. Scan your stack and commands
3. Show you a plan — what files it will create
4. Wait for your approval before writing anything
5. Generate `AGENTS.md` + only the `docs/` files your project needs

If your tool cannot load skills by name:

```text
Bootstrap AGENTS.md for this project.
Follow: .agents/skills/acdl/SKILL.md
```

If you are not using the CLI (no local skills installed):

```text
Bootstrap AGENTS.md for this project.
Follow: https://raw.githubusercontent.com/SergiuSavva/ai-context-docs-lifecycle/main/content/modules/01-project-context/skills/acdl/SKILL.md
```

---

## Step 3: Review and Done

Check what the AI generated:

- `AGENTS.md` — does it reflect your real stack, commands, and structure?
- `docs/` — does it only contain docs for what your project actually has?

Trim anything that feels like filler. The value comes from accuracy, not completeness.

```
your-project/
├── AGENTS.md              # Always loaded by AI
└── docs/                  # Loaded on-demand
    ├── scripts.md          # Common first doc: runnable commands
    └── decisions/          # Architecture decisions (add as needed)
```

AI agents will now read `AGENTS.md` automatically and load `docs/` when relevant.

---

## Add More When You Need It

Start minimal. Expand only when you hit a real pain.

### Pain: AI keeps guessing commands wrong

Add `docs/scripts.md` — canonical runnable commands with verified/inferred labels.

### Pain: AI keeps getting your stack patterns wrong

Add a stack skill:

```bash
mkdir -p .agents/skills/my-stack
# Create .agents/skills/my-stack/SKILL.md with your patterns
```

See [Module 1: Skills](modules/01-project-context/README.md#skills-on-demand-instruction-packages).

### Pain: Feature work is chaotic or hard to resume

Install Module 2 if you haven't already:

```bash
npx @acdl/cli init --modules 2
```

Then tell your AI: `load skill \`feature-workflow\``

You'll get a Research → Plan → Implement → Verify workflow with spec and task templates.

### Pain: Managing too many features at once

Add Module 3 for roadmap, backlog, and project tracking:

```bash
npx @acdl/cli init --modules 3
```

Then tell your AI: `load skill \`project-planning\``

---

## Reference: What Each Module Installs

| Module | What Gets Installed | Default? |
|--------|---------------------|----------|
| 1 — Project Context | `acdl`, `agents-md`, `doc-writing` skills | Yes |
| 2 — Feature Development | `feature-workflow`, `spec-writing`, `workflow-guide` skills + optional Cursor bridge | Yes |
| 3 — Project Planning | `project-planning` skill | No |

```bash
npx @acdl/cli init -y                  # installs Modules 1 + 2 (defaults)
npx @acdl/cli init --modules 1        # Module 1 only
npx @acdl/cli init --modules 1,2,3    # all modules
npx @acdl/cli init --dry-run -y       # preview without writing files
```

---

## Manual Setup (No CLI)

If you prefer not to use the CLI:

1. Copy [`AGENTS-single-app.md`](https://github.com/SergiuSavva/ai-context-docs-lifecycle/blob/main/content/modules/01-project-context/skills/acdl/templates/AGENTS-single-app.md) to your project root as `AGENTS.md`
2. Fill in your stack, commands, structure, and boundaries
3. Create `docs/scripts.md` from the [template](https://github.com/SergiuSavva/ai-context-docs-lifecycle/blob/main/content/modules/01-project-context/skills/acdl/templates/docs/scripts.md)
4. Add other docs only if your project has them (architecture, API, auth, data model)

See the full [template catalog](modules/01-project-context/README.md#choose-your-template).

---

## Next Steps

- [New Project Setup](guides/new-project.md) — detailed walkthrough from scratch
- [Existing Project Setup](guides/existing-project.md) — adding ACDL to an existing codebase
- [Module 1: Project Context](modules/01-project-context/README.md) — AGENTS.md, docs/, skills in depth
- [Module 2: Feature Development](modules/02-feature-development/README.md) — feature workflow and spec templates
- [Skills Catalog](guides/skills-catalog.md) — available skills and when to use them
