# AI Context Docs Lifecycle Content

> **Raw methodology content** for AI agents and developers.

---

## Structure

```
content/
├── modules/                    # Independent modules (pick what you need)
│   ├── 01-quick-start/        # Core initialization, comprehensive AGENTS.md
│   ├── 02-coding-standards/   # Code & doc style rules
│   ├── 03-feature-development/# Workflows: Quick/Standard/Complex
│   ├── 04-reference-docs/     # Documentation structure
│   └── 05-project-planning/   # Multi-feature management
│
├── guides/                     # Adoption guides
│   ├── getting-started.md     # Module selector
│   ├── new-project.md         # Starting from scratch
│   └── existing-project.md    # Adding to existing code
│
└── README.md                   # This file
```

---

## Quick Start

### For AI Agents

Read modules in order based on what you need:

1. **Always read**: [`modules/01-quick-start/`](./modules/01-quick-start/) - Basic context
2. **For features**: [`modules/03-feature-development/`](./modules/03-feature-development/) - Workflows
3. **For docs**: [`modules/04-reference-docs/`](./modules/04-reference-docs/) - Structure

### For Humans

Start with [guides/getting-started.md](./guides/getting-started.md) to choose your modules.

---

## Module Summary

| Module | You Get | Best For |
|--------|---------|----------|
| **1. Core Init** | AGENTS.md template | Every project |
| **2. Coding Standards** | .cursor/rules/ templates | Consistent code |
| **3. Feature Development** | Workflows + templates | Building features |
| **4. Reference Docs** | docs/ structure | Documentation |
| **5. Project Planning** | Backlog/Roadmap | Multi-feature mgmt |

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
| **Specs** | Ephemeral (delete after) | docs/specs/ |
| **Reference** | Evergreen (always current) | AGENTS.md, docs/features/ |
| **Decisions** | Permanent (never change) | docs/decisions/ |

### Core Rule

**Update or Delete** - Stale documentation is worse than no documentation.

---

## Live Site

For formatted documentation, visit the live site (link in main README).
