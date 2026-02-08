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

### Step 2: Add AGENTS.md

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
- Context Loading table (references to docs/ and skills)
- Boundaries (always/ask/never)

### Step 3: Add Reference Docs

```bash
mkdir -p docs/decisions
```

Create docs from [Module 1 templates](../modules/01-project-context/templates/docs/):
- `docs/architecture.md` — System overview
- `docs/data-model.md` — Database schema (if applicable)
- `docs/api.md` — API surface (if applicable)
- `docs/auth.md` — Auth flows (if applicable)

### Step 4: Done!

AI agents can now understand your project.

---

## Full Setup (with Skills)

Want the complete setup with on-demand skills? Add these steps:

### Step 5: Add Skills

```bash
mkdir -p .agents/skills
```

Create skills for your tech stack domains. See [Module 2](../modules/02-skills/README.md) for the SKILL.md format and template.

### Step 6: Add Feature Workflow

Copy the workflow template from [Module 3](../modules/03-feature-development/README.md):

```bash
mkdir -p specs
```

**Option A** (Cursor-specific): Copy `feature-workflow.mdc` to `.cursor/rules/`
**Option B** (Portable): Create `.agents/skills/feature-workflow/SKILL.md`

### Step 7: Verify Structure

```
my-project/
├── AGENTS.md                          # Layer 1: Always loaded
├── .agents/skills/                    # Layer 2: On-demand skills
│   ├── database/SKILL.md
│   └── testing/SKILL.md
├── docs/                              # Layer 3: Reference docs
│   ├── architecture.md
│   ├── data-model.md
│   ├── api.md
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
https://github.com/sergiusavva/ai-context-docs-lifecycle/content/guides/getting-started.md

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
- [Examples](../modules/01-project-context/examples/demo-taskflow/README.md) — See complete demo
