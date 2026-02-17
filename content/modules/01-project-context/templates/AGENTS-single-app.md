# {{project-name}}

> **AI Agent Instructions** - Compact context with dynamic loading.
> Copy to project root as `AGENTS.md` and commit to version control.

## Overview

{{One sentence describing what this project does}}

## Stack

| Tech | Version |
|------|---------|
| Language | {{e.g., TypeScript 5.3, Python 3.12, Go 1.22}} |
| Framework | {{e.g., Next.js 15, Django 5, Gin}} |
| {{other relevant tech}} | {{version}} |

<!-- Add rows for database, styling, ORM, or other key technologies only if applicable -->

## Discovery -> Activation -> Execution

Use this flow for context loading:

1. **Discovery (always loaded)**
   - This file: stack, structure, boundaries, routing hints
2. **Activation (load only if task needs it)**
   - Domain docs in `@docs/` — only the docs this project actually has
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
├── {{source-dir}}/
│   ├── {{area-1}}/    # {{description}}
│   ├── {{area-2}}/    # {{description}}
│   ├── {{area-3}}/    # {{description}}
│   └── {{area-4}}/    # {{description}}
├── {{test-dir}}/      # Test files
├── docs/              # AI context docs
└── {{other-dir}}/     # {{description}}
```

<!-- Replace with the actual project directory tree. Show only the top-level structure and key areas. -->

**Key Areas** (for routing decisions):

| Area | Path | Contains |
|------|------|----------|
| {{area-name}} | `{{path}}` | {{what this area contains}} |
| {{area-name}} | `{{path}}` | {{what this area contains}} |
| {{area-name}} | `{{path}}` | {{what this area contains}} |

<!-- List the 3-5 most important areas the agent needs to know about for routing. -->

## Context Loading

Load detailed docs based on your task:

| Task | Read First |
|------|------------|
| {{task description}} | @docs/{{doc-name}}.md |
| {{task description}} | @docs/{{doc-name}}.md |
| Running commands / CI checks / release steps | @docs/scripts.md |
| Building a feature | load skill `feature-workflow` |
| Creating / updating AGENTS.md | load skill `agents-md` |
| Writing specs or tasks | load skill `spec-writing` |

<!-- Only include entries for docs that exist in this project.
     Common docs (create only if relevant):
     - @docs/architecture.md   — when project has multiple layers or services
     - @docs/data-model.md     — when project has a database
     - @docs/api.md            — when project exposes or consumes APIs
     - @docs/auth.md           — when project has authentication
     - @docs/scripts.md        — when project has runnable commands
     Add project-specific docs as needed (e.g., @docs/integrations.md, @docs/deployment.md) -->

## Boundaries

### Always
- Use verified commands from `@docs/scripts.md` when executing tasks
- Follow existing patterns in codebase
- {{project-specific always-rule}}

### Ask First
- Adding new dependencies
- {{project-specific ask-first rule, e.g., database schema changes}}
- Running destructive commands (reset/drop/force operations)

### Never
- Commit `.env` files or secrets
- {{project-specific never-rule, e.g., modify generated directories}}
- Push directly to main branch
