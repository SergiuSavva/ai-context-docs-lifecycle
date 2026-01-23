# AI Context Docs Lifecycle

> Local templates and quick reference for AI-assisted development.

## Full Methodology

📖 **https://sergiusavva.github.io/ai-context-docs-lifecycle/methodology/**

---

## Templates

| Template | Use When | Location |
|----------|----------|----------|
| `spec.md` | Every feature | `.acdl/templates/spec.md` |
| `tasks.md` | Every feature | `.acdl/templates/tasks.md` |
| `research.md` | Evaluating options | `.acdl/templates/research.md` |
| `design.md` | Architecture needed | `.acdl/templates/design.md` |
| `plan.md` | Complex dependencies | `.acdl/templates/plan.md` |
| `user-stories.md` | User-facing features | `.acdl/templates/user-stories.md` |
| `adr.md` | Significant decisions | `.acdl/templates/adr.md` |

---

## Quick Workflow

```
Research → Plan → Implement
(optional)  (required)  (required)
```

### For Features

1. Create `specs/[feature]/spec.md` (copy from `.acdl/templates/spec.md`)
2. Create `specs/[feature]/tasks.md` (copy from `.acdl/templates/tasks.md`)
3. Add optional docs as needed
4. Implement with task tracking
5. Delete `specs/[feature]/` when done

### For Bug Fixes

Just fix it. No docs needed.

---

## Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress (only ONE) |
| `[x]` | Completed |
| `[B]` | Blocked |
| `[S]` | Skipped |

---

## Project Structure

```
project/
├── AGENTS.md                 # AI entry point
├── .acdl/                    # This folder
│   ├── README.md             # Quick reference (this file)
│   └── templates/            # Document templates
├── .cursor/rules/            # Cursor AI rules
├── specs/                    # Active feature specs (ephemeral)
├── decisions/                # ADRs (permanent)
└── docs/                     # Reference documentation
```

---

## Related

- [AGENTS.md](../AGENTS.md) - Project context for AI
- [Full Methodology](https://sergiusavva.github.io/ai-context-docs-lifecycle/methodology/) - Complete documentation
