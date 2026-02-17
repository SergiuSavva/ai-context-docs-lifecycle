# {{subproject-name}}

> **AI Agent Instructions** - Subproject context.
> Copy to the subproject root (e.g., `packages/{{name}}/AGENTS.md`) and commit to version control.

## Overview

{{One sentence describing what this package/service does}}

**Type**: {{package | service | lambda | worker | library | app}}

## Stack

| Tech | Version |
|------|---------|
| Language | {{e.g., TypeScript 5.3, Python 3.12, Go 1.22}} |
| Framework | {{e.g., Express 4.x, FastAPI 0.100, none}} |
| Runtime | {{e.g., Node.js 20, Python 3.12}} |
| {{other relevant tech}} | {{version}} |

<!-- Add rows for database, ORM, or other key technologies only if applicable -->

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
{{subproject-name}}/
├── {{source-dir}}/
│   ├── {{area-1}}/    # {{description}}
│   ├── {{area-2}}/    # {{description}}
│   └── {{area-3}}/    # {{description}}
├── {{test-dir}}/      # Test files
└── {{config-file}}    # {{e.g., package.json, pyproject.toml, Cargo.toml}}
```

<!-- Replace with the actual subproject directory tree. -->

**Key Areas**:

| Area | Path | Contains |
|------|------|----------|
| {{area-name}} | `{{path}}` | {{what this area contains}} |
| {{area-name}} | `{{path}}` | {{what this area contains}} |
| {{area-name}} | `{{path}}` | {{what this area contains}} |

## Dependencies

### Internal (from this monorepo)
- `{{scope/package-1}}` - {{what it provides}}
- `{{scope/package-2}}` - {{what it provides}}

### Key External
- {{dependency-1}} - {{what it's used for}}
- {{dependency-2}} - {{what it's used for}}

## Context Loading

| Task | Read |
|------|------|
| {{task description}} | @docs/{{doc-name}}.md |
| {{task description}} | @docs/{{doc-name}}.md |
| Subproject commands / verification scripts | @docs/scripts.md |

<!-- Only include entries for docs that exist in this subproject.
     Add project-specific docs as needed. -->

## Integration Points

| Connects To | How |
|-------------|-----|
| {{other subproject or service}} | {{REST API / gRPC / events / shared types}} |
| {{external dependency}} | {{client library / direct connection}} |

<!-- List the key integration boundaries. Remove this section if the subproject is self-contained. -->

## Boundaries

### Always
- Use verified commands from `@docs/scripts.md` when executing tasks
- Use shared types from `{{scope/types-package}}`
- Follow patterns in existing code

### Ask First
- Adding external dependencies
- Changing API contracts
- {{project-specific ask-first rule}}
- Running destructive commands (reset/drop/force operations)

### Never
- Import from other subprojects without declaring dependency
- Hardcode environment values (use config)
- Modify shared packages without checking dependents

## Deployment

**Environment**: {{e.g., container, serverless, static, library (not deployed)}}
**Trigger**: {{e.g., HTTP, queue, cron, event, npm publish}}
**Command Source**: @docs/scripts.md

<!-- Remove this section for libraries or packages that are not independently deployed. -->
