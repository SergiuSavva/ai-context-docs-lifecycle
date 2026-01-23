# [Project Name]

> **AI Agent Instructions** - Compact context with dynamic loading.
> Copy to project root as `AGENTS.md`.

## Overview

[One sentence: What does this project do?]

## Stack

| Tech | Version |
|------|---------|
| Language | [e.g., TypeScript 5.3] |
| Framework | [e.g., Next.js 15] |
| Database | [e.g., PostgreSQL 16] |
| Styling | [e.g., Tailwind CSS 3.4] |

## Commands

```bash
[package-manager] install   # Install dependencies
[package-manager] dev       # Start dev server
[package-manager] test      # Run tests (must pass before commit)
[package-manager] lint      # Lint code
[package-manager] build     # Production build
```

## Structure

```
[project]/
├── src/           # Application code
├── tests/         # Test files
└── docs/          # Documentation
```

## Context Loading

Load detailed docs based on your task:

| Task | Read First |
|------|------------|
| Architecture decisions | @docs/architecture.md |
| Component patterns | @docs/components.md |
| API integration | @docs/api.md |
| Code style | @.cursor/rules/code-style.mdc |
| Testing | @docs/testing.md |

## Boundaries

### Always
- Run tests before committing
- Follow existing patterns in codebase
- Use types from `src/types/`

### Ask First
- Adding new dependencies
- Database schema changes
- Breaking API changes

### Never
- Commit `.env` files or secrets
- Modify `/generated` or `/vendor` directories
- Push directly to main branch

---

## Tool Compatibility

This file works with all AI coding tools. For tool-specific features:

- **Claude Code**: Symlink `ln -s AGENTS.md CLAUDE.md`
- **Cursor**: Use `.cursor/rules/*.mdc` for glob-based auto-attach
- **Copilot**: Use `.github/copilot-instructions.md` for GitHub-specific rules
