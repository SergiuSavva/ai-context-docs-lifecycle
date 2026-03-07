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
| [Skills Catalog](./skills-catalog.md) | What skills exist and when to use each one |
| [Skill Routing Policy](./skill-routing.md) | Decide when agents should load skills |
| [Tool Compatibility](./tool-compatibility.md) | Set up for Cursor, Claude Code, Copilot |

---

## Which Guide to Use?

### Start with [Getting Started](./getting-started.md) to:

- Understand the 3 modules available
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

### Use [Skills Catalog](./skills-catalog.md) when:

- Looking for available skills and what they cover
- Deciding which skill to load for a specific task
- Learning how to create new skills

### Use [Skill Routing Policy](./skill-routing.md) when:

- You want consistent skill activation behavior across agents
- You need clear thresholds for "load skill" vs "skip"
- You want a measurable policy with precision/recall targets

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
   - [Module 1: Project Context](../modules/01-project-context/README.md) — AGENTS.md + docs/ + .agents/skills/
   - [Module 2: Feature Development](../modules/02-feature-development/README.md) — Workflows
   - [Module 3: Project Planning](../modules/03-project-planning/README.md) — Multi-feature management

4. **Use templates from skills**
   - Templates are bundled inside module skills (`skills/<skill>/templates/`)
   - Copy and customize for the project

5. **Reference examples**
   - Module 2: `examples/simple-todo/` and `examples/complex-auth/`

---

## Common Tasks

### Adding AI context to any project (5 min)

```
1. Copy AGENTS.md from modules/01-project-context/skills/acdl/templates/
2. Fill in project details (commands, stack, conventions)
3. Create docs/ with reference doc templates
4. Done!
```

### Adding deep coding patterns (10 min)

```
1. Create .agents/skills/ folder
2. Create a SKILL.md for each tech domain (see Module 1 skills section)
3. Add cross-references to @docs/ files
```

### Building a feature

```
1. Determine workflow: Quick, Standard, or Complex
   - See modules/02-feature-development/README.md for decision tree
2. Create specs/<feature>/ if Standard or Complex
3. Copy relevant templates from modules/02-feature-development/skills/feature-workflow/templates/
4. Follow workflow guide
5. Update docs/ when complete
```

### Making an architecture decision

```
1. Create ADR from modules/01-project-context/skills/acdl/templates/docs/decisions/adr.md
2. Place in docs/decisions/NNN-title.md
3. Document context, decision, rationale, consequences
```

---

## Module Index

| Module | Templates | Examples |
|--------|-----------|----------|
| [01-project-context](../modules/01-project-context/README.md) | `skills/acdl/templates/`, plus `skills/*/SKILL.md` | — |
| [02-feature-development](../modules/02-feature-development/README.md) | `skills/feature-workflow/templates/` | `examples/simple-todo/`, `examples/complex-auth/` |
| [03-project-planning](../modules/03-project-planning/README.md) | `skills/project-planning/templates/` | — |

---

## See Also

| Resource | Purpose |
|----------|---------|
| [Modules Index](../modules/README.md) | Overview of all modules |
| Main README | Project overview (root of repo) |
| [Methodology](../methodology.md) | Full philosophy |
| [AGENTS.md Best Practices](./agents-md-best-practices.md) | Research-backed writing guide |
| [Skills Catalog](./skills-catalog.md) | Available skills and usage guide |
| [Skill Routing Policy](./skill-routing.md) | Score-based skill activation rules |
| [Tool Compatibility](./tool-compatibility.md) | Multi-tool setup |
