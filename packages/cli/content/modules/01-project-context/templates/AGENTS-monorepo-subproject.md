# {{package-or-service-name}}

> **AI Agent Instructions** - Subproject context.
> Copy to `packages/{{name}}/AGENTS.md` or `services/{{name}}/AGENTS.md` and commit to version control.

## Overview

{{One sentence describing what this package/service does}}

**Type**: {{package | service | lambda | worker | library}}

## Stack

| Tech | Version |
|------|---------|
| Language | {{e.g., TypeScript 5.3}} |
| Framework | {{e.g., Express 4.x}} |
| Runtime | {{e.g., Node.js 20}} |
| Database | {{e.g., PostgreSQL 16}} |

## Discovery -> Activation -> Execution

Use this flow for context loading:

1. **Discovery (always loaded)**
   - This file: local stack, structure, dependencies, boundaries
2. **Activation (load only if task needs it)**
   - Local `@docs/` references and relevant shared docs
3. **Execution (load before running commands)**
   - Canonical command catalog in local `@docs/scripts.md`

## Command Policy

- Package manager: `{{package-manager}}`
- Canonical runnable commands live in local `@docs/scripts.md`
- Workspace-level commands may also exist in root `@docs/scripts.md`
- Do not invent commands not present in project config/docs
- Load command docs only for implementation, verification, or release tasks
- Skip command docs for pure research, design, and planning tasks

## Task Mode Routing

| Task Mode | Load by Default | Command Docs |
|-----------|-----------------|--------------|
| Research / Design / Plan | This file + relevant domain docs | Skip unless user asks |
| Implement / Fix | This file + relevant domain docs | Load local `@docs/scripts.md` first |
| Verify / Release | This file + test/build/release docs | Load local `@docs/scripts.md` |

## Structure

```
{{package-name}}/
├── src/
│   ├── routes/       # API endpoints / route handlers
│   ├── services/     # Business logic layer
│   ├── models/       # Data models, schemas
│   ├── utils/        # Package-specific utilities
│   └── types/        # Local TypeScript types
├── tests/            # Test files (mirrors src/)
└── package.json      # Package config
```

**Key Areas**:

| Area | Path | Contains |
|------|------|----------|
| Entry | `src/routes/` | Route handlers, controllers |
| Logic | `src/services/` | Business rules, orchestration |
| Data | `src/models/` | Schemas, database models |

## Dependencies

### Internal (from this monorepo)
- `@{{scope}}/shared` - Common utilities
- `@{{scope}}/types` - Shared TypeScript types

### Key External
- {{dependency-1}} - {{What it's used for}}
- {{dependency-2}} - {{What it's used for}}

## Context Loading

| Task | Read |
|------|------|
| Package patterns | @src/README.md |
| API endpoints | @src/routes/README.md |
| Data models | @src/models/README.md |
| Package commands / verification scripts | @docs/scripts.md |

## Integration Points

| Connects To | How |
|-------------|-----|
| {{Other service}} | {{REST API / gRPC / Events}} |
| {{Database}} | {{Prisma / direct SQL}} |
| {{Queue}} | {{SQS / Redis}} |

## Boundaries

### Always
- Use verified commands from `@docs/scripts.md` when executing tasks
- Use shared types from `@{{scope}}/types`
- Follow patterns in existing code

### Ask First
- Adding external dependencies
- Changing API contracts
- Database schema changes
- Running destructive commands (reset/drop/force operations)

### Never
- Import from other packages without declaring dependency
- Hardcode environment values (use config)
- Modify shared packages without checking dependents

## Deployment

**Environment**: {{Lambda | Container | VM | Serverless}}
**Trigger**: {{HTTP | Queue | Cron | Event}}
**Command Source**: @docs/scripts.md
