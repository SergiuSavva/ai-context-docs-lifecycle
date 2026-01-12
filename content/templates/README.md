# Templates (Primary Source for AI)

> **FOR AI AGENTS**: These are the PRIMARY files to copy when creating project documentation.
> Copy templates, replace `[placeholders]` with project values.
> See `../examples/` only if you need to understand the expected format.

---

## What Are Templates?

Templates are **skeleton files with placeholders** that AI agents should copy and customize for each project.

| Placeholder | Replace With |
|-------------|--------------|
| `[Project Name]` | Actual project name |
| `[Description]` | Actual description |
| `[language]` | Actual programming language |
| `[path/to/file]` | Actual file paths |

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

## Templates

### AI Context Files (Tool-Specific)

| Template | Tool | Create In |
|----------|------|-----------|
| [AGENTS.md](./AGENTS.md) | Cursor, General | `/AGENTS.md` |
| [CLAUDE.md](./CLAUDE.md) | Claude Code | `/CLAUDE.md` |
| [copilot-instructions.md](./copilot-instructions.md) | GitHub Copilot | `/.github/copilot-instructions.md` |
| [feature-AGENTS.md](./feature-AGENTS.md) | Any (feature-level) | `/features/<name>/AGENTS.md` |

### Documentation Templates

| Template | Purpose | Create In |
|----------|---------|-----------|
| [prd-lite.md](./prd-lite.md) | Lightweight spec | `/docs/specs/<feature>.md` |
| [feature-readme.md](./feature-readme.md) | Feature overview | `/docs/features/<name>/README.md` |
| [user-stories.md](./user-stories.md) | User stories with acceptance criteria | `/docs/features/<name>/user-stories.md` |
| [tasks.md](./tasks.md) | Implementation checklist | `/docs/features/<name>/tasks.md` |
| [adr.md](./adr.md) | Architecture Decision Record | `/docs/decisions/NNN-title.md` |

### AI Behavior Rules

| Template | Purpose | Create In |
|----------|---------|-----------|
| [cursor-rules/](./cursor-rules/) | Cursor AI behavior rules | `/.cursor/rules/` |

---

## How to Use Templates

### For AI Agents

When creating files for a project:

1. **Copy the template** from this folder
2. **Replace all `[placeholders]`** with project-specific values
3. **Remove sections** that don't apply to the project
4. **Add sections** if the project needs them
5. **See `../examples/`** if you need to understand the expected format

### Template Adaptation Process

```
1. Copy template file content
2. Find all [bracketed] placeholders
3. Replace with project-specific values
4. Remove inapplicable sections
5. Add project-specific sections if needed
```

---

## Templates vs Examples

| Folder | Purpose | AI Should... |
|--------|---------|--------------|
| **templates/** (here) | Skeleton files to copy | **COPY and customize** |
| **../examples/** | Filled-in reference samples | **READ to understand**, not copy |

---

## Creating New Files

### AGENTS.md

```bash
# Location: /AGENTS.md (project root)
# Use template: content/templates/AGENTS.md
# See example: content/examples/AGENTS.md
```

### Feature Documentation

```bash
# Location: /docs/features/<feature-name>/
# Use templates:
#   - README.md from templates/feature-readme.md
#   - user-stories.md from templates/user-stories.md
#   - tasks.md from templates/tasks.md
```

### PRD-lite Spec

```bash
# Location: /docs/specs/<feature-name>.md
#           OR /docs/specs/<phase>/<feature-name>.md for phased projects
# Use template: templates/prd-lite.md
```

### ADR

```bash
# Location: /docs/decisions/NNN-title.md
# Use template: templates/adr.md
# Number sequentially: 001, 002, 003...
```

### Cursor Rules

```bash
# Location: /.cursor/rules/
# Required: 00-index.mdc (use templates/cursor-rules/00-index.mdc)
# Optional: other rules based on project needs
```
