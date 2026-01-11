# AI-First Dev Kit Content

> **For AI Agents**: This folder contains raw methodology content you can directly reference and copy.

---

## Folder Structure

```
content/
├── templates/        # Copy-paste templates for project files
├── guides/           # Step-by-step guides
├── rules/            # Required rules (structure, workflow, code style)
└── prompts.md        # Ready-to-use AI prompts
```

---

## Quick Reference

### AI Context Files (by tool)

| Tool | Template |
|------|----------|
| Cursor / General | `templates/AGENTS.md` |
| Claude Code | `templates/CLAUDE.md` |
| GitHub Copilot | `templates/copilot-instructions.md` |

### Documentation Templates

| Need | Location |
|------|----------|
| Create feature spec | `templates/prd-lite.md` |
| Create feature docs | `templates/feature-readme.md`, `user-stories.md`, `tasks.md` |
| Create ADR | `templates/adr.md` |
| Create cursor rules | `templates/cursor-rules/` |

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

1. Read the relevant template/guide
2. Adapt placeholders to the specific project
3. Follow the required rules for structure and workflow

---

## Content Sources

This repository has two content locations:

| Location | Purpose | Audience |
|----------|---------|----------|
| `content/` | Raw templates and guides | AI agents |
| `site/` | Documentation website | Humans |

The `site/` directory builds to https://ai-first-dev-kit.github.io.
Templates in `content/` are designed for AI agents to read directly.
