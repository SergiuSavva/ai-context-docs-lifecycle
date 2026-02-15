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

## Discovery -> Activation -> Execution

Use this flow for context loading:

1. **Discovery (always loaded)**
   - This file: stack, structure, boundaries, routing hints
2. **Activation (load only if task needs it)**
   - Domain docs in `@docs/` (architecture, data model, API, auth)
3. **Execution (load before running commands)**
   - Canonical command catalog in `@docs/scripts.md`

## Command Policy

- Package manager: `{{package-manager}}`
- Canonical runnable commands live in `@docs/scripts.md`
- Do not invent commands not present in project config/docs
- Load command docs only for implementation, verification, or release tasks
- Skip command loading for pure research, design, and planning tasks

## Task Mode Routing

| Task Mode | Load by Default | Command Docs |
|-----------|-----------------|--------------|
| Research / Design / Plan | This file + relevant domain docs | Skip unless user asks |
| Implement / Fix | This file + relevant domain docs | Load `@docs/scripts.md` before running commands |
| Verify / Release | This file + test/build docs | Load `@docs/scripts.md` |

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
| Data model / schema | @docs/data-model.md |
| API integration | @docs/api.md |
| Auth flows / route protection | @docs/auth.md |
| Running commands / CI checks / release steps | @docs/scripts.md |

## Boundaries

### Always
- Use verified commands from `@docs/scripts.md` when executing tasks
- Follow existing patterns in codebase
- Use types from `src/types/`

### Ask First
- Adding new dependencies
- Database schema changes
- Breaking API changes
- Running destructive commands (reset/drop/force operations)

### Never
- Commit `.env` files or secrets
- Modify `/generated` or `/vendor` directories
- Push directly to main branch
