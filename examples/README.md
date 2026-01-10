# Examples

> **For AI Agents**: Use these examples as references when creating files for a project.

---

## File Reference Guide

### Required vs Optional

| File | Location | Required | Purpose | When to Create |
|------|----------|:--------:|---------|----------------|
| **AGENTS.md** | `/AGENTS.md` | ✅ | AI context for entire project | Always - during setup |
| **00-index.mdc** | `/.cursor/rules/` | ✅ | Master rule index | Always - during setup |
| **INDEX.md** | `/docs/INDEX.md` | ✅ | Human navigation hub | Always - during setup |
| **TASKS.md** | `/docs/TASKS.md` | ✅ | Global progress tracking | Always - during setup |
| **specs/README.md** | `/docs/specs/` | ✅ | Specs index + current phase | Always - during setup |
| **decisions/README.md** | `/docs/decisions/` | ✅ | ADR index | Always - during setup |
| **features/README.md** | `/docs/features/` | ✅ | Feature index | Always - during setup |
| PRD-lite spec | `/docs/specs/<feature>.md` | ⚪ | Feature specification | Before building a feature |
| Feature README | `/docs/features/<name>/README.md` | ⚪ | Feature overview + code locations | When starting a feature |
| User stories | `/docs/features/<name>/user-stories.md` | ⚪ | Acceptance criteria | When feature needs detailed stories |
| Feature tasks | `/docs/features/<name>/tasks.md` | ⚪ | Implementation checklist | When tracking feature progress |
| ADR | `/docs/decisions/NNN-title.md` | ⚪ | Architecture decision record | When making significant decisions |
| Feature AGENTS.md | `/features/<name>/AGENTS.md` | ⚪ | Feature-specific AI context | For complex features only |
| Additional rules | `/.cursor/rules/*.mdc` | ⚪ | Project-specific patterns | When patterns emerge |

**Legend:** ✅ = Required for all projects | ⚪ = Create when needed

---

## Example Templates

| Example | Purpose | Create In |
|---------|---------|-----------|
| [AGENTS.md](./AGENTS.md) | Root AI context file | `/AGENTS.md` |
| [feature-AGENTS.md](./feature-AGENTS.md) | Feature-level AI context | `/features/<name>/AGENTS.md` |
| [prd-lite.md](./prd-lite.md) | Lightweight spec | `/docs/specs/<feature>.md` |
| [feature-readme.md](./feature-readme.md) | Feature overview | `/docs/features/<name>/README.md` |
| [user-stories.md](./user-stories.md) | User stories with acceptance criteria | `/docs/features/<name>/user-stories.md` |
| [tasks.md](./tasks.md) | Implementation checklist | `/docs/features/<name>/tasks.md` |
| [adr.md](./adr.md) | Architecture Decision Record | `/docs/decisions/NNN-title.md` |
| [cursor-rules/](./cursor-rules/) | AI behavior rules | `/.cursor/rules/` |

---

## How to Use Examples

### For AI Agents

When creating files for a project:

1. **Read the relevant example** to understand structure and content
2. **Adapt to the specific project** - replace placeholders with real values
3. **Follow the format** - maintain structure for consistency
4. **Customize as needed** - examples show common patterns, adjust for context

### Example Adaptation Process

```
1. Read example file
2. Identify placeholders [like this]
3. Replace with project-specific values
4. Remove sections that don't apply
5. Add project-specific sections if needed
```

---

## Examples vs Required Rules

| Type | Location | Purpose |
|------|----------|---------|
| **Required Rules** | `../rules/` | MUST follow - structure and workflow |
| **Examples** | `./` (here) | Reference for creating files |

Required rules define WHAT must exist.
Examples show HOW to create them.

---

## Cursor Rules Examples

The `cursor-rules/` folder contains example `.mdc` files for AI behavior rules:

| File | Purpose |
|------|---------|
| `00-index.mdc` | Master rule index (REQUIRED) |
| `project-architecture.mdc` | File structure patterns |
| `coding-patterns.mdc` | Code style conventions |
| `state-management.mdc` | Data handling patterns |
| `testing-strategy.mdc` | Test approach |
| `documentation.mdc` | Doc maintenance |

Only `00-index.mdc` is required. Others are optional based on project needs.

---

## Creating New Files

### AGENTS.md

```bash
# Location: /AGENTS.md (project root)
# Use: examples/AGENTS.md as template
```

### Feature Documentation

```bash
# Location: /docs/features/<feature-name>/
# Files needed:
#   - README.md (from examples/feature-readme.md)
#   - user-stories.md (from examples/user-stories.md)
#   - tasks.md (from examples/tasks.md)
```

### PRD-lite Spec

```bash
# Location: /docs/specs/<feature-name>.md
#           OR /docs/specs/<phase>/<feature-name>.md for phased projects
# Use: examples/prd-lite.md as template
```

### ADR

```bash
# Location: /docs/decisions/NNN-title.md
# Use: examples/adr.md as template
# Number sequentially: 001, 002, 003...
```

### Cursor Rules

```bash
# Location: /.cursor/rules/
# Required: 00-index.mdc
# Optional: other rules based on project needs
```
