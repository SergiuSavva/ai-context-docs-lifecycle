# Guides

> **Step-by-step instructions** for applying the AI Context Docs Lifecycle methodology.

---

## Available Guides

| Guide | Purpose |
|-------|---------|
| [Getting Started](./getting-started.md) | Choose which modules to adopt |
| [New Project](./new-project.md) | Set up from scratch |
| [Existing Project](./existing-project.md) | Add to existing codebase |

---

## Which Guide to Use?

### Start with [Getting Started](./getting-started.md) to:

- Understand the 5 modules available
- Choose which modules fit your needs
- See recommended combinations

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
   - What modules does the user want?

2. **Read the appropriate guide**
   - New project: [new-project.md](./new-project.md)
   - Existing project: [existing-project.md](./existing-project.md)

3. **Read relevant modules**
   - [Module 1: Quick Start](../modules/01-quick-start/) - AGENTS.md template
   - [Module 2: Coding Standards](../modules/02-coding-standards/) - .cursor/rules/
   - [Module 3: Feature Development](../modules/03-feature-development/) - Workflows
   - [Module 4: Reference Docs](../modules/04-reference-docs/) - Documentation
   - [Module 5: Project Planning](../modules/05-project-planning/) - Multi-feature

4. **Use templates from modules**
   - Each module has a `templates/` folder
   - Copy and customize for the project

5. **Reference examples**
   - Module 2: `examples/.cursor/rules/`
   - Module 3: `examples/simple-todo/` and `examples/complex-auth/`

---

## Common Tasks

### Adding AI context to any project (5 min)

```
1. Copy AGENTS.md from modules/01-quick-start/templates/
2. Fill in project details (commands, stack, patterns)
3. Done!
```

### Setting up coding standards (10 min)

```
1. Create .cursor/rules/ folder
2. Copy code-style.mdc and doc-style.mdc from modules/02-coding-standards/templates/
3. Customize for your language/framework
```

### Building a feature

```
1. Determine workflow: Quick, Standard, or Complex
   - See modules/03-feature-development/README.md for decision tree
2. Create docs/specs/<feature>/ if Standard or Complex
3. Copy relevant templates from modules/03-feature-development/templates/
4. Follow workflow guide
5. Update reference docs when complete
```

### Making an architecture decision

```
1. Create ADR from modules/03-feature-development/templates/adr.md
2. Place in docs/decisions/NNN-title.md
3. Document context, decision, rationale, consequences
```

---

## Module Index

| Module | Templates | Examples |
|--------|-----------|----------|
| [01-quick-start](../modules/01-quick-start/) | `templates/AGENTS.md` | - |
| [02-coding-standards](../modules/02-coding-standards/) | `templates/.cursor/rules/` | `examples/.cursor/rules/` |
| [03-feature-development](../modules/03-feature-development/) | `templates/` (5 files) | `examples/simple-todo/`, `examples/complex-auth/` |
| [04-reference-docs](../modules/04-reference-docs/) | `templates/` (3 files) | - |
| [05-project-planning](../modules/05-project-planning/) | `templates/` (4 files) | - |

---

## See Also

| Resource | Purpose |
|----------|---------|
| [Modules Index](../modules/README.md) | Overview of all modules |
| [Main README](../../README.md) | Project overview |
| [Methodology](../../METHODOLOGY.md) | Full philosophy |
