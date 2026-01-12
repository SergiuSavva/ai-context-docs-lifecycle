# Guides

> **For AI Agents**: Step-by-step instructions for applying the AI Context Docs Lifecycle methodology.

---

## Available Guides

| Guide | Purpose |
|-------|---------|
| [New Project](./new-project.md) | Apply methodology to a brand new project |
| [Existing Project](./existing-project.md) | Add methodology to an existing codebase |

---

## Which Guide to Use?

### Use [New Project](./new-project.md) when:

- Starting a project from scratch
- Creating a greenfield application
- Setting up a new repository

### Use [Existing Project](./existing-project.md) when:

- Adding the methodology to an existing codebase
- Migrating a project to use this methodology
- Incrementally adopting the approach

---

## Quick Start for AI Agents

When asked to apply this methodology:

1. **Determine project state**
   - Is this a new project or existing?
   - What's the current structure?

2. **Read the appropriate guide**
   - New project: `guides/new-project.md`
   - Existing project: `guides/existing-project.md`

3. **Follow the required rules**
   - Structure: `rules/00-structure.md`
   - Workflow: `rules/01-workflow.md`

4. **Use templates to create files**
   - Copy from `../templates/`
   - Replace placeholders with project values

5. **Reference examples for understanding**
   - See `../examples/` for filled-in samples
   - Do NOT copy example content directly

---

## Common Tasks

### Adding AI Context Docs Lifecycle to any project

```
1. Read rules/00-structure.md (required structure)
2. Create AGENTS.md from templates/AGENTS.md
3. Create .cursor/rules/00-index.mdc from templates/cursor-rules/00-index.mdc
4. Create docs/ folder structure
5. Follow rules/01-workflow.md going forward
```

### Creating a new feature

```
1. Write PRD-lite spec from templates/prd-lite.md → docs/specs/<feature>.md
2. Create feature docs from templates/ → docs/features/<feature>/
3. Add tasks to docs/TASKS.md
4. Build following .cursor/rules/
5. Update docs as you build
```

### Making an architecture decision

```
1. Create ADR from templates/adr.md → docs/decisions/NNN-title.md
2. Document context, decision, consequences
3. Reference ADR in related code/docs
```

---

## Templates vs Examples

| Folder | Purpose | When to Use |
|--------|---------|-------------|
| `../templates/` | Skeleton files with placeholders | Copy and customize for your project |
| `../examples/` | Filled-in reference samples | Read to understand expected format |

**Important**: Always use templates to create new files. Examples are reference only.
