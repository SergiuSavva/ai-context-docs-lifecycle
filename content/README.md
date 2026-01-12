# AI Context Docs Lifecycle Content

> **For AI Agents**: This folder contains raw methodology content you can directly reference and copy.

---

## Folder Structure

```
content/
├── templates/        # Skeleton files with placeholders (copy these)
├── examples/         # Filled-in reference samples (read for understanding)
├── guides/           # Step-by-step guides
├── rules/            # Required rules (structure, workflow, code style)
└── prompts.md        # Ready-to-use AI prompts
```

---

## Templates vs Examples

| Folder | Purpose | When to Use |
|--------|---------|-------------|
| `templates/` | Skeleton files with `[placeholders]` | **Copy and customize** for target project |
| `examples/` | Filled-in samples (SpaceBooker project) | **Read to understand** expected format |

**Important**: Always use `templates/` to create new files. Examples are reference only - do NOT copy example content directly.

---

## Quick Reference

### AI Context Files (by tool)

| Tool | Use Template | See Example |
|------|--------------|-------------|
| Cursor / General | `templates/AGENTS.md` | `examples/AGENTS.md` |
| Claude Code | `templates/CLAUDE.md` | `examples/CLAUDE.md` |
| GitHub Copilot | `templates/copilot-instructions.md` | `examples/copilot-instructions.md` |

### Documentation Templates

| Need | Use Template | See Example |
|------|--------------|-------------|
| Feature spec | `templates/prd-lite.md` | `examples/prd-lite.md` |
| Feature overview | `templates/feature-readme.md` | `examples/feature-readme.md` |
| User stories | `templates/user-stories.md` | `examples/user-stories.md` |
| Task tracking | `templates/tasks.md` | `examples/tasks.md` |
| ADR | `templates/adr.md` | `examples/adr.md` |
| Cursor rules | `templates/cursor-rules/` | `examples/cursor-rules/` |

### Guides & Rules

| Need | Location |
|------|----------|
| Understand structure | `rules/00-structure.md` |
| Understand workflow | `rules/01-workflow.md` |
| Setup new project | `guides/new-project.md` |
| Setup existing project | `guides/existing-project.md` |
| Ready-to-use prompts | `prompts.md` |

---

## Usage

### For AI Agents Creating Files

1. Read the template in `templates/`
2. Copy the template structure
3. Replace `[placeholders]` with project-specific values
4. Reference `examples/` if you need to understand the expected format
5. Follow the required rules for structure and workflow

### Pattern

```
1. Use template: templates/<file>
2. See example: examples/<file> (for understanding)
3. Create: target project location
```

---

## Content Sources

This repository has two content locations:

| Location | Purpose | Audience |
|----------|---------|----------|
| `content/` | Raw templates, examples, and guides | AI agents |
| `site/` | Documentation website | Humans |

The `site/` directory builds to https://sergiusavva.github.io/ai-context-docs-lifecycle.
Templates in `content/` are designed for AI agents to read directly.
