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

**New to ACDL?** Start with [Quick Start](../quick-start.md) — it covers the minimum setup regardless of project size.

Then come back here for your specific situation:

| Situation | Guide |
|-----------|-------|
| Starting a new project | [New Project](./new-project.md) |
| Adding to an existing codebase | [Existing Project](./existing-project.md) |
| Choosing which modules to adopt | [Getting Started](./getting-started.md) |
| Multi-tool team or migration | [Tool Compatibility](./tool-compatibility.md) |
| Writing effective `AGENTS.md` | [AGENTS.md Best Practices](./agents-md-best-practices.md) |
| Available skills and when to use them | [Skills Catalog](./skills-catalog.md) |

---

## Quick Reference (Common Tasks)

### Add AI context to any project (~5 min)

```
1. npx @acdl/cli init
2. Tell AI: "Bootstrap AGENTS.md for this project. load skill `acdl`"
3. Review and trim what was generated
```

### Add deep coding patterns (~10 min)

```
1. Create .agents/skills/<name>/SKILL.md
2. Document your specific patterns with code examples
3. Add a routing entry to the Context Loading table in AGENTS.md
```

### Build a feature

```
1. Bug fix or config change? Just do it — no docs needed.
2. Real feature? Create specs/<feature>/spec.md + tasks.md
3. Tell AI: "load skill `feature`"
```

### Record an architecture decision

```
1. Create docs/decisions/NNN-title.md from the ADR template
2. Document context, decision, and rationale
3. Never edit it again — ADRs are permanent
```

---

## For AI Agents Applying This Methodology

When asked to apply ACDL to a project:

1. Determine project state: new or existing?
2. Use the appropriate guide above
3. Read relevant module READMEs before writing files:
   - [Module 1: Foundation](../modules/01-foundation/README.md)
   - [Module 2: Dev Workflow](../modules/02-dev-workflow/README.md)
   - [Module 3: Project Planning](../modules/03-project-planning/README.md)
4. Use templates from skills: `skills/<skill>/templates/`

---

## Module Index

| Module | Templates | Examples |
|--------|-----------|----------|
| [01-foundation](../modules/01-foundation/README.md) | `skills/acdl/templates/`, `skills/docs/templates/` | — |
| [02-dev-workflow](../modules/02-dev-workflow/README.md) | `skills/feature/templates/` | — |
| [03-project-planning](../modules/03-project-planning/README.md) | `skills/project/templates/` | — |

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
