# New Project Setup

> **Starting from scratch?** Follow this guide to set up AI Context Docs Lifecycle.

---

## Quick Setup

### Step 1: Create Project Structure

```bash
mkdir my-project
cd my-project
git init
```

### Step 2: Initialize ACDL Workspace (Recommended)

```bash
npx @acdl/cli init
```

This creates `.acdl/` with local methodology content and templates.

If `.acdl/` already exists:

```bash
npx @acdl/cli init --force
```

### Step 3: Add AGENTS.md

Copy the template from [Module 1](../modules/01-project-context/templates/AGENTS-single-app.md):

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
- [`docs/architecture.md`](../modules/01-project-context/templates/docs/architecture.md) — if project has multiple layers or services
- [`docs/data-model.md`](../modules/01-project-context/templates/docs/data-model.md) — if project has a database
- [`docs/api.md`](../modules/01-project-context/templates/docs/api.md) — if project exposes or consumes APIs
- [`docs/auth.md`](../modules/01-project-context/templates/docs/auth.md) — if project has authentication
- [`docs/scripts.md`](../modules/01-project-context/templates/docs/scripts.md) — if project has runnable commands

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

Create skills for your tech stack domains. See [Module 2](../modules/02-skills/README.md) for the SKILL.md format and template.

### Step 7: Add Feature Workflow

Copy the workflow template from [Module 3](../modules/03-feature-development/README.md):

```bash
mkdir -p specs
```

**Option A** (Cursor-specific): Copy `feature-workflow.mdc` to `.cursor/rules/`
**Option B** (Portable): Create `.agents/skills/feature-workflow/SKILL.md`

### Step 8: Verify Structure

```
my-project/
├── AGENTS.md                          # Layer 1: Always loaded
├── .agents/skills/                    # Layer 2: On-demand skills
│   ├── {skill}/SKILL.md
│   └── {skill}/SKILL.md
├── docs/                              # Layer 3: Reference docs (project-specific)
│   ├── {relevant docs}.md
│   ├── scripts.md
│   └── decisions/
├── specs/                             # Feature work (ephemeral)
└── src/
```

---

## AI-Assisted Setup

Tell your AI assistant:

```
Apply the AI Context Docs Lifecycle methodology to this new project.

Read the getting-started guide at:
.acdl/content/guides/getting-started.md

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

If you are not using the CLI, provide the GitHub URL instead of the local `.acdl/` path.

---

## First Feature

After setup, build your first feature:

### Quick Flow (bug fix, config change)

No spec needed. Just fix and commit.

### Standard Flow (small feature)

```bash
# 1. Create spec
mkdir -p specs/my-feature
# Copy spec.md and tasks.md from Module 3 templates

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
# Copy all templates from Module 3

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

- [Module 3: Feature Development](../modules/03-feature-development/README.md) — Learn the workflows
- [Skills Catalog](./skills-catalog.md) — Available skills and when to use them
