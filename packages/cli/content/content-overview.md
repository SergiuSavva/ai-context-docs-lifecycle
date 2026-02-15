# AI Context Docs Lifecycle Content

> **Raw docs-first methodology content** for AI-assisted development.

---

## Structure

```
content/
├── modules/                       # Independent modules (pick what you need)
│   ├── 01-project-context/       # AGENTS.md + docs/ (always-loaded context + reference)
│   ├── 02-skills/                # On-demand instruction packages (.agents/skills/)
│   ├── 03-feature-development/   # Workflows: Quick/Standard/Complex
│   └── 04-project-planning/      # Multi-feature management (optional)
│
├── guides/                        # Adoption guides
│   ├── getting-started.md        # Module selector
│   ├── new-project.md            # Starting from scratch
│   └── existing-project.md       # Adding to existing code
│
└── content-overview.md            # This file
```

---

## Quick Start

### For AI Agents

Read modules in this default order:

1. **Always read**: [`modules/01-project-context/README.md`](./modules/01-project-context/README.md) — AGENTS.md + docs/
2. **For feature execution**: [`modules/03-feature-development/README.md`](./modules/03-feature-development/README.md) — Workflow selection + templates
3. **For task-specific patterns**: [`modules/02-skills/README.md`](./modules/02-skills/README.md) — On-demand skills
4. **For multi-feature coordination**: [`modules/04-project-planning/README.md`](./modules/04-project-planning/README.md) — Optional planning layer

### For Humans

Start with [guides/getting-started.md](./guides/getting-started.md) to choose your modules.

---

## Module Summary

| Module | You Get | Best For |
|--------|---------|----------|
| **1. Project Context** | AGENTS.md + docs/ templates | Every project |
| **2. Skills** | .agents/skills/ templates | Deep coding patterns |
| **3. Feature Development** | Workflows + templates | Building features |
| **4. Project Planning** | PRD/Backlog/Roadmap | Multi-feature mgmt |

---

## Key Concepts

### Three Phases

```
Research → Plan → Implement
```

| Situation | Docs Needed |
|-----------|-------------|
| **Bug fix** | None |
| **Feature** | spec.md + tasks.md |
| **Complex** | All docs + ADR |

### Document Types

| Type | Lifecycle | Location |
|------|-----------|----------|
| **Specs** | Ephemeral (delete after) | specs/ |
| **Reference** | Evergreen (always current) | AGENTS.md, docs/ |
| **Decisions** | Permanent (never change) | docs/decisions/ |

### Core Rule

**Update or Delete** — Stale documentation is worse than no documentation.

---

## Live Site

For formatted documentation, visit the live site (link in main README).
