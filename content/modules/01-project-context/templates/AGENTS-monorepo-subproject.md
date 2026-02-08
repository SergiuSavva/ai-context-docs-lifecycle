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

## Commands

Run from this directory or use workspace commands:

```bash
# From this directory
{{package-manager}} dev        # Start dev server
{{package-manager}} test       # Run tests
{{package-manager}} build      # Build package
{{package-manager}} lint       # Lint code

# From monorepo root
{{package-manager}} --filter {{package-name}} dev
{{package-manager}} --filter {{package-name}} test
```

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
| Global patterns | @../../.cursor/rules/code-style.mdc |

## Integration Points

| Connects To | How |
|-------------|-----|
| {{Other service}} | {{REST API / gRPC / Events}} |
| {{Database}} | {{Prisma / direct SQL}} |
| {{Queue}} | {{SQS / Redis}} |

## Boundaries

### Always
- Run tests: `{{package-manager}} test`
- Use shared types from `@{{scope}}/types`
- Follow patterns in existing code

### Ask First
- Adding external dependencies
- Changing API contracts
- Database schema changes

### Never
- Import from other packages without declaring dependency
- Hardcode environment values (use config)
- Modify shared packages without checking dependents

---

## Deployment

**Environment**: {{Lambda | Container | VM | Serverless}}
**Trigger**: {{HTTP | Queue | Cron | Event}}

```bash
# Deploy (if applicable)
{{deploy-command}}
```
