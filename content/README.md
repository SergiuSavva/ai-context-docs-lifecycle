# AI Context Docs Lifecycle Content

> **Raw methodology content** for AI agents and developers.

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
└── README.md                      # This file
```

---

## Quick Start

### For AI Agents

Read modules in order based on what you need:

1. **Always read**: [`modules/01-project-context/`](./modules/01-project-context/) — AGENTS.md + docs/
2. **For patterns**: [`modules/02-skills/`](./modules/02-skills/) — On-demand skills
3. **For features**: [`modules/03-feature-development/`](./modules/03-feature-development/) — Workflows

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
