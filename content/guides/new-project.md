# New Project Setup

> **Starting from scratch?** Follow this guide to set up AI Context Docs Lifecycle. For the fastest path (3 steps), see [Quick Start →](../quick-start.md) first.

---

## Quick Setup

### Step 1: Create Project Structure

```bash
mkdir my-project
cd my-project
git init
```

### Step 2: Install ACDL Assets (Recommended)

```bash
npx @acdl/cli init
```

This installs methodology skills/templates directly into your project (for example `.agents/skills/...` and optional `.cursor/rules/feature-workflow.mdc`).

If the installed assets already exist:

```bash
npx @acdl/cli init --force
```

### Step 3: Add AGENTS.md

Copy the template from [Module 1](../modules/01-project-context/skills/acdl/templates/AGENTS-single-app.md):

```bash
# Create AGENTS.md at project root
touch AGENTS.md
```

Fill in:
- Stack and versions
- Commands (dev, build, test)
- Project structure
- Conventions (short, inline)
- Context Loading table (references to docs/)
- Boundaries (always/ask/never)

### Step 4: Add Reference Docs

```bash
mkdir -p docs/decisions
```

Create docs from the [Module 1 template catalog](../modules/01-project-context/README.md#choose-your-template) — only the ones that match your project:
- [`docs/architecture.md`](../modules/01-project-context/skills/acdl/templates/docs/architecture.md) — if project has multiple layers or services
- [`docs/data-model.md`](../modules/01-project-context/skills/acdl/templates/docs/data-model.md) — if project has a database
- [`docs/api.md`](../modules/01-project-context/skills/acdl/templates/docs/api.md) — if project exposes or consumes APIs
- [`docs/auth.md`](../modules/01-project-context/skills/acdl/templates/docs/auth.md) — if project has authentication
- [`docs/scripts.md`](../modules/01-project-context/skills/acdl/templates/docs/scripts.md) — if project has runnable commands

A simple CLI might only need `scripts.md`. A library might only need `architecture.md`.

### Step 5: Done!

AI agents can now understand your project.

---

## Full Setup (with Skills)

Want the complete setup with on-demand skills? Add these steps:

### Step 6: Add Skills

```bash
mkdir -p .agents/skills
```

Create skills for your tech stack domains. See the [Skills section in Module 1](../modules/01-project-context/README.md#skills-on-demand-instruction-packages) for the SKILL.md format and template.

### Step 7: Add Feature Workflow

Copy the workflow template from [Module 2](../modules/02-feature-development/README.md):

```bash
mkdir -p specs
```

**Option A** (Cursor-specific): Copy `feature-workflow.mdc` to `.cursor/rules/`
**Option B** (Portable): Create `.agents/skills/feature-workflow/SKILL.md`

### Step 8: Verify Structure

```
my-project/
├── AGENTS.md                          # Discovery: Always loaded
├── .agents/skills/                    # Activation: On-demand skills
│   ├── {skill}/SKILL.md
│   └── {skill}/SKILL.md
├── docs/                              # Activation: Reference docs (project-specific)
│   ├── {relevant docs}.md
│   ├── scripts.md                     # Execution: Loaded before running commands
│   └── decisions/
├── specs/                             # Feature work (ephemeral)
└── src/
```

---

## AI-Assisted Setup

Tell your AI assistant:

```
Apply the AI Context Docs Lifecycle methodology to this new project.

Read:
.agents/skills/acdl/SKILL.md

Set up:
1. AGENTS.md with project context
2. docs/ with reference documentation
3. .agents/skills/ for tech stack patterns

My tech stack is: [YOUR TECH STACK]
```

The AI will:
1. Create appropriate folder structure
2. Generate customized AGENTS.md
3. Create reference docs and skills for your stack

If your tool cannot load skills by name, point it to `.agents/skills/acdl/SKILL.md`. If you are not using the CLI, provide the GitHub raw URL for `content/modules/01-project-context/skills/acdl/SKILL.md` instead of the local path.

---

## First Feature

After setup, build your first feature:

### Quick Flow (bug fix, config change)

No spec needed. Just fix and commit.

### Standard Flow (small feature)

```bash
# 1. Create spec
mkdir -p specs/my-feature
# Copy spec.md and tasks.md from Module 2 templates

# 2. Tell AI
"Build the feature specified in specs/my-feature/"

# 3. AI implements following workflow
# 4. Review and approve
# 5. Update docs/ if needed
# 6. Delete spec folder
```

### Complex Flow (large feature)

```bash
# 1. Create research
mkdir -p specs/my-feature
# Copy all templates from Module 2

# 2. Tell AI
"Research options for [feature] and create research.md"

# 3. Review research, approve approach
# 4. AI creates spec and implements
# 5. Create ADR for decisions
# 6. Update docs/
# 7. Delete spec folder
```

---

## Checklist

- [ ] `AGENTS.md` created at root
- [ ] `docs/` folder with reference docs
- [ ] `docs/decisions/` for ADRs
- [ ] `.agents/skills/` with relevant skills (optional)
- [ ] `specs/` folder for feature work (optional)
- [ ] First feature spec ready (optional)

---

## Next Steps

- [Module 2: Feature Development](../modules/02-feature-development/README.md) — Learn the workflows
- [Skills Catalog](./skills-catalog.md) — Available skills and when to use them
