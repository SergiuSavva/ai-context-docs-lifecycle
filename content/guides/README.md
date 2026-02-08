# Guides

> **Step-by-step instructions** for applying the AI Context Docs Lifecycle methodology.

---

## Available Guides

| Guide | Purpose |
|-------|---------|
| [Getting Started](./getting-started.md) | Choose which modules to adopt |
| [New Project](./new-project.md) | Set up from scratch |
| [Existing Project](./existing-project.md) | Add to existing codebase |
| [AGENTS.md Best Practices](./agents-md-best-practices.md) | Write effective AI context files |
| [Tool Compatibility](./tool-compatibility.md) | Set up for Cursor, Claude Code, Copilot |

---

## Which Guide to Use?

### Start with [Getting Started](./getting-started.md) to:

- Understand the 4 modules available
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
   - [Module 1: Project Context](../modules/01-project-context/README.md) — AGENTS.md + docs/
   - [Module 2: Skills](../modules/02-skills/README.md) — On-demand instruction packages
   - [Module 3: Feature Development](../modules/03-feature-development/README.md) — Workflows
   - [Module 4: Project Planning](../modules/04-project-planning/README.md) — Multi-feature management

4. **Use templates from modules**
   - Each module has a `templates/` folder
   - Copy and customize for the project

5. **Reference examples**
   - Module 1: `examples/demo-taskflow/` — Complete AGENTS.md + Skills + Docs example
   - Module 3: `examples/simple-todo/` and `examples/complex-auth/`

---

## Common Tasks

### Adding AI context to any project (5 min)

```
1. Copy AGENTS.md from modules/01-project-context/templates/
2. Fill in project details (commands, stack, conventions)
3. Create docs/ with reference doc templates
4. Done!
```

### Adding deep coding patterns (10 min)

```
1. Create .agents/skills/ folder
2. Create a SKILL.md for each tech domain (see Module 2)
3. Add cross-references to @docs/ files
```

### Building a feature

```
1. Determine workflow: Quick, Standard, or Complex
   - See modules/03-feature-development/README.md for decision tree
2. Create specs/<feature>/ if Standard or Complex
3. Copy relevant templates from modules/03-feature-development/templates/
4. Follow workflow guide
5. Update docs/ when complete
```

### Making an architecture decision

```
1. Create ADR from modules/01-project-context/templates/docs/decisions/adr.md
2. Place in docs/decisions/NNN-title.md
3. Document context, decision, rationale, consequences
```

---

## Module Index

| Module | Templates | Examples |
|--------|-----------|----------|
| [01-project-context](../modules/01-project-context/README.md) | `templates/AGENTS-*.md`, `templates/docs/` | `examples/demo-taskflow/` |
| [02-skills](../modules/02-skills/README.md) | `templates/.agents/skills/skill-template/` | Referenced from Module 1 example |
| [03-feature-development](../modules/03-feature-development/README.md) | `templates/` (7 files) | `examples/simple-todo/`, `examples/complex-auth/` |
| [04-project-planning](../modules/04-project-planning/README.md) | `templates/` (4 files) | — |

---

## See Also

| Resource | Purpose |
|----------|---------|
| [Modules Index](../modules/README.md) | Overview of all modules |
| Main README | Project overview (root of repo) |
| [Methodology](../methodology.md) | Full philosophy |
| [AGENTS.md Best Practices](./agents-md-best-practices.md) | Research-backed writing guide |
| [Tool Compatibility](./tool-compatibility.md) | Multi-tool setup |
