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
├── {{subproject-dir-1}}/
│   ├── {{subproject-1}}/    # {{description}}
│   ├── {{subproject-2}}/    # {{description}}
│   └── {{subproject-3}}/    # {{description}}
├── {{subproject-dir-2}}/
│   ├── {{subproject-4}}/    # {{description}}
│   └── {{subproject-5}}/    # {{description}}
├── {{shared-dir}}/          # {{description, e.g., shared config, IaC}}
└── docs/                    # Cross-project documentation
```

<!-- Replace with the actual monorepo directory tree. Common patterns:
     - packages/ + services/ (Node.js workspaces)
     - cmd/ + internal/ + pkg/ (Go)
     - crates/ (Rust)
     - apps/ + libs/ (Nx)
     Adapt to match your project's actual topology. -->

**Subproject Overview** (what each does):

| Subproject | Purpose | Tech |
|------------|---------|------|
| `{{path/name}}` | {{description}} | {{stack}} |
| `{{path/name}}` | {{description}} | {{stack}} |
| `{{path/name}}` | {{description}} | {{stack}} |

## Command Policy

- Workspace package manager: `{{package-manager}}`
- Canonical workspace commands live in `@docs/scripts.md`
- Canonical subproject commands live in each subproject's command docs
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
| {{subproject-1 description}} | @{{path}}/AGENTS.md |
| {{subproject-2 description}} | @{{path}}/AGENTS.md |
| {{subproject-3 description}} | @{{path}}/AGENTS.md |

<!-- Add a row for each subproject that has its own AGENTS.md -->

## Cross-Cutting Concerns

| Topic | Read |
|-------|------|
| {{topic, e.g., Git workflow}} | @docs/{{doc-name}}.md |
| {{topic, e.g., CI/CD}} | @docs/{{doc-name}}.md |
| Workspace commands | @docs/scripts.md |
| Building a feature | load skill `feature-workflow` |
| Creating / updating AGENTS.md | load skill `agents-md` |
| Writing specs or tasks | load skill `spec-writing` |

<!-- Only include entries for docs that exist in this project.
     Common cross-cutting docs: git-workflow, ci-cd, architecture, scripts.
     Add project-specific docs as needed. -->

## Global Boundaries

### Always
- Run affected tests before committing
- Follow subproject-specific patterns (read its AGENTS.md)
- Use workspace dependencies, not external duplicates
- Use verified commands from command docs when executing tasks

### Ask First
- Adding new subprojects
- Cross-subproject breaking changes
- Shared dependency version bumps
- Running destructive commands (reset/drop/force operations)

### Never
- Commit secrets or .env files
- Modify another subproject without reading its AGENTS.md
- Push directly to main branch
