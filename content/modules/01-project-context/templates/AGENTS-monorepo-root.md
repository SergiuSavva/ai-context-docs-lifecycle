# {{monorepo-name}}

> **AI Agent Instructions** - Monorepo router.
> Copy to monorepo root as `AGENTS.md` and commit to version control.

## Overview

{{One sentence describing what this monorepo contains}}

## Discovery -> Activation -> Execution

Use this flow for context loading:

1. **Discovery (always loaded)**
   - Root topology, subproject routing, global boundaries
2. **Activation (load only if task needs it)**
   - Subproject `AGENTS.md` + relevant `@docs/` references
3. **Execution (load before running commands)**
   - Command catalogs from `@docs/scripts.md` and the active subproject docs

## Structure

```
{{monorepo-name}}/
├── packages/                # Shared, publishable packages
│   ├── web/                # Frontend app (Next.js/React)
│   ├── api/                # Backend API (Express/Fastify)
│   ├── shared/             # Shared utilities, helpers
│   └── types/              # Shared TypeScript types
├── services/               # Deployable microservices
│   ├── {{service-1}}/      # {{Description}}
│   └── {{service-2}}/      # {{Description}}
├── infrastructure/         # IaC, CI/CD configs
└── docs/                   # Cross-project documentation
```

**Package Overview** (what each does):

| Package | Purpose | Tech |
|---------|---------|------|
| `packages/web` | User-facing frontend | Next.js, React |
| `packages/api` | REST/GraphQL backend | Express, Prisma |
| `packages/shared` | Common utilities | TypeScript |
| `packages/types` | Shared interfaces | TypeScript |

## Command Policy

- Workspace package manager: `{{package-manager}}`
- Canonical workspace commands live in `@docs/scripts.md`
- Canonical package/service commands live in each subproject command docs
- Do not invent commands; prefer verified entries only
- Load command docs only for implementation, verification, or release tasks
- Skip command docs for pure research, design, and planning tasks

## Task Mode Routing

| Task Mode | Load by Default | Command Docs |
|-----------|-----------------|--------------|
| Research / Design / Plan | Root `AGENTS.md` + relevant subproject `AGENTS.md` + topic docs | Skip unless user asks |
| Implement / Fix | Relevant subproject `AGENTS.md` + topic docs | Load workspace + subproject command docs |
| Verify / Release | Relevant subproject + CI/release docs | Load workspace + subproject command docs |

## Subproject Routing

**Read the AGENTS.md in the relevant subproject before working there:**

| Working On | Read First |
|------------|------------|
| Web frontend | @packages/web/AGENTS.md |
| API backend | @packages/api/AGENTS.md |
| Shared libraries | @packages/shared/AGENTS.md |
| {{Service 1}} | @services/{{service-1}}/AGENTS.md |
| {{Service 2}} | @services/{{service-2}}/AGENTS.md |
| Infrastructure | @infrastructure/AGENTS.md |

## Cross-Cutting Concerns

| Topic | Read |
|-------|------|
| Git workflow | @docs/git-workflow.md |
| CI/CD | @docs/ci-cd.md |
| Architecture | @docs/architecture.md |
| Workspace commands | @docs/scripts.md |

## Global Boundaries

### Always
- Run affected tests before committing
- Follow package-specific patterns (read its AGENTS.md)
- Use workspace dependencies, not external duplicates
- Use verified commands from command docs when executing tasks

### Ask First
- Adding new packages/services
- Cross-package breaking changes
- Shared dependency version bumps
- Running destructive commands (reset/drop/force operations)

### Never
- Commit secrets or .env files
- Modify another package without reading its AGENTS.md
- Push directly to main branch
