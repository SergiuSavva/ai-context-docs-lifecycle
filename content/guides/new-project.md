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

Copy the minimal template from [Module 1](../modules/01-quick-start/templates/AGENTS-single-app.md):

```bash
# Create AGENTS.md at project root
touch AGENTS.md
```

Fill in:
- Quick Start commands
- Project Overview
- Tech Stack
- File Organization

### Step 3: Done!

AI agents can now understand your project.

---

## Full Setup

Want the complete setup? Follow these steps:

### Step 1: Create Folder Structure

```bash
mkdir -p .cursor/rules
mkdir -p docs/{specs,features,decisions}
```

### Step 2: Add Core Files

| File | Source |
|------|--------|
| `AGENTS.md` | [Module 1 template](../modules/01-quick-start/templates/AGENTS-single-app.md) |
| `.cursor/rules/code-style.mdc` | Module 2: `templates/.cursor/rules/code-style.mdc` |
| `.cursor/rules/doc-style.mdc` | Module 2: `templates/.cursor/rules/doc-style.mdc` |
| `.cursor/rules/feature-workflow.mdc` | Module 3: `templates/.cursor/rules/feature-workflow.mdc` |
| `docs/INDEX.md` | [Module 4 template](../modules/04-reference-docs/templates/docs-index.md) |

### Step 3: Customize Templates

1. **AGENTS.md**: Fill in your actual tech stack and commands
2. **code-style.mdc**: Adjust for your language/framework
3. **doc-style.mdc**: Adjust for your doc preferences

### Step 4: Verify Structure

```
my-project/
├── AGENTS.md
├── .cursor/
│   └── rules/
│       ├── code-style.mdc
│       ├── doc-style.mdc
│       └── feature-workflow.mdc
└── docs/
    ├── INDEX.md
    ├── specs/
    ├── features/
    └── decisions/
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
2. .cursor/rules/ with coding standards
3. docs/ folder structure

My tech stack is: [YOUR TECH STACK]
```

The AI will:
1. Create appropriate folder structure
2. Generate customized templates
3. Fill in project-specific details

---

## First Feature

After setup, build your first feature:

### Quick Flow (bug fix, config change)

No spec needed. Just fix and commit.

### Standard Flow (small feature)

```bash
# 1. Create spec
mkdir -p docs/specs/my-feature
# Copy feature-spec.md and tasks.md from Module 3 templates

# 2. Tell AI
"Build the feature specified in docs/specs/my-feature/"

# 3. AI implements following workflow
# 4. Review and approve
# 5. Delete or archive spec
```

### Complex Flow (large feature)

```bash
# 1. Create research
mkdir -p docs/specs/my-feature
# Copy all templates from Module 3

# 2. Tell AI
"Research options for [feature] and create research.md"

# 3. Review research, approve approach
# 4. AI creates spec and implements
# 5. Create ADR for decisions
# 6. Archive spec
```

---

## Checklist

- [ ] `AGENTS.md` created at root
- [ ] `.cursor/rules/` folder created
- [ ] At least one `.mdc` rule file added
- [ ] `docs/` folder structure created
- [ ] `docs/INDEX.md` created
- [ ] First feature spec ready (optional)

---

## Next Steps

- [Module 3: Feature Development](../modules/03-feature-development/README.md) - Learn the workflows
- [Examples](../modules/03-feature-development/README.md#examples) - See complete walkthroughs
