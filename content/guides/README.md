# Guides

> **For AI Agents**: Step-by-step instructions for applying the AI-First Dev Kit.

---

## Available Guides

| Guide | Purpose |
|-------|---------|
| [New Project](./new-project.md) | Apply kit to a brand new project |
| [Existing Project](./existing-project.md) | Add kit to an existing codebase |

---

## Which Guide to Use?

### Use [New Project](./new-project.md) when:

- Starting a project from scratch
- Creating a greenfield application
- Setting up a new repository

### Use [Existing Project](./existing-project.md) when:

- Adding the kit to an existing codebase
- Migrating a project to use this methodology
- Incrementally adopting the approach

---

## Quick Start for AI Agents

When asked to apply this kit:

1. **Determine project state**
   - Is this a new project or existing?
   - What's the current structure?

2. **Read the appropriate guide**
   - New project: `guides/new-project.md`
   - Existing project: `guides/existing-project.md`

3. **Follow the required rules**
   - Structure: `rules/00-structure.md`
   - Workflow: `rules/01-workflow.md`

4. **Use examples as templates**
   - All examples in `examples/`
   - Adapt to project specifics

---

## Common Tasks

### Adding AI-First Dev Kit to any project

```
1. Read rules/00-structure.md (required structure)
2. Create AGENTS.md at project root
3. Create .cursor/rules/00-index.mdc
4. Create docs/ folder structure
5. Follow rules/01-workflow.md going forward
```

### Creating a new feature

```
1. Write PRD-lite spec in docs/specs/<feature>.md
2. Create feature docs in docs/features/<feature>/
3. Add tasks to docs/TASKS.md
4. Build following .cursor/rules/
5. Update docs as you build
```

### Making an architecture decision

```
1. Create ADR in docs/decisions/NNN-title.md
2. Use examples/adr.md as template
3. Document context, decision, consequences
4. Reference ADR in related code/docs
```
