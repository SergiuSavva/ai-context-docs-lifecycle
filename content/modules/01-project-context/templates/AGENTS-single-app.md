# {{project-name}}

> **AI Agent Instructions** - Compact context with dynamic loading.
> Copy to project root as `AGENTS.md` and commit to version control.

## Overview

{{One sentence describing what this project does}}

## Stack

| Tech | Version |
|------|---------|
| Language | {{e.g., TypeScript 5.3}} |
| Framework | {{e.g., Next.js 15}} |
| Database | {{e.g., PostgreSQL 16}} |
| Styling | {{e.g., Tailwind CSS 3.4}} |

## Commands

```bash
{{package-manager}} install   # Install dependencies
{{package-manager}} dev       # Start dev server
{{package-manager}} test      # Run tests (must pass before commit)
{{package-manager}} lint      # Lint code
{{package-manager}} build     # Production build
```

## Structure

```
{{project-name}}/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route entry points (or app/ for App Router)
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API clients, external integrations
│   ├── lib/           # Business logic, utilities
│   └── types/         # TypeScript interfaces
├── tests/             # Test files (mirrors src/ structure)
├── docs/              # AI context docs
└── public/            # Static assets
```

**Key Areas** (for routing decisions):

| Area | Path | Contains |
|------|------|----------|
| UI | `src/components/` | React components, design system |
| Data | `src/services/` | API calls, data fetching |
| Logic | `src/lib/` | Business rules, utilities |
| Types | `src/types/` | Shared TypeScript interfaces |

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

This file works with all AI coding tools. Each tool discovers context files differently:

| Tool | Discovery Method | Extra Setup |
|------|------------------|-------------|
| **Cursor** | Auto-reads `AGENTS.md` at project root | Use `.cursor/rules/*.mdc` for glob-based rules that auto-attach to specific file types |
| **Claude Code** | Reads `CLAUDE.md` at project root | Create symlink: `ln -s AGENTS.md CLAUDE.md` |
| **GitHub Copilot** | Reads `.github/copilot-instructions.md` | Copy AGENTS.md content there, or keep separate GitHub-specific rules |
| **Windsurf** | Auto-reads `AGENTS.md` or `.windsurfrules` | No extra setup needed |
| **Other tools** | Most read `AGENTS.md` or `README.md` | Check tool docs for context file location |
